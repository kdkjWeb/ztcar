$(function() {

	//点击下一步提交
	$('#btn').click(function() {
		let name = $('.name .ipt').val();
		let IDcard = $('.IDcard .ipt').val();
		let card = $('.card .ipt').val();
		let phone = $('.phone .ipt1').val();
		let msg = $('.msg .ipt').val();
		if($('.name .ipt').val()==""&&$('.IDcard .ipt').val()==""&&$('.phone .ipt').val()==""&&$('.msg .ipt').val()==""){
			$('.name-pop-box').css('display', 'block');
			$('.wrong').text('您还未填写信息，请先填写');
			$("#btn1").on('click', function() {
				$('.name-pop-box').css('display', 'none');
			})
			return false;
		}else if(!$('.name .ipt').val() || !name) {
			$('.name-pop-box').css('display', 'block');
			$('.wrong').text('您填写的经销商代码不正确，请重新填写！');
			$("#btn1").on('click', function() {
				$('.name-pop-box').css('display', 'none');
				$('.name .ipt').val('');
			})
			return false;
		} 
		// else if($('.IDcard .ipt').val() != $('.name .ipt').val()) {
		// 	$('.name-pop-box').css('display', 'block');
		// 	$('.wrong').text('您填写的身份证号码与姓名不匹配，请重新填写！');
		// 	$("#btn1").on('click', function() {
		// 		$('.name-pop-box').css('display', 'none');
		// 		$('.IDcard .ipt').val('');
		// 	});
		// 	return false;
		// }
		 else if(!(/^[1-9]\d{5}[1-2]\d{3}[0-1]\d{1}[0-2]\d{1}\d{3}[0-9Xx]$/.test(IDcard))) {
			console.log("身份证", IDcard);
			$('.name-pop-box').css('display', 'block');
			$('.wrong').text('您填写的身份证号码无效，请重新填写！');
			$("#btn1").on('click', function() {
				$('.name-pop-box').css('display', 'none');
				$('.IDcard .ipt').val('');
			})
			return false;
		} 
		else if(!(/^[1-9]\d{18}$/.test(card))) {
			$('.name-pop-box').css('display', 'block');
			$('.wrong').text("您填写的银行卡号不正确，请重新填写！");
			$("#btn1").on('click', function() {
				$('.name-pop-box').css('display', 'none');
				$('.card .ipt').val('');
			})
			return false;
		} 
		// else if(!(/^1[34578]\d{9}$/.test(phone)) || !phone) {
		// 	$('.name-pop-box').css('display', 'block');
		// 	$('.wrong').text("您填写的银行预留号码不正确，请重新填写！");
		// 	$("#btn1").on('click', function() {
		// 		$('.name-pop-box').css('display', 'none');
		// 		$('.phone .ipt').val('');
		// 	})
		// 	return false;
		// }
		 else if(!(/^\d{6}$/)) {
			$('.name-pop-box').css('display', 'block');
			$('.wrong').text("您填写的短信验证码不正确，请重新填写！");
			$("#btn1").on('click', function() {
				$('.name-pop-box').css('display', 'none');
				$('.msg .ipt').val('');
			})
			return false;
		} else if($('#agreen').attr('box') == undefined || $('#agreen').attr('box') =='false'){
				alert('请阅读条款')
				
		}
		 else {
			window.location.href="detail.html"
			return true
		}
	})
// 告诉用户身份证输入正确
	$('.IDcard .ipt').blur(function() {
		let p = $('.IDcard .ipt').val();
		if(!(/^[1-9]\d{5}[1-2]\d{3}[0-1]\d{1}[0-2]\d{1}\d{3}[0-9Xx]$/.test(p))) {

		} else {
			$(".IDcard span").show()
		}
	})
	// 上传身份证照片
	$("#IDcamera").on("click",function(){
		window.location.href="upidcar.html"
	})
	// 上传银行卡照片
	$("#Ccamera").on("click",function(){
		window.location.href="addback.html"
		
	})
	// 已婚
	$("#icon").on("click",function(){
	var t =	$(this).attr('box');
			console.log(t)
		if(t == undefined || t == 'false'){
			$(".marry-box").fadeOut();
		}else{	
			$(".marry-box").fadeIn();

		}
	})
	$("#icon-1").on("click",function(){
	var t =	$(this).attr('box');
			console.log(t)
		if(t == undefined || t == 'false'){
			$(".tenant-box").fadeOut();
		}else{	
			$(".tenant-box").fadeIn();

		}
	})
	$("#icon-2").on("click",function(){
	var t =	$(this).attr('box');
			console.log(t)
		if(t == undefined || t == 'false'){
			$(".guarantee-box").fadeOut();
		}else{	
			$(".guarantee-box").fadeIn();

		}
	})
	// 同意后才能登陆
	// $("#agreen").on("click",function(){
	// 	var n=$(this).attr("box")
	// 	console.log(n)
	// 	if(n==undefined||n=="false"){
	// 		$("#btn").css("isdisabled","false")
	// 	}else{
	// 		$("#btn").css("isdisabled","true")
	// 	}
	// })
})



//=============
$('.mycheckbox').click(function(){
	if($(this).hasClass('icon-weigouxuan')){
		$(this).removeClass('icon-weigouxuan').addClass('icon-yigouxuan');
		$(this).attr('box','true');
	}else{
		$(this).removeClass('icon-yigouxuan').addClass('icon-weigouxuan');
		$(this).attr('box','false');
	};
})
