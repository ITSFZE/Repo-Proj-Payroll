sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.EmployeeGroup.controller.EmployeeGroup", {
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