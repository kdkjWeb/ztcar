$(function() {
	$('#save').click(function() {
		mysave();
	})

	var listJson = {};
	var importId = GetRequest().applyId;
	var importType = GetRequest().dataType;
	var dataId = GetRequest().dataId;

	getList();

	$(document).on('click', '.photo', function() {
		$(this).hide();
		$(this).siblings(".up-load").show();
	})

	$(document).on('change', '.inputFile', function() {
		var _this = $(this);
		var ulIndex = _this.parents('.list').index(); //第几个数组
		var files = Array.prototype.slice.call(this.files);
		files.forEach(function(file, i) {
			var fileType = /\/(?:jpeg|png|gif)/i;
			if(!fileType.test(file.type)) {
				alert("请选择正确的图片格式(jpeg || png || gif)");
				return;
			}
			var reader = new FileReader();
			reader.onerror = function() {
				alert("读取失败");
			};
			reader.onabort = function() {
				alert("网络异常!");
			};
			reader.onload = function() {
				var result = this.result; //读取失败时  null   否则就是读取的结果
				var preview = '<li class="weui_uploader_file weui_uploader_status" style="background-image:url(' + result + ')"><span class="colseInput iconfont icon-guanbi2"></span></li>';
				_this.parents('.inputBox').before(preview);

			};
			//注入图片 转换成base64
			reader.readAsDataURL(file);
			if(!files.length) {
				return false
			};
			var myFile = files[0];

			addImg(myFile, ulIndex);

		});
		_this.val('');
	})

	$(document).on('click', '.colseInput', function() {
		var _this = $(this);
		var ulIndex = _this.parents('.list').index(); //第几个数组
		var liIndex = _this.parents('li').index(); //第几个li
		deleteImg(ulIndex, liIndex);
		$(this).parents('li').remove();
	})


	//	$(document).on('click','li',function(){
	//		var myurl = $(this).css("background-image");
	//		$('#imgLayer').find('span').css("background-image",myurl);
	//		$('#imgLayer').show();
	//	})
	
	function getList(){

		var data = {
			applyId: importId,
			isAuditingType:importType,
			nodeId:dataId
		}
		$.ajax({
			url: path + "/smAuditing/getAuitingFiles",
			data: JSON.stringify(data),
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				if(data.code == 0) {
					listJson = data.data;
					if(listJson.borrowerName) {
						$('#userName').text(listJson.borrowerName)
					}
					if(listJson.borrowerPhone) {
						$('#userPhone').text(listJson.borrowerPhone)
					}

					for(var i = 0; i < listJson.smFileOwens.length; i++) {
						var text = '<div class="list">' +
							'<label>' + listJson.smFileOwens[i].modelName + '：</label>' +
							//							'<div class="photo">' +
							//							'<i class="iconfont icon-xiangji1"><span>拍照或选择图片</span></i>' +
							//							'</div>' +
							'<div class="up-load">' +
							'<ul>';
							
							if(listJson.smFileOwens[i].smFiles.length>0){
								for(var j=0;j<listJson.smFileOwens[i].smFiles.length;j++){
									text += '<li class="weui_uploader_file weui_uploader_status"  style="background-image: url('+path+listJson.smFileOwens[i].smFiles[j].filePath+');">'+
									'<span class="colseInput iconfont icon-guanbi2"></span>'+
								'</li>'
								}
								
							}

							text += '<div class="inputBox">' +
							'<input class="inputFile" type="file" accept="image/jpg,image/jpeg,image/png,image/gif">' +
							'</div>' +
							'</ul>' +
							'</div>' +
							'</div>'
						$('#myList').append(text);
					}

				} else {
					errLay('请求出错');
				}
			}
		});
	}


	function addImg(myFile, ulIndex) { //上传图片
		Fdata = new FormData();
		Fdata.append('file', myFile);

		$.ajax({
			url: path + "/file/addFile",
			data: Fdata,
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			processData: false, // 不处理数据
			contentType: false, // 不设置内容类型
			success: function(data) {
				if(data.code == 0) {
					listJson.smFileOwens[ulIndex].smFiles.push(data.smFile);
				} else {
					errLay('请求出错');
				}
			}
		});
	}

	function deleteImg(ulIndex, liIndex) { //删除图片
		var myid = listJson.smFileOwens[ulIndex].smFiles[liIndex].id;

		$.ajax({
			url: path + "/file/deleteFile?fileId=" + myid,
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			success: function(data) {
				if(data.code == 0) {
					listJson.smFileOwens[ulIndex].smFiles.splice(liIndex, 1);
				} else {
					errLay('请求出错');
				}
			}
		});
	}

	function mysave() {
		console.log('1')
		$.ajax({
			url: path + "/smAuditing/auditFirstSubmit",
			data: JSON.stringify(listJson),
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				if(data.code == 0) {
					// window.location.href = 'myOrder.html';
				} else {
					errLay('请求出错');
				}
			}
		});
	}



	
});