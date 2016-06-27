function o_next(x) { //切换步骤 1-3
    $(".cont>div").css('display', 'none');
    $(".cont>div").eq(x - 1).css('display', 'block');
    $(".step li").removeClass('active'); //上方步骤样式改变
    $(".step li").eq(x - 1).addClass('active');
    $(".step em").css('left', (x - 1) * 324 + "px");
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
// 第一步保存start
$(".write_info .next").click(function(event) {
    $(".hint").css('visibility', 'hidden');
    var _this = $(this);
    var company_name = $.trim($("#company_name").val());
    if (company_name == "") {
        alert('请填写企业名称',4);
        $("#company_name").focus();
        return false;
    }
    var company_phone = $.trim($("#company_phone").val());
    if (company_phone == "") {
        alert('请填写企业座机',4);
        $("#company_phone").focus();
        return false;
    }
    var reg1 = /^0?(10|(2|3[1,5,7]|4[1,5,7]|5[1,3,5,7]|7[1,3,5,7,9]|8[1,3,7,9])[0-9]|91[0-7,9]|(43|59|85)[1-9]|39[1-8]|54[3,6]|(701|580|349|335)|54[3,6]|69[1-2]|44[0,8]|48[2,3]|46[4,7,8,9]|52[0,3,7]|42[1,7,9]|56[1-6]|63[1-5]|66[0-3,8]|72[2,4,8]|74[3-6]|76[0,2,3,5,6,8,9]|82[5-7]|88[1,3,6-8]|90[1-3,6,8,9])\d{7,8}$/;
    if(reg1.test(company_phone) == false) {
        alert('企业座机填写不合法',2);
        $("#company_phone").focus();
        return false;
    }
    var logo = $.trim($("#qylogo").val());
    if(logo == ""){
        $("#qylogo").parent().next().children('span').css('visibility', 'visible');
        return false;
    }
    var reg2 = /[.](JPG|JPEG|PNG|GIF|BMP)$/;
    if (reg2.test(logo.toUpperCase()) == false) {
        alert("企业logo不合法!",2);
        return false;
    }
    if(logo.indexOf('uploadFile') < 0) {
        // 将图片上传到 临时 目录
        logo = editResumenInfo(logo);
    }
    var old_logo = $("#old_logo").val();
    $.ajax({
        type: 'post',
        data: {
            'company_name': company_name,
            'company_phone': company_phone,
            'logo': logo,
            'old_logo': old_logo
        },
        url: '/ajax_headhuntSaveCompanyStep1',
        dataType: 'json',
        success: function(data) {
            if (data == 1) {

                o_next(2); //第二步显示
            } else {
                layer.msg("保存失败");
            }
        }
    })
});

// 第二步保存start
$(".scyyzz .next").click(function(event) {
    var business_license = $("#business_license").val();
    if(business_license == ""){
        alert("请上传营业执照",2);
        return false;
    }
    var reg2 = /[.](JPG|JPEG|PNG|GIF|BMP)$/;
    if (reg2.test(business_license.toUpperCase()) == false) {
        alert("营业执照不合法!",2);
        return false;
    }
    if(business_license.indexOf('uploadFile') < 0) {
        // 将图片上传到 临时 目录
        business_license = editResumenInfo(business_license);
    }
    var old_business_license = $("#old_business_license").val();
    $.ajax({
        type: 'post',
        data: {
            'business_license': business_license, 'old_business_license': old_business_license
        },
        url: '/ajax_headhuntSaveCompanyStep2',
        dataType: 'json',
        success: function(data) {
            if (data == 1) {

                o_next(3); //第三步显示
            } else {
                layer.msg("网络异常，请重试");
            }
        }
    })
});
// 第二步保存end


//上传图片start
var _photo; //当前触发xiuxiu的元素 img元素

function open_tx(obj, xz) {
    _photo = $(obj).children('img');
    //上传企业LOGO配置
    if (xz != 1) {
        xiuxiu.setLaunchVars("maxFinalWidth", 148);
        xiuxiu.setLaunchVars("maxFinalHeight", 148);
        layer.open({
            type: 1,
            title: '上传企业LOGO',
            area: ['900px', '550px'],
            shadeClose: true, //点击遮罩关闭
            skin:'o_xiuxiu',
            btn:[''],
            content: $("#c_logo"),
            success: function() {
                xiuxiu.embedSWF("photoBox1", 5, "100%", "450px", "a1"); //编辑器类型（1为轻量编辑，2为轻量拼图，3为完整版，5为头像编辑器，默认值1）
                xiuxiu.onBeforeUpload = function(data) {
                    var size = data.size;
                    if (size > 1 * 1024 * 1024) {
                        alert("图片不能超过1M",2);
                        return false;
                    }
                    return true;
                };

            }
        });
    }
    //上传企业营业执照配置
    else {
        xiuxiu.setLaunchVars("maxFinalWidth", 284);
        xiuxiu.setLaunchVars("maxFinalHeight", 177);
        layer.open({
            type: 1,
            title: '上传营业执照',
            area: ['900px', '550px'],
            shadeClose: true, //点击遮罩关闭
            content: $("#c_yyzz"),
            success: function() {
                xiuxiu.embedSWF("photoBox2", 5, "100%", "450px", "a2"); //编辑器类型（1为轻量编辑，2为轻量拼图，3为完整版，5为头像编辑器，默认值1）
                xiuxiu.onBeforeUpload = function(data) {
                    var size = data.size;
                    if (size > 5 * 1024 * 1024) {
                        alert("图片不能超过5M",2);
                        return false;
                    }
                    return true;
                };



            }
        });
    }
}


// 上传图片
function editResumenInfo(imgURL) {
    var returnUrl = '';
    $.ajax({
        async: false,
        type: "POST",
        url: "/jobs/account/ajax_personalHeadPortrait",
        data: {
            "imgURL": imgURL,
            "fileType": 5
        },
        dataType: "json",
        success: function(data) {
            if (data.status == "1") {
                returnUrl = data.head_portrait;
            }
        }
    });
    return returnUrl;
}

/*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
//修改为您自己的图片上传接口
xiuxiu.setUploadURL("http://web.upload.meitu.com/image_upload.php");
xiuxiu.setUploadType(2);
xiuxiu.setUploadDataFieldName("upload_file");
xiuxiu.onInit = function() {
    xiuxiu.loadPhoto(); //修改为要处理的图片url
};
xiuxiu.onUploadResponse = function(data) {
    var imgData = $.parseJSON(data);
    var imgURL = $(imgData)[0].original_pic; //图片网络路径
    _photo.attr('src', imgURL);
    _photo.next().val(imgURL);
    layer.closeAll();
};
//上传图片end


// 第二步上传营业执照start
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
                    alert("发生未知错误请重试",2)
                    console.log(errorMsg+""+errorCode)

                },
                'itemTemplate': '<div id="${fileID}" class="uploadify-queue-item">\
            <span class="fileName">${fileName}</span><div class="uploadify-progress"><div class="uploadify-progress-bar"></div></div><span class="data"></span></div>'

            });
// 第二步上传营业执照end
if($("#business_license").attr('value') !=""){
    $("#scyyzz-button").append('<img src='+$("#business_license").attr("value")+'>');}
