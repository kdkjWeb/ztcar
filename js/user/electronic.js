$(function(){
    $("button").on("click",function(){
        $.confirm({
            title: '提醒',
            text: '你是否确定签署电子合同？',
            onOK: function () {
              //点击确认
              errLay("你已完成签约，合同已发送至经销商邮箱，请留意消息")
            },
            onCancel: function () {
            
            }
        });
    })
})