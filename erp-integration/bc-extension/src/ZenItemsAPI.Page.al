page 50100 "ZEN Items API"
{
    PageType = API;
    APIPublisher = 'zenvo';
    APIGroup = 'erpsync';
    APIVersion = 'v1.0';
    EntityCaption = 'Zenvo Item';
    EntityName = 'zenItem';
    EntitySetName = 'zenItems';
    SourceTable = Item;
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
                field(description2; Rec."Description 2")
                {
                    Caption = 'description2';
                }
                field(baseUnitOfMeasure; Rec."Base Unit of Measure")
                {
                    Caption = 'baseUnitOfMeasure';
                }
                field(replenishmentSystem; Rec."Replenishment System")
                {
                    Caption = 'replenishmentSystem';
                }
                field(genProdPostingGroup; Rec."Gen. Prod. Posting Group")
                {
                    Caption = 'genProdPostingGroup';
                }
                field(inventoryPostingGroup; Rec."Inventory Posting Group")
                {
                    Caption = 'inventoryPostingGroup';
                }
                field(itemCategoryCode; Rec."Item Category Code")
                {
                    Caption = 'itemCategoryCode';
                }
                field(productionBOMNo; Rec."Production BOM No.")
                {
                    Caption = 'productionBOMNo';
                }
                field(blocked; Rec.Blocked)
                {
                    Caption = 'blocked';
                }
                field(carSystem; Rec."ZEN Car System")
                {
                    Caption = 'carSystem';
                }
                field(outsourced; Rec."ZEN Outsourced")
                {
                    Caption = 'outsourced';
                }
                field(serviceability; Rec."ZEN Serviceability")
                {
                    Caption = 'serviceability';
                }
                field(makeBuy; Rec."ZEN Make Buy")
                {
                    Caption = 'makeBuy';
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
