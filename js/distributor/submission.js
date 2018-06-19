//$.weui = {};
//$.weui.alert = function(options) {
//  options = $.extend({
//      title: '警告',
//      text: '警告内容'
//  }, options);
//  var $alert = $('.weui_dialog_alert');
//  $alert.find('.weui_dialog_title').text(options.title);
//  $alert.find('.weui_dialog_bd').text(options.text);
//  $alert.on('touchend click', '.weui_btn_dialog', function() {
//      $alert.hide();
//  });
//  $alert.show();
//};

$(function() {
    $(".photo").on("click",function(){
        $(this).hide();
        $(this).siblings(".up-load").show();
    })
    // 少于12万和大于12万切换
    $('#less12').click(function() {
        $('#more12').removeClass('icon-danxuan').addClass('icon-danxuan2');
        $(this).removeClass('icon-danxuan2').addClass('icon-danxuan');
        $(".more12").hide();
        $(".less12").show();
    })
    
    $('#more12').click(function() {
        $('#less12').removeClass('icon-danxuan').addClass('icon-danxuan2');
        $(this).removeClass('icon-danxuan2').addClass('icon-danxuan');
        $(".more12").show();
        $(".less12").hide()
    })

    // 允许上传的图片类型  
    var allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    // 1024KB，也就是 1MB  
    var maxSize = 1024 * 1024;
    // 图片最大宽度  
    var maxWidth = 300;
    // 最大上传图片数量  
    var maxCount = 6;
    $('.js_file').on('change', function(event) {
        var files = event.target.files;

        // 如果没有选中文件，直接返回  
        if (files.length === 0) {
            return;
        }

        for (var i = 0, len = files.length; i < len; i++) {
            var file = files[i];
            var reader = new FileReader();

            // 如果类型不在允许的类型范围内  
            if (allowTypes.indexOf(file.type) === -1) {
                $.weui.alert({
                    text: '该类型不允许上传'
                });
                continue;
            }

            if (file.size > maxSize) {
                $.weui.alert({
                    text: '图片太大，不允许上传'
                });
                continue;
            }

            if ($('.weui_uploader_file').length >= maxCount) {
                $.weui.alert({
                    text: '最多只能上传' + maxCount + '张图片'
                });
                return;
            }

            reader.onload = function(e) {
                var img = new Image();
                img.onload = function() {
                    // 不要超出最大宽度  
                    var w = Math.min(maxWidth, img.width);
                    // 高度按比例计算  
                    var h = img.height * (w / img.width);
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 设置 canvas 的宽度和高度  
                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);
                    var base64 = canvas.toDataURL('image/png');

                    // 插入到预览区  

                    // 此处新增一个关闭图标
                    var $preview = $('<li class="weui_uploader_file weui_uploader_status" style="background-image:url(' + base64 + ')">'
                    +'<div class="weui_uploader_status_content">0%</div><i class="iconfont icon-guanbi" id="closer"><i></li>');
                    $('.weui_uploader_files').append($preview);
                    var num = $('.weui_uploader_file').length;
                    $('.js_counter').text(num + '/' + maxCount);

                    // 然后假装在上传，可以post base64格式，也可以构造blob对象上传，也可以用微信JSSDK上传  
					
                    var progress = 0;

                    function uploading() {
                        if (progress < 100) {
                        	
                            setTimeout(uploading, 30);
                            progress = progress+1;
                            $preview.find('.weui_uploader_status_content').text(progress);
                            console.log($preview.find('.weui_uploader_status_content').text())
                        } else {
                            // 如果是失败，塞一个失败图标  
                            //$preview.find('.weui_uploader_status_content').html('<i class="weui_icon_warn"></i>');  
                            $preview.removeClass('weui_uploader_status').find('.weui_uploader_status_content').remove();
                        }
                    }
                    setTimeout(uploading, 30);
                };

                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    $("#closer").on("click",function(){
        console.log("传附件大煞风景")
        $.confirm({
            title: '提醒',
            text: '是否删除？',
            onOK: function () {
              //点击确认
            },
            onCancel: function () {
            }
          });
    })


    $(".weui-btn").on("click",function(){
        window.location.href="carMsg.html"
    })
});