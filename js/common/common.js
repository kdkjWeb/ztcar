//var path = "https://www.catialol.cn/zzbjr"; //正式

var path = "https://rydit.rydit.com.cn/zzbjr"; //测试

//var path = "http://192.168.0.137:8088"; //唐彬

//var path = "http://192.168.0.194:8088"; //张韩

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
//========================

//==========ios兼容readonly=====
$('input[readonly]').on('focus', function() {
	$(this).trigger('blur');
});

//=========限制数字类型的输入框只能输入数字===========
$('input[number]').on('onkeyup', function() {
	onlyNumber();
});

$('input[tel]').on('onkeyup', function() {
	onlyNumber();
});

function onlyNumber() { //限制只能输入数字
	if(!(event.keyCode == 46) && !(event.keyCode == 8) && !(event.keyCode == 37) && !(event.keyCode == 39))
		if(!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
			event.returnValue = false;
};

//=======弹框=====使用时传入 tit标题 和msg 提示信息两个====使用方法：errAlert('登陆提醒','登陆错误')==
function errAlert(tit, msg) {
	var text = '<div id="errBox">' +
		'<div class="mask"></div>' +
		'<div class="box1">' +
		'<p class="warn">' + tit + '</p>' +
		'<p class="wrong">' + msg + '</p>' +
		'<input type="button" value="返回" id="colseErr"/>' +
		'</div>' +
		'</div>';

	$('body').append(text);
	$('#errBox').fadeIn('500');
};

$(document).on('click', '#colseErr', function() {
	$('#errBox').remove();
})
//====提示====
function errLay(msg) {
	if(!$('#errLay').exist()) {
		var text = '<div id="errLay" class="errLay"><span>' + msg + '</span></div>';
		$('body').append(text);
		$('#errLay').fadeIn('800');

		var set = setTimeout(function() {
			$('#errLay').fadeOut('35000');
			var setRemove = setTimeout(function() {
				$('#errLay').remove()
			}, 200);
		}, 3500);
	}
}

function cue(tit, msg) {
	var text = '<div class="pop-box" id="errBox">' +
		'<div class="mask"></div>' +
		'<div class="box1">' +
		'<p class="warn">' + tit + '</p>' +
		'<p class="wrong">' + msg + '</p>' +
		'<div class="btn-box">' +
		'<a href="javascript:;" class="weui-btn weui-btn_primary" id="no">取消</a>' +
		'<a href="javascript:;" class="weui-btn weui-btn_primary" id="yes">确定</a>' +
		'</div>' +
		'</div>' +
		'</div>';

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
function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}


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

function getTime(times) {
	var str = times;
	str = str.replace('-', '/');
	var date = new Date(str);
	var time = date.getTime();
	return time;
}
//=====正则验证===========
function truePhone(phone) { //手机号
	var regex = /^1[3|4|5|6|8|7|9][0-9]\d{4,8}$/;
	if(phone.length != 11){
		errLay('请填写完整的手机号');
		return false;
	}else if(!regex.test(phone)) {
		errLay('请填写正确的手机号');
		return false;
	} else {
		return true;
	}
}

function isPhone(phone, msg) { //手机号
	var regex = /^1[3|4|5|6|8|7|9][0-9]\d{4,8}$/;
	if(phone == '') {
		errLay('手机号不能为空');
		return false;
	}else if(phone.length != 11){
		errLay('请填写完整' + msg + '的手机号');
		return false;
	}else if(!regex.test(phone)) {
		errLay('请填写' + msg + '正确的手机号');
		return false;
	} else {
		return true;
	}
}

function isName(name, msg) { //姓名
	var regex = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
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

function isDisName(disName) { //经销商代码
	var regex = /^[A-Z]d{7}$/;

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

function isDate(date, msg) { //出生日期
	var regex = /^(19|20)\d{2}(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/
	if(date == "") {
		errLay('出生日期不能为空');
		return false
	} else if(!regex.test(date)) {
		errLay("请填写" + msg + "正确的出生日期");
		return false
	} else {
		return true
	}
}

function isId(id, msg) { //身份证
	var regex = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
	if(id == '') {
		errLay("身份证号不能为空");
		return false;
	} else if(!regex.test(id)) {
		errLay("请填写" + msg + "正确的身份证号");
		return false;
	} else {
		return true;
	}
}

function isCode(code) { //短信验证码
	var regex = /^\d{4}$/;
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
//	var regex = /^([1-9]{1})(\d{14}|\d{18})$/;
//	if(carId == '') {
//		return true;
//	} else if(!regex.test(carId)) {
//		errLay("请填写正确的银行卡");
//		return false;
//	} else {
//		return true;
//	}
	
	return true;
}

function isPsd(word) {
	if(word == '') {
		errLay("密码不能为空");
		return false;
	} else {
		return true;
	}
}

//=======获取出生日期=====
function getBirthday(idCard) {
	var birthday = "";
	if(idCard != null && idCard != "") {
		if(idCard.length == 15) {
			birthday = "19" + idCard.substr(6, 6);
		} else if(idCard.length == 18) {
			birthday = idCard.substr(6, 8);
		}
		birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
	}
	return birthday;
}

//=======获取性别=========
function getSex(idCard) {
	var sex = '';
	if(parseInt(idCard.substr(16, 1)) % 2 == 1) {
		sex = '男';
	} else {
		sex = '女';
	}
	return sex;
}

//============获取年龄============
function GetAge(identityCard) {
	var len = (identityCard + "").length;
	if(len == 0) {
		return 0;
	} else {
		if((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
		{
			return 0;
		}
	}
	var strBirthday = "";
	if(len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
	{
		strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
	}
	if(len == 15) {
		strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
	}
	//时间字符串里，必须是“/”
	var birthDate = new Date(strBirthday);
	var nowDateTime = new Date();
	var age = nowDateTime.getFullYear() - birthDate.getFullYear();
	//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
	if(nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}
//============获取年龄============

/**除法函数，用来得到精确的除法结果
 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 调用：accDiv(arg1,arg2)
 返回值：arg1除以arg2的精确结果**/

function accDiv(arg1, arg2) {
	var r1 = arg1.toString(),
		r2 = arg2.toString(),
		m, resultVal, d = arguments[2];
	m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
	resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
	return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(2)));
};

/**乘法终极解决方法**/
function accMul(arg1, arg2) {
	var r1 = arg1.toString(),
		r2 = arg2.toString(),
		m, resultVal, d = arguments[2];
	m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
	resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
	return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(2)));
};

/**加法运算终极解决办法**/
function accAdd(arg1, arg2) {
	arg1 = arg1.toString(), arg2 = arg2.toString();
	var arg1Arr = arg1.split("."),
		arg2Arr = arg2.split("."),
		d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
		d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
	var maxLen = Math.max(d1.length, d2.length);
	var m = Math.pow(10, maxLen);
	var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
	var d = arguments[2];
	return typeof d === "number" ? Number((result).toFixed(2)) : result;
};

/**减法终极解决方法**/
function accSub(arg1, arg2) {
	return accAdd(arg1, -Number(arg2), arguments[2]);
};

//四舍五入保留2位小数（不够位数，则用0替补）
function keepTwo(num) {
	var result = parseFloat(num);
	if(isNaN(result)) {
		//		alert('传递参数错误，请检查！');
		console.log('传递参数错误，请检查')
		return false;
	}
	result = Math.round(num * 100) / 100;
	var s_x = result.toString();
	var pos_decimal = s_x.indexOf('.');
	if(pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while(s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}

//============Loading==============

//判断这个页面内有没有这个元素
(function($) { 
	$.fn.exist = function() {  
		if($(this).length >= 1) {   
			return true;  
		}  
		return false; 
	};
})(jQuery);

function showLoading() {
	if(!$('#loading').exist()) {
		var loading = '<div class="loading" id="loading">' +
			'<div class="weui-loadmore">' +
			'<i class="weui-loading"></i>' +
			'<span class="weui-loadmore__tips">正在加载</span>' +
			'</div>' +
			'</div>';
		$('body').append(loading);
	}
}

function showCredit() {
	if(!$('#loading').exist()) {
		var loading = '<div class="loading" id="loading">' +
			'<div class="weui-loadmore">' +
			'<i class="weui-loading"></i>' +
			'<span class="weui-loadmore__tips">征信正在查询中</span>' +
			'</div>' +
			'</div>';
		$('body').append(loading);
	}
}

function hideLoading() {
	$('#loading').fadeOut('800');
	var setRemove = setTimeout(function() {
		$('#loading').remove();
	}, 100);
}
//============Loading==============

//=======拖动兼容=========
var ModalHelper = (function(bodyCls) {
	var scrollTop;
	return {
		afterOpen: function() {
			scrollTop = document.scrollingElement.scrollTop;
			document.body.classList.add(bodyCls);
			document.body.style.top = -scrollTop + 'px';
		},
		beforeClose: function() {
			document.body.classList.remove(bodyCls);
			// scrollTop lost after set position:fixed, restore it back.
			document.scrollingElement.scrollTop = scrollTop;
		}
	};
})('modal-open');
//=======拖动兼容=========

//==========输入框光标在最后一位================
$(document).on('focus', 'input', function() {
	if(typeof($(this).attr("readonly")) == "undefined") {
		var obj = $(this).get(0);
		moveEnd(obj)
	}
})

function moveEnd(obj) {
	var len = obj.value.length;
	if(document.selection) {
		var sel = obj.createTextRange();
		sel.moveStart('character', len); //设置开头的位置
		sel.collapse();
		sel.select();
	} else if(typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
		obj.selectionStart = obj.selectionEnd = len;
	}
}

//==========输入框光标在最后一位================

//=============快速排序===========
function quickSort(array, left, right) {　　
	if(left < right) {　　　　
		var x = array[right],
			i = left - 1,
			temp;　　　　
		for(var j = left; j <= right; j++) {　　　　　　
			if(array[j] <= x) {　　　　　　　　
				i++;　　　　　　　　
				temp = array[i];　　　　　　　　
				array[i] = array[j];　　　　　　　　
				array[j] = temp;　　　　　　
			}　　　　
		}　　　　
		quickSort(array, left, i - 1);　　　　
		quickSort(array, i + 1, right);　　
	}　　
	return array;
}
//=============快速排序===========

//=================为空验证============
function Verification() {
	var flag = true;
	$(".must").each(function() {
		if($(this).val() == '') {
			var msg = $(this).parents(".weui-cell").find("label").text();
			var str = msg.substr(0, msg.length - 1);
			errLay(str + '不能为空');
			flag = false;
			return false;
		}
	})
	return flag;
}

function PhoneVerification() { //手机号
	var flag = true;
	$('.truePhone').each(function() {
		var phone = $(this).val();
		if(phone) {
			if(!truePhone(phone)) {
				flag = false
				return false;
			}
		}
	})
	return flag;
}

//===================
function OrderUse(applyId,callback) {
	callback();
//	showLoading(); //显示loading	
//	var data = {
//		applyId: applyId
//	}
//	$.ajax({
//		url: path + "/apply/ajustOrderUse",
//		data: data,
//		dataType: "json",
//		contentType: "application/json",
//		type: "get",
//		xhrFields: {
//			withCredentials: true
//		},
//		success: function(data) {
//			if(data.code == 0) {
//				callback();
//			} else {
//				errLay(data.msg);
//				var goOrder = setTimeout(function() {
//					window.location.href = "myOrder.html";
//				}, 1500);
//			}
//		},
//		error: function(request, textStatus, errorThrown) {
//			hideLoading(); //隐藏load	
//			errLay(request.responseJSON.msg);
//		}
//	})

}



