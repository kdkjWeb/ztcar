$(function() {
	var listJson = {};
	var importId = GetRequest().applyId;

	getOldValue();//获取回显

	var relationship = ["夫妻", "父子", "父女", "母子", "母女"];
	
//	============名字删除完之后，关系,电话变为空
	$(document).on('input','.myName',function(){
		if($(this).val()==''){
			$(this).parents('.urgent').find('.myType').val('');
			$(this).parents('.urgent').find('.myType').removeAttr('data-values');
			$(this).parents('.urgent').find('.myPhone').val('');
		}
	});

	$(".myType").select({
		title: "与申请人关系",
		items: relationship
	});
	
	$(".weui-btn").on("click", function() {
		if(!Verification()) {
			return false;
		};

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
			url: path + "/apply/getContactListByApplyId",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields:{
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					if(data.form) {
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
			traditional: false,
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					window.location.href = "application.html?applyId=" + importId;
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

	// ==========
	function Verification() {
		var flag = true;
		$('.must').each(function() {
			$(this).find('input').each(function() {
				if($(this).val() == '') {
					let msg = $(this).parents('.weui-cell').find('label').text();
					let str = msg.substr(0, msg.length - 1);
					errLay(str + '不能为空');
					flag = false
					return false;
				}
			})
		})
		return flag;
	};

	//=-=========显示。是否必填==========
	function content(mycontent) {

		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {

			if(mycontent.smProductApplycontents[i].label == "zxName") { //直属亲人姓名
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#name').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#name').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "zxRel") { //直属亲人与申请人关系
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#type').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#type').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "zxConWay") { //直属亲人联系电话
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#tel').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#tel').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "jinjName1") { //紧急联系人1姓名
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
	
})
