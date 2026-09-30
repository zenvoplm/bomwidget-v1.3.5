pageextension 50100 "ZEN Item Card Ext" extends "Item Card"
{
    layout
    {
        addlast(content)
        {
            group("ZEN 3DX")
            {
                Caption = '3DEXPERIENCE';
                field("ZEN Car System"; Rec."ZEN Car System")
                {
                    ApplicationArea = All;
                    Editable = false;
                    ToolTip = '3DX Car System attribute value. Written by the sync service; edits here are overwritten on the next run.';
                }
                field("ZEN Outsourced"; Rec."ZEN Outsourced")
                {
                    ApplicationArea = All;
                    Editable = false;
                    ToolTip = '3DX Outsourced attribute value. Written by the sync service; edits here are overwritten on the next run.';
                }
                field("ZEN Serviceability"; Rec."ZEN Serviceability")
                {
                    ApplicationArea = All;
                    Editable = false;
                    ToolTip = '3DX Serviceability attribute value. Written by the sync service; edits here are overwritten on the next run.';
                }
                field("ZEN Make Buy"; Rec."ZEN Make Buy")
                {
                    ApplicationArea = All;
                    Editable = false;
                    ToolTip = 'Raw Make/Buy value from 3DX (informational; the process logic uses Replenishment System).';
                }
            }
        }
    }
}
