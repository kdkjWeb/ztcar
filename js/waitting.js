$(function(){
  // 列表遍历
    getList();
    //    点击转订单
    $(".to").on("click",function(){
        cue("提醒","你确定将【客户名称】的征信结果转为订单吗？")
        $("#yes").on("click",function(){
            window.location.href="myOrder.html"
        })
        $("#no").on("click",function(){
            $(".pop-box").hide()
        })
    })
  
})





$('#today').click(function(){
	window.history.back();
})


function eachList(){
    $.each(arr,function(index,el){
        let text=` <tr>
        <td>${el.borrowerName}</td>
        <td>${el.createTime}</td>
        <td>${el.statusStr}</td>
        <td class="look">查看详情</td>
        <td class="to">转订单</td>
    </tr>`
        $("table").append(text)
    })
}



function getList(){
		$.ajax({
		url: path + "/apply/showCreditByDealers",
		data:{} ,
		xhrFields:{
            withCredentials: true
        },
		dataType: "json",
		contentType:"application/json",
		type: "post",
		success: function(data) {
			console.log(data)
			if(data.code==0 && data.data.length>0){
				eachList(data.data);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
		}
	});
}
