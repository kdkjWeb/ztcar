$(function(){
	 getList();
	
	
//  $(".content").html(`<!-- 第一排 -->
//			<div class="leftDiv">
//				<div class="choose">
//					<i class="iconfont icon-chanpin"></i>
//					<p>选择产品</p>
//				</div>
//				<div class="arrow">
//					<i class="iconfont icon-jiantou3"></i>
//				</div>
//				<div class="choose" id="distributorMsg">
//					<i class="iconfont icon-xinxi"></i>
//					<p>完善贷款信息</p>
//				</div>
//				<div class="arrow">
//					<i class="iconfont icon-jiantou3"></i>
//				</div>
//				<div class="choose" id="submission">
//					<i class="iconfont icon-jibenziliao"></i>
//					<p>提交初审资料</p>
//				</div>
//			</div>
//			<!-- 向下的箭头 -->
//			<div class="Down">
//				<i class="iconfont icon-jiantou3"></i>
//			</div>
//			<!-- 第二排 -->
//			<div class="rightDiv">
//				<div class="choose">
//					<i class="iconfont icon-shiyongyinzhang"></i>
//					<p>初审资料审核中</p>
//				</div>
//				<div class="arrow">
//					<i class="iconfont icon-jiantou3"></i>
//				</div>
//				<div class="choose" id="carMsg">
//					<i class="iconfont icon-cheliang-"></i>
//					<p>录入车辆信息</p>
//				</div>
//				<div class="arrow">
//					<i class="iconfont icon-jiantou3"></i>
//				</div>
//				<div class="choose">
//					<i class="iconfont icon-tubiaolunkuo-"></i>
//					<p>待签合同</p>
//				</div>
//
//			</div>
//			<!-- 向下箭头（左侧） -->
//			<div class="Down"><i class="iconfont icon-jiantou3"></i></div>
//
//			<!-- 第三排 -->
//			<div class="leftDiv">
//				<div class="choose" id="credit">
//					<i class="iconfont icon-jibenziliao"></i>
//					<p>提交放款资料</p>
//				</div>
//				<div class="arrow">
//					<i class="iconfont icon-jiantou3"></i>
//				</div>
//				<div class="choose">
//					<i class="iconfont icon-shiyongyinzhang"></i>
//					<p>放款资料审核中</p>
//				</div>
//				<div class="arrow">
//					<i class="iconfont icon-jiantou3"></i>
//				</div>
//				<div class="choose">
//					<i class="iconfont icon-qian"></i>
//					<p>已放款</p>
//				</div>
//			</div>
//			<!-- 向下的箭头 -->
//			<div class="Down"><i class="iconfont icon-jiantou3"></i></div>
//			<!-- 第四排 -->
//			<div class="rightDiv">
//				<div class="choose" id="afterCredit">
//					<i class="iconfont icon-jibenziliao"></i>
//					<p>提交放款后资料</p>
//				</div>
//
//				<div class="arrow">
//					<i class="iconfont icon-jiantou3"></i>
//				</div>
//				<div class="choose">
//					<i class="iconfont icon-shiyongyinzhang"></i>
//					<p>放款后资料审核中</p>
//				</div>
//
//			</div>`)
   
//  $(".iconfont").css("color","#3b6af4");
    
    $(document).on('click','#distributorMsg',function(){    //完善贷款信息 
    	window.location.href = 'distributorMsg.html';
    })
    
    $(document).on('click','#carMsg',function(){    //录入车辆信息
    	window.location.href = 'carMsg.html';
    })
    
    $(document).on('click','#submission',function(){    //提交初审资料
    	window.location.href = 'submission.html';
    })
    
    $(document).on('click','#credit',function(){    //提交放款资料
    	window.location.href = 'credit.html';
    })
    
    $(document).on('click','#afterCredit',function(){    //提交放款资料
    	window.location.href = 'afterCredit.html';
    })
     
     
    function  getList(){
    	$.ajax({
			url: path + "/AboutProduct/getProductFlowByApplyId",
			data: {
				applyId:1
			},
			dataType: "json",
			contentType: "application/json",
			type: "get",
			xhrFields:{
			    withCredentials: true
			},
			success: function(data) {
				if(data.code == 0) {	
					pushList(data.data)
				}else{
					errLay(data.msg)
				}
			}
		});
    }
     
     
     
    function pushList(list){
    	var text='';
    	
//  	for(var i = 0;i<list.length;i++){
    		
    		if(list.length>3){
    			text += '<div class="leftDiv">';
    			
	    		if(list.length>0){
	    			text += '<div class="choose">'+
						'<i class="iconfont icon-chanpin"></i>'+
						'<p>'+list[0].flowName+'</p>'+
					'</div>';
	    		}
	    		
	    		if(list.length>1){
	    			text += '<div class="arrow">'+
								'<i class="iconfont icon-jiantou3"></i>'+
							'</div>'+
			    			'<div class="choose">'+
								'<i class="iconfont icon-chanpin"></i>'+
								'<p>'+list[1].flowName+'</p>'+
							'</div>';
	    		}
	    		
//	    		
//	    		if(){
//	    			
//	    		}
	    		
	    		
	    		text += '</div>'
	    		
	    		
    		}
    		
    		
    		
    		
    		$(".content").html(text)
    		
    		
    		
    		
//  	}
    }
     
})