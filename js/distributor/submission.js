$(function() {
	$('#save').click(function() {
		mysave();
	})

	var listJson = {};
	var importId = GetRequest().applyId;
	var importType = GetRequest().dataType;
	var dataId = GetRequest().dataId;
	var delDom;  //当前点击删除的节点
	getList();
	

	$(document).on('click', '.photo', function() {
		$(this).hide();
		$(this).siblings(".up-load").show();
	})

	$(document).on('click','#cancel',function(){
		$('#errbox').remove();
	})
	
	$(document).on('click','#sure',function(){
		var ulIndex = $(this).attr('ulIndex');
		var liIndex = $(this).attr('liIndex');
		deleteImg(ulIndex, liIndex);
	})
		


	$(document).on('change', '.inputFile', function() {
		var _this = $(this);
		var ulIndex = _this.parents('.list').index(); //第几个数组
		var files = Array.prototype.slice.call(this.files);
		files.forEach(function(file, i) {
			var fileType = /\/(?:jpeg|png|gif)/i;
			if(!fileType.test(file.type)) {
				errLay("请选择正确的图片格式(jpeg || png || gif)");
				return;
			}
			var reader = new FileReader();
			reader.onerror = function() {
				errLay("读取失败");
			};
			reader.onabort = function() {
				errLay("网络异常!");
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
		_this.val(''); //清空当前input，解决同一张图片不能重复点的问题
		
	})

	$(document).on('click', '.colseInput', function() {
		var _this = $(this);
		var ulIndex = _this.parents('.list').index(); //第几个数组
		var liIndex = _this.parents('li').index(); //第几个li
		shanchuImg(ulIndex, liIndex);
		delDom = $(this).parents('li');
	})
	
	function getList(){
		var data = {
			applyId: importId,
			isAuditingType:importType,
			nodeId:dataId
		}
		$.ajax({
			url: path + "/smAuditing/getAuitingFiles?time=" + (new Date()).getTime(),
			data: JSON.stringify(data),
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				hideLoading(); //隐藏load
				if(data.code == 0) {
					listJson = data.data;
					if(listJson.borrowerName) {
						$('#userName').text(listJson.borrowerName)
					}
					if(listJson.borrowerPhone) {
						$('#userPhone').text(listJson.borrowerPhone)
					}
					
					if(listJson.isOtherNext == 1){
						$('#save').text('下一步');
					}else{
						$('#save').text('确认提交');
					}
					
					for(var i = 0; i < listJson.smFileOwens.length; i++) {
						var text = '<div class="list">' +
							'<label>' + listJson.smFileOwens[i].modelName + '：</label>' +
							'<div class="up-load">' +
							'<ul>';
							
							if(listJson.smFileOwens[i].smFiles.length>0){   ///如果有图片，进行回显
								for(var j=0;j<listJson.smFileOwens[i].smFiles.length;j++){
									var newUrl = listJson.smFileOwens[i].smFiles[j].filePath.replace('.','_compress.');
									
									text += '<li class="weui_uploader_file weui_uploader_status"  style="background-image: url('+path+newUrl+');">'+
									'<span class="imgMsg">';
									//0未审核
									//1通过、
									//2未通过
									
									if(listJson.smFileOwens[i].smFiles[j].auditStatus == 0){
										text += '<i class="iconfont icon-shijian"></i>'+
										'<span>未审核</span>'+
										'</span>'+
										'<span class="colseInput iconfont icon-guanbi2"></span>';
									}
									
									if(listJson.smFileOwens[i].smFiles[j].auditStatus == 1){
										text += '<i class="iconfont icon-duihao"></i>'+
										'<span>已通过</span>'+
										'</span>';
									}
									
									if(listJson.smFileOwens[i].smFiles[j].auditStatus == 2){
										text += '<i class="iconfont icon-cha"></i>'+
										'<span>未通过</span>'+
										'</span>'+
										'<span class="colseInput iconfont icon-guanbi2"></span>';
									}
									text += '</li>';
								}
							}

							text += '<div class="inputBox">' +
							'<input class="inputFile" type="file" accept="image/*">' +
							'</div>' +
							'</ul>' +
							'</div>' +
							'</div>'
						$('#myList').append(text);
					}

				} else {
					errLay(data.msg);
				}
			},error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}


	function addImg(myFile, ulIndex) { //上传图片
		Fdata = new FormData();
		Fdata.append('file', myFile);
		Fdata.append('fileCode', 2);

		$.ajax({
			url: path + "/file/addFile",
			data: Fdata,
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			processData: false, // 不处理数据
			contentType: false, // 不设置内容类型
			success: function(data) {
				hideLoading(); //隐藏load	
				if(data.code == 0) {
					listJson.smFileOwens[ulIndex].smFiles.push(data.smFile);
				} else {
					errLay(data.msg);
				}
			},error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
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
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			success: function(data) {
				hideLoading(); //隐藏load	
				if(data.code == 0) {
					listJson.smFileOwens[ulIndex].smFiles.splice(liIndex, 1);
					delDom.remove();
					$('#errbox').remove();
					errLay('删除成功');
				} else {
					errLay(data.msg);
				}
			},error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}

	function mysave() {
		$.ajax({
			url: path + "/smAuditing/submitAuditInfo",
			data: JSON.stringify(listJson),
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				hideLoading(); //隐藏load	
				if(data.code == 0) {
					errLay('保存成功');
					setTimeout(function(){
						if(listJson.isOtherNext == 1){
							window.location.href = 'addition.html?applyId='+importId+"&dataType="+importType+"&dataId"+dataId;
						}else{
							window.location.href = 'myOrder.html';
						}
					},1000)
					
				} else {
					errLay(data.msg);
				}
			},error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
		});
	}
	
	
	function shanchuImg(ulIndex, liIndex){
		var text = '<div class="pop-box" id="errbox">'+
			'<div class="mask"></div>'+
			'<div class="box1">'+
				'<p class="warn">提醒</p>'+
				'<p class="wrong">图片删除后不可恢复，请确认</p>'+
					'<div class="btn-box">'+
				'<a href="javascript:;" class="weui-btn weui-btn_primary" id="cancel">取消</a>'+
				'<a href="javascript:;" class="weui-btn weui-btn_primary" id="sure" ulIndex="'+ulIndex+'" liIndex="'+liIndex+'">确定</a>'+
			'</div>'+
			'</div>'+
		'</div>';
		
		$('body').append(text)
	}
	
	

	
});


