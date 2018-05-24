//var path = ""
//
//var token=localStorage.getItem('token');
//var token =  GetRequest()
//
////var token = '123456'
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

//=======弹框=====使用时传入 tit标题 和msg 提示信息两个====使用方法：errAlert('登陆提醒','登陆错误')==
function errAlert(tit, msg) {
	let text = '<div id="errBox">\
			<div class="mask"></div>\
			<div class="box1">\
				<p class="warn">' + tit + '</p>\
				<p class="wrong">' + msg + '</p>\
				<input type="button" value="返回" id="colseErr"/>\
			</div>\
		</div>';
	$('body').append(text);
	$('#errBox').fadeIn('500');
};
$(document).on('click', '#colseErr', function() {
	$('#errBox').remove();
})

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
function isPhone(phone) { //手机号
	let regex = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
	if(phone == '') {
		errAlert('提醒', '请填写手机号');
		return false;
	} else if(!regex.test(phone)) {
		errAlert('提醒', '请填写正确的手机号');
		return false;
	} else {
		return true;
	}
}

function isName(name, msg) { //姓名
	let regex = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
	if(name == '') {
		errAlert('提醒', '请填写' + msg + '姓名');
		return false;
	} else if(!regex.test(name)) {
		errAlert('提醒', '请填写正确的' + msg + '姓名');
		return false;
	} else {
		return true;
	}
}

function isId(id, msg) { //身份证
	let regex = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
	if(id == '') {
		errAlert('提醒', '请填写' + msg + '身份证号');
		return false;
	} else if(!regex.test(id)) {
		errAlert('提醒', '请填写正确的' + msg + '身份证号');
		return false;
	} else {
		return true;
	}
}

function isCode(code) { //短信验证码
	let regex = /^\d{6}$/;
	if(code == '') {
		errAlert('提醒', '请填写验证码');
		return false;
	} else if(!regex.test(code)) {
		errAlert('提醒', '请填写正确的验证码');
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
		errAlert('提醒', '请填写正确的银行卡');
		return false;
	} else {
		return true;
	}
}