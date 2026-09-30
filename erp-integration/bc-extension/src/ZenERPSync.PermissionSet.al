permissionset 50100 "ZEN ERP SYNC"
{
    Assignable = true;
    Caption = 'Zenvo ERP Sync';

    Permissions =
        page "ZEN Items API" = X,
        page "ZEN Prod BOM Headers API" = X,
        page "ZEN Prod BOM Lines API" = X,
        table Item = X,
        table "Production BOM Header" = X,
        table "Production BOM Line" = X,
        tabledata Item = RIMD,
        tabledata "Production BOM Header" = RIMD,
        tabledata "Production BOM Line" = RIMD,
        tabledata "Production BOM Version" = RIMD,
        tabledata "Item Unit of Measure" = RIMD,
        tabledata "Unit of Measure" = R;
}
