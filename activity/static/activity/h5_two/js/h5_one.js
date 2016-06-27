// 自适应文字大小 start
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      var clientHeight = docEl.clientHeight;
      var x = (clientHeight/clientWidth);
      if (!clientWidth) return;
      // if (clientWidth > 640) {
      //   clientWidth = 640;
      // }       
      docEl.style.fontSize = clientWidth / 10 + 'px';
      // if(isiOS == true){
      //   $(".o_slide").css('height', document.body.clientHeight-60+'px');
      // }
      //第二屏中的圆形logo高度是百分比,宽度JS控制宽度还有行高与高度一样
      $(".logo").css({
        width: clientHeight*0.3348958*0.681182+"px",
        lineHeight: clientHeight*0.3348958*0.681182+"px"
        // width:'130px',height:'130px',lineHeight:'130px'
      });
      //第二屏中福利高度间距设置
      var ulTop = ($(".index2 .c_fuli").height()-$(".index2 .c_fuli ul").height())/2
      if(ulTop>0){
        $(".index2 .c_fuli ul").css('top', ulTop+"px");
      }
      //第四屏中圆形头像宽度设置
      $(".index4 .tx").css('width', $(".index4 .tx").height()+"px");
      //第四屏行高
      $(".index4 section li").css('lineHeight', $(".index4 section li").height()+"px");
      // //第六屏二维码
      // $(".index6 .ewm").css('width', $(".index6 .ewm").height()+"px");
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

    
// 自适应文字大小 end
var obj = $("body");
var startY = 0;//手指按下时的坐标
var endY = 0;//手指离开时的坐标
var startY1 = 0;//职位滑动
var endY1 = 0;//职位滑动
var p_slide = 1;//职位滑动
var isgo =true;
var slide_index=0;//当前显示第几屏0-5
obj.on('touchstart', function(event) {
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
         // 阻止浏览器默认事件，重要
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        startY = touch.pageY;
        endY = startY;
        }
}, false);

$(".index3 .word").on('touchmove', function(event) {
  event.stopPropagation();
});
$(".index5 .xl_mes1").on('touchmove', function(event) {
  event.stopPropagation();
});
obj.on('touchmove', function(event) {
  event.preventDefault();
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        endY = touch.pageY;
        }
}, false);

obj.on('touchend', function(event) {
        if(isgo == true && !$('.index7').hasClass('active')){
        if(endY-startY>100 ){//上一屏
          isgo = false;
          //如果为第1屏 上一屏应该是6 不是0
          slide_index == 0?slide_index = 6:slide_index --;
          //滑动后下一个显示
          $(".o_slide").eq(slide_index).siblings().css('zIndex', '2');
          $(".o_slide").eq(slide_index).css({zIndex:'3'}).attr('id', 'z');

          $(".o_slide").removeClass('o_active');//移除动画类
          //给当前显示块添加动画类
          $(".o_slide").eq(slide_index).addClass('o_active');

          setTimeout(function(){
            $(".o_slide").eq((slide_index-1)<0?6:slide_index-1).attr('id', 's');
            $(".o_slide").eq((slide_index+1)>6?0:slide_index+1).attr('id', 'x');
            isgo=true;
          },1000)
          
        }
        else if(startY-endY>100 ){//下一屏
          //如果为第6屏 下一屏应该是1 不是7
          isgo = false;
          slide_index == 6?slide_index = 0:slide_index ++;

          //滑动后下一个显示
          $(".o_slide").eq(slide_index).siblings().css('zIndex', '2');
          $(".o_slide").eq(slide_index).css({zIndex:'3'}).attr('id', 'z');;

          $(".o_slide").removeClass('o_active');//移除动画类
          //给当前显示块添加动画类
          $(".o_slide").eq(slide_index).addClass('o_active');

          setTimeout(function(){
            $(".o_slide").eq((slide_index-1)<0?6:slide_index-1).attr('id', 's');;
            $(".o_slide").eq((slide_index+1)>6?0:slide_index+1).attr('id', 'x');
            isgo = true;
          },1000)
          
        }
      }
        startY =0;
        endY = 0;
}, false);

