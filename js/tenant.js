$(function(){
    $("#date").calendar();
    
    $("#gender").select({
        title: "性别",
        items: ["男", "女"]
    });
    $("#type").select({
        title: "证件类型",
        items: ["身份证", "护照","户口簿"]
    });
    $("#edu").select({
        title: "文化程度",
        items: ["小学", "初中","高中", "职高","中专", "大专","本科", "研究生","硕士", "博士"]
    });
    $("#isMarried").select({
        title: "婚姻状况",
        items: ["未婚", "已婚","离异"]
    });
    $("#register").select({
        title: "户籍性质",
        items: ["城市", "农村"]
    });
    $("#nature").select({
        title: "现住房性质",
        items: ["租住公房", "租住私房","租住父母处"]
    });
       
    $(".weui-btn").on("click",function(){
        let name=$("#name").val()
        let id=$("#id").val()
        let date=$("#date").val()
        let tel=$("#tel").val()
        let phone=$("#phone").val()
        if(isName(name,"承租人")==false){
            return false
        }else if(isId(id,"承租人")==false){
            return false
        }else if(isDate(date,"承租人")==false){
            return false
        }else if(isPhone(tel)==false){
            return false
        }else if(isPhone(phone)==false){
            return false
        }else{
            window.location.href="guarantor.html"
        }
    })
    
})