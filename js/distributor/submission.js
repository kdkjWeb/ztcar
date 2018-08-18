$(function() {
	
//	=================历史返回直接回到菜单页
	window.onpageshow = function(event) {　　
		if(event.persisted) {　　　　
			window.location.href = 'myOrder.html';
		}
	};
//=====================

	var listJson = {};
	var importId = GetRequest().applyId;
	var importType = GetRequest().dataType;
	var dataId = GetRequest().dataId;
	
	var delDom;  //当前点击删除的节点
	getList();
	
	$('#save').click(function() {
		listJson.fileRemark = $('#myTextarea').val();
		listJson.nodeType = importType;
		mysave();
	})
	
	$(document).on('click', '.photo', function() {
		$(this).hide();
		$(this).siblings(".up-load").show();
	})

	$(document).on('click','#cancel',function(){
		$('#errbox').remove();
	})
	
	$(document).on('click','#sure',function(event){  //删除
		event.stopPropagation();//阻止事件冒泡即可
		var ulIndex = $(this).attr('ulIndex');
		var liIndex = $(this).attr('liIndex');
		deleteImg(ulIndex, liIndex);
	})
	
	$(document).on('click', '.colseInput', function(event) {  //关闭按钮点击
		event.stopPropagation();//阻止事件冒泡即可
		var _this = $(this);
		var ulIndex = _this.parents('.list').index(); //第几个数组
		var liIndex = _this.parents('li').index(); //第几个li
		shanchuImg(ulIndex, liIndex);
		delDom = $(this).parents('li');
	})
	
	$(document).on('click','li',function(event){  //展示图片，并且展示不通过原因
		event.stopPropagation();//阻止事件冒泡即可\\\
		
		var i = $(this).attr('smfileowens');
		var j = $(this).attr('smfiles');
			
		var Remark = '';
		if(i){
			if(listJson.smFileOwens[i].smFiles[j].auditRemark){
				Remark = listJson.smFileOwens[i].smFiles[j].auditRemark;
			}
		}
		
		var newUrl = $(this).attr('bigUrl');
		var pb2 = $.photoBrowser({
		  items: [
		    {
		      image: newUrl,
		      caption: Remark
		    }],
		    onClose: function() { 
		    	$('.weui-photo-browser-modal').remove();
		    }
		});
		pb2.open();
	})
	
	
	$(document).on('change', '.inputFile', function() {
		showLoading(); //显示loading	
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
				var myFile = files[i];
				var fileName = files[i].name;
				var name = fileName.substring(0,fileName.indexOf("."));	
				
				var img = new Image();
				img.src = result;

				if (img.complete) {
	                callback();
	            } else {
	                img.onload = callback;
	            }
				function callback() {
					var data = compress(img);		
					var inputData = upload(data, file.type);		
					addImg(inputData, ulIndex,name);
					img = null;
				}
			};
			
			//注入图片 转换成base64
			reader.readAsDataURL(file);
			
		});
		
		_this.val(''); //清空当前input，解决同一张图片不能重复点的问题

	})
	
	function getList(){
		var data = {
			applyId: importId,
			isAuditingType:importType,
			nodeId:dataId
		}
		$.ajax({
			url: path + "/smAuditing/getAuitingFiles?time=" + new Date().getTime(),
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
						$('#userName').text(listJson.borrowerName);
					}
					if(listJson.borrowerPhone) {
						$('#userPhone').text(listJson.borrowerPhone);
					}
					
					if(listJson.auditingRemark && listJson.auditingStatus != 1){  //未通过原因
						$('.cause').show();
						$('#auditingRemark').text(listJson.auditingRemark);
					}
					if(listJson.capitalAuditingStatus != null && listJson.capitalAuditingStatus != 1 && listJson.capitalAuditingRemark != null){  //未通过原因
						$('.cause').show();
						$('#auditingRemark').text(listJson.capitalAuditingRemark);
					}
					
					if(listJson.fileRemark){  //备注
						$('#myTextarea').val(listJson.fileRemark)
					}
					for(var i = 0; i < listJson.smFileOwens.length; i++) {
						var text = '<div class="list">' +
							'<label>' + listJson.smFileOwens[i].modelName + '：</label>' +
							'<div class="up-load">' +
							'<ul>';
							
							if(listJson.smFileOwens[i].smFiles.length>0){   ///如果有图片，进行回显
								for(var j=0;j<listJson.smFileOwens[i].smFiles.length;j++){
									var newUrl = listJson.smFileOwens[i].smFiles[j].filePath.replace('.','_compress.');
									
									text += '<li class="weui_uploader_file weui_uploader_status" smFileOwens="'+i+'"  smFiles="'+j+'" bigUrl="'+path+listJson.smFileOwens[i].smFiles[j].filePath+'" style="background-image: url('+path+newUrl+');">'+
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
										'</span>';
									}
									text += '</li>';
								}
							}

							text += '<div class="inputBox">' +
							'<input class="inputFile" type="file" accept="image/*" multiple="multiple">' +
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


	function addImg(myFile, ulIndex,name) { //上传图片
		Fdata = new FormData();
		Fdata.append('file', myFile,name+'.jpg');
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
					var newUrl = data.smFile.filePath.replace('.','_compress.');
					
					var preview = '<li class="weui_uploader_file weui_uploader_status" bigUrl="'+path+data.smFile.filePath+'" style="background-image:url('+path+newUrl+')" ><span class="colseInput iconfont icon-guanbi2"></span></li>';
					$('.list').eq(ulIndex).find('.inputBox').before(preview)
					
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
				if(data.code == 0) {
					errLay('保存成功');
					setTimeout(function(){
						window.location.href = 'myOrder.html';
						hideLoading(); //隐藏load	
					},1000)
				} else {
					errLay(data.msg);
					hideLoading(); //隐藏load	
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
	
	
	//	=============
	var browser = {
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return { //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	};
	var addStyleLink = function(href) {
		var head = document.getElementsByTagName('head')[0];
		var styleLink = document.createElement('link');
		styleLink.setAttribute('rel', 'stylesheet');
		styleLink.setAttribute('href', href);
		head.appendChild(styleLink);
	};

	//=======================
	if(browser.versions.ios) {
		pushHistory();
		var bool = false;
		setTimeout(function() {
			bool = true;
		}, 1000);
		window.addEventListener("popstate", function(e) {
			if(bool) {
				window.location.href = 'myOrder.html';
			}
			pushHistory();
		}, false);
		
		function pushHistory() {
			var state = {
				title: "title",
				url: "#"
			};
			window.history.pushState(state, "title", "#");
		};
	}

	if(browser.versions.android) {;
		! function(pkg, undefined) {
			var STATE = 'x-back';
			var element;

			var onPopState = function(event) {
				event.state === STATE && fire();
			}

			var record = function(state) {
				history.pushState(state, null, location.href);
			}

			var fire = function() {
				var event = document.createEvent('Events');
				event.initEvent(STATE, false, false);
				element.dispatchEvent(event);
			}

			var listen = function(listener) {
				element.addEventListener(STATE, listener, false);
			}

			;
			! function() {
				element = document.createElement('span');
				window.addEventListener('popstate', onPopState);
				this.listen = listen;
				this.record = record(STATE);
				record(STATE);
			}.call(window[pkg] = window[pkg] || {});

		}('XBack');

		XBack.listen(function() {
			window.location.href = 'myOrder.html';
		});
	}

	//	=====================
	
	
});


