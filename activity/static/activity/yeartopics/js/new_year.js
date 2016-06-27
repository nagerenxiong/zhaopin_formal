
$(function(){
	$('.close').click(function(event) {
		$('.float_bou').hide();
	});
	$('.con_address').click(function(event) {
		$('.float_bou').show();
	});
    
})


//获奖信息填写
function savelottery(){	
	var phone = $.trim($('#way').val());
	var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if($('#account').val ==""){
        alert("请输入账号");
        return false;
    }
    if($('#linkman').val ==""){
        alert("请输入联系人姓名");
        return false;
    }
    if($('#way').val() ==""){
    	alert("请输入联系方式");
    	return false;
    }    
    if(!phoneReg.test(phone)) {
    	alert("请输入有效的手机号码！");
    }
    if($('#rec_add').val() ==""){
    	alert("请输入收货地址");
    	return false;
    }  
    $('.float_bou').hide();
	$('.modal_wrap').hide();
}



//弹框
 var timer = null;
    var alertFram;
    window.alert = function(txt) {
        clearInterval(timer);
        timer =setInterval(function() {
            if ($("#alertFram")[0]) {
                $("#alertFram").remove();
                clearInterval(timer);
            }
        }, 1600)
        alertFram = $('<div id="alertFram" style="color:#fff;border-radius:5px;word-wrap:break-all; overflow:hidden; width:240px; display:block; padding:10px 20px; font-size:14px;background-color:#333; position:fixed; top:50%;left:43%;z-index:999999999;text-align:center;line-height:25px;">' + txt + '</div>')        
        if ($("#alertFram")[0]) {
            return;
        }8
        $("body").append(alertFram);
        var width = alertFram.width();
        var height = alertFram.height();
        alertFram.css({
            marginLeft: -width/2+'px',
            marginTop: -height/2+'px'
        });
      }
