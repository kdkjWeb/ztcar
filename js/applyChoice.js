$(function(){
  $("#job").select({
    title: "选择经销商",
    items: ["法官", "医生", "猎人", "学生", "记者", "其他",]
  });





  $("#produce").select({
    title:"选择车贷分期类型",
    items:["诚易贷","诚易贷","诚易贷","诚易贷"]
  })
  $("#num").select({
    title:"选择贷款期数",
    items:["12期","36期","48期","其他"]
  })

  $("#btn1").on("click",function(){
    window.location.href="apply.html"
  })
})