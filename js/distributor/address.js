$(function() {

	var listJson = {};
	var importId = GetRequest().applyId;
	
	var Route;  //路径
	getExsit();   //判断是否有配偶
	getList(); //回显
	
	
	

	$("#nature").select({
		title: "现住房性质",
		items: ["有按揭自置", "无按揭自置", "家属房产", "租住", "其他"]
	})
	$("#type").select({
		title: "房产类型",
		items: ["商品房", "商住两用", "商用房", "小产权，经适房", "自建房", "其他"]
	})
	$("#isTenant").select({
		title: "有无共同承担人",
		items: ["自然人", "无"]
	})
	$("#isMarried").select({
		title: "是否为配偶",
		items: ["是", "否"]
	})
	$("#isGuarantor").select({
		title: "有无担保人",
		items: ["有自然担保人", "有法人担保人", "无"]
	})
	$(".weui-btn").on("click", function() {
		if(!Verification()){//为空的验证
			return false;
		}
		
		listJson.applyId = importId;
		listJson.currentAddress = $('#currentAddress').val(); //现居地址
		listJson.permanentAddress = $('#address').val(); //户籍地址
		listJson.natureHousing = $('#nature').val(); //现住房性质
		listJson.housingLocation = $('#housingLocation').val(); //房产地点
		listJson.housingType = $('#type').val(); //房产类型
		listJson.mortgagePayments = $('#mortgagePayments').val(); //房贷月供

		postList(); //上传
	})

	function getList() { //回显
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/getBorrowerAddressByApplyId",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					if(data.data) {
						listJson = data.data;
						if(listJson.currentAddress) { //现居地址
							$('#currentAddress').val(listJson.currentAddress);
						}
						if(listJson.permanentAddress) { //户籍地址
							$('#address').val(listJson.permanentAddress);
						}
						if(listJson.natureHousing) { //现住房性质
							$('#nature').val(listJson.natureHousing);
						}
						if(listJson.housingLocation) { //房产地点
							$('#housingLocation').val(listJson.housingLocation);
						}
						if(listJson.housingType) { //房产类型
							$('#type').val(listJson.housingType);
						}
						if(listJson.mortgagePayments) { //房贷月供
							$('#mortgagePayments').val(listJson.mortgagePayments);
						}
					}
				}else{
					errLay('请求出错');
				}
			}
		});
	}

	function postList() { //上传
		$.ajax({
			url: path + "/apply/saveBorrowerAddressInfo",
			data: JSON.stringify(listJson),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					window.location.href = Route+".html?applyId="+importId;
				}else{
					errLay('请求出错');
				}
			}
		});
	}

	function Verification() {
		var flag = true;
		$('.Required').each(function() {
			if($(this).val() == '') {
				let msg = $(this).parents('.weui-cell').find('label').text();
				let str = msg.substr(0, msg.length - 1);
				errLay(str + '不能为空');
				flag = false;
				return false;
			}
		})
		return flag;
	}

	
	function getExsit(){
		var data = {
			id: importId
		}
		$.ajax({
			url: path + "/apply/isExsitOtherPersion",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					if(data.data.isSpouse == 1){
						Route = 'married';  //配偶
					}else{
						Route = 'urgent';  //紧急联系人
					}
				}else{
					errLay('请求出错');
				}
			}
		});
	}
	
	
	
})