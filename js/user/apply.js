var Fdata = '';
var isSecondTrue = 0;
var num = 60;
var timer = function() {
	var time = setInterval(
		function() {
			if(num == 0) {
				$('#getCode').removeAttr("disabled");
				clearInterval(time);
				num = 60;
				$('#getCode').text('获取验证码');
			} else {
				num--;
				$('#getCode').text(num + 'S');
			}
		}, 1000
	)
}

// 告诉用户身份证输入正确
$('#userId').change(function() {
	var p = $('#userId').val();
	var regex = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
	if(!regex.test(p)) {
		console.log('1');
		$(".IDcard span").hide();
	} else {
		console.log('2')
		$(".IDcard span").show();
	}
})

// 上传身份证照片
$("#IDcamera").on("click", function() {
	$('#userIdbox').fadeIn(100);
})
// 上传银行卡照片
$("#Ccamera").on("click", function() {
	$('#userBankbox').fadeIn(100);
});

//上传配偶身份证
$("#mcamera").on("click", function() {
	$('#marryIdbox').fadeIn(100);
});

//上传  承租人身份证
$("#tcamera").on("click", function() {
	$('#tenantIdbox').fadeIn(100);
});

//上传担保人身份证
$("#gcamera").on("click", function() {
	$('#guaranteeIdbox').fadeIn(100);
});

$('.next').on('click', function() {
	$(this).parent('.fixBox').fadeOut(100);
})

$('#getCode').click(function() { //获取验证码
	let _that = $(this);
	let userPhone = $('#userPhone').val(); //用户电话
	if(isPhone(userPhone) == false) {
		return false;
	} else {
		if(_that.attr('disabled') != undefined) {

		} else {
			_that.attr("disabled", true);
			$('#userPhone').attr("readonly", "readonly");
			getcode(userPhone);
		}
	}

})

//=============
$('.mycheckbox').click(function() {
	if($(this).hasClass('icon-weigouxuan')) {
		$(this).removeClass('icon-weigouxuan').addClass('icon-yigouxuan');
		$(this).attr('box', 'true');
		$(this).parent().siblings('.fadeBox').fadeIn();
	} else {
		$(this).removeClass('icon-yigouxuan').addClass('icon-weigouxuan');
		$(this).attr('box', 'false');
		$(this).parent().siblings('.fadeBox').fadeOut();
	};
})

//===================上传图片

$(document).on('change', 'input[type=file]', function() {
	var files = Array.prototype.slice.call(this.files);
	var _this = $(this);
	var thisDom = $(this).attr('id')
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
			var name = fileName.substring(0,fileName.indexOf("."));
			
			var img = new Image();
			img.src = result;
			
			if (img.complete) {
	                callback();
	            } else {
	                img.onload = callback;
	            }
				function callback() {
					var data = compress(img);		
					var inputData = upload(data, file.type);		
					orcImg(inputData,name,thisDom);
					img = null;
				}
			
			_this.parents('.image-item').css("background-image", 'url(' + result + ')');
		};
		//注入图片 转换成base64
		reader.readAsDataURL(file);
	})
})

function getcode(phone) {
	var data = {
		phone: phone
	};
	$.ajax({
		url: path + "/apply/sendVitify",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: "application/json",
		type: "post",
		success: function(data) {
			if(data.code == 0) {
				timer();
			}
		},
		error: function(request, textStatus, errorThrown) {
			errLay(request.responseJSON.msg)
		}
	});
}

function getImg(name, dom) {
	var text = "#" + dom + "";
	var fDom = $(text).get(0);
	var files = Array.prototype.slice.call(fDom.files);
	if(!files.length) {
		return false
	};
	var file = files[0];
	var type = file.type;
	var accept = 'image/gif, image/jpeg, image/png, image/jpg';
	if(accept.indexOf(type) == -1) {
		errAlert('上传提醒', '请选择我们支持的图片格式')
		return false;
	}

	Fdata.append(name, file);
}

