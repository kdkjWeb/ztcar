$(function(){
    $(document).on("click","li",function(){
        window.location.href="measureResult.html"
    })
    $(document).on("click",".comeBack",function() {
        console.log("但是")
        // window.location.reload()
        window.location.href = "public.html"
    })
    let arr=[
        {housing:"自有全款"},
        {housing:"自有贷款"},
        {housing:"租房"}
    ]
    for(let i = 0;i<arr.length; i++) {
        $("ul").append(` <li>
        <div>
            <i class="iconfont icon-fangzi"></i>
            <p>${arr[i].housing}</p>
        </div>
    </li>`)
        console.log(`${arr[i].housing}`)
    }
})