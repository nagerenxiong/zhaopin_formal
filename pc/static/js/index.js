    //表单角色切换
    $(".banner .form li").click(function(event) {
        $(this).addClass('active').siblings('li').removeClass('active');
        var index = $(".banner .form li").index($(this));
        if(index == 0){
            $('#loginType').val('1');
        }else if(index == 1){
            $('#loginType').val('3');
        }else{
            $('#loginType').val('2');
        }
    });





function GetLastUser() {
        var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";//GUID标识符
        var usr = GetCookie(id);
        if (usr != null) {

            document.getElementById('zh').value = usr;
            GetPwdAndChk();
        } else {
            document.getElementById('zh').value = "";
        }
    }
    //点击登录时触发客户端事件

    function SetPwdAndChk() {
        //取用户名
        var usr = document.getElementById('zh').value;
        //将最后一个用户信息写入到Cookie
        SetLastUser(usr);


        //如果记住密码选项被选中
        if (document.getElementById('jzmm').checked == true) {
            //取密码值并加密
            var pwd = document.getElementById('mm').value;
            $.ajax({
                dataType: "json",
                url: "/ajax_encodePassword",
                data: {"password": pwd},
                type: "post",
                async: false,
                success: function(data){
                    pwd = data.msg;
                }
            });
            var expdate = new Date();
            expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
            //将用户名和密码写入到Cookie
            SetCookie(usr, pwd, expdate);
        } else {
            //如果没有选中记住密码,则立即过期
            ResetCookie();
        }
    }

    function SetLastUser(usr) {
        var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
        var expdate = new Date();
        //当前时间加上两周的时间
        expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
        SetCookie(id, usr, expdate);
    }
    //用户名失去焦点时调用该方法

    function GetPwdAndChk() {
        var usr = document.getElementById('zh').value;
        var pwd = GetCookie(usr);
        if (pwd != null) {
            //取密码值并解密
            $.ajax({
                dataType: "json",
                type: "post",
                data: {"password": pwd},
                url: "/ajax_decodePassword",
                async: false,
                success: function(data){
                    pwd = data.msg;
                }
            });
            document.getElementById('jzmm').checked = true;
            document.getElementById('mm').value = pwd;
        } else {
            document.getElementById('jzmm').checked = false;
            document.getElementById('mm').value = "";
        }
    }
    //取Cookie的值

    function GetCookie(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            //alert(j);
            if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
    }

    function getCookieVal(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) endstr = document.cookie.length;
        return unescape(document.cookie.substring(offset, endstr));
    }
    //写入到Cookie

    function SetCookie(name, value, expires) {
        var argv = SetCookie.arguments;
        //本例中length = 3
        var argc = SetCookie.arguments.length;
        var expires = (argc > 2) ? argv[2] : null;
        var path = (argc > 3) ? argv[3] : null;
        var domain = (argc > 4) ? argv[4] : null;
        var secure = (argc > 5) ? argv[5] : false;
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
    }

    function ResetCookie() {
        var usr = document.getElementById('zh').value;
        var expdate = new Date();
        SetCookie(usr, null, expdate);
    }





    //验证登录
    function checkLogin(){
        var account = $('#zh').val();
        var pwd = $('#mm').val();
        if(account == ''){
            window.alert('请输入账号',4);
            $('#zh').focus();
            return false;
        }else{
            if(!/^1[0-9]{10}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(account)){
                window.alert('账号错误，请重新输入',2);
                $('#zh').val('');
                $('#zh').focus();
                return false;
            }
        }
        if(pwd == ''){
            window.alert('请输入密码',4);
            $('#mm').focus();
            return false;
        }
        SetPwdAndChk();
        return true;
    }
// 轮播
    var $banner = $(".banner .bul");
    var $banner_index = 0;//当前显示的图片index 0开始
    $banner.css("width",$banner.find('li').length*100+"%");
    $banner.find('li').width(100/$banner.find('li').length+"%");
