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
	getExsit(); //判断路劲

	
	OrderUse(importId,function(){
		getOldList(); // 回显
	});
//	$("#date").datetimePicker({
//		times: function() {
//			return
//		}
//	});

//	$("#type").select({
//		title: "证件类型",
//		items: ["身份证"]
//	})
	$(".weui-btn").on("click", function() {
		if(!Verification()) {
			return false;
		}
		
		if(!PhoneVerification()) {  //正确的手机号正则验证
			return false;
		};

		listJson.applyId = importId;
		listJson.name = $("#name").val();
		listJson.contactNum = $("#tel").val();
		if($("#type").val() == '身份证') {
			listJson.certificateType = 0;
		}
		listJson.certificateNum = $("#id").val();
		listJson.birth = $("#date").val();
		listJson.workName = $("#cName").val();
		listJson.position = $("#position").val();
		listJson.workAddress = $("#cAddress").val();
		listJson.workPhone = $("#phone").val();
		getSaveList()

	})

	function getOldList() {
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getSmSpouseInfoByApplyId?time=" + new Date().getTime(),
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
				console.log(data);
				if(data.code == 0) {
					if(data.data) {
						listJson = data.data;

						content(listJson.smProductApplycontent); ////显示和必填验证

						if(listJson.name) {
							$("#name").val(listJson.name)
						}
						if(listJson.contactNum) {
							$("#tel").val(listJson.contactNum)
						}
						if(listJson.certificateType == 0) {
							$("#type").val('身份证');
						}
						if(listJson.certificateNum) {
							$("#id").val(listJson.certificateNum)
						}
						if(listJson.birth) {
							$("#date").val(listJson.birth)
						}
						if(listJson.workName) {
							$("#cName").val(listJson.workName)
						}
						if(listJson.position) {
							$("#position").val(listJson.position)
						}
						if(listJson.workAddress) {
							$("#cAddress").val(listJson.workAddress)
						}
						if(listJson.workPhone) {
							$("#phone").val(listJson.workPhone)
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

	function getSaveList() {
		$.ajax({
			url: path + "/apply/saveSmSpouseInfo",
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
		})
	}

	
//	$("#IDcamera").on("click", function() {
//		$('#userIdbox').fadeIn(100)
//	})
//	$('.next').on('click', function() {
//		$(this).parent('.fixBox').fadeOut(100)
//	})
//
//	//  图片上传回显
//	$(document).on('change', 'input[type=file]', function() {
//		var files = Array.prototype.slice.call(this.files);
//		var _this = $(this);
//		files.forEach(function(file, i) {
//			//jpeg png gif    "/image/jpeg"     i对大小写不敏感
//			var fileType = /\/(?:jpeg|png|gif)/i;
//			if(!fileType.test(file.type)) {
//				alert("请选择正确的图片格式(jpeg || png || gif)");
//				return;
//			}
//			//HTML 5.1  新增file接口
//			var reader = new FileReader();
//			//读取失败
//			reader.onerror = function() {
//				alert("读取失败");
//			};
//			//读取中断
//			reader.onabort = function() {
//				alert("网络异常!");
//			};
//			//读取成功
//			reader.onload = function() {
//				var result = this.result; //读取失败时  null   否则就是读取的结果
//				var image = new Image();
//				image.src = result;
//
//				_this.parents('.image-item').css("background-image", 'url(' + result + ')');
//
//			};
//			//注入图片 转换成base64
//			reader.readAsDataURL(file);
//		})
//
//	})
//
//	$('#a').change(function() {
//		var _this = $(this);
//		var files = Array.prototype.slice.call(this.files);
//		var mydata = new FormData();
//		mydata.append('file', files[0]);
//		mydata.append('ocrCode', 0);
//
//		$.ajax({
//			url: path + "/file/addFileUseOCR",
//			data: mydata,
//			dataType: "json",
//			contentType: "application/json",
//			type: "post",
//			processData: false,
//			contentType: false,
//			beforeSend: function() {
//				showLoading(); //显示loading	
//			},
//			success: function(data) {
//				hideLoading(); //隐藏load
//				if(data.code == 0) {
//					if(data.data.code) {
//						$('#id').val(data.data.code)
//					}
//					if(data.data.name) {
//						$('#name').val(data.data.name)
//					}
//				} else {
//					errLay(data.msg)
//				}
//			},
//			error: function(request, textStatus, errorThrown) {
//				hideLoading(); //隐藏load	
//				errLay(request.responseJSON.msg);
//			}
//		});
//	})

	//=-=========显示。是否必填==========
	function content(mycontent) {

		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {

			if(mycontent.smProductApplycontents[i].label == "spoName") { //配偶姓名
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#name').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#name').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "spoConNum") { //联系电话
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#tel').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#tel').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "spoCerType") { //证件类型
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#type').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#type').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "spoCerNum") { //证件号码
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#id').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#id').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "spoBirth") { //出生日期
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#date').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#date').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "spoWorkName") { //单位名称
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#cName').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#cName').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "spoPosition") { //职务
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#position').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#position').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "spoWorkAddr") { //单位地址
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#cAddress').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#cAddress').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "spoWorkPhone") { //单位电话
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

					if(content.isGtcz == 1) {
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

})