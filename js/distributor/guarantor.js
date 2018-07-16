$(function() {

	var listJson = {};
	var importId = GetRequest().applyId;

	getList(); //回显

	$("#time3").datetimePicker({
		times: function() {
			return
		}
	});

	// 下拉框
	$("#gender").select({
		title: "性别",
		items: ["男", "女"]
	})
	$("#type").select({
		title: "证件类型",
		items: ["身份证", "临时身份证", '护照', '台胞证', "港澳台通行证"]
	})
	$("#edu").select({
		title: "文化程度",
		items: ["高中以下", "高中/技校/中专", '专科', '本科', '本科以上']
	})
	$("#ismarried").select({
		title: "婚姻状况",
		items: ["未婚", "已婚无子女", "已婚有子女", "离异", "丧偶"]
	})
	$("#register").select({
		title: "户籍性质",
		items: ["本省本市", "本省外市", "外省"]
	})
	$("#nature").select({
		title: "现住房性质",
		items: ["有按揭自置", "无按揭自置", '家属房产', "租住", "其他"]
	})
	$("#Cnature").select({
		title: "企业性质",
		items: ["国有企业", "外资企业", "民营企业", "政府及事业单位", "其他"]
	})
	$("#Ctype").select({
		title: "证件类型",
		items: ["营业执照"]
	})
	$("#tax").select({
		title: "纳税资质",
		items: ["一般纳税人", '小规模纳税人']
	})
	$("#affairs").select({
		title: "纳税情况",
		items: ["无欠税", "恶意逃税", "有欠税"]
	})
	$("#istenant").select({
		title: "是否对外担保",
		items: ["是", "否"]
	})
	$("#trade").select({
		title: "行业类型",
		items: ["部队、公、检、法等执行机构", "餐饮、酒店、旅行社", '传统制造业（含能源）', '服务业', '高新产业', '公用事业单位、邮电通信、交通运输、仓储物流', '国家机关、党政机关、公益类社会团体、外国政府或国际公益组织', '建筑、工程', '教育行业', '金融机构', '律师事务所、会计事务所（四大）、税务师事务所等机构', '商贸类', '医疗行业', '专业性事务所', '自由职业者', '其他']
	})
	//	$(".personal").on("click", function() {
	//		$(".compony").removeClass("p-active")
	//		$(".personal").addClass("p-active");
	//		$("#personal").show()
	//		$("#compony").hide()
	//	})

	$("#personal .weui-btn").on("click", function() {

		if(!Verification()) {
			return false;
		};

		listJson.applyId = importId;

		listJson.name = $("#name").val(); //担保人姓名
		listJson.sex = $("#gender").val(); //担保人性别
		listJson.certificateType = $("#type").val(); //证件类型
		listJson.certificatePhone = $("#id").val(); //证件号码
		listJson.birth = $("#time3").val(); //出生日期
		listJson.standardCulture = $("#edu").val(); //文化程度
		listJson.maritalStatus = $("#ismarried").val(); //婚姻状况
		listJson.hujiNature = $("#register").val(); //户籍性质
		listJson.currentAddress = $("#address").val(); //居住地址
		listJson.housingNature = $("#nature").val(); //先住房性质
		listJson.phoneNumber = $("#tel").val(); //担保人手机号码
		listJson.monthlyIncome = $("#income").val(); //每月净收入
		listJson.monthAverage = $("#pay").val(); //每月均支出
		listJson.companyName = $("#cName").val(); //单位名称
		listJson.unitAddress = $("#cAdress").val(); //单位地址
		listJson.workTelephone = $("#phone").val(); //单位电话

		postList()

	})

	function getList() {
		let data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getPersonalTenantInfoByApplyId",
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

						content(listJson.smProductApplycontent); ////显示和必填验证

						if(listJson.name) {
							$("#name").val(listJson.name)
						}
						if(listJson.sex) {
							$("#gender").val(listJson.sex)
						}
						if(listJson.certificateType) {
							$("#type").val(listJson.certificateType)
						}
						if(listJson.certificatePhone) {
							$("#id").val(listJson.certificatePhone)
						}
						if(listJson.birth) {
							$("#time3").val(listJson.birth)
						}
						if(listJson.standardCulture) {
							$("#edu").val(listJson.standardCulture)
						}
						if(listJson.maritalStatus) {
							$("#ismarried").val(listJson.maritalStatus)
						}
						if(listJson.hujiNature) {
							$("#register").val(listJson.hujiNature)
						}
						if(listJson.currentAddress) {
							$("#address").val(listJson.currentAddress)
						}
						if(listJson.housingNature) {
							$("#nature").val(listJson.housingNature)
						}
						if(listJson.phoneNumber) {
							$("#tel").val(listJson.phoneNumber)
						}
						if(listJson.monthlyIncome) {
							$("#income").val(listJson.monthlyIncome)
						}
						if(listJson.monthAverage) {
							$("#pay").val(listJson.monthAverage)
						}
						if(listJson.companyName) {
							$("#cName").val(listJson.companyName)
						}
						if(listJson.unitAddress) {
							$("#cAdress").val(listJson.unitAddress)
						}
						if(listJson.workTelephone) {
							$("#phone").val(listJson.workTelephone)
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
	}

	function postList() {
		$.ajax({
			url: path + "/apply/savePersonalTenantInfo",
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
					window.location.href = "urgent.html?applyId=" + importId;
				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		})
	}

	function Verification() {
		var flag = true;
		$(".must").each(function() {
			if($(this).val() == '') {
				let msg = $(this).parents(".weui-cell").find('label').text();
				let str = msg.substr(0, msg.length - 1);
				errLay(str + "不能为空");
				flag = false;
				return false;
			}
		})
		return flag;
	}

	//==========================
	$("#IDcamera").on("click", function() {
		$('#userIdbox').fadeIn(100)
	})

	$('.next').on('click', function() {
		$(this).parent('.fixBox').fadeOut(100)
	})

	//  图片上传回显
	$(document).on('change', 'input[type=file]', function() {
		var files = Array.prototype.slice.call(this.files);
		var _this = $(this);
		files.forEach(function(file, i) {
			//jpeg png gif    "/image/jpeg"     i对大小写不敏感
			var fileType = /\/(?:jpeg|png|gif)/i;
			if(!fileType.test(file.type)) {
				alert("请选择正确的图片格式(jpeg || png || gif)");
				return;
			}
			//HTML 5.1  新增file接口
			var reader = new FileReader();
			//读取失败
			reader.onerror = function() {
				alert("读取失败");
			};
			//读取中断
			reader.onabort = function() {
				alert("网络异常!");
			};
			//读取成功
			reader.onload = function() {
				var result = this.result; //读取失败时  null   否则就是读取的结果
				var image = new Image();
				image.src = result;

				_this.parents('.image-item').css("background-image", 'url(' + result + ')');

			};
			//注入图片 转换成base64
			reader.readAsDataURL(file);
		})

	})

	$('#a').change(function() {
		var _this = $(this);
		var files = Array.prototype.slice.call(this.files);
		var mydata = new FormData();
		mydata.append('file', files[0]);
		mydata.append('ocrCode', 0);

		$.ajax({
			url: path + "/file/addFileUseOCR",
			data: mydata,
			dataType: "json",
			contentType: "application/json",
			type: "post",
			processData: false,
			contentType: false,
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					if(data.data.code) { //身份证
						$('#id').val(data.data.code)
					}
					if(data.data.name) { //姓名
						$('#name').val(data.data.name)
					}
					if(data.data.sex) { //性别
						$('#gender').val(data.data.sex)
					}
					if(data.data.birthday) { //生日
						var a = data.data.birthday.substr(0, 4);
						var b = data.data.birthday.substr(4, 2);
						var c = data.data.birthday.substr(6, 2);
						$('#time3').val(a + '-' + b + '-' + c);
					}
				} else {
					errLay(data.msg)
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	})

	//=-=========显示。是否必填==========	
	function content(mycontent) {

		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {

			if(mycontent.smProductApplycontents[i].label == "dbName") { //担保人姓名
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#name').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#name').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbSex") { //性别
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#gender').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#gender').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbCerType") { //证件类型
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#type').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#type').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbBirth") { //证件号码
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#id').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#id').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbSex") { //出生日期
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#time3').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#time3').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbStanCul") { //文化程度
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#edu').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#edu').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbMarSta") { //婚姻状况
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#ismarried').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#ismarried').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbHujiNat") { //户籍性质
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#register').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#register').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbCurAddr") { //居住地址
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#address').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#address').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbHouNat") { //现住房性质
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#nature').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#nature').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbPhone") { //手机号码
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#tel').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#tel').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbMonIn") { //每月净收入
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#income').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#income').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbMonAve") { //每月均支出
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#pay').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#pay').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbComName") { //单位名称
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#cName').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#cName').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbUnitAddr") { //单位地址
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#cAdress').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#cAdress').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "dbWorkTel") { //单位电话
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#phone').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#phone').addClass("must");
					}
				}

			}

		}
	}

	//=-=========显示。是否必填==========

})