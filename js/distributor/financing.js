$(function() {

	getCar(); //获取车辆品牌 

	$("#audi").select({
		title: "请选择车系",
		items: []
	})
	$("#type").select({
		title: "请选择车型",
		items: []
	})
	$("#month").select({
		title: "请选择还款期限",
		items: ["12期", "24期", "36期", "48期"]
	})
	$("#payment").on("blur", function() {

	})
	$(".weui-btn").on("click", function() {
		window.location.href = "basicMsg.html"
	})

	//====================获取汽车品牌=============
	function getCar() {
		let data = {
			id: 1
		}
		$.ajax({
			url: path + "/apply/getBrandNameList",
			data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			type: "post",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					var arr = [];
					for(var i = 0; i < data.data.length; i++) {
						let car = {
							title: data.data[i].text,
							value: data.data[i].code
						};
						arr.push(car);
					}
					$("#Vehicle").select({
						title: "现有车辆品牌",
						items: arr,
						onChange: function() {
							let dataVal = $(this)[0].data.values;
							if(dataVal != undefined) {
								$('#audi').val('');
								getCartype(dataVal);
							}
						}
					})
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		});
	}

	//====================获取车系=============
	function getCartype(id) {
		$.ajax({
			url: path + "/smdrive/getDriveSeriesList",
			data: {
				brandId: id
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					var arr = [];
					for(var i = 0; i < data.data.length; i++) {
						let car = {
							title: data.data[i],
							value: [i]
						};
						arr.push(car);
					}
					$("#audi").select("update", {
						title: "车系",
						items: arr,
						onChange: function() {
							let titles = $(this)[0].data.titles;
							if(titles != undefined) {
								getCarModel(titles);
							}
						}
					})
				}

			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		});
	}

	//====================获取车型=============
	function getCarModel(titles) {
		$.ajax({
			url: path + "/smdrive/getDriveModelList",
			data: {
				seriesName: titles
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			xhrFields: {
				withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {
					var arr = [];
					for(var i = 0; i < data.data.length; i++) {
						let car = {
							title: data.data[i],
							value: [i]
						};
						arr.push(car);
					}
					$("#type").select("update", {
						title: "车型",
						items: arr
					})
				}
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(xhr);
				console.log(type);
			}
		});
	}

})