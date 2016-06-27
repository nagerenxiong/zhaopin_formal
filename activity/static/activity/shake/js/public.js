
$("#show_activity").on('touchstart', function() {
	$("#dialog_background").show();
	$("#activity_rules_box").show();
	var activity_rules_box_height = $("#activity_rules_box").height() * 1 / 2;
	$("#activity_rules_box").css('margin-top', "-" + activity_rules_box_height + "px");
})
$(".accout_type_box").on('touchstart', 'span', function() {
	$(".accout_type_box span").removeClass('active');
	$(this).addClass('active');
})
$(".code").on('touchstart', function() {
	var i = 60;
	var _this = this;
	var timer_code = setInterval(function() {
		if (i < 0) {
			clearInterval(timer_code);
			$(_this).text('获取验证码');
			return;
		}
		$(_this).text(i)
		i--;
	}, 1000)
})
var top_margin = botom_margin = topHeightP = 0 * 1;
document.getElementById("dj").addEventListener("touchstart", function() {
	shake();
})

function shake() {
	if (top_margin != 0) return;
	var winHeight = $("#bottom").height();
	var winWidth = $("#bottom").width();
	var topHeight = winHeight * 50 / 100;
	var bottomHeight = winHeight - topHeight;
	$("#top").attr('style', 'clip:rect(0,' + winWidth + 'px,' + topHeight + 'px,0)');
	$("#bottom").attr('style', 'clip:rect(' + bottomHeight + 'px,' + winWidth + 'px,' + winHeight + 'px,0)');
	var bottomHeightP = parseFloat(winHeight);
	var c_topHeight = 0 * 1;
	var c_bottomHeight = 0 * 1;
	timer = setInterval(function() {
		bottomHeightP -= 10;
		topHeightP += 10;
		c_topHeight += 10;
		c_bottomHeight -= 10;
		top_margin += 10;
		botom_margin += 10;
		if (botom_margin * 2 >= $("#center").height() * 1 - 20) {
			clearInterval(timer);
			timer1 = setTimeout(function() {
				timer2 = setInterval(function() {
					bottomHeightP += 10;
					topHeightP -= 10;
					c_topHeight -= 10;
					c_bottomHeight += 10;
					top_margin -= 10;
					botom_margin -= 10;
					if (botom_margin <= 0) {
						clearInterval(timer2);
						var arr = [1, 2, 3, 4, 5, 6];
						var index = Math.floor((Math.random() * arr.length));
						if (index == 1) {
							$("#reg_box").show();
							var reg_boxHeight=parseFloat($("#reg_box").height())/2;
							$("#reg_box").css('margin-top','-'+reg_boxHeight+"px");
							$("#dialog_background").show();
						} else if (index == 2) {
							$("#login_box").show();
							var reg_boxHeight=parseFloat($("#login_box").height())/2;
							$("#login_box").css('margin-top','-'+reg_boxHeight+"px");
							$("#dialog_background").show();
						} else if (index == 3) {
							$("#jp_box").show();
							var jp_box_width = $("#jp_box").width() * 1 / 0.77;
							$("#jp_box").height(jp_box_width + "px");
							$("#jp_box").css('margin-top', '-' + jp_box_width * 1 / 2 + 'px');
							$("#dialog_background").show();
						} else if (index == 4) {
							$("#zj_box").show();
							var zj_box_width = $("#zj_box").width() * 1 / 0.77;
							$("#zj_box").height(zj_box_width + "px");
							$("#zj_box").css('margin-top', '-' + zj_box_width * 1 / 2 + 'px');
							$("#dialog_background").show();
						} else if (index == 5) {
							$("#cjjh_box").show();
							var cjjh_box_width = $("#cjjh_box").width() * 1 / 0.77;
							$("#cjjh_box").height(cjjh_box_width + "px");
							$("#cjjh_box").css('margin-top', '-' + cjjh_box_width * 1 / 2 + 'px');
							$("#dialog_background").show();
						} else if (index == 6) {
							$("#cjjh_no_box").show();
							var cjjh_no_box_width = $("#cjjh_no_box").width() * 1 / 0.77;
							$("#cjjh_no_box").height(cjjh_no_box_width + "px");
							$("#cjjh_no_box").css('margin-top', '-' + cjjh_no_box_width * 1 / 2 + 'px');
							$("#dialog_background").show();
						}
					}
					$("#top").attr('style', 'clip:rect(' + topHeightP + 'px,' + winWidth + 'px,' + topHeight + 'px,0);bottom:' + botom_margin + 'px');
					$("#bottom").attr('style', 'clip:rect(' + bottomHeight + 'px,' + winWidth + 'px,' + bottomHeightP + 'px,0);top:' + top_margin + 'px');
					$(".circle_top").attr('style', 'top:' + c_topHeight + 'px');
					$(".circle_bottom").attr('style', 'top:' + c_bottomHeight + 'px');
				}, 20)
			}, 1000)
		}
		$("#top").attr('style', 'clip:rect(' + topHeightP + 'px,' + winWidth + 'px,' + topHeight + 'px,0);bottom:' + botom_margin + 'px');
		$("#bottom").attr('style', 'clip:rect(' + bottomHeight + 'px,' + winWidth + 'px,' + bottomHeightP + 'px,0);top:' + top_margin + 'px');
		$(".circle_top").attr('style', 'top:' + c_topHeight + 'px');
		$(".circle_bottom").attr('style', 'top:' + c_bottomHeight + 'px');
	}, 20);
}
$("#dialog_background").on('touchstart',function(){
		$(".yyl_box").hide();
		$(this).hide();
	})
$("#activity_rules_min_box .address").click(function(){
	$("#activity_rules_box").hide();
	$("#activity_rules_box1").show();
	var activity_rules_box_height = $("#activity_rules_box1").height() * 1 / 2;
	$("#activity_rules_box1").css('margin-top', "-" + activity_rules_box_height + "px");
})
$(".close_activity").on('touchstart',function(){
	$("#dialog_background").hide();
	$(this).parent().parent().hide();
})
$(".close_btn").on('touchstart', function() {
	$(this).parent().hide();
	$("#dialog_background").hide();
})
$("#share_btn").on('touchstart',function(){
	shareShow();
})
function shareShow()
{
    var sWeiXinUa = navigator.userAgent.toLowerCase();
    if(sWeiXinUa.match(/MicroMessenger/i)=="micromessenger") {
       $("#share_box").show();
       $("#dialog_background").show();
    }
     $("#share_box").show();
      $("#dialog_background").show();
}
$(".my_jp_btn").on('touchstart',function(){
	$(this).parent().parent().hide();
	$("#jp_box").show();
	var jp_box_width = $("#jp_box").width() * 1 / 0.77;
	$("#jp_box").height(jp_box_width + "px");
	$("#jp_box").css('margin-top', '-' + jp_box_width * 1 / 2 + 'px');
	$("#dialog_background").show();
})
$("#login_box_btn").on('touchstart',function(event) {
	$("#reg_box").hide();
	$("#login_box").show();
	var reg_boxHeight=parseFloat($("#login_box").height())/2;
	$("#login_box").css('margin-top','-'+reg_boxHeight+"px");
});
$("#reg_box_btn").on('touchstart',function(event) {
	$("#login_box").hide();
	$("#reg_box").show();
	var reg_boxHeight=parseFloat($("#reg_box").height())/2;
	$("#reg_box").css('margin-top','-'+reg_boxHeight+"px");
});