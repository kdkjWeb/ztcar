$(function(){
    $(".service").on("click",function(){
        $(".product").fadeIn()
        $(".application").fadeOut()
        $(".msg").fadeOut()
    })
    $(".want").on("click",function(){
    //   if(){
    //     $(".application").fadeIn()
    //     $(".product").fadeOut()
    //     $(".msg").fadeOut()
    //   }else{
    //     $(".applicationD").fadeIn()
    //     $(".product").fadeOut()
    //     $(".msgD").fadeOut()
    //   }
        $(".application").fadeIn()
        $(".product").fadeOut()
        $(".msg").fadeOut()
    })
    $(".personal").on("click",function(){
        // if(){
        //     $(".msgD").fadeIn()
        //     $(".applicationD").fadeOut()
        //     $(".product").fadeOut()
        // }else{
        //     $(".msg").fadeIn()
        //     $(".application").fadeOut()
        //     $(".product").fadeOut()
        // }
            $(".msg").fadeIn()
            $(".application").fadeOut()
            $(".product").fadeOut()
        
    })
})