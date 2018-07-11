$(function(){
    var listJson = {};
    var importId = GetRequest().applyId;
    
    var Route;  //路径
	getExsit();   //判断是否有承租人
	
    getOldList();   // 回显

    $("#date").datetimePicker({
        times:function(){
            return
        }
    });
    
    $("#type").select({
        title:"证件类型",
        items:["身份证"]
    })
    $(".weui-btn").on("click",function(){
			if(!Verification()){
				return false;
			}
            
            listJson.applyId = importId;
            listJson.name = $("#name").val();
            listJson.contactNum = $("#tel").val();
            if($("#type").val() == '身份证'){
                listJson.certificateType = 0;
            }
            listJson.certificateNum = $("#id").val();
            listJson.birth = $("#date").val();
            listJson.workName = $("#cName").val();
            listJson.position = $("#position").val();
            listJson.workAddress = $("#cAddress").val();
            listJson.workPhone = $("#phone").val();
            getSaveList()
        
    })

    function getOldList() {
        let data = {
            id: importId
        }
        $.ajax({
            url:path+"/apply/getSmSpouseInfoByApplyId",
            data:JSON.stringify(data),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            xhrFields: {
                withCredentials:true
            },
            success:function(data) {
                console.log(data);
                if(data.code == 0) {
                    if(data.data){
                        listJson = data.data;
                        console.log(listJson)
                        if(listJson.name) {
                            $("#name").val(listJson.name)
                        }
                        if(listJson.contactNum) {
                            $("#tel").val(listJson.contactNum)
                        }
                        if(listJson.certificateType == 0){
                        	$("#type").val('身份证');
                     	}
                        if(listJson.certificateNum) {
                            $("#id").val(listJson.certificateNum)
                        }
                        if(listJson.birth) {
                            $("#date").val(listJson.birth)
                        } 
                        if(listJson.workName) {
                            $("#cName").val(listJson.workName)
                        }
                        if(listJson.position){
                            $("#position").val(listJson.position)
                        } 
                        if(listJson.workAddress) {
                            $("#cAddress").val(listJson.workAddress)
                        } 
                        if(listJson.workPhone) {
                            $("#phone").val(listJson.workPhone)
                        }                        
                    }
                }else {
					errLay(data.msg);
				}
            }
            
        })
    }

    function getSaveList() {
        $.ajax({
            url:path+"/apply/saveSmSpouseInfo",
            data:JSON.stringify(listJson),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                if(data.code == 0){
                    window.location.href = Route+".html?applyId="+importId;
                }else {
					errLay(data.msg);
				}
            }
        })
    }

    function Verification(){
    	var flag = true;
        $(".weui-input").each(function(){
            if($(this).val() == '') {
                let msg = $(this).parents(".weui-cell").find("label").text();
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
					if(data.data.isTenant == 1){
						Route = 'tenant';  //承租人信息
					}else{
						Route = 'urgent';  //紧急联系人
					}
				}else{
					errLay(data.msg);
				}
			}
		});
	}
    
$("#IDcamera").on("click", function() {
	$('#userIdbox').fadeIn(100)
})    
$('.next').on('click', function() {
	$(this).parent('.fixBox').fadeOut(100)
})
    
//  图片上传回显
	$(document).on('change', 'input[type=file]', function() {
		var files = Array.prototype.slice.call(this.files);
		var _this = $(this);
		files.forEach(function(file, i) {
			//jpeg png gif    "/image/jpeg"     i对大小写不敏感
			var fileType = /\/(?:jpeg|png|gif)/i;
			if(!fileType.test(file.type)) {
				alert("请选择正确的图片格式(jpeg || png || gif)");
				return;
			}
			//HTML 5.1  新增file接口
			var reader = new FileReader();
			//读取失败
			reader.onerror = function() {
				alert("读取失败");
			};
			//读取中断
			reader.onabort = function() {
				alert("网络异常!");
			};
			//读取成功
			reader.onload = function() {
				var result = this.result; //读取失败时  null   否则就是读取的结果
				var image = new Image();
				image.src = result;
	
				_this.parents('.image-item').css("background-image", 'url(' + result + ')');
	
			};
			//注入图片 转换成base64
			reader.readAsDataURL(file);
		})
	
	})
    
    $('#a').change(function(){
		var _this = $(this);
		var files = Array.prototype.slice.call(this.files);
		var mydata = new FormData();
		mydata.append('file',files[0]);
		mydata.append('ocrCode',0);
		
		$.ajax({
				url: path + "/file/addFileUseOCR",
				data: mydata,
				dataType: "json",
				contentType: "application/json",
				type: "post",
				processData: false,
				contentType: false,
				beforeSend: function() {
					$('#loading').show();
				},
				success: function(data) {
					$('#loading').hide();
					if(data.code == 0) {
						if(data.data.code){
							$('#id').val(data.data.code)
						}
						if(data.data.name){
							$('#name').val(data.data.name)
						}
					}else{
						errLay(data.msg)
					}
				},error:function(data){
					$('#loading').hide();
				}
		});
    })
    
})