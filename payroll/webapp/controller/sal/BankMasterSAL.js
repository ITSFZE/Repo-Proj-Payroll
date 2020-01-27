sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/json/JSONModel"
],
	function (BaseController, JSONModel) {
		"use strict";
		return BaseController.extend("com.app.payroll.controller.sal.BankMasterSAL", {
			getAccountList: function (filter) {
				var deferred = $.Deferred();
				var jModel = new JSONModel();
				var url = "http://192.168.30.118:8082/api/HouseBankAccounts" + "?$filter=" + filter;
				$.ajax({
					type: 'GET',
					url: url,
					success: function(response) {
						jModel.setData(response);
						jModel.setSizeLimit(response.value.length);
						deferred.resolve(jModel);
					},
					error: function(xhr) {
						deferred.reject(xhr.responseJSON.body.Message);
					}
				});
				return deferred.promise();
			}
		});
	});

