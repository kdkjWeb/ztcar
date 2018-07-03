$(function() {

	var appId = GetRequest().applyId;
	
	getList();
	
	function getList() {
		$.ajax({
			url: path + "/smBorrower/getSmFinancingByApplyId",
			data: {
				applyId:appId
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			success: function(data) {
				if(data.code == 0 || data.code == 200) {
					var listJson = data.data;
					
					if(listJson.orderNum){   //订单号
						$('#orderNum').text(listJson.orderNum);  
					}
					if(listJson.loansType){   //产品类型
						$('#loansType').val(listJson.loansType);  
					}
					if(listJson.productName){   //产品名称
						$('#productName').val(listJson.productName);  
					}
					if(listJson.dealerName){   //经销商名称
						$('#dealerName').val(listJson.dealerName);  
					}
					if(listJson.vehicleBrand){   //车辆品牌
						$('#vehicleBrand').val(listJson.vehicleBrand);  
					}
					if(listJson.carSeries){   //车系
						$('#carSeries').val(listJson.carSeries);  
					}
					if(listJson.carModels){   //车型
						$('#carModels').val(listJson.carModels);  
					}
					if(listJson.carOpenFare){   //车辆开票价
						$('#carOpenFare').val(listJson.carOpenFare);  
					}
					if(listJson.vehicleFinancing){   //车辆融资额
						$('#vehicleFinancing').val(listJson.vehicleFinancing);  
					}
					if(listJson.proportionDownPayment){   //首付比例
						$('#proportionDownPayment').val(listJson.proportionDownPayment);  
					}
					if(listJson.downPaymentAmount){   //首付金额
						$('#downPaymentAmount').val(listJson.downPaymentAmount);  
					}
					if(listJson.insurancePremium){   //保险费
						$('#insurancePremium').val(listJson.insurancePremium);  
					}
					if(listJson.serviceCharge){   //GPS服务费
						$('#serviceCharge').val(listJson.serviceCharge);  
					}
					if(listJson.purchaseTax){   //购置税
						$('#purchaseTax').val(listJson.purchaseTax);  
					}
					if(listJson.chechuanTax){   //车船税
						$('#chechuanTax').val(listJson.chechuanTax);  
					}
					if(listJson.otherTax){   //其他
						$('#otherTax').val(listJson.otherTax);  
					}
					if(listJson.totalLoan){   //贷款总额
						$('#totalLoan').text(listJson.totalLoan);  
					}
					
					
					
				} else {
					errLay('请求失败')
				}
			}
		});
	}

})