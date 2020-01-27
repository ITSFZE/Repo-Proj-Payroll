sap.ui.define([
	"com/app/payroll/controller/sal/BankMasterSAL",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter"
], function (BankMasterSAL, MessageToast, JSONModel, Filter) {
	"use strict";

	return BankMasterSAL.extend("com.app.payroll.controller.BankMasterView", {

		onInit: function () {
			//var that = this;
			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("BankMaster").attachMatched(this._onRouteMatched, this);
			//oRouter.getRoute("EditBankMaster").attachMatched(this._onEditRouteMatched(), this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			var newMdl = new JSONModel();
			this.getView().setModel(newMdl, "BankModel");
		},
		_onRouteMatched: function () {
			var that = this;
			var filter = "$select=BankCode,AccNo,Branch,Street,Block,ZipCode,City,County,Country,State,BISR,IBAN,BankKey,ISRType,AddressType,StreetNo,Building,AccountName,BICSwiftCode";
			this.fetchBanksList(filter);
		},
		_onEditRouteMatched: function(){
			alert("test");
		},
		fetchBanksList: function (filter) {
			var that = this;
			var bankMasterSAL = new BankMasterSAL();
			that.getView().setBusy(true);
			bankMasterSAL.getAccountList(filter).done(function (obj) {
				that.getView().setModel(obj, "BankModel");
				sap.ui.getCore().setModel(obj, "BankModel");
				that.getView().setBusy(false);
			}).fail(function (err) {
				that.getView().setBusy(false);
				that.fetchErrorMessageOk("Error", "Error", err.toString());
			});
		},
		onListItemPress: function (oEvent) {
			//MessageToast.show("Pressed : " + oEvent.getSource().getTitle());
			var accno = oEvent.getSource().getBindingContext("BankModel").getProperty("AccNo");
			this.getOwnerComponent().getRouter()
				.navTo("EditBankMasterDetail",{
					AccNo: accno
				});
		},
		onNavBackPress: function () {
			this.getOwnerComponent().getRouter().navTo("Dashboard");
		}
	});

});