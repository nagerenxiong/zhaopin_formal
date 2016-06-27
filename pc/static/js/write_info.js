// 性别选择
$("button.checkbox").click(function(event) {
	$("button.checkbox").removeClass('active');
	$(this).addClass('active');
});
//验证须知
$(".notice1").click(function(event) {
        $(this).children('span').css('display', 'block');
        $(this).next().slideDown(200);
});
$(".notice1 span").click(function(event) {
    event.stopPropagation();
    $(this).css('display', 'none');
    $(this).parent().next().slideUp(200);
    
});
window.onload = function(){
    BusinessulControls("businessulDiv", "", "",
        'width:100%;font-size:14px;');
}

done=function(){
    if($(".scyyzz p").length<1)
        $(".scyyzz").append('<p>已上传：</p>')
    $(".scyyzz").append('<p style=\"padding-left:50px;\">'+file_name+'</p>');
}

// $(".scyyzz img").click(function(){
//     var uploader=new Uploader();
//     uploader.open({
//         tipSize: '10MB', //上传大小限制，单位MB,KB
//         tipType: ['jpg', 'jpeg', 'png', 'gif', 'pdf'], //文件类型限制
//         fileType:5,  //上传文件类型：1 头像，2 简历，3 list,4 其他,5 临时文件
//         multi:false,//单个多个
//         node:"若从其它网站下载的excel简历，请将文件另存为.docx格式后上传",
//         success:function(file, data, response){
//             //file.name 上传文件名
//             //data 上传文件所在路径
//             $('#business_license').val(data);
// //            $("#uploadList").append("<li style='margin-top:10px;'>" + file.name + "&nbsp;&nbsp;<a href='"+ data + "' target='blank'>下载</a></li>");
//         }
//     });
// });

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
                    $("#scyyzz").css('background', 'url('+data.save_name+') no-repeat center center /100% 100%');
                },              
                'onSelectError': function(file, errorCode, errorMsg) {
                    alert("发生未知错误请重试")
                    console.log(errorMsg+""+errorCode)
                    
                },
                'itemTemplate': '<div id="${fileID}" class="uploadify-queue-item">\
            <span class="fileName">${fileName}</span><div class="uploadify-progress"><div class="uploadify-progress-bar"></div></div><span class="data"></span></div>'
                
            });
//判断账号是否存在
function judgeAccountExist(obj, type){
    var account = $.trim($(obj).val());
    if(account != ''){
        $.ajax({
            type: "POST",
            url: "/ajax_valid",
            data: {"param": account, "type": "account"},
            dataType: "text",
            success: function (data) {
                if(data != 'y'){
                    $(obj).val('');
                    $(obj).focus();
                    window.alert('输入的' + type + '已存在，请重新输入');
                }
            }
        })
    }
}
//判断企业名称是否存在
function judgeCompanyNameExist(obj){
    var company_name = $.trim($(obj).val());
    if(company_name == ''){
        window.alert('请输入企业名称', 4);
    }else{
        $.ajax({
            type: "POST",
            url: "/companyNameExist",
            data: {"company_name": company_name},
            dataType: "json",
            success: function (data) {
                if(data.status == '2'){
                    window.alert('该企业名称已存在，请重新输入');
                    $(obj).val('');
                    $(obj).focus();
                }
            }
        })
    }
}
//保存企业引导数据
function saveLeadCompany(obj){
    var pc_name = $('input[name="pc_name"]').val();
    if($.trim(pc_name) == ''){
        window.alert('请填写企业名称');
        $('input[name="pc_name"]').focus();
        return;
    }
    var user_name = $('#user_name').val();
    if($.trim(user_name) == ''){
        window.alert('请填写联系人姓名');
        $('#user_name').focus();
        return;
    }
    var business_license = $('#business_license').val();
    var phone = $('#phone').val();
    if(phone == ''){
        window.alert('请填写手机号码');
        $('#phone').focus();
        return;
    }else if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(phone))){
        window.alert('你输入的手机号码格式不正确，请重新输入');
        $('#phone').focus();
        return;
    }
    var email = $('#email').val();
    if(email == ''){
        window.alert('请填写简历接收邮箱');
        $('#email').focus();
        return;
    }else if(!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)){
        window.alert('你输入的邮箱格式不正确，请重新输入');
        $('#email').focus();
        return;
    }
    var business = $('#business').val();
    if(business == ''){
        window.alert('请选择所属行业');
        return;
    }
    var location = $('#location').val();
    if(location == ''){
        window.alert('请填写企业所在区域');
        return;
    }
    $(obj).addClass('load_btn').attr('disabled', 'true');
    $.ajax({
        type: "POST",
        url: "/system/saveLeadCompany",
        data: {"pc_name": pc_name, "user_name": user_name, "business_license": business_license, "phone": phone,
                "email": email, "business": business, "location": location},
        dataType: "json",
        success: function (data) {
            if(data.msg == 'success'){
                window.alert('保存成功');
                window.location = '/jobs/account/new_qygl';
            }else{
                window.alert(data.msg);
                $(obj).removeClass('load_btn').removeAttr('disabled');
            }
        }
    })
}

