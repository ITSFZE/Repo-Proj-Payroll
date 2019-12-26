sap.ui.define([
	"com/app/payroll/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.JobMaster", {
		//Init Function is used to initiate the methods and properties at opening time of file
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("JobMaster").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		//CreateJob Function is used to CreateJob details
		onPressCreateJob: function () {
			this.getRouter().navTo("CreateJob");
		},
		//EditJobMaster Function is used to EditJobMaster details
		onPressEditJobMaster: function () {
			this.getRouter().navTo("EditJobMaster");
		},
		//Navigate Function is used to navigate from JobMaster to Dashboard
		onPressNavBack: function () {
			this.getRouter().navTo("Dashboard");
		}
	});
});