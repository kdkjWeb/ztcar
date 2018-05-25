$(function(){
    var arry=[{
            h1:"主申请人征信结果",
            name:"张三",
            IDcard:"122",
            card:"122",
            phone:"1212",
            // state:false,
            line:true
    }]
    var arr =[{
        h1:"配偶征信结果",
        name:"张三",
        IDcard:"122",
        card:"122",
        phone:"1212",
        // state:false,
        line:true
    },{
        h1:"共同承担人征信结果",
        name:"张三",
        IDcard:"122",
        card:"122",
        phone:"1212",
        // state:false,
        line:true
    },
    {
        h1:"担保人征信结果",
        name:"张三",
        IDcard:"122",
        card:"122",
        phone:"1212",
      
    }] 
    for(var i= 0; i<arry.length; i++){
        var mind=`<div class="content-c">
        <div class="mind">
            <h1>主申请人征信结果</h1>
            <div class="result">
                <div class="name">
                    <p class="text">借款人姓名：${arr[i].name}</p>
                </div>
                <div class="IDcard">
                    <p class="text">身份证号:${arr[i].IDcard}</p>
                </div>
                <div class="card">
                    <p class="text">银行卡号：${arr[i].card}</p>
                </div>
                <div class="phone">
                    <p class="text">预留手机号：${arr[i].phone}</p>
                </div>
            </div>
            <div class="auditing-result">
                <p class="text-p">综合审核结果:</p>
                <div class="pass-box">
                <p class="pass yes">通过</p>
                </div>
            </div>
        </div> 
        </div>
        <div class="line"></div>`
       
    $('.content').append(mind)
    }
   
 for(var j = 0; j<arr.length; j++){
    var text  =  `<div class="content-c1">
                    <div class="other">
                        <h1>${arr[j].h1}</h1>
                        <div class="result1">
                            <div class="name">
                                <p class="text">姓名：${arr[j].name}</p>
                            </div>
                            <div class="IDcard">
                                <p class="text">身份证号:${arr[j].IDcard}</p>
                            </div>
                            <div class="phone">
                            <p class="text">手机号:${arr[j].phone}</p>
                        </div>
                        </div>
                        <div class="auditing-result2">
                            <p class="text-p">综合审核结果:</p>
                            <div class="pass-box">
                            <p class="pass yes">通过</p>
                            </div>
                        </div>
                    </div> 
                    </div>`
        if(arr[i].line == true){
            text +='<div class="line"></div>'            
        }else{
        text +=''
        }
        $('.content').append(text)
 }
})   
// $.ajax({
//     url,
//     data,
//     dataType:"json",
//     type,
//     success:function(data){
//        console.log(data)
//     },
//     error: function(xhr, type, errorThrown) {
//        //异常处理；
//        console.log(xhr);
//        console.log(type);
//    }
// })
   


