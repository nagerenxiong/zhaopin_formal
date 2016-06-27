$(function(){
    $("body").append('<div class="tipAlert"><i class="fa fa-check-circle"><div class="writeBg"></div></i><p></p></div>');
	
	
	$(".tipAlert").live("click",function(){
		$(this).fadeOut();
		window.location.reload();
	})
})

function alertTip(a){
	$(".tipAlert").find("p").text(a);
	$(".tipAlert").fadeIn();
	setTimeout(function(){
		$(".tipAlert").fadeOut();
		window.location.reload();
	},1500)
}
