sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.BankMasterView", {

		onInit: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("BankMaster").attachMatched(that._onRouteMatched, that);
			//oRouter.getRoute("EditBankMaster").attachMatched(that._onRouteMatched, that);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onNavBackPress: function () {
			this.getOwnerComponent().getRouter().navTo("Dashboard");
		},
		onListItemPress: function (oEvent) {
			MessageToast.show("Pressed : " + oEvent.getSource().getTitle());
			var code = oEvent.getSource().getBindingContext("BankModel").getProperty("code");
			this.getOwnerComponent().getRouter()
				.navTo("EditBankMaster", {
					Code: code
				});
		}
	});

});