sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.EmployeeGroup", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("EmployeeGroup").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onPressNavBack: function () {
			this.getRouter().navTo("Dashboard");
		},
		onPressAdd: function () {
			this.getRouter().navTo("CreateEmployeeGroup");
		},
		onPressUpdateEmplyeeGroup: function () {
			this.getRouter().navTo("UpdateEmployeeGroup");
		},
		onFilterGroupType: function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("GroupType", FilterOperator.Contains, sQuery));
			}
			var oList = this.byId("employee");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});