page 50102 "ZEN Prod BOM Lines API"
{
    PageType = API;
    APIPublisher = 'zenvo';
    APIGroup = 'erpsync';
    APIVersion = 'v1.0';
    EntityCaption = 'Zenvo Production BOM Line';
    EntityName = 'zenProductionBOMLine';
    EntitySetName = 'zenProductionBOMLines';
    SourceTable = "Production BOM Line";
    DelayedInsert = true;
    ODataKeyFields = SystemId;
    Extensible = false;

    layout
    {
        area(Content)
        {
            repeater(Group)
            {
                field(systemId; Rec.SystemId)
                {
                    Caption = 'systemId';
                    Editable = false;
                }
                field(productionBOMNo; Rec."Production BOM No.")
                {
                    Caption = 'productionBOMNo';
                }
                field(versionCode; Rec."Version Code")
                {
                    Caption = 'versionCode';
                }
                field(lineNo; Rec."Line No.")
                {
                    Caption = 'lineNo';
                }
                field(type; Rec.Type)
                {
                    Caption = 'type';
                }
                field(number; Rec."No.")
                {
                    Caption = 'number';
                }
                field(description; Rec.Description)
                {
                    Caption = 'description';
                }
                field(quantityPer; Rec."Quantity per")
                {
                    Caption = 'quantityPer';
                }
                field(unitOfMeasureCode; Rec."Unit of Measure Code")
                {
                    Caption = 'unitOfMeasureCode';
                }
                field(position; Rec.Position)
                {
                    Caption = 'position';
                }
                field(lastModifiedDateTime; Rec.SystemModifiedAt)
                {
                    Caption = 'lastModifiedDateTime';
                    Editable = false;
                }
            }
        }
    }
}