function SecondTrue(userName) {
	var text = '<div class="pop-box" id="errbox">' +
		'<div class="mask"></div>' +
		'<div class="box1">' +
		'<p class="warn">提醒</p>' +
		'<p class="wrong">' + userName + ',您是否需要办理新的借款业务,</br>如果是请点击【确定】,如否请点击【登录】</p>' +
		'<div class="btn-box">' +
		'<a href="javascript:;" class="weui-btn weui-btn_primary" id="sure">确定</a>' +
		'<a href="javascript:;" class="weui-btn weui-btn_primary" id="login">登录</a>' +
		'</div>' +
		'</div>' +
		'</div>';

	$('body').append(text);
	$('#errbox').fadeIn('500');
}

//点击下一步提交

$(document).on('click', '#btn', function() {
	suerAjax();
})

$(document).on('click', '#sure', function() {
	$('#errbox').remove();
	suerAjax();
})

$(document).on('click', '#login', function() {
	window.location.href = 'login.html';
})

function suerAjax() {
	Fdata = new FormData();

	var carProperty = JSON.parse(localStorage.getItem('carProperty')); //新车

	var dealersId = JSON.parse(localStorage.getItem('dealersId')); //经销商id

	var loanId = JSON.parse(localStorage.getItem('loanId'));
	var loanType = JSON.parse(localStorage.getItem('loanType'));

	var userName = $('#userName').val(); //用户姓名
	var userId = $('#userId').val(); //用户身份证
	var userBank = $('#userBank').val(); //用户银行卡
	var userPhone = $('#userPhone').val(); //用户电话
	var userCode = $('#userCode').val(); //验证码

	var marryName = $('#marryName').val(); //配偶姓名
	var marryId = $('#marryId').val(); //配偶 身份证
	var marryPhone = $('#marryPhone').val(); //配偶电话

	var tenantName = $('#tenantName').val(); //承租人姓名  
	var tenantId = $('#tenantId').val(); //承租人姓名
	var tenantPhone = $('#tenantPhone').val(); // 承租人电话

	var guaranteeName = $('#guaranteeName').val(); //担保人姓名
	var guaranteeId = $('#guaranteeId').val(); //担保人身份证
	var guaranteePhone = $('#guaranteePhone').val() //担保人电话

	var myisMarryed = 0; //是否有配偶欧
	var myhaveLessee = 0; //是否有承租人
	var myhaveGuarantee = 0; //是否有担保人


	if(isName(userName, '借款人') == false) { //判断用户姓名
		return false;
	} else if(isId(userId, '借款人') == false) { //判断用户身份证
		return false;
	} else if(isBank(userBank) == false) { //银行卡（可以为空）
		return false;
	} else if(isPhone(userPhone, '借款人') == false) { //电话
		return false;
	} else if(isCode(userCode) == false) { //验证码
		return false;
	}

	if($('#marry').attr('box') == 'true') { //如果勾选配偶
		myisMarryed = 1; //是否有配偶欧
		if(isName(marryName, '配偶') == false) { //配偶姓名
			return false;
		} else if(isId(marryId, '配偶') == false) { //配偶 身份证
			return false;
		} else if(isPhone(marryPhone, '配偶') == false) {
			return false;
		}
	}

	if($('#tenant').attr('box') == 'true') { //如果勾选承租人
		myhaveLessee = 1; //是否有承租人
		if(isName(tenantName, '承租人') == false) { //承租人姓名
			return false;
		} else if(isId(tenantId, '承租人') == false) { //承租人姓名
			return false;
		} else if(isPhone(tenantPhone, '承租人') == false) {
			return false;
		}
	}

	if($('#guarantee').attr('box') == 'true') { //如果勾选担保人
		myhaveGuarantee = 1; //是否有担保人
		if(isName(guaranteeName, '担保人') == false) { //担保人姓名
			return false;
		} else if(isId(guaranteeId, '担保人') == false) { //担保人身份证
			return false;
		} else if(isPhone(guaranteePhone, '担保人') == false) {
			return false;
		}
	}

	if($('#agreen').attr('box') != 'true') {
		errLay('请阅读征信授权书');
		return false;
	} else {
		showCredit(); //显示loading

		
		//getImg('dd','c');   //银行卡 a
		//getImg('dd','d');   //银行卡b
		getImg('identa', 'a'); //用户身份证a
		getImg('spouseidenta', 'e'); // 配偶 a
		getImg('lesseeidenta', 'g'); //承租人 a
		getImg('guaranteeidenta', 'i'); //担保人 a

		Fdata.append('isSecondTrue', isSecondTrue);

		Fdata.append('carProperty', carProperty);
		Fdata.append('dealersId', dealersId);

		Fdata.append('loanId', loanId);
		Fdata.append('loanType', loanType);

		Fdata.append('name', userName);
		Fdata.append('idNum', userId);
		Fdata.append('code', userCode);
		Fdata.append('payCardNum', userBank);
		Fdata.append('reservedPhone', userPhone);

		Fdata.append('haveLessee', myhaveLessee);
		Fdata.append('lessee', tenantName);
		Fdata.append('lesseeIdNum', tenantId);
		Fdata.append('lesseePhone', tenantPhone);

		Fdata.append('isMarryed', myisMarryed);
		Fdata.append('spouse', marryName);
		Fdata.append('spouseIdNum', marryId);
		Fdata.append('spousePhone', marryPhone);

		Fdata.append('haveGuarantee', myhaveGuarantee);
		Fdata.append('guarantee', guaranteeName);
		Fdata.append('guaranteeIdNum', guaranteeId);
		Fdata.append('guaranteePhone', guaranteePhone);

		$.ajax({
			url: path + "/apply/addApply",
			data: Fdata,
			timeout: 600000, //超时时间设置，单位毫秒,10分钟
			dataType: "json",
			contentType: "application/json",
			type: "post",
			processData: false,
			contentType: false,
			success: function(data) {
				if(data.code == 0) {
					errLay(data.msg);
					var time = setTimeout(function() {
						window.location.href = 'detail.html?applyId=' + data.applyId;
					}, 500);
				} else if(data.code == 1) {
					isSecondTrue = 1;
					SecondTrue(userName);
					hideLoading(); //隐藏load
				} else {
					if(data.msg.indexOf('refID') > -1) {
						var myMsg = data.msg.substring(0, data.msg.indexOf('refID') - 2);
						errLay(myMsg);
					} else {
						errLay(data.msg);
					}
					hideLoading(); //隐藏load
				}
			},
			error: function(request, textStatus, errorThrown) {
				if(request.responseJSON.msg.indexOf('refID') > -1) {
					var myMsg = request.responseJSON.msg.substring(0,request.responseJSON.msg.indexOf('refID') - 2);
					errLay(myMsg);
				} else {
					errLay(request.responseJSON.msg);
				}
				hideLoading(); //隐藏load	
			}
		});
	}
}

