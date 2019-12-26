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
	"sap/ui/core/Popup",
	"com/app/payroll/controller/BaseController"
], function (BaseController, JSONModel, Fragment, MessageToast, Button, Dialog, ButtonType, Text, MessageItem, Link, MessagePopover, Popup) {
	"use strict";
	return BaseController.extend("com.app.payroll.controller.Dashboard", {
		//Init Function is used to initiate the methods and properties at opening time of file
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("Dashboard").attachMatched(this._onRouteMatched, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			var oUserModel = new JSONModel(sap.ui.require.toUrl("com/app/payroll/model/UserData.json"));
			this.getView().setModel(oUserModel, "UserModel");
		},
		//handleMenuPress Function is used to show the details of menu
		handleMenuPress: function (oEvent) {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},
		//AfterRendering Function is used to call every time when the view is rendered 
		onAfterRendering: function () {
			var oButton = this.byId("userQuickView");
			oButton.$().attr("aria-haspopup", true);
		},
		//openQuickView Function is used to open the User profile
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
		//configQuickView is use for closing the QuickView
		_configQuickView: function (oModel) {
			this.getView().addDependent(this._oQuickView);
			this._oQuickView.close();
			this._oQuickView.setModel(oModel);
		},
		//PressUserQuickView Function is used to get the binding models
		onPressUserQuickView: function (oEvent) {
			var oModel = this.getView().getModel("UserModel");
			this.openQuickView(oEvent, oModel);
		},
		//Navigate Function is used to navigate the page
		onNavigate: function (oEvent) {
			var oNavOrigin = oEvent.getParameter("navOrigin");
			if (oNavOrigin) {
				MessageToast.show('Link "' + oNavOrigin.getText() + '" was clicked');
			} else {
				MessageToast.show("Back button was clicked");
			}
		},
		//Exit Function is used to destruction of view 
		onExit: function () {
			if (this._oQuickView) {
				this._oQuickView.destroy();
			}
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		},
		//PressLogout Function is used to sign-out the application from the system
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
		//handleRespPopoverSetting is used to set the application like changePassword,editProfile,changeLanguage
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
				this._oPopover.open(this._bKeyboard, oButton, Popup.Dock.BeginTop, Popup.Dock.BeginBottom, oButton);;
			}
		},
		//handleCloseButton is used to close the dialog box
		handleCloseButton: function (oEvent) {
			this._oPopover.close();
		},
		//ItemSelect Function is used to side navigate the different pages wrt user choice
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
		},
		//TilePress Function is used to navigate the different pages wrt user choice
		onTilePress: function (oEvt) {
			var that = this;
			var getPages = oEvt.getSource().data("route");
				switch (getPages) {
					case 'JobMaster':
							that.getRouter().navTo(getPages);
						break;
					case 'EmployeeGroup':
							that.getRouter().navTo(getPages);
						break;
					case 'WageMaster':
							that.getRouter().navTo(getPages);
						break;
					default:
							this.getRouter().navTo(getPages);
				}
		}
	});
});