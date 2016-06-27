$(function () {
// 角色选择start
    $(".role>li").click(function (event) {
        $(".role>li").removeClass('active').css("borderColor", "#e0e0e0");
        $(this).addClass('active').css('borderColor', '#5C91D9');
    });
// 角色选择end
//本周许愿树start
    var num = "54789";
    var numList = num.split("");
    var i = numList.length;
    $.each(numList, function (i, e) {
        $("#num_box").append('<span class="active">0</span>');
    })
    function each_list() {
        i--;
        if (i < 0) {
            return;
        }
        addNum(i);

    }

    function addNum(i) {
        var j = 0;
        var numTimer = setInterval(function () {
            j++;
            if (j > numList[i]) {
                each_list();
                clearInterval(numTimer);
            }
            else {
                $("#num_box span:eq(" + i + ")").html(j);
            }
        }, 80)
    }

    each_list();
//本周许愿树end


});
function register() {
    $(".form li").each(function (index, el) {
        if ($(this).children('input').val() == "") {
            $(this).children('input').focus().siblings('span').css('display', 'inline-block');
            return false;
        } else {
            $(this).children('span').css('display', 'none');
        }
    });
    var account_type = $('input[name="account_type"]').val();
    if (account_type == '') {
        window.alert('请选择注册身份', 4);
        return false;
    }
    if($.trim($('.index3').text()) != ''){
        alert('您输入的密码不一致，请重新输入', 2);
        return false;
    }
    var reg = /^1[0-9]{10}$/;
    var account = $.trim($("#account").val());
    var code = $('input[name="code"]').val();
    if (reg.test(account)) {
        if($('.o_yzm').val() == ''){
            alert('请获取验证码', 4);
            return false;
        }
        if ($.trim(code) == '') {
            alert('请输入验证码', 4);
            return false;
        }
    }
    var flag = $(".Validform_wrong").length;
    if (flag > 0) {
        $("#account").focus();
        return false;
    }
    var password = $('#password').val();
    var oauthType = $('#oauthType').val();
    var oauthId = $('#oauthId').val();
    var oauthName = $('#oauthName').val();
    bindingAccount(0, account, password, account_type, oauthType, oauthId, oauthName, code);
    return false;
}
//注册按钮点击验证处理end
// 手机注册显示发送验证码start
$(".account").keydown(function (event) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test($(".account").val())) {
        $(".c").stop(true, false).animate({height: '340px'}, 200, function () {
            $(".security").slideDown(200);
        });
    } else {

        $(".security").slideUp(200);

    }
});
$(".account").keyup(function (event) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test($(".account").val())) {

        $(".c").stop(true, false).animate({height: '340px'}, 200, function () {
            $(".security").stop(true, false).slideDown(200);
        });
    } else {

        $(".security").stop(true, false).slideUp(200);

    }

});
$(".account").blur(function (event) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test($(".account").val())) {
        $(".c").stop(true, false).animate({height: '340px'}, 200, function () {
            $(".security").stop(true, false).slideDown(200);
        });
    } else {

        $(".security").stop(true, false).slideUp(200);

    }
});
// 手机注册显示发送验证码end
$(document).ready(function () {
    $(".registed").Validform({tiptype: 2});
});
function changeRegistType(type) {
    $('input[name="account_type"]').val(type);
}
var countdown;
function smsValidation(event, obj) {
    event.preventDefault();
    if ($(".yzm_abs input").val() == "") {
        window.alert("请输入校验码", 4);
        return false;
    }
    if ($(".yzm_abs label").text() != $(".yzm_abs input").val()) {
        window.alert("请输入正确的校验码", 4);
        return false;
    }
    var reg = /^1[0-9]{10}$/;
    if (reg.test($("#account").val()) && !$("#account").hasClass('Validform_error')) {
        $(obj).css('background', '#ccc').attr('disabled', 'true');
        $.ajax({
            type: "POST",
            url: "/jobs/ajax_sms_send",
            data: {
                "code": "",
                "mobile": $("#account").val()
            },
            dataType: "text",
            success: function (msg) {
                if (msg == "1") {
                    countdown = setInterval(CountDown, 1000);
                    $(".yzm_abs").hide();
                    window.alert("校验码已发送到您的手机，请注意查收！", 1);
                } else if (msg == "2") {
                    window.alert("验证码发送失败，请重试！", 4);
                } else {
                    window.alert("验证码输入错误！", 4);
                }
                $(obj).css('background', '#5c91d9').removeAttr('disabled');
            }
        });
    } else {
        window.alert("请输入正确的手机号", 4);
    }
    return false;
}

$(".form>li input").focus(function (event) {
    $(this).parent().next(".hint").children('span').text("");
});

var count = 120; // 设置短信发送延时
function CountDown() {
    if (count <= 1) {
        $(".send_security").text("重新获取验证码").removeAttr("disabled");
        clearInterval(countdown);
        count = 120;
        return false;
    }
    $(".send_security").attr("disabled", true);
    $(".send_security").text(count + " 秒后再次发送");
    count--;
}

