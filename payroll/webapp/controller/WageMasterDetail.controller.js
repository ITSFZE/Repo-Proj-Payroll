sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.WageMasterDetail", {

		onInit: function () {
			var that = this;
			var oRouter = this.getRouter();
			oRouter.getRoute("WageMasterDetail").attachMatched(this._onRouteMatched, this);
			oRouter.getRoute("DetailOne").attachMatched(that._onObjectEditMatched, that);

		},
		_onObjectMatched: function () {

		},
		_onObjectEditMatched: function (evt) {
		  var getPars = evt.getParameters().arguments;
		  var getMDL = this.getView().getModel("data");
		  var getMDLData  = getMDL.mContexts["/wageTypes/"+getPars.id].getObject();
		  var ddModel = new JSONModel(getMDLData);
		  this.getView().setModel(ddModel,"DetailOne");
		  
		}

	});

});