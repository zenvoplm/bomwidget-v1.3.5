page 50101 "ZEN Prod BOM Headers API"
{
    PageType = API;
    APIPublisher = 'zenvo';
    APIGroup = 'erpsync';
    APIVersion = 'v1.0';
    EntityCaption = 'Zenvo Production BOM Header';
    EntityName = 'zenProductionBOMHeader';
    EntitySetName = 'zenProductionBOMHeaders';
    SourceTable = "Production BOM Header";
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
                field(number; Rec."No.")
                {
                    Caption = 'number';
                }
                field(description; Rec.Description)
                {
                    Caption = 'description';
                }
                field(unitOfMeasureCode; Rec."Unit of Measure Code")
                {
                    Caption = 'unitOfMeasureCode';
                }
                field(status; Rec.Status)
                {
                    Caption = 'status';
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
