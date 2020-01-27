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
			var oRouter = this.getRouter();
			oRouter.getRoute("BankMaster").attachMatched(this._onRouteMatched(), this);
			oRouter.getRoute("EditBankMaster").attachMatched(this._onEditRouteMatched(), this);
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
			var that = this;
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
		},/* ,
		onListItemPress: function (oEvent) {
			MessageToast.show("Pressed : " + oEvent.getSource().getTitle());
			var code = oEvent.getSource().getBindingContext("BankModel").getProperty("code");
			this.getOwnerComponent().getRouter()
				.navTo("EditBankMaster", {
					Code: code
				});
		} */
		onNavBackPress: function () {
			this.getOwnerComponent().getRouter().navTo("Dashboard");
		}
	});

});