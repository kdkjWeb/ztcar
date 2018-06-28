$(function(){
    $(document).on("click","li",function(){
        window.location.href="honor.html"
        move()
    })
    $(document).on("click",".comeBack",function() {
        window.location.href = "occupation.html"
    })
    let arr=[
        {price:"20000以上"},
        {price:"12000-20000"},
        {price:"8000-12000"},
        {price:"5000-8000"},
        {price:"3000-5000"},
        {price:"3000以下"}
    ]
    for(let i = 0 ;i < arr.length ; i++) {
        $("ul").append(`<li>
            <div>
                <i class="iconfont icon-qianbao"></i>
                <p>${arr[i].price}</p>
            </div>
        </li>`)
        console.log(`${arr[i].price}`)
    }
   
})
