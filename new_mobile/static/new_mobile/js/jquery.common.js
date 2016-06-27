var fagShowMore=false;
$(document).scroll(function(event) {
    if( typeof(o_async) != 'undefined'){
        o_async = true;//分页为异步
        if($("body").scrollTop()>=$(document).height()-$(window).height()){
            if(o_load==true){
                o_load= false;
                fagShowMore=true;
                $('body').append('<div id="fy_load" class="zsp_resume_but_box load spe"><a href="javascript:;"class="loading_more more"><i class="fa fa-refresh"></i><span>正在努力为您加载...</span></a></div>');
                $('body').scrollTop($(document).height());
                if(typeof next_page_position ==='function' )
                    next_page_position();
                if(typeof next_page_position2 ==='function')
                    next_page_position2();
                if(_counts == 0)
                    $("#fy_load").remove();
            }
            else{
              if(showLastPageIcon==true){
                $("#fy_load").remove();
              }
            }
        }
    }
});

function OpenCity(objid,input_cn,input,inputs,titstr)
{
	$(objid).unbind().click(function()
	{
			$(this).blur();
			html="";
			html+="<div class=\"selectbox\" id=\"selectbox\">";
			html+="<div class=\"titbox\">";
			html+="<div class=\"lefttit\">"+titstr+"</div>";
			html+="<div class=\"unrestricted\">不限制</div>";
			html+="<div class=\"closs\"></div>";
			html+="</div>  ";
			html+="<div class=\"listbox\" id=\"listboxb\">";
			html+="</div>";
			html+="<div class=\"listbox\" id=\"listboxs\">";
			html+="</div>";
			html+="</div>";
			if ($("#selectbox").html()==null)
			{
				$("body").append(html);
				$("#selectbox #listboxb").html(MakeLiB(QS_city_parent));
				$("#selectbox  .unrestricted").click( function () {
								$(input_cn).html('不限制');
								$(input).val('');
								$(inputs).val('');
								$("#selectbox #listboxb .li .t2").removeClass("h");
								$("#selectbox #listboxb").show();
								$("#selectbox #listboxs").hide();
								$("#selectbox").hide();
					});	
				//绑定关闭
				$("#selectbox .closs").click( function () { 
					$("#selectbox").hide();
				});
				$("#selectbox #listboxb .li").click( function () {
					$("#selectbox #listboxb .li .t2").removeClass("h");
					$(this).find(".t2").addClass("h");		
					$("#selectbox #listboxb").hide();
					$("#selectbox #listboxs").show();
					$(input).val($(this).attr('id'));
					if(QS_city[$(this).attr('id')]) {
						$("#selectbox #listboxs").html(MakeLi(QS_city[$(this).attr('id')]));
						$("#selectbox #listboxs .goback").click( function () {
							$("#selectbox #listboxb").show();
							$("#selectbox #listboxs").hide();	
						});								   
						$("#selectbox #listboxs .li").click( function () {
							$("#selectbox #listboxs .li .t2").removeClass("h");
							$(this).find(".t2").addClass("h");		
							$(input_cn).html($(this).attr('title'));
							$(inputs).val($(this).attr('id'));
							$("#selectbox").hide();
						});
					} else {
						$(input_cn).html($(this).attr('title'));
						$(inputs).val("0");
						$("#selectbox").hide();
					}
				});
			}
			else
			{
				$("#selectbox").show();
			}
	});
}
//生成大类
function MakeLiB(arr)
{
			if (arr=="")return false;
			var htmlstr='';
				for (x in arr)
				{
				 var v=arr[x].split(",");
				htmlstr+="<div class=\"li\"  title=\""+v[1]+"\" id=\""+v[0]+"\"><div class=\"t1\">"+v[1]+"</div><div class=\"t2\"></div><div class=\"clear\"></div></div>";
				}
			return htmlstr; 
}
//生成小类
function MakeLi(val)
{
			if (val=="")return false;
			arr=val.split("|");
			var htmlstr='<div class=\"goback\">返回上级分类</div>';
				for (x in arr)
				{
				 var v=arr[x].split(",");
				htmlstr+="<div class=\"li\"  title=\""+v[1]+"\" id=\""+v[0]+"\"><div class=\"t1\">"+v[1]+"</div><div class=\"t2\"></div><div class=\"clear\"></div></div>";
				}
			return htmlstr; 
}
//返回上一页
$(document).ready(function()
{
	$("#pageback").click( function () { 
	window.history.go(-1);
	});
});

