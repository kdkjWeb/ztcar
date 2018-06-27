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
		var listLeng = list.length;
		
		var text = '';

		text += '<div class="leftDiv">'
		for(var i = 0; i < 3 && i<listLeng; i++) {
			if(i == 0) {
				text += addText(list[i].flowId,list[i].status,list[i].flowName);
			} else {
				text += arrow();
				text += addText(list[i].flowId,list[i].status,list[i].flowName);
			}

		}
		text += '</div>'

		if(list.length > 3) {
			text += Down();
			text += '<div class="rightDiv">';
			for(var i = 3; i < 6 && i<listLeng; i++){
				if(i == 3) {
					text += addText(list[i].flowId,list[i].status,list[i].flowName);
				} else {
					text += arrow();
					text += addText(list[i].flowId,list[i].status,list[i].flowName);
				}
			}
			text += '</div>';
		}
		
		if(list.length > 6) {
			text += Down();
			text += '<div class="leftDiv">';
			for(var i = 6; i < 9 && i<listLeng; i++){
				if(i == 6) {
					text += addText(list[i].flowId,list[i].status,list[i].flowName);
				} else {
					text += arrow();
					text += addText(list[i].flowId,list[i].status,list[i].flowName);
				}
			}
			text += '</div>';
		}
		
		if(list.length > 9) {
			text += Down();
			text += '<div class="rightDiv">';
			for(var i = 9; i < 15 && i<listLeng; i++){
				if(i == 9) {
					text += addText(list[i].flowId,list[i].status,list[i].flowName);
				} else {
					text += arrow();
					text += addText(list[i].flowId,list[i].status,list[i].flowName);
				}
			}
			text += '</div>';
		}
	
		$('.content').html(text);

	}

	function arrow() {
		var text = '<div class="arrow">' +
			'<i class="iconfont icon-jiantou3"></i>' +
			'</div>';
		return text;

	}

	function Down() {
		var text = '<div class="Down">' +
			'<i class="iconfont icon-jiantou3"></i>' +
			'</div>'
		return text;
	}

	function addText(id,status,flowName) {
		var mytext = '';
		var mystatus = '';
		if(status == 1){
			mystatus = 'status';
		}
		if(id == 1) {
			mytext = '<div class="choose '+mystatus+'">' +
				'<i class="iconfont icon-chanpin"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';

		} else if(id == 2) {
			mytext = '<div class="choose '+mystatus+'"  id="distributorMsg">' +
				'<i class="iconfont icon-xinxi"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(id == 3) {
			mytext = '<div class="choose '+mystatus+'" id="submission">' +
				'<i class="iconfont icon-jibenziliao"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(id == 4) {
			mytext = '<div class="choose '+mystatus+'">' +
				'<i class="iconfont icon-shiyongyinzhang"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(id == 5) {
			mytext = '<div class="choose '+mystatus+'" id="carMsg">' +
				'<i class="iconfont icon-cheliang-"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(id == 6) {
			mytext = '<div class="choose '+mystatus+'">' +
				'<i class="iconfont icon-tubiaolunkuo-"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(id == 7) {
			mytext = '<div class="choose '+mystatus+'">' +
				'<i class="iconfont icon-jibenziliao"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(id == 8) {
			mytext = '<div class="choose '+mystatus+'">' +
				'<i class="iconfont icon-shiyongyinzhang"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(id == 9) {
			mytext = '<div class="choose '+mystatus+'">' +
				'<i class="iconfont icon-qian"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(id == 10) {
			mytext = '<div class="choose '+mystatus+'" id="afterCredit">' +
				'<i class="iconfont icon-jibenziliao"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(id == 11) {
			mytext = '<div class="choose '+mystatus+'">' +
				'<i class="iconfont icon-shiyongyinzhang"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		}
		
		return mytext;

	}

})