$(function() {
	var listJson = {};
	var importId = GetRequest().applyId;

	var Route; //路径
	getExsit(); //判断路径

	OrderUse(importId,function(){
		getList(); //回显
	});
	

//	$("#birth").datetimePicker({
//		times: function() {
//			return
//		}
//	});

//	$("#gender").select({
//		title: "性别",
//		items: ["男", "女"]
//	});
//	$("#type").select({
//		title: "证件类型",
//		items: ["身份证"]
//	});
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

		if(!Verification()) {
			return false;
		};
		
		if(!PhoneVerification()) {  //正确的手机号正则验证
			return false;
		};

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

	})

	//获取借贷人信息
	function getList() {
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getTenantInfoByApplyId?time=" + new Date().getTime(),
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
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
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
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					window.location.href = Route + ".html?applyId=" + importId;
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
						$('#idNum').val(data.data.code)
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
						$('#birth').val(a + '-' + b + '-' + c);
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

			if(mycontent.smProductApplycontents[i].label == "teName") { //承租人姓名
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#name').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#name').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teSex") { //性别
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#gender').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#gender').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teCerType") { //证件类型
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#type').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#type').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teCerPhone") { //证件号码
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#idNum').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#idNum').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teBirth") { //出生日期
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#birth').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#birth').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teStaCul") { //文化程度
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#edu').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#edu').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teMarSta") { //婚姻状况
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#isMarried').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#isMarried').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teHujiNat") { //户籍性质
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#register').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#register').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teCurAddr") { //居住地址
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#zjAdress').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#zjAdress').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teHouNat") { //现住房性质
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#nature').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#nature').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "tePhone") { //手机号码
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#tel').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#tel').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teMonIn") { //每月净收入
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#monthlyIncome').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#monthlyIncome').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teMonAve") { //每月均支出
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#monthAverage').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#monthAverage').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teComName") { //单位名称
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#companyName').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#companyName').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teUnitAddr") { //单位地址
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#unitAddress').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#unitAddress').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "teWorkTel") { //单位电话
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

	//	==========路劲
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

					if(content.isZrdb == 1) {
						Route = 'guarantor'; //个人担保
						return
					} else if(content.isJjlx == 1) {
						Route = 'urgent'; //紧急联系人
						return
					}

				} else {
					errLay(data.msg);
				}
			}
		});
	}

})