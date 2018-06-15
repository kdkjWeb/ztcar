$(function() {
	let id = GetRequest().id;
	let phone = GetRequest().phone;
	
	console.log(id)
	if(id != undefined){
		getResult(id,'id');
	}else if(phone != undefined){
		getResult(phone,'phone');
	}
	
})

function getResult(num,type) {
	var url = '';
	var data = {};
	
	if(type == 'id'){
		url= 'getBorrowerCreditVo';
		data = {
			id:num
		}
	}else if(type == 'phone'){
		url = 'creditDetail';
		data ={
			phone:num
		}
	}
	
	
	$.ajax({
		url: path + "/apply/"+url,
		data: data,
		xhrFields: {
			withCredentials: true
		},
		dataType: "json",
		contentType: "application/json",
		type: "get",
		success: function(data) {
			console.log(data)

			if(data.code == 0) {

				let list = data.data;

				//        	  	===主申请人====
				if(list.borrowerName != null && list.borrowerName != undefined && list.borrowerName != '') {
					let arr = {
						name: list.borrowerName,
						IDcard: list.borrowerDocumentNo,
						phone: list.borrowerPhone,
						status: list.statusStr
					}
					user(arr);
				}
			//        	  	===配偶====
				if(list.spouserName != null && list.spouserName != undefined && list.spouserName != '') {
					let arr = {
						h1: '配偶',
						name: list.spouserName,
						IDcard: list.spouserDocumentNo,
						phone: list.spouserPhone,
						status: list.spouseCreditStatus
					}
					other(arr);
				}
				
				if(list.haveLesseeName != null && list.haveLesseeName != undefined && list.haveLesseeName != '' ){
					let arr = {
						h1: '自然人',
						name: list.haveLesseeName,
						IDcard: list.haveLesseeDocumentNo,
						phone: list.haveLesseePhone,
						status: list.haveLesseeCreditStatus
					}
					other(arr);
				}
				
				if(list.haveGuaranteeName != null && list.haveGuaranteeName != undefined && list.haveGuaranteeName != ''){
					let arr = {
						h1: '担保人',
						name: list.haveGuaranteeName,
						IDcard: list.haveGuaranteeDocumentNo,
						phone: list.haveGuaranteePhone,
						status: list.haveGuaranteeCreditStatus
					}
					other(arr);
				}

			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
		}
	});
}

function user(arr) {

	var mind = `<div class="content-c">
        <div class="mind">
            <h2>主申请人征信结果</h2>
            <div class="result">
                <div class="name">
                    <p class="text">借款人姓名：${arr.name}</p>
                </div>
                <div class="IDcard">
                    <p class="text">身份证号:${arr.IDcard}</p>
                </div>
                <div class="phone">
                    <p class="text">预留手机号：${arr.phone}</p>
                </div>
            </div>
            <div class="auditing-result">
                <p class="text-p">综合审核结果:</p>
                <div class="pass-box">`
			if(arr.status == '通过') {
				mind += `<p class="pass yes">${arr.status}</p>`
			} else {
				mind += `<p class="pass no">${arr.status}</p>`
			}

	mind += `</div>
            </div>
        </div> 
        </div>
        <div class="line"></div>`

	$('.content').append(mind);
}

function other(arr) {
	var text = `<div class="content-c1">
        <div class="other">
        <h1>${arr.h2}征信结果</h1>
        <div class="result1">
        <div class="name">
        <p class="text">姓名：${arr.name}</p>
        </div>
        <div class="IDcard">
        <p class="text">身份证号:${arr.IDcard}</p>
        </div>
        <div class="phone">
        <p class="text">手机号:${arr.phone}</p>
        </div>
        </div>
        <div class="auditing-result2">
        <p class="text-p">综合审核结果:</p>
        <div class="pass-box">`
       if(arr.status == '通过') {
				text += `<p class="pass yes">${arr.status}</p>`
			} else {
				text += `<p class="pass no">${arr.status}</p>`
			}
       text += `</div>
        </div>
        </div> 
        </div>
	 	<div class="line"></div>`

	$('.content').append(text)
}