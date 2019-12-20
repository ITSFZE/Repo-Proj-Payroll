sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.EmployeeGroup", {
		onInit: function () {

		},
		onPressAdd: function () {
			this.getOwnerComponent().getRouter().navTo("CreateEmployeeGroup");
		},
		onPressUpdateEmplyeeGroup: function () {
			this.getOwnerComponent().getRouter().navTo("UpdateEmployeeGroup");
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