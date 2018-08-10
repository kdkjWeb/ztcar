$(function() {

	var listJson = {};
	var importId = GetRequest().id;
	var data = {
		applyId: importId
	};
	$.ajax({
		url: path + "/smFinancing/getSmFinacingByApplyId",
		data: data,
		dataType: "json",
		contentType: "application/json",
		type: "get",
		xhrFields: {
			withCredentials: true
		},
		success: function(data) {
			console.log(data);
			if(data.code == 0) {
				if(data.data) {
					listJson = data.data;
					if(listJson.borrowerName) {
						$("#name").val(listJson.borrowerName)
					}
					if(listJson.productName) {
						$("#product").val(listJson.productName)
					}
					if(listJson.carOpenFare) {
						$("#price").val(listJson.carOpenFare)
					}
					if(listJson.orderTime) {
						$("#time").val(getDays(listJson.orderTime))
					}
					if(listJson.reimbursementDeadline) {
						$("#num").val(listJson.reimbursementDeadline)
					}
					if(listJson.vehicleBrand) {
						$("#vehicle").val(listJson.vehicleBrand)
					}
					if(listJson.carSeries) {
						$("#type").val(listJson.carSeries)
					}
					if(listJson.carModels) {
						$("#audi").val(listJson.carModels)
					}
				}
			} else {
				errLay(data.msg);
			}
		},
		error: function(xhr, type) {
			console.log(xhr);
			console.log(type)
		}
	})
	


})