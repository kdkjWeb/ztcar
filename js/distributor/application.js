$(function(){
//================如果是返回的刷新页面
	window.onpageshow = function(event) {　　
		if(event.persisted) {　　　　
			window.location.reload()　　
		}
	};
//	=====================
    var listJson = {}
    var importId = GetRequest().applyId;
    Create();  //获取合同模板

    $("#send").on("click",function(){
        cue("提醒","是否发送申请表至经销商邮箱？")
        $("#yes").on("click",function(){
            listJson.applyId = importId;    
            Send(); //上传
        })
        $("#no").on("click",function(){
            $(".pop-box").hide()
        })
    })
    
    $('#again').click(function(){
    	Create();
    })
    

    function Create() {
        var data = {
            applyId:importId
        }
        $.ajax({
            url:path+"/compact/buildCompact",
            data:data,
            dataType:"json",
            contentType:"application/json",
            type:"get",
            xhrFields:{
                withCredentials: true
            },
            beforeSend: function() {
				showLoading();//显示loading	
			},
            success:function(data){
            	hideLoading();  //隐藏load
                if(data.code == 0){
                  listJson.smCompacts = data.data; 
                  listJson.applyId = importId;
                  $('#true').show();
                  $('#send').show();
                  
                  $('#false').hide();
                  $('#again').hide();
                  
                }else {
					errLay(data.msg);
					$('#false').show();
					$('#again').show();
				}
            },error:function(request, textStatus, errorThrown){
				hideLoading();  //隐藏load	
				$('#false').show();
				$('#again').show();
				errLay(request.responseJSON.msg);
			}
        })
    }

    function Send() {
        $.ajax({
            url: path + "/compact/sendCompact",
            data:JSON.stringify(listJson),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            beforeSend: function() {
				showLoading();//显示loading	
			},
            success: function(data) {
            	hideLoading();  //隐藏load
                if(data.code == 0){
                    $(".pop-box").hide()
                    errLay("已发送至经销商邮箱");
                    var setRemove = setTimeout(function() {
						window.location.href="submission.html?applyId="+importId+'&dataType=0'+'&dataId='+data.data;
					}, 200);
                } else{
                    errLay(data.msg);
                }   
            },error:function(request, textStatus, errorThrown){
				hideLoading();  //隐藏load	
				errLay(request.responseJSON.msg);
			}
        })
    }
    

   
    
    
})