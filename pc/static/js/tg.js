// 倒计时功能start

var end_time = {
	year:2016,
	mouth:1,
	day:31,
	hours:23,
	minute:59,
	second:59
};
var day = $(".day");
var hour = $(".hour");
var minute = $(".minute");
var second = $(".second");

var date = new Date();
var o_year = date.getFullYear();//当前年份
var o_mouth = date.getMonth() + 1;//当前月份
var o_day = date.getUTCDate();//当前日期
var o_hour = date.getHours();//获取当前小时
var o_minute = date.getMinutes();//获取当前分
var o_second = date.getSeconds();//获取当前秒
var c = (end_time.year-o_year)*12+end_time.mouth-o_mouth;//相差多少月
var _day=0;//还剩多少天
var _hour = 0;
var _minute = 0;
var _second = 0;
// 根据年份计算当月有多少天
function days(year,mouth){
	var days ;
	if(mouth == 2){
	    days= year % 4 == 0 ? 29 : 28;    
	}
	else if(mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12){
	    days= 31;
	}
	else{
	     days= 30;
	}
	return days;
}
//计算天数
for (var i = 0,x = 0; i < c; i++) {
	if(o_mouth+i>13){
		x++;
	}
	_day+=days(o_year+x,o_mouth+i-x*12);	
}
_day = _day-o_day+end_time.day;

// 计算小时
if(end_time.hours-o_hour>=0){
	_hour = end_time.hours-o_hour;
}
else{
	_hour = 24+end_time.hours-o_hour;
	_day--;
}
//计算分钟
if(end_time.minute-o_minute>=0){
	_minute = end_time.minute-o_minute;
}
else{
	_minute = 60+end_time.minute-o_minute;
	_hour--;
}
// 计算秒
if(end_time.second-o_second>=0){
	_second = end_time.second-o_second;
}
else{
	_second = 60+end_time.second-o_second;
	_minute--;
}
if(_day<0 || _hour < 0 || _minute < 0 || _second < 0){
	_day = 0;_hour=_minute=_second='00';
}
// 初始化值
day.text(_day);
hour.text(_hour);
minute.text(_minute);
second.text(_second);

//倒计时开始
var timer = setInterval(function(){
	if(second.text() != 0){
		if(String(second.text()-1).length > 1)
			second.text(second.text()-1);
		else
			second.text("0"+(second.text()-1));
	}else{
		if(minute.text() != 0){
			if(String(minute.text()-1).length > 1)
				minute.text(minute.text()-1);
			else
				minute.text("0"+(minute.text()-1));
		}else{
			if(hour.text() != 0){
				if(String(hour.text()-1).length > 1)
					hour.text(hour.text()-1);
				else
					hour.text("0"+(hour.text()-1));
			}else{
				if(day.text() != 0){
					if(String(day.text()-1).length > 1)
						day.text(day.text()-1);
					else
						day.text("0"+(day.text()-1));
				}else{
					clearInterval(timer);
					return false;
				}
				hour.text(23);
			}
			minute.text(59);
		}
		second.text(60);
	}
},1000);

// 倒计时功能end

