$(function(){
    $(".weui-btn").on("click",function(){
        let name=$("#name").val()
        let date=$("#date").val()
        if(isName(name,"承租人")==false){
            return false
        }else if(isDate(date,"承租人")==false){
            return false
        }else{
           return true
        }
    })
})