$(function(){

    // 是否回显密码
    GetLastUser();

    var go = setInterval(function(){gogo()},4000);
    function circle(x,y){
        x.eq(y).addClass('active').siblings('li').removeClass('active');
    }
    function gogo(){
        if($banner_index == $(".ocircle li").length-1)//如果是最后一个banner，实际为倒数第二个，最后一个和第一个banner相同
        {
            $banner.stop(true,false).animate({left:-($banner_index+1)*100+"%"},{
                easing:"easeInSine",
                duration:"300",
                 complete: function(){
                                        $banner.css("left","0px"); 
                                        }
            });
            $banner_index=0;
            circle($(".ocircle li"),0);
        }
        else{
            $banner.stop(true,false).animate({left:-($banner_index+1)*100+"%"}, {
                easing:"easeInSine",
                duration:"300"});
            $banner_index++;
            circle($(".ocircle li"),$banner_index);
        }
    }
    $(".bul").mouseenter(function(){
            clearInterval(go);
    })
    $(".bul").mouseleave(function(){
        go = setInterval(function(){gogo()},4000);
    })

    $(".ocircle li").click(function(event) {
        clearInterval(go);
        var $index = $(this).index();
        circle($(".ocircle li"),$index);
        $banner_index=$index; 
        $banner.stop(true,false).animate({left:-$index*100+"%"}, {
                easing:"easeInSine",
                duration:"300"
            });
    });
    //公司职位选择
    $(".select").click(function(event) {
        if($(this).find('.xiala').css("display")=="none")
        {
             $(this).find('.xiala').slideDown(100);
        }else{
             $(this).find('.xiala').slideUp(100);
        }
    });
    $(".select li").click(function(event) {
        var i = $("#position1").text();
        if($.trim(i)=="职位"){
            $('.sousuo').attr('placeholder','请输入公司关键词');            
        }
        else{
           $('.sousuo').attr('placeholder','请输入职位关键词:如前端开发等');
        }
        $("#position1").text($(this).text());
        $('#position1').css('color', '#333');
        $(this).text(i);
    });
    var is_scroll = 1
    $(window).scroll(function(event) {
        if($(this).scrollTop()+$(this).height()>1100 && is_scroll==1){
            $(".ofix").stop(true,false).animate({bottom: "0px"}, 400);
            is_scroll=0;
        }
    });

    //底部悬浮打开
    $(".r_ofix").click(function(event) {
        $(this).hide(300);
        $(".ofix").stop(true,false).animate({bottom: "0px"}, 200);
    });
    //底部悬浮关闭
    $(".close").click(function(event) {
        // $(".r_ofix").fadeIn(300);
        $(".ofix").stop(true,false).animate({bottom: "-160px"}, 400);
    });
    //我要反馈
    $(".rfix .wyfk").click(function(event) {
        $('#fk_content').val('');$('#fankui').hide();
        if($(".rfix .swt").css("display") =="none"){
            $(".rfix .swt").stop(true,false).fadeIn(300);
        }else{
            $(".rfix .swt").stop(true,false).fadeOut(300);
        }
    });
    $(".rfix .swt span").click(function(event) {
        $(".rfix .swt").stop(true,false).fadeOut(300);
    });
    //回到顶部
    $(".hddb a").click(function(event) {
        $('body,html').animate({scrollTop: 0}, 300,function(){
            $(".hddb").css("background","url(/static/images/hddb.gif) no-repeat center center")
        });

    });
    $(".obtn").click(function(event) {
       $(this).siblings('.obtn').removeClass("active");
       $(this).addClass("active");
    });
    //底部悬浮层处理
    $(".rfix .word a").hover(function() {
        $(this).css("color","#C8161D");
    }, function() {
       $(this).css("color","#999");
    });
//右悬浮处理


});

function  checksubmit()
{
    var regEmail=/^1[0-9]{10}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if($("#kszc_username").val()=="")
    {
        alert("请输入用户名",4);
        return false;
    }
    else if($("#kszc_password").val()=="")
    {
        alert("请输入密码",4);
        return false;
    }
    else if($("#kszc_password").val().length < 6)
    {
        alert("密码请输入6到30位任意字符",4);
        return false;
    }
    else if(!regEmail.test($.trim($("#kszc_username").val())))
    {
        alert("邮箱或手机号格式不正确，请重新输入",4);
        return false;
    }
    else if($('#rgister_account_type').val() == ""){
        alert("请选择您的注册身份！",4);
        return false;
    }
    else{
        reg = /^1[0-9]{10}$/;

        if(reg.test($("#kszc_username").val())){
            if($("#check_code").val() == ""){
                alert("请填写校验码！",4);
                return false;
            }
            if($('.code_btn').val() == '发送校验码'){
                window.alert('请获取验证码并输入你获得的验证码',4);
                return false;
            }
        }
    }
  return true;
}

