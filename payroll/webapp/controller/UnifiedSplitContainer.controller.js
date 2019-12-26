sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/ButtonType",
	"sap/m/Text",
	"sap/m/MessageItem",
	"sap/m/Link",
	"sap/m/MessagePopover",
	"sap/ui/core/Popup"
], function (BaseController, JSONModel, Fragment, MessageToast, Button, Dialog, ButtonType, Text, MessageItem, Link, MessagePopover, Popup) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.UnifiedSplitContainer", {
		onInit: function () {
            var oRouter = this.getRouter();
			oRouter.attachRouteMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			var oUserModel = new JSONModel(sap.ui.require.toUrl("com/app/payroll/model/UserData.json"));
			this.getView().setModel(oUserModel, "UserModel");
		},
		handleMenuPress: function (oEvent) {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},
		onAfterRendering: function () {
			var oButton = this.byId("userQuickView");
			oButton.$().attr("aria-haspopup", true);
		},
		openQuickView: function (oEvent, oModel) {
			var oButton = oEvent.getSource();

			if (!this._oQuickView) {
				Fragment.load({
					name: "com.app.payroll.view.fragment.UserQuickView",
					controller: this
				}).then(function (oQuickView) {
					this._oQuickView = oQuickView;
					this._configQuickView(oModel);
					this._oQuickView.openBy(oButton);
				}.bind(this));
			} else {
				this._configQuickView(oModel);
				this._oQuickView.openBy(oButton);
			}
		},
		_configQuickView: function (oModel) {
			this.getView().addDependent(this._oQuickView);
			this._oQuickView.close();
			this._oQuickView.setModel(oModel);
		},
		onPressUserQuickView: function (oEvent) {
			var oModel = this.getView().getModel("UserModel");
			this.openQuickView(oEvent, oModel);
		},
		onNavigate: function (oEvent) {
			var oNavOrigin = oEvent.getParameter("navOrigin");
			if (oNavOrigin) {
				MessageToast.show('Link "' + oNavOrigin.getText() + '" was clicked');
			} else {
				MessageToast.show("Back button was clicked");
			}
		},
		onExit: function () {
			if (this._oQuickView) {
				this._oQuickView.destroy();
			}
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		},
		onPressLogout: function () {
			var that = this;
			var oDialog = new Dialog({
				title: "Confirm",
				type: "Message",
				state: "Warning",
				content: new Text({
					text: "Are you sure you want to logout?"
				}),
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: "Sign-Out",
					press: function () {
						oDialog.close();
						that.getRouter().navTo("Login");
					}
				}),
				endButton: new Button({
					text: "Cancel",
					press: function () {
						oDialog.close();
					}
				}),
				afterClose: function () {
					oDialog.destroy();
				}
			});
			// sync compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), oDialog);
			oDialog.open();
		},
		handleRespPopoverSettingsPress: function (oEvent) {
			var oButton = oEvent.getSource();

			if (!this._oPopover) {
				Fragment.load({
					name: "com.app.payroll.view.fragment.SettingsMenuItem",
					controller: this
				}).then(function (oPopover) {
					this._oPopover = oPopover;
					this.getView().addDependent(this._oPopover);
					this._oPopover.open(this._bKeyboard, oButton, Popup.Dock.BeginTop, Popup.Dock.BeginBottom, oButton);
				}.bind(this));
			} else {
				this._oPopover.open(this._bKeyboard, oButton, Popup.Dock.BeginTop, Popup.Dock.BeginBottom, oButton);
			}
		},
		handleCloseButton: function (oEvent) {
			this._oPopover.close();
		},
		onItemSelect: function (oEvent) {
			var that = this;
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			toolPage.setSideExpanded(false);
			var item = oEvent.getParameter("item");
				switch (item.getKey()) {
					case 'JobMaster':
						that.getRouter().navTo(item.getKey());
						break;
					case 'WageMaster':
						that.getRouter().navTo(item.getKey());
						break;
					case 'EmployeeGroup':
						that.getRouter().navTo(item.getKey());
						break;
					default:
						this.getRouter().navTo(item.getKey());
						break;
				}
		}
	});
});