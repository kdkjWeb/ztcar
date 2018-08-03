$(function() {
	var listJson = {};
	var importId = GetRequest().applyId;
	
	
	var borrwerName; //主贷人姓名
	var borrwerPhone; //主贷人电话

	getOldValue(); //获取回显

	var relationship = ["夫妻", "父子", "父女", "母子", "母女"];
	var relationshipOne = ["夫妻", "父子", "父女", "母子", "母女","朋友"];

	//	============名字删除完之后，关系,电话变为空
	$(document).on('input', '.myName', function() {
		if($(this).val() == '') {
			$(this).parents('.urgent').find('.myType').val('');
			$(this).parents('.urgent').find('.myType').removeAttr('data-values');
			$(this).parents('.urgent').find('.myPhone').val('');
		}
	});
	
	$("#type1").select({
		title: "与申请人关系",
		items: relationship
	});
	
	$("#type2").select({
		title: "与申请人关系",
		items: relationshipOne
	});
	
	
	$(".weui-btn").on("click", function() {
		showLoading(); //显示loading	
		if(!Verification()) {   //为空的正则验证
			hideLoading(); //隐藏load
			return false;
		};
		
		if(!PhoneVerification()) {  //正确的手机号正则验证
			hideLoading(); //隐藏load
			return false;
		};
	
		var name1 = $('#name1').val();
		var name2 = $('#name2').val();
		
		if(name1 && name2){
			if(name1 === name2){
				errLay('联系人姓名不能重复');
				hideLoading(); //隐藏load
				return false;
			}
		}
		
		var tel1 = $('#tel1').val();
		var tel2 = $('#tel2').val();
		
		if(tel1 && tel2){
			if(tel1 === tel2){
				errLay('联系人电话不能重复');
				hideLoading(); //隐藏load
				return false;
			}
		}

		if(name1 == borrwerName || name2 == borrwerName){
			errLay('联系人姓名不能与主贷人重复');
			hideLoading(); //隐藏load
			return false;
		}
		if(tel1 == borrwerPhone || tel2 == borrwerPhone){
			errLay('联系人电话不能与主贷人重复');
			hideLoading(); //隐藏load
			return false;
		}

		$('.urgent').each(function(index, item) {
			var obj = {};
			if($(this).find('.myName').val()) {
				obj.contactsName = $(this).find('.myName').val();
			}
			if($(this).find('.myType').val()) {
				obj.relation = $(this).find('.myType').val();
			}
			if($(this).find('.myPhone').val()) {
				obj.contactsWay = $(this).find('.myPhone').val();
			}
			listJson.urgentContactList[index] = obj;
		});
		
		
		getSave();
	});

	function getOldValue() {
		let data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getContactListByApplyId?time=" + new Date().getTime(),
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			async:false,
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					if(data.form) {
						borrwerName = data.form.borrwerName;
						borrwerPhone = data.form.borrwerPhone;
						
						listJson = data.form;
						content(listJson.smProductApplycontent); ////显示和必填验证
						for(var i = 0; i < listJson.urgentContactList.length; i++) {
							if(listJson.urgentContactList[i]) {
								if(listJson.urgentContactList[i].contactsName) {
									$('.myName').eq(i).val(listJson.urgentContactList[i].contactsName)
								}
								if(listJson.urgentContactList[i].relation) {
									$('.myType').eq(i).val(listJson.urgentContactList[i].relation)
								}
								if(listJson.urgentContactList[i].contactsWay) {
									$('.myPhone').eq(i).val(listJson.urgentContactList[i].contactsWay)
								}
							}
						}
					}
				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		})
	};

	function getSave() {
		$.ajax({
			url: path + "/apply/saveContactListByApplyIdInfo",
			data: JSON.stringify(listJson),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			async:false,
			traditional: false,
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					Create();
				} else {
					hideLoading(); //隐藏load
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		})
	};

	//=-=========显示。是否必填==========
	function content(mycontent) {

		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {
			if(mycontent.smProductApplycontents[i].label == "jinjName1") { //紧急联系人1姓名
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#name1').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#name1').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "jinjRel1") { //紧急联系人1与申请人关系
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#type1').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#type1').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "jinjConWay1") { //紧急联系人1联系电话
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#tel1').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#tel1').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "jinjName2") { //紧急联系人1姓名
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#name2').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#name2').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "jinjRel2") { //紧急联系人1与申请人关系
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#type2').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#type2').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "jinjConWay2") { //紧急联系人1联系电话
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#tel2').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#tel2').addClass("must");
					}
				}

			}

		}
	};
	
//	==================生成合同=============
	  function Create() {
        var data = {
            applyId:importId
        }
        $.ajax({
            url:path+"/compact/buildCompact",
            data:data,
            dataType:"json",
            contentType:"application/json",
            type:"get",
            async:false,
            xhrFields: {
				withCredentials: true
			},
            success:function(data){
                if(data.code == 0){
					Send(data.data); 
                }else {   //生成合同失败，跳到手动生产
					window.location.href = "application.html?applyId=" + importId;
				}
            },error:function(request, textStatus, errorThrown){
            	window.location.href = "application.html?applyId=" + importId;
				hideLoading();  //隐藏load	
				errLay(request.responseJSON.msg);
			}
        })
    }

    function Send(myData) {
    	var data = {
    		smCompacts:myData,
    		applyId:importId
    	}
        $.ajax({
            url: path + "/compact/sendCompact",
            data:JSON.stringify(data),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            async:false,
            xhrFields: {
				withCredentials: true
			},
            success: function(data) {
                if(data.code == 0){
                    errLay("已发送申请表至经销商邮箱");
                    var setRemove = setTimeout(function() {
						 window.location.href="submission.html?applyId="+importId+'&dataType=0'+'&dataId='+data.data;
					}, 1000);
                } else{
                    errLay(data.msg);
                    window.location.href = "application.html?applyId=" + importId;
                }   
            },error:function(request, textStatus, errorThrown){
            	window.location.href = "application.html?applyId=" + importId;
				hideLoading();  //隐藏load	
				errLay(request.responseJSON.msg);
			}
        })
    }

})