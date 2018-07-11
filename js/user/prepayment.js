$(function(){
	var listJson;
	
	
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
    
    getList();
    
    
	function getList(){
		$.ajax({
			url: path + "/earlyrepay/getAuditEarlyRepayList",
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				if(data.code == 0) {
					listJson = data.data;
					for(var i = 0;i < data.data.length;i++){
						doSomething(data.data[i])
					}
					
				} else {
					errLay(data.msg);
				}
			}
		});
	}
    
    
    function doSomething(arr){
    	var text;
    	if(arr.status == 0){
    		var text = '<div class="list">';
    	}else{
    		if(arr.auditState == 0){
    			var text = '<div class="list examineDiv">';
    		}else if(arr.auditState == 1){
    			var text = '<div class="list adoptDiv">';
    		}else if(arr.auditState == 2){
    			var text = '<div class="list refuseDiv">';
    		}
    	}

    		text += '<ul>'+
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
                	text += '<li>'+
						'<p class="pXian apply changeStatus" myStatus="1">申请提前还款</p>'+  //变成1
					'</li>';
                }
                
                else if(arr.status == 1){  //申请
                	if(arr.auditState == 0){
                		text += '<li>'+'<p class="examine">待审核</p>'+'</li>'+
						'<li>'+'<p class="pXian examine changeStatus" myStatus="0">取消提前还款</p>'+'</li>';  //变成0
					;
                	}
                	if(arr.auditState == 1){
                		text += '<li>'+'<p class="adopt">已通过</p>'+'</li>'+
						'<li>'+'<p class="pXian adopt changeStatus" myStatus="2">取消提前还款</p>'+'</li>';  ////变成2
                	}
                	else if(arr.auditState == 2){
                		text += '<li>'+'<p calss="refuse">未通过</p>'+'</li>'+
						'<li>'+'<p class="pXian refuse changeStatus" myStatus="1">重新申请提前还款</p>'+'</li>'+
					 '<li><p class="pXian refuse">未通过原因:'+arr.auditRemark+'</p></li>';  //变成1
                	}
                }
              	
              	else if(arr.status == 2){   //取消
              		if(arr.auditState == 0){
                		text += '<li>'+'<p class="examine">待审核</p>'+'</li>'+
						'<li>'+'<p class="pXian examine changeStatus" myStatus="1">撤回取消提前还款</p>'+'</li>';  //变成1
                	}
                	if(arr.auditState == 1){
                		text += '<li>'+'<p calss="adopt">已通过</p>'+'</li>'+
						'<li>'+'<p class="pXian adopt changeStatus" myStatus="1">撤回取消提前还款</p>'+'</li>';   //  //变成1
                	}
                	else if(arr.auditState == 2){
                		text += '<li>'+'<p class="refuse">未通过</p>'+'</li>'+
						'<li></li>'+
					 '<li><p class="pXian refuse">未通过原因:'+arr.auditRemark+'</p></li>';
                	}
              	}

            text += '</ul>'+
        '</div>';
        
        $('#content').append(text);
        
    }
    


	$(document).on('click','.changeStatus',function(){
		var Index = $(this).parents('.list').index(); //第几个数组
		var Status = $(this).attr('mystatus');
		console.log(Index);
		console.log(Status);
		saveList(Index,Status);
    })

    function saveList(Index,Status){
    	var data = listJson[Index]
    	listJson[Index].status = Status;
    	
    	$.ajax({
			url: path + "/earlyrepay/updateAuditEarlyrepay",
			data:JSON.stringify(data),
			xhrFields: {
				withCredentials: true
			},
			dataType: "json",
			contentType: "application/json",
			type: "post",
			success: function(data) {
				if(data.code == 0) {
					errLay('您的申请已发出，请等待审核');
					setTimeout(function(){
							window.location.reload()
						},1500)
				} else {
					errLay(data.msg);
				}
			}
		});
    }
    
})