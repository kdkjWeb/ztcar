$(function() {
	$('.divList').on('click', function() {
		$(this).siblings('ul').fadeToggle();
		$(this).parents('div').siblings('div').find('ul').fadeOut();
	})

	$.ajax({
		url: path + "/smBorrower/judgeIsExsit",
		dataType: "json",
		contentType: "application/json",
		type: "get",
		xhrFields: {
			withCredentials: true
		},
		beforeSend: function() {
			showLoading(); //显示loading	
		},
		success: function(data) {
			hideLoading(); //隐藏load	
			if(data.code == 0) {
				if(data.data.isExsit == 0){
					$('#advance').hide();
				}
			}else {
				errLay(data.msg)
			}
		},
		error: function(request, textStatus, errorThrown) {
			hideLoading(); //隐藏load	
			errLay(request.responseJSON.msg);
		}
	});

})