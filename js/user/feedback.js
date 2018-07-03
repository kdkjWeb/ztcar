$(function(){
//  let arr=[{
//      date:"2018年4月25日",
//      state:"征信通过"
//  },{
//      date:"2018年4月25日",
//      state:"征信未通过"
//  },{
//      date:"2018年4月25日",
//      state:"征信审核中"
//  }]
//  $.each(arr,function(index,el){
//      $(".content").append(`<a href="javascript:void(0);">
//      <div class="msg">
//          <p>征信日期： ${el.date}</p>
//          <span>${el.state}</span>
//      </div>
//  </a>`)
//  })
//
    $(document).on('click','.msg',function(){
    	var id = $(this).attr('urlId');
    	window.location.href="detail.html?id="+id
    })
    getList()
    function getList(){
    	$.ajax({
			url: path + "/apply/getUserCreditList",
//			data: {},
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			success: function(data) {
				if(data.code == 0) {
					
					for(var i = 0;i<data.data.length;i++){
					
						var text = '<div class="msg" urlId="'+data.data[i].id+'">'+
				            '<p>征信日期： '+getDays(data.data[i].createTime)+'</p>'+
				            '<span>'+data.data[i].statusStr+'</span>'+
				        '</div>';
				        $(".content").append(text)
					}
					
					
				}else{
					errLay('请求出错');
				}
			}
		});
    }




  		
})