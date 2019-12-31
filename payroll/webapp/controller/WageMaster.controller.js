//WageMaster Controller is used to control the WageMaster view events
sap.ui.define([
	"com/app/payroll/controller/BaseController",
	'sap/m/MessageToast',
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, MessageToast, JSONModel, Filter, FilterOperator) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.WageMaster", {
		//onInit function is initiate the methods and properties at the file opening time
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("WageMaster").attachMatched(this._onRouteMatched, this);
			oRouter.getRoute("EditWageMasterDetail").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		_onRouteMatched: function() {

		},
		//This is doing press event to navigate the item details and edit view
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
		//This is navigating back to Home page
		onPressNavBack: function () {
			this.getRouter().navTo("Dashboard");
		}
	});

});