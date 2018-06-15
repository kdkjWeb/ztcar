$(function(){
    $("#time3").datetimePicker();
    
    $(".personal").on("click",function(){
        $(".compony").removeClass("p-active")
        $(".personal").addClass("p-active");
        $("#personal").show()
        $("#compony").hide()
    })


    // 暂时隐藏，后期需要时再放开
    // $(".compony").on("click",function(){
    //     $(".compony").addClass("p-active")
    //     $(".personal").removeClass("p-active")
    //     $("#compony").show()
    //     $("#personal").hide()
    // })
    $("#personal .weui-btn").on("click",function(){
        let name=$("#name").val()
        let id=$("#id").val()
        let date=$("#date").val()
        let tel=$("#tel").val()
        let phone=$("#phone").val()
       
        if(isName(name,"个人担保")==false){
            return false
        }else if(isId(id,"个人担保")==false){
            return false
        }else if(isDate(date,"个人担保")==false){
            return false
        }else if(isPhone(tel,"个人担保")==false){
            return false
        }else if(isPhone(phone,"个人担保")==false){
            return false
        }else{
             window.location.href="urgent.html"
        }
    })
    $("#compony .weui-btn").on("click",function(){
      
        let Cphone=$("#Cphone").val()
        let Ctel=$("#Ctel").val()
        if(isPhone(Cphone,"个人担保")==false){
            return false
        }else if(isPhone(Ctel,"个人担保")==false){
            return false
        }else{
             window.location.href="urgent.html"
        }
    })
    // 下拉框

    $("#gender").select({
        title:"性别",
        items:["男","女"]
    })
    $("#type").select({
        title:"证件类型",
        items:["身份证","户口簿",'护照']
    })
    $("#edu").select({
        title:"文化程度",
        items:["小学","初中",'职高','高中','大专','本科','研究生','硕士','博士']
    })
    $("#ismarried").select({
        title:"婚姻状况",
        items:["未婚","已婚",'离异']
    })
    $("#register").select({
        title:"户籍性质",
        items:["城市","农村"]
    })
    $("#nature").select({
        title:"现住房性质",
        items:["租住公房","租住私房",'租住父母处']
    })
    $("#Cnature").select({
        title:"企业性质",
        items:["民营","国有",'外资']
    })
    $("#Ctype").select({
        title:"证件类型",
        items:["营业执照"]
    })
    $("#tax").select({
        title:"纳税资质",
        items:["一般纳税人"]
    })
    $("#affairs").select({
        title:"纳税情况",
        items:["按揭","全款"]
    })
    $("#istenant").select({
        title:"是否对外担保",
        items:["是","否"]
    })
    $("#trade").select({
        title:"行业类型",
        items:["服务业","餐饮",'旅游']
    })
})