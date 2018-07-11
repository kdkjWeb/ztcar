$(function(){
    var listJson = {};
    var importId = GetRequest().applyId;
    
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
     
        $('.urgent').each(function(index,item){
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
            listJson.urgentContactList[index] = obj;

        })
        getSave() 
       
            
    })

    function getOldValue() {
        let data = {
			id: importId
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
                    if(data.form) {
                        listJson = data.form;
                      
                        for(let i = 0;i < listJson.urgentContactList.length;i++) {
                            if(listJson.urgentContactList[i]){
                                if(listJson.urgentContactList[i].contactsName){
                                    $('.myName').eq(i).val(listJson.urgentContactList[i].contactsName)
                                }
                                if(listJson.urgentContactList[i].relation){
                                    $('.myType').eq(i).val(listJson.urgentContactList[i].relation)
                                }
                                if(listJson.urgentContactList[i].contactsWay){
                                    $('.myPhone').eq(i).val(listJson.urgentContactList[i].contactsWay)
                                }
                            }
                        }
                    }
                }else {
					errLay(data.msg);
				}
            }
        })
    }

    function getSave() {
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
            	if(data.code == 0){
            		 window.location.href = "application.html?applyId="+importId;
            	}else {
					errLay(data.msg);
				}
               
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