function upup(obj){
  $(".supportCount em").addClass('active');
}
$(".zwxq").on('touchstart', function(event) {
  event.stopPropagation();
});
$(".zwxq").on('touchend', function(event) {
  event.stopPropagation();
});
$(".index4 section").on('touchstart', function(event) {
    event.preventDefault();
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
         // 阻止浏览器默认事件，重要
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        startY1 = touch.pageY;
        endY1 = startY1;
        }
}, false);

$(".index4 section").on('touchmove', function(event) {
    event.preventDefault();
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        endY1 = touch.pageY;
        }
}, false);

$(".index4 section").on('touchend',  function(event) {
  _this = $(this).children('.position_list');
  event.preventDefault();
  event.stopPropagation();
  var count = parseInt((_this.children('li').length+1)/4);//总共多少屏
  var g = 400;
  if(startY1-endY1>50){
    if(count >= p_slide+1){
      p_slide++;
      $(".a"+(p_slide-1)).css({
        transform:'translateY('+-g+'%)'
      });
    }
    _this.css('opacity', '0');
    setTimeout(
      function(){
        _this.css({
          transform:'translateY('+-(p_slide-1)*100+'%)',
          opacity:'1'
        });
        $(".a"+(p_slide-1)).css({
          transform:'translateY(0%)'
        });
      },500)
  }
  else if( endY1-startY1>50 ){
    if(p_slide >= 2){
      p_slide--;
    }
     $(".a"+(p_slide+1)).css({
        transform:'translateY('+g+'%)'
      });
    _this.css('opacity', '0');
    setTimeout(
      function(){
        _this.css({
          transform:'translateY('+-(p_slide-1)*100+'%)',
          opacity:'1'
        });
        $(".a"+(p_slide+1)).css({
        transform:'translateY(0%)'
      });
      },500)
  }
  startY =0;
  endY = 0;

});

$(".cjcj").tap(function(){
  $(".s6").addClass('o_hide');
  $(".index7").addClass('active');
})
  
$(".back").tap(function(){
  $(".s6").removeClass('o_hide');
  $(".index7").removeClass('active');
})
//  add By King
// 支持企业按钮
$(".votedForCompanyButton").tap(function(){
  companyId = $(this).attr('id');
    $.ajax({
        type: "POST",
        url: "/activity/ajax_votedForCompany",
        data: { "companyId": companyId},
        dataType: "json",
        success: function (data) {
            if(data == 1) {
                // 支持人数 + 1
                var $supportCount = $(".supportCount i");
                var supportCount = $supportCount.text();
                $supportCount.text(parseInt(supportCount) + 1);
                upup();
                // 显示支持后的样式
                $(".votedForCompanyButton").css('background', '#CCC').attr('disabled', 'disabled');
                $(".votedMessage").show();
            } else if(data == 2) {
                alert('您之前已经投过您宝贵的一票了哦~');
            }
        }
    })
})


