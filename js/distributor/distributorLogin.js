$(function() {
	var showName = localStorage.getItem('distributorName'); //用户名
	var showPsd = localStorage.getItem('distributorPassword'); //密码

	if(showName) {
		$('#username').val(showName);
		$('#password').val(showPsd);
	}

	$("#btn").on("click", function() {
		var userName = $("#username").val();
		var userPassword = $("#password").val();

		if(isDisName(userName) == false) {
			return false;
		}
		if(isPsd(userPassword) == false) {
			return false;
		}
		var data = {
			userAccount: userName,
			password: userPassword
		};
		$.ajax({
			url: path + "/login/dealerLogin",
			data: JSON.stringify(data),
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			beforeSend: function() {
				showLoading();//显示loading	
			},
			success: function(data) {
				hideLoading();  //隐藏load	
				if(data.code == 0) { //登录成功
					if($('#savePsd').is(':checked')) {
						localStorage.setItem('distributorName', userName); //用户名			
						localStorage.setItem('distributorPassword', userPassword); //密码		
					}
					window.location.href = 'distributorMenu.html'
				} else {
					errLay(data.msg);
				}

			},error:function(request, textStatus, errorThrown){
				hideLoading();  //隐藏load	
				errLay(request.responseJSON.msg)
			}
		});

	})
})