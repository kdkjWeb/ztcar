

    $(function(){
        var phone;
        var number;
        var num = 60;
        // 验证码倒计时
        $(document).on('click','.num',function(){
            if($(this).attr('disabled') != undefined){

            }else{
                $('.num').attr("disabled",true);
                timer();
            }
           
        })

        var timer = function(){
        var time = setInterval(
            function(){
                if(num == 0){
                    $('.num').removeAttr("disabled");
                    clearInterval(time);
                    num = 60;
                    $('.num').text('获取验证码');
                }else{
                    num -- ;
                    $('.num').text( num +'S');
                }
                
              

            },1000
        )
       }
        // 点击获取按钮，判断手机号是否正确

        $(".get").click(function(){
            phone=$(".phone").val()
            if(isPhone(phone)==false){
                return false
            }else{
                getcode(phone);
            }
        })
   
        $("#btn").click(function(){
            number=$(".identifying").val();
        // 若未填写电话号码和验证码，弹出提示
            
            if(isPhone(phone)=="" && isCode(number)==""){
                return false;
            }
        // 点击获取按钮，判断验证码是否正确
            else if(isCode(number)==false){

                return false
            }else{
                $.ajax({
                    url:path+"/login/phoneLogin",
                    header:{
                        'token':token
                    },
                    data:{
                        phone: phone,
                        verifiyCode:number
                    },
                    dataType:"json",
                    type:"post",
                    success:function(data){
                        console.log("登录数据",data)
                    },	error: function(xhr, type, errorThrown) {
                        //异常处理；
                        console.log(xhr);
                        console.log(type);
                    }
                })
                $(".scs-pop-box").show()
                console.log('33')
                return true
            }
        })

        // 若验证码错误或为空，弹出提示框，点击返回按钮，并清除用户所输入的验证码
       
        $("#yes").on("click",function(){
            window.location.href="applyChoice.html"
        })
        $("#no").on("click",function(){
            window.location.href="personal.html"
        })

    })
    function getcode(phone) {
	$.ajax({
		url: path + "/login/sendVerifiyCode",
		data: {
			phone:phone
		},
		dataType: "json",
		type: "post",
		success: function(data) {
			console.log(data)
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
		}
	});
}