// 验证码发送
var countdown;
function smsValidation(event){
    if(($(".send").attr("disabled") == "disabled"))
    {
        alert("验证码已经发送！");
    }
    else
    {
        event.preventDefault();
        var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (phoneReg.test($("#apply_phone").val())){
            $.ajax({
                type: "POST",
                url: "/activity/getPhoneCode",
                data: {
                    "code": "",
                    "mobile": $("#apply_phone").val()
                },
                dataType: "text",
                success: function (msg) {
                    if (msg == "1") {
                        countdown = setInterval(CountDown, 1000);
                        alert("校验码已发送到您的手机，请注意查收！");
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
    $(".send").attr("disabled", "disabled");
    $(".send").text(count + " 秒");
    count--;
}

//点击立即提交
function submitApply(){
    var phone = $.trim($(".phone").val());
    if (phone == "") {
        alert("手机号码不能为空！");
        return false;
    }
    var phoneReg = /^(1\d{10})$/;
    if (!phoneReg.test(phone)) {
        alert("请输入合法的手机号码");
        return false;
    }
    var company_id = $('#company_id').val();
    var position_id = $('.position_p').attr('data-value');
    if(position_id == ''){
        window.alert('请选择应聘的职位');
        return false;
    }
    var apply_name = $.trim($('#apply_name').val());
    if(apply_name == ''){
        window.alert('请输入您的姓名');
        return false;
    }
    var phone_code = $.trim($('#phone_code').val());
    if(phone_code == ''){
        window.alert('请输入验证码');
        return false;
    }
    var work_year = $('.suffer_p').attr('data-value');
    if(work_year == ''){
        window.alert('请选择工作经验');
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/activity/saveHDPositionApply",
        data: {"company_id": company_id, "position_id": position_id, "apply_name": apply_name, "apply_phone": phone,
            "phone_code": phone_code, "work_year": work_year},
        dataType: "json",
        success: function (data) {
            if(data == 0){
                window.alert('系统繁忙，请稍后再试');
            }else if(data == 1){
                window.alert('提交成功');
            }else if(data == 2){
                window.alert('验证码为空，请输入验证码');
            }else if(data == 3){
                window.alert('验证码失效，请重新获取');
            }else if(data == 4){
                window.alert('验证码不正确，请重新输入');
            }else if(data == 5){
                window.alert('你已申请该职位，不能在申请了');
            }
        }
    })
}

$(function(){

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
        alertFram = $('<div id="alertFram" style="color:#fff;border-radius:5px;word-wrap:break-all; overflow:hidden; width:240px; display:block; padding:10px 20px; font-size:14px;background-color:#333; position:fixed; top:50%;left:50%;z-index:999999999;text-align:center;line-height:25px;">' + txt + '</div>')
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


    //选择职位
    $(".position_p").tap(function () {
      if($(this).next().children('li').length <1){
        alert('暂无发布职位');
        return false;
      }
        if ($(this).next().css('display') == "none") {
            $(this).next().css({
                borderColor: '#5C91D9',
                borderTopColor: '#e0e0e0'
            }).show();
            $(this).css({
                borderColor: '#5C91D9',
                borderBottomColor: '#e0e0e0'
            });
        }
        else {
            $(this).next().hide();
            $(this).next().css({
                borderColor: '#e0e0e0'
            });
            $(this).css({
                borderColor: '#e0e0e0'
            });
        }
    });

    $(".xl_mes1 li").click(function (event) {
        $(this).parent().hide().prev().text($(this).text()).append('<img src="/static/images/h5/jt.png" alt="" class="claim_img">');
        $(this).parent().hide().prev().attr('data-value', $(this).val());
        $(this).parent().css({
            borderColor: '#e0e0e0'
        });
        $(this).parent().prev().css({
            borderColor: '#e0e0e0'
        });
    });

    //选择年薪
    $(".suffer_p").click(function (event) {
        if ($(this).next().css('display') == "none") {
            $(this).next().css({
                borderColor: '#5C91D9',
                borderTopColor: '#e0e0e0'
            }).show();
            $(this).css({
                borderColor: '#5C91D9',
                borderBottomColor: '#e0e0e0'
            });
        }
        else {
            $(this).next().hide();
            $(this).next().css({
                borderColor: '#e0e0e0'
            });
            $(this).css({
                borderColor: '#e0e0e0'
            });
        }
    });

    $(".xl_mes1 li").click(function(event) {
        $(this).parent().hide().prev().text($(this).text()).append('<img src="/static/images/h5/jt.png" alt="" class="claim_img">');
        $(this).parent().hide().prev().attr('data-value', $(this).val());
        $(this).parent().css({
            borderColor: '#e0e0e0'
        });
        $(this).parent().prev().css({
            borderColor: '#e0e0e0'
        });
    });

})