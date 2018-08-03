$(function() {
	$(document).on("click", '#no', function() {
		$('.pop-box').fadeOut('9000');
		var setRemove = setTimeout(function() {
			$('.pop-box').remove()
		}, 500);
	})

	getList(); //=====获取列表===========

	//	==========转订单=====
	$(document).on('click', '.to', function() {
		let id = $(this).attr('attr-id');
		let name = $(this).parents('tr').find('td').first().text();
		cue("提醒", "你确定将【" + name + "】的征信结果转为订单吗？");
		$("#yes").on("click", function() {
			dowatting(id, 1);
		})
	});

	//	=============待转====
	$(document).on('click', '.wait', function() {
		let id = $(this).attr('attr-id');
		let name = $(this).parents('tr').find('td').first().text();
		cue("提醒", "你确定将此结果待转？")
		$("#yes").on("click", function() {
			showLoading(); //显示loading	
			dowatting(id, 0);
		})
	});

	//	=====查看详情==========
	$(document).on('click', '.look', function() {
		let id = $(this).attr('attr-id');
		window.location.href = "detail.html?id=" + id;
	});

	//======遍历列表结果=======
	function eachList(arr) {
		$.each(arr, function(index, el) {
			var text;
			if(el.statusStr == '通过') {
				text +='<tr class="pass">';
			} else {
				text +='<tr class="noPass">';
			}
			text +='<td>'+el.borrowerName+'</td>'+
	        '<td>'+el.createTime+'</td>'+
	        '<td>'+el.statusStr+'</td>'+
	        '<td class="look" attr-id="'+el.id+'">查看详情</td>'+
	        '<td>'+
	        '<div class="shift">';
	        if(el.statusStr == '通过'){
	        	if(el.applyStatus === null){
	        		text +='<p class="to" attr-id="'+el.id+'">转订单</p>'+
	       			'<p class="wait" attr-id="'+el.id+'">待转</p>';
	        	}else{
	        		text +='<p class="yizhuan">已转订单</p>';
	        	}
	        	
	        }
	   		text +='</div>'+
	        '</td>'+
	    	'</tr>';
	
			$("table").append(text);
		})
	}


	//=====获取列表===========
	function getList() {
		$.ajax({
			url: path + "/apply/showNowCreditByDealers?time=" + new Date().getTime(),
			data: {},
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			crossDomain: true,
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					if(data.data.length == 0){
						$(".container").append("<div style='text-align: center;'>暂无征信结果</div>");
					}else{
						eachList(data.data);
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

	//======将订单待转==========
	function dowatting(id, num) {
		var data = {
			id: id,
			applyStatus: num
		}
		$.ajax({
			url: path + "/apply/updateApplyStatus",
			data: JSON.stringify(data),
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					if(num == 1){
						window.location.href="distributorMsg.html?applyId="+id
					}else{
						window.location.reload();
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

})