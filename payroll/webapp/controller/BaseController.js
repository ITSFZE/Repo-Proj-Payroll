sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("com.app.payroll.controller.BaseController", {
		onInit: function () {

		},
		getRouter: function () {
			return UIComponent.getRouterFor(this);
		}

	});
});