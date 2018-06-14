$(function(){
    $(".apply").on("click",function(){
        errLay("你的提前还款申请已经发出，请留意消息")
    })
    $("#cancle").on("click",function(){
        $.confirm({
            title: '提醒',
            text: '是否取消提前还款',
            onOK: function () {
              //点击确认
              errLay("已取消")
            },
            onCancel: function () {
            }
          });
    })
})