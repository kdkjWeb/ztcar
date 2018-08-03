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
					if(listJson.applyDate){
						$('#applyDate').val(listJson.applyDate);
					}else{
						$('#applyDate').val('无');
					}
					if(listJson.fkDate){
						$('#fkDate').val(listJson.fkDate);
					}else{
						$('#fkDate').val('无');
					}
					
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
						$('#carOpenFare').val(keepTwo(listJson.carOpenFare) +'元');  
					}
//					if(listJson.vehicleFinancing){   //车辆融资额
//						$('#vehicleFinancing').val(keepTwo(listJson.vehicleFinancing));  
//					}
					if(listJson.proportionDownPayment){   //首付比例
						$('#proportionDownPayment').val(listJson.proportionDownPayment +'%');  
					}
					if(listJson.downPaymentAmount){   //首付金额
						$('#downPaymentAmount').val(keepTwo(listJson.downPaymentAmount) +'元');  
					}
//					if(listJson.insurancePremium){   //保险费
//						$('#insurancePremium').val(keepTwo(listJson.insurancePremium));  
//					}
//					if(listJson.serviceCharge){   //GPS服务费
//						$('#serviceCharge').val(keepTwo(listJson.serviceCharge));  
//					}
//					if(listJson.purchaseTax){   //购置税
//						$('#purchaseTax').val(keepTwo(listJson.purchaseTax));  
//					}
//					if(listJson.chechuanTax){   //车船税
//						$('#chechuanTax').val(keepTwo(listJson.chechuanTax));  
//					}
//					if(listJson.otherTax){   //其他
//						$('#otherTax').val(keepTwo(listJson.otherTax));  
//					}

					if(listJson.yujiYugong){   //预估月供
						$('#yuegong').val(keepTwo(listJson.yujiYugong) +'元');  
					}
					if(listJson.reimbursementDeadline){   //贷款期数
						$('#qishu').val(listJson.reimbursementDeadline);  
					}

					if(listJson.totalLoan){
						$('#totalLoan').text(listJson.totalLoan +'元');  
					}
				} else {
					errLay('请求失败')
				}
			}
		});
	}

})