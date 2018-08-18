$(function() {
	//================如果是返回的刷新页面
	window.onpageshow = function(event) {　　
		if(event.persisted) {　　　　
			window.location.reload()　　
		}
	};
	//	=====================
	var listJson = {};
	var importId = GetRequest().applyId;
	var Route; //路径

	OrderUse(importId, function() {
		getList();
	});

	var carList; //汽车品牌列表

	getCar();

	var trueMarr = ["已婚无子女", "已婚有子女"];
	var falseMarr = ["未婚", "离异", "丧偶"];

	$("#edu").select({
		title: "请选择您的文化程度",
		items: ["高中及以下", "高中/技校/中专", "专科", "本科", "本科以上"]
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

	$("#isFirst").change(function() { //是否首次购车
		if($(this).val() == '是') {
			$('#hasCar').addClass('hide');
			$('#Vehicle').removeClass('must');
		} else {
			fistContent(listJson.smProductApplycontent);
		}
	})

	//	=============驾驶证
	$("#license").change(function() {
		if($(this).val() == '无') {
			$('.carSur').parents('.weui-cell').addClass('hide');
			$('.carSur').removeClass('must');
		} else {
			carContent(listJson.smProductApplycontent);
		}
	})

	$("#next").on("click", function() {
		if(!Verification()) {
			return false
		}

		if(!PhoneVerification()) { //正确的手机号正则验证
			return false;
		};

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
		listJson.payCardNum = $('#payCardNum').val(); //还款卡号

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

	})

	function getList() { //获取借贷人信息
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getBorrowerInfo?time=" + new Date().getTime(),
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
					listJson = data.data

					$('#Name').text(listJson.name); //姓名
					$('#Phone').text(listJson.phone); //电话号码
					$('#idNumber').text(listJson.certificatePhone); //身份证
					$('#Birthday').text(getBirthday(listJson.certificatePhone)); //生日
					$('#Sex').text(getSex(listJson.certificatePhone)); //性别

					if(listJson.standardCulture) { //文化程度
						$('#edu').val(listJson.standardCulture);
					}
					if(listJson.maritalStatus) { //婚姻状况
						$('#ismarried').val(listJson.maritalStatus);
					}
					if(listJson.hujiNature) { //户籍性质
						$('#register').val(listJson.hujiNature);
					}
					if(listJson.monthlyIncome) { //每月净收入
						$('#monthlyIncome').val(listJson.monthlyIncome);
					}
					if(listJson.monthAverage) { //每月均支出
						$('#monthAverage').val(listJson.monthAverage);
					}

					if(listJson.drivingLicence != undefined && listJson.drivingLicence != null) { //驾驶证有无
						console.log('驾驶证有无')
						if(listJson.drivingLicence == 1) {
							console.log('有')
							$('#license').val('有');
							carContent(listJson.smProductApplycontent);
						} else {
							console.log('无')
							$('#license').val('无');
						}
					}

					if(listJson.drivingName) { // 驾驶人姓名
						$('#drivingName').val(listJson.drivingName);
					}
					if(listJson.drivingNumber) { //驾驶证号码
						$('#drivingNumber').val(listJson.drivingNumber);
					}
					if(listJson.drivingRecordNumber) { //驾驶证档案号
						$('#drivingRecordNumber').val(listJson.drivingRecordNumber);
					}
					if(listJson.recalDriver) { //实际用车人
						$('#recalDriver').val(listJson.recalDriver);
					}
					if(listJson.drivingPhone) { //联系电话
						$('#tel').val(listJson.drivingPhone);
					}

					if(listJson.payCardNum) {
						$('#payCardNum').val(listJson.payCardNum);
					}

					if(listJson.firstBuyCar != undefined && listJson.firstBuyCar != null) { //家庭首次购车
						if(listJson.firstBuyCar == 0) {
							$('#isFirst').val('是');
							$('#hasCar').hide();
						} else {
							$('#isFirst').val('否');
							fistContent(listJson.smProductApplycontent);
						}
					}

					if(listJson.nowVehicleBrands) { //现有车辆品牌
						$('#Vehicle').val(listJson.nowVehicleBrands);
					}
					if(listJson.carPurpose) { //购车目的
						$('#aim').val(listJson.carPurpose);
					}

					if(listJson.isMarray) { //已婚
						$("#ismarried").select({
							title: "婚姻状况",
							items: trueMarr
						})
					} else {
						$("#ismarried").select({ //未婚
							title: "婚姻状况",
							items: falseMarr
						})
					}

					getUrl(); //获取地址

					content(listJson.smProductApplycontent); ////显示和必填验证

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
					//					var arr = [];
					//					for(var i = 1; i < data.list.length; i++) {
					//						var car = {
					//							title: data.list[i].name,
					//							value: data.list[i].id
					//						};
					//						arr.push(car);
					//					};
					//					$("#Vehicle").select({
					//						title: "现有车辆品牌",
					//						items: arr
					//					});
					carList = data.list;

					$(document).on('click', '#Vehicle', function() {
						Distributor(carList);
					})

					$(document).on('focus', '#Vehicle', function() {
						Distributor(carList);
					})

					$(document).on('input', '#Vehicle', function() {
						search($(this).val());
					})

				} else {
					errLay(data.msg);
				}
			}
		});
	}

	//	======模糊查询下拉===================
	function search(keyWord) {
		var len = carList.length;
		var arr = [];
		for(var i = 0; i < len; i++) {
			//如果字符串中不包含目标字符会返回-1
			if(carList[i].name.indexOf(keyWord) >= 0) {
				arr.push(carList[i]);
			}
		}
		Distributor(arr);
	}
	//===========车辆品牌下拉==========
	function Distributor(arr) {
		$('body').addClass('modal-open');
		var brandVal = $('#Vehicle').val();
		$('#mySelect').remove();
		var myText = '<div id="mySelect">' +
			'<div id="selectContent" class="carList">';

		for(var i = 0; i < arr.length; i++) {
			if(arr[i].name != '全品牌') {
				if(brandVal == arr[i].name) {
					myText += '<div class="mylabel active" code="' + arr[i].id + '">';
				} else {
					myText += '<div class="mylabel" code="' + arr[i].id + '">';
				}
				myText += '<p>' + arr[i].name + '</p>' + '</div>';
			}

		}
		myText += '</div>' + '</div>';
		$('#addselectOne').append(myText);
		$('#mySelect').fadeIn();
	}
	$(document).on('click', '.carList .mylabel', function() {
		$(this).addClass('active').siblings('.mylabel').removeClass('active');
		var myVal = $(this).find('p').text();
		var code = $(this).attr('code');
		$('#Vehicle').val(myVal);
		$('#Vehicle').attr('code', code);
		$('#mySelect').remove();
		$('body').removeClass('modal-open');
	})

	//=-=========显示。是否必填==========
	function content(mycontent) {

		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {

			if(mycontent.smProductApplycontents[i].label == "stCulture") { //文化程度
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#edu').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#edu').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "maStatus") { //婚姻状况
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#ismarried').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#ismarried').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "hujiNat") { //户籍性质
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#register').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#register').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "moIncome") { //每月净收入
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#monthlyIncome').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#monthlyIncome').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "moAverage") { //每月均支出
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#monthAverage').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#monthAverage').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "isDrivers") { //驾驶证
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#license').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#license').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "actualMan") { //实际用车人
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#recalDriver').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#recalDriver').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "conNum") { //联系电话
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#tel').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#tel').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "firstBuy") { //家庭首次购车
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#isFirst').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#isFirst').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "carPurpose") { //购车目的
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#aim').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#aim').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "payCardNum") { //还款银行卡号
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#payCardNum').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#payCardNum').addClass("must");
					}
				}
			}

		}

	}
	//=-=========显示。是否必填==========

	function carContent(mycontent) {
		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {

			if(mycontent.smProductApplycontents[i].label == "driName") { //驾驶人姓名
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#drivingName').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#drivingName').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "driNum") { //驾驶证号码
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#drivingNumber').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#drivingNumber').addClass("must");
					}
				}
			} else if(mycontent.smProductApplycontents[i].label == "driAbbr") { //驾驶证档案号
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#drivingRecordNumber').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#drivingRecordNumber').addClass("must");
					}
				}
			}

		}
	}

	function fistContent(mycontent) {
		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {
			if(mycontent.smProductApplycontents[i].label == "nowVehic") { //现有车辆品牌
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#Vehicle').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#Vehicle').addClass("must");
					}
				}
			}
		}
	}

	//===========如果有驾驶证需要验证的====================
	//	function carVerification() {
	//		var flag = true;
	//		$('.must').each(function() {
	//			if($(this).val() == '') {
	//				let msg = $(this).parents('.weui-cell').find('label').text();
	//				let str = msg.substr(0, msg.length - 1);
	//				errLay(str + '不能为空');
	//				flag = false;
	//				return false;
	//			}
	//		})
	//		return flag;
	//	}

	//	============获取地址========
	function getUrl() {
		var data = listJson.smProductApplycontent;

		if(data.isShowWork == 1) {
			Route = 'work'; //借款人工作信心
			return;
		} else if(data.isShowAddr == 1) {
			Route = 'address'; //借款人地址
			return;
		} else {
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

					if(content.isPo == 1) {
						Route = 'married'; //配偶
						return
					} else if(content.isGtcz == 1) {
						Route = 'tenant'; //承租人
						return
					} else if(content.isZrdb == 1) {
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

	$("#xiangji").on("click", function() {
		$('#userIdbox').show();
	})

	$(".next").on("click", function() {
		$('#userIdbox').hide();
	})

	function orcImg(myFile, name, thisDom) { //驾驶证ocr接口
		var Fdata = new FormData();
		Fdata.append('file', myFile, name + '.jpg');
		Fdata.append('ocrCode', 1);

		$.ajax({
			url: path + "/file/addFileUseOCR",
			data: Fdata,
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
					if(data.data.cardId.words) { //驾驶证号码
						$('#drivingNumber').val(data.data.cardId.words)
					}
					if(data.data.name.words) { //驾驶证姓名
						$('#drivingName').val(data.data.name.words)
					}
					$('.fixBox').fadeOut();
				} else {
					errLay(data.msg);
					$('.fixBox').fadeOut();
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
				$('.fixBox').fadeOut();
			}
		});
	}

	$(document).on('change', 'input[type=file]', function() {
		var files = Array.prototype.slice.call(this.files);
		var _this = $(this);
		var thisDom = $(this).attr('id');
		files.forEach(function(file, i) {
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
				var myFile = files[i];
				var fileName = files[i].name;
				var name = fileName.substring(0, fileName.indexOf("."));

				var img = new Image();
				img.src = result;

				if(img.complete) {
					callback();
				} else {
					img.onload = callback;
				}

				function callback() {
					var data = compress(img);
					var inputData = upload(data, file.type);
					orcImg(inputData, name, thisDom);
					img = null;
				}

				_this.parents('.image-item').css("background-image", 'url(' + result + ')');
			};
			//注入图片 转换成base64
			reader.readAsDataURL(file);
		})

	})

})