//是否为手机，是否显示验证码输入框
$("#account").blur(function(event) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test($("#account").val())){
    	$("#yzm").stop(true,false).slideDown(200,function(){
    		$(".register_btn").stop(true,false).animate({marginTop:'5px'});
    	});
        
    }else{
    	$("#yzm").stop(true,false).slideUp(200,function(){
    		$(".register_btn").stop(true,false).animate({marginTop:'32px'});
    	});
    }
});



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
                    alert("校验码已发送到您的手机，请注意查收！",1);
                } else if(msg == "2") {
                    alert("验证码发送失败，请重试！",2);
                }else{
                    alert("验证码输入错误！",2);
                }
            }
        });
    }else{
        alert("请输入正确的手机号",2);
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
		alert("请输入帐号",2);
		return false;
	}
	if($(".mima").val()==""){
			alert("请输入密码",2);
			return false;
		}
	// if($('.mima').eq(0).val() != $(".mima").eq(1).val()){
	// 	alert("两次输入的密码不一致");
	// 	return false;
	// }
	if(!$("#agree").is(':checked')){
		alert("请先同意用户协议然后提交",2);
		return false;
	}
    var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!phoneReg.test(account) && !emailReg.test(account)) {
        alert("请输入合法的注册账号",2);
        return false;
    }

    var password = $(":input[name=password]").val();
    if(phoneReg.test(account)) {
        code = $(":input[name=code]").val();
        if(code == ""){
            alert("请输入验证码",2)
            return false;
        }
    }
    if($(".Validform_error").length>0){
        $(".Validform_error").eq(0).focus();
        alert("请确认提交信息",2);
    }
    $.ajax({
        type: 'POST',
        data: {'account_type': 4, 'account': account, 'password': password, 'code': code},
        url: '/ajax_register_by_ajax',
        dataType: 'json',
        success: function(data) {
            if(data == 'success'){
            alert('注册成功,请登录完善信息',1);
            setTimeout(function(){
                window.location='/system/new_company_index'  
            },2000)
            // tempwindow.location='/activity/mobile_hint';
            $(":input[name=password]").val("");
            $(":input[name=code]").val('');
            count = 0;
            $(".send").text("重新获取验证码").removeAttr("disabled");
          }
          else{
            alert(data,2);
          }
            // alert(data);
            // $(":input[name=password]").val("");
            // $(":input[name=userpassword2]").val("");
            // $(":input[name=code]").val('');
            // count = 0
            // $(".send").text("重新获取验证码").removeAttr("disabled");

        }
    });
}


//copy的公用alert 
$(function(){
	var timer = null;
  var alertFram;
  window.alert = function(txt, type, fun1) {
    var icon = "";
    var qrStr = ""
    clearInterval(timer);
    timer = setInterval(function() {
      if ($("#alertFram")[0]) {
        $("#alertFram").remove();
        clearInterval(timer);
      }
    }, 3900)
    alertFram = $('<div id="alertFram" style="color:#ed4f30;font-size:14px;padding:0px 0px 0px 30px;height:40px;background-color:#fff3de;border:1px solid #ffddc1;position:fixed;left:50%;z-index:999999999;text-align:center;line-height:40px;top:0">' + txt + '<img onclick="$(this).parent().remove()" src="/static/images/x_03.png" style="float:right;cursor:pointer;margin-left:10px;margin-top:14px;margin-right:10px" width="12" height="12"></div>')
    if (arguments[1] != null) {
      if (arguments[1] == 1) {
        icon = "alert_03";
      } else if (arguments[1] == 2) {
        icon = "alert_07";
      } else if (arguments[1] == 3) {
        clearInterval(timer);
        icon = "alert_15";
        qrStr = '<div style="margin-top:20px"><input type="button" id="qr_btn" value="确认" style="width:70px;height:30px;\
               line-height:30px;color:#fff;background-color:#5C91D9;border:0px;border-radius: 5px;font-size:14px"/><input type="button"\
               value="取消" onclick="$(this).parent().parent().remove()" style="width:70px;height:30px;line-\
               height:30px;color:#232323;background-color:#fff;border:0px;border-radius: 5px;font-size:14px"/></div>';
      } else if (arguments[1] == 4) {
        icon = "alert_18";
      }
      alertFram = $('<div id="alertFram" style="color:#232323;font-size:18px;box-shadow: 5px 5px 5px rgba(0,0,0,.4);background-color:#fff;border:1px solid #7E9CC6;border-radius: 5px;position:fixed;left:50%;z-index:999999999;text-align:center;top:50%;padding:10px 20px;white-space:nowrap;"><div style="width:200px;float:left"></div><div style="clear:both"></div><img onclick="$(this).parent().remove()" src="/static/images/alert_11.png" style="float:right;cursor:pointer;margin-right:-9px;" ><img src="/static/images/' + icon + '.png" style="vertical-align:middle;margin-right:10px"/><span style="margin-right:10px">' + txt + '</span>' + qrStr + '</div>')
    }
    if ($("#alertFram")[0]) {
      return;
    }
    $("body").append(alertFram);
    $("#qr_btn").click(function() {
      fun1();
    })
    var width = parseInt(alertFram.css('width'))+40;
    if(arguments[1] != null)
    {
          var height = parseInt(alertFram.height())+20;
         alertFram.css('margin-top', '-' + height/2 + 'px');
    }
    alertFram.css('margin-left', '-' + width/2 + 'px');
  }
});
