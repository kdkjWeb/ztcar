$(function(){
  $("#job").select({
    title: "选择经销商",
    items: ["法官", "医生", "猎人", "学生", "记者", "其他",]
  });
  $("#btn1").on("click",function(){
    window.location.href="apply.html"
  })
})