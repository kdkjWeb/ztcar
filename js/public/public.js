$(function(){
    $(document).on("click","li",function(){
        window.location.href="housing.html"
    })
    $(document).on("click",".comeBack",function() {
        console.log("但是")
        // window.location.reload()
        window.location.href = "social.html"
    })
    let arr=[
        {public:"有公积金"},
        {public:"无公积金"}
    ]
    for(let i = 0;i<arr.length; i++) {
        $("ul").append(` <li>
        <div>
            <i class="iconfont icon-zufang"></i>
            <p>${arr[i].public}</p>
        </div>
    </li>`)
        console.log(`${arr[i].public}`)
    }
})