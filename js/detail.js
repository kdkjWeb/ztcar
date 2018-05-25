$(function(){
    
    var arr =[{
        h1:"主申请人征信结果",
        name:"张三",
        IDcard:"122",
        card:"122",
        phone:"1212"
    },{
        h1:"配偶征信结果",
        name:"张三",
        IDcard:"122",
        card:"122",
        phone:"1212"
    }] 
var text =   
`<div class="content-c">
<div class="mind">
    <h1>${arr[0].h1}</h1>
    <div class="result">
        <div class="name">
            <p class="text">借款人姓名：${arr[0].name}</p>
        </div>
        <div class="IDcard">
            <p class="text">身份证号：${arr[0].IDcard}</p>
        </div>
        <div class="card">
            <p class="text">银行卡号：${arr[0].card}</p>
        </div>
        <div class="phone">
            <p class="text">预留手机号：${arr[0].phone}</p>
        </div>
    </div>
    `
        let t=$(".pass-box").attr("box")
        if(t==true){
           text +=  `
           <div class="auditing-result">
            <p class="text-p">综合审核结果:</p>
                <div class="pass-box yse">通过</div>` 
         }else{
            text +=  `<div class="auditing-result">
            <p class="text-p">综合审核结果:</p>
                <div class="pass-box no">不通过</div>` 
     }

        text+= `</div>
        </div>
    </div>
    <div class="line"></div>
</div>`  

// $(".content").append(text)
// $(".content").prepend(text)




$.each(arr,function(index,el){
    $(".content").append(text)
    //     $("#content").append(`<a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
    //     <div class="weui-media-box__hd">
    //         <img class="weui-media-box__thumb" src=${el.url}>
    //     </div>
    //     <div class="weui-media-box__bd">
    //         <h4 class="weui-media-box__title">${el.titles.title}</h4>
    //         <p class="weui-media-box__desc">${el.titles.time}</p>
    //     </div>
    // </a>`)
      

       

  


            

})   



})
