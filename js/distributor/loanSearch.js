$(function() {
    var listJson = [];
    var importId = GetRequest().id;
    console.log(importId)
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
            console.log(data)
            if(data.code == 0) {
                if(data.data) {
                    listJson = data.data.list
                    loan(listJson)
                }
            }
        },
        error: function(xhr,type,errorThrown) {
            console.log(xhr);
            console.log(type)
        }
    })
})


function loan(arr) {
    for(let i = 0;i < arr.length;i++) {
     $("table").append(
        '<tr>'+
            '<td>'+ arr[i].borrowerName +'</td>'+
            '<td>'+ getDays(arr[i].loanMoth) +'</td>'+
            '<td>'+ arr[i].loanProduct +'</td>'+
            '<td>'+ arr[i].totalLoan +'</td>'+
            '<td>'+ arr[i].deadlinesId +'</td>'+
        '</tr>')
     }
    
 }
