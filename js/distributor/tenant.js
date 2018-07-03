$(function() {
	var listJson = {};
	var importId = GetRequest().applyId;

	var Route;  //路径
	getExsit();   //判断是否有担保
	
	getList(); //获取借贷人信息

	$("#birth").datetimePicker({
		times: function() {
			return
		}
	});

	$("#gender").select({
		title: "性别",
		items: ["男", "女"]
	});
	$("#type").select({
		title: "证件类型",
		items: ["身份证", "临时身份证", "护照", "台胞证", "港澳居民通行证"]
	});
	$("#edu").select({
		title: "文化程度",
		items: ["高中以下", "高中/技校/中专", "专科", "本科", "本科以上"]
	});
	$("#isMarried").select({
		title: "婚姻状况",
		items: ["已婚无子女", "已婚有子女", "未婚", "离异", "丧偶"]
	});
	$("#register").select({
		title: "户籍性质",
		items: ["本省本市", "本省外市", "外省"]
	});
	$("#nature").select({
		title: "现住房性质",
		items: ["有按揭自置", "无按揭自置", "家属房产", "租住", "其他"]
	});

	$(".weui-btn").on("click", function() {
		let name = $("#name").val()
		let id = $("#idNum").val()
		let tel = $("#tel").val()
		let phone = $("#phone").val()
		if(isName(name, "承租人") == false) {
			return false
		} else if(isId(id, "承租人") == false) {
			return false
		}else if(isPhone(tel) == false) {
			return false
		} else if(isPhone(phone) == false) {
			return false
		} else {

			Verification();

			listJson.applyId = importId; //id
			listJson.name = $('#name').val(); //姓名
			listJson.sex = $('#gender').val(); //性别
			listJson.certificateType = $('#type').val(); //证件类型
			listJson.certificatePhone = $('#idNum').val(); //证件号码
			listJson.birth = $('#birth').val(); //出生日期
			listJson.standardCulture = $('#edu').val(); //文化程度
			listJson.maritalStatus = $('#isMarried').val(); //婚姻状况
			listJson.hujiNature = $('#register').val(); //户籍性质
			listJson.currentAddress = $('#zjAdress').val(); //居住地址
			listJson.housingNature = $('#nature').val(); //现住房性质
			listJson.phoneNumber = $('#tel').val(); //手机号码
			listJson.monthlyIncome = $('#monthlyIncome').val(); //每月净收入
			listJson.monthAverage = $('#monthAverage').val(); //每月均支出
			listJson.companyName = $('#companyName').val(); //单位名称
			listJson.unitAddress = $('#unitAddress').val(); //单位地址
			listJson.workTelephone = $('#phone').val(); //单位电话

			saveList();

		}
	})

	//获取借贷人信息
	function getList() {
		let data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getTenantInfoByApplyId",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				console.log(data)
				if(data.code == 0) {
					if(data.data) {
						listJson = data.data;

						if(listJson.name) { //姓名
							$('#name').val(listJson.name);
						}
						if(listJson.sex) { //性别
							$('#gender').val(listJson.sex);
						}
						if(listJson.certificateType) { //证件类型
							$('#type').val(listJson.certificateType);
						}
						if(listJson.certificatePhone) { //证件号码
							$('#idNum').val(listJson.certificatePhone);
						}
						if(listJson.birth) { //出生日期
							$('#birth').val(listJson.birth);
						}
						if(listJson.standardCulture) { //文化程度
							$('#edu').val(listJson.standardCulture);
						}
						if(listJson.maritalStatus) { //婚姻状况
							$('#isMarried').val(listJson.maritalStatus);
						}
						if(listJson.hujiNature) { //户籍性质
							$('#register').val(listJson.hujiNature);
						}
						if(listJson.currentAddress) { //居住地址
							$('#zjAdress').val(listJson.currentAddress);
						}
						if(listJson.housingNature) { //现住房性质
							$('#nature').val(listJson.housingNature);
						}
						if(listJson.phoneNumber) { //手机号码
							$('#tel').val(listJson.phoneNumber);
						}
						if(listJson.monthlyIncome) { //每月净收入
							$('#monthlyIncome').val(listJson.monthlyIncome);
						}
						if(listJson.monthAverage) { //每月均支出
							$('#monthAverage').val(listJson.monthAverage);
						}
						if(listJson.companyName) { //单位名称
							$('#companyName').val(listJson.companyName);
						}
						if(listJson.unitAddress) { //单位地址
							$('#unitAddress').val(listJson.unitAddress);
						}
						if(listJson.workTelephone) { //单位电话
							$('#phone').val(listJson.workTelephone);
						}

					}
				} else {
					errLay('请求出错');
				}
			}
		});
	}

	//保存借贷人信息
	function saveList() {
		$.ajax({
			url: path + "/apply/saveTenantInfo",
			data: JSON.stringify(listJson),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					window.location.href = Route+".html?applyId="+importId;
				} else {
				errLay('请求出错');
			}
			}
		});
	}

	function Verification() {
		$('.Required').each(function() {
			if($(this).val() == '') {
				let msg = $(this).parents('.weui-cell').find('label').text();
				let str = msg.substr(0, msg.length - 1);
				errLay(str + '不能为空');
				return false;
			}
		})
	}
	
	function getExsit(){
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
					if(data.data.isPersonBondsman == 1){
						Route = 'guarantor';  //配偶
					}else{
						Route = 'urgent';  //紧急联系人
					}
				}else{
					errLay('请求出错');
				}
			}
		});
	}
	

})