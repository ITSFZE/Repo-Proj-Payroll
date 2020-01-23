sap.ui.define([
	"com/app/payroll/controller/BaseController",
	"sap/ui/model/json/JSONModel"
],
	function(BaseController, JSONModel) {
		"use strict";

		return BaseController.extend("com.app.payroll.controller.sal.BankMasterSAL", {
			onInit: function() {
				this.checkSession();
            },
            /* fetchBanks:function(){
                var settings = {
                    "url": "http://192.168.30.118:8082/api/HouseBankAccounts?$filter=$select=BankCode,AccNo,Branch,Street,Block,ZipCode,City,County,Country,State,BISR,IBAN,BankKey,ISRType,AddressType,StreetNo,Building,AccountName,BICSwiftCode",
                    "method": "GET",
                    "timeout": 0,
                  };
                  
                  $.ajax(settings).done(function (response) {
                    console.log(response);
                  });
            }, */
            fetchSports: function(that, filter) {
				var deferred = $.Deferred();
				var context = this.getContext();
				var jModel = new JSONModel();
				var URL = context.baseURL + "?cmd=Get" + "&actionUri=HouseBankAccounts" + "&sessionID=" + context.SessionData.sessionID +
					"&routeID=" + context.SessionData.routeID + "&filter=" + filter + "&URITypes=" + context.URLTypes;
				$.ajax({
					type: 'GET',
					url: URL,
					cache: false,
					crossDomain: true,
					success: function(response) {
						jModel.setData(response.body);
						jModel.setSizeLimit(response.body.value.length);
						deferred.resolve(jModel);
					},
					error: function(xhr) {
						deferred.reject(xhr.responseJSON.body.Message);
					}
				});
				return deferred.promise();
			},
