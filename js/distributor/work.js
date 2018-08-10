$(function() {

	var listJson = {};
	var importId = GetRequest().applyId;
	var Route; //路径

	OrderUse(importId,function(){
		getList();
	});

	$("#nature").select({
		title: "企业性质",
		items: ["国有企业", "外资企业", "民营企业", "政府及事业单位", "其他"]
	})

	$("#trade").select({
		title: "所属行业",
		items: ["部队、公、检、法等执法机构", "餐饮、酒店、旅行社", "传统制造业(含能源)", "服务业", "高新产业", "公用事业单位  邮电通信  交通运输  仓储物流", "国家机关、党政机关  公益类社会团体  外国政府或国际公益组织",
			"建筑、工程", "教育行业", "金融机构", "律师事务所、会计事务所(四大)、税务师事务所等机构", "商贸类", "医疗行业", "专业性事务所", "自由职业者", "其他"
		]
	})

	$("#trade").change(function() {
		if($(this).val() == '自由职业者' || $(this).val() == '其他') {
			$('.Required').parents('.weui-cell').addClass('hide');
			$('.Required').removeClass('must');
		} else {
			ohter(listJson.smProductApplycontent); ////显示和必填验证
		}
	})

	$("#next").on("click", function() {

		if(!Verification()) {  //正则 
			return false;
		}
		if(!PhoneVerification()) {  //正确的手机号正则验证
			return false;
		};
		
		listJson.applyId = importId;

		listJson.companyName = $('#companyName').val(); //单位名称
		listJson.unitAddress = $('#unitAddress').val(); //单位地址
		listJson.enterpriseNature = $('#nature').val(); // 企业性质
		listJson.workTelephone = $('#tel').val(); //单位电话
		listJson.industryInvolved = $('#trade').val(); // 所属行业
		listJson.yearsOfWorking = $('#yearsOfWorking').val() //单位工作年限
		listJson.position = $('#position').val() //单位工作年限

		postList(); //上传

	})

	function getList() { //回显
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getBorrowerWorkByApplyId?time=" + new Date().getTime(),
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					if(data.data) {
						listJson = data.data;
						
						if(listJson.companyName) { //单位名称
							$('#companyName').val(listJson.companyName);
						}
						if(listJson.unitAddress) { //单位地址
							$('#unitAddress').val(listJson.unitAddress);
						}
						if(listJson.enterpriseNature) { //企业性质
							$('#nature').val(listJson.enterpriseNature);
						}
						if(listJson.workTelephone) { //单位电话
							$('#tel').val(listJson.workTelephone);
						}
						if(listJson.industryInvolved) { //所属行业
							$('#trade').val(listJson.industryInvolved);
							if(listJson.industryInvolved != "其他" && listJson.industryInvolved != "自由职业者") {
								ohter(listJson.smProductApplycontent); 
							}
						}else{
							ohter(listJson.smProductApplycontent); 
						}
						if(listJson.yearsOfWorking) { //单位工作年限
							$('#yearsOfWorking').val(listJson.yearsOfWorking);
						}
						if(listJson.position) { //职务
							$('#position').val(listJson.position);
						}
						
						getUrl(); //获取地址
						
						content(listJson.smProductApplycontent); ////显示和必填验证
					}

				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}

	function postList() { 
		$.ajax({
			url: path + "/apply/saveBorrowerWork",
			data: JSON.stringify(listJson),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					window.location.href = Route+".html?applyId=" + importId;
				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}

	//=-=========显示。是否必填==========
	function content(mycontent) {
		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {
			if(mycontent.smProductApplycontents[i].label == "inInvolved") { //所属行业
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#trade').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#trade').addClass("must");
					}
				}

			}

		}

	}
	//=-=========显示。是否必填==========	

	function ohter(mycontent) {
		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {
			if(mycontent.smProductApplycontents[i].label == "comName") { //单位名称
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#companyName').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#companyName').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "unitAddr") { //单位地址
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#unitAddress').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#unitAddress').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "enNature") { //企业性质
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#nature').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#nature').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "workTel") { //单位电话
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#tel').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#tel').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "yearsOfWork") { //单位工作年限
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#yearsOfWorking').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#yearsOfWorking').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "position") { //职务
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#position').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#position').addClass("must");
					}
				}

			}
		}

	}
	
	
	//	============获取地址========
	function getUrl(){
		var data = listJson.smProductApplycontent;
		
		if(data.isShowAddr == 1){
			Route = 'address'; //借款人地址
			return;
		}else{
			getExsit();
		}
	}
	
	
	function getExsit() {
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/isExsitOtherPersion",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					var content = data.data;
					
					if(content.isPo == 1){
						Route = 'married';  //配偶
						return
					}
					else if(content.isGtcz == 1){
						Route = 'tenant';  //承租人
						return
					}
					else if(content.isZrdb == 1){
						Route = 'guarantor';  //个人担保
						return
					}
					else if(content.isJjlx == 1){
						Route = 'urgent';  //紧急联系人
						return
					}
					
				} else {
					errLay(data.msg);
				}
			}
		});
	}
	

})