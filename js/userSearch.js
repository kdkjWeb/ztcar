$(function(){
    $(".type input").select({
        title:"选择查询类型",
        items:["征信记录","客户姓名","汽车销价区间","汽车销售时间段"],
    });
    $(".time input").datetimePicker();
    $(".look").on("click",function(){
        window.location.href="search.html"
    })
})