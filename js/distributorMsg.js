$(function(){
    $(".weui-btn").on("click",function(){
        let disName=$("#disName").val()
        if(isName(disName,"销售顾问")==""){
            return false;
        }else if(isName(disName,"销售顾问")==false){
            return false
        }
        else{
            window.location.href="financing.html"
            return true
        }
    })

})