$(function() {
	//================如果是返回的刷新页面
	window.onpageshow = function(event) {　　
		if(event.persisted) {　　　　
			window.location.reload()　　
		}
	};
//	=====================
	var importId = GetRequest().applyId;
	var listJson;
	var carList; //汽车品牌数组
	var audiList; //车系数组
	var typeList; //车型数组

	var Route; //路径
	getExsit(); //判断下一个页面

	//	===================
	var CarProportion; //车贷比例
	var AddProportion; //加融比例
	var AmountDown; //总额下线
	var AmountUp; //总额上限
	var rateDown; //费率下线
	var rateUp; //费率上线

	var firstRatio = $('#firstRatio'); //首付比例
	var firstPayment = $('#firstPayment'); //首付金额
	var ticketPrice = $('#ticketPrice') //车辆开票价
	var carFinancing = $('#carFinancing'); //车辆融资额
	var errorFinan = $('#errorFinan'); //融资额的错误信息
	var TotalLoan = $('#TotalLoan'); //贷款总额
	var rate = $('#rate'); //费率
	var coefficient = $('#coefficient'); //万元还款系数
	var month = $('#month'); //还款期限
	var payment = $('#payment'); //预估月供

	var insurance = $('#insurance'); //保险费
	var purchase = $('#purchase'); //购置税
	var ship = $('#ship'); //车船税
	var gps = $('#gps'); //GPS服务费
	var other = $('#other'); //其他
	var iptDislable = $('.iptDislable');

	var paymentValCtr; // 1-车贷比例-加融比例

	var maxAge;   //产品年龄限制 ,上限
	var minAge;  //产品年龄，下限
	var userAge;    //用户年龄

	getCar(); //获取车辆品牌 
	
	OrderUse(importId,function(){
		getList(); //回显
	});
	
	$("#city").cityPicker({
	    title: "请选择上牌城市",
	    showDistrict: false
	  });


	$("#month").select({
		title: "贷款期数",
		items: [],
		onChange: function() {
			if($(this)[0].data.values && listJson.productId){		
				var goodsMonth = parseFloat(month.val()); //选择的产品期数
				var year = accDiv(goodsMonth,12);    //贷款期数折合年数 
				var present =  accAdd(userAge,year);  //借款人当前年纪+贷款期数折合年数		

				if(present < maxAge && userAge > minAge){
					getDeadline($(this)[0].data.values,listJson.productId);
					rate.val('');
					coefficient.val('');
				}else{
					errLay('您的年龄不符合该产品要求');
					month.val('');
					rate.val('');
					coefficient.val('');
					return false;
				}
				
			}
		}
	});

	//	=============首付金额不能大于车辆开票价
	firstPayment.change(function() {
		var a = Number(firstPayment.val()); //首付金额
		var b = Number(ticketPrice.val()); // 车辆开票价；
		if(a >= b || a < 0) { //首付金额大于等于 车辆开票价
			errLay('首付金额不能大于等于车辆开票价');
			firstRatio.val(''); //清空首付比例
			firstPayment.val(''); //清空首付金额
//			carFinancing.val('') //清空车辆融资额
			TotalLoan.text(''); //清空贷款总额
			payment.text(''); //清空预估月供
		}
	});


	//	=============首付比例不能大于100
	firstRatio.change(function() {
		var a = Number(firstRatio.val()); //首付比例
		if(a > 100 || a <= 0) {
			errLay('首付比例错误');
			firstRatio.val(''); //清空首付比例
			firstPayment.val(''); //清空首付金额
//			carFinancing.val('') //清空车辆融资额
			TotalLoan.text(''); //清空贷款总额
			payment.text(''); //清空预估月供
		}
	});

	//============费率和万元还款系数的计算规则=================

	coefficient.change(setRate);

	function setRate() { //已知期数和万元还款系数，求费率
		if(month.val() && coefficient.val()) {
			var m = parseFloat(month.val()); //贷款期数	
			var t = accDiv(parseFloat(coefficient.val()), 100); //获取万元还款系数	
			var a = accMul(t, m); //万元还款系数*期数
			var b = accDiv(a, 10000); //万元还款系数*期数/10000
			var c = accMul(b, 100);
			var d = accSub(c, 1); //万元还款系数*期数/10000-1
			var e = accMul(d, 100); //百分比小数转整数
			rate.val(keepTwo(e)) //填写费率
			rate.change();
		}
	}

	rate.change(setCoefficient);

	function setCoefficient() { //已知期数和费率，求万元还款系数\
		if(month.val() && rate.val()) {
			var m = parseFloat(month.val()); //贷款期数	
			var t = accDiv(parseFloat(rate.val()), 100); //获取费率
			var a = accAdd(1, t); // 1+费率
			var n = accMul(10000, a); //10000*1+费率
			var b = accDiv(n, m); //  10000*1+费率 / 期数
			coefficient.val(keepTwo(b)); //输入万元还款系数
		}
	}

	function getCoefficient(myrate) {   //更具费率，获取万元还款系数
		if(month.val()) {
			var m = parseFloat(month.val()); //贷款期数	
			var t = accDiv(parseFloat(myrate), 100); //获取费率
			var a = accAdd(1, t); // 1+费率
			var n = accMul(10000, a); //10000*1+费率
			var b = accDiv(n, m); //  10000*1+费率 / 期数
			return keepTwo(b);
		}
	}

	//============费率和万元还款系数的计算规则=================

	//	====贷款总额的方法
	function countTotalLoan(TotalNum) {
		if(TotalNum >= AmountDown && TotalNum <= AmountUp) {
			var num = keepTwo(TotalNum);
			TotalLoan.text(num);
			TotalLoan.change();
			errorFinan.hide(); //贷款总额额错误信息..
		} else {
			var num = keepTwo(TotalNum);
			if(TotalNum < AmountDown) {
				errorFinan.text('贷款总额不得低于' + AmountDown + '元，当前贷款总额为' + num + '元');
			}
			if(TotalNum > AmountUp) {
				errorFinan.text('贷款总额不得高于' + AmountUp + '元，当前贷款总额为' + num + '元');
			}
			errLay('贷款总额错误');
			errorFinan.show(); //显示错误信息
			TotalLoan.text(''); //清空贷款总额
			payment.text(''); //清空预估月供
		}
	}

	//	=========月供计算
	TotalLoan.change(setPayment);
	rate.change(setPayment);

	function setPayment() {
		var m = parseFloat(month.val()); //贷款期数		
		var t = parseFloat(TotalLoan.text()); //贷款总额
		var r = accDiv(parseFloat(rate.val()), 100); //获取费率
		if(m && t && r) {
			var a = accAdd(1, r)
			var b = accMul(t, a)
			var c = accDiv(b, m)
			payment.text(keepTwo(c)); //填写月供
		}
	}

	$("#save").on("click", function() {
		if(!Verification()) {
			return false;
		}

		if(!$('#TotalLoan').text()) {
			errLay('请填写贷款总额');
			return false;
		}

		if(!$('#payment').text()) {
			errLay('请填写预估月供');
			return false;
		}
		
		listJson.spCity = $('#city').val();//上牌城市
		listJson.vehicleBrand = $('#Vehicle').val(); //车辆品牌
		listJson.carSeries = $('#audi').val(); //车系
		listJson.carModels = $('#type').val(); //车型
		listJson.carOpenFare = $('#ticketPrice').val(); //车辆开票价
		listJson.reimbursementDeadline = $('#month').val(); //还款期限
		listJson.deadlineId = $('#month').attr('data-values');  //期数id

		listJson.wyhkxs = $('#coefficient').val(); //万元还款系数
		listJson.rate = $('#rate').val(); //费率
		listJson.proportionDownPayment = $('#firstRatio').val(); //首付比例
		listJson.downPaymentAmount = $('#firstPayment').val(); //首付金额
		listJson.vehicleFinancing = $('#carFinancing').val(); //车辆融资额

		listJson.insurancePremium = $('#insurance').val(); //保险费
		listJson.purchaseTax = $('#purchase').val(); //购置税
		listJson.chechuanTax = $('#ship').val(); //车船税
		listJson.serviceCharge = $('#gps').val(); //GPS服务费
		listJson.otherTax = $('#other').val(); //其他

		listJson.totalLoan = $('#TotalLoan').text(); //贷款总额
		listJson.yujiYugong = $('#payment').text(); //预估月供

		saveList();

	})

	//	=======回显======
	function getList() {
		var data = {
			applyId: importId
		}
		$.ajax({
			url: path + "/smFinancing/selectFinancingByApplyIdEx?time=" + new Date().getTime(),
			data: data,
			dataType: "json",
			contentType: "application/json",
			type: "get",
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load

				if(data.code == 0) {
					listJson = data.data;

					content(listJson.smProductApplycontent); ////显示和必填验证
					
					if(listJson.spCity){   //上牌城市
						$('#city').val(listJson.spCity)
					}
					
					if(listJson.idNum){  //用户年龄
						userAge = GetAge(listJson.idNum);
					}
					
					if(listJson.heighAge){   //年龄限制 上限
						maxAge = listJson.heighAge;
					}
					
					if(listJson.minAge){   //年龄限制 下限
						minAge = listJson.minAge;
					}else{
						minAge = 18;  //如果没有，默认18岁
					}
					
					if(listJson.loansType) {
						$('#loansType').text(listJson.loansType); //贷款类型
					}
					if(listJson.vehicleBrand) {
						$('#Vehicle').val(listJson.vehicleBrand); //车辆品牌
					}
					if(listJson.carSeries) {
						$('#audi').val(listJson.carSeries); //车系
						getCarModel(listJson.carSeries)
					}
					if(listJson.carModels) {
						$('#type').val(listJson.carModels); //车型
					}
					if(listJson.carOpenFare) {
						$('#ticketPrice').val(listJson.carOpenFare); //车辆开票价
					}
					if(listJson.reimbursementDeadline) {
						$('#month').val(listJson.reimbursementDeadline); //还款期限
					}
					if(listJson.deadlineId) {
						$('#month').attr('data-values',listJson.deadlineId); //还款期限id
					}
					
					if(listJson.deadlineList) {
						var arr = [];
						for(var i = 0; i < listJson.deadlineList.length; i++) {
							var a = {
								title: listJson.deadlineList[i].text,
								value: listJson.deadlineList[i].code
							};
							arr.push(a);
						}
						$("#month").select("update", {
							items: arr
						});
					}
					if(listJson.deadlineId && listJson.productId){
						getDeadline(listJson.deadlineId,listJson.productId);
					}
					
					if(listJson.wyhkxs) {
						$('#coefficient').val(listJson.wyhkxs); //万元还款系数
					}
					if(listJson.rate) {
						$('#rate').val(listJson.rate); //费率
					}
					if(listJson.proportionDownPayment) {
						$('#firstRatio').val(listJson.proportionDownPayment); //首付比例
					}
					if(listJson.downPaymentAmount) {
						$('#firstPayment').val(listJson.downPaymentAmount); //首付金额
					}
					if(listJson.vehicleFinancing) {
						$('#carFinancing').val(listJson.vehicleFinancing); //车辆融资额
					}
					if(listJson.insurancePremium) {
						$('#insurance').val(listJson.insurancePremium); //保险费
					}
					if(listJson.purchaseTax) {
						$('#purchase').val(listJson.purchaseTax); //购置税
					}
					if(listJson.chechuanTax) {
						$('#ship').val(listJson.chechuanTax); //车船税
					}
					if(listJson.serviceCharge) {
						$('#gps').val(listJson.serviceCharge); //GPS服务费
					}
					if(listJson.otherTax) {
						$('#other').val(listJson.otherTax); //其他
					}
					if(listJson.totalLoan) {
						$('#TotalLoan').text(listJson.totalLoan); //贷款总额
					}
					if(listJson.yujiYugong) {
						$('#payment').text(listJson.yujiYugong); //预估月供
					}
					if(listJson.vehicleBrandId) { //如果回显有车辆品牌，那么查询车系
						getCartype(listJson.vehicleBrandId)
					}

					if(listJson.vehicleLoanRatio) {
						CarProportion = accDiv(listJson.vehicleLoanRatio, 100); //车贷比例
					} else {
						CarProportion = 0;
					}

					if(listJson.proportionsRatio) {
						AddProportion = accDiv(listJson.proportionsRatio, 100); //加融比例
					} else {
						AddProportion = 0;
					}

					paymentValCtr = accSub(1, accAdd(CarProportion, AddProportion)); // 1-车贷比例-加融比例

					AmountDown = Number(listJson.financingAmountDown); //贷款总额下限
					AmountUp = Number(listJson.financingAmountUp); //贷款总额上限

					if(listJson.intervalValue == 0) { //费率为区间还是定值，0是定制
						$("#rate").select({
							title: "费率",
							items: []
						})
						$("#rate").parents('.weui-cell').append('<i class="iconfont icon-xiangxia1"></i>');
						
						$("#coefficient").select({
							title: "万元还款系数",
							items:[]
						});
						
						$("#coefficient").parents('.weui-cell').append('<i class="iconfont icon-xiangxia1"></i>');
						
					}

					if(listJson.accountMethod == 0) {
						ruleOne();
						iptDislable.removeClass("must"); // 规则一加融项不必填
						console.log('规则一');
					} else if(listJson.accountMethod == 1) {
						console.log('规则二')
						ruleTwo();
						$('#thawing').before($('#thawingDom')); //加融选项放在首付比例前
						firstRatio.attr('readonly','readonly');  //首付比例和首付金额  不能手动填写
						firstRatio.css('border','none');
						firstPayment.attr('readonly','readonly');
						firstPayment.css('border','none');
						
					} else if(listJson.accountMethod == 2) {
						ruleThree();
						$('#firstRatio').parents(".weui-cell").addClass("hide");
						$('#firstRatio').removeClass("must");
						$('#firstPayment').parents(".weui-cell").addClass("hide");
						$('#firstPayment').removeClass("must");
						$('#carFinancing').parents(".weui-cell").addClass("hide");
						$('#carFinancing').removeClass("must");
						console.log('规则三');
					} else if(listJson.accountMethod == 3) {
						ruleFour();
						$('#firstRatio').parents(".weui-cell").addClass("hide");
						$('#firstRatio').removeClass("must");
						$('#firstPayment').parents(".weui-cell").addClass("hide");
						$('#firstPayment').removeClass("must");
						$('#carFinancing').parents(".weui-cell").addClass("hide");
						$('#carFinancing').removeClass("must");
						$('#other').parents(".weui-cell").removeClass("hide");
						$('#other').addClass("must");
						console.log('规则四');
					}

				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}

	//========保存跳转下个页面==============
	function saveList() {
		$.ajax({
			url: path + "/smFinancing/saveFinancing",
			data: JSON.stringify(listJson),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load	
				if(data.code == 0) {
					window.location.href = Route + ".html?applyId=" + importId;
				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}

	//====================获取汽车品牌=============
	function getCar() {
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getBrandNameList",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					carList = data.data;

					$(document).on('click', '#Vehicle', function() {
						Distributor(carList);
					})

					$(document).on('focus', '#Vehicle', function() {
						Distributor(carList);
					})

					$(document).on('input', '#Vehicle', function() {
						search($(this).val());
					})

				} else {
					errLay(data.msg);
				}
			}
		});
	}

	//====================获取车系=============
	function getCartype(id) {
		$.ajax({
			url: path + "/smdrive/getDriveSeriesList",
			data: {
				brandId: id
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					audiList = data.data;
				} else {
					errLay(data.msg);
				}

			}
		});
	}

	//====================获取车型=============
	function getCarModel(titles) {
		$.ajax({
			url: path + "/smdrive/getDriveModelList",
			data: {
				seriesName: titles
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					typeList = data.data;
				} else {
					errLay(data.msg);
				}
			}
		});
	}

	//	======模糊查询下拉===================
	function search(keyWord) {
		var len = carList.length;
		var arr = [];
		for(var i = 0; i < len; i++) {
			//如果字符串中不包含目标字符会返回-1
			if(carList[i].text.indexOf(keyWord) >= 0) {
				arr.push(carList[i]);
			}
		}
		Distributor(arr);
	}
	//===========车辆品牌下拉==========
	function Distributor(arr) {
		$('body').addClass('modal-open');
		var brandVal = $('#Vehicle').val();
		$('#mySelect').remove();
		var text = '<div id="mySelect">' +
			'<div id="selectContent" class="carList">';

		for(var i = 0; i < arr.length; i++) {
			if(brandVal == arr[i].text) {
				text += '<div class="mylabel active" code="' + arr[i].code + '">';
			} else {
				text += '<div class="mylabel" code="' + arr[i].code + '">';
			}
			text += '<p>' + arr[i].text + '</p>' +
				'</div>';
		}
		text += '</div>' + '</div>';
		$('#addselectOne').append(text);
		$('#mySelect').fadeIn();
	}
	$(document).on('click', '.carList .mylabel', function() {
		$(this).addClass('active').siblings('.mylabel').removeClass('active');
		var myVal = $(this).find('p').text();
		var code = $(this).attr('code');
		$('#Vehicle').val(myVal);
		$('#Vehicle').attr('code', code);
		clear(code); //清空下拉框
		$('#mySelect').remove();
		$('body').removeClass('modal-open');
	})

	function clear(code) { ////==========清除输入框========
		getCartype(code)
		$('#audi').val('');
		$('#type').val('');
	}
	//===================车系========================================================
	$(document).on('click', '#audi', function() {
		audiSelect(audiList);
	})
	$(document).on('focus', '#audi', function() {
		audiSelect(audiList);
	})
	$(document).on('input', '#audi', function() {
		console.log($(this).val());
		audiSearch($(this).val());
	})

	function audiSelect(arr) {
		$('body').addClass('modal-open');
		var brandVal = $('#audi').val();
		$('#mySelect').remove();
		var text = '<div id="mySelect">' +
			'<div id="selectContent" class="audiSelect">';

		for(var i = 0; i < arr.length; i++) {
			if(brandVal == arr[i]) {
				text += '<div class="mylabel active">';
			} else {
				text += '<div class="mylabel">';
			}
			text += '<p>' + arr[i] + '</p>' +
				'</div>';
		}
		text += '</div>' + '</div>';
		$('#addselectTwo').append(text);
		$('#mySelect').fadeIn();
	}

	function audiSearch(keyWord) {
		var len = audiList.length;
		var arr = [];
		for(var i = 0; i < len; i++) {
			//如果字符串中不包含目标字符会返回-1
			if(audiList[i].indexOf(keyWord) >= 0) {
				arr.push(audiList[i]);
			}
		}
		audiSelect(arr);
	}

	$(document).on('click', '.audiSelect .mylabel', function() {
		$(this).addClass('active').siblings('.mylabel').removeClass('active');
		var myVal = $(this).find('p').text();
		getCarModel(myVal);
		$('#audi').val(myVal);
		$('#type').val('');
		$('#mySelect').remove();
		$('body').removeClass('modal-open');
	})

	//	==============车型===================
	$(document).on('click', '#type', function() {
		typeSelect(typeList);
	})

	$(document).on('focus', '#type', function() {
		typeSelect(typeList);
	})

	$(document).on('input', '#type', function() {
		typeSearch($(this).val());
	})

	function typeSelect(arr) {
		$('body').addClass('modal-open');
		var brandVal = $('#type').val();
		$('#mySelect').remove();
		var text = '<div id="mySelect">' +
			'<div id="selectContent" class="typeSelect">';

		for(var i = 0; i < arr.length; i++) {
			if(brandVal == arr[i]) {
				text += '<div class="mylabel active">';
			} else {
				text += '<div class="mylabel">';
			}
			text += '<p>' + arr[i] + '</p>' +
				'</div>';
		}
		text += '</div>' + '</div>';
		$('#addselectThree').append(text);
		$('#mySelect').fadeIn();
	}

	function typeSearch(keyWord) {
		var len = typeList.length;
		var arr = [];
		for(var i = 0; i < len; i++) {
			//如果字符串中不包含目标字符会返回-1
			if(typeList[i].indexOf(keyWord) >= 0) {
				arr.push(typeList[i]);
			}
		}
		typeSelect(arr);
	}

	$(document).on('click', '.typeSelect .mylabel', function() {
		$(this).addClass('active').siblings('.mylabel').removeClass('active');
		var myVal = $(this).find('p').text();
		$('#type').val(myVal);
		$('#mySelect').remove();
		$('body').removeClass('modal-open');
	})

	//============================================================
	function content(mycontent) {
		if(mycontent.isShowThisPage != 1) {
			window.location.href = "basicMsg.html?applyId=" + importId;
		} else {
			for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {
				if(mycontent.smProductApplycontents[i].label == "spCity") { //上牌城市
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#city').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#city').addClass("must");
						}
					}

				}
				else if(mycontent.smProductApplycontents[i].label == "vehicle") { //车辆品牌
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#Vehicle').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#Vehicle').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "carSeries") { //车系
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#audi').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#audi').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "carModels") { //车型
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#type').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#type').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "carOpenFare") { //车辆开票价
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#ticketPrice').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#ticketPrice').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "deadline") { //贷款期数
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#month').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#month').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "deadline") { //贷款期数
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#month').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#month').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "rate") { //费率
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#rate').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#rate').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "wyhkxs") { //万元还款系数
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#coefficient').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#coefficient').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "doPayment") { //首付比例
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#firstRatio').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#firstRatio').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "doPayAmount") { //首付金额
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#firstPayment').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#firstPayment').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "vehicleFin") { //车辆融资额
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#carFinancing').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#carFinancing').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "inPremium") { //保险费
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#insurance').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#insurance').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "gpsCharge") { //GPS服务费
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#gps').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#gps').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "purTax") { //购置税
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#purchase').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#purchase').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "chechuan") { //车船税
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#ship').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#ship').addClass("must");
						}
					}

				} else if(mycontent.smProductApplycontents[i].label == "other") { //其他
					if(mycontent.smProductApplycontents[i].isShow == 1) {
						$('#other').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#other').addClass("must");
						}
					}

				}

			}
		}
	}

	function getExsit() {
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/isExsitOtherPersion",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					var content = data.data;

					if(content.isSqr == 1) {
						Route = 'basicMsg'; //借款人基本信息第一个页面
						return
					} else if(content.isPo == 1) {
						Route = 'married'; //配偶
						return
					} else if(content.isGtcz == 1) {
						Route = 'tenant'; //承租人
						return
					} else if(content.isZrdb == 1) {
						Route = 'guarantor'; //个人担保
						return
					} else if(content.isJjlx == 1) {
						Route = 'urgent'; //紧急联系人
						return
					}

				} else {
					errLay(data.msg);
				}
			}
		});
	}

	//	==========================

	function ruleOne() {
		ticketPrice.change(setFirstRatio);
		firstRatio.change(setFirstRatio);

		function setFirstRatio() { //已知开票价和首付比例，自动填写首付金额
			if(ticketPrice.val() && firstRatio.val()) {
				var firstRatioVal = accDiv(parseFloat(firstRatio.val()), 100) //获取首付比例
				if(firstRatioVal>0 && firstRatioVal >= paymentValCtr) { //如果首付  大于 1-车贷比例-加融比例
					var text = accMul(ticketPrice.val(), firstRatioVal); //自动填写首付金额
					firstPayment.val(keepTwo(text));
				} else {
					if(firstRatioVal<=0){
						errLay('首付比例需大于0%');
						firstRatio.val(''); //清空首付比例
						firstPayment.val(''); //清空首付金额
						carFinancing.val('') //清空车辆融资额
						TotalLoan.text(''); //清空贷款总额
						payment.text(''); //清空预估月供
					}else{
						var a = keepTwo(paymentValCtr * 100);
						errLay('首付比例不得低于' + a + "%");
						firstRatio.val(''); //清空首付比例
						firstPayment.val(''); //清空首付金额
						carFinancing.val('') //清空车辆融资额
						TotalLoan.text(''); //清空贷款总额
						payment.text(''); //清空预估月供
					}
					
				}
			}
		}

		//==================
		ticketPrice.change(setFirstPayment);
		firstPayment.change(setFirstPayment);

		function setFirstPayment() { //已知开票价和首付金额，填写首付比例
			if(ticketPrice.val() && firstPayment.val()) {
				var firstPaymentVal = parseFloat(firstPayment.val()); //获取首付金额
				var Ctr = accMul(paymentValCtr, ticketPrice.val()); //（1-车贷比例-加融比例）*车辆开票价
				var myCtr = keepTwo(Ctr)
				if(firstPaymentVal>0 && firstPaymentVal >= Ctr) {
					var mytext = accDiv(firstPayment.val(), ticketPrice.val()); //首付比例 = 首付金额/车辆开票价
					var newText = accMul(mytext, 100);
					firstRatio.val(keepTwo(newText));
					firstRatio.change();
				} else {
					if(firstPaymentVal<=0){
						errLay('首付比例需大于0%');
						firstRatio.val(''); //清空首付比例
						firstPayment.val(''); //清空首付金额
						carFinancing.val('') //清空车辆融资额
						TotalLoan.text(''); //清空贷款总额
						payment.text(''); //清空预估月供
					}else{
						errLay('首付金额不得低于' + myCtr);
						firstRatio.val(''); //清空首付比例
						firstPayment.val(''); //清空首付金额
						carFinancing.val('') //清空车辆融资额
						TotalLoan.text(''); //清空贷款总额
						payment.text(''); //清空预估月供
					}
					
				}
			}
		}

		//=============
		ticketPrice.change(setCarFinancing);
		firstRatio.change(setCarFinancing);

		function setCarFinancing() { //已知开票价和首付比例,填写车辆融资额
			if(ticketPrice.val() && firstRatio.val()) {
				var firstRatioVal = accDiv(parseFloat(firstRatio.val()), 100) //获取首付比例
				var shouldDown = accSub(1, firstRatioVal); //1-首付比例

				if(shouldDown <= CarProportion) { // 1-首付比例  小于或等于车贷比例
					var mytext = accMul(ticketPrice.val(), shouldDown); //车辆开票价*（1-首付比例）
					carFinancing.val(keepTwo(mytext)).change();
				} else {
					var mytext = accMul(ticketPrice.val(), CarProportion); //车辆融资额=车辆开票价*车贷比例.
					carFinancing.val(keepTwo(mytext)).change();
				}
			}
		}

		//	==============
		firstRatio.change(iptDislable);
		if(firstRatio.val()) { //回显时，如果1-首付比例  小于或等于车贷比例 ，灰色不填
			iptDislable();
		}

		function iptDislable() { //已知首付比例,车贷比例，判断是否禁用保险费。。。。
			if(firstRatio.val()) {
				var firstRatioVal = accDiv(parseFloat(firstRatio.val()), 100); //获取首付比例
				var shouldDown = accSub(1, firstRatioVal); //1-首付比例
				if(shouldDown <= CarProportion) { // 1-首付比例  小于或等于车贷比例
					$('.iptDislable').attr('readonly', 'readonly');
					$('.iptDislable').css('background-color', '#E3E3E3');
					$('.iptDislable').val('');
					$('body').on('focus', '.iptDislable', function() {
						$(this).blur();
					})
				} else {
					$('.iptDislable').removeAttr('readonly');
					$('.iptDislable').css('background-color', '#FFFFFF');
					$("body").off("focus", ".iptDislable");
				}
			}

		}

		//===================
		ticketPrice.change(setTotalLoan);
		firstRatio.change(setTotalLoan);
		carFinancing.change(setTotalLoan);

		function setTotalLoan() { //已知首付比例，开票价和车贷融资额填写贷款总额
			if(ticketPrice.val() && firstRatio.val() && carFinancing.val()) {
				var firstRatioVal = accDiv(parseFloat(firstRatio.val()), 100) //获取首付比例
				var shouldDown = accSub(1, firstRatioVal); //1-首付比例
				if(shouldDown <= CarProportion) { // 1-首付比例  小于或等于车贷比例
					var mytext = accMul(ticketPrice.val(), shouldDown); //总额 = 车辆开票价*（1-首付比例）
					countTotalLoan(mytext);
				} else {
					//当（1-首付比例）大于车贷比例时，贷款总额=车辆融资额（）+车辆开票价*加融比例）
					var rongzi = accMul(ticketPrice.val(), CarProportion); //车辆融资额=车辆开票价*车贷比例.
					var myNum = accSub(1, accAdd(firstRatioVal, CarProportion)); //1-首付比例-车贷比例
					var mytext = accMul(ticketPrice.val(), myNum);
					var neText = accAdd(rongzi, mytext) //总额 = 车辆融资额+车辆开票价*加融贷款比例（即1-车贷比例-首付比例）
					countTotalLoan(neText);
				}
			}
		}

	}


