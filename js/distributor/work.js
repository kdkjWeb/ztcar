$(function() {

	var listJson = {};
	var importId = GetRequest().applyId;

	getList(); //回显

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

	$("#next").on("click", function() {
		let tel = $("#tel").val()
		if(isPhone(tel, "正确的") == "") {
			return false
		} else if(isPhone(tel, "正确的") == false) {
			return false
		} else {
			if(!Verification()){  //Verification(); //正则 
				return false;
			}

			listJson.applyId = importId;

			listJson.companyName = $('#companyName').val(); //单位名称
			listJson.unitAddress = $('#unitAddress').val(); //单位地址
			listJson.enterpriseNature = $('#nature').val(); // 企业性质
			listJson.workTelephone = $('#tel').val(); //单位电话
			listJson.industryInvolved = $('#trade').val(); // 所属行业
			listJson.yearsOfWorking = $('#yearsOfWorking').val() //单位工作年限
			listJson.position = $('#position').val() //单位工作年限

			postList(); //上传

		}
	})

	function getList() { //回显
		let data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getBorrowerWorkByApplyId",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
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
						}
						if(listJson.yearsOfWorking) { //单位工作年限
							$('#yearsOfWorking').val(listJson.yearsOfWorking);
						}
						if(listJson.position) { //职务
							$('#position').val(listJson.position);
						}

					}

				} else {
					errLay('请求出错');
				}
			}
		});
	}

	function postList() { //上传
		$.ajax({
			url: path + "/apply/saveBorrowerWork",
			data: JSON.stringify(listJson),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					window.location.href = "address.html?applyId="+importId;
				} else {
					errLay('请求出错');
				}
			}
		});
	}

	function Verification() {
		var flag = true;
		$('.Required').each(function() {
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
})