sap.ui.define(["com/app/payroll/controller/BaseController"], function (BaseController) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.Login", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.attachRouteMatched(this.handleRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onPressLogin: function () {
			this.getRouter().navTo("Dashboard");
		}

	});
});