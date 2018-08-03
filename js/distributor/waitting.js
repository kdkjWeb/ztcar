$(function() {
	getList();

	$(document).on("click", '#no', function() {
		$('.pop-box').fadeOut('9000');
		var setRemove = setTimeout(function() {
			$('.pop-box').remove()
		}, 500);
	})


	//    点击转订单
	$(document).on('click', '.to', function() {
		let id = $(this).attr('attr-id');
		let name = $(this).parents('tr').find('td').first().text();
		cue("提醒", "你确定将【" + name + "】的征信结果转为订单吗？")
		$("#yes").on("click", function() {
			showLoading(); //显示loading	
			dowatting(id, 1);
		})

	})

	//	=====查看详情==========
	$(document).on('click', '.look', function() {
		let id = $(this).attr('attr-id');
		window.location.href = "detail.html?id=" + id;
	});

	$('#today').click(function() {
		if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {       
            window.location.href = window.document.referrer;  
   		} else { window.history.go("-1"); }  
	})

	//======遍历列表结果=======
	function eachList(arr) {
		$.each(arr, function(index, el) {
			var text;
			if(el.statusStr == '通过') {
				text += '<tr class="pass">';
			} else {
				text += '<tr class="noPass">';
			}
			text += '<td>'+el.borrowerName+'</td>'+
		        '<td>'+el.createTime+'</td>'+
		        '<td>'+el.statusStr+'</td>'+
		        '<td class="look" attr-id="'+el.id+'">查看详情</td><td>'+
		        '<div class="shift">';
		        
		        if(el.statusStr == '通过') {
					text += '<p class="to" attr-id="'+el.id+'">转订单</p>';
				}
		        text += '</div>'+
		        '</td>'+
		  		'</tr>';

			$("table").append(text);
		})
	}

	function getList() {
		$.ajax({
			url: path + "/apply/showCreditByDealers",
			data: {},
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
					if(data.data.length == 0){
						$("#waitting").append("<div style='text-align: center;'>暂无待转订单</div>");
					}else{
						eachList(data.data);
					}
					
				} else {
					errLay(data.msg);;
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