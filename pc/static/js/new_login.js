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


function o_null(obj) {
    if($.trim($(obj).val()) != "")
        $(obj).next().next().hide();
    else
        $(obj).next().next().show();
};



window.onload=function onLoginLoaded() {
    GetLastUser();
}

function GetLastUser() {
    var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";//GUID标识符
    var usr = GetCookie(id);
    if (usr != null) {
        document.getElementById('account').value = usr;
        GetPwdAndChk();
    } else {
        document.getElementById('account').value = "";
    }
}
//点击登录时触发客户端事件

function SetPwdAndChk() {
    //取用户名
    var usr = document.getElementById('account').value;
    //将最后一个用户信息写入到Cookie
    SetLastUser(usr);

    //如果记住密码选项被选中
    if (document.getElementById('rmbUser').checked == true) {
        //取密码值并加密
        var pwd = document.getElementById('pwd').value;
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
    var usr = document.getElementById('account').value;
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
        document.getElementById('rmbUser').checked = true;
        document.getElementById('pwd').value = pwd;
    } else {
        document.getElementById('rmbUser').checked = false;
        document.getElementById('pwd').value = "";
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
    var usr = document.getElementById('account').value;
    var expdate = new Date();
    SetCookie(usr, null, expdate);
}
//验证登录信息是否为空
function validData(){
    if($.trim($('#account').val()) == ''){
        $("#account").siblings('.hint').css('display', 'block');
        $('#account').focus();
        return false;
    }else{
        $("#account").siblings('.hint').css('display', 'none');
    }
    if($.trim($('#pwd').val()) == ''){
        $("#pwd").siblings('.hint').css('display', 'block');
        $('#pwd').focus();
        return false;
    }else{
        $("#pwd").siblings('.hint').css('display', 'none');
    }
    SetPwdAndChk();
    return true;
}