sap.ui.define([
	"com/app/payroll/controller/BaseController",
	'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, MessageToast, JSONModel, Filter, FilterOperator) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.WageMaster", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("WageMaster").attachMatched(this._onRouteMatched, this);
			oRouter.getRoute("EditWageMasterDetail").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		_onRouteMatched: function() {

		},
		onListItemPress: function (oEvent) {
			if(oEvent.getSource().oBindingContexts.undefined){
				if(oEvent.getSource().oBindingContexts.undefined.getObject()){
					var oItem = oEvent.getSource().oBindingContexts.undefined.getObject();
					this.getOwnerComponent().getRouter()
					.navTo("EditWageMasterDetail", {
						id: oItem.id
					});
				}else{
					// Error
				}
			}else{
				// Error
			}
		},
		onPressNavBack: function () {
			this.getRouter().navTo("Dashboard");
		}
	});

});