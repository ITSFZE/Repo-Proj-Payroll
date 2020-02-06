sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.PayrollAreaDetail", {

		onInit: function () {
            var that = this;
            var oRouter = this.getRouter();
			oRouter.getRoute("PayrollAreaMaster").attachMatched(that._onRouteMatched, that);
			oRouter.getRoute("EditPayrollArea").attachMatched(that._onRouteEditMatched, that);
			//--- Here View Id's of all the View ---//
			that._iPArea = that.getView().byId("iPArea");
			that._iDescription = that.getView().byId("iDescription");
            that._iPeriodParameter = that.getView().byId("iPeriodParameter");
            that._iStatus = that.getView().byId("iStatus");
            			//--- Page Header ---//
            that._pageHeader = that.getView().byId("iPAreaPage");
		},
		_onRouteMatched: function() {
			var that = this;
            that._iPArea.setValueState("None");
            that._iDescription.setValueState("None");
            that._iPeriodParameter.setValueState("None");
			that._pageHeader.setTitle("Create Payroll Area");
		},
		_onRouteEditMatched: function(oEvent) {
			var that = this;
			var getPArea = oEvent.getParameter("arguments").pArea;
            var newMdl = new JSONModel(getPArea);
            that._pageHeader.setTitle("Edit Payroll Area");
            that.getView().setModel(newMdl, "EditPayrollAreaMdl")
        },
        onPressCancel: function(){
            this.getOwnerComponent().getRouter().navTo("PayrollAreaMaster");
        }
    });
});