function orcImg(myFile,name,thisDom) { //身份证ocr接口
	var Fdata = new FormData();
	Fdata.append('file', myFile,name+'.jpg');
	if(thisDom != 'c'){
		Fdata.append('ocrCode', 0);
	}else{
		Fdata.append('ocrCode', 3);
	}
	
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
				if(thisDom == 'a') { //主借贷人
					if(data.data.code) {
						$('#userId').val(data.data.code)
					}
					if(data.data.name) {
						$('#userName').val(data.data.name)
					}
				}else if(thisDom == 'c'){
					var num = data.data.bank_card_number.replace(/\s+/g,"");
					$('#userBank').val(num);
				}
				else if(thisDom == 'e') { //配偶
					if(data.data.code) {
						$('#marryId').val(data.data.code)
					}
					if(data.data.name) {
						$('#marryName').val(data.data.name)
					}
				} else if(thisDom == 'g') { //承租人
					if(data.data.code) {
						$('#tenantId').val(data.data.code)
					}
					if(data.data.name) {
						$('#tenantName').val(data.data.name)
					}
				} else if(thisDom == 'i') { //担保人
					if(data.data.code) {
						$('#guaranteeId').val(data.data.code)
					}
					if(data.data.name) {
						$('#guaranteeName').val(data.data.name)
					}
				}
				$('.fixBox').fadeOut(100);
			} else {
				errLay(data.msg);
				$('.fixBox').fadeOut(100);
			}
		},
		error: function(request, textStatus, errorThrown) {
			hideLoading(); //隐藏load	
			errLay(request.responseJSON.msg)
		}
	});
}