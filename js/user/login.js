var phone;
var num = 60;
var number;
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

$(function() {

	// 验证码倒计时
	$(document).on('click', '#getCode', function() {
		if($(this).attr('disabled') != undefined) {

		} else {
			phone = $(".phone").val();
			if(isPhone(phone, '用户') == false) {
				return false
			} else {
				getcode(phone);
			}
		}
	})
	// 点击获取按钮，判断手机号是否正确
	$("#btn").click(function() {
		phone = $(".phone").val()
		number = $(".identifying").val();
		// 点击获取按钮，判断验证码是否正确
		if(isCode(number) == false) {
			return false
		} else {
			var data = {
				phone: phone,
				verifiyCode: number
			}
			$.ajax({
				url: path + "/login/phoneLogin",
				data: JSON.stringify(data),
				contentType: 'application/json',
				dataType: "json",
				type: "post",
				success: function(data) {
					console.log("登录数据", data);
					if(data.code == 0 || data.code == 200) {
						sessionStorage.setItem('userName', data.data.userName); //用户名
						sessionStorage.setItem('userPhone', data.data.phone); //手机号
						window.location.href = "userMenu.html"

					} else {
						errLay('登录失败，请稍后重试')
					}
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					console.log(xhr);
					console.log(type);
				}
			})

		}
	})

})

function getcode(phone) {
	var data = {
		phone: phone
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
				$('.num').attr("disabled", true);
				timer();
			} else {
				errLay(data.msg)
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
		}
	});
}