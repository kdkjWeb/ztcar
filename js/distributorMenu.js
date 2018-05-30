$(function(){
    $(".service").on("click",function(){
        $(".product").fadeIn()
        $(".application").fadeOut()
        $(".msg").fadeOut()
    })
    $(".want").on("click",function(){
        $(".application").fadeIn()
        $(".product").fadeOut()
        $(".msg").fadeOut()
        // var text=` <div>
        // <span class="want">我要借款</span>
        // `
        // if(){
        //     text+=` <ul class="application">
        //     <li>我要申请</li>
        //     <li>征信反馈</li>
        //     <li>提前还款</li>
        // </ul>`
        // }else{
        //     text+=` <ul class="application">
        //     <li>征信反馈</li>
        //     <li>我的订单</li>
        //     <li>信息查询</li>
        //     </ul>`
        // }
        // text+=`</div>`
       
    })
    $(".personal").on("click",function(){
        $(".msg").fadeIn()
        $(".application").fadeOut()
        $(".product").fadeOut()
        
    })
})