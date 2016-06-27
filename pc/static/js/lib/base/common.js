! function($) {
    var Haorooms = function(el, opt) {
            this.$element = el,
                this.defaults = {
                    'width':'270px',
                    'height':'40px'
                },
                this.options = $.extend({}, this.defaults, opt)
        }
        //定义haorooms的方法
    Haorooms.prototype = {
        init:function(){     
            if(this.options.style!="")       
            {
                this.$element.attr('style',this.options.style);
            }
            this.$element.css({
                width: this.options.width,
                height:  this.options.height,
                'line-height':this.options.height
            }).addClass('selectControl').children('span').css('height',this.options.height).append('<i class="iconfont icon-xia1"></i>');
            this.$element.children('.selectControlList').children('li').css({
                 height:  this.options.height,
                'line-height':this.options.height
            });
            if(this.$element.children('.selectControlList').children('li').length>10)
            {
                this.$element.children('.selectControlList').css({
                    height: '410px',
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto',
                });
            }
        },
        show: function() {
            this.$element.children('.selectControlList').show();
        },
        hide:function(){
             this.$element.children('.selectControlList').hide();
        }
    }
    $.fn.select = function(options) {        //创建haorooms的实体
        return this.each(function () {
            var $this = $(this);
            var haorooms = new Haorooms($this, options);
            haorooms.init();
            //调用其方法
            $this.children('span').click(function(event) {
                if(haorooms.$element.children('.selectControlList').css('display') =='none')
                    haorooms.show();
                else
                    haorooms.hide();
            });
            $this.children('.selectControlList').children('li').click(function(event) {
             $this.children('span').html($(this).html()+'<i class="iconfont icon-xia1"></i>');
             $this.attr({
                 'data-key': $(this).attr('data-key'),
                 'data-name': $(this).attr('data-name'),
                 'data-value':$(this).html()
             });
                haorooms.hide();
            });
            $(document).bind("click",function(e){
                    var target = $(e.target);
                    if(target.closest("span").length == 0){
                     haorooms.hide();
                    }
                 })
        })
    }
    $.fn.switchTab=function(){
        return this.each(function () {
            var $this = $(this); 
            $this.children().click(function(){
                $this.children().removeClass('active');
                $(this).addClass('active');
            })
        })
    }
    $.fn.screenScroll=function(p,g){
         return this.each(function (){
            var $this = $(this);
            var offsetTop=parseInt($this.offset().top);
            var marginTop=parseInt($this.css('margin-top'));
            $(window).scroll(function(){
                var scrollTop=parseInt($(window).scrollTop());
                var bottomOffset=parseInt(p.offset().top);
                if(scrollTop>offsetTop&&scrollTop<bottomOffset)
                {
                    $this.css('margin-top', scrollTop-offsetTop+"px");
                }
                else if(scrollTop<offsetTop){
                    $this.css('margin-top',marginTop+"px");
                }
            })
        })
    }

}(jQuery);

function notfind(obj,x,sex) {
    var src = "";
    if (x == 1) {
        if (sex == "女") {
            src = "/static/images/rcf_tx1.png";
        } else {
            src = "/static/images/rcf_tx.png";
        }
    }
    else if (x == 3 || x == 5) {
        if (sex == "女") {
            src = "/static/images/jjr_tx1.png";
        } else {
            src = "/static/images/jjr_tx.png";
        }
    }
    else {
        src = "/static/images/qy_logo.png";
    }
    obj.src = src;   
    obj.onerror = null;
         
}



$(function(){
    $(".o_slide").children('p').click(function(event) {
        $(this).parent().children('ul').slideDown(120);
        $(this).parent().append('<em></em>');
    });
    $(".o_slide").on('click', 'em', function(event) {
        $(this).parent().children('ul').slideUp(120);
        $(this).remove();
    });
    $(".o_slide").on('click', 'li', function(event) {
        var val = $(this).text();
        $(this).parent().parent().children('p').text(val).attr('data-val', $(this).attr('data-val'));
        $(this).parent().parent().children('em').click();
    });
     $(".to_now_control").html('至今');
     $(".to_now_control").each(function(index, el) {
        var wz=$(el).attr('data-wz');
        var disabled=$(el).attr('data-disabled');
        var wzArray=wz.split('-');
        var inputDom=$(el);
        for (var i = 0; i < wzArray.length; i++) {
            if(wzArray[i]=='p')
            {
              inputDom=inputDom.parent();
            }
           else if(wzArray[i]=='n')
            {
              inputDom=inputDom.next();
            }
            else if(wzArray[i]=='c')
            {
              inputDom=inputDom.children('input');
            }
            else if(wzArray[i]=='pr')
            {
              inputDom=inputDom.prev();
            }
        };
        if(disabled=="yes")
        {
           $(el).text('选择时间');
          inputDom.val('至今').attr('disabled', 'disabled').css('background-color', '#ddd');
        }
        else if(disabled=="no")
        {
          $(el).text('至今');
           inputDom.val('').removeAttr('disabled').css('background-color', '');
        }
        $(el).click(function(){
          if($(el).text()=='至今')
          {
              $(el).attr('data-disabled','yes');
              $(el).text('选择时间');
              inputDom.val('至今').attr('disabled', 'disabled').css('background-color', '#ddd');
          }
          else
          {
              $(el).removeAttr('data-disabled');
              $(el).text('至今');
              inputDom.val('').removeAttr('disabled').css('background-color', '');
          }
        })
    });
            

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
                if(x > 0 ){
                    $("#yxf").css('top', (($(window).height()-$("#yxf").outerHeight())/2)-x+"px");
                }else{
                    $("#yxf").css("top",($(window).height()-$("#yxf").outerHeight())/2+"px");
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
            if (email != '' && !reg.test(email)){
                // $('#fankui').html('请输入正确的邮箱号！').show();
                $("#yjfk .yjfk_abs").text('请输入正确的邮箱号！').show();
                return false;
            }
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