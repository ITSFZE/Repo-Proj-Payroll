sap.ui.define([
	"com/app/payroll/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.CreateJob", {
        //Init Function is used to initiate the methods and properties at opening time of file
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("CreateJob").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		//Navigate Function is used to navigate from CreateJob to JobMaster
		onPressNavBack: function () {
			this.getRouter().navTo("JobMaster");
		}

	});

});