$(function() {
	var sessionPhone = sessionStorage.getItem('userPhone');
	var oldPhone;
	var newPhone;
	var newCode;
	
	
	var oldNum = 60;
	var newNUm = 60;
	
	// 验证码倒计时
	var oldtimer = function() {
		var time = setInterval(
			function() {
				if(oldNum == 0) {
					$('#getOld').removeAttr("disabled");
					clearInterval(time);
					oldNum = 60;
					$('#getOld').text('获取验证码');
				} else {
					oldNum--;
					$('#getOld').text(oldNum + 'S');
				}
			}, 1000
		)
	};

	var newtimer = function() {
		var time = setInterval(
			function() {
				if(newNUm == 0) {
					$('#getNew').removeAttr("disabled");
					clearInterval(time);
					newNUm = 60;
					$('#getNew').text('获取验证码');
				} else {
					newNUm--;
					$('#getNew').text(newNUm + 'S');
				}
			}, 1000
		)
	};


	$("#getOld").on("click", function() {
		oldPhone = $("#old").val();
		
		if(isPhone(oldPhone, '') != false) {
			if(oldPhone == sessionPhone) {
				getCodeByOld()
			} else {
				errLay('请输入正确的原手机号')
			}

		}
	});
	
	
	$("#getNew").on("click", function() {
		newPhone = $("#new").val();
		newCode = $("#nCode").val();
		
		if(isPhone(newPhone, '') != false) {
			getCodeByNew()	
		}
		
	});
	
	
	// 获取旧手机号验证码
	function getCodeByOld() {
		var data = {
			phone: oldPhone
		};
		$.ajax({
			url: path + "/login/loginSendVerifyCode",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				
				if(data.code == 0 || data.code == 200) {
					oldtimer();
				} else {
					errLay('获取验证码失败')
				}
			}
		})
	};

	// 获取新手机号验证码
	function getCodeByNew() {
		var data = {
			phone: newPhone
		}
		$.ajax({
			url: path + "/smUser/updatePhone2Code",
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: "json",
			type: "post",
			success: function(data) {
				if(data.code == 0 || data.code == 200) {
					newtimer();
				} else {
					errLay('获取验证码失败')
				}
			}
		})
	};
	
	$('#save').click(function(){
		newPhone = $("#new").val();
		newCode = $("#nCode").val();
		
		if(isPhone(newPhone, '') != false) {
			if(isCode(newCode) != false){
				saveNewphone()
			}
			
		}
	})
	
	function saveNewphone(){
		var data = {
			phone: newPhone,
			verifiyCode:newCode
		}
		$.ajax({
			url: path + "/smUser/updateNewPhone",
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: "json",
			type: "post",
			success: function(data) {
				if(data.data == 0){
					errLay('修改成功')
				} else {
					errLay('获取验证码失败')
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		})
	};
	
})