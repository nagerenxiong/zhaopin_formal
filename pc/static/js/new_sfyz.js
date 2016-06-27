// 根据认证状态显示模块
var audit_result = $(".audit_result").val();
if (audit_result == 3) {
    o_next(3)
} else if (audit_result == 2) {
    o_next(2);
}

// 却换步骤 1-3   start
function o_next(x) {
    $("div.c").css('display', 'none');
    $("div.c").eq(x - 1).css('display', 'block'); //下一步显示
    $(".step li").removeClass('active'); //上方样式改变
    $(".step li").eq(x - 1).addClass('active');
    $(".step em").css('left', (x - 1) * 326 + 'px');
}
// 切换步骤end

// 真正提交验证信息
function doSubmitAuditInfo(id_card_photo, head_portrait) {
    $(".success").attr('disabled', 'disabled').addClass('load_btn');
    var id_card_photo_old = $(".old_id_card_photo").val();
    var head_portrait_old = $(".old_head_portrait").val();
    // 从美图秀秀图片中考到临时目录
    if(id_card_photo != id_card_photo_old)        id_card_photo = editResumenInfo(id_card_photo);
    if(head_portrait != head_portrait_old)        head_portrait = editResumenInfo(head_portrait);

    var real_name = $.trim($(".real_name").val());
    var $id_card = $(".id_card");
    $.ajax({
        type: "POST",
        url: "/ajax_perfectHunterInfo",
        data: {
            "real_name": real_name,
            "id_card": $id_card.val(),
            "id_card_photo": id_card_photo,
            "head_portrait": head_portrait,
            'id_card_photo_old': id_card_photo_old,
            'head_portrait_old': head_portrait_old
        },
        dataType: "json",
        success: function(data) {
            if (data == 1) {
                o_next(2);
                layer.msg("用户更新信息提交完毕!");
            } else if (data == 2) {
                $(".userNameSpan").text(real_name);
                $(".idCardSpan").text($id_card.val());
                $(".idCardPhotoimg").attr('src', id_card_photo);
                $(".userheadPortrait").attr('src', head_portrait);
                o_next(3);
                layer.msg("用户信息更新成功");
            } else {
                layer.msg("用户信息提交失败!")
            }
            $(".success").removeAttr('disabled').removeClass('load_btn');
        }
    });
}

// 弹框配置start
function qrxg_zl(id_card_photo, head_portrait) {
    layer.open({
        type: 1,
        area: ['500px', 'auto'],
        title: "提交资料确认",
        fix: true, //不固定
        maxmin: false,
        skin: 'jjr_xgzl',
        closeBtn: "1",
        moveOut: false,
        content: $("#qrxg_zl"),
        success: function(layero, index) {
            $(".success").click(function(event) {
                layer.close(index);
                doSubmitAuditInfo(id_card_photo, head_portrait);
            });
            $(".canel").click(function(event) {
                layer.close(index);
            });
        }
    });
}
// 弹框配置end



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

// 提交身份验证
$(":button[name=submitPerfectInfo]").click(function() {
    $(".hint").css('visibility', 'hidden');
    var real_name = $.trim($(".real_name").val());
    if (real_name == '') {
        $("#name").next(".hint").css('visibility', 'visible');
        return false;
    }

    var $id_card = $(".id_card");
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if ($.trim($id_card.val()) == "") {
        $("#sfzh").next(".hint").text('请填写身份证号码').css('visibility', 'visible');
        return false;
    }

    if (reg.test($.trim($id_card.val())) == false) {
        $("#sfzh").next(".hint").text('请填写正确的身份证号码').css('visibility', 'visible');
        $id_card.val($id_card[0].defaultValue);
        return false;
    }
    // 身份证照片
    var $id_card_photo = $(".id_card_photo");
    var id_card_photo = $id_card_photo.val();
    var reg2 = /[.](JPG|JPEG|PNG|GIF|BMP)$/;
    if (reg2.test(id_card_photo.toUpperCase()) == false) {
        $(".id_card_photo").siblings('.dib').children('.hint').css('visibility', 'visible');
        $id_card_photo.val($id_card_photo[0].defaultValue);
        return false;
    }

    // 头像
    var $head_portrait = $(".head_portrait");
    var head_portrait = $head_portrait.val();
    if (reg2.test(head_portrait.toUpperCase()) == false) {
        $(".head_portrait").siblings(".dib").children('.hint').css('visibility', 'visible');
        $head_portrait.val($head_portrait[0].defaultValue);
        return false;
    }
    //确认弹框出现
    qrxg_zl(id_card_photo, head_portrait);

});


// 更新用户信息,给输入框赋值
function updateUserInfo() {
    $(".real_name").val($.trim($(".userNameSpan").text()));
    $(".id_card").val($.trim($(".idCardSpan").text()));
    // 身份证照片

    $("#sfz_pic").attr('src', $(".idCardPhotoimg").attr("src"));
    $(".id_card_photo").val($(".idCardPhotoimg").attr('src'));
    $(".old_id_card_photo").val($(".idCardPhotoimg").attr('src'));
    // 头像
    $("#tx_pic").attr('src', $(".userheadPortrait").attr('src'));
    $(".head_portrait").val($(".userheadPortrait").attr('src'));
    $(".old_head_portrait").val($(".userheadPortrait").attr('src'));
    o_next(1);
}



var _photo;
/*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
//修改为您自己的图片上传接口
xiuxiu.setUploadURL("http://web.upload.meitu.com/image_upload.php");
xiuxiu.setUploadType(2);
xiuxiu.setUploadDataFieldName("upload_file");
xiuxiu.setLaunchVars("cropPresets", "8:5")
xiuxiu.embedSWF("photoBox1", 5, "100%", "450px","a1"); //
xiuxiu.setLaunchVars("cropPresets", "1:1")
xiuxiu.embedSWF("photoBox2", 5, "100%", "450px","a2");
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


function open_tx(obj, xz) {
    _photo = $(obj);
    if (xz == 1) {

        layer.open({
            type: 1,
            title: '上传头像',
            area: ['900px', '550px'],
            shadeClose: true, //点击遮罩关闭
            skin:'o_xiuxiu',
            btn:[''],
            content: $("#tx1"),
            success: function() {
                xiuxiu.onBeforeUpload = function(data) {
                    var size = data.size;
                    var type = data.type;
                    if (size > 1 * 1024 * 1024) {
                        alert("图片不能超过1M");
                        return false;
                    }
                    if(type != "jpg" && type != "jpeg" && type != "png" && type != "gif" ){
                        alert("请选择正确格式的图片",4)
                        return false;
                    }
                    return true;
                };
            }
        });
    } else {
        layer.open({
            type: 1,
            title: '上传真实头像',
            area: ['900px', '550px'],
            shadeClose: true, //点击遮罩关闭
            skin:'o_xiuxiu',
            btn:[''],
            content: $("#sfz1"),
            success: function() {
                xiuxiu.onBeforeUpload = function(data) {
                    var size = data.size;
                    var type = data.type;
                    if (size > 5 * 1024 * 1024) {
                        alert("图片不能超过5M");
                        return false;
                    }
                    if(type != "jpg" && type != "jpeg" && type != "png" && type != "gif" ){
                        alert("请选择正确格式的图片",4)
                        return false;
                    }
                    return true;
                };
            }
        });
    }


}