$(function(){
    
    var listJson = {};
    var important = 1;
    Username();
    $(".type input").select ({
        title: "选择查询类型",
        items: ["征信记录","客户姓名","汽车销价区间","汽车销售时间段"],
        onChange: function() {
            if($("input[type=text]").val() == "客户姓名") {
                $(".user-search").show().siblings(".ct").hide()
            }
            if($("input[type=text]").val() == "征信记录") {
                $(".zx-search").show().siblings(".ct").hide()
                zxRcord()
            }
            if($("input[type=text]").val() == "汽车销价区间") {
                $(".car-search-price").show().siblings(".ct").hide()
                carPrice()
                $(".car-search-price table").siblings("table").empty()
            }
            if($("input[type=text]").val() == "汽车销售时间段") {
                $(".car-search").show().siblings(".ct").hide()
                SaveTime()
                $(".car-search table").siblings("table").empty()

            }
        }
    });
    $("#search").on("click",function(){
        // Name()
    })
    $(".time input").datetimePicker ({
        times: function() {
            return
        }
    });
    $(".look").on("click",function() {
        window.location.href = "search.html"
    })

    // 遍历客户姓名
    function Username() {
       var arr = [{
           username:"张珊",
           phone:"15983735209",
           idCard:"510922199408292667"
       },{
        username:"王五",
        phone:"18328755703",
        idCard:"510922199512210321"
       },{
        username:"李四",
        phone:"18428018291",
        idCard:"510922196503155674"
       }]
       
       $.each(arr,function(index,item) {
        $(".list").append(`
        <div class="c-list">
             <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>${arr[index].username}</span></p>
             <p>联系电话：<span>${arr[index].phone}</span></p>
             <p>身份证号：<span>${arr[index].idCard}</span></p>
             <div class="text">
                 <a href="loanSearch.html" id="loan">车贷分期记录查询</a>
                 <a href="repaymentSearch.html" id="repay">车贷还款记录查询</a>
             </div> 
         </div>`)
       })
    }
    // 遍历征信记录
    function zxRcord() {
        var arr = [{
            zxName:"张珊",
            zxTime:"2018-03-12",
            zxStatus:"良好",
            zxOther:"暂无"
        },{
            zxName:"王五",
            zxTime:"2018-03-15",
            zxStatus:"少数逾期",
            zxOther:"暂无"
        },{
            zxName:"李四",
            zxTime:"2018-03-20",
            zxStatus:"长期多次逾期",
            zxOther:"暂无"
        }]

        $.each(arr,function(index,item) {
            $("table").append(`
            <tr>
            <td>${arr[index].zxName}</td>
            <td>${arr[index].zxTime}</td>
            <td>${arr[index].zxStatus}</td>
            <td>${arr[index].zxOther}</td>
        </tr>`)
        })
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

        $.each(arr,function(index,item) {
            $("table").append(`
            <tr>
                <td>${arr[index].saveTime}</td>
                <td>${arr[index].type}</td>
                <td>${arr[index].carPrice}</td>
                <td class="look">查看</td>
            </tr>`)
        })
    }
    // 遍历汽车销售时间
    function SaveTime() {
        var arr = [{
            carSaveTime:"2018-03-12",
            carType:"奥迪-a4",
            business:"张珊"
        },{
            carSaveTime:"2018-03-12",
            carType:"奥迪-a4",
            business:"铁拐" 
        }]

        $.each(arr,function(index,item) {
            $("table").append(`
            <tr>
                <td>${arr[index].carSaveTime}</td>
                <td>${arr[index].carType}</td>
                <td>${arr[index].business}</td>
                <td class="look">查看</td>
            </tr>`)
        })
    }

    // 查询客户姓名
    function getSearchByUsername() {
        let data = {
            id:1
        }

        $.ajax({
            url: path + "",
            data: JSON.stringify(data),
            dataType:"json",
            contentType:"application/json",
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
    // 查询征信记录
    function getSearchByZx() {
        let data = {
            id:1
        }

        $.ajax({
            url: path + "",
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
})

