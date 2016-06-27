/**
 * Created by handsome King on 2015/10/15.
 */

$("head").append('<script src="/static/js/uploader/uploader.js" type="text/javascript"></script>');
// 上传不同的文件
function uploadDifferentFile(tipSize, tipType, fileType, multi, node, storageFileInputName, storageFileNameId){
    var uploader=new Uploader();
    uploader.open({
        tipSize: tipSize, //上传大小限制，单位MB,KB
        tipType: tipType, //文件类型限制
        fileType: fileType,  //上传文件类型：1 头像，2 简历，3 list,4 其他,5 临时文件
        multi: multi,//单个多个
        node: node,
        success:function(file, data, response){
            //file.name 上传文件名
            //data 上传文件所在路径
            $("#" + storageFileInputName).val(data);
            $("#" + storageFileNameId).empty();
            $("#" + storageFileNameId).append( file.name + "&nbsp;<span onclick='removeFileName(this," + storageFileInputName + ")' class='removeFileSpan' style='cursor: pointer;display: none;'>X</span>");
        },
        'onSelectError': function(file, errorCode, errorMsg) {
                     $("#node").text("图片不能超过"+CFG.tipSize);
                }
    });
    $("#" + storageFileNameId).hover(function(){
        $(this).find(".removeFileSpan").show();
    }, function(){
        $(this).find(".removeFileSpan").hide();
    })
}
$(function(){
$('#idCardPhoto').uploadify({
                'buttonClass': 'o_scbtn',
                'buttonText': '上传文件',
                'width': '80px',
                'height': '30px',   
                'multi':false,     
                'fileTypeExts': "*.jpg;*.gif;*.png;.jpeg;",
                'swf': '/static/js/uploader/uploadify.swf',
                'uploader': '/fileupload/',
                'cancelImg': 'uploadify-cancel.png',
                'auto': true,
                'queueSizeLimit':1,                
                'queueID': 'jdt',
                'onUploadStart': function(file) {
                    if(file.size/1000>1024*5){
                        alert("请上传规定尺寸或大小的身份证号");
                        return false;
                    }
                    $("#idCardPhoto").uploadify("settings", "formData", {
                        'fileType': 5
                    });
                },
                'onUploadSuccess': function(file, data, response) {
                    data = JSON.parse(data);
                    $("#id_card_photo").val(data.save_name);
                    if($(".sc0").length <=0){
                        $("#idCardPhoto").append('<p>已上传:</p>')
                        $("#idCardPhoto").append('<p class=\"sc_file sc0\" style=\"padding-left:50px;\">'+file.name+'</p>')
                    }else{
                        $(".sc0").text(file.name);
                    }
                },              
                'onSelectError': function(file, errorCode, errorMsg) {
                    alert("发生未知错误请重试") 
                }
                
            });
    $('#head_portraitSpan').uploadify({
                'buttonClass': 'o_scbtn',
                'buttonText': '上传文件',
                'width': '80px',
                'height': '30px',   
                'multi':false,     
                'fileTypeExts': "*.jpg;*.gif;*.png;.jpeg;",
                'swf': '/static/js/uploader/uploadify.swf',
                'uploader': '/fileupload/',
                'cancelImg': 'uploadify-cancel.png',
                'auto': true,
                'queueSizeLimit':1,                
                'queueID': 'jdt',
                'onUploadStart': function(file) {
                    if(file.size/1000>1024*5){
                        alert("请上传规定尺寸或大小的头像");
                        return false;
                    }
                    $("#head_portraitSpan").uploadify("settings", "formData", {
                        'fileType': 5
                    });
                },
                'onUploadSuccess': function(file, data, response) {
                    data = JSON.parse(data);
                    $("#head_portrait").val(data.save_name);
                    $("#head_portraitSpan").prev().attr('src', $("#head_portrait").val());
                },              
                'onSelectError': function(file, errorCode, errorMsg) {
                    alert("发生未知错误请重试");
                }
                
            });
     $('#businessLicenseSpan').uploadify({
                'buttonClass': 'o_scbtn',
                'buttonText': '上传文件',
                'width': '80px',
                'height': '30px',   
                'multi':false,     
                'fileTypeExts': "*.jpg;*.gif;*.png;.jpeg;",
                'swf': '/static/js/uploader/uploadify.swf',
                'uploader': '/fileupload/',
                'cancelImg': 'uploadify-cancel.png',
                'auto': true,
                'queueSizeLimit':1,                
                'queueID': 'jdt',
                'onUploadStart': function(file) {
                    if(file.size/1000>1024*5){
                        alert("请上传规定尺寸或大小的营业执照");
                        return false;
                    }
                    $("#businessLicenseSpan").uploadify("settings", "formData", {
                        'fileType': 5
                    });
                },
                'onUploadSuccess': function(file, data, response) {
                    data = JSON.parse(data);
                    $("#business_license").val(data.save_name);
                    if($(".sc1").length <=0){
                        $("#businessLicenseSpan").append('<p>已上传:</p>')
                        $("#businessLicenseSpan").append('<p class=\"sc_file sc1\" style=\"padding-left:50px;\">'+file.name+'</p>')
                    }else{
                        $(".sc1").text(file.name);
                    }
                },              
                'onSelectError': function(file, errorCode, errorMsg) {
                    alert("发生未知错误请重试")
                    console.log(errorMsg+""+errorCode)
                    
                }
                
            });
})
// 去除文件
function removeFileName(obj, inputId){
    $(obj).parent().empty();
    $(inputId).val('');
}

// 把文件从临时文件夹移动到真实目录下, 真实类型
function cutFileToRealPath(oldPath, fileType, $inputFileName) {
    //上传文件类型：1 头像，2 简历，3 list,4 其他,5 临时文件， 6 企业logo， 7 企业产品图片, 8 审核
    var newPath;
    if(fileType == 1) {
        newPath = 'uploadFile/tx/'
    } else if(fileType == 2) {
        newPath = 'uploadFile/jl/'
    } else if(fileType == 3) {
        newPath = 'uploadFile/list/'
    } else if(fileType == 4) {
        newPath = 'uploadFile/other/'
    } else if(fileType == 5) {
        newPath = 'uploadFile/temp/'
    } else if(fileType  == 6) {
        newPath = 'uploadFile/logo/'
    } else if(fileType == 7) {
        newPath = 'uploadFile/product/'
    } else if(fileType == 8) {
        newPath = 'uploadFile/audit/'
    }

    oldPath = oldPath.substr(1, oldPath.length - 1);
    var pathArray = oldPath.split('/');
    var fileName = '';

    for(var i = 2; i < pathArray.length; i++) {
        if(fileName == '')      fileName += pathArray[i];
        else                    fileName += '/' + pathArray[i]
    }
    newPath = newPath + fileName;
//    var pathArray = oldPath.split('temp/');
//    var fileName = pathArray[1];
//    newPath += fileName;
    $.ajax({
        async: false,
        type: "post",
        url: "/ajax_cutFileToNewPath",
        data: {'oldPath': oldPath, "newPath": newPath},
        dataType: "json",
        success: function(data) {
            if(data == '1') {
//                alert("成功");
                // 将新的文件路径放入输入框
                $inputFileName.val( '/' + newPath);
            } else {
//                alert("失败!");
            }
        }
   })
}