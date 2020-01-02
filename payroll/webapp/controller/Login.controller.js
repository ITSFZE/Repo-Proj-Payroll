//login controller used to login the payroll app
sap.ui.define(["com/app/payroll/controller/BaseController"], function (BaseController) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.Login", {
		//onInit function is initiate the methods and properties at the file opening time
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.attachRouteMatched(this.handleRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		 
		},
		//This function is validatting the username and password, after navigating to Home page
		onPressLogin: function () {
			this.getRouter().navTo("Dashboard");
		}

	});
});	