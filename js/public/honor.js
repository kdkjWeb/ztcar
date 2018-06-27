$(function(){
    $(document).on("click","li",function(){
        window.location.href="social.html"
    })
    $(document).on("click",".comeBack",function() {
        console.log("但是")
        // window.location.reload()
        window.location.href = "income.html"
    })

    let arr=[
        {honor:"信用良好"},
        {honor:"少数逾期"},
        {honor:"长期多次逾期"},
        {honor:"无信用记录"},
    ]
    for(let i = 0;i<arr.length; i++) {
        $("ul").append(` <li>
        <div>
            <i class="iconfont icon-iconset0292"></i>
            <p>${arr[i].honor}</p>
        </div>
    </li>`)
        console.log(`${arr[i].honor}`)
    }
})