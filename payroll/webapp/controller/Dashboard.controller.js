sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.app.payroll.controller.Dashboard", {
		onInit: function () {

		},
		handleMenuPress: function (oEvent) {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		}

	});
});