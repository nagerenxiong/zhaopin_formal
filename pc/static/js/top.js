(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;  
      docEl.style.fontSize = clientWidth / 10 + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
///////////////////////////////////

var img = new Image();
img.src="/static/images/h5/top/header.jpg";
var hehe = setInterval(function(){
  if(img.width !=0){
    clearInterval(hehe);
    $("header").addClass('active')
  }
},300)


//是否为手机，是否显示验证码输入框
// $("#account").blur(function(event) {
//     var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
//     if (reg.test($("#account").val())){
//       $("#yzm").css('height', 'auto');
//       $(".register_btn").css('transform','translateY(-0.2rem)');
//     }else{
//       $("#yzm").css('height', '0px');
//       $(".register_btn").css('transform','');
//     }
// });

// 验证码发送
var countdown;
function smsValidation(event){
    event.preventDefault();
    var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (phoneReg.test($("#account").val()) && !$("#account").hasClass('Validform_error')){
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
                    alert("校验码已发送到您的手机.");
                } else if(msg == "2") {
                    alert("验证码发送失败，请重试！");
                }else{
                    alert("验证码输入错误！");
                }
            }
        });
    }else{
        alert("请输入正确的手机号");
    }
    return false;
}



var count = 120; // 设置短信发送延时
function CountDown() {
    if (count <= 1) {
        $(".send").text("重新获取验证码").removeAttr("disabled");
    clearInterval(countdown);
        count = 120;
        return false;
    }
    $(".send").attr("disabled", true);
    $(".send").text(count + " 秒后再次发送");
    count--;
}


//注册按钮点击验证处理start
function register(event){
    event.preventDefault();
    var account = $(".zh").val();
    var code = '';
  if(account == ""){
    alert("请输入帐号");
    return false;
  }
  if($(".mima").val()==""){
      alert("请输入密码");
      return false;
    }

  if(!$("#agree").hasClass('active')){
    alert("请先同意用户协议然后提交");
    return false;
  }
    var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    // var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!phoneReg.test(account)) {
        alert("请输入合法的注册账号");
        return false;
    }

    var password = $(":input[name=password]").val();
    if(phoneReg.test(account)) {
        code = $(":input[name=code]").val();
        if(code == ""){
          alert('请输入验证码');
          return false;
        }
    }
   // var tempwindow=window.open();                
    $.ajax({
        type: 'POST',
        data: {'account_type': 4, 'account': account, 'password': password, 'code': code},
        url: '/ajax_register_by_ajax',
        dataType: 'json',
        success: function(data) {
          if(data == 'success'){
              post('/mobile/login_user', account, password);
//            window.location ="/activity/mobile_hint";
            // tempwindow.location='/activity/mobile_hint';
            $(":input[name=password]").val("");
            $(":input[name=userpassword2]").val("");
            $(":input[name=code]").val('');
            count = 0;
            $(".send").text("重新获取验证码").removeAttr("disabled");
          }
          else{
            alert(data);
          }
        }
    });
    return false;
}
function agree(){
  $("#agree").hasClass('active')?$("#agree").removeClass('active'):$("#agree").addClass('active');
}

//copy的公用alert 
// $(function(){
//   var timer = null;
//   var alertFram;
//   window.alert = function(txt, type, fun1) {
//     var icon = "";
//     var qrStr = ""
//     clearInterval(timer);
//     timer = setInterval(function() {
//       if ($("#alertFram")[0]) {
//         $("#alertFram").remove();
//         clearInterval(timer);
//       }
//     }, 3900)
//     alertFram = $('<div id="alertFram" style="color:#ed4f30;font-size:14px;padding:0px 0px 0px 15px;height:40px;background-color:#fff3de;border:1px solid #ffddc1;position:fixed;left:50%;z-index:999999999;text-align:center;line-height:40px;top:0">' + txt + '<img onclick="$(this).parent().remove()" src="/static/images/x_03.png" style="float:right;cursor:pointer;margin-left:10px;margin-top:14px;margin-right:10px" width="12" height="12"></div>')
//     if (arguments[1] != null) {
//       if (arguments[1] == 1) {
//         icon = "alert_03";
//       } else if (arguments[1] == 2) {
//         icon = "alert_07";
//       } else if (arguments[1] == 3) {
//         clearInterval(timer);
//         icon = "alert_15";
//         qrStr = '<div style="margin-top:20px"><input type="button" id="qr_btn" value="确认" style="width:70px;height:30px;\
//                line-height:30px;color:#fff;background-color:#5C91D9;border:0px;border-radius: 5px;font-size:14px"/><input type="button"\
//                value="取消" onclick="$(this).parent().parent().remove()" style="width:70px;height:30px;line-\
//                height:30px;color:#232323;background-color:#fff;border:0px;border-radius: 5px;font-size:14px"/></div>';
//       } else if (arguments[1] == 4) {
//         icon = "alert_18";
//       }
//       alertFram = $('<div id="alertFram" style="color:#232323;font-size:18px;box-shadow: 5px 5px 5px rgba(0,0,0,.4);background-color:#fff;border:1px solid #7E9CC6;border-radius: 5px;position:fixed;left:50%;z-index:999999999;text-align:center;top:50%;padding:10px 20px;white-space:nowrap;"><div style="width:200px;float:left"></div><div style="clear:both"></div><img onclick="$(this).parent().remove()" src="/static/images/alert_11.png" style="float:right;cursor:pointer;margin-right:-9px;" ><img src="/static/images/' + icon + '.png" style="vertical-align:middle;margin-right:10px"/><span style="margin-right:10px">' + txt + '</span>' + qrStr + '</div>')
//     }
//     if ($("#alertFram")[0]) {
//       return;
//     }
//     $("body").append(alertFram);
//     $("#qr_btn").click(function() {
//       fun1();
//     })
//     var width = parseInt(alertFram.css('width'))+40;
//     if(arguments[1] != null)
//     {
//           var height = parseInt(alertFram.height())+20;
//          alertFram.css('margin-top', '-' + height/2 + 'px');
//     }
//     alertFram.css('margin-left', '-' + width/2 + 'px');
//   }
// })
//弹框样式
    var timer = null;
    var alertFram;
    window.alert = function (txt) {
        clearInterval(timer);
        timer = setInterval(function () {
            if ($("#alertFram")[0]) {
                $("#alertFram").remove();
                clearInterval(timer);
            }
        }, 1600)
        alertFram = $('<div id="alertFram" style="color:#fff;border-radius:5px;word-wrap:break-all; overflow:hidden; width:240px; display:block; padding:10px 20px; font-size:14px;background-color:#333; position:fixed; top:50%;left:45%;z-index:999999999;text-align:center;line-height:25px;">' + txt + '</div>')
        if ($("#alertFram")[0]) {
            return;
        }
        $("body").append(alertFram);
        var width = alertFram.width();
        var height = alertFram.height();
        alertFram.css({
            marginLeft: -width / 2 + 'px',
            marginTop: -height / 2 + 'px'
        });
    }
