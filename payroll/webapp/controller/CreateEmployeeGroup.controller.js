sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel'
], function (BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.CreateEmployeeGroup", {
		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			var oModel = new JSONModel("/EmployeeDetail.json");
			this.getView().setModel(oModel);
		},
		onPressNavBack: function () {
			this.getOwnerComponent().getRouter().navTo("EmployeeGroup");
		}
	});

});