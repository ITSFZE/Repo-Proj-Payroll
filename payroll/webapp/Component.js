sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"com/app/payroll/model/models"
], function (UIComponent, Device, JSONModel, models) {
	"use strict";

	return UIComponent.extend("com.app.payroll.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			var dataModel = new JSONModel(sap.ui.require.toUrl("com/app/payroll/model/data.json"));
			this.setModel(dataModel);
		},

		getContentDensityClass: function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});