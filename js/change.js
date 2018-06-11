var phone;
var number;
var num = 60;

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
}

$(function() {

	// 验证码倒计时
	$(document).on('click', '.num', function() {
		if($(this).attr('disabled') != undefined) {

		} else {
			phone=$(".phone").val();
			getcode(phone);
		}
	})

	$("#btn").click(function() {
		phone = $(".phone").val();
		number = $(".identifying").val();
		// 若未填写电话号码和验证码，弹出提示
		// if(isPhone(phone)=="" && isCode(number)==""){
		//     return false;
		// }
		// 点击获取按钮，判断验证码是否正确
		if(isCode(number) == false) {
			return false
		} else {
			$.ajax({
				url: path + "/smUser/updateNewPhone",
				data: {
					phone: phone,
					verifiyCode: number
				},
				dataType: "json",
				type: "post",
				success: function(data) {
					if(data.code == 0 || data.code == 1) {

					} else {
						//                          window.location.href="personal.html"
					}
					console.log("登录数据", data)
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					console.log(xhr);
					console.log(type);
				}
			})
			console.log('33')
			return true
		}
	})

})

function getcode(phone) {
	var data = {phone:phone}
	$.ajax({
		url: path + "/smUser/updatePhone2Code",
		data: JSON.stringify(data),
		contentType:"application/json",
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