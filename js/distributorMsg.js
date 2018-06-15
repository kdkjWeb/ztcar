$(function(){
    $(".weui-btn").on("click",function(){
        let disName=$("#disName").val()
        let disPhone=$("#disPhone").val()
        if(isName(disName,"销售顾问")==false){
            errLay()
            return false
        }else if(isPhone(disPhone,"销售顾问")==false){
            errLay()
            return false
        }else{
            window.location.href="financing.html"
            return true
        }
    })

})