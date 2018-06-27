$(function() {
	var importId = GetRequest().applyId;
	
	getList();

	$(document).on('click', '#distributorMsg', function() { //完善贷款信息 
		var applyId = $(this).attr('applyid');
		window.location.href = 'distributorMsg.html?applyId='+applyId;
	})

	$(document).on('click', '#carMsg', function() { //录入车辆信息
		window.location.href = 'carMsg.html';
	})

	$(document).on('click', '#submission', function() { //提交初审资料
		var applyId = $(this).attr('applyid');
		var datatype = $(this).attr('datatype');
		var dataId = $(this).attr('dataid');
		window.location.href = 'submission.html?applyId='+applyId+'&dataType='+datatype+'&dataId='+dataId;
	})

	$(document).on('click', '#credit', function() { //提交放款资料
		var applyId = $(this).attr('applyid');
		var datatype = $(this).attr('datatype');
		var dataId = $(this).attr('dataid');
		window.location.href = 'credit.html?applyId='+applyId+'&dataType='+datatype+'&dataId='+dataId;
	})

	$(document).on('click', '#afterCredit', function() { //提交放款资料
		var applyId = $(this).attr('applyid');
		var datatype = $(this).attr('datatype');
		var dataId = $(this).attr('dataid');
		window.location.href = 'afterCredit.html?applyId='+applyId+'&dataType='+datatype+'&dataId='+dataId;
	})

	function getList() {
		$.ajax({
			url: path + "/AboutProduct/getProductFlowByApplyId",
			data: {
				applyId: importId
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
				text += addText(list[i].flowId,list[i].status,list[i].flowName,list[i].isAuditingType,list[i].applyId,list[i].id);
			} else {
				text += arrow();
				text += addText(list[i].flowId,list[i].status,list[i].flowName,list[i].isAuditingType,list[i].applyId,list[i].id);
			}

		}
		text += '</div>'

		if(list.length > 3) {
			text += Down();
			text += '<div class="rightDiv">';
			for(var i = 3; i < 6 && i<listLeng; i++){
				if(i == 3) {
					text += addText(list[i].flowId,list[i].status,list[i].flowName,list[i].isAuditingType,list[i].applyId,list[i].id);
				} else {
					text += arrow();
					text += addText(list[i].flowId,list[i].status,list[i].flowName,list[i].isAuditingType,list[i].applyId,list[i].id);
				}
			}
			text += '</div>';
		}
		
		if(list.length > 6) {
			text += Down();
			text += '<div class="leftDiv">';
			for(var i = 6; i < 9 && i<listLeng; i++){
				if(i == 6) {
					text += addText(list[i].flowId,list[i].status,list[i].flowName,list[i].isAuditingType,list[i].applyId,list[i].id);
				} else {
					text += arrow();
					text += addText(list[i].flowId,list[i].status,list[i].flowName,list[i].isAuditingType,list[i].applyId,list[i].id);
				}
			}
			text += '</div>';
		}
		
		if(list.length > 9) {
			text += Down();
			text += '<div class="rightDiv">';
			for(var i = 9; i < 15 && i<listLeng; i++){
				if(i == 9) {
					text += addText(list[i].flowId,list[i].status,list[i].flowName,list[i].isAuditingType,list[i].applyId,list[i].id);
				} else {
					text += arrow();
					text += addText(list[i].flowId,list[i].status,list[i].flowName,list[i].isAuditingType,list[i].applyId,list[i].id);
				}
			}
			text += '</div>';
		}
	
		$('.content').html(text);

	}

	function arrow(){
		var text = '<div class="arrow">' +
			'<i class="iconfont icon-jiantou3"></i>' +
			'</div>';
		return text;

	}

	function Down(){
		var text = '<div class="Down">' +
			'<i class="iconfont icon-jiantou3"></i>' +
			'</div>'
		return text;
	}

	function addText(flowId,status,flowName,type,applyId,id) {
		var mytext = '';
		var mystatus = '';
		
		if(status == 1){
			mystatus = 'status';
		}
		
		if(flowId == 1) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'">' +
				'<i class="iconfont icon-chanpin"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';

		} else if(flowId == 2) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'" id="distributorMsg">' +
				'<i class="iconfont icon-xinxi"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(flowId == 3) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'" id="submission" dataType="'+type+'" dataId="'+id+'">' +
				'<i class="iconfont icon-jibenziliao"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(flowId == 4) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'" >' +
				'<i class="iconfont icon-shiyongyinzhang"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(flowId == 5) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'" id="carMsg">' +
				'<i class="iconfont icon-cheliang-"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(flowId == 6) {
			mytext = '<div class="choose '+mystatus+'">' +
				'<i class="iconfont icon-tubiaolunkuo-"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(flowId == 7) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'" id="credit" dataType="'+type+'" dataId="'+id+'" >' +
				'<i class="iconfont icon-jibenziliao"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(flowId == 8) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'" >' +
				'<i class="iconfont icon-shiyongyinzhang"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(flowId == 9) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'" >' +
				'<i class="iconfont icon-qian"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(flowId == 10) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'" id="afterCredit" dataType="'+type+'"  dataId="'+id+'">' +
				'<i class="iconfont icon-jibenziliao"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		} else if(flowId == 11) {
			mytext = '<div class="choose '+mystatus+'" applyId="'+applyId+'" >' +
				'<i class="iconfont icon-shiyongyinzhang"></i>' +
				'<p>'+flowName+'</p>' +
				'</div>';
		}
		
		return mytext;

	}

})