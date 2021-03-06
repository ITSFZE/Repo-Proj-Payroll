sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.CreateEmployeeGroup", {
		//Init Function is used to initiate the methods and properties at opening time of file
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("CreateEmployeeGroup").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		//Navigate Function is used to navigate from CreateEmployeeGroup to EmployeeGroup
		onPressNavBack: function () {
			this.getRouter().navTo("EmployeeGroup");
		}
	});

});