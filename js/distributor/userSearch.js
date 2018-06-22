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
        console.log("低分局is电话")
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
        text = $.trim(text)
        // if($.trim(text) !="") {
            $("#table tbody tr").hide().find("td:first").filter(":contains('"+ text +"')").parent().show()
        // }
      
    }
})