$("#kszc_username").keydown(function(){
    var reg=/^1[0-9]{10}$/;
    if(reg.test($("#kszc_username").val()))
    {
        $("#check_code").show();
        $(".code_btn").show();
    }
    else
    {
        $("#check_code").hide();
        $(".code_btn").hide();
    }
});
$("#kszc_username").keyup(function(event) {
    var reg=/^1[0-9]{10}$/;
    if(reg.test($("#kszc_username").val()))
    {
        $("#check_code").show();
        $(".code_btn").show();
    }
    else
    {
        $("#check_code").hide();
        $(".code_btn").hide();
    }
});


function smsValidation(){
    if($("#mobile_captcha").val() == ""){
        alert("请输入验证码！",4);
        return;
    }
    if($("#mobile_captcha_input").val() != $("#mobile_captcha").val()){
        alert("请输入正确的验证码！",4);
        return;
    }
    var reg = /^1[0-9]{10}$/;
    if (reg.test($.trim($("#kszc_username").val()))){
        $.ajax({
            type: "POST",
            url: "/jobs/ajax_sms_send",
            data: {
                "code": "",
                "mobile": $.trim($("#kszc_username").val())
            },
            dataType: "text",
            success: function (msg) {
                if (msg == "1") {
                    $('.show_code').hide();
                    countdown = setInterval(CountDown, 1000);
                    alert("校验码已发送到您的手机，请注意查收！",4);
                } else if(msg == "2") {
                    alert("验证码发送失败，请重试！",4);
                }else{
                    alert("验证码输入错误！",2);
                }
            }
        });
    }else{
        alert("请输入正确的手机号",4);
    }
}

var count = 120; // 设置短信发送延时
var countdown;
function CountDown() {
    $("#code_btn").attr("disabled", true);
    $("#code_btn").val(count + " 秒后再次发送");
    if (count == 0) {
        $("#code_btn").val("重新获取验证码").removeAttr("disabled");
        clearInterval(countdown);
        count=120;
    }
    count--;
}
$("#yjfk_btn").click(function(){
    $('#fk_content').val('');$('#fankui').hide();
    $(".rfix").show();
    $(".swt").show();
})
$("#search_btn").click(function() {
    var keyword = $(".sousuo").val();
    var condition = $('#position1').text();
    if ($.trim(condition) == "职位") {
        var url = "/new_search_position?condition=" + keyword;
        window.open(url);
    }else if($.trim(condition) == '公司'){
        window.open('/new_search_company?condition=' + keyword, '_blank');
    }
})

