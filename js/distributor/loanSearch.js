$(function() {
	//================如果是返回的刷新页面
	window.onpageshow = function(event) {　　
		if(event.persisted) {　　　　
			window.location.reload()　　
		}
	};
//	=====================
    var listJson = [];
    var importId = GetRequest().id;
//  var data = {
//      id: importId
//  }
    $.ajax({
        url: path + "/smBorrower/getLoadRecord?applyId="+importId,
//      data: JSON.stringify(data),
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
                if(data.data) {
                	if(data.data.length == 0){
                		$('.content').append('<div style="text-align: center;">暂无记录</div>')
                	}else{
                	 	loan(data.data);
                	}
                }
            }
        },error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
    })
})


function loan(arr) {
    for(var i = 0;i < arr.length;i++) {
     $(".content").append(
        '<div class="list">'+
            '<div>姓名:'+ arr[i].borrowerName +'</div>'+
            '<div>时间:'+ arr[i].orderCreateTime +'</div>'+
            '<div>产品名称:'+ arr[i].productName +'</div>'+
            '<div>总金额:'+ arr[i].totalLoan +'</div>'+
            '<div>期数: '+ arr[i].loansMonth +'</div>'+
            '</div>'
     	)
     }
    
 }
