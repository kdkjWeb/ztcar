$(function(){

    $(document).on('click','.msg',function(){
    	var id = $(this).attr('urlId');
    	window.location.href="detail.html?id="+id
    })
    getList();
    function getList(){
    	$.ajax({
			url: path + "/apply/getUserCreditList",
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			success: function(data) {
				if(data.code == 0) {
					if(data.data.length>0){
						for(var i = 0;i<data.data.length;i++){
							var text = '<div class="msg" urlId="'+data.data[i].id+'">'+
					            '<p>征信日期： '+data.data[i].modifyTime+'</p>'+
					            '<span>'+data.data[i].statusStr+'</span>'+
					        '</div>';
					        $(".content").append(text)
						}
					}else{
						 $(".content").text('暂无征信结果')
					}
					
					
				}else{
					errLay(data.msg);
				}
			}
		});
    }




  		
})