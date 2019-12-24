sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("com.app.payroll.controller.WageMasterDetail", {

		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("WageMasterDetail").attachMatched(this._onCreateRouteMatched, this);
			oRouter.getRoute("EditWageMasterDetail").attachMatched(this._onEditRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		_onCreateRouteMatched: function(){
			var ddModel = new JSONModel({});
			this.getView().setModel(ddModel,"EditWageMasterDetail");
		
		},
		_onEditRouteMatched: function(evt){

			var getPars = evt.getParameters().arguments;
			var getMDL = this.getView().getModel("undefined");
			var getMDLData  = getMDL.mContexts["/wageTypes/"+getPars.id].getObject();
			var ddModel = new JSONModel(getMDLData);
			this.getView().setModel(ddModel,"EditWageMasterDetail");
		
			
		}
	});

});