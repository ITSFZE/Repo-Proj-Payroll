sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel'
], function (Controller,JSONModel) {
	"use strict";

	return Controller.extend("com.EmployeeGroup.controller.CreateEmployeeGroup", {
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