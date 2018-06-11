$(function(){
    let arr=[{
        date:"2018年4月25日",
        state:"征信通过"
    },{
        date:"2018年4月25日",
        state:"征信未通过"
    },{
        date:"2018年4月25日",
        state:"征信审核中"
    }]
    $.each(arr,function(index,el){
        $(".content").append(`<a href="javascript:void(0);">
        <div class="msg">
            <p>征信日期： ${el.date}</p>
            <span>${el.state}</span>
        </div>
    </a>`)
    })
    console.log("点击跳转")
    $(".msg").on("clcik",function(){
        console.log("6666666666666666666666")
        window.location.hash="detail.html"
    })
   
})