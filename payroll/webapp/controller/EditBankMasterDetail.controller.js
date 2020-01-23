sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.Payroll.controller.EditBankMasterDetail", {

		onInit: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("EditBankMaster").attachMatched(that._onRouteMatched, that);
			oRouter.getRoute("BankMaster").attachMatched(that._onRouteMatched, that);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			//New Model
			/*var setMdl = new JSONModel();
			this.getView().setModel(setMdl, "BankModel");*/

			var oData = {
				"Status": [{
					"status": "Active",
					"key": 1,
					"state": "Success"
				}, {
					"status": "Inactive",
					"key": 2,
					"state": "Error"
				}],
				"CCompany": [{
					"cName": "Enspire India",
					"key": 1
				}, {
					"cName": "Enspire Kenya",
					"key": 2
				}, {
					"cName": "Enspire UAE",
					"key": 3
				}]
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		},
		_onRouteMatched: function (oEvent) {
			var BankMaster = [];
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
			this.getView().setModel(nMdl, "EditBankModel");
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