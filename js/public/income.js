$(function(){
    $(document).on("click","li",function(){
        window.location.href="honor.html"
    })
    $(document).on("click",".comeBack",function() {
        console.log("但是")
        // window.location.reload()
        window.location.href = "occupation.html"
    })
    let arr=[
        {price:"2000及以下"},
        {price:"2001-5000"},
        {price:"5001-8000"},
        {price:"8001-10000"},
        {price:"10001-12000"},
        {price:"12000以上"}
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
