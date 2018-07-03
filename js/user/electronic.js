$(function(){
    $("button").on("click",function(){
        cue("提醒","你是否确定签署电子合同？")
        $(document).on("click","#yes",function() {
            errLay("你已完成签约，合同已发送至经销商邮箱，请留意消息")
        })
        $(document).on("click","#no",function() {
            $(".pop-box").fadeOut(900)
        })
      
    })
})