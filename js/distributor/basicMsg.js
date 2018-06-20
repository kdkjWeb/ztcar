$(function() {
	var listJson = {};
	var importId = 1;

	getList();
	getCar();

	$("#edu").select({
		title: "请选择您的文化程度",
		items: ["高中及以下", "高中/技校/中专", "专科", "本科", "本科以上"]
	})
	$("#ismarried").select({
		title: "婚姻状况",
		items: ["已婚无子女", "已婚有子女", "未婚", "离异", "丧偶"]
	})
	$("#register").select({
		title: "户籍性质",
		items: ["本省本市", "本省外市", "外省"]
	})
	$("#license").select({
		title: "驾驶证",
		items: ["有", "无"]
	})
	$("#isFirst").select({
		title: "家庭首次购车？",
		items: ["是", "否"]
	})

	$("#aim").select({
		title: "购车目的",
		items: ["自用", "他用", "商务用车", "其他"]
	})

	$("#next").on("click", function() {
		let tel = $("#tel").val()
		if(isPhone(tel, "正确的") == "") {
			return false
		} else if(isPhone(tel, "正确的") == false) {
			return false
		} else {

			Verification(); //为空的验证

			if($('#license').val() == '有') { //驾驶证 驾驶信息必填
				getCar()
			}

			listJson.applyId = importId;

			listJson.standardCulture = $('#edu').val(); //文化程度
			listJson.maritalStatus = $('#ismarried').val(); //婚姻状况
			listJson.hujiNature = $('#register').val(); //户籍性质
			listJson.monthlyIncome = $('#monthlyIncome').val(); //每月净收入
			listJson.monthAverage = $('#monthAverage').val(); //每月均支出
			listJson.drivingName = $('#drivingName').val(); //驾驶人姓名
			listJson.drivingNumber = $('#drivingNumber').val(); //驾驶证号码
			listJson.drivingRecordNumber = $('#drivingRecordNumber').val(); //驾驶证档案号
			listJson.carPurpose = $('#aim').val(); //购车目的
			listJson.nowVehicleBrands = $('#Vehicle').val(); //现有车辆品牌
			listJson.recalDriver = $('#recalDriver').val(); //实际用车人
			listJson.drivingPhone = $('#tel').val(); //实际用车人联系电话

			if($('#license').val() == '有') { //驾驶证
				listJson.drivingLicence = 1;
			} else {
				listJson.drivingLicence = 0;
			}

			if($('#isFirst').val() == '是') { //家庭首次购车
				listJson.firstBuyCar = 0;
			} else {
				listJson.firstBuyCar = 1;
			}

			saveList();

		}

	})

	function getList() { //获取借贷人信息
		let data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getBorrowerInfo",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					listJson = data.data
					$('#Name').text(listJson.name); //姓名
					$('#Phone').text(listJson.phone); //电话号码
					$('#idNumber').text(listJson.certificatePhone); //身份证
					$('#Birthday').text(getBirthday(listJson.certificatePhone)); //生日
					$('#Sex').text(getSex(listJson.certificatePhone)); //性别

					if(listJson.standardCulture != null) { //文化程度
						$('#edu').val(listJson.standardCulture);
					}
					if(listJson.maritalStatus != null) { //婚姻状况
						$('#ismarried').val(listJson.maritalStatus);
					}
					if(listJson.hujiNature != null) { //户籍性质
						$('#register').val(listJson.hujiNature);
					}
					if(listJson.monthlyIncome != null) { //每月净收入
						$('#monthlyIncome').val(listJson.monthlyIncome);
					}
					if(listJson.monthAverage != null) { //每月均支出
						$('#monthAverage').val(listJson.monthAverage);
					}
					if(listJson.drivingLicence != null) { //驾驶证有无
						if(listJson.drivingLicence == 1) {
							$('#license').val('有');
						} else {
							$('#license').val('无');
						}
					}
					if(listJson.drivingName != null) { // 驾驶人姓名
						$('#drivingName').val(listJson.drivingName);
					}
					if(listJson.drivingNumber != null) { //驾驶证号码
						$('#drivingNumber').val(listJson.drivingNumber);
					}
					if(listJson.drivingRecordNumber != null) { //驾驶证档案号
						$('#drivingRecordNumber').val(listJson.drivingRecordNumber);
					}
					if(listJson.recalDriver != null) { //实际用车人
						$('#recalDriver').val(listJson.recalDriver);
					}
					if(listJson.drivingPhone != null) { //联系电话
						$('#tel').val(listJson.drivingPhone);
					}

					if(listJson.firstBuyCar != null) { //家庭首次购车
						if(listJson.firstBuyCar == 0) {
							$('#isFirst').val('是');
						} else {
							$('#isFirst').val('不是');
						}
					}
					if(listJson.monthAverage != null) { //现有车辆品牌
						$('#Vehicle').val(listJson.monthAverage);
					}
					if(listJson.carPurpose != null) { //购车目的
						$('#aim').val(listJson.carPurpose);
					}

				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		});
	}

	function saveList() {
		$.ajax({
			url: path + "/apply/saveBorrowerInfo",
			data: JSON.stringify(listJson),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					window.location.href = "work.html"
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		});
	}

//====================获取汽车品牌=============
	function getCar() {
		$.ajax({
			url: path + "/ztBrand/list",
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					var arr = [];
					for(var i = 0; i < data.list.length; i++) {
						let car = {
							title: data.list[i].name,
							value: data.list[i].id
						};
						arr.push(car);
					}
					$("#Vehicle").select({
						title: "现有车辆品牌",
						items: arr
					})
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		});
	}

//=================为空验证============
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

//===========如果有驾驶证需要验证的====================
	function carVerification() {
		$('.carSur').each(function() {
			if($(this).val() == '') {
				let msg = $(this).parents('.weui-cell').find('label').text();
				let str = msg.substr(0, msg.length - 1);
				errLay(str + '不能为空');
				return false;
			}
		})
	}

})