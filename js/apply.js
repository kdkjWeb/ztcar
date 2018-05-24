$(function() {
	//点击下一步提交
	$('#btn').click(function() {
		let userName = $('#userName').val(); //用户姓名
		let userId = $('#userId').val(); //用户身份证
		let userBank = $('#userBank').val(); //用户银行卡
		let userPhone = $('#userPhone').val(); //用户电话
		let userCode = $('#userCode').val(); //验证码

		let marryName = $('#marryName').val(); //配偶姓名
		let marryId = $('#marryId').val(); //配偶 身份证

		let tenantName = $('#tenantName').val(); //承租人姓名  
		let tenantId = $('#tenantId').val(); //承租人姓名

		let guaranteeName = $('#guaranteeName').val(); //担保人姓名
		let guaranteeId = $('#guaranteeId').val(); //担保人身份证

		if(isName(userName, '借款人') == false) { //判断用户姓名
			return false;
		} else if(isId(userId, '借款人') == false) { //判断用户身份证
			return false;
		} else if(isBank(userBank) == false) { //银行卡（可以为空）
			return false;
		} else if(isPhone(userPhone) == false) { //电话
			return false;
		} else if(isCode(userCode) == false) { //验证码
			return false;
		}
		if($('#marry').attr('box') == 'true') { //如果勾选配偶
			if(isName(marryName, '配偶') == false) { //配偶姓名
				return false;
			} else if(isId(marryId, '配偶') == false) { //配偶 身份证
				return false;
			}
		}
		if($('#tenant').attr('box') == 'true') { //如果勾选承租人
			if(isName(tenantName, '承租人') == false) { //承租人姓名
				return false;
			} else if(isId(tenantId, '承租人') == false) { //承租人姓名
				return false;
			}
		}
		if($('#guarantee').attr('box') == 'true') { //如果勾选担保人
			if(isName(guaranteeName, '担保人') == false) { //担保人姓名
				return false;
			} else if(isId(guaranteeId, '担保人') == false) { //担保人身份证
				return false;
			}
		}
		if($('#agreen').attr('box') != 'true') {
			errAlert('提醒', '请阅读征信授权书');
		} else {
			console.log('跳转注册')
		}
	})

	// 告诉用户身份证输入正确
	$('.IDcard .ipt').blur(function() {
		let p = $('.IDcard .ipt').val();
		if(!(/^[1-9]\d{5}[1-2]\d{3}[0-1]\d{1}[0-2]\d{1}\d{3}[0-9Xx]$/.test(p))) {

		} else {
			$(".IDcard span").show()
		}
	})
	// 上传身份证照片
	$("#IDcamera").on("click", function() {
		window.location.href = "upidcar.html"
	})
	// 上传银行卡照片
	$("#Ccamera").on("click", function() {
		window.location.href = "addback.html"
	})

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

$(document).on('change', 'input', function() {
	var files = Array.prototype.slice.call(this.files);
	var _this = $(this)
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

	alert(files[0].size)

})