function GetRandomNum() {
    var random = "";
    for (var i = 0; i < 6; i++) {
        random += Math.floor(Math.random() * 10);
    }
    $(".yzm_abs label").text(random);
}
GetRandomNum();


function o_null(obj) {
    if ($.trim($(obj).val()) != "")
        $(obj).next().hide();
    else
        $(obj).next().show();
};
//验证绑定登录信息是否为空
function validData() {
    var account = $.trim($('#account2').val());
    if (account == '') {
        $("#account2").siblings('.hint').css('display', 'block');
        $('#account2').focus();
        return false;
    } else {
        $("#account2").siblings('.hint').css('display', 'none');
    }
    var password = $.trim($('#pwd').val());
    if (password == '') {
        $("#pwd").siblings('.hint').css('display', 'block');
        $('#pwd').focus();
        return false;
    } else {
        $("#pwd").siblings('.hint').css('display', 'none');
    }
    var oauthType = $('#oauthType').val();
    var oauthId = $('#oauthId').val();
    var oauthName = $('#oauthName').val();
    bindingAccount(1, account, password, '', oauthType, oauthId, oauthName, '');
    return false;
}
//绑定账号 bindType绑定类型，0为新增账号，1为已有账号
function bindingAccount(bindType, account, password, account_type, oauthType, oauthId, oauthName, code){
    $.ajax({
        type: "POST",
        url: "/bindAccount",
        data: {"bindType": bindType, "account": account, "password": password, "account_type": account_type,
            "oauthType": oauthType, "oauthId": oauthId, "oauthName": oauthName, "code": code
        },
        dataType: "json",
        success: function (result) {
            if(result.code >0) {
                alert(result.message, 2);
            } else {
                alert(result.message, 1);
                var url = window.location.href;
                window.location = url.replace('binding', 'bindAccount');
            }
        }
    });
}
window.alert = function (txt, type, fun1) {
    var icon = "";
    var qrStr = "";
    clearInterval(timer);
    var timer = setInterval(function () {
        if ($("#alertFram")[0]) {
            $("#alertFram").remove();
            clearInterval(timer);
        }
    }, 3900);
    var alertFram = $('<div id="alertFram" style="color:#ed4f30;font-size:14px;padding:0px 0px 0px 30px;height:40px;background-color:#fff3de;border:1px solid #ffddc1;position:fixed;left:50%;z-index:999999999;text-align:center;line-height:40px;top:0">' + txt + '<img onclick="$(this).parent().remove()" src="{{ STATIC_URL }}images/x_03.png" style="float:right;cursor:pointer;margin-left:10px;margin-top:14px;margin-right:10px" width="12" height="12"></div>')
    if (arguments[1] != null) {
        if (arguments[1] == 1) {
            icon = "alert_03";
        } else if (arguments[1] == 2) {
            icon = "alert_07";
        } else if (arguments[1] == 3) {
            clearInterval(timer);
            icon = "alert_15";
            qrStr = '<div style="margin-top:20px"><input type="button" id="qr_btn" value="确认" style="width:70px;height:30px;\
               line-height:30px;color:#fff;background-color:#5C91D9;border:0px;border-radius: 5px;font-size:14px;cursor:pointer;"/><input type="button"\
               value="取消" onclick="$(this).parent().parent().remove()" style="width:70px;height:30px;line-\
               height:30px;color:#232323;background-color:#fff;border:0px;border-radius: 5px;font-size:14px;cursor:pointer;"/></div>';
        } else if (arguments[1] == 4) {
            icon = "alert_18";
        }
        alertFram = $('<div id="alertFram" style="color:#232323;font-size:18px;box-shadow: 5px 5px 5px rgba(0,0,0,.4);background-color:#fff;border:1px solid #7E9CC6;border-radius: 5px;position:fixed;left:50%;z-index:999999999;text-align:center;top:50%;padding:10px 20px;white-space:nowrap;"><div style="width:200px;float:left"></div><div style="clear:both"></div><img onclick="$(this).parent().remove()" src="/static/images/alert_11.png" style="float:right;cursor:pointer;margin-right:-9px;" ><img src="/static/images/' + icon + '.png" style="vertical-align:middle;margin-right:10px"/><span style="margin-right:10px">' + txt + '</span>' + qrStr + '</div>')
    }
    if ($("#alertFram")[0]) {
        return;
    }
    $("body").append(alertFram);
    $("#qr_btn").click(function () {
        fun1();
    })
    var width = parseInt(alertFram.css('width')) + 40;
    if (arguments[1] != null) {
        var height = parseInt(alertFram.height()) + 20;
        alertFram.css('margin-top', '-' + height / 2 + 'px');
    }
    alertFram.css('margin-left', '-' + width / 2 + 'px');
}