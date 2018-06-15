var oldPhone;
var newPhone;
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
}

$(function(){
	$("#getOld").on("click",function(){
		oldPhone = $("#old").val();
		if(isPhone(oldPhone,'') != false){
			getCodeByOld()
		}
	})
	$("#getNew").on("click",function(){
		newPhone = $("#new").val();
		if(isPhone(newPhone,'') != false){
			getCodeByNew()
		}
	})
})
// 获取旧手机号验证码
function getCodeByOld(){
	var data={phone:oldPhone}
	$.ajax({
		url:path+"",
		data:JSON.stringify(data),
		contentType:"application/json",
		dataType: "json",
		type: "post",
		success:function(data){

		},
		error:function(xhr, type, errorThrown){
			console.log(xhr);
			console.log(type)
		}
	})
}
// 获取新手机号验证码
function getCodeByNew(phone) {
	var data = {phone:oldPhone}
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