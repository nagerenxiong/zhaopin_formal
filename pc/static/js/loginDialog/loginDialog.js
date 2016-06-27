function LoginDialog() {
	this.cfg = {};
}
LoginDialog.prototype = {
		open: function() {
		var layer_index;
		var htmlSTring='<ul id="login_box"style="padding:20px 30px;display:none">';
			htmlSTring+=' <li style="overflow:hidden"id="moveId">';
			htmlSTring+='       <img src="/static/images/19_x.png"style="float:right;cursor:pointer"onclick="layer.closeAll()">';
			htmlSTring+='        <span style="font-size:19px;font-weight:bold;color:#666;float:left">登录</span>';
			htmlSTring+=' </li >';
			htmlSTring+='  <li style="margin-top:20px;">';
			htmlSTring+='      <input type="text" id="account" style="width:333px;height:45px;background:url(/static/js/loginDialog/images_03.png) no-repeat 10px center;text-indent: 35px;color:#333;" placeholder="请输入邮箱账号或手机号码">';
			htmlSTring+='  </li>';
			htmlSTring+='  <li>';
			htmlSTring+='      <input type="password" id="password" placeholder="请输入密码"style="width:333px;height:45px;background:url(/static/js/loginDialog/images_09.png) no-repeat 10px center;text-indent: 35px;color:#333;">';
			htmlSTring+=' </li>';
			htmlSTring+=' <li>';
			htmlSTring+='      <a href ="javascript:void(0)" onclick="loginOperate()" style="width:336px;height:50px;background-color:#5c90d9;display:inline-block;line-height: 50px;text-align: center;margin-top: 25px;color:#fff;font-size: 18px;border-radius: 5px;">登录</a>';
			htmlSTring+=' </li>';
			htmlSTring+=' <li style="margin-top: 10px;">';
			htmlSTring+='      <input type ="checkbox"style ="vertical-align:middle">';
            htmlSTring+='       <label style ="vertical-align:middle">记住我</label>';
            htmlSTring+='       <a href="/zhmm" style="vertical-align:middle;margin-left: 36px;">忘记密码了？</a>';
            htmlSTring+='       <a href ="/system/new_Register" style="vertical-align:middle;margin-left: 70px;color:#ff9b43;">立即注册';
            htmlSTring+='           <img src ="/static/js/loginDialog/i_03.png"style ="vertical-align:-1px;margin-left: 5px">';
            htmlSTring+='       </a>';
			htmlSTring+=' </li>';
			htmlSTring+='  <li style="padding-top: 20px;border-top:1px dashed #d2d2d2;margin-top: 20px;">';
			htmlSTring+='      <span>使用其他方式登录</span>';
			htmlSTring+='       <a href="javascript:alert(\'攻城狮紧张建设中，感谢关注怀才当遇！\');"><img src="/static/js/loginDialog/images_12.png "style="margin-left: 76 px; vertical-align:middle;margin-right:5px"></a>';
			htmlSTring+='       <a href="javascript:alert(\'攻城狮紧张建设中，感谢关注怀才当遇！\');"><img src="/static/js/loginDialog/images_14.png"style="vertical-align:middle;margin-right:5px"></a>';
			htmlSTring+='       <a href="javascript:alert(\'攻城狮紧张建设中，感谢关注怀才当遇！\');"><img src="/static/js/loginDialog/images_16.png"style="vertical-align:middle;"></a>';
			htmlSTring+='  </li>';
			htmlSTring+='</ul>';
			$("head").append('<link rel="stylesheet" href="/static/js/uploader/layer/skin/layer.css" id="layui_layer_skinlayercss"><script src="/static/js/uploader/layer/layer.js" type="text/javascript"></script>');
			$("head").append('<style><style type="text/css">#login_box *{margin:0;padding:0;} .reset_layer .layui-layer-content{padding:0} .reset_layer .layui-layer-content input{border:1px solid #ddd;}</style></style>');
			$("body").append(htmlSTring);
				layer_index = layer.open({
					title: false,
					type: 1,
					closeBtn: 0,
                    skin: 'reset_layer',
					shade: [0.8, '#393D49'],
					area: ['399px', '420px'],
					shadeClose: false,
					content: $("#login_box")
				});
			}
		};
function loginOperate(){
    var regAccount = /^1[0-9]{10}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var account = $('#account').val();
    if($.trim(account) == ''){
        window.alert('请输入邮箱账号或手机号码',4);
        $('#account').focus();
        return false;
    }else if(!regAccount.test(account)){
        window.alert('你输入的账号格式不对，请输入邮箱账号或手机号码',4);
        $('#account').focus();
        return false;
    }
    var password = $('#password').val();
    if($.trim(password) == ''){
        window.alert('请输入密码',4);
        $('#password').focus();
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/ajax_login",
        data: {"account": account, "password": password},
        dataType: "json",
        success: function(data){
            //0-异常，1*-登录成功，2-密码不正确，3-账号未激活，4-账号不存在，5-账号或密码为空
            if(data == 0){
                window.alert('登录异常，请稍后再试');
            }else if(data > 10){
                //登录成功时，判断是什么角色，什么页面
                var url = window.location.href;
                //职位详情页刷新页面
                if(url.indexOf('/resume/zwxq') != -1){
                    if(data == 12 || data == 14){
                        window.location.href = '/system/new_company_index';
                    }else{
                        window.location.reload();
                    }
                }else if(url.indexOf('new_search_company') != -1){
                    //公司搜索根据角色跳不同页面
                    if(data == 12 || data == 14){
                        window.location.href = '/system/new_company_index';
                    }else {
                        window.location.href = '/position/ncompanysearch';
                    }
                }else if(url.indexOf('new_search_position') != -1 || url.indexOf('gzptsy') != -1){
                    //职位搜索页
                    if(data == 12 || data == 14){
                        window.location.href = '/system/new_company_index';
                    }else if(data == 13 || data == 15){
                        window.location.href = '/position/headhunter/naagentsearch';
                    }else{
                        window.location.href = '/position/npositionsearch';
                    }
                }else if(url.indexOf('agent_search') != -1){
                    //经纪人搜索
                    if(data == 12 || data == 14){
                        window.location.href = '/system/new_agent_search';
                    }else if(data == 13 || data == 15){
                        window.location.href = '/system/new_headhunter_index';
                    }else{
                        window.location.href = '/system/new_agent_search';
                    }
                }else if(url.indexOf('new_jlyl') != -1){
                    if(data == 11){
                        window.location.href = '/system/new_personal_index';
                    }else{
                        window.location.reload();
                    }
                }else if(url.indexOf('ckjjrsy') != -1){
                    if(data == 13 || data == 15){
                        window.location.href = '/system/new_headhunter_index';
                    }else{
                        window.location.reload();
                    }
                }
            }else if(data == 2){
                window.alert('密码不正确，请重新输入',4);
                $('#password').focus();
            }else if(data == 3){
                window.alert('账号未激活，请登录邮箱激活账号',4);
            }else if(data == 4){
                window.alert('账号不存在，请注册后登录',4);
                $('#account').focus();
            }else if(data == 5){
                window.alert('请输入账号密码',4);
            }
        }
    });
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