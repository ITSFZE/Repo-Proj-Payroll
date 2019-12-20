sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.EmployeeGroup.controller.UpdateEmployeeGroup", {
		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onPressNavBack: function () {
			this.getOwnerComponent().getRouter().navTo("EmployeeGroup");
		}
	});

});