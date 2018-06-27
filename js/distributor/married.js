$(function(){
    var listJson = {};
    var importId = 1;
    
    getOldList();   // 回显

    $("#date").datetimePicker({
        times:function(){
            return
        }
    });
    $("#type").select({
        title:"证件类型",
        items:["身份证"]
    })
    $(".weui-btn").on("click",function(){
        let name=$("#name").val()
        let tel=$("#tel").val()
        let id=$("#id").val()
        let date=$("#date").val()
        let unit=$("#unit").val()
        let duty=$("#duty").val()
        let phone=$("#phone").val()
    //    if(isName(name,"配偶")==false){
    //         return false
    //     }else if(isPhone(tel,"配偶")==false){
    //         return false
    //     }else if(isId(id,"配偶")==false){
    //         return false
    //     }
        // else if(isDate(date,"配偶")==false){
        //     return false
        // }
        // else if(isPhone(phone,"单位")==false){
        //     return false
        // }else{
            getNull()
            
            listJson.applyId = importId;
            listJson.name = $("#name").val();
            listJson.contactNum = $("#tel").val();
            if($("#type").val() == '身份证'){
                listJson.certificateType = 0;
            }
            listJson.certificateNum = $("#id").val();
            listJson.birth = $("#date").val();
            listJson.workName = $("#cName").val();
            listJson.position = $("#position").val();
            listJson.workAddress = $("#cAddress").val();
            listJson.workPhone = $("#phone").val();
            console.log(listJson.certificateType)
            getSaveList()
        // }
    })

    function getOldList() {
        let data = {
            id: 1
        }
        $.ajax({
            url:path+"/apply/getSmSpouseInfoByApplyId",
            data:JSON.stringify(data),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            xhrFields: {
                withCredentials:true
            },
            success:function(data) {
                console.log(data);
                if(data.code == 0) {
                    if(data.data){
                        listJson = data.data;
                        console.log(listJson)
                        if(listJson.name) {
                            $("#name").val(listJson.name)
                        }
                        if(listJson.contactNum) {
                            $("#tel").val(listJson.contactNum)
                        }
                        if(listJson.certificateType == 0){
                        	$("#type").val('身份证');
                     	}
                        if(listJson.certificateNum) {
                            $("#id").val(listJson.certificateNum)
                        }
                        if(listJson.birth) {
                            $("#date").val(listJson.birth)
                        } 
                        if(listJson.workName) {
                            $("#cName").val(listJson.workName)
                        }
                        if(listJson.position){
                            $("#position").val(listJson.position)
                        } 
                        if(listJson.workAddress) {
                            $("#cAddress").val(listJson.workAddress)
                        } 
                        if(listJson.workPhone) {
                            $("#phone").val(listJson.workPhone)
                        }                        
                    }
                }else {
					errLay(data.msg)
				}
            }
            
        })
    }

    function getSaveList() {
        $.ajax({
            url:path+"/apply/saveSmSpouseInfo",
            data:JSON.stringify(listJson),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                if(data.code == 0){
                    window.location.href = "tenant.html"
                }else {
					errLay(data.msg)
				}
            }
        })
    }

    function getNull(){
        $(".weui-input").each(function(){
            if($(this).val() == '') {
                let msg = $(this).parents(".weui-cell").find("label").text();
                let str = msg.substr(0, msg.length - 1);
				errLay(str + '不能为空');
				return false;
            }
        })
    }
})