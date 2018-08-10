$(function() {

	var listJson = {};
	var importId = GetRequest().applyId;

	var Route; //路径
	getExsit(); //判断路劲

	OrderUse(importId,function(){
		getList();
	});

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
	});
	
	$('#nature').change(function() {
		if($(this).val() == '有按揭自置') {
			$('#mortgagePayments').parents(".weui-cell").removeClass("hide");
			$('#mortgagePayments').addClass("must");
		}else{
			$('#mortgagePayments').parents(".weui-cell").addClass("hide");
			$('#mortgagePayments').removeClass("must");
			$('#mortgagePayments').val('');
		}
	})
	
	$(".weui-btn").on("click", function() {
		if(!Verification()) { //为空的验证
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
			url: path + "/apply/getBorrowerAddressByApplyId?time=" + new Date().getTime(),
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					if(data.data) {
						listJson = data.data;

						content(listJson.smProductApplycontent); ////显示和必填验证

						if(listJson.currentAddress) { //现居地址
							$('#currentAddress').val(listJson.currentAddress);
						}
						if(listJson.permanentAddress) { //户籍地址
							$('#address').val(listJson.permanentAddress);
						}
						if(listJson.natureHousing) { //现住房性质
							$('#nature').val(listJson.natureHousing);
							
							if(listJson.natureHousing == '有按揭自置'){
								$('#mortgagePayments').parents(".weui-cell").removeClass("hide");
								$('#mortgagePayments').addClass("must");
							}
							
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
				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
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
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					window.location.href = Route+".html?applyId=" + importId;
				} else {
					errLay(data.msg);
				}
			},
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}
	
	//=-=========显示。是否必填==========
	function content(mycontent) {

		for(var i = 0; i < mycontent.smProductApplycontents.length; i++) {

			if(mycontent.smProductApplycontents[i].label == "cuAddr") { //现居地址
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#currentAddress').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#currentAddress').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "peAddr") { //户籍地址
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#address').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#address').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "naHousing") { //现住房性质
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#nature').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#nature').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "hoLocation") { //房产地点
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#housingLocation').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#housingLocation').addClass("must");
					}
				}

			} else if(mycontent.smProductApplycontents[i].label == "hoType") { //房产类型
				if(mycontent.smProductApplycontents[i].isShow == 1) {
					$('#type').parents(".weui-cell").removeClass("hide");
					if(mycontent.smProductApplycontents[i].isRequire == 1) {
						$('#type').addClass("must");
					}
				}
			}
		}

	}
	
	//=-=========显示。是否必填==========	

	function getExsit() {
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
					var content = data.data;

					if(content.isPo == 1) {
						Route = 'married'; //配偶
						return
					} else if(content.isGtcz == 1) {
						Route = 'tenant'; //承租人
						return
					} else if(content.isZrdb == 1) {
						Route = 'guarantor'; //个人担保
						return
					} else if(content.isJjlx == 1) {
						Route = 'urgent'; //紧急联系人
						return
					}

				} else {
					errLay(data.msg);
				}
			}
		});
	}

})