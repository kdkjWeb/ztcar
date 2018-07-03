$(function() {
	var sessionPhone = sessionStorage.getItem('userPhone');
	var oldPhone;
	var newPhone;
	var newCode;
	
	
	var num = 60;
	// 验证码倒计时
	var timer = function() {
		var time = setInterval(
			function() {
				if(num == 0) {
					$('.num').removeAttr("disabled");
					clearInterval(time);
					num = 60;
					$('.num').text('获取验证码');
				} else {
					num--;
					$('.num').text(num + 'S');
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
				console.log(data)
				if(data.code == 0 || data.code == 200) {
					console.log('请求成功')
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
				//			console.log(data)

				//			window.history.back();location.reload();

			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
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
				
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		})
	};
	
})