# BC Keşif Raporu (Faz 0)

> Üretim zamanı: 2026-08-11 13:40 UTC · Ortam: `Zenvo_UAT` · probe.py salt-okunur

## 1. Bağlantı

- OAuth2 client credentials: **BAŞARILI**
- Şirketler (7): `COA`, `MARCO`, `MASC Test`, `My Company`, `WMS - Solution Workshop`, `Zenvo Sales`, `Zenvo UAT v01`
- Seçilen şirket: **Zenvo UAT v01** (`32c4726b-3b49-f111-a820-7ced8d74e41f`)

## 2. Items API

- `items` endpoint'i çalışıyor; 3 örnek kayıt alındı.
  - `1003` | Demo03 | UoM: PCS
  - `1004` | Demo04 | UoM: PCS
  - `1005` | Demo05 | UoM: PCS

## 3. API v2.0 entity set'leri

- Toplam: **150**
- BOM/üretim adayları: **assemblyOrderLines, assemblyOrders, postedAssemblyOrderLines, postedAssemblyOrders**

Tam liste:

`accountingPeriods`, `accounts`, `agedAccountsPayables`, `agedAccountsReceivables`, `apicategoryroutes`, `applyVendorEntries`, `approvalEntries`, `approvalUserSetups`, `assemblyOrderLines`, `assemblyOrders`, `attachments`, `balanceSheets`, `bankAccounts`, `blanketPurchaseOrderLines`, `blanketPurchaseOrders`, `blanketSalesOrderLines`, `blanketSalesOrders`, `cashFlowStatements`, `companies`, `companyInformation`, `contacts`, `contactsInformation`, `countriesRegions`, `currencies`, `currencyExchangeRates`, `customerContacts`, `customerFinancialDetails`, `customerPaymentJournals`, `customerPayments`, `customerReturnReasons`, `customerSales`, `customers`, `defaultDimensions`, `dimensionSetLines`, `dimensionValues`, `dimensions`, `disputeStatus`, `documentAttachments`, `employees`, `entityDefinitions`, `externalbusinesseventdefinitions`, `externaleventsubscriptions`, `fixedAssetLocations`, `fixedAssets`, `generalLedgerEntries`, `generalLedgerSetup`, `generalProductPostingGroups`, `incomeStatements`, `inventoryPostingGroups`, `inventoryReceiptLines`, `inventoryReceipts`, `inventoryShipmentLines`, `inventoryShipments`, `itemCategories`, `itemLedgerEntries`, `itemVariants`, `items`, `jobQueueEntries`, `jobQueueLogEntries`, `journalLines`, `journals`, `locations`, `opportunities`, `paymentMethods`, `paymentTerms`, `pdfDocument`, `physicalInventoryOrderLines`, `physicalInventoryOrders`, `physicalInventoryRecordingLines`, `physicalInventoryRecordings`, `pictures`, `postedApprovalEntries`, `postedAssemblyOrderLines`, `postedAssemblyOrders`, `postedDirectTransferLines`, `postedDirectTransfers`, `postedInventoryReceiptLines`, `postedInventoryReceipts`, `postedInventoryShipmentLines`, `postedInventoryShipments`, `postedPhysicalInventoryOrderLines`, `postedPhysicalInventoryOrders`, `postedPhysicalInventoryRecordingLines`, `postedPhysicalInventoryRecordings`, `projects`, `purchaseBlanketOrderArchiveLines`, `purchaseBlanketOrderArchives`, `purchaseCreditMemoLines`, `purchaseCreditMemos`, `purchaseInvoiceLines`, `purchaseInvoices`, `purchaseOrderArchiveLines`, `purchaseOrderArchives`, `purchaseOrderLines`, `purchaseOrders`, `purchaseQuoteArchiveLines`, `purchaseQuoteArchives`, `purchaseQuoteLines`, `purchaseQuotes`, `purchaseReceiptLines`, `purchaseReceipts`, `purchaseReturnOrderArchiveLines`, `purchaseReturnOrderArchives`, `purchaseReturnOrderLines`, `purchaseReturnOrders`, `purchaseReturnShipments`, `retainedEarningsStatements`, `returnReceipts`, `salesBlanketOrderArchiveLines`, `salesBlanketOrderArchives`, `salesCreditMemoLines`, `salesCreditMemos`, `salesInvoiceLines`, `salesInvoices`, `salesOrderArchiveLines`, `salesOrderArchives`, `salesOrderLines`, `salesOrders`, `salesQuoteArchiveLines`, `salesQuoteArchives`, `salesQuoteLines`, `salesQuotes`, `salesReturnOrderArchiveLines`, `salesReturnOrderArchives`, `salesReturnOrderLines`, `salesReturnOrders`, `salesShipmentLines`, `salesShipments`, `salespeoplePurchasers`, `shipmentMethods`, `subscriptions`, `taxAreas`, `taxGroups`, `timeRegistrationEntries`, `transferOrderLines`, `transferOrders`, `transferReceiptLines`, `transferReceipts`, `transferShipmentLines`, `transferShipments`, `trialBalances`, `unitsOfMeasure`, `vendorPaymentJournals`, `vendorPayments`, `vendorPurchases`, `vendors`, `workflowApprovers`, `workflowResponseOptions`, `workflowSteps`, `workflows`

## 4. ODataV4 yayınlanmış web servisleri

