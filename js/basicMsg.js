$(function(){
    $("#edu").select({
        title:"请选择您的文化程度",
        items:["初中及以下","高中","中专","大专","本科","研究生","硕士","博士","其他"]
    })
    $("#ismarried").select({
        title:"婚姻状况",
        items:["未婚","已婚","离异"]
    })
    $("#register").select({
        title:"户籍性质",
        items:["城市","农村"]
    })
    $("#license").select({
        title:"驾驶证",
        items:["有","无"]
    })
    $("#isFirst").select({
        title:"家庭首次购车？",
        items:["是","否"]
    })
    $("#Vehicle").select({
        title:"现有车辆品牌",
        items:["一汽大众","奥迪","宝马","无"]
    })
    $("#aim").select({
        title:"购车目的",
        items:["家用","公用","其他"]
    })
    $(".weui-btn").on("click",function(){
        let tel=$("#tel").val()
        if(isPhone(tel,"正确的")==""){
            return false
        }
        else if(isPhone(tel,"正确的")==false){
            return false
        }
        else{
            window.location.href="work.html"
        }
        
    })
})