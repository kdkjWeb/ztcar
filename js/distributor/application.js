$(function(){
    var listJson = {}
    var importId = GetRequest().applyId;
    Create();  //获取合同模板

    $(".send").on("click",function(){
        cue("提醒","是否发送至经销商邮箱？")
        $("#yes").on("click",function(){
            listJson.applyId = importId;    
            Send(); //上传
        })
        $("#no").on("click",function(){
            $(".pop-box").hide()
        })
    })
    $(".weui-btn").on("click",function(){
        window.location.href="myOrder.html"
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
            success:function(data){
                if(data.code == 0){
                  listJson.smCompacts = data.data;  
                }else {
					errLay(data.msg);
				}
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
            success: function(data) {
                console.log(data)
                if(data.code == 0){
                    $(".pop-box").hide()
                    errLay("已发送至经销商邮箱")
                } else{
                    errLay(data.msg);
                }   
            
            },
            error: function(xhr,type,errthrown) {
                console.log(xhr);
                console.log(type)
            }
        })
    }
})