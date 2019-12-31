//UpdateEmployeeGroup Controllers is used to  control the UpdateEmployeeGroup view events
sap.ui.define([
	"com/app/payroll/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.UpdateEmployeeGroup", {
		//onInit function is initiate the methods and properties at the file opening time
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("UpdateEmployeeGroup").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		//This is navigating back to EmployeeGroup Master
		onPressNavBack: function () {
			this.getRouter().navTo("EmployeeGroup");
		}

	});

});