$(function(){
	var importId = GetRequest().dataId;
	oldList();
	function oldList(){
		$.ajax({
			url: path + "/apply/getZxsqDemo",
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
					if(data.data){
						$('#content').append(data.data)
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
	
})