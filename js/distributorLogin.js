$(function() {

	$("#btn").on("click", function() {
		var userName = $("#username").val();
		var userPassword = $("#password").val();

		if(isDisName(userName) != false) {
			console.log(userName)
			var data = {
				userAccount: userName,
				password:userPassword
			};
			$.ajax({
				url: path + "/login/accountlogin",
				data: JSON.stringify(data),
				dataType: "json",
				contentType: "application/json",
				type: "post",
				success: function(data) {
					console.log(data);
					
					if(data.code==0){  //登录成功
						window.location.href = 'disFeedBack.html'
					}
					
				},
				error: function(xhr, type, errorThrown) {
					//异常处理；
					console.log(xhr);
					console.log(type);
				}
			});

		}
	})
})