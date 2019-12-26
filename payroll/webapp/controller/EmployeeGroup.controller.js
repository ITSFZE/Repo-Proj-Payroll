sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.EmployeeGroup", {
		//Init Function is used to initiate the methods and properties at opening time of file
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("EmployeeGroup").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		//Navigate Function is used to navigate from EmployeeGroup to Dashboard
		onPressNavBack: function () {
			this.getRouter().navTo("Dashboard");
		},
		//Add Function is used to create the EmployeeGroup details
		onPressAdd: function () {
			this.getRouter().navTo("CreateEmployeeGroup");
		},
		//Update Function is used to Update the EmployeeGroup details
		onPressUpdateEmplyeeGroup: function () {
			this.getRouter().navTo("UpdateEmployeeGroup");
		},
		//FilterGroup type is used to filter the GroupType
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