//	==========规则二
	function ruleTwo() {

		function getOther() {
			var num = 0;
			
			var insuranceVal = 0;
			var purchaseVal = 0;
			var shipVal = 0;
			var gpsVal = 0;
			var otherVal = 0;
			
			if(insurance.val()) {
				insuranceVal = insurance.val();
			}
			if(purchase.val()) {
				purchaseVal = purchase.val();
			}
			if(ship.val()) {
				shipVal = ship.val();
			}
			if(gps.val()) {
				gpsVal = gps.val();
			}
			if(other.val()) {
				otherVal = other.val();
			}
			
			var a = accAdd(insuranceVal, purchaseVal);
			var b = accAdd(a, shipVal);
			var c = accAdd(b, gpsVal);
			var d = accAdd(c, otherVal);
			
			num = d;
			return num;
		}

		//================================
		ticketPrice.change(getFirstRatio);
		iptDislable.change(getFirstRatio);

		function getFirstRatio() { //已知保险+gps+车船+购置   车贷比例,加融比例 ，开票价   //填写首付比例
			if(ticketPrice.val()) {
				var a = getOther(); //其他加成税
				var b = accMul(a, AddProportion); //（保费+GPS+车船税……）*加融比例
				var c = accDiv(b, ticketPrice.val()) //（保费+GPS+车船税……）*加融比例/开票价
				var d = accSub(1, CarProportion) //1-车贷比例
				var e = accSub(d, c); //1-车贷比例  - [（保费+GPS+车船税……）*加融比例/开票价]   
				var f = accMul(e, 100);
				firstRatio.val(keepTwo(f)).change(); //填写首付比例		
			}
		}
		
		//	=====================
		ticketPrice.change(getFirstPayment);
		TotalLoan.change(getFirstPayment);
		iptDislable.change(getFirstPayment);

		function getFirstPayment() { //已知车辆开票价，，贷款总额   //填写首付金额
			var t = parseFloat(TotalLoan.text()); //贷款总额
			var c = accSub(ticketPrice.val(), t);
			firstPayment.val(keepTwo(c)).change();
		}
		
		//	========================
		ticketPrice.change(getTotalLoan);
		iptDislable.change(getTotalLoan);

		function getTotalLoan() { //已知车辆开票价，车贷比例，保险+gps+车船+购置，加融比例  //填写贷款总额：	
			if(ticketPrice.val()) {
				var a = getOther(); //其他加成税
				var b = accMul(ticketPrice.val(), CarProportion); ///车辆开票价*车贷比例
				var c = accMul(a, AddProportion); ///（保费+GPS+车船税……）*加融比例
				var d = accAdd(b, c); // 车辆开票价*车贷比例   +（保费+GPS+车船税……）*加融比例
				countTotalLoan(d);
			}
		}

		//	=================
		ticketPrice.change(getCarFinancing);

		function getCarFinancing() { //已知，车辆开票价,车贷比例    、//填写车辆融资额
			var mytext = accMul(ticketPrice.val(), CarProportion) //车辆融资额=车辆开票价*车贷比例
			carFinancing.val(keepTwo(mytext));
		}

	}

	function ruleThree() {
		//		==========贷款总额=车辆开票价*加融比例
		ticketPrice.bind('change', function() {
			var kpj = $(this).val()
			var num = accMul(kpj, AddProportion);
			countTotalLoan(num);
		});
	}

	function ruleFour() {
		other.bind('change', function() {
			var num = $(this).val();
			countTotalLoan(num);
		});
	}

	function getDeadline(code, id) {
		mydata = {
			deadlineId: code,
			productId: id
		}
		$.ajax({
			url: path + "/smFinancing/getDeadlineRateListByDeadlineId",
			data: mydata,
			dataType: "json",
			contentType: "application/json",
			type: "get",
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load	
				if(data.code == 0) {
					if(data.data.intervalValue == 0) { //费率为区间还是定值，0是定制	
						var arr = quickSort(data.data.rateList, 0, data.data.rateList.length - 1);
						$("#rate").select("update", {
							items: arr
						});
						var CoefficientArr= [];
						for(var i = 0; i<arr.length;i++){
							CoefficientArr.push(getCoefficient(arr[i]))
						}
						$("#coefficient").select("update", {
							items:CoefficientArr
						});
					} else {
						rateDown = data.data.rateDown; //费率下线
						rateUp = data.data.rateUp; //费率上线
						$(document).on('change', '#rate', function() {
							var num = Number($(this).val());
							if(num < rateDown || num > rateUp) {
								errLay('费率须介于' + rateDown + '%到' + rateUp + '%之间');
								rate.val('');
								coefficient.val('');
							}
						})
					}
				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}


	//加在返回的页面，如果是通过历史返回，刷新页面
	window.onpageshow = function(event) {
	　　if (event.persisted) {
	　　　　window.location.reload() 
	　　}
	};

})