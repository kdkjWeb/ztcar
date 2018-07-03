$(function() {
    var importId = GetRequest().id;
     var data1 = {
         id: importId,
     };
     $.ajax({
         url: path + "/SmInformation/findOneById",
         data: data1,
         dataType: "json",
         contentType: "application/json",
         type: "get",
         success: function(data) {
             console.log(data)
             if(data.code == 0) {
                 if(data.data) {
                    result(data.data)
                 }
             }
         },
         error: function(xhr,type) {
             console.log(xhr);
             console.log(type)
         }
     })

     function result(obj) {
         var time = (obj.createTime).split(' ')[0];
         var text = ""
          text += '<h3>'+ obj.informationName +'</h3>'+
         '<div class="tit">'+
             '<p class="date">'+time+'</p>'+
             '<div class="author">'+
                 '<p>作者：</p>'+
                 '<p>'+ obj.createName +'</p>'+
             '</div>'+
         '</div>'+
         '<img src="'+ path + obj.showFile +'" alt="">'+
         '<div class="main">'+
             '<p>'+ obj.text +'</p>'+
         '</div>'
         $(".content").append(text)
     }
})