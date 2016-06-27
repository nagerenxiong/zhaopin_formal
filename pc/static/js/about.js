
$(".slide li").click(function(event) {
	$(".c>div").css('display', 'none');
	$(this).addClass('active').siblings('').removeClass('active');
	$(".c>div").eq($(this).index()).css('display', 'block');
	$(".slide .abs").animate({top:$(this).index()*58+40+"px"}, 150);
	$(".slide").css('height', 'auto');
	$(".slide").css('height', $(".main").eq(0).height()+"px");
});

$(".questions li").click(function(event) {
	$(".questions li").removeClass('active');
	$(this).addClass('active');
	$(".cont .qa li").removeClass('show');
	$(".help .cont ul").css('display', 'none');
	$(".help .cont ul").eq($(this).index()).css('display', 'block');
});
$(".help .cont ul .word h2").click(function(event) {
	if($(this).next("p").css('display') == "none"){
		$(this).parent().parent().siblings().removeClass('active');
		$(this).parent().parent().addClass('active');
	}
	else{
		$(this).parent().parent().removeClass('active')
	}
});
$(".cont ul li .number").click(function(event) {
	_li = $(this).parent().parent();
	if(_li.hasClass('acitve')){
		_li.removeClass('active');
	}else{
		_li.siblings().removeClass('active');
		_li.addClass('active');
	}
});
$(".slide li").eq(parseInt(window.location.hash.replace(/#/,""))).click();

$(".slide").css('height', $(".main").eq(1).height()+"px");