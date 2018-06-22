//var path = "http://192.168.20.128:8080";
      var path="http://114.116.25.220:8081";

//var token=localStorage.getItem('token');
//var token =  GetRequest()
//
//
//if(GetRequest().token == undefined || GetRequest().token =='undefined'){
//	token = localStorage.getItem('token');
//}else{
//	token = GetRequest().token;
//	localStorage.token = token;
//}

(function(doc, win) {
	var docEl = doc.documentElement;
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

	recalc = function() {
		var clientWidth = docEl.clientWidth;

		if(!clientWidth) return;
		if(clientWidth >= 750) {
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		} else {
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		}
	};

	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//==========ios兼容readonly=====
$('input[readonly]').on('focus', function () {
    $(this).trigger('blur');
});

//=======弹框=====使用时传入 tit标题 和msg 提示信息两个====使用方法：errAlert('登陆提醒','登陆错误')==
function errAlert(tit, msg) {
	let text = '<div id="errBox">'+
			'<div class="mask"></div>'+
			'<div class="box1">'+
				'<p class="warn">' + tit + '</p>'+
				'<p class="wrong">' + msg + '</p>'+
				'<input type="button" value="返回" id="colseErr"/>'+
			'</div>'+
		'</div>';
		
	$('body').append(text);
	$('#errBox').fadeIn('500');
};

$(document).on('click', '#colseErr', function() {
	$('#errBox').remove();
})
//====提示====
function errLay(msg){
	let text = '<div id="errLay" class="errLay"><span>'+msg+'</span></div>';
	$('body').append(text);
	$('#errLay').fadeIn('8000');
	
	var set = setTimeout(function(){
		$('#errLay').fadeOut('8000');
		var setRemove = setTimeout(function(){$('#errLay').remove()},800);
	},1200);
}


function cue(tit,msg){
	let text=` <div class="pop-box" id="errBox">
		<div class="mask"></div>
		<div class="box1">
			<p class="warn">`+tit+`</p>
			<p class="wrong">`+msg+`</p>
			<div class="btn-box">
				<a href="javascript:;" class="weui-btn weui-btn_primary" id="no">取消</a> 
				<a href="javascript:;" class="weui-btn weui-btn_primary" id="yes">确定</a>  
			</div>
		</div>
	</div>`
	$('body').append(text);
	$('#errBox').fadeIn('500');
}


//=========== 带参跳转=====
function jumpSet(src, isNumber) {
	window.location.href = src + "?isNumber=" + isNumber;
};
//======两个参数跳转
function jumptwo(src, isNumber, isId) {
	window.location.href = src + "?isNumber=" + isNumber + "&isFId=" + isId;
};

//=========//拆分URL========使用方法 如  :GetRequest().isNumber

function GetRequest() {
	var url = decodeURI(window.location.search); //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substring(url.indexOf("?") + 1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
		}
	}
	return theRequest;
}

//=======//时间转换=========
function getDays(times) {
	var d = new Date(times);
	return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
};

function getdianDay(times) {
	var d = new Date(times);
	return d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate();
};

function getDate(times) {
	var d = new Date(times);
	return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
};

//=====正则验证===========
function isPhone(phone,msg) { //手机号
	let regex = /^1[3|4|5|6|8|7|9][0-9]\d{4,8}$/;
	if(phone == '') {
		errLay('手机号不能为空');
		return false;
	} else if(!regex.test(phone)) {
		errLay('请填写'+msg+'正确的手机号');
		return false;
	} else {
		return true;
	}
}

function isName(name, msg) { //姓名
	let regex = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
	if(name == '') {
		errLay('姓名不能为空');
		return false;
	} else if(!regex.test(name)) {
		errLay('请填写' + msg + '正确的姓名');
		return false;
	} else {
		return true;
	}
}

function isDisName(disName){  //经销商代码
	let regex = /^[A-Z]d{7}$/;
	
	if(disName == '') {
		errLay('经销商代码不能为空');
		return false;
	}
//	else if(!regex.test(disName)) {
//		errLay('请填写正确的经销商代码');
//		return false;
//	}
	else {
		return true;
	}

}

function isDate(date,msg){//出生日期
	let regex= /^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/
	if(date==""){
		errLay('出生日期不能为空');
		return false
	}else if(!regex.test(date)){
		errLay("请填写"+msg+"正确的出生日期");
		return false
	}
	else{
		return true
	}
}

function isId(id, msg) { //身份证
	let regex = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
	if(id == '') {
		errLay("身份证号不能为空");
		return false;
	} else if(!regex.test(id)) {
		errLay("请填写"+msg+"正确的身份证号");
		return false;
	} else {
		return true;
	}
}

function isCode(code) { //短信验证码
	let regex = /^\d{4}$/;
	if(code == '') {
		errLay("验证码不能为空");
		return false;
	} else if(!regex.test(code)) {
		errLay("请填写正确的验证码");
		return false;
	} else {
		return true;
	}
}

function isBank(carId) { //银行卡验证
	let regex = /^([1-9]{1})(\d{14}|\d{18})$/;
	if(carId == '') {
		return true;
	} else if(!regex.test(carId)) {
		errLay("请填写正确的银行卡");
		return false;
	} else {
		return true;
	}
}


function isPsd(word){
	if(word == ''){
		errLay("密码不能为空");
		return false;
	}else{
		return true;
	}
}



//=======获取出生日期=====
function getBirthday(idCard){
	 let birthday = "";  
        if(idCard != null && idCard != ""){  
            if(idCard.length == 15){  
                birthday = "19"+idCard.substr(6,6);  
            } else if(idCard.length == 18){  
                birthday = idCard.substr(6,8);  
            }  
            birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");  
        }  
          
    return birthday;  
}

//=======获取性别=========
function getSex(idCard){
	let sex ='';
	if (parseInt(idCard.substr(16, 1)) % 2 == 1) { 
		sex  = '男';
	} else {
		sex  = '女';
	} 
	
	return sex;
}
