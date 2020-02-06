sap.ui.define([
	"com/app/payroll/controller/sal/BankMasterSAL",
	"sap/ui/model/json/JSONModel"
], function (BankMasterSAL, JSONModel) {
	"use strict";

	return BankMasterSAL.extend("com.app.payroll.controller.EditBankMasterDetail", {

		onInit: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("EditBankMasterDetail").attachMatched(this._onRouteMatched, this);
			//this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		
		},
		_onRouteMatched: function (oEvent) {
			/* var BankMaster = [];
			var nMdl = new JSONModel();
			var getCode = oEvent.getParameter("arguments").Code;
			var getMdl = this.getView().getModel("BankModel");
			var oMdl = getMdl.getData();
			for (var i = 0; i < oMdl.BankMaster.length; i++) {
				if (getCode === oMdl.BankMaster[i].code) {
					BankMaster.push(oMdl.BankMaster[i]);
				}
			}
			var bankModel = new JSONModel(BankMaster);
			var rData = bankModel.getData()[0];
			nMdl.setData(rData);
			this.getView().setModel(nMdl, "EditBankModel"); */
			var that = this;
			that.showLoading(true);
			var code = oEvent.getParameter("arguments").AccNo;
			var bankModel = new JSONModel();
			this.getAccountByAccNo(bankModel, code).done(function (jMdl) {
				that.getView().setModel(jMdl, "EditBankModel");
				that.showLoading(false);
			}).fail(function (err) {
				that.showLoading(false);
				that.fetchErrorMessageOk("Error", "Error", err.toString());
			});
			var ret = 0;
			/* var getSportsEditId = that.getVariables();
			getSportsEditId.eSportName.setValueState("None"); */
		},
		onPressCloseEditSports: function () {
			this.getOwnerComponent().getRouter().navTo("BankMaster");
		},
		onPressAddRow: function (oEvent) {
			

			var oItem = new sap.m.ColumnListItem({
				cells: [new sap.m.Input({
					placeholder: "Enter The Bank Name"
				}), new sap.m.Input({
					placeholder: "Enter The IFSC Code"
				}), new sap.m.TextArea({
					placeholder: "Enter The Address",
					growing: true,
					growingMaxLines: 7,
					width: "100%"
				}), new sap.m.Input({
					placeholder: "Enter The Other Details"

				})]
			});

			var oTable = this.getView().byId("iBDTable");
			oTable.addItem(oItem);
		},
		onPressRemoveRow: function (oEvent) {
			var items;
			var oTable = this.getView().byId("iBDTable");
			var getSelectCount = oTable.getSelectedItems();
			if (getSelectCount.length > 1) {
				items = oTable.getSelectedItems();
				for (var i = 0; i < items.length; i++) {
					oTable.removeItem(items[i]);
				}
			} else {
				items = oTable.getSelectedItem();
				oTable.removeItem(items);
			}

		},
		onPressSubmitBankDetails: function () {
			//Get values
			var iBCode = this.getView().byId("iBCode").getValue();
			var iBName = this.getView().byId("iBName").getValue();
			var iStatus = this.getView().byId("iStatus").getSelectedItem().getProperty("text");
			var iNofCompany = this.getView().byId("iBDTable").getVisibleItems().length;
			var iCName = this.getView().byId("iCName").getSelectedItems();
			var vCName = [];
			for (var k = 0; k < iCName.length; k++) {
				var gCName = iCName[k].getProperty("text");
				vCName.push(gCName);
			}
			//Table values
			var tab = this.getView().byId("iBDTable").getVisibleItems();
			var cel = tab[0].getCells();
			var sData = [];

			for (var i = 0; i < tab.length; i++) {

				for (var j = 0; j < cel.length; j++) {
					var vData = cel[j].getProperty("value");
					sData.push(vData);
				}
			}
			//Get Existing Model
			var vModel = this.getView().getModel("BankModel");
			var oData = {
				code: iBCode,
				name: iBName,
				status: iStatus,
				ncompany: iNofCompany,
				companyName: vCName
			};
			//Push Data to BankModel
			var vModelData = vModel.getProperty("/");
			vModelData["BankMaster"].push(oData);
			//vModelData.push(oData);
			vModel.setProperty("/", vModelData);
			iBCode.setValue("");
			iBName.setValue("");
			iStatus.setValue("");
			iNofCompany.setValue("");
			iCName.setValue("");
		}

	});

});