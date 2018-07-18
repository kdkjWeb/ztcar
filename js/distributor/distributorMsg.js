$(function() {
	var listJson = {};
	var importId = GetRequest().applyId;
	var Route; //路径
	getExsit(); //判断下一个页面

	getList();

	$("#next").on("click", function() {
		let disName = $("#disName").val()
		let disPhone = $("#disPhone").val()

		if(!Verification()) {
			return false;
		}
		
		if(!isPhone(disPhone,'销售顾问')){
			return false;
		}
		
		listJson.applyId = importId;
		listJson.salesConsultant = disName;
		listJson.consultantPhone = disPhone;
		postList();

	})

	function getList() {
		let data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/perfectDealers",
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
						$('#dealersName').text(listJson.dealersName); //经销商名称
						$('#businessChannels').text(listJson.businessChannels); //业务渠道：
						$('#agentName').text(listJson.agentName); //SP代理名称
						$('#channelManagerName').text(listJson.channelManagerName); //渠道经理

						if(listJson.salesConsultant) {
							$("#disName").val(listJson.salesConsultant); //销售顾问
						}
						if(listJson.consultantPhone) {
							$("#disPhone").val(listJson.consultantPhone) //联系电话
						}

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
			url: path + "/apply/updateSaleInfo",
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

	function content(mycontent) {

		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {

			if(mycontent.smProductApplycontents[i].label == "salesCon") { //销售顾问
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#disName').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#disName').addClass("must");
					}
				}
				
			} else if(mycontent.smProductApplycontents[i].label == "salesConTel") { //销售顾问电话
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#disPhone').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#disPhone').addClass("must");
					}
				}
			} else if(mycontent.smProductApplycontents[i].label == "spName") { //sp代理名称
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#agentName').parents(".weui-cell").removeClass("hide");
				}
			}
		}

	}

	function Verification() {
		var flag = true;
		$('.must').each(function() {
			if($(this).val() == '') {
				let msg = $(this).parents('.weui-cell').find('label').text();
				let str = msg.substr(0, msg.length - 1);
				errLay(str + '不能为空');
				flag = false;
				return false;
			}
		})
		return flag;
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
					
					if(content.isRj == 1){
						Route = 'financing'; //填写融资信息
						return;
					}
					
					else if(content.isSqr == 1){
						Route = 'basicMsg';  //借款人基本信息第一个页面
						return
					}
					else if(content.isPo == 1){
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