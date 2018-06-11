$(function(){

    $("#date").calendar();
    $("#type").select({
        title:"证件类型",
        items:["身份证","户口簿","护照"]
    })
    $(".weui-btn").on("click",function(){
        let name=$("#name").val()
        let tel=$("#tel").val()
        let id=$("#id").val()
        let date=$("#date").val()
        let unit=$("#unit").val()
        let duty=$("#duty").val()
        let phone=$("#phone").val()
       if(isName(name,"配偶")==false){
            return false
        }else if(isPhone(tel,"配偶")==false){
            return false
        }else if(isId(id,"配偶")==false){
            return false
        }else if(isDate(date,"配偶")==false){
            return false
        }else if(isPhone(phone,"单位")==false){
            return false
        }else{
            window.location.href="tenant.html"
        }
    })
})