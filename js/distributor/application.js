$(function(){
    $(".send").on("click",function(){
        $.confirm({
            title: '提醒',
            text: '是否发送至经销商邮箱？',
            onOK: function () {
              //点击确认
              errLay("已发送至经销商邮箱")
            },
            onCancel: function () {
            }
          });
    })
    $(".weui-btn").on("click",function(){
        window.location.href="submission.html"
    })
})