$(function() {
    var listJson = [];
    var importId = GetRequest().id;
    var data = {
        id: importId
    }
    console.log(data)
    $.ajax({
        url: path + "/SmRepaymentRecord/selectListByRepaymentRecordVo",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: "post",
        success: function(data) {
            if(data.code == 0) {
                if(data.data) {
                    listJson = data.data.list
                    repay(listJson)
                }
            }
        },
        error: function(xhr,type,errorThrown) {
            console.log(xhr);
            console.log(type)
        }
    })
})


function repay(arr) {
    for(let i = 0;i < arr.length;i++) {
     $("table").append(
        '<tr>'+
            '<td>'+ getDays(arr[i].repaymentMoth)+'</td>'+
            '<td>'+ arr[i].totalLoan+'</td>'+
            '<td>'+ arr[i].deadlinesId+'</td>'+
        '</tr>')
     }
 }
