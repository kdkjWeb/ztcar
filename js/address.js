
$(function(){

    
    $("#address").cityPicker({
        title: "选择户籍地址",
      });
      $("#nature").select({
          title:"现住房性质",
          items:["租住公房","租住私房","    借助父母处"]
      })
      $("#type").select({
          title:"房产类型",
          items:["商品房","公房","经济适用房","限价房","廉租房","房改房"]
      })
      $("#isTenant").select({
          title:"有无共同承担人",
          items:["有","无"]
      })
      $("#isMarried").select({
        title:"是否为配偶",
        items:["是","否"]
    })
    $("#isGuarantor").select({
        title:"有无担保人",
        items:["有","无"]
    })
    $(".weui-btn").on("click",function(){
        window.location.href="married.html"
    })
})
