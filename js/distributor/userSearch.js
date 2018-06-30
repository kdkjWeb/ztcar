$(function(){
    
    var listJson = [];
    allName();
    $(".type input").select ({
        title: "选择查询类型",
        items: ["征信记录","客户姓名","汽车销价区间","汽车销售时间段"],
        onChange: function() {
            if($("input[type=text]").val() == "客户姓名") {
                $(".user-search").show().siblings(".ct").hide()
            }
            if($("input[type=text]").val() == "征信记录") {
                $(".zx-search").show().siblings(".ct").hide()
                allZx()
            }
            if($("input[type=text]").val() == "汽车销价区间") {
                $(".car-search-price").show().siblings(".ct").hide()
                carPrice()
                $(this).siblings("table td").empty()
            }
            if($("input[type=text]").val() == "汽车销售时间段") {
                $(".car-search").show().siblings(".ct").hide()
                saveTime()
                $(this).siblings("table").empty()
            }
        }
    });
    $("#search").on("click",function(){
        getSearchByUsername()
    })
    $("tsbtn").on("click",function() {
        console.log("销售时间")
    })
    $("psbtn").on("click",function() {
        console.log("售价区间")
    })
    $("zxbtn").on("click",function() {
        console.log("征信记录")
    })
    $(".time input").datetimePicker ({
        times: function() {
            return
        }
    });
    // 记录查询
    $(document).on("click","#loan",function(){
        var id = $(this).attr("userId")
        window.location.href = "loanSearch.html?id = " + id
    })
    $(document).on("click","#repay",function(){
        var id = $(this).siblings("a").attr("userId")
        window.location.href = "repaymentSearch.html?id = " + id
    })
    // 查看
    $(document).on("click",".look",function() {
        var id = $(this).siblings("td").attr("lookId")
        window.location.href = "search.html?id = " + id
    })




//  ===============获取信息=============== 


    // 获取所有客户姓名
    function allName() {
        let data = {}
        $.ajax({
            url: path + "/smBorrower/selectSmBorrowerAboutOfficial",
            data: JSON.stringify(data),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            success: function(data) {
                if(data.code == 0){
                    if(data.data){
                        listJson = data.data.list
                        userName(listJson);
                    }
                }
            },
            error: function(xhr,type,errorThrown) {
                console.log(xhr);
                console.log(type);
            }
        })
        
    }
    // 获取所有征信记录
    function allZx() {
        let data = {}
        $.ajax({
            url: path + "/smUrgent/selectSmBorrowerAboutCredit",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type: "post",
            success: function(data) {
                console.log(data)
                if(data.code == 0){
                    if(data.data){
                        listJson = data.data.list
                        zxRcord(listJson)
                    }
                }
            },
            error: function(xhr,type,errorThrown) {
                console.log(xhr);
                console.log(type)
            }
        })
    }
    // 获取所有汽车销售时间
    function allTime() {
        $.ajax({
            url: path + "",
            data: {},
            dataType: "json",
            contentType: "application/json",
            type: "post",
            success: function(data) {
                console.log(data)
                if(data.code == 0){
                    if(data.data){
                        // listJson = data.data.list
                        // userName(listJson);
                    }
                }
            },
            error: function(xhr,type,errorThrown) {
                console.log(xhr);
                console.log(type)
            }
        })
    }
    // 获取所有汽车售价
    function allPrice() {
        $.ajax({
            url: path + "",
            data: {},
            dataType: "json",
            contentType: "application/json",
            type: "post",
            success: function(data) {
                console.log(data)
                if(data.code == 0){
                    if(data.data){
                        // listJson = data.data.list
                        // userName(listJson);
                    }
                }
            },
            error: function(xhr,type,errorThrown) {
                console.log(xhr)
                console.log(type)
            }
        })
    }



// ========================查询信息=====================



    // 查询客户姓名
    function getSearchByUsername() {
        var sName = $("#inputName").val()
        var data = {
            name: sName
        }
        $.ajax({
            url: path + "/smBorrower/selectSmBorrowerAboutOfficial",
            data: JSON.stringify(data),
            dataType:"json",
            contentType:"application/json",
            type:"post",
            success: function(data) {
             if(data.code == 0){
                 if(data.data){
                    $(".c-list").hide().find("p:first").filter(":contains('"+ sName +"')").parent().show()
                 }
             }
            },
            error: function(xhr,type,errorThrown) {
                console.log(xhr);
                console.log(type)
            }
        })
    }
    // 查询征信记录
    function getSearchByZx() {
        let data = {
            id:1
        }

        $.ajax({
            url: path + "/smUrgent/selectSmBorrowerAboutCredit",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type:"",
            xhrFields:{
                withCredentials: true
            },
            success: function(data) {
                console.log(data)
            },
            error: function(xhr,type,errorThrown) {
                console.log(xhr);
                console.log(type)
            }
        })
    }
    // 查询汽车销售时间
    function  getSearchByTime() {
        let data = {
            id:1
        }

        $.ajax({
            url: path + "",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type: "",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                console.log(data)
            },
            error: function(xhr,type,errorThrown) {
                console.log(xhr);
                console.log(type);
            }
        })
    }
    // 查询汽车售价区间
    function getSearchByPrice() {
        let data = {
            id:1
        }

        $.ajax({
            url: path + "",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type: "",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                console.log(data);
            },
            error: function(xhr,type,errorThrown) {
                console.log(xhr);
                console.log(type)
            }
        })
    }
   


// ======================遍历信息==============================


      // 遍历客户姓名
      function userName(arr) {
        for(let i = 0;i < arr.length;i++) {
         $(".list").append(
             '<div class="c-list">'+
                 '<p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>' + arr[i].name + '</span></p>'+
                 '<p>联系电话：<span>' + arr[i].contactNum + '</span></p>'+
                 '<p>身份证号：<span>' +arr[i].certificateNum + '</span></p>'+
                 '<div class="text">'+
                     '<a id="loan" userId='+arr[i].id+'>车贷分期记录查询</a>'+
                     '<a id="repay">车贷还款记录查询</a>'+
                 '</div> '+
             '</div>')
         }
        
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
     function carPrice(){
         var arr = [{
             saveTime:"2018-03-12",
             type:"奥迪-a4",
             carPrice:"32万"
         },{
             saveTime:"2018-03-12",
             type:"奥迪-a4",
             carPrice:"32万" 
         }]
         var text = ""
         for(let i = 0;i < arr.length;i++) {
            text += '<tr>'+
                 '<td>' + arr[i].saveTime + '</td>'+
                 '<td>' + arr[i].type + '</td>'+
                 '<td>' + arr[i].carPrice + '</td>'+
                 '<td class="look" lookId = ' + arr[i].id+ '>查看</td>'+
             '</tr>'
         }
         $("#price-body").html(text)
     }
     // 遍历汽车销售时间
     function saveTime() {
         var arr = [{
             carSaveTime:"2018-03-12",
             carType:"奥迪-a4",
             business:"张珊"
         },{
             carSaveTime:"2018-03-12",
             carType:"奥迪-a4",
             business:"铁拐" 
         }]
         var text = ""
         for(let i = 0;i <arr.length;i++) {
            text += '<tr>'+
                 '<td>' + arr[i].carSaveTime + '</td>'+
                 '<td>' + arr[i].carType + '</td>'+
                 '<td>' + arr[i].business + '</td>'+
                 '<td class="look" lookId = ' + arr[i].id+ '>查看</td>'+
             '</tr>'
         }
         $("#time-body").html(text)
     }
})

