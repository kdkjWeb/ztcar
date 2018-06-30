$(function() {
	
	$(".rcord").on("click", function() {
		window.location.href = "loanDetail.html"
	})
	
	getList()
	
	function getList(){
		$.ajax({
			url: path + "/smBorrower/getBorrowerRecordList",
//			data:,
			contentType: "application/json",
			dataType: "json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				
				if(data.code == 0){
					errLay('请求成功')
				}else{
					errLay(data.msg)
				}
			}
		})
	}

})