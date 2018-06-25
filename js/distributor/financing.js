$(function() {

	//	getCar(); //获取车辆品牌 

	$("#audi").select({
		title: "请选择车系",
		items: []
	})
	$("#type").select({
		title: "请选择车型",
		items: []
	})
	$("#month").select({
		title: "请选择还款期限",
		items: [{
			title: "12期",
			value: "12",
		},{
			title: "24期",
			value: "24",
		},{
			title: "36期",
			value: "36",
		},{
			title: "48期",
			value: "48",
		}]
	})
	$("#payment").on("blur", function() {

	})
	$(".weui-btn").on("click", function() {
		window.location.href = "basicMsg.html"
	})

	//====================获取汽车品牌=============
	function getCar() {
		let data = {
			id: 1
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
					var arr = [];
					for(var i = 0; i < data.data.length; i++) {
						let car = {
							title: data.data[i].text,
							value: data.data[i].code
						};
						arr.push(car);
					}
					$("#Vehicle").select({
						title: "现有车辆品牌",
						items: arr,
						onChange: function() {
							let dataVal = $(this)[0].data.values;
							if(dataVal != undefined) {
								$('#audi').val('');
								getCartype(dataVal);
							}
						}
					})
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
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
						}
					})
				}

			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
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
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		});
	}

	var CarProportion = 0.8; //车贷比例
	var AddProportion = 0.15; //加融比例

	var firstRatio = $('#firstRatio'); //首付比例
	var firstPayment = $('#firstPayment'); //首付金额
	var ticketPrice = $('#ticketPrice') //车辆开票价
	var carFinancing = $('#carFinancing'); //车辆融资额
	var TotalLoan = $('#TotalLoan'); //贷款总额
	var rate = $('#rate'); //费率
	var coefficient = $('#coefficient'); //万元还款系数
	var month = $('#month');  //还款期限
	var payment = $('#payment');  //预估月供
	

	var paymentValCtr = accSub(1, accAdd(CarProportion, AddProportion)); // 1-车贷比例-加融比例

	firstRatio.blur(setFirstRatio); //首付比例失去焦点事件
	firstPayment.blur(setFirstPayment); //首付比例失去焦点事件

	firstRatio.change(setCarFinancing); //填写首付金额
	firstRatio.change(iptDislable); //
	firstRatio.change(setTotalLoan);
		
	coefficient.change(setRate)   //填写万元还款系数后，自动修改费率
	rate.change(setCoefficient)  //填写费率后，自动修改万元还款系数
	
	rate.change(setPayment)  //填写费率后，自动修改万元还款系数


	function setFirstRatio() { //已知开票价和首付比例，填写首付金额
		var firstRatioVal = accDiv(parseFloat(firstRatio.val()),100)//获取首付比例
//		var firstRatioVal = parseFloat(firstRatio.val())/100;

		if(firstRatioVal >= paymentValCtr) { //如果首付  大于 1-车贷比例-加融比例
			var text = accMul(ticketPrice.val(), firstRatioVal); //自动填写首付金额
			firstPayment.val(keepTwo(text));
		} else {
			errLay('首付比例需大于或等于' + paymentValCtr)
		}
	}

	function setFirstPayment() {   //已知开票价和首付金额，填写首付比例
		var firstPaymentVal = parseFloat(firstPayment.val());   //获取首付金额
		var Ctr = accMul(paymentValCtr, ticketPrice.val()); //（1-车贷比例-加融比例）*车辆开票价
		
		if(firstPaymentVal >= Ctr) {
			var text = accDiv(firstPayment.val(), ticketPrice.val()); //首付比例 = 首付金额/车辆开票价
			var newText = accMul(text, 100);
			firstRatio.val(keepTwo(newText));
			firstRatio.change();  
		} else {
			errLay('首付金额需大于或等于' + Ctr);
		}
	}

	function setCarFinancing() { //填写车辆融资额
		var firstRatioVal = accDiv(parseFloat(firstRatio.val()),100)//获取首付比例
		
		var shouldDown = accSub(1, firstRatioVal); //1-首付比例
		if(shouldDown <= CarProportion) { // 1-首付比例  小于或等于车贷比例
			var text = accMul(ticketPrice.val(), shouldDown); //车辆开票价*（1-首付比例）
			carFinancing.val(keepTwo(text));
		} else {
			var text = accMul(ticketPrice.val(), CarProportion); //车辆融资额=车辆开票价*车贷比例.
			carFinancing.val(keepTwo(text));
		}
	}

	function iptDislable() { //警用
		var firstRatioVal = accDiv(parseFloat(firstRatio.val()),100)//获取首付比例
		
		var shouldDown = accSub(1, firstRatioVal); //1-首付比例
		if(shouldDown <= CarProportion) { // 1-首付比例  小于或等于车贷比例
			$('.iptDislable').attr('readonly', 'readonly');
			$('.iptDislable').css('background-color', '#E3E3E3');
		} else {
			$('.iptDislable').removeAttr('readonly');
			$('.iptDislable').css('background-color', '#FFFFFF');
		}
	}

	function setTotalLoan() {
		var firstRatioVal = accDiv(parseFloat(firstRatio.val()),100)//获取首付比例
		
		var shouldDown = accSub(1, firstRatioVal); //1-首付比例
		if(shouldDown <= CarProportion) { // 1-首付比例  小于或等于车贷比例
			var text = accMul(ticketPrice.val(), shouldDown); //车辆开票价*（1-首付比例）
			TotalLoan.text(keepTwo(text));
		} else {
			//当（1-首付比例）大于车贷比例时，贷款总额=车辆融资额（）+车辆开票价*加融比例）
			var rongzi = accMul(ticketPrice.val(), CarProportion); //车辆融资额=车辆开票价*车贷比例.
			var myNum = accSub(1, accAdd(firstRatioVal, CarProportion)); //1-首付比例-车贷比例
			var text = accMul(ticketPrice.val(), myNum);
			var neText = accAdd(rongzi, text)
			TotalLoan.text(keepTwo(neText));
		}
	}

	function setRate() {
		var m = parseFloat(month.attr('data-values'));	 //贷款期数	
		var t = accDiv(parseFloat(coefficient.val()),100)//获取万元还款系数	
		var a = accMul(t,m);  //万元还款系数*期数
		var b = accDiv(a,10000);  //万元还款系数*期数/10000
		var c = accMul(b,100);
		var d = accSub(c,1);   //万元还款系数*期数/10000-1
		var e = accMul(d,100);  //百分比小数转整数
		rate.val(keepTwo(e))
		rate.change();
		
	}
	
	function setCoefficient(){
		var m = parseFloat(month.attr('data-values'));	 //贷款期数	
		var t = accDiv(parseFloat(rate.val()),100)//获取费率
		var a = accAdd(1,t);		// 1+费率
		var n = accMul(10000,a);    //10000*1+费率
		var b = accDiv(n,m);   //  10000*1+费率 / 期数
		coefficient.val(keepTwo(b))
	}
	
	function setPayment(){
		var m = parseFloat(month.attr('data-values'));	 //贷款期数	
		var t = parseFloat(TotalLoan.text());	 //贷款总额
		var r = accDiv(parseFloat(rate.val()),100)//获取费率
		
		var a = accAdd(1,r)
		var b = accMul(t,a)
		var c = accDiv(b,m)
		payment.text(c)
	}
	
	
})