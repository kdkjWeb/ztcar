$(function(){
    $(".comeBack").on("click",function(){
        $.confirm({
            title: '提醒',
            text: '是否需要重新测算？',
            onOK: function () {
              //点击确认
                 window.location.href="begin.html"
            },
            onCancel: function () {
            }
          });
    })
})