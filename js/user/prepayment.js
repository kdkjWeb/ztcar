$(function(){
    $(".apply").on("click",function(){
        errLay("你的提前还款申请已经发出，请留意消息")
    })
    $("#cancle").on("click",function(){
        cue("提醒","是否取消提前还款")
        $("#yes").on("click",function(){
            $(".pop-box").hide();
            errLay("已取消")
        })
        $("#no").on("click",function(){
            $(".pop-box").hide ()
        })
    })
    
    
    getList()
    
    
	function getList(){
		$.ajax({
			url: path + "/earlyrepay/getAuditEarlyRepayList",
//			data:,
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				if(data.code == 0) {
					for(var i = 0;i < data.data.length;i++){
						doSomething(data.data[i])
					}
					
				} else {
					errLay('请求出错');
				}
			}
		});
	}
    
    
    function doSomething(arr){
    	var text = '<div class="list">'+
            '<ul>'+
                '<li>'+
                    '<div>'+
                        '<label>贷款类型：</label>'+
                        '<p>'+arr.loanType+'</p>'+
                    '</div>'+
                '</li>'+
                '<li>'+
                    '<div>'+
                        '<label>贷款时间：</label>'+
                        '<p>'+arr.loanTime+'</p>'+
                    '</div>'+
                '</li>'+
                '<li>'+
                    '<div>'+
                        '<label>贷款金额：</label>'+
                        '<p>'+arr.totalLoan+'</p>'+
                    '</div>'+
                '</li>'+
                '<li>'+
                    '<div>'+
                        '<label>已还款金额：</label>'+
                        '<p>'+arr.alreadyRepay+'</p>'+
                    '</div>'+
                '</li>'+
                '<li>'+
                    '<div>'+
                        '<label>欠款金额：</label>'+
                        '<p>'+arr.totalLoan+'</p>'+
                    '</div>'+
                '</li>';
                
                if(arr.status == 0){   //未申请的
                	text += '<li class="apply">申请提前还款</li>';
                }
                
                else if(arr.status == 1){  //已申请
                	if(arr.auditState == 0){
                		text += '<li>'+
                  	 	'<div class="pass">'+
                        '<p class="has">待审核</p>'+
                    	'</div>'+
                		'</li>';
                	}
                	if(arr.auditState == 1){
                		text += '<li>'+
                  	 	'<div class="pass">'+
                        '<p class="has">已通过</p>'+
                        '<p class="cancle">取消提前还款</p>'+
                    	'</div>'+
                		'</li>';
                	}
                	else if(arr.auditState == 2){
                		text += '<li></li>'+
			            '<li class="not">未通过</li>'+
			            '<li calss="cause">原因.....</li>';
                	}
                }
              	
              	else if(arr.status == 2){   //取消
              		if(arr.auditState == 0){
                		text += '<li>'+
                  	 	'<div class="pass">'+
                        '<p class="has">待审核</p>'+
                    	'</div>'+
                		'</li>';
                	}
                	if(arr.auditState == 1){
                		text += '<li>'+
                  	 	'<div class="pass">'+
                        '<p class="has">已通过</p>'+
                        '<p class="cancle">提前还款</p>'+
                    	'</div>'+
                		'</li>';
                	}
                	else if(arr.auditState == 2){
                		text += '<li></li>'+
			            '<li class="not">未通过</li>'+
			            '<li calss="cause">原因.....</li>';
                	}
              	}

            text += '</ul>'+
        '</div>';
        
        $('#content').append(text);
        
    }
    
    
    
    
    
    
    
})