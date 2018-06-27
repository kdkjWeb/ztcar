$(function(){
    $(document).on("click", "li",function(){
        window.location.href="public.html"
    })
    $(document).on("click",".comeBack",function() {
        console.log("但是")
        // window.location.reload()
        window.location.href = "honor.html"
    })
    let arr=[
        {social:"本地社保"},
        {social:"非本地社保"}
    ]
    for(let i = 0;i<arr.length; i++) {
        $("ul").append(`<li>
        <div>
            <i class="iconfont icon-bao3"></i>
            <p>${arr[i].social}</p>
        </div>
    </li>`)
        console.log(`${arr[i].social}`)
    }
})