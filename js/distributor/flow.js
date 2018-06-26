$(function() {
	getList();

	//  $(".iconfont").css("color","#3b6af4");

	$(document).on('click', '#distributorMsg', function() { //完善贷款信息 
		window.location.href = 'distributorMsg.html';
	})

	$(document).on('click', '#carMsg', function() { //录入车辆信息
		window.location.href = 'carMsg.html';
	})

	$(document).on('click', '#submission', function() { //提交初审资料
		window.location.href = 'submission.html';
	})

	$(document).on('click', '#credit', function() { //提交放款资料
		window.location.href = 'credit.html';
	})

	$(document).on('click', '#afterCredit', function() { //提交放款资料
		window.location.href = 'afterCredit.html';
	})

	function getList() {
		$.ajax({
			url: path + "/AboutProduct/getProductFlowByApplyId",
			data: {
				applyId: 1
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					pushList(data.data)
				} else {
					errLay(data.msg)
				}
			}
		});
	}

	function pushList(list) {
		var text = '';
		if(list.length > 3) {
			text += '<div class="leftDiv">';
			if(list.length > 0) {
				Choice()
			}
			text += '</div>'

		}

		$(".content").html(text)

	}

	function arrow() {
		var text = '<div class="arrow">' +
			'<i class="iconfont icon-jiantou3"></i>' +
			'</div>';
			return text;
			
	}

	function Choice() {
		var text = '<div class="choose">' +
			'<i class="iconfont icon-chanpin"></i>' +
			'<p>选择产品</p>' +
			'</div>';
		return text;
	}

	function distributorMsg() {
		var text = '<div class="choose" id="distributorMsg">' +
			'<i class="iconfont icon-xinxi"></i>' +
			'<p>完善贷款信息</p>' +
			'</div>';
		return text;
	}

})