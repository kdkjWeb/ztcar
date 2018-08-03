$(function(){
    
    getSearchByUsername();
    // 下拉框切换
    $(".type input").select ({
        title: "选择查询类型",
        items: ["征信记录","客户姓名","汽车销价区间","汽车销售时间段"],
        onChange: function() {
            if($("input[type=text]").val() == "客户姓名") {
                $(".user-search").show().siblings(".ct").hide();
                 getSearchByUsername();
            }
            if($("input[type=text]").val() == "征信记录") {
                $(".zx-search").show().siblings(".ct").hide()
                getSearchByZx()
            }
            if($("input[type=text]").val() == "汽车销价区间") {
                $(".car-search-price").show().siblings(".ct").hide()
                getSearchByPrice()
            }
            if($("input[type=text]").val() == "汽车销售时间段") {
                $(".car-search").show().siblings(".ct").hide()
                getSearchByTime()
            }
        }
    });
    // 搜索
    $("#search").on("click",function(){
        getSearchByUsername()
    })
    $("#tsbtn").on("click",function() {
        getSearchByTime()
    })
    $("#psbtn").on("click",function() {
        getSearchByPrice()
    })
    $("#zxbtn").on("click",function() {
        getSearchByZx()
    })
    // 时间选择器
    $(".time input").datetimePicker ({
        times: function() {
            return
        }
    });
    // 记录查询
    $(document).on("click","#loan",function(){
        var id = $(this).attr("userId")
        window.location.href = "loanSearch.html?id="+id
    })
    $(document).on("click","#repay",function(){
        var id = $(this).siblings("a").attr("userId")
        window.location.href = "repaymentSearch.html?id="+id
    })
    // 查看
    $(document).on("click",".look",function() {
        var id = $(this).attr("lookId")
        window.location.href = "search.html?id=" + id
    })
  
// ========================查询信息=====================

    // 查询客户姓名
    function getSearchByUsername() {
        var sName = $("#inputName").val();
        var data = {
            name: sName
        }
        $.ajax({
            url: path + "/smBorrower/selectSmBorrowerAboutOfficial",
            data: JSON.stringify(data),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
            success: function(data) {
            	hideLoading(); //隐藏load	
                if(data.code == 0){
                    if(data.data){
                        userName(data.data.list);
                    }
                }
            },
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
        })
    }
    // 查询征信记录
    function getSearchByZx() {
        var sBeginTime = $("#zxBeginTime").val();
        var sEndTime = $("#zxEndTime").val();
        let data = {
            startTime: getTime(sBeginTime),
            endTime: getTime(sEndTime)
        }
       if(getTime(sBeginTime) > getTime(sEndTime)){
            errLay("开始时间不能大于结束时间")
        }else{
            $.ajax({
                url: path + "/smUrgent/selectSmBorrowerAboutCreditByUserId",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                type:"post",
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function() {
                    showLoading(); //显示loading	
                },
                success: function(data) {
                    hideLoading(); //隐藏load	
                    if(data.code == 0){
                        if(data.data){
                            zxRcord(data.data);
                        }
                    }
                },
                error: function(request, textStatus, errorThrown) {
                    hideLoading(); //隐藏load	
                    errLay(request.responseJSON.msg);
                }
            })
        }
        }
        
    // 查询汽车销售时间
    function  getSearchByTime() {
        var sBeginTime = $("#carBeginTime").val();
        var sEndTime = $("#carEndTime").val();
        let data = {
            startTime: getTime(sBeginTime),
            endTime: getTime(sEndTime)
        }
        if(getTime(sBeginTime) > getTime(sEndTime)){
            errLay("开始时间不能大于结束时间")
        }else{
            $.ajax({
                url: path + "/smFinancing/getSmFinacingByTime",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                type: "post",
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function() {
                    showLoading(); //显示loading	
                },
                success: function(data) {
                    hideLoading(); //隐藏load	
                    if(data.code == 0){
                        if(data.data){
                            saveTime(data.data);
                        }
                    }
                },
                error: function(request, textStatus, errorThrown) {
                    hideLoading(); //隐藏load	
                    errLay(request.responseJSON.msg);
                }
            })
        }
        
        
    }
    // 查询汽车售价区间
    function getSearchByPrice() {
        var sBeginPrice = $("#beginPrice").val();
        var sEndPrice = $("#endPrice").val();
        let data = {
            startPrice: sBeginPrice,
            endPrice: sEndPrice
        }
        if(sBeginPrice > sEndPrice){
            errLay("开始价格不能大于结束价格")
        }else{
            $.ajax({
            url: path + "/smFinancing/getSmFinacingByPrice",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type: "post",
            xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				showLoading(); //显示loading	
			},
            success: function(data) {
            	hideLoading(); //隐藏load	
                if(data.code == 0){
                    if(data.data){
                        carPrice(data.data); 
                    }
                }
            },
			error: function(request, textStatus, errorThrown) {
				hideLoading(); //隐藏load	
				errLay(request.responseJSON.msg);
			}
            }) 
        }
        
    }
   

// ======================遍历信息=======================


      // 遍历客户姓名
      function userName(arr) {
          var text= ''
        for(let i = 0;i < arr.length;i++) {
             text += '<div class="c-list">'+
                 '<p>'+
                 '<span class="userName">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：' + arr[i].name +'</span>'+
               	 '<span class="orderProcess" appId="'+arr[i].applyId+'">订单详情</span>'+
				 '<span class="seeProcess" appId="'+arr[i].applyId+'">流程查看</span>'+
                 '</p>'+
                 '<p>联系电话：<span>' + arr[i].contactNum + '</span></p>'+
                 '<p>身份证号：<span>' +arr[i].certificateNum + '</span></p>'+
                 '<div class="text">'+
                     '<a id="loan" userId='+arr[i].id+'>车贷分期记录查询</a>'+
                     '<a id="repay">车贷还款记录查询</a>'+
                 '</div> '+
             '</div>'
         }
        $(".list").html(text)
     }
     // 遍历征信记录
     function zxRcord(arr) {
         var text= '';
         for(let i = 0;i < arr.length;i++) {
              text += '<tr>' +
                '<td>' + arr[i].name + '</td>' +
             '<td>' + getDays(arr[i].modifyTime) + '</td>' +
             '<td>' + arr[i].zxStatusStr + '</td>';
             if(arr[i].remark == null){
                text +='<td>暂无</td>'
             }
             else{
                text +='<td>' + arr[i].remark + '</td>'
             } +
            '</tr>'
        }
        $("#tobody").html(text)
     }
     // 遍历汽车售价区间
     function carPrice(arr){
         var text = ""
         for(let i = 0;i < arr.length;i++) {
            text += '<tr>'+
                 '<td>' + getDays(arr[i].orderTime) + '</td>'+
                 '<td>' + arr[i].vehicleBrand + arr[i].carSeries+'</td>'+
                 '<td>' + arr[i].totalLoan + '</td>'+
                 '<td class="look" lookId = ' + arr[i].applyId+ '>查看</td>'+
             '</tr>'
         }
         $("#price-body").html(text)
     }
     // 遍历汽车销售时间
     function saveTime(arr) {
         var text = ""
         for(let i = 0;i < arr.length;i++) {
            text += '<tr>'+
                 '<td>' + getDays(arr[i].orderTime) + '</td>'+
                 '<td>' + arr[i].vehicleBrand + arr[i].carSeries+ '</td>'+
                 '<td>' + arr[i].borrowerName + '</td>'+
                 '<td class="look" lookId = ' + arr[i].applyId+ '>查看</td>'+
             '</tr>'
         }
         $("#time-body").html(text)
     }
     
     
     
    $(document).on('click','.orderProcess',function(){
     	var appId = $(this).attr('appId');
     	window.location.href='orderDetails.html?applyId='+appId;
     })
     
    $(document).on('click','.seeProcess',function(){
     	var appId = $(this).attr('appId');
     	window.location.href='orderFlow.html?applyId='+appId;
    })
     
})

