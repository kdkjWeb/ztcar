$(function() {
	$('#distributor').val('');
	
	var listJson; //经销商数据

	//	==========
	$("#Carloan").select({
		title: "车贷分期",
		items: [],
		onChange: function() {
			let dataVal = $(this)[0].data.values;
			if(dataVal != undefined) {
				$('#Carloan').attr('age', $(this)[0].data.origins[0].age);
				getTime(dataVal, 'type1');
			}
		}
	});

	$("#Carrisk").select({
		title: "车险分期",
		items: [],
		onChange: function() {
			let dataVal = $(this)[0].data.values;
			if(dataVal != undefined) {
				$('#Carrisk').attr('age', $(this)[0].data.origins[0].age);
				getTime(dataVal, 'type2');
			}
		}
	});

	$("#Insurance").select({
		title: "维保分期",
		items: [],
		onChange: function() {
			let dataVal = $(this)[0].data.values;
			if(dataVal != undefined) {
				$('#Insurance').attr('age', $(this)[0].data.origins[0].age);
				getTime(dataVal, 'type3');
			}
		}
	});

	$("#CarloanTime").select({
		title: "贷款期数",
		items: []
	});
	
	$("#CarriskTime").select({
		title: "贷款期数",
		items: []
	});
	
	$("#CarloanTime").select({
		title: "InsuranceTime",
		items: []
	});
	
	//============================新旧车点击
	document.querySelector("#newCar").addEventListener("click", function() {
		$('#oldCar').removeClass('icon-danxuan').addClass('icon-danxuan2');
		$(this).removeClass('icon-danxuan2').addClass('icon-danxuan');
	}, false);

	document.querySelector("#oldCar").addEventListener("click", function() {
		$('#newCar').removeClass('icon-danxuan').addClass('icon-danxuan2');
		$(this).removeClass('icon-danxuan2').addClass('icon-danxuan');
	}, false);

	//======================== 获取经销商
	var data = {};
	$.ajax({
		url: path + "/smDealers/list",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json",
		type: "post",
		beforeSend: function() {
			showLoading();//显示loading	
		},
		success: function(data) {
			hideLoading();  //隐藏load	
			if(data.code == 0) {
				listJson = data.list;
			} else {
				errLay('请求超时');
			}
		},error:function(request, textStatus, errorThrown){
			hideLoading();  //隐藏load	
			errLay(request.responseJSON.msg);
		}
	});

	//=======产品前面的多选按钮点击事件============

	$('.iconBox').on('click', function() {

		$(".content_div input").select("update",{items: []});
		
		var _that = $(this);

		clear(); //清空下拉框

		if($('#distributor').attr('selectid') != undefined) { //判断有没有选择经销商

			if(_that.attr('box') == 'false') { //判断是不是选中

				$('.iconBox').each(function() { //去掉所有单选按钮状态
					$(this).removeClass('icon-danxuan').addClass('icon-danxuan2');
					$(this).attr('box', 'false');
				});
				_that.removeClass('icon-danxuan2').addClass('icon-danxuan'); //给当前选中添加样式
				_that.attr('box', 'true'); //样式

				if(_that.attr('Adata') != 'data') { //获取分期数据
					_that.attr('Adata', 'data');
					var province = $('#distributor').attr('province'); //省份
					var selectid = $('#distributor').attr('selectid'); //id

					query(province, _that.attr('num'), selectid);
				}

			} else if(_that.attr('box') == 'true') {
				$(this).removeClass('icon-danxuan').addClass('icon-danxuan2');
				$(this).attr('box', 'false');
			}

		} else {
			errLay('请先选择经销商')
		}
	});

	function query(id, type, dealersId) { //根据经省份ID查询产品信息
		var data = {
			provinceId: id,
			loanType: type,
			dealersId: dealersId
		};
		$.ajax({
			url: path + "/product/queryProductByEreaId",
			data: JSON.stringify(data),
			// dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				if(data.code == 0) {
					var list = data.data;
					//				================
					var arr = [];
					$.each(list, function(index, data, array) {
						var a = {
							title: data.productName,
							value: data.id,
							age: data.heighAge
						};
						arr.push(a);
					});

					if(arr.length == 0) {
						arr = ["暂无产品可选"]
					}

					if(type == '1') {
						$("#Carloan").select("update", {
							items: arr
						});
					} else if(type == '2') {
						$("#Carrisk").select("update", {
							items: arr
						});
					} else if(type == '3') {
						$("#Insurance").select("update", {
							items: arr
						});
					}

				} else {
					errLay(data.msg);
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

		var carProperty = ''; //新车

		if($('#newCar').hasClass('icon-danxuan')) {
			carProperty = '新车';
		} else {
			carProperty = '旧车';
		}

		var dealersId = $('#distributor').attr('selectid'); //经销商id

		var loanId = $('#Carloan').attr('data-values'); //车贷产品id
		var premiumId = $('#Carrisk').attr('data-values'); //车险id
		var maintenanceId = $('#maintenanceId').attr('data-values'); //维保id

		var loanId = ''; //产品id
		var loanMonth = ''; //产品期数id
		var month = ''; //期数
		var loanType = ''; //产品类型
		var age = ''; //年龄

		$('.iconBox').each(function() {
			if($(this).attr('box') == 'true') {
				if($(this).attr('num') == '1') {
					let id = $('#Carloan').attr('data-values');
					let line = $('#CarloanTime').attr('data-values');
					month = parseInt($('#CarloanTime').val());
					age = $('#Carloan').attr('age');
					loanId = id;
					loanMonth = line;
					loanType = $(this).attr('num');
				} else if($(this).attr('num') == '2') {
					let id = $('#Carrisk').attr('data-values');
					let line = $('#CarriskTime').attr('data-values');
					month = parseInt($('#CarriskTime').val());
					age = $('#Carrisk').attr('age');
					loanId = id;
					loanMonth = line;
					loanType = $(this).attr('num');
				} else if($(this).attr('num') == '3') {
					let id = $('#Insurance').attr('data-values');
					let line = $('#InsuranceTime').attr('data-values');
					month = parseInt($('#InsuranceTime').val());
					age = $('#InsuranceTime').attr('age');
					loanId = id;
					loanMonth = line;
					loanType = $(this).attr('num');
				}
			}
		});

		if(!loanId) {
			errLay('请选择一个产品');
			return false;
		}
		if(!loanMonth) {
			errLay('请选择产品期数');
			return false;
		}

		localStorage.removeItem("carProperty");
		localStorage.removeItem("dealersId");
		localStorage.removeItem("age");
		localStorage.removeItem("loanId");
		localStorage.removeItem("loanMonth");
		localStorage.removeItem("month");
		localStorage.removeItem("loanType");


		localStorage.setItem('carProperty', JSON.stringify(carProperty)); //新车
		localStorage.setItem('dealersId', JSON.stringify(dealersId)); //经销商id
		localStorage.setItem('age', age); //产品年龄
		localStorage.setItem('loanId', JSON.stringify(loanId));   //产品id
		localStorage.setItem('loanMonth', JSON.stringify(loanMonth));  //产品期数id
		localStorage.setItem('month', JSON.stringify(month));     //产品期数
		localStorage.setItem('loanType', JSON.stringify(loanType));   // 产品类型

		window.location.href = "apply.html";

	});

	//==========如果没有选择经销商============
	$('.content_div .input_span').on('click', function() {
		if($('#distributor').val().length < 1) {
			errLay('请先选择经销商');
			return false;
		}
	});

	//=======================获取贷款期数============
	function getTime(dataVal, type) {
		let data = {
			productId: dataVal
		};
		$.ajax({
			url: path + "/deadlineCategory/queryeadlineByProductId",
			data: data,
			dataType: "json",
			contentType: "application/json",
			type: "get",
			success: function(data) {
				if(data.code == 0) {
					var list = data.data;
					//				================
					var arr = [];
					$.each(list, function(index, data, array) {
						var a = {
							title: data.deadLines,
							value: data.deadlinesId
						};
						arr.push(a);
					});
					if(arr.length == 0) {
						arr = ["暂无期数可选"]
					}
					if(type === 'type1'){
						$("#CarloanTime").select("update",{
							items: arr
						});
					} else if(type === 'type2'){
						$("#CarriskTime").select("update",{
							items: arr
						});
					} else if(type === 'type3'){
						$("#InsuranceTime").select("update",{
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

	//====================经销商名称=============================			

	$(document).on('input', '#distributor', function() {
		search($(this).val())
	})

	$(document).on('focus', '#distributor', function() {
		Distributor(listJson);
	})
	
	$(document).on('click', '.mylabel', function() {
		$(this).addClass('active');
		var myVal = $(this).find('p').text();
		var Province = $(this).attr('Province');
		var selectId = $(this).attr('selectId');

		$('#distributor').val(myVal);
		$('#distributor').attr('Province', Province);
		$('#distributor').attr('selectId', selectId);
		//		============
		clear(); //清空下拉框
		getOne(); //默认选中车贷分期

		$('#mySelect').fadeOut();
		$('#mySelect').remove();
		$('body').removeClass('modal-open');
	})

	function search(keyWord) {
		var len = listJson.length;
		var arr = [];
		for(var i = 0; i < len; i++) {
			//如果字符串中不包含目标字符会返回-1
			if(listJson[i].dealerName.indexOf(keyWord) >= 0) {
				arr.push(listJson[i]);
			}
		}
		Distributor(arr);
	}

	function Distributor(arr) {
		$('body').addClass('modal-open');
		$('#mySelect').remove();
		var text = '<div id="mySelect">' +
			'<div id="selectContent" >';

		for(var i = 0; i < arr.length; i++) {
			text += '<div class="mylabel" Province="' + arr[i].provinces + '" selectId="' + arr[i].id + '">' +
				'<p>' + arr[i].dealerName + '</p>' +
				'</div>';
		}
		text += '</div>' +
			'</div>';

		//		if(arr.length>0){
		$('#myHeader').append(text);
		$('#mySelect').fadeIn(50);
		//		}

	}

	//====================经销商名称=============================		

	function clear() { ////==========清除输入框
		$('.content_div').each(
			function() {
				$(this).find('input').removeAttr('value');
				$(this).find('input').removeAttr('data-values');
				$(this).find('input').removeAttr('age');
				$(this).find('input').val('');

				$(this).find('i').attr('adata', '');
				$(this).find('i').attr('box', 'false');
				$(this).find('i').removeClass('icon-danxuan').addClass('icon-danxuan2');
			}
		);
	}

	function getOne() { //默认选中车贷分期
		$('.iconBox').eq(0).attr('box', 'true');
		$('.iconBox').eq(0).attr('adata', 'data');
		$('.iconBox').eq(0).removeClass('icon-danxuan2').addClass('icon-danxuan');
		var province = $('#distributor').attr('province'); //省份
		var selectid = $('#distributor').attr('selectid'); //id
		query(province, $('.iconBox').eq(0).attr('num'), selectid); //查询产品
	}

});