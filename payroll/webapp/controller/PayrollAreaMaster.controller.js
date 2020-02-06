sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.PayrollAreaMaster", {

		onInit: function () {
            var that = this;
            //var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
            var oRouter = this.getRouter();
			oRouter.getRoute("PayrollAreaMaster").attachMatched(that._onRouteMatched, that);
			oRouter.getRoute("EditPayrollArea").attachMatched(that._onRouteMatched, that);
        },
        _onRouteMatched: function(oEvt) {
            var that = this;
        },
        onPressListItem: function(oEvent) {
			var that = this;
			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext(undefined).getObject()
			that.getOwnerComponent().getRouter().navTo("EditPayrollArea", {
				pArea: oCtx.pArea
            });
		}
    });
});