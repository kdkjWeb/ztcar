$(function(){
    $(".send").on("click",function(){
        $(".pop-box").show()
    })
    $("#no").on("click",function(){
        $(".pop-box").hide()
    })
    $("#yes").on("click",function(){
        alert("已发送至经销商邮箱")
        $(".pop-box").hide()
        
    })
    $("#send").on("click",function(){
        window.location.href="submission.html"
    })
})