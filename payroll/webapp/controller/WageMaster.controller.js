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

		},
		onListItemPress: function (oEvent) {

			var oItem, oContext;
			oItem = oEvent.getSource();
			oContext = oItem.getBindingContext("data");
			this.getOwnerComponent().getRouter()
				.navTo("DetailOne", {
					id: oContext.getProperty("id")
				});

		},
		onSearch: function (oEvent) {

			var sQuery = oEvent.getParameter("data"),
				oList = this.getView().byId("l"),
				oBinding = oList.getBinding("items");
			if (sQuery) {
				var aFilter = [],
					fnTestPubl = function (bPublic) {
						return this.formatPublicFlag(bPublic).toUpperCase().indexOf(sQuery.toUpperCase()) >= 0;
					}.bind(this);

				aFilter.push(new Filter("wageType", FilterOperator.Contains, sQuery));
				aFilter.push(new Filter("category", fnTestPubl, FilterOperator.Contains, sQuery));

				oBinding.filter(new Filter({
					filters: aFilter,
					and: false
				}));
			} else {

				oBinding.filter([]);
			}

		}
	});

});