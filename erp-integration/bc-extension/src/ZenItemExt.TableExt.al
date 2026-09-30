tableextension 50100 "ZEN Item Ext" extends Item
{
    fields
    {
        field(50100; "ZEN Car System"; Text[100])
        {
            Caption = 'Car System';
            DataClassification = CustomerContent;
        }
        field(50101; "ZEN Outsourced"; Boolean)
        {
            Caption = 'Outsourced';
            DataClassification = CustomerContent;
        }
        field(50102; "ZEN Serviceability"; Text[100])
        {
            Caption = 'Serviceability';
            DataClassification = CustomerContent;
        }
        field(50103; "ZEN Make Buy"; Text[30])
        {
            Caption = 'Make Buy (3DX)';
            DataClassification = CustomerContent;
        }
    }
}
