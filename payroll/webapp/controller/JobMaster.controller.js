sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.app.payroll.controller.JobMaster", {
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