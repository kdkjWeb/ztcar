$(function(){
    let arr=[{
        name:"刘世桂",
        phone:"13580392179",
        money:"55555555.00",
        box:"选择产品"
    },{
        name:"刘世桂",
        phone:"13580392179",
        money:"11111111.00",
        box:"完善信息"
    },{
        name:"刘世桂",
        phone:"13580392179",
        money:"333333.00",
        box:"提交放款后资料"
    }]
    $.each(arr,function(index,el){
        $(".content").append(` <div class="list">
        <div class="c-list">
            <div class="basic-msg">
                <div class="basic">
                    <p class="name">${el.name}</p>
                    <p class="phone">${el.phone}</p>
                </div>
                <div class="credit">
                    <label>贷款金额：</label>
                    <span>${el.money}</span>
                </div>
            </div>
            <div class="btn">
                <div class="choose">
                    <p>${el.box}</p>
                </div>
                <div class="cancel">
                    <p>订单取消</p>
                </div>
            </div>
        </div>
        <div class="line"></div>
    </div>`)
    })
    $(".cancel").on("click",function(){
        $(".pop-box").show();
        $(this).parents('.list').addClass('active');
    })
    $("#yes").on("click",function(){
      $(".pop-box").hide();
        $('.active').hide(); 
       })
    $("#no").on("click",function(){
        $(".pop-box").hide();
        $('.active').removeClass('active');
    })
    $(".choose").on("click",function(){
        window.location.href="flow.html"
    })
})