$(function() {
	var importId = GetRequest().applyId;
	var listJson;
	var carList; //汽车品牌数组
	var Route; //路径
	getExsit(); //判断下一个页面

	//	===================
	var CarProportion; //车贷比例
	var AddProportion; //加融比例
	var AmountDown; //融资额下线
	var AmountUp; //融资额上限

	var firstRatio = $('#firstRatio'); //首付比例
	var firstPayment = $('#firstPayment'); //首付金额
	var ticketPrice = $('#ticketPrice') //车辆开票价
	var carFinancing = $('#carFinancing'); //车辆融资额
	var TotalLoan = $('#TotalLoan'); //贷款总额
	var rate = $('#rate'); //费率
	var coefficient = $('#coefficient'); //万元还款系数
	var month = $('#month'); //还款期限
	var payment = $('#payment'); //预估月供
	var aa = $('.aa');

	var insurance = $('#insurance'); //保险费
	var purchase = $('#purchase'); //购置税
	var ship = $('#ship'); //车船税
	var gps = $('#gps'); //GPS服务费
	var other = $('#other'); //其他
	var iptDislable = $('.iptDislable');

	var paymentValCtr; // 1-车贷比例-加融比例

	getCar(); //获取车辆品牌 
	getList(); //回显

	$("#audi").select({
		title: "请选择车系",
		items: []
	})
	$("#type").select({
		title: "请选择车型",
		items: []
	})

	$("#save").on("click", function() {
		if(!Verification()) {
			return false;
		}
		listJson.vehicleBrand = $('#Vehicle').val(); //车辆品牌
		listJson.carSeries = $('#audi').val(); //车系
		listJson.carModels = $('#type').val(); //车型
		listJson.carOpenFare = $('#ticketPrice').val(); //车辆开票价
		listJson.reimbursementDeadline = $('#month').val(); //还款期限

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
		let data = {
			applyId: importId
		}
		$.ajax({
			url: path + "/smFinancing/selectFinancingByApplyIdEx",
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
					if(listJson.loansType) {
						$('#loansType').text(listJson.loansType); //贷款类型
					}
					if(listJson.vehicleBrand) {
						$('#Vehicle').val(listJson.vehicleBrand); //车辆品牌
					}
					if(listJson.carSeries) {
						$('#audi').val(listJson.carSeries); //车系
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

					

					CarProportion = accDiv(listJson.vehicleLoanRatio, 100); //车贷比例
					AddProportion = accDiv(listJson.proportionsRatio, 100); //加融比例
					
					paymentValCtr = accSub(1, accAdd(CarProportion, AddProportion)); // 1-车贷比例-加融比例

					AmountDown = Number(listJson.financingAmountDown); //融资额下限
					AmountUp = Number(listJson.financingAmountUp); //融资额上限

					
					if(listJson.intervalValue == 0) { //费率为区间还是定值，0是定制
						$("#rate").select({
							title: "费率",
							items:quickSort(listJson.rateList,0,listJson.rateList.length-1)
						})
						$("#rate").parents('.weui-cell').append('<i class="iconfont icon-xiangxia1"></i>')
					} else {
						$("#rate").attr('rateDown', listJson.rateDown);
						$("#rate").attr('rateUp', listJson.rateUp);
						$(document).on('change', '#rate', function() {
							var num = Number($(this).val());
							var down = Number($("#rate").attr('rateDown')); //5
							var up = Number($("#rate").attr('rateUp')); //15
							if(num < down || num > up) {
								errLay('费率须介于' + down + '%到' + up+'%之间');
								$("#rate").val('');
								$('#coefficient').val('');
							}
						})
					}
					
					if(listJson.accountMethod == 0) {
						ruleOne();
					} else {
						ruleTwo();
						$('#thawing').before($('#thawingDom'));  //加融选项放在首付比例前
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
		let data = {
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

					$(document).on('focus', '#Vehicle', function() {
						Distributor(data.data);
					})

					$(document).on('input', '#Vehicle', function() {
						search($(this).val());
					})

					$(document).on('click', '#selectSure', function() {
						$('#mySelect').remove();
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
					var arr = [];
					for(var i = 0; i < data.data.length; i++) {
						let car = {
							title: data.data[i],
							value: [i]
						};
						arr.push(car);
					}
					$("#audi").select("update", {
						title: "车系",
						items: arr,
						onChange: function() {
							let titles = $(this)[0].data.titles;
							if(titles != undefined) {
								getCarModel(titles);
							}
							$('#type').val('');
						}
					})
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
					var arr = [];
					for(var i = 0; i < data.data.length; i++) {
						let car = {
							title: data.data[i],
							value: [i]
						};
						arr.push(car);
					}
					$("#type").select("update", {
						title: "车型",
						items: arr
					})
				} else {
					errLay(data.msg);
				}
			}
		});
	}

	function ruleTwo() {

		function getOther() {
			var num = 0;
			if(!insurance.val()) {
				insurance.val(0);
			}
			if(!purchase.val()) {
				purchase.val(0);
			}
			if(!ship.val()) {
				ship.val(0);
			}
			if(!gps.val()) {
				gps.val(0);
			}
			if(!other.val()) {
				other.val(0);
			}

			var a = accAdd(insurance.val(), purchase.val());
			var b = accAdd(a, ship.val());
			var c = accAdd(b, gps.val());
			var d = accAdd(c, other.val());

			num = d;
			return num;
		}

		//================================
		ticketPrice.change(getFirstRatio);
		iptDislable.change(getFirstRatio);

		function getFirstRatio() { //已知保险+gps+车船+购置   车贷比例加融比例 ，开票价   //填写首付比例
			if(ticketPrice.val()) {
				var a = getOther(); //其他加成税
				var b = accMul(a, AddProportion); //（保费+GPS+车船税……）*加融比例
				var c = accDiv(b, ticketPrice.val()) //（保费+GPS+车船税……）*加融比例/开票价
				var d = accSub(1, CarProportion) //1-车贷比例
				var e = accSub(d, c); //1-车贷比例  - [（保费+GPS+车船税……）*加融比例/开票价]   
				var f = accMul(e, 100);
				firstRatio.val(keepTwo(f)); //填写首付比例		
			}

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
				TotalLoan.text(keepTwo(d)); //填写贷款总额：	
				TotalLoan.change(); //填写贷款总额：	
			}

		}

		//	=====================
		ticketPrice.change(getFirstPayment);
		TotalLoan.change(getFirstPayment);
		iptDislable.change(getFirstPayment);

		function getFirstPayment() { //已知车辆开票价，，贷款总额   //填写首付金额
			var t = parseFloat(TotalLoan.text()); //贷款总额
			var c = accSub(ticketPrice.val(), t);
			firstPayment.val(keepTwo(c));
		}

		//	=================
		ticketPrice.change(getCarFinancing);
		function getCarFinancing() { //已知，车辆开票价,车贷比例    、//填写车辆融资额
			var mytext = accMul(ticketPrice.val(), CarProportion) //车辆融资额=车辆开票价*车贷比例

			if(mytext > AmountDown && mytext < AmountUp) { //车辆融资额大于下限，高于上限
				carFinancing.val(keepTwo(mytext));
			} else {
				errLay('融资额须介于' + AmountDown + '到' + AmountUp + "之间");
				carFinancing.val('');
				carFinancing.attr("placeholder",'当前融资额为'+ keepTwo(mytext));
			}

		}

		//========================
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

		//	===================
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

		//=========================
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

	}

	function ruleOne() {

		//	===========

		ticketPrice.change(setFirstRatio);
		firstRatio.change(setFirstRatio);

		function setFirstRatio() { //已知开票价和首付比例，自动填写首付金额
			if(ticketPrice.val() && firstRatio.val()) {
				var firstRatioVal = accDiv(parseFloat(firstRatio.val()), 100) //获取首付比例
				if(firstRatioVal >= paymentValCtr) { //如果首付  大于 1-车贷比例-加融比例
					var text = accMul(ticketPrice.val(), firstRatioVal); //自动填写首付金额
					firstPayment.val(keepTwo(text));
				} else {
					var a = keepTwo(paymentValCtr * 100);
					errLay('首付比例须大于或等于' + a + "%");
					firstRatio.val('');
					firstPayment.val('');
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
				if(firstPaymentVal >= Ctr) {
					var text = accDiv(firstPayment.val(), ticketPrice.val()); //首付比例 = 首付金额/车辆开票价
					var newText = accMul(text, 100);
					firstRatio.val(keepTwo(newText));
					firstRatio.change();
				} else {
					errLay('首付金额须大于或等于' + Ctr);
					firstRatio.val('');
					firstPayment.val('');
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
					if(mytext > AmountDown && mytext < AmountUp) { //车辆融资额大于下限，高于上限
						carFinancing.val(keepTwo(mytext));
						carFinancing.change();
					} else {
						errLay('融资额须介于' + AmountDown + '到' + AmountUp + "之间");
						carFinancing.val('');
						carFinancing.attr("placeholder",'当前融资额为'+ keepTwo(mytext));
					}

				} else {
					var mytext = accMul(ticketPrice.val(), CarProportion); //车辆融资额=车辆开票价*车贷比例.
					if(mytext > AmountDown && mytext < AmountUp) { //车辆融资额大于下限，高于上限
						carFinancing.val(keepTwo(mytext));
						carFinancing.change();
					} else {
						errLay('融资额须介于' + AmountDown + '到' + AmountUp + "之间");
						carFinancing.val('');
						carFinancing.attr("placeholder",'当前融资额为'+ keepTwo(mytext));
					}

				}
			}
		}

		//	==============
		firstRatio.change(iptDislable);

		if(firstRatio.val()){  //回显时，如果1-首付比例  小于或等于车贷比例 ，灰色不填
			iptDislable();
		}
		
		function iptDislable() { //已知首付比例,车贷比例，判断是否禁用保险费。。。。
			if(firstRatio.val()) {
				var firstRatioVal = accDiv(parseFloat(firstRatio.val()), 100); //获取首付比例
				var shouldDown = accSub(1, firstRatioVal); //1-首付比例

				if(shouldDown <= CarProportion) { // 1-首付比例  小于或等于车贷比例
					$('.iptDislable').attr('readonly', 'readonly');
					$('.iptDislable').css('background-color', '#E3E3E3');
					$('.iptDislable').val(0);
					$('body').on('focus','.iptDislable',function(){
						$(this).blur();
					})
				} else {
					$('.iptDislable').removeAttr('readonly');
					$('.iptDislable').css('background-color', '#FFFFFF');
					$("body").off("focus",".iptDislable");
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
					var text = accMul(ticketPrice.val(), shouldDown); //总额 = 车辆开票价*（1-首付比例）
					TotalLoan.text(keepTwo(text));
					TotalLoan.change();
				} else {
					//当（1-首付比例）大于车贷比例时，贷款总额=车辆融资额（）+车辆开票价*加融比例）
					var rongzi = accMul(ticketPrice.val(), CarProportion); //车辆融资额=车辆开票价*车贷比例.
					var myNum = accSub(1, accAdd(firstRatioVal, CarProportion)); //1-首付比例-车贷比例
					var text = accMul(ticketPrice.val(), myNum);
					var neText = accAdd(rongzi, text)
					TotalLoan.text(keepTwo(neText));
					TotalLoan.change();
				}
			}
		}

		//========================
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

		//	===================
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
		//=========================
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
				payment.text(keepTwo(c));
			}

		}

	}

	//	=======为空验证============
	function Verification() {
		var flag = true;
		$('.must').each(function() {
			if($(this).val() == '') {
				let msg = $(this).parents('.weui-cell').find('label').text();
				let str = msg.substr(0, msg.length - 1);
				errLay(str + '不能为空');
				flag = false;
				return false;
			}
		})
		return flag;
	}

	//	======模糊查询下拉=============
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

	//===========车辆品牌下拉===========
	function Distributor(arr) {
		$('body').addClass('modal-open');
		var brandVal = $('#Vehicle').val();
		$('#mySelect').remove();
		var text = '<div id="mySelect">' +
			'<div id="selectContent">';

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
		$('#addselect').append(text);
		$('#mySelect').fadeIn();
	}

	$(document).on('click', '.mylabel', function() {
		$(this).addClass('active').siblings('.mylabel').removeClass('active')
		var myVal = $(this).find('p').text();
		var code = $(this).attr('code');

		$('#Vehicle').val(myVal);
		$('#Vehicle').attr('code', code);

		clear(code); //清空下拉框
		$('#mySelect').fadeOut();
		setTimeout(function() {
			$('#mySelect').remove();
		}, 1500);
		$('body').removeClass('modal-open');
	})

	function clear(code) { ////==========清除输入框
		getCartype(code)
		$('#audi').val('');
		$('#audi').attr('value', '');
		$('#audi').attr('data-values', '');

		$('#type').val('');
		$('#type').attr('value', '');
		$('#type').attr('data-values', '');
	}

	function content(mycontent) {
		if(mycontent.isShowThisPage != 1) {
			window.location.href = "basicMsg.html?applyId=" + importId;
		} else {
			for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {

				if(mycontent.smProductApplycontents[i].label == "vehicle") { //车辆品牌
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
						$('#purchase').parents(".weui-cell").removeClass("hide");
						if(mycontent.smProductApplycontents[i].isRequire == 1) {
							$('#purchase').addClass("must");
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


})