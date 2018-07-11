$(function() {
	$("#btn").on("click", function() {
		var userName = $("#username").val();
		var userPassword = $("#password").val();

		if(isDisName(userName) == false) {
			return false;
		}
		if(isPsd(userPassword) == false){
			return false;
		}
			console.log(userName)
			var data = {
				userAccount: userName,
				password:userPassword
			};
			$.ajax({
				url: path + "/login/dealerLogin",
				data: JSON.stringify(data),
				xhrFields:{
		            withCredentials: true
		        },
				dataType: "json",
				contentType: "application/json",
				type: "post",
				success: function(data) {
					console.log(data);
					
					if(data.code==0){  //登录成功
						window.location.href = 'distributorMenu.html'
					}else{
						errLay(data.msg);
					}
					
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					console.log(xhr);
					console.log(type);
				}
			});


	})
})