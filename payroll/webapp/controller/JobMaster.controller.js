sap.ui.define([
	"com/app/payroll/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.JobMaster", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("JobMaster").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onPressCreateJob:function(){
			this.getRouter().navTo("CreateJob");
		},
		onPressEditJobMaster:function(){
			this.getRouter().navTo("EditJobMaster");
		},
		onPressNavBack: function(){
			this.getRouter().navTo("Dashboard");
		}
	});
});