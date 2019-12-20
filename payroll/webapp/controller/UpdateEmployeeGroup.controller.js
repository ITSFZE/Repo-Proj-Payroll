sap.ui.define([
	"com/app/payroll/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.UpdateEmployeeGroup", {
		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onPressNavBack: function () {
			this.getOwnerComponent().getRouter().navTo("EmployeeGroup");
		}
	});

});