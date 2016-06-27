var isSubmit = false;
$(function(){ 
    if (jQuery.validator)
    {
        /**
        * 控件添加表单验证 - 手机号码验证
        */
        jQuery.validator.addMethod("mobile", function(value, element) {
            var length = value.length;
            return this.optional(element) || (11 == length && /^(1[3-9]\d{9})$/.test(value));
        }, "手机号格式不正确");
        
	
        jQuery.validator.addMethod("userpass", function(value, element) {
            var chrnum = /^[a-zA-Z0-9\-~!@#$%^&*()=_|"\'?.,+{}[\]`:]{6,18}$/;
            return this.optional(element) || (chrnum.test(value));
        }, "密码为6-18位的数字或字符");
        
        jQuery.validator.addMethod("checkMoney", function(value, element) {
            var chrnum = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/;
            return this.optional(element) || (chrnum.test(value));
        }, "请输入正确的金额");
        
        jQuery.validator.addMethod("practicenumber", function(value, element) {
            var chrnum = /(^[0-9]{17}$)/;
            return this.optional(element) || (chrnum.test(value));
        }, "请输入正确的执业证号");
         
        jQuery.validator.addMethod("accountingnumber", function(value, element) {
            var chrnum = /(^[0-9]{5,30}$)/;
            return this.optional(element) || (chrnum.test(value));
        }, "请输入正确的执业证号");
    }
    
    /**
	 * 按enter自动提交表单
	 */
	$("input").keydown(function(e){
	      var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	      if (keyCode == 13){
	    	  var form = $(this).parents('form').eq(0);
	    	  if ('undefined' == typeof (form.attr('noEnter')))
	    	  {
	      		$(this).parent().submit();
	    	  }
	      }
	});
	
	$('body').on('click', '[data-role=qqask]', function(){
    	$("#BizQQWPA").click();
    	$.get('/stat/refer/type/1.html');
    });
	
	
	if(!CookieEnable())
	{  
	    alert(["对不起，您的浏览器的Cookie功能被禁用，请开启"]);        
	}
});


// 表单提交公共函数
function submitForm(url, formId, callBackFunc)
{
	if(isSubmit) return false;
	isSubmit = true;
	$.post(url, $("#" + formId).serialize(), function(result)
	{
		isSubmit = false;
		
		if ('undefined' != typeof(callBackFunc))
		{
			callBackFunc(result);
			return ;
		}
		if (true == result.ret)
		{
			if ('undefined' != typeof(result.data.url) && '' != result.data.url)
			{
				window.location.href = result.data.url;
			}
		}
		else
		{
			// 未登录则弹出登录框
			if ('undefined' != typeof(result.code) && 10001 == result.code && $("#quReg").length > 0)
			{
				Base.alert($("#quReg").val(), '快速注册 ', 860, 475);
				return ;
			}
			Base.alertTime(result.msg);
		}
	});
}

/**
 * js检查手机号是否合法
 */
function checkMobile(mobile)
{
	var mobile = $.trim(mobile);
	var reg = /^1[3-9][0-9]\d{8}$/;
	if (reg.test(mobile))
	{
		return true;
	}
	else
	{
		return false;
	}
}

/**
 * 异步获得分页信息
 * @param url 地址
 * @param div 存放信息的Dom容器ID
 * @param redirect 是否定位锚点
 */
function getAjaxPageData(url, div, redirect)
{
	var div = div || 'ajaxPageDiv';
	var redirect = redirect || false;
	$.getJSON(url, function(rt){
		$("#" + div).html(rt);
	});
	if (redirect)
	{
		location.href = "#" + div;
	}
	return false;
}

/**
 * 表单验证，指明错误放置的位置
 */
function validErrorPlacement(error, label)
{
	//error.appendTo(label.parent().parent());
	label.parent().parent().after(error);
}

/**
 * 读取顶部登录状态显示
 * @return
 */
function loadLoginState()
{
	$("#loginbar").load("/index/loginstate.html");
}

/**
 * 仅允许键入数字
 * @return
 */
function numberFilter(oElement) 
{
	var num = oElement.value.replace(/[^\d]+/gi, "");
	if (num < 1)
	{
		num = 1;
	}
    oElement.value = num;
}

/**
 * 动态改变多维radio的name
 * 参数请传表单id
 * @param arr
 */
function listRadio(formId)
{
	var name = '';
	var index = 0;
	var valuearr = [];
	var arr = []

	var chrstr = /^[a-zA-Z0-9-_]*\[[a-zA-Z0-9-_]+\]\[/;
	$("#" + formId + " input[type='radio']").each(function(){
		str = chrstr.exec($(this).attr('name'));
		if (str && str[0])
		{
			arr.push(str[0]);
		}
	});
	
	for (i in arr)
	{
		name = arr[i];
		if (name)
		{
			valuearr = [];
			
			$("#" + formId + " input[type='radio'][name^='" + name + "']").each(function(){
				if (-1 == $.inArray($(this).val(), valuearr))
				{
					valuearr.push($(this).val());
				}
			});
			
			for (var j = 0; j < valuearr.length; j++)
			{
				index = 0;
				$("#" + formId + " input[type='radio'][name^='" + name + "'][value='" + valuearr[j] + "']").each(function(){
					$(this).attr('name', $(this).attr('name').replace(/\[\d*\]/, '[' + (index++) + ']'));
				});
			}
			
		}
	}
}

function CookieEnable()
{  
    var result=false;  
    if(navigator.cookiesEnabled)  return true;  

    document.cookie = "testcookie=yes;";  

    var cookieSet = document.cookie;  

    if (cookieSet.indexOf("testcookie=yes") > -1)  result=true;  
     
     document.cookie = "";  
      
    return result;  
}  

