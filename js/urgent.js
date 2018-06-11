$(function(){
    $("#relative").select({
        title:"与申请人关系",
        items:["母女","父女","姐妹","兄弟","兄妹","姐弟"]
    })
    $(".relative1").select({
        title:"与申请人关系",
        items:["亲戚","朋友","同事","同学"]
    })
    $(".weui-btn").on("click",function(){
        let name=$("#name").val()
        let name1=$("#name").val()
        let name2=$("#name").val()
        let tel=$("#tel").val()
        let tel1=$("#tel").val()
        let tel2=$("#tel").val()
        if(isName(name,"直属亲人")==false){
            return false
        }else if(isName(name1)==false){
            return false
        }else if(isName(name2)==false){
            return false
        }else if(isPhone(tel)==false){
            return false
        }else if(isPhone(tel1)==false){
            return false
        }else if(isPhone(tel2)==false){
            return false
        }else{
            window.location.href="application.html"
        }
    })
})