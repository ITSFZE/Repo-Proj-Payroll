sap.ui.define([
	"com/app/payroll/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.JobMaster", {
		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onPressCreateJob:function(){
			this.getOwnerComponent().getRouter().navTo("CreateJob");
		},
		onPressEditJobMaster:function(){
			this.getOwnerComponent().getRouter().navTo("EditJobMaster");
		}
	});
});