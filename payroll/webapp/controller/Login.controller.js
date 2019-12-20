sap.ui.define(["com/app/payroll/controller/BaseController"], function (BaseController) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.Login", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.Payroll.view.Login
		 */
		onInit: function () {},
		onPressLogin: function () {
			this.getOwnerComponent().getRouter().navTo("JobMaster");
		}

	});
});