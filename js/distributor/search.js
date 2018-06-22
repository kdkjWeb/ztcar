$(function(){

    var listJson = {};
    var important = 1;

    $(".weui-btn").on("click",function(){
        let name=$("#name").val()
        let date=$("#date").val()
        if(isName(name,"承租人")==false){
            return false
        }else if(isDate(date,"承租人")==false){
            return false
        }else{
           return true
        }
    })

})
function getUserVal() {
    let data = {
        id = 1
    }

    $.ajax({
        url:path,
        data:JSON.stringify(data),
        dataType:"json",
        contentType:"application/json",
        type:"post",
        success: function(data) {
            console.log(data);
            if(data.code ==0) {
                if(data.data) {
                    listJson = data.data;
                    if(listJson) {}
                }
           
            }
        },
        error: function(xhr,type,errorThrown) {
            console.log(xhr);
            console.log(type)
        }
    })
    
}