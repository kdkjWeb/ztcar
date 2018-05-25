$(function(){
    var phone=$(".changebox").val();
    var name=$(".ipt").val()
    $(".changebox").on("click",function(){
        window.location.href="change.html"
    })
    $("#drop").on("click",function(e){
        // e.preventDefault()
        $(".changebox").val("");
        $(".ipt").val("")
        window.location.href="login.html"
    })
})