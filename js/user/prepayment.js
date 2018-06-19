$(function(){
    $(".apply").on("click",function(){
        errLay("你的提前还款申请已经发出，请留意消息")
    })
    $("#cancle").on("click",function(){
        cue("提醒","是否取消提前还款")
        $("#yes").on("click",function(){
            $(".pop-box").hide();
            errLay("已取消")
        })
        $("#no").on("click",function(){
            $(".pop-box").hide ()
        })
    })
})