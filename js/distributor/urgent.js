$(function(){
    var listJson = {};
    var importId = 1;
    
    getOldValue() 

	var relationship = ["夫妻","父子","父女","母子","母女"];
	
   
    $(".urgent .myType").select({
        title:"与申请人关系",
        items:relationship
    })
    $(".weui-btn").on("click",function(){
        
        if(Verification() == false){
            return false;
        }

        var arr = [];
        $('.urgent').each(function(){
            let obj = {};
            if($(this).find('.myName').val()){
                obj.contactsName = $(this).find('.myName').val();
            }
            if($(this).find('.myType').val()){
                obj.relation = $(this).find('.myType').val();
            }
            if($(this).find('.myPhone').val()){
                obj.contactsWay = $(this).find('.myPhone').val();
            }
            arr.push(obj)
        })

        listJson.applyId = importId;
        listJson.urgentContactList = arr;

        getSave();
            
    })

    function getOldValue() {
        let data = {
			id: 1
		}
        $.ajax({
            url: path+"/apply/getContactListByApplyId",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type: "post",
            xhrFields: {
                withCredentials:true
            },
            success: function(data) {
                if(data.code == 0){
                    if(data.data) {
                        listJson = data.data;
                        for(let i = 0;i < listJson.length;i++) {
                            if(listJson[i]){
                                if(listJson[i].contactsName){
                                    $('.myName').eq(i).val(listJson[i].contactsName)
                                }
                                if(listJson[i].relation){
                                    $('.myType').eq(i).val(listJson[i].relation)
                                }
                                if(listJson[i].contactsWay){
                                    $('.myPhone').eq(i).val(listJson[i].contactsWay)
                                }
                            }
                        }
                    }
                }
            },
            error: function(xhr,type,errorThrown){
                console.log(xhr);
                console.log(type)
            }
        })
    }

    function getSave() {
     console.log(listJson);
        $.ajax({
            url: path+"/apply/saveContactListByApplyIdInfo",
            data: JSON.stringify(listJson),
            dataType: "json",
            contentType: "application/json",
            type: "post",
            traditional: false,  
            xhrFields: {
                withCredentials:true
            },
            success: function(data){
                window.location.href = "application.html"
            },
            error: function(xhr,type,errorThrown){
                console.log(xhr);
                console.log(type)
            }
        })
    }

   // ==========
    function Verification() {
        var sta  = true;
		$('.relative').each(function() {
            $(this).find('input').each(function(){
                if($(this).val() == '') {
                    let msg = $(this).parents('.weui-cell').find('label').text();
                    let str = msg.substr(0, msg.length - 1);
                    errLay(str + '不能为空');
                    sta = false
                    return false;
                }
            })
        })
        return sta;
    }
    // ==========
    

})