var ShareService={
    TimeLine: function (title, link, img, successCall) {
        if (!img)img = defaultImg;
        link = urlProc(link);
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: img,
            trigger: function (res) {
                // alert('用户点击分享到朋友圈');
            },
            success: function (res) {
                if (successCall)
                    successCall();
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                alert([JSON.stringify(res)]);
            }
        });
    },
    AppMessage: function (title, desc, link, img, successCall) {
        if (!img)img = defaultImg;
        link = urlProc(link);
        //alert(link);
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                if (successCall)
                    successCall();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    SharedQQ: function (title, desc, link, img, successCall) {
        if (!img)img = defaultImg;
        link = urlProc(link);
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img, // 分享图标
            success: function () {
                if (successCall)
                    successCall();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    SharedWeiBo: function (title, desc, link, img, successCall) {
        if (!img)img = defaultImg;
        link = urlProc(link);
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img,// 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                if (successCall)
                    successCall();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
};
var WxShare= {
    TimeLine: function (title, link, img, successCall) {
        //if (!img)img = defaultImg;
        //link = urlProc(link);
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: img,
            trigger: function (res) {
                // alert('用户点击分享到朋友圈');
            },
            success: function (res) {
                if (successCall)
                    successCall();
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
                alert([JSON.stringify(res)]);
            }
        });
    },
    AppMessage: function (title, desc, link, img, successCall) {
        //if (!img)img = defaultImg;
        //link = urlProc(link);
        //alert(link);
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                if (successCall)
                    successCall();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    SharedQQ: function (title, desc, link, img, successCall) {
        //if (!img)img = defaultImg;
        //link = urlProc(link);
        wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img, // 分享图标
            success: function () {
                if (successCall)
                    successCall();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    SharedWeiBo: function (title, desc, link, img, successCall) {
        //if (!img)img = defaultImg;
        //link = urlProc(link);
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img,// 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                if (successCall)
                    successCall();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }
};
$(function(){
	$('.zsp_header_more').click(function(){
		$('.zsp_header_fixed').toggleClass('hover');
		$('.zsp_header_more_ul').toggleClass('hover');
	});
	$('.zsp_header_fixed').click(function(){
		$('.zsp_header_fixed').toggleClass('hover');
		$('.zsp_header_more_ul').toggleClass('hover');
	});
});
  // var timer = null;
  // var alertFram;
  // window.alert = function(txt, type, fun1) {
  //   var icon = "";
  //   var qrStr = ""
  //   clearInterval(timer);
  //   timer = setInterval(function() {
  //     if ($("#alertFram")[0]) {
  //       $("#alertFram").remove();
  //       clearInterval(timer);
  //     }
  //   }, 5000)
  //   alertFram = $('<div id="alertFram" style="left: 10px; top: 0; right: 10px; bottom: 0;margin: auto;color:#fff;padding:0;min-height:40px;max-height:120px;position:fixed;z-index:999999999;text-align:center;line-height:40px;"><div style="background-color:#0A385A;position: relative;padding-right: 20px;padding-left: 10px;font-size:16px">' + txt + '<img onclick="$(this).parent().parent().remove()" src="/static/new_mobile/images/tip_close.png" style="position: absolute;right:10px;top:10px" width="12" height="12"></div></div>')
  //   if (arguments[1] != null) {
  //     if (arguments[1] == 1) {
  //       icon = "alert_03";
  //     } else if (arguments[1] == 2) {
  //       icon = "alert_07";
  //     } else if (arguments[1] == 3) {
  //       clearInterval(timer);
  //       icon = "alert_15";
  //       qrStr = '<div><input type="button" id="qr_btn" value="确认" style="width:70px;height:30px;\
  //              line-height:30px;color:#fff;background-color:#5C91D9;border:0px;border-radius: 5px;font-size:14px;margin:0 10px;"/><input type="button"\
  //              value="取消" onclick="$(this).parent().parent().remove()" style="width:70px;height:30px;line-\
  //              height:30px;color:#232323;background-color:#fff;border:0px;border-radius: 5px;font-size:14px"/></div>';
  //     } else if (arguments[1] == 4) {
  //       icon = "alert_18";
  //     }
  //     alertFram = $('<div id="alertFram" style="left: 10px; top: 0; right: 10px; bottom: 0;margin: auto;color:#fff;padding:0;min-height:40px;max-height:120px;position:fixed;z-index:999999999;text-align:center;line-height:40px;"><div style="background-color:#0A385A;position: relative;padding-right: 20px;padding-left: 10px;font-size:16px;padding-bottom:10px;">' + txt + '<img onclick="$(this).parent().parent().remove()" src="/static/new_mobile/images/tip_close.png" style="position: absolute;right:10px;top:10px" width="12" height="12">' + qrStr + '</div></div>')
  //   }
  //   $("body").append(alertFram);
  // 1绿色，操作成功，2红色，操作失败，3橙色，提示信息
  //   function alert(str,type){
  //       if($(".m_hint").length <1){
  //           $("body").append('<style>.m_hint{transition: transform 0.5s ease;-webkit-transition: transform 0.5s ease;transform: translateY(-100%);-webkit-transform: translateY(-100%);}.m_hint.active{transform: translateY(0px) !important;-webkit-transform: translateY(0px) !important;}.m_hint p{margin:0;color:#fff;}</style>');
  //           $("body").append('<div class="m_hint" onclick="$(this).removeClass(\'active\');" style="width:100%;min-height:35px;position:fixed;top:0px;left:0px;text-align:center;line-height:35px;z-index:9999;color:#fff;font-size:14px;"><p style="width:98%;margin:0 auto;">'+str+'</p></div>');
  //       }
  //       else{
  //           if($(".m_hint").hasClass('active'))
  //               return false;
  //       }
  //       if(type == 1 ){
  //           $(".m_hint").css('background-color', '#04BE5B');
  //       }
  //       else if(type == 2){
  //           $(".m_hint").css('background-color', '#df3d3e');
  //       }else{
  //           $(".m_hint").css('background-color', '#ff8f00');
  //       }
  //       $(".m_hint p").text(str + "|" + arguments[0] + type);
  //       setTimeout(function(){$(".m_hint").addClass('active')},1)
  //       setTimeout(function(){
  //           $(".m_hint").removeClass('active');
  //       },3000);
  //   $("#qr_btn").click(function() {
  //     fun1();
  //   })
  // }
  function alert(arr){
        var str = arr[0];
        var type = arr[1];
        if($(".m_hint").length <1){
            $("body").append('<style>.m_hint{transition: transform 0.5s ease;-webkit-transition: transform 0.5s ease;transform: translateY(-100%);-webkit-transform: translateY(-100%);}.m_hint.active{transform: translateY(0px) !important;-webkit-transform: translateY(0px) !important;}.m_hint p{margin:0;color:#fff;}</style>');
            $("body").append('<div class="m_hint" onclick="$(this).removeClass(\'active\');" style="width:100%;min-height:35px;position:fixed;top:0px;left:0px;text-align:center;line-height:35px;z-index:9999;color:#fff;font-size:14px;"><p style="width:98%;margin:0 auto;">'+str+'</p></div>');
        }
        else{
            if($(".m_hint").hasClass('active'))
                return false;
        }
        if(type == 1 ){
            $(".m_hint").css('background-color', '#04BE5B');
        }
        else if(type == 2){
            $(".m_hint").css('background-color', '#df3d3e');
        }else{
            $(".m_hint").css('background-color', '#ff8f00');
        }
        $(".m_hint p").text(str);
        setTimeout(function(){$(".m_hint").addClass('active')},1)
        setTimeout(function(){
            $(".m_hint").removeClass('active');
        },3000);
    $("#qr_btn").click(function() {
      fun1();
    })
  }
function shareShow()
{
    var sWeiXinUa = navigator.userAgent.toLowerCase();
    if(sWeiXinUa.match(/MicroMessenger/i)=="micromessenger") {
       $("body").append('<div class="zsp_share_fidex shareCur" id="shareBox"><img src="/static/new_mobile/images/yq/xz_yd_icon_1.png" style="float:right;width:30%" /><div style="text-align:center;clear:both"><img src="/static/new_mobile/images/yq/xs.png" style="width:63%;" /></div></div>');
    } else {
        $("body").append('<div class="zsp_share_fidex shareCur" id="shareBox"><div class="zsp_share_web_red"><div class="zsp_share_web_tit">温馨提示：</div>\
        <div class="zsp_share_web_p">1.<img src="/static/new_mobile/images/93.png">微信关注“hcdy招聘”公众号</div>\
        <div class="zsp_share_web_p">2. 转发到<img src="/static/new_mobile/images/90.png">朋友圈或\
        <img src="/static/new_mobile/images/93.png">微信好友</div></div></div>');
    }
    $("#shareBox").fadeIn();
    $("#shareBox").click(function(){
        $(this).fadeOut();
    })
}


function shareShow1()
{
    var sWeiXinUa = navigator.userAgent.toLowerCase();
    if(sWeiXinUa.match(/MicroMessenger/i)=="micromessenger") {
       $("body").append('<div class="zsp_share_fidex shareCur" id="shareBox"><img src="/static/new_mobile/images/yq/xz_yd_icon_1.png" style="float:right;width:30%" /><div style="text-align:center;clear:both"><img src="/static/new_mobile/images/yq/xs1.png" style="width:63%;" /></div></div>');
    } else {
        $("body").append('<div class="zsp_share_fidex shareCur" id="shareBox"><div class="zsp_share_web_red"><div class="zsp_share_web_tit">温馨提示：</div>\
        <div class="zsp_share_web_p">1.<img src="/static/new_mobile/images/93.png">微信关注“hcdy招聘”公众号</div>\
        <div class="zsp_share_web_p">2. 转发到<img src="/static/new_mobile/images/90.png">朋友圈或\
        <img src="/static/new_mobile/images/93.png">微信好友</div></div></div>');
    }
    $("#shareBox").fadeIn();
    $("#shareBox").click(function(){
        $(this).fadeOut();
    })
}



//无图片的默认图片
function notfindimg(obj){
    var src = "";
    src="/static/mobile/images/qy_logo.png";
    obj.src=src;
    obj.onerror = null;
}
//默认头像
function notfind(obj, sex,x){
    var src = "";
    if(x == 2 || x == 4){
        src="/static/mobile/images/qy_logo.png";
    }
    else if(x == 3 || x== 5){
        if(sex=="女"){
            src="/static/mobile/images/jjr_tx1.png";
        }else{
            src="/static/mobile/images/jjr_tx.png";
        }
    }
    else{
        if(sex=="女"){
            src="/static/mobile/images/rcf_tx1.png";
        }else{
            src="/static/mobile/images/rcf_tx.png";
        }
    }
    obj.src=src;
    obj.onerror = null;
}

 function notfindsex(obj, sex){
        var src = "";
        if(sex=="男"){
            src="/static/mobile/images/jjr_tx.png";
        }else{
            src="/static/mobile/images/jjr_tx1.png";
       }
    obj.src=src;
    obj.onerror = null;
 }
 function showFloatBox() {
    $("body").prepend("<div class='menu_bg_layer' onclick='closeFloatBox(this)'></div>");
    $(".menu_bg_layer").height($(document).height());
    $(".menu_bg_layer").css({
        width: $(document).width(),
        position: "fixed",
        left: "0",
        top: "0",
        "z-index": "2",
        "background-color": "#000000"
    });
    $(".menu_bg_layer").css("opacity", 0.3);
}
function closeFloatBox(_this)
{
    $(".choose_menu").hide();
    $(".nianxing_box").hide();
    $(".more_box").hide();
    $(".menu_bg_layer").remove();
    
}


// 购买简历
function buy_headhunt_resume(resume_id) {
   commcapa('你确定要购买这份简历吗',resume_id);
}


function commcapa(headline,id){
    $("body").append('<div class="confirm_dh1" style="display:block;"><div class="ztcont1"><p>'+headline+'</p><div class="btn_save1">\
    <a href="javascript:void(0)" class="ensure_ex1" onClick="ensure('+id+')">确定</a>\
    <a href="#" class="ex_close1" onClick="mmedclose()">取消</a></div></div></div><div class="modal_wrap" style="display:block;"></div>');
}
function commcapa1(headline,ffm){
    $("body").append('<div class="confirm_dh1" style="display:block;"><div class="ztcont1"><p>'+headline+'</p><div class="btn_save1">\
    <a href="javascript:void(0)" class="ensure_ex1" onClick="'+ffm+'">确定</a>\
    <a href="#" class="ex_close1" onClick="mmedclose()">取消</a></div></div></div><div class="modal_wrap" style="display:block;"></div>');
}

function commcapa2(headline,ffm){
    $("body").append('<div class="confirm_dh1" style="display:block;"><div class="ztcont1"><div style="padding:20px 10% 10px 10%;">'+headline+'</div><div class="btn_save1">\
    <a href="javascript:void(0)" class="confirm_btn" style="width:49.5%" onClick="'+ffm+'">确定</a>\
    <a href="#" class="cancel_btn" style="width:49.5%" onClick="mmedclose()">取消</a></div></div></div><div class="modal_wrap" style="display:block;"></div>');
}
function mmedclose(){
    $('.modal_wrap').css('display', 'none');
    $('.confirm_dh1').css('display', 'none');
}




