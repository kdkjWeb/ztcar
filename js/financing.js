$(function(){
    $("#Vehicle").select({
        title:"请选择车辆品牌",
        items:["奥迪","宝马","大众","本田"]
    })
    $("#audi").select({
        title:"请选择车系",
        items:["宝马1系","宝马2系"]
    })
    $("#type").select({
        title:"请选择车型",
        items:["小型","中型","大型"]
    })
    $("#month").select({
        title:"请选择还款期限",
        items:["12期","24期","36期"]
    })
    $("#payment").on("blur",function(){
        // let payment=$(".payment").val()
        // if(!(/^([1-9]\d*\.?\d*)|(0\.\d*[1-9]) $/.test(payment))||!payment){
        //     $.toast("填写正确的数字", "cancel");
        //     return false
        // }else{
        //    return true
        // }
    })
    $(".weui-btn").on("click",function(){
        window.location.href="basicMsg.html"
    })
})