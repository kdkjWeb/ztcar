$(function() {
	
	$(".rcord").on("click", function() {
		window.location.href = "loanDetail.html"
	})
	$(document).on('click','.rcord',function(){
		var applyId = $(this).attr('applyId');
		window.location.href = "loanDetail.html?applyId="+applyId;
	})
	getList();
	
	function getList(){
		$.ajax({
			url: path + "/smBorrower/getBorrowerRecordList",
			contentType: "application/json",
			dataType: "json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				
				if(data.code == 0){
					if(data.data.length>0){
						for(var i = 0;i<data.data.length;i++){
						var text = ' <div class="rcord" applyId="'+data.data[i].applyId+'">'+
				            '<p>'+data.data[i].applyDate+'</p>'+
				            '<p>'+data.data[i].loanTypeName+'</p>'+
				            '<p>查看详情</p>'+
				        '</div>'
				        $('.content').append(text)
						}
					}else{
						 $('.content').append("<span>暂无借款记录</span>")
					}
					
				}else{
					errLay(data.msg)
				}
			}
		})
	}

})