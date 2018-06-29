$(function(){
    
    var listJson = {};
    var important = 1;

    $(".type input").select ({
        title: "选择查询类型",
        items: ["征信记录","客户姓名","汽车销价区间","汽车销售时间段"],
        onChange: function() {

            if($("input[type=text]").val() == "征信记录") {
                $(".zx-search").show().siblings(".ct").hide()
            }

            if($("input[type=text]").val() == "客户姓名") {
                $(".user-search").show().siblings(".ct").hide()
            }

            if($("input[type=text]").val() == "汽车销价区间") {
                $(".car-search-price").show().siblings(".ct").hide()
            }

            if($("input[type=text]").val() == "汽车销售时间段") {
                $(".car-search").show().siblings(".ct").hide()
            }
        }
    });
    $("#search").on("click",function(){
        Name()
    })
    $(".time input").datetimePicker ({
        times: function() {
            return
        }
    });
    $(".look").on("click",function() {
        window.location.href = "search.html"
    })
    
    function Name() {
        var text = $("#input").val();
        // text = $.trim(text)
        $("#table tbody tr").hide().find("td:first").filter(":contains('"+ text +"')").parent().show()
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

