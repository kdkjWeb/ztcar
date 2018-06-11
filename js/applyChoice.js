//============================新旧车点击
$('#newCar').click(function() {
	$('#oldCar').removeClass('icon-danxuan').addClass('icon-danxuan2');
	$(this).removeClass('icon-danxuan2').addClass('icon-danxuan');
})

$('#oldCar').click(function() {
	$('#newCar').removeClass('icon-danxuan').addClass('icon-danxuan2');
	$(this).removeClass('icon-danxuan2').addClass('icon-danxuan');
})

//======================== 获取经销商

$(function() {
	var data = {};
	$.ajax({
		url: path + "/smDealers/list",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json",
		type: "post",
		success: function(data) {
			if(data.code == 0) {
				var list = data.list;
				//				================
				var arr = [];
				$.each(list, function(index, data, array) {
					var a = {
						title: data.dealerName,
						value: data.provinces + '?' + data.id,
					}　　　
					arr.push(a);　
				})

				//=======================
				$("#distributor").select({
					title: "选择经销商",
					items: arr,
					onChange: function() {
						$('.iconBox').each(function() {
							$(this).attr('adata', '');
							$(this).attr('box', 'false');
							$(this).removeClass('icon-danxuan').addClass('icon-danxuan2');
						});
						//						getTime();//获取分期时间
					}
				});
				//=======================
			} else {
				errAlert('提醒', '请求超时');
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
		}
	});

})

//=======产品前面的多选按钮点击事件============

 $('.iconBox').on('click',function(){	
	var _that = $(this);
		
	 $('.content_div').each(
	 	function(){
	 		$(this).find('input').removeAttr('value');
	 		$(this).find('input').removeAttr('data-values');
	 		$(this).find('input').val('');
	 	}
	)

	
	if($('#distributor').attr('data-values') != undefined) {   //判断有没有选择经销商
		
		if(_that.attr('box') == 'false') {    //判断是不是选中
			
			$('.iconBox').each(function(){    //去掉所有单选按钮状态
				$(this).removeClass('icon-danxuan').addClass('icon-danxuan2');
				$(this).attr('box', 'false');
			})
			_that.removeClass('icon-danxuan2').addClass('icon-danxuan');  //给当前选中添加样式
			_that.attr('box', 'true'); //样式
			
			
			if(_that.attr('Adata') != 'data') { //获取分期数据
				_that.attr('Adata', 'data');
				var str = $('#distributor').attr('data-values');
				var arr = str.split("?");
				var a = arr[0];
				query(a, _that.attr('num'));
			}
			
		} else if(_that.attr('box') == 'true'){
			$(this).removeClass('icon-danxuan').addClass('icon-danxuan2');
			$(this).attr('box', 'false');
		}
		
		
	} else {
		errAlert('提醒', '请先选择经销商')
	}
})

function query(id, type) { //根据经省份ID查询产品信息
	var data = {
		provinceId: id,
		loanType: type
	};
	$.ajax({
		url: path + "/product/queryProductByEreaId",
		data: JSON.stringify(data),
		// dataType: "json",
		contentType: "application/json",
		type: "post",
		success: function(data) {
			if(data.code == 0) {
				//		console.log(data)	
				var list = data.data;
				//				================
				var arr = [];
				$.each(list, function(index, data, array) {
					var a = {
						title: data.productName,
						value: data.id
					}　　　
					arr.push(a);　
				})

				if(type == '1') {
					$("#Carloan").select({
						title: "车贷分期",
						items: arr,
						onChange: function() {
							let dataVal = $(this)[0].data.values;
							if(dataVal != undefined) {
								getTime(dataVal, 'type1');
							}
						}
					});
				} else if(type == '2') {
					$("#Carrisk").select({
						title: "车险分期",
						items: arr,
						onChange: function() {
							console.log($(this))
							let dataVal = $(this)[0].data.values;
							if(dataVal != undefined) {
								getTime(dataVal, 'type2');
							}
						}
					});
				} else if(type == '3') {
					$("#Insurance").select({
						title: "维保分期",
						items: arr,
						onChange: function() {
							let dataVal = $(this)[0].data.values;
							if(dataVal != undefined) {
								getTime(dataVal, 'type3');
							}
						}
					});
				}

			} else {
				errAlert('提醒', '请求超时');
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
		}
	})

}

$("#btn1").on("click", function() {

	localStorage.clear(); //清空重置localStorage

	var carProperty = '' //新车

	if($('#newCar').hasClass('icon-danxuan')) {
		carProperty = '新车';
	} else {
		carProperty = '旧车';
	}

	var dealersId = ''; //经销商id
	
	var str = $('#distributor').attr('data-values');
	if(str != null) {
		var arr = str.split("?");
		dealersId = arr[0];
	}

	var loanId = $('#Carloan').attr('data-values'); //车贷产品id
	var premiumId = $('#Carrisk').attr('data-values'); //车险id
	var maintenanceId = $('#maintenanceId').attr('data-values'); //维保id

	var productarr = []; //产品数组

	$('.iconBox').each(function() {
		if($(this).attr('box') == 'true') {
			if($(this).attr('num') == '1') {
				let id = $('#Carloan').attr('data-values');
				let line = $('#CarloanTime').attr('data-values');
				let text = {
					Id: id,
					LoanDeadline: line
				}
				productarr.push(text);
			} else if($(this).attr('num') == '2') {
				let id = $('#Carrisk').attr('data-values');
				let line = $('#CarriskTime').attr('data-values');
				let text = {
					Id: id,
					LoanDeadline: line
				}
				productarr.push(text);
			} else if($(this).attr('num') == '3') {
				let id = $('#Insurance').attr('data-values');
				let line = $('#InsuranceTime').attr('data-values');
				let text = {
					Id: id,
					LoanDeadline: line
				}
				productarr.push(text);
			}
		}
	})
		
	if(productarr.length ==0){
		errAlert("提示", '请选择一个产品');
		return false;
	}
	
	if(productarr[0].Id == undefined) {
		errAlert("提示", '请选择一个产品');
		return false;
	}else if(productarr[0].LoanDeadline == undefined){
		errAlert("提示", '请选择产品期数');
		return false;
	}else {
		localStorage.setItem('arr', JSON.stringify(arr)); //数组
		localStorage.setItem('carProperty', JSON.stringify(carProperty)); //新车
		localStorage.setItem('dealersId', JSON.stringify(dealersId)); //经销商id
		window.location.href = "apply.html";
	}

})

//==========ios兼容readonly=====
$('input[readonly]').on('focus', function() {
	$(this).trigger('blur');
});

//==========如果没有选择经销商============
$('.content_div .input_span').on('click', function() {
	if($('#distributor').val().length < 1) {
		errAlert("提示", '请先选择经销商')
		return false;
	}
})

//=========获取贷款期数============
function getTime(dataVal, type) {
	var data = {
		productId: dataVal
	}
	$.ajax({
		url: path + "/deadlineCategory/queryeadlineByProductId",
		data: data,
		dataType: "json",
		contentType: "application/json",
		type: "get",
		success: function(data) {
			console.log(data)

			if(data.code == 0) {
				var list = data.data;
				//				================
				var arr = [];
				$.each(list, function(index, data, array) {
					var a = {
						title: data.deadLines,
						value: data.deadlinesId
					}　　　
					arr.push(a);　
				})

				if(type === 'type1') {
					$("#CarloanTime").select({
						title: "贷款期数",
						items: arr
					});
				} else if(type === 'type2') {
					$("#CarriskTime").select({
						title: "贷款期数",
						items: arr
					});
				} else if(type === 'type3') {
					$("#InsuranceTime").select({
						title: "贷款期数",
						items: arr
					});
				}

			} else {
				errAlert('提醒', '请求超时');
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
		}
	});

}