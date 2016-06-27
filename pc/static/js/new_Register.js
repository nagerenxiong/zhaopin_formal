$(function(){
// 角色选择start
    $(".role>li").click(function(event) {
        $(".role>li").removeClass('active').css("borderColor","#e0e0e0");
        $(this).addClass('active').css('borderColor', '#5C91D9');
    });
// 角色选择end
//本周许愿树start
    var num="54789";
    var numList=num.split("");
    var i=numList.length;
    $.each(numList,function(i,e){
        $("#num_box").append('<span class="active">0</span>');             
    })
    function each_list()
    {        
        i--;
        if(i<0)
        {
            return;
        }
        addNum(i);

    }
    function addNum(i){
         var j=0;
         var numTimer=setInterval(function(){     
         j++;
         if(j>numList[i])
         {            
            each_list();              
            clearInterval(numTimer);                 
         } 
         else
         {
         $("#num_box span:eq("+i+")").html(j);
         }
        },80)
    }
   each_list(); 
//本周许愿树end


});
//注册按钮点击验证处理start
function register(){
    $(".form li").each(function(index, el) {
        if($(this).children('input').val() == ""){
            $(this).children('input').focus().siblings('span').css('display', 'inline');
            return false;
        }
        else{
            $(this).children('span').css('display', 'none');
        }
        
    });
    if($('input[name="account_type"]').val() == ''){
        window.alert('请选择注册身份',4);
        return false;
    }
    var reg = /^1[0-9]{10}$/;

    if(reg.test($("#account").val())){
        if($.trim($('input[name="code"]').val()) == ''){
            window.alert('请输入验证码',4);
            return false;
        }
    }
    var flag = $(".Validform_wrong").length;
    if(flag > 0){
        $("#account").focus();
        return false;
    }
    var checkbox = $('input[type="checkbox"]');
    if(checkbox[0].checked){
        return true;
    }else{
        window.alert('同意协议内容才能注册',4);
        return false;
    }
}
//注册按钮点击验证处理end
// 手机注册显示发送验证码start
$(".account").keydown(function(event) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test($(".account").val())){
        $(".c").stop(true,false).animate({height:'482px'}, 200,function(){
            $(".security").slideDown(200);
        });
    }else{
        $(".c").stop(true,false).animate({height:'429px'}, 200,function(){
            $(".security").slideUp(200);
        });
    }
});
$(".account").keyup(function(event) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test($(".account").val())){
        
        $(".c").stop(true,false).animate({height:'482px'}, 200,function(){
            $(".security").stop(true,false).slideDown(200);
        });
    }else{
        $(".c").stop(true,false).animate({height:'429px'}, 200,function(){
            $(".security").stop(true,false).slideUp(200);
        });
    }

});
$(".account").blur(function(event) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test($(".account").val())){
        $(".c").stop(true,false).animate({height:'482px'}, 200,function(){
            $(".security").stop(true,false).slideDown(200);
        });
    }else{
        $(".c").stop(true,false).animate({height:'429px'}, 200,function(){
            $(".security").stop(true,false).slideUp(200);
        });
    }
});
// 手机注册显示发送验证码end
$(document).ready(function() {
    $(".registed").Validform({tiptype:2});
});
function changeRegistType(type){
    $('input[name="account_type"]').val(type);
}
var countdown;
function smsValidation(event,obj){
    event.preventDefault();
    if($(".yzm_abs input").val() == ""){
        window.alert("请输入校验码",4);
        return false;
    }
    if($(".yzm_abs label").text() != $(".yzm_abs input").val())
    {
        window.alert("请输入正确的校验码",4);
        return false;
    }
    var reg = /^1[0-9]{10}$/;
    if (reg.test($("#account").val()) && !$("#account").hasClass('Validform_error')){
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
                    window.alert("校验码已发送到您的手机，请注意查收！",1);
                } else if(msg == "2") {
                    window.alert("验证码发送失败，请重试！",4);
                }else{
                    window.alert("验证码输入错误！",4);
                }
                $(obj).css('background', '#5c91d9').removeAttr('disabled');
            }
        });
    }else{
        window.alert("请输入正确的手机号",4);
    }
    return false;
}

$(".form>li input").focus(function(event) {
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

function GetRandomNum()
{
    var random="";
    for(var i=0;i<6;i++)
    {
        random+=Math.floor(Math.random()*10);
    }

    $(".yzm_abs label").text(random);
}
GetRandomNum();