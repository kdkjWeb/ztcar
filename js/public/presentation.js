$(function() {
    var listJson = []
    getValue()

    $(document).on("click",".list-c",function() {
        var id = $(this).attr("titleId")
        console.log(id)
        window.location.href = "pDetail.html?id="+id
    })
   
    function getValue(arr) {
        let data = {}
        $.ajax({
            url: path + "/SmInformation/query",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            type: "post",
            success: function(data) {
                console.log(data)
                if(data.code == 0) {
                    if(data.data) {
                        listJson = data.data.list
                        ary(listJson)
                    }
                }
            },
            error: function(xhr,type) {
                console.log(xhr);
                console.log(type);
            }
        })
    }
    function ary(arr){
        var text = "";
        for(let i = 0;i < arr.length;i++) {
            text += '<div class="list-c" titleId='+arr[i].id+'>'+
            '<div class="mask"></div>'+
            '<div class="text">'+
                '<p >' + arr[i].informationName + '</p>'+
            '</div>'+
            '<img src=" ' +path+arr[i].showFile +'">'+
       '</div>'
        }
        $(".list").html(text)
    }
})