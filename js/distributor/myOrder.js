$(function() {
	var Route;

	getList();

	$(document).on('click', '.cancel', function() { //取消订单
		var id = $(this).parents('.list').attr('dataId')
		myAlert(id);
	})

	$(document).on('click', '#no', function() { //取消订单弹框的取消按钮
		$('#errBox').remove();
	})

	$(document).on('click', '#yes', function() { //取消订单弹框的取消按钮
		var id = $(this).attr('dataId');
		var MYtext = $('#cancelCause').val();
		if(MYtext) {
			cancelOrder(id, MYtext);
		} else {
			errLay('请输入取消原因')
		}
	})

	//	============弹框============
	function myAlert(id) {
		var text = '<div class="pop-box" id="errBox">' +
			'<div class="mask"></div>' +
			'<div class="box1">' +
			'<span>请输入取消原因</span>' +
			'<input type="text" value="" placeholder="请输入取消原因" id="cancelCause"/>' +
			'<div class="btn-box">' +
			'<a href="javascript:;" class="weui-btn weui-btn_primary" id="no">取消</a>' +
			'<a href="javascript:;" class="weui-btn weui-btn_primary" id="yes" dataId="' + id + '">确定</a>' +
			'</div>' +
			'</div>' +
			'</div>'
		$('body').append(text);
	}

	//================获取列表============
	function getList() {
		$.ajax({
			url: path + "/SmOrder/getOrderFormListByDealersId",
			data: {},
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					if(data.orderList.length > 0) {
						for(var i = 0; i < data.orderList.length; i++) {
							setList(data.orderList[i])
						}
					} else {
						$('.content').html('<div style="text-align: center;">暂无订单数据</div>')
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

	//==========遍历列表====
	function setList(arr) {

		var text = '<div class="list" dataId="' + arr.id + '" applyId ="' + arr.applyId + '"  nodeId="' + arr.nodeId + '">' +
			'<div class="c-list">' +
			'<div class="basic-msg">' +
			'<div class="basic">' +
			'<p class="name">' + arr.borrowerName + '</p>'
		if(arr.borrowerPhone) {
			text += '<p class="phone">' + arr.borrowerPhone + '</p>';
		}
		text += '</div>' +
			'<div class="cre"><label>贷款金额：</label>';
		if(arr.totalLoan) {
			text += '<span>' + arr.totalLoan + '</span>';
		} else {
			text += '<span>无</span>';
		}
		text += '</div>' +
			'</div>' +
			'<div class="basic-msg">' +
			'<div class="titName">产品名称：' + arr.productName + '</div>' +
			'</div>';

		text += '<div class="btn">';

		if(arr.flowType == "2") { //完善贷款信息；
			if(arr.status == 0) { //未取消状态
				text += '<div class="choose distributorMsg">' + arr.nodeName + '</div>' +
					'<div class="cancel">订单取消</div>';
			} else {
				text += '<div class="errCan">订单已取消</div>';
			}
		} else if(arr.flowType == "3") { //提交初审资料
			if(arr.status == 0) { //未取消状态
				text += '<div class="choose submission" type="0">' + arr.nodeName + '</div>' +
					'<div class="middle distributorMsg">贷款信息修改</div>' +
					'<div class="cancel">订单取消</div>';
			} else {
				text += '<div class="errCan">订单已取消</div>';
			}
		} else if(arr.flowType == "4") { //初审资料审核中
			text += '<div class="errCan">初审资料审核中</div>';
		}
		else if(arr.flowType == 5){  //录入车辆信息
			text += '<div class="errCan">车辆信息录入</div>';	
		}
		else if(arr.flowType == 6){  //代签合同
			text += '<div class="errCan">待签合同</div>';	
		}
		else if(arr.flowType == "7") { //提交放款资料
			if(arr.status == 0) { //未取消状态
				text += '<div class="choose credit" type="1">' + arr.nodeName + '</div>' +
					'<div class="middle">修改资料</div>' +
					'<div class="cancel">订单取消</div>' +
					'<div class="tit">' +
					'<div class="distributorMsg">修改贷款信息</div>' +
					'<div class="submission" type="0">修改初审资料</div>' +
					'<div class="carMsg">车辆信息录入</div>' +
					'</div>';
			} else {
				text += '<div class="errCan">订单已取消</div>';
			}
		} else if(arr.flowType == "8") { //放款资料审核中
			text += '<div class="errCan">放款资料审核中</div>';
		} else if(arr.flowType == "9") { //已放款
			text += '<div class="errCan">已放款</div>';
		} else if(arr.flowType == "10") { //提交放款后资料
			text += '<div class="choose afterCredit" type="2">' + arr.nodeName + '</div>';
		} else if(arr.flowType == "11") { //放款后资料审核中
			text += '<div class="errCan">放款后资料审核中</div>';
		} else {
			text += '<div class="errCan">订单完成</div>';
		}

		text += '</div>' +
			'</div>' +
			'<div class="line"></div>' +
			'</div>' +
			'</div>';

		$(".content").append(text);

	}

	//	==================取消订单ajax
	function cancelOrder(id, mytext) {
		var data = {
			id: id,
			cancelCause: mytext,
			status: -1
		}
		$.ajax({
			url: path + "/SmOrder/updateOrderStatus",
			data: JSON.stringify(data),
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				if(data.code == 0) {
					document.location.reload(); //当前页面 
				} else {
					errLay(data.msg);
				}

			}
		});
	}

	//		=====================
	$(document).on('click', '.middle', function() {
		$(this).siblings('.tit').toggle();
	})

	//===========================

	$(document).on('click', '.distributorMsg', function() {
		var applyid = $(this).parents('.list').attr('applyid');
		getExsit(applyid);
	})

	function getExsit(importId) {
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

					if(content.isJxs == 1) {
						Route = 'distributorMsg'; //经销商信息
					} else if(content.isRj == 1) {
						Route = 'financing'; //填写融资信息
						return;
					} else if(content.isSqr == 1) {
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

					window.location.href = Route + '.html?applyId=' + importId;
				} else {
					errLay(data.msg);
				}

			}
		});
	}

	//	========提交初审资料==========
	$(document).on('click', '.submission', function() {
		var applyid = $(this).parents('.list').attr('applyid');
		var nodeId = $(this).parents('.list').attr('nodeId');
		var type = $(this).attr('type');
		window.location.href = 'submission.html?applyId=' + applyid + '&dataType=' + type + '&dataId=' + nodeId;
	})

	//==========提交放款资料==========
	$(document).on('click', '.credit', function() {
		var applyid = $(this).parents('.list').attr('applyid');
		var nodeId = $(this).parents('.list').attr('nodeId');
		var type = $(this).attr('type');
		window.location.href = 'credit.html?applyId=' + applyid + '&dataType=' + type + '&dataId=' + nodeId;
	})

	//	====提交放款后资料=========
	$(document).on('click', '.afterCredit', function() {
		var applyid = $(this).parents('.list').attr('applyid');
		var nodeId = $(this).parents('.list').attr('nodeId');
		var type = $(this).attr('type');
		window.location.href = 'afterCredit.html?applyId=' + applyid + '&dataType=' + type + '&dataId=' + nodeId;
	})

	//	=====车辆信息录入=========
	$(document).on('click', '.carMsg', function() {
		var applyid = $(this).parents('.list').attr('applyid');
		window.location.href = 'carMsg.html?applyId=' + applyid;
	})


	pushHistory();
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"    };
        window.history.pushState(state, "title", "#");
    };
    window.onpopstate = function() {
        location.href="distributorMenu.html";
    };
		
})