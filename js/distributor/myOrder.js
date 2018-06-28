$(function() {
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
			success: function(data) {
				if(data.code == 0 && data.orderList) {
					for(var i = 0; i < data.orderList.length; i++) {
						setList(data.orderList[i])
					}
				}else{
					errLay(data.msg)
				}
			}
		});
	}

	//==========遍历列表====
	function setList(arr) {
		var text = '<div class="list" dataId="' + arr.id + '" applyId ="'+arr.applyId+'">' +
			'<div class="c-list">' +
			'<div class="basic-msg">' +
			'<div class="basic">' +
			'<p class="name">' + arr.borrowerName + '</p>';
		if(arr.borrowerPhone) {
			text += '<p class="phone">' + arr.borrowerPhone + '</p>';
		}
		text += '</div>' +
			'<div class="credit">' +
			'<label>贷款金额：</label>' +
			'<span>' + arr.totalLoan + '</span>' +
			'</div>' +
			'</div>' +
			'<div class="btn">';
		if(arr.status == -1) {
			text += '<div class="dislableDiv">';
		} else {
			text += '<div class="choose">';
		}
		text += '<p>' + arr.nodeName + '</p>' + '</div>';
//		text +=  arr.nodeName + '</div>';
		if(arr.status == -1) {
			text += '<div class="dislableDiv">';
		} else {
			text += '<div class="cancel">';
		}
		text += '<p>订单取消</p>' +
			'</div>' +
			' </div>' +
			'</div>' +
			'<div class="line"></div>' +
			'</div>';
		$(".content").append(text)
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
				if(data.code == 0){
					document.location.reload();//当前页面 
				}else{
					errLay(data.msg)
				}
				
			}
		});
	}

//===========================
	
	$(document).on('click','.choose',function(){
		var applyid = $(this).parents('.list').attr('applyid')
		window.location.href = 'flow.html?applyId='+applyid;
	})


})