$(function(){
    GetRandomNum();
})
function GetRandomNum()
{
    var random="";
    for(var i=0;i<6;i++)
    {
        random+=Math.floor(Math.random()*10);
    }

    $("#mobile_captcha_input").val(random);
    $("#mobile_captcha_lable").text(random);
}
function showyzm(){
    $("#mobile_captcha").val("");
    GetRandomNum();
    $('.show_code').show()
}
var _hmt = _hmt || [];
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
      alertFram = $('<div id="alertFram" style="color:#232323;font-size:18px;box-shadow: 5px 5px 5px rgba(0,0,0,.4);background-color:#fff;border:1px solid #7E9CC6;border-radius: 5px;position:fixed;left:50%;z-index:999999999;text-align:center;top:50%;padding:10px 20px"><div style="width:200px;float:left"></div><div style="clear:both"></div><img onclick="$(this).parent().remove()" src="/static/images/alert_11.png" style="float:right;cursor:pointer;margin-right:-9px;" ><img src="/static/images/' + icon + '.png" style="vertical-align:middle;margin-right:10px"/>' + txt + '' + qrStr + '</div>')
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

   
   $(function(){             
             $("#yxf").hide();
            //右悬浮显示隐藏start
                //右悬浮事件start
        $("#yxf li").eq(3).click(function(event) {
            $('body,html').stop(true,false).animate({scrollTop: 0},300);
        });
        $("#yxf li").eq(1).mouseenter(function(event) {
            $("#ewm").css('display', 'block');
        });
        $("#yxf li").eq(1).mouseleave(function(event) {
            $("#ewm").css('display', 'none');
        })
        $("#yxf li").mouseover(function(event) {
            $(this).find("span").stop(true,false).animate({right:"0px"}, 150)
        });
        $("#yxf li").mouseout(function(event) {
              $("#yxf li").find("span").stop(true,false).animate({right:"-150px"}, 150)
        });
        //右悬浮事件end

           //右悬浮显示隐藏start
            $(window).scroll(function(event) {
                if( $(window).scrollTop()+ $(window).height() + 60 > $("#Bottom").offset().top){
                    $("#yxf li").eq(3).show(); 
                }else{
                    $("#yxf li").eq(3).hide();
                }
                var x = $(window).scrollTop()+ $(window).height() - (($(window).height()-$("#yxf").outerHeight())/2) - $("#Bottom").offset().top;
                var y = $(window).scrollTop()+ $(window).height() - (($(window).height()+$("#yxf").outerHeight())/2) - 415;
                if(x > 0 ){
                    $("#yxf").css('top', (($(window).height()-$("#yxf").outerHeight())/2)-x+"px");
                }
                else{
                    $("#yxf").css("top",($(window).height()-$("#yxf").outerHeight())/2+"px");
                }  
                if( $(window).scrollTop()+ parseInt( $("#yxf").css('top') ) >415){
                    $('#yxf').show();
                }else{
                    $('#yxf').hide();
                }
            });

            $(window).resize(function(){
                // 右悬浮定位start 
                var x = $(window).scrollTop()+ $(window).height() - (($(window).height()-$("#yxf").outerHeight())/2) - $("#Bottom").offset().top;
                if(x > 0 ){
                    $("#yxf").css('top', (($(window).height()-$("#yxf").outerHeight())/2)-x+"px");
                }else{
                    $("#yxf").css("top",($(window).height()-$("#yxf").outerHeight())/2+"px");
                }
                //右悬浮定位end
            });
            
            $(window).resize();
    // 右悬浮意见反馈start
        $("#yjfk_btn1").click(function(event) {
            open_yjfk();
        });
        $("#yjfk_btn").click(function(event) {
            open_yjfk();
        });
        function open_yjfk(){
                layer.open({
                    type: 1,
                    area: ['460px', '300px'],
                    title:"<img src='/static/images/yjfk_tx.png'>",
                    fix: true, //不固定
                    maxmin: false,
                    skin: 'layer_yjfk',
                    closeBtn:"2",
                    moveOut:false,
                    content: $("#yjfk"),
                    success:function(layero, index){
                        
                    }
                });
            }
    // 右悬浮意见反馈end

    // 点击发送反馈按钮 start
    $("#yjfk .o_btn").click(function() {
            var content = $("#fk_cont").val();
            var email = $.trim($(".fk_email").val());
            var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if($.trim(content) == ''){
                $("#yjfk .yjfk_abs").text('请输入反馈内容！').show();
                return false;
            }
            // if (email == '' || !reg.test(email)){
            //     // $('#fankui').html('请输入正确的邮箱号！').show();
            //     $("#yjfk .yjfk_abs").text('请输入正确的邮箱号！').show();
            //     return false;
            // }
            $.ajax({
                type: 'post',
                async: false,
                data: {'content': content, 'email': email},
                url: '/ajax_sendUserFeedBack',
                dataType: 'json',
                success: function(data) {
                    if(data == 1) {
                        // $('#fankui').html('谢谢您的反馈！').show();
                        layer.closeAll();
                        alert("谢谢您的反馈！");
                        return false;
                    } else {
                        // $('#fankui').html('请您前往登陆或留下您的邮箱！').show();
                        alert('请您前往登陆或留下您的邮箱！');
                        return false;
                    }
                }
            });
    })
    // 点击发送反馈按钮 end
    $(".lxwm").hover(function() {
        $(".con_show").show();
    }, function() {
       $(".con_show").hide();
    });


var str = [1,2,3,4];
var random = Math.floor(Math.random()*str.length);
var result = str[random];
if(result==1)
$("#online_qq a").attr('href', 'http://wpa.qq.com/msgrd?v=3&uin=2128274141&site=qq&menu=yes');
else if(result==2)
$("#online_qq a").attr('href', 'http://wpa.qq.com/msgrd?v=3&uin=2128274141&site=qq&menu=yes');
else if(result==3)
$("#online_qq a").attr('href', 'http://wpa.qq.com/msgrd?v=3&uin=3310508362&site=qq&menu=yes');
else if(result==4)
$("#online_qq a").attr('href', 'http://wpa.qq.com/msgrd?v=3&uin=3310508362&site=qq&menu=yes');
})