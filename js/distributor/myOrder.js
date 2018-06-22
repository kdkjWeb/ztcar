$(function() {
	let arr = [{
		name: "刘世桂",
		phone: "13580392179",
		money: "55555555.00",
		box: "选择产品"
	}, {
		name: "刘世桂",
		phone: "13580392179",
		money: "11111111.00",
		box: "完善信息"
	}, {
		name: "刘世桂",
		phone: "13580392179",
		money: "333333.00",
		box: "提交放款后资料"
	}];

	$.each(arr, function(index, el) {
		$(".content").append(` <div class="list">
        <div class="c-list">
            <div class="basic-msg">
                <div class="basic">
                    <p class="name">${el.name}</p>
                    <p class="phone">${el.phone}</p>
                </div>
                <div class="credit">
                    <label>贷款金额：</label>
                    <span>${el.money}</span>
                </div>
            </div>
            <div class="btn">
                <div class="choose">
                    <p>${el.box}</p>
                </div>
                <div class="cancel">
                    <p>订单取消</p>
                </div>
            </div>
        </div>
        <div class="line"></div>
    </div>`)
	});

	//  $(".choose").on("click",function() {
	//      window.location.href = "flow.html"
	//  })

	$(document).on('click', '.cancel', function() {
		myAlert();
	})
	
	$(document).on('click','#no',function(){
		$('#errBox').remove();
	})
	
	function myAlert(id) {
		var text = '<div class="pop-box" id="errBox">' +
			'<div class="mask"></div>' +
			'<div class="box1">' +
			'<span>请输入取消原因</span>' +
			'<input type="text" value="" />' +
			'<div class="btn-box">' +
			'<a href="javascript:;" class="weui-btn weui-btn_primary" id="no">取消</a>' +
			'<a href="javascript:;" class="weui-btn weui-btn_primary" id="yes">确定</a>' +
			'</div>' +
			'</div>' +
			'</div>'
		$('body').append(text);
	}

	

})