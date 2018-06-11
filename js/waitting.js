$(function(){
  
        // 列表遍历
    each();
    //    点击转订单
    $(".to").on("click",function(){
        cue("提醒","你确定将【客户名称】的征信结果转为订单吗？")
        $("#yes").on("click",function(){
            window.location.href="myOrder.html"
        })
        $("#no").on("click",function(){
            $(".pop-box").hide()
        })
    })
  
})



// 遍历的列表
let arr=[{
    name:"张珊",
    time:"2018-03-13",
    result:"通过",
},{
    name:"张珊",
    time:"2018-03-13",
    result:"通过",
},{
    name:"张珊",
    time:"2018-03-13",
    result:"通过",
},{
    name:"张珊",
    time:"2018-03-13",
    result:"通过",
}]
function each(){
    $.each(arr,function(index,el){
        let text=` <tr>
        <td>${el.name}</td>
        <td>${el.time}</td>
        <td>${el.result}</td>
        <td class="look">查看详情</td>
        <td class="to">转订单</td>
    </tr>`
        $("table").append(text)
    })
}
