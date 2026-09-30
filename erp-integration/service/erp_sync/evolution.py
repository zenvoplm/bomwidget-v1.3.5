# -*- coding: utf-8 -*-
"""cvservlet structure expand + Evolution (Model Version) filter for the ERP sync.

v0.9.0: every BOM is read with cv_expand() below. The dseng/dsmfg expand used
before stops at exactly 10000 paths without an error. Filters, as the native
MBOM app sends them (HAR 2026-09-23):
    Product Configuration  {"config_filter_id": {"physical_id": <configuration id>}}
    Evolution              {"config_filter": <createVolatileFilter binary>}

The notes below describe the earlier prune approach; cv_expand() replaces it.

A Product Configuration filters the dseng/dsmfg expand directly
(persistentFilter). An Evolution cannot: the modeler expand accepts no
volatile filter. So the structure is expanded unfiltered as before and then
PRUNED to what a filtered cvservlet expand keeps:

    createVolatileFilter(Model Version)  ->  binary filter
    cvservlet progressiveexpand + config_filter  ->  ids that survive
    unfiltered expand members  ->  keep objects/instances in that set,
                                   keep Path chains whose every id survives

Live-verified 2026-09-23 on Aurora (root 0E18FEBF0000D4046AB2790C0029CB96):
  * dseng and dsmfg expand ids are the same physical ids cvservlet returns
    (EBOM 3624/3624 refs, 9977/9977 instances; MBOM 1682/1682, 9957/9957);
  * full-depth filtered expand works on both sides
    (EBOM: VP3 5663 / VP4 3706 of 6015; MBOM: VP3 9678 / VP4 10172 of 10745).

The widget uses the same pruning for MBOM and the same cvservlet filter for
EBOM, so the ERP gets exactly the structure the user saw on screen.
"""
import logging
import time
from xml.sax.saxutils import escape

log = logging.getLogger("erpsync.evolution")

EBOM_GRAPH = {
    "descending_condition": {"uql": "availability:2"},
    "descending_condition_object": {"uql": '[ds6w:globaltype]:"ds6w:Part"'},
    "descending_condition_relation": {"uql":
        'NOT (flattenedtaxonomies:"reltypes/XCADBaseDependency") AND '
        'NOT (flattenedtaxonomies:"reltypes/Reference Document")'},
}
# From the native MBOM app's own expand (HAR 2026-09-23).
MBOM_GRAPH = {
    "descending_condition_object": {"uql":
        " NOT ( (flattenedtaxonomies:types/VPMCfgEffectivity) )"},
    "descending_condition_relation": {"uql":
        "(flattenedtaxonomies:reltypes/PLMCoreInstance) OR "
        "(flattenedtaxonomies:reltypes/PLMCoreRepInstance) OR "
        "(flattenedtaxonomies:reltypes/Formula_Ingredient) OR "
        "(flattenedtaxonomies:types/PLMConnection) OR "
        "(flattenedtaxonomies:reltypes/MfgProcessAlternate)"},
    "descending_condition": {"uql":
        " NOT ( ([ro.SynchroEBOMExt.V_InEBOMUser]:*FALSE*) )"},
}


def model_code(auth, space_url, model_id):
    """Model code (e.g. MV-Zenvo-00000006) from dslc/versiongraph."""
    r = auth.post(f"{space_url}/resources/v1/dslc/versiongraph?withThumbnail=0"
                  f"&withIsLastVersion=0&withAttributes=1&withCopyFrom=1"
                  f"&xrequestedwith=xmlhttprequest",
                  json={"graphRequests": [{"id": model_id, "versionPidsToKeep": [],
                                           "attributes": ["revision"]}]})
    if r.status_code != 200:
        raise RuntimeError(f"versiongraph HTTP {r.status_code}: {r.text[:300]}")
    graphs = r.json().get("graphs") or []
    code = graphs and (graphs[0].get("item") or {}).get("code")
    if not code:
        raise RuntimeError(f"versiongraph returned no model code for {model_id}")
    return code


def volatile_filter(auth, space_url, evolution):
    """Binary filter for one Model Version; evolution = {modelId, modelCode,
    name, revision}."""
    code = evolution.get("modelCode") or model_code(auth, space_url, evolution["modelId"])
    q = lambda v: escape(str(v or ""), {'"': "&quot;"})
    xml = ('<CfgFilterExpression xs:schemaLocation="urn:com:dassault_systemes:config '
           'CfgFilterExpression.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema-instance" '
           'xmlns="urn:com:dassault_systemes:config"><FilterSelection SelectionMode="Strict" '
           'SelectionView="Current"><Context HolderType="Model" HolderName="%s">'
           '<TreeSeries Type="ProductState" Name="%s"><Single Name="%s" Revision="%s"/>'
           '</TreeSeries></Context></FilterSelection></CfgFilterExpression>'
           % (q(code), q(code), q(evolution.get("name")), q(evolution.get("revision"))))
    r = auth.post(f"{space_url}/resources/modeler/configuration/filteringServices/"
                  f"createVolatileFilter?xrequestedwith=xmlhttprequest",
                  json={"version": "1.2", "output": {"targetFormat": "TXT"},
                        "expression": {"version": "0.1", "format": "xml", "content": xml},
                        "dictionary": {"version": "0.1",
                                       "id": {"pid": evolution["modelId"]}}})
    if r.status_code != 200:
        raise RuntimeError(f"createVolatileFilter HTTP {r.status_code}: {r.text[:300]}")
    d = r.json()
    blob = d.get("filterBinaryForExpand")
    if not blob:
        raise RuntimeError(f"createVolatileFilter returned no filter: {str(d)[:300]}")
    label = ((d.get("filterExpression") or [{}])[0] or {}).get("content")
    log.info("evolution filter: %s", (label or "").strip())
    return blob


# MBOM structure only: the native graph also crosses into the EBOM through
# PLMConnection, which is not part of the BOM.
MBOM_STRUCTURE_GRAPH = dict(MBOM_GRAPH, descending_condition_relation={
    "uql": "(flattenedtaxonomies:reltypes/PLMCoreInstance)"})


def cv_expand(auth, space_url, security_context, root_id, item_type, element=None):
    """Whole structure under root_id, optionally filtered, returned in the
    member shape build_desired() reads: references {id, type, title, name,
    revision} and instances {id, type, parent, reference}."""
    if element:
        flt = {"or": {"filters": [{"truncatable_if": {
            "truncate_length_filter": {"and": {"filters": [element]}},
            "if": {"and": {"filters": [{"all": 1}]}}}}]}}
    else:
        flt = {"or": {"filters": [{"and": {"filters": [{"prefix_filter": {
            "prefix_path": [{"physical_id_path": [root_id]}]}}]}}]}}
    exp = {"label": f"zen-erpsync-{int(time.time() * 1000)}",
           "root": {"physical_id": root_id}, "filter": flt,
           "graph": EBOM_GRAPH if item_type == "VPMReference" else MBOM_STRUCTURE_GRAPH}
    if element:
        exp["aggregation_processors"] = [{"truncate": {"truncatable_paths": 1}}]
    body = {"batch": {"expands": [exp]},
            "outputs": {"format": "entity_relation_occurrence",
                        "select_object": ["physicalid", "ds6w:type", "ds6w:label",
                                          "ds6w:identifier", "ds6wg:revision"],
                        "select_relation": ["physicalid", "ds6w:type"]}}
    ctx = security_context if security_context.startswith("ctx::") else "ctx::" + security_context
    r = auth.post(f"{space_url}/cvservlet/progressiveexpand/v2?output_format=cvjson"
                  f"&xrequestedwith=xmlhttprequest", json=body,
                  params={"SecurityContext": ctx}, headers={"SecurityContext": ctx})
    if r.status_code != 200:
        raise RuntimeError(f"cvservlet expand HTTP {r.status_code}: {r.text[:300]}")
    d = r.json()
    res = d.get("results") or []
    if d.get("errors"):
        raise RuntimeError(f"cvservlet expand errors: {str(d['errors'])[:300]}")
    rows = [x for x in res if x.get("resourceid") and not x.get("Path")]
    refs = {x["resourceid"]: x for x in rows if "from" not in x}
    if root_id not in refs:
        # Never let an empty answer look like an empty BOM.
        raise RuntimeError("cvservlet expand did not return the root")
    members = []
    for x in refs.values():
        members.append({"id": x["resourceid"], "type": x.get("ds6w:type", ""),
                        "title": x.get("ds6w:label") or "",
                        "name": x.get("ds6w:identifier") or "",
                        "revision": x.get("ds6wg:revision") or ""})
    n_inst = 0
    for x in rows:
        t = x.get("ds6w:type") or ""
        # structural instances only (not VPMRepInstance / connections), both ends in the BOM
        if ("from" in x and "Instance" in t and "RepInstance" not in t
                and x.get("from") in refs and x.get("to") in refs):
            members.append({"id": x["resourceid"], "type": t,
                            "parent": x["from"], "reference": x["to"]})
            n_inst += 1
    log.info("cvservlet expand: %d reference(s), %d instance(s)%s",
             len(refs), n_inst, " (filtered)" if element else "")
    return {"member": members}


def kept_ids(auth, space_url, security_context, root_id, item_type, blob):
    """Every object and instance id the filtered cvservlet expand keeps."""
    body = {"batch": {"expands": [{
        "label": f"zen-erpsync-evo-{int(time.time() * 1000)}",
        "root": {"physical_id": root_id},
        "filter": {"or": {"filters": [{"truncatable_if": {
            "truncate_length_filter": {"and": {"filters": [{"config_filter": blob}]}},
            "if": {"and": {"filters": [{"all": 1}]}}}}]}},
        "aggregation_processors": [{"truncate": {"truncatable_paths": 1}}],
        "graph": EBOM_GRAPH if item_type == "VPMReference" else MBOM_GRAPH,
    }]}, "outputs": {"format": "entity_relation_occurrence",
                     "select_object": ["physicalid"], "select_relation": ["physicalid"]}}
    ctx = security_context if security_context.startswith("ctx::") else "ctx::" + security_context
    # ctx:: form in the query too: Auth3DX drops extra headers when it
    # retries after a re-login, and cvservlet answers 500 without it.
    r = auth.post(f"{space_url}/cvservlet/progressiveexpand/v2?output_format=cvjson"
                  f"&xrequestedwith=xmlhttprequest", json=body,
                  params={"SecurityContext": ctx}, headers={"SecurityContext": ctx})
    if r.status_code != 200:
        raise RuntimeError(f"filtered cvservlet expand HTTP {r.status_code}: {r.text[:300]}")
    d = r.json()
    res = d.get("results") or []
    if d.get("errors") and not res:
        raise RuntimeError(f"filtered cvservlet expand errors: {str(d['errors'])[:300]}")
    keep = {x["resourceid"] for x in res if x.get("resourceid") and not x.get("Path")}
    if root_id not in keep:
        # Never let an empty answer look like "nothing is effective".
        raise RuntimeError("filtered cvservlet expand did not return the root")
    return keep


def prune(expand_json, keep):
    """Drop every member the filter removed. Path chains are kept only when
    every id on them survives, so no orphan branch reaches the BOM."""
    members = expand_json.get("member") or []
    out = []
    for m in members:
        chain = m.get("Path") or m.get("path")
        if chain:
            if all(x in keep for x in chain):
                out.append(m)
        elif m.get("id") in keep:
            out.append(m)
    log.info("evolution prune: %d of %d member(s) kept", len(out), len(members))
    pruned = dict(expand_json)
    pruned["member"] = out
    return pruned
