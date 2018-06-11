$(function(){
    $("#nature").select({
        title:"企业性质",
        items:["民营企业","国有企业","外资企业"]
    })
    $("#trade").select({
        title:"所属行业",
        items:["服务业","餐饮","汽车","林业","其他"]
    })
    $(".weui-btn").on("click",function(){
        let tel=$("#tel").val()
        if(isPhone(tel,"正确的")==""){
            return false
        }else if(isPhone(tel,"正确的")==false){
            return false
        }else{
            window.location.href="address.html"
        }
    })
})