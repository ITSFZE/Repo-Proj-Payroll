sap.ui.define([
	"com/app/payroll/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.CreateJob", {

		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("CreateJob").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onPressNavBack: function () {
			this.getRouter().navTo("JobMaster");
		}

	});

});