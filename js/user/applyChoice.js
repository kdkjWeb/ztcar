$(function() {
	
	$('#distributor').val('');
	
	var listJson; //经销商数据
	//	==========
	$("#Carloan").select({
		title: "车贷分期",
		items: ['']
	});

	$("#Carrisk").select({
		title: "车险分期",
		items: ['']
	});

	$("#Insurance").select({
		title: "维保分期",
		items: ['']
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
		url: path + "/smDealers/queryDealersNameList",
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

		$(".content_div input").select("close");

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
			contentType: "application/json",
			type: "post",
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load	
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
					
					$('#Carloan').attr('disabled','disabled');
					$('#Carrisk').attr('disabled','disabled');
					$('#Insurance').attr('disabled','disabled');
					
					if(type == '1') {
						console.log('1')
						$("#Carloan").select("update", {
							items: arr
						});
						$('#Carloan').removeAttr('disabled');
					} else if(type == '2') {
						console.log('2')
						$("#Carrisk").select("update", {
							items: arr
						});
						$('#Carrisk').removeAttr('disabled');
					} else if(type == '3') {
						console.log('3')
						$("#Insurance").select("update", {
							items: arr
						});
						$('#Insurance').removeAttr('disabled');
					}
				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg)
			}
		})

	}

	$("#btn1").on("click", function() {

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
		var loanType = ''; //产品类型
		var loanText = '';
		

		$('.iconBox').each(function() {
			if($(this).attr('box') == 'true') {
				if($(this).attr('num') == '1') {
					var id = $('#Carloan').attr('data-values');
					var line = $('#CarloanTime').attr('data-values');
					loanId = id;
					loanType = $(this).attr('num');
					loanText = $('#Carloan').val();
				} else if($(this).attr('num') == '2') {
					var id = $('#Carrisk').attr('data-values');
					var line = $('#CarriskTime').attr('data-values');
					loanId = id;
					loanType = $(this).attr('num');
					loanText = $('#Carrisk').val();
				} else if($(this).attr('num') == '3') {
					var id = $('#Insurance').attr('data-values');
					var line = $('#InsuranceTime').attr('data-values');
					loanId = id;
					loanType = $(this).attr('num');
					loanText = $('#Insurance').val();
				}
			}
		});

		if(loanText == '' || loanText == '暂无产品可选') {
			errLay('请选择一个产品');
			return false;
		}
		
		localStorage.removeItem("carProperty");
		localStorage.removeItem("dealersId");
		localStorage.removeItem("loanId");
		localStorage.removeItem("loanType");


		localStorage.setItem('carProperty', JSON.stringify(carProperty)); //新车
		localStorage.setItem('dealersId', JSON.stringify(dealersId)); //经销商id
		localStorage.setItem('loanId', JSON.stringify(loanId));   //产品id
		localStorage.setItem('loanType', JSON.stringify(loanType));   // 产品类型

		window.location.href = "apply.html";

	});

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
		
		$('#mySelect').fadeOut();
		$('#mySelect').remove();
		$('body').removeClass('modal-open');
		//		============
		clear(); //清空下拉框
		getOne(); //默认选中车贷分期

	})
	
	function getOne() { //默认选中车贷分期
		$('.iconBox').eq(0).attr('box', 'true');
		$('.iconBox').eq(0).attr('adata', 'data');
		$('.iconBox').eq(0).removeClass('icon-danxuan2').addClass('icon-danxuan');
		var province = $('#distributor').attr('province'); //省份
		var selectid = $('#distributor').attr('selectid'); //id
		query(province, $('.iconBox').eq(0).attr('num'), selectid); //查询产品
	}
	

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
		$(".content_div input").select("close");
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

	

});