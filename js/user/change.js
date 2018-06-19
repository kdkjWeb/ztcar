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
			console.log("大花洒管会")
			getCodeByOld()
		}
		$(".test-old").on("click",function(){
			let Ocode= $("#oCode").val();
			if(isCode(Ocode,'')==false){
				errLay()
			}else{
				errLay("验证成功！请进行下一步")
			}
		})
	})
	$("#getNew").on("click",function(){
		newPhone = $("#new").val();
		if(isPhone(newPhone,'') != false){
			console.log("结婚登记还是")
			getCodeByNew()
		}
		$(".test-new").on("click",function(){
			let Ncode= $("#nCode").val();
			if(isCode(Ncode,'')==false){
				errLay()
			}else{
				errLay("验证成功！请重新登录");
				// window.location.href="login.html"
			}
		})
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
	var data = {phone:newPhone}
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