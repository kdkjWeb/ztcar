$(function(){
    $(".photo").on("click",function(){
        $(this).hide();
        $(this).siblings(".up-load").show();
        $(this).siblings(".up-load").show();
        
    })
    $(".weui-btn").on("click",function(){
        window.location.href="afterCredit.html"
    })
})