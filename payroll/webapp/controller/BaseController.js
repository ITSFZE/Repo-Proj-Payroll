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
		},
		initContext: function() {

			var config = {
				baseURL: '/stryx_testing/services/B1SLProxy.xsjs',
				User: {},
				SessionData: {
					sessionID: '',
					routeID: ''
				},
				configSeries: {
					childs: '',
					parents: ''
				},
				PageID: "",
				loginId: ""
			};
			jQuery.sap.require("jquery.sap.storage");
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			var contexts = oStorage.get("Contexts");
			var contextsForgot = oStorage.get("ContextForgotPass");
			if (contexts === null || contexts === "Contexts") {
				//Set data into Storage  
				oStorage.put("Contexts", config);
			}
			if (contextsForgot === null || contextsForgot === "ContextForgotPass") {
				//Set data into Storage  
				oStorage.put("ContextForgotPass", config);
			}
		},
		setContext: function(sContext) {
			jQuery.sap.require("jquery.sap.storage");
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			//var contexts = oStorage.get("Contexts");
			oStorage.put("Contexts", sContext);
		},
		setContextForgotPass: function(sContext) {
			jQuery.sap.require("jquery.sap.storage");
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			//var contexts = oStorage.get("Contexts");
			oStorage.put("ContextForgotPass", sContext);
		},

		getContextForgotPass: function() {
			jQuery.sap.require("jquery.sap.storage");
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			return oStorage.get("ContextForgotPass");
		},
		getContext: function() {
			jQuery.sap.require("jquery.sap.storage");
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);
			return oStorage.get("Contexts");
		},
		isUnauthorized: function() {
			this.getOwnerComponent().getRouter().navTo("Login");
		},
		checkSession: function() {
			var contexts = this.getContext();
			if (contexts === null) {
				this.getRouter().navTo("Login");
				return false;
			} else {
				if (contexts.SessionData.sessionID === "" || contexts.SessionData.sessionID === null) {
					this.getRouter().navTo("Login");
					return false;
				}
			}
			return true;
		},
		setViewModel: function(mModel, mName) {
			this.getView().setModel(mModel, mName);
			this.getView().getModel(mName).refresh(true);
		},
		showLoading: function(status) {
			this.getView().setBusy(status);
		},
		showBusyDialogLoading: function(getStatus, getTitle, getMessage) {
			var busyDialog = new sap.m.BusyDialog({
				title: getTitle,
				text: getMessage
			});
			if (!getStatus) {
				busyDialog.close();
			} else {
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), busyDialog);
				busyDialog.open();
			}
		},
		getNewModel: function(md) {
			var mdJson = md.getJSON();
			var mdStr = JSON.stringify(mdJson);
			var newMD = new sap.ui.model.json.JSONModel();
			newMD.setJSON(JSON.parse(mdStr));
			return newMD;
		},
		titleCase: function(str) {
			return str.toLowerCase().split(' ').map(function(word) {
				return (word.charAt(0).toUpperCase() + word.slice(1));
			}).join(' ');
		},
		mapJsonData: function(source, destination) {
			var sKeys = Object.keys(source);
			var dKeys = Object.keys(destination);
			for (var dKey in dKeys) {
				for (var sKey in sKeys) {
					if (dKeys[dKey] === sKeys[sKey]) {
						destination[dKeys[dKey]] = source[sKeys[sKey]];
					}
				}
			}
			return destination;
		}

	});
});