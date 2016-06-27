//栏目切换JS开始
$(function(){
     $(".sige").click(function(){
			  var i = $(".sige").index(this);	
			  $(this).addClass("sigehs").siblings(".sige").removeClass("sigehs");
			  $(".sigenr").eq(i).show().siblings(".sigenr").hide();
			});
});
//栏目切换JS结束

