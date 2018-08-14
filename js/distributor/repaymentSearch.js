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
    var data = {
        id: importId
    }
    console.log(data)
    $.ajax({
        url: path + "/SmRepaymentRecord/selectListByRepaymentRecordVo",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: "post",
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
                	if(data.data.list.length == 0){
                		 $('.content').append('<div style="text-align: center;">暂无记录</div>')
                	}else{
                		repay(data.data.list)
                	}
                }
            }
        },error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
    })
})


function repay(arr) {
    for(var i = 0;i < arr.length;i++) {
     $("table").append(
        '<tr>'+
            '<td>'+ getDays(arr[i].repaymentMoth)+'</td>'+
            '<td>'+ arr[i].totalLoan+'</td>'+
            '<td>'+ arr[i].deadlinesId+'</td>'+
        '</tr>')
     }
 }
