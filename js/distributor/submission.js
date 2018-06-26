$(function() {
	var imgArr0 = [];
	var imgArr1 = [];
	var imgArr2 = [];
	var imgArr3 = [];
	var imgArr4 = [];
	var imgArr5 = [];
	var imgArr6 = [];
	
	var listJson = {};
	var importId = 1;	
		
	getList();
	
	
	
		
	$(".photo").on("click", function() {
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
			switch(ulIndex) {
				case 0:
					imgArr0.push(myFile);
					break;
				case 1:
					imgArr1.push(myFile);
					break;
				case 2:
					imgArr2.push(myFile);
					break;
				case 3:
					imgArr3.push(myFile);
					break;
				case 4:
					imgArr4.push(myFile);
					break;
				case 5:
					imgArr5.push(myFile);
					break;
				case 6:
					imgArr6.push(myFile);
					break;
			}

		});
		_this.val('');
		
	})

	$(document).on('click', '.colseInput', function() {
		var _this = $(this);
		var ulIndex = _this.parents('.list').index(); //第几个数组
		var liIndex = _this.parents('li').index(); //第几个li

		switch(ulIndex) {
			case 0:
				imgArr0.splice(liIndex, 1);
				break;
			case 1:
				imgArr1.splice(liIndex, 1);
				break;
			case 2:
				imgArr2.splice(liIndex, 1);
				break;
			case 3:
				imgArr3.splice(liIndex, 1);
				break;
			case 4:
				imgArr4.splice(liIndex, 1);
				break;
			case 5:
				imgArr5.splice(liIndex, 1);
				break;
			case 6:
				imgArr6.splice(liIndex, 1);
				break;
		}
		$(this).parents('li').remove();
	})

//	$(document).on('click','li',function(){
//		var myurl = $(this).css("background-image");
//		$('#imgLayer').find('span').css("background-image",myurl);
//		$('#imgLayer').show();
//	})
	
	function getList(){
		var data = {
			applyId:importId
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
				if(data.code == 0){
					
					listJson = data.data;
					if(listJson.borrowerName){
						$('#userName').text(listJson.borrowerName)
					}
					if(listJson.borrowerPhone){
						$('#userPhone').text(listJson.borrowerPhone)
					}
					
					
				}else{
					errLay(data.msg)
				}
			}
		});
	}
	
	
});