- Toplam 87: `Company`, `AccountantPortalActivityCues`, `AccountantPortalFinanceCues`, `AccountantPortalUserTasks`, `powerbifinance`, `SalesOrder`, `SalesOrderSalesLines`, `UserTaskSetComplete`, `DimensionSets`, `ItemSalesAndProfit`, `ItemSalesByCustomer`, `SalesDashboard`, `SalesOpportunities`, `SalesOrdersBySalesPerson`, `TopCustomerOverview`, `Chart_of_Accounts`, `Customer_Card_Excel`, `ExcelTemplateAgedAccountsPayable`, `ExcelTemplateAgedAccountsReceivable`, `ExcelTemplateBalanceSheet`, `ExcelTemplateCashFlowStatement`, `ExcelTemplateIncomeStatement`, `ExcelTemplateRetainedEarnings`, `ExcelTemplateTrialBalance`, `ExcelTemplateViewCompanyInformation`, `General_Journals_Excel`, `Item_Card_Excel`, `Job_List`, `Job_Planning_Lines`, `Job_Task_Lines`, `Page_99000788_Excel`, `Power_BI_Aged_Acc_Payable`, `Power_BI_Aged_Acc_Receivable`, `Power_BI_Aged_Inventory_Chart`, `Power_BI_Job_Act_v_Budg_Cost`, `Power_BI_Job_Act_v_Budg_Price`, `Power_BI_Job_Profitability`, `Power_BI_Sales_Pipeline`, `Power_BI_Top_5_Opportunities`, `Power_BI_WorkDate_Calc`, `Purchase_Price_List_Lines_Excel`, `purchaseDocumentLines`, `purchaseDocuments`, `purchaseDocumentsworkflowPurchaseDocumentLines`, `salesDocumentLines`, `salesDocuments`, `salesDocumentsworkflowSalesDocumentLines`, `workflowCustomers`, `workflowGenJournalBatches`, `workflowGenJournalLines`, `workflowItems`, `workflowPurchaseDocumentLines`, `workflowPurchaseDocuments`, `workflowPurchaseDocumentsworkflowPurchaseDocumentLines`, `workflowSalesDocumentLines`, `workflowSalesDocuments`, `workflowSalesDocumentsworkflowSalesDocumentLines`, `workflowVendors`, `workflowWebhookSubscriptions`, `BankAccountLedgerEntries`, `Cust_LedgerEntries`, `DimensionSetEntries`, `FALedgerEntries`, `G_LBudgetEntries`, `G_LEntries`, `ItemLedgerEntries`, `JobLedgerEntries`, `Power_BI_Cust_Item_Ledg_Ent`, `Power_BI_Cust_Ledger_Entries`, `Power_BI_Customer_List`, `Power_BI_GL_Amount_List`, `Power_BI_GL_BudgetedAmount`, `Power_BI_Item_Purchase_List`, `Power_BI_Item_Sales_List`, `Power_BI_Jobs_List`, `Power_BI_Purchase_Hdr_Vendor`, `Power_BI_Purchase_List`, `Power_BI_Sales_Hdr_Cust`, `Power_BI_Sales_List`, `Power_BI_Top_Cust_Overview`, `Power_BI_Vend_Item_Ledg_Ent`, `Power_BI_Vendor_Ledger_Entries`, `Power_BI_Vendor_List`, `Res_LedgerEntries`, `SegmentLines`, `ValueEntries`, `VendorLedgerEntries`

## 5. Ek keşif (probe2-odata.py)

- `Page_99000788_Excel` = **Production BOM Lines** sayfası (alanlar: Production_BOM_No,
  Version_Code, Line_No, Type, No, Quantity_per, Unit_of_Measure_Code, Scrap_Percent,
  Position, Lead_Time_Offset…).
- Ortamda örnek üretim BOM'u var: `BOM-DEMO01` (satır: item 1004, Quantity_per=2, PCS) →
  **üretim modülü aktif, Production BOM veri modeli kullanılabilir durumda.**
- Satır `Type` alanı `Item` / `Production BOM` değerleri alabiliyor → **phantom** modellemesi
  için doğal karşılık.
- Standart `items` API'sinde **replenishmentSystem alanı yok**; item oluşturma posting group
  + Base UoM önkoşullarına bağlı (örnek kayıtlarda: RETAIL/RESALE/RAW MAT, PCS) → kart
  garanti modülü şablon/varsayılan değerlerle çalışacak.

## 6. Sonuç ve önerilen yol

- API v2.0'daki `assembly*` entity'leri **assembly order** (emir) nesneleridir, BOM tanımı
  değildir → **yol (a) kapalı.**
- Production BOM sayfaları OData ile okunabiliyor (yol b teknik olarak çalışır) **ama** Item
  özel alanları (Car System, Outsourced, Serviceability, MakeBuy ham değeri) zaten AL
  extension gerektiriyor.
- **Öneri: yol (c)** — tek bir "Zenvo ERP Sync" AL extension'ı:
  1. Item table extension: 4 özel alan
  2. Özel API sayfaları: `zenItems` (standart + özel alanlar + Replenishment System),
     `zenProductionBOMHeaders` (Status yönetimi dahil), `zenProductionBOMLines`
  3. Deploy: derlenmiş .app → BC **Extension Management → Upload Extension** (Zenvo_UAT)

_Ham yanıtlar: `raw\` klasöründe._