
/*自适应文字大小*/
  (function(doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth > 640) {
          clientWidth = 640;
        }
        docEl.style.fontSize = clientWidth / 10 + 'px';

            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
$(function(){
    //弹框
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
        alertFram = $('<div id="alertFram" style="color:#fff;border-radius:5px;word-wrap:break-all; overflow:hidden; width:240px; display:block; padding:10px 20px; font-size:14px;background-color:#333; position:fixed; top:50%;left:43%;z-index:999999999;text-align:center;line-height:25px;">' + txt + '</div>')
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
  
 
    $(function () {
        $phoneinput=$('.getbag input');
        $getbagimg=$('.getbag img');
        $del=$('.del');
        $getbagimg.on('click',function(){
            $phoneinput.val("");
            $del.addClass('hide');
        })

        $('input').bind('input propertychange', function() { 
            var phone = $("input[id='phone']").val();
            if(phone != ""){
                    $del.removeClass("hide");
                }else{
                    $del.addClass('hide');
             }
        })
        $(".role>li").click(function (event) {
            $(".role>li").removeClass('active');
            $(this).addClass('active');
        });

        $('.sharefl').click(function(){
        $('.zsp_share_fidex').fadeIn();
        });

        $('.zsp_share_fidex').click(function(){
            $('.zsp_share_fidex').fadeOut();
        });
        $('.rules-title').click(function(){
            $(".rules-bg").toggle();
            $('.rules').toggleClass("on");
        })
      
        $('#receiveRed').click(function (event) {
            var $phone = $("#phone");
            var phone = $.trim($phone.val());
            var phoneReg = /^(1\d{10})$/;
            if (phone == "") {
                alert(['手机号码不能为空！']);
                return false;
            }
            else if (!phoneReg.test(phone)) {
                alert(['请输入有效的手机号码！']);
                return false;
            }
            var account_type = $('input[name="account_type"]').val();
            if(account_type == ''){
                alert(['请选择注册类型']);
                return false;
            }
            var android = $('#android').val();
            var ios = $('#ios').val();
            var remark = $('#remark').val();
            $.ajax({
                async: false,
                type: 'post',
                url: '/mobile/quickRegisterAccount',
                data: {'phone': phone, 'account_type': account_type, 'android':android, 'ios': ios, 'remark': remark},
                dataType: 'json',
                success: function(data) {
                    if(data.code == 0){
                        alert(['系统繁忙，请稍后在试']);
                    }else if(data.code == 1){
                        alert(['注册领取红包成功']);
                        setTimeout(loadNewPage(data.invite_code), 3000);
                    }else if(data.code == 2){
                        alert(['该手机号已注册，请重新输入手机号']);
                    }else if(data.code == 3){
                        alert(['手机号格式不对，请重新输入']);
                    }else if(data.code == 4){
                        alert(['手机号为空，请输入手机号']);
                    }else if(data.code == 5){
                        alert(['请选择注册类型']);
                    }
                }
            });
        })
    })
});
//选择注册类型
function changeRegistType(type) {
    $('input[name="account_type"]').val(type);
}
//领取红包后跳转页面
function loadNewPage(remark){
    window.location = '/mobile/awards?remark=' + remark
}

