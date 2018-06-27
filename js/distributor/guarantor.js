$(function(){

    var listJson={};
    var importId=1;

    getList();//回显

    $("#time3").datetimePicker({
        times:function(){
            return
        }
    });

    // 下拉框
    $("#gender").select({
        title:"性别",
        items:["男","女"]
    })
    $("#type").select({
        title:"证件类型",
        items:["身份证","临时身份证",'护照','台胞证',"港澳台通行证"]
    })
    $("#edu").select({
        title:"文化程度",
        items:["高中以下","高中/技校/中专",'专科','本科','本科以上']
    })
    $("#ismarried").select({
        title:"婚姻状况",
        items:["未婚","已婚无子女","已婚有子女","离异","丧偶"]
    })
    $("#register").select({
        title:"户籍性质",
        items:["本省本市","本省外市","外省"]
    })
    $("#nature").select({
        title:"现住房性质",
        items:["有按揭自置","无按揭自置",'家属房产',"租住","其他"]
    })
    $("#Cnature").select({
        title:"企业性质",
        items: ["国有企业","外资企业","民营企业","政府及事业单位","其他"]
    })
    $("#Ctype").select({
        title:"证件类型",
        items:["营业执照"]
    })
    $("#tax").select({
        title:"纳税资质",
        items:["一般纳税人",'小规模纳税人']
    })
    $("#affairs").select({
        title:"纳税情况",
        items:["无欠税","恶意逃税","有欠税"]
    })
    $("#istenant").select({
        title:"是否对外担保",
        items:["是","否"]
    })
    $("#trade").select({
        title:"行业类型",
        items:["部队、公、检、法等执行机构","餐饮、酒店、旅行社",'传统制造业（含能源）','服务业','高新产业','公用事业单位、邮电通信、交通运输、仓储物流','国家机关、党政机关、公益类社会团体、外国政府或国际公益组织','建筑、工程','教育行业','金融机构','律师事务所、会计事务所（四大）、税务师事务所等机构','商贸类','医疗行业','专业性事务所','自由职业者','其他']
    })
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
        }
        // else if(isDate(date,"个人担保")==false){
        //     return false
        // }
        else if(isPhone(tel,"个人担保")==false){
            return false
        }else if(isPhone(phone,"个人担保")==false){
            return false
        }else{
             Verification();
             listJson.applyId=importId;

             listJson.name=$("#name").val();//担保人姓名
             listJson.sex=$("#gender").val();//担保人性别
             listJson.certificateType=$("#type").val();//证件类型
             listJson.certificatePhone=$("#id").val();//证件号码
             listJson.birth=$("#time3").val();//出生日期
             listJson.standardCulture=$("#edu").val();//文化程度
             listJson.maritalStatus=$("#ismarried").val();//婚姻状况
             listJson.hujiNature=$("#register").val();//户籍性质
             listJson.currentAddress=$("#address").val();//居住地址
             listJson.housingNature=$("#nature").val();//先住房性质
             listJson.phoneNumber=$("#tel").val();//担保人手机号码
             listJson.monthlyIncome=$("#income").val();//每月净收入
             listJson.monthAverage=$("#pay").val();//每月均支出
             listJson.companyName=$("#cName").val();//单位名称
             listJson.unitAddress=$("#cAdress").val();//单位地址
             listJson.workTelephone=$("#phone").val();//单位电话

             postList()
        }
    })
    // $("#compony .weui-btn").on("click",function(){
      
    //     let Cphone=$("#Cphone").val()
    //     let Ctel=$("#Ctel").val()
    //     if(isPhone(Cphone,"个人担保")==false){
    //         return false
    //     }else if(isPhone(Ctel,"个人担保")==false){
    //         return false
    //     }else{
    //          window.location.href="urgent.html"
    //     }
    // })

  
    function getList(){
        let data={
            id:1
        }
        $.ajax({
            url:path+"/apply/getPersonalTenantInfoByApplyId",
            data:JSON.stringify(data),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            xhrFields:{
                withCredentials: true
            },
            success:function(data){
                console.log(data)
                if(data.code==0){
                    if(data.data){
                        listJson=data.data;
                        if(listJson.name){
                            $("#name").val(listJson.name)
                        }
                        if(listJson.sex){
                            $("#gender").val(listJson.sex)
                        }
                        if(listJson.certificateType){
                            $("#type").val(listJson.certificateType)
                        }
                        if(listJson.certificatePhone){
                            $("#id").val(listJson.certificatePhone)
                        }
                        if(listJson.birth){
                            $("#time3").val(listJson.birth)
                        }
                        if(listJson.standardCulture){
                            $("#edu").val(listJson.standardCulture)
                        } 
                        if(listJson.maritalStatus){
                            $("#ismarried").val(listJson.maritalStatus)
                        }
                        if(listJson.hujiNature){
                            $("#register").val(listJson.hujiNature)
                        }
                        if(listJson.currentAddress){
                            $("#address").val(listJson.currentAddress)
                        }
                        if(listJson.housingNature){
                            $("#nature").val(listJson.housingNature)
                        }
                        if(listJson.phoneNumber){
                            $("#tel").val(listJson.phoneNumber)
                        }
                        if(listJson.monthlyIncome){
                            $("#income").val(listJson.monthlyIncome)
                        }
                        if(listJson.monthAverage){
                            $("#pay").val(listJson.monthAverage)
                        }
                        if(listJson.companyName){
                            $("#cName").val(listJson.companyName)
                        }
                        if(listJson.unitAddress){
                            $("#cAdress").val(listJson.unitAddress)
                        }
                        if(listJson.workTelephone){
                            $("#phone").val(listJson.workTelephone)
                        }
                    }
                }else {
					errLay(data.msg)
				}
            }
        })
    }
    function postList(){
        $.ajax({
            url:path+"/apply/savePersonalTenantInfo",
            data:JSON.stringify(listJson),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            xhrFields:{
                withCredentials: true
            },
            success:function(data){
                if(data.code==0){
                    window.location.href="application.html"
                }else {
					errLay(data.msg)
				}
            }
        })
    }
    function Verification(){
        $("#personal .weui-input").each(function(){
            if($(this).val()==''){
                let msg=$(this).parents(".weui-cell").find('label').text();
                let str=msg.substr(0,msg.length-1);
                errLay(str+"不能为空");
                return false;
            }
        })
    }
})