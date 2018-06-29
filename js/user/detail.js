$(function() {
	var id = GetRequest().id;
	var applyId = GetRequest().applyId;

	if(id != undefined) {
		getResult(id, 'id');
	} else if(applyId != undefined) {
		getResult(applyId, 'applyId');
	}

})

function getResult(num, type) {
	var url = '';
	var data = {};

	if(type == 'id') {
		url = 'getBorrowerCreditVo';
		data = {
			id: num
		}
	} else if(type == 'applyId') {
		url = 'creditDetail';
		data = {
			applyId: num
		}
	}
	$.ajax({
		url: path + "/apply/" + url,
		data: data,
		xhrFields: {
			withCredentials: true
		},
		dataType: "json",
		contentType: "application/json",
		type: "get",
		success: function(data) {
			var list = data.data;
			if(data.code == 0) {
				if(list.allStatusStr) {
					if(list.allStatusStr == '通过') {
						$('#allStatusStr').text('通过');
						$('#allStatusStr').addClass('yes');
					} else {
						$('#allStatusStr').text('不通过');
						$('#allStatusStr').addClass('no');
					}
				}

				//        	  	===主申请人====
				if(list.borrowerName) {
					var arr = {
						name: list.borrowerName,
						IDcard: list.borrowerDocumentNo,
						phone: list.borrowerPhone,
						status: list.statusStr
					}
					user(arr);
				}
				//        	  	===配偶====
				if(list.spouserName) {
					var arr = {
						h1: '配偶',
						name: list.spouserName,
						IDcard: list.spouserDocumentNo,
						phone: list.spouserPhone,
						status: list.spouseCreditStatus
					}
					other(arr);
				}

				if(list.haveLesseeName) {
					var arr = {
						h1: '自然人',
						name: list.haveLesseeName,
						IDcard: list.haveLesseeDocumentNo,
						phone: list.haveLesseePhone,
						status: list.haveLesseeCreditStatus
					}
					other(arr);
				}

				if(list.haveGuaranteeName) {
					var arr = {
						h1: '担保人',
						name: list.haveGuaranteeName,
						IDcard: list.haveGuaranteeDocumentNo,
						phone: list.haveGuaranteePhone,
						status: list.haveGuaranteeCreditStatus
					}
					other(arr);
				}

			} else {
				errLay(data.msg)
			}
		}
	});
}

function user(arr) {
	var mind = '<div class="content-c">' +
		'<div class="mind">' +
		'<h2>主申请人征信结果</h2>' +
		'<div class="result">' +
		'<div class="name">' +
		'<p class="text">借款人姓名&nbsp;:&nbsp;' + arr.name + '</p>' +
		'</div>' +
		'<div class="IDcard">' +
		'<p class="text">身&nbsp;份&nbsp;证&nbsp;号&nbsp;:&nbsp;' + arr.IDcard + '</p>' +
		'</div>' +
		'<div class="phone">' +
		'<p class="text">预留手机号&nbsp;:&nbsp;' + arr.phone + '</p>' +
		'</div>' +
		'</div>' +
		'<div class="auditing-result">' +
		'<p class="text-p">综合审核结果:</p>';

	if(arr.status == '通过') {
		mind += '<p class="pass yes">' + arr.status + '</p>';
	} else {
		mind += '<p class="pass no">' + arr.status + '</p>';
	}

	mind += '</div>' +
		'</div>' +
		'</div>' +
		'<div class="line"></div>';

	$('.content').append(mind);
}

function other(arr) {
	console.log(arr)
	var text = '<div class="content-c1">' +
		'<div class="other">' +
		'<h1>' + arr.h1 + '征信结果' +
		'</h1>' +
		'<div class="result1">' +
		'<div class="name">' +
		'<p class="text">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：' + arr.name + '</p>' +
		'</div>' +
		'<div class="IDcard">' +
		'<p class="text">身&nbsp;份&nbsp;证&nbsp;号&nbsp;:' + arr.IDcard + '</p>' +
		'</div>' +
		'<div class="phone">' +
		'<p class="text">手&nbsp;&nbsp;&nbsp;机&nbsp;&nbsp;&nbsp;号: ' + arr.phone + '</p>' +
		'</div>' +
		'</div>' +
		'<div class="auditing-result2">' +
		'<p class="text-p">综合审核结果:</p>';
	if(arr.status == '通过') {
		text += '<p class="pass yes">' + arr.status + '</p>';
	} else {
		text += '<p class="pass no">' + arr.status + '</p>';
	}
	text += '</div>' +
		'</div>' +
		'</div>' +
		'<div class="line"></div>';

	$('.content').append(text)
}