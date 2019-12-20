sap.ui.define([
    'sap/m/Button',
	'sap/m/Dialog',
    'sap/m/Text',
    "sap/ui/core/routing/History",
	'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller"
 ], function (Controller) {
    "use strict";
    return Controller.extend("com.app.payroll.controller.BaseController", {
		onInit: function() {

        },
        getRouter: function() {
			getThis = this;
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

    });
 });