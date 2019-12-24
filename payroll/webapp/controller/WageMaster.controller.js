sap.ui.define([
	"com/app/payroll/controller/BaseController",
	'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, MessageToast, Formatter, JSONModel, Filter, FilterOperator) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.WageMaster", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("WageMaster").attachMatched(this._onRouteMatched, this);
			oRouter.getRoute("EditWageMasterDetail").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		_onRouteMatched: function() {

		},
		onPressNavBack: function(){
			this.getRouter().navTo("Dashboard");
		},
		onListItemPress: function (oEvent) {

		},
		onPressNavBack: function () {
			this.getRouter().navTo("Dashboard");
		}
	});

});