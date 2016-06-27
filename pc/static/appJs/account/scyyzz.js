/**
 * Created by xk on 2015/10/16.
 */
$('#scyyzz').uploadify({
                'buttonClass': 'uploader_btn',
                'buttonText': '',
                'width': '284px',
                'height': '177px',
                'multi':false,
                'fileTypeExts': "*.jpg;*.gif;*.png;",
                'swf': '/static/js/uploader/uploadify.swf',
                'uploader': '/fileupload/',
                'cancelImg': 'uploadify-cancel.png',
                'auto': true,
                'queueSizeLimit':1,
                'queueID': 'uploader_jdt_box',
                'onUploadStart': function(file) {
                        $("#scyyzz").uploadify("settings", "formData", {
                            'fileType': 5
                        });
                        
                },
                'onUploadSuccess': function(file, data, response) {
                    data = JSON.parse(data);
                    $("#business_license").val(data.save_name);
                    // if($(".sc_file").length <=0){
                    //     $("#scyyzz").after('<p>已上传:</p><p class=\"sc_file\" style=\"padding-left:50px;\">'+file.name+'</p>');
                    // }else{
                    //     $(".sc_file").text(file.name);
                    // }
                    $("#scyyzz").css('background', 'url('+data.save_name+') no-repeat center center /100% 100%');
                    
                },
                'onSelectError': function(file, errorCode, errorMsg) {
                    alert("发生未知错误请重试")
                    console.log(errorMsg+""+errorCode)
                },
                'itemTemplate': '<div id="${fileID}" class="uploadify-queue-item">\
            <span class="fileName">${fileName}</span><div class="uploadify-progress"><div class="uploadify-progress-bar"></div></div><span class="data"></span></div>'

            });

function saveCompanyLicense(){
    var pc_id = $('#pc_id').val();
    var business_license = $('#business_license').val();
    if($.trim(business_license) == ''){
        window.alert('请上传公司营业执照副本');
        return;
    }
    $(".o_btn").attr('disabled', 'true').addClass('load_btn');
    $.ajax({
        type: "POST",
        url: "/ajax_saveCompanyLicense",
        data: {"business_license": business_license, "pc_id": pc_id},
        dataType: "json",
        success: function (data) {
            if(data.status = '1'){
                window.alert('您的申请已成功提交，请耐心等待审核');
                window.location = '/account/new_qygl';
                
            }else{
                window.alert('登录超时，请重新登录');
            }
            $(".o_btn").removeClass('load_btn').css('background', '#CCC');
        }
    })
}