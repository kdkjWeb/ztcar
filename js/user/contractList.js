$(function() {
	oldList();

	function oldList() {
		$.ajax({
			url: path + "/apply/viewCompact",
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			success: function(data) {
				if(data.code == 0) {
					for(var i = 0; i < data.data.length; i++) {
						var myHtml = '<div  class="list" >' +
							'<div class="basic-msg">订单编号:'+ data.data[i].orderNo+'</div>'+
							'<div class="basic-msg">' +
							'<div>贷款类型:' + data.data[i].loansType + '</div>' +
							'<div>贷款金额:' + data.data[i].totalLoan + '</div>' +
							'</div>' +
							'<div class="basic-msg">' +
							'申请时间:' + data.data[i].orderCreateTime + '</div>' +
							'<div class="boder">';
						if(data.data[i].nodeType == 6) {
							myHtml += '<input type="checkbox" />' +
								'<span>我已阅读并确认  </span>';
						}
						for(var j = 0; j < data.data[i].smCompactContents.length; j++) {
							if(j == data.data[i].smCompactContents.length - 1) {
								myHtml += '<span class="contract" dataId="' + data.data[i].smCompactContents[j].id + '">《' + data.data[i].smCompactContents[j].compactName + '》</span>';
							} else {
								myHtml += '<span class="contract" dataId="' + data.data[i].smCompactContents[j].id + '">《' + data.data[i].smCompactContents[j].compactName + '》、</span>';
							}
						}
						myHtml += '</div>';
						if(data.data[i].nodeType == 6) {
							myHtml += '<div class="suer" applyId="' + data.data[i].applyId + '">确认</div>';
						}
						myHtml += '</div>';
						$('#content').append(myHtml)
					}
					hideLoading(); //隐藏load	
				} else {
					errLay(data.msg);
					hideLoading(); //隐藏load	
				}

			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}

	$(document).on('click', '.contract', function() {
		var id = $(this).attr('dataid');
		window.location.href = 'contract.html?dataId=' + id;
	})

	$(document).on('click', '.suer', function() {
		if($(this).parents('.list').find('input').is(':checked')) {
			var id = $(this).attr('applyId');
			send(id);
		} else {
			errLay('请先阅读并勾选同意合同信息');
		}
	})

	function send(myid) {
		$.ajax({
			url: path + "/apply/checkCompactOk?applyId=" + myid,
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			success: function(data) {
				if(data.code == 0) {
					window.location.reload();
					hideLoading(); //隐藏load	
				} else {
					errLay(data.msg);
					hideLoading(); //隐藏load	
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}

})