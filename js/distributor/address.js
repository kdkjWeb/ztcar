$(function(){
   
//  $("#address").cityPicker({
//      title: "选择户籍地址",
//    });
      $("#nature").select({
          title:"现住房性质",
          items:["有按揭自置","无按揭自置","家属房产","租住","其他"]
      })
      $("#type").select({
          title:"房产类型",
          items:["商品房","商住两用","商用房","小产权，经适房","自建房","其他"]
      })
      $("#isTenant").select({
          title:"有无共同承担人",
          items:["自然人","无"]
      })
      $("#isMarried").select({
        title:"是否为配偶",
        items:["是","否"]
    })
    $("#isGuarantor").select({
        title:"有无担保人",
        items:["有自然担保人","有法人担保人","无"]
    })
    $(".weui-btn").on("click",function(){
        window.location.href="married.html"
    })
    
})
