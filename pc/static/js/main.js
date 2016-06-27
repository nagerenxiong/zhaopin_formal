$(function(){
	$("input[type='text']").not(".no").each(function(){
		$(this).placeholder();
	});
	$(".tabs").each(function(){
		$(this).tabs();
	});
	resize();
	$(window).resize(function(event) {
		resize();
	});

	$('.page_tc').height(window.innerHeight);
	$('.page_tc').width(window.innerWidth);

	$('.btn_sx').click(function () {
	    $('.page_tc_sx').css("display", "block");
	})
	$('.btn_tdjl').click(function () {
	    $('.page_tc_tdjl').css("display", "block");
	})
	$('.btn_tc_cloce').click(function () {
	    $('.page_tc').css("display", "none");
	})

	$('.page_xf_r ul li').hover(function () {
	    $(this).children('.xf_r_dw').css("display", "block");
	}, function () {
	    $('.page_xf_r ul li .xf_r_dw').css("display", "none");
	})


	$('.page_xf_r ul li').hover(function () {
	    $(this).children('.xf_r_dw').css("display", "block");
	}, function () {
	    $('.page_xf_r ul li .xf_r_dw').css("display", "none");
	})


	// $('.gygm_li h2').click(function () {
	//     if ($(this).parent().children('ul').css("display") == "none"){
	//         // $('.gygm_li h2').parent().children('ul').slideUp(500);
	//         $(this).parent().children('ul').slideDown(500);
	//         $(this).find('img').stop(true, false).css("transform", "rotate(0deg)");
	//     }
	//     else {
	//         $(this).parent().children('ul').slideUp(500);
	//         $(this).find('img').stop(true, false).css("transform", "rotate(180deg)");
	//     }
	// })

	// $('.gsss_btn1').click(function () {
	//     if ($(this).parent().children('.qygm_main').css("display") == "block")
	//     {
	//     	$(".qygm").find('img').stop(true, false).css("transform", "rotate(0deg)");
	//         $(this).parent().children('.qygm_main').slideUp(500);
	//     	$(this).find("p").removeClass('active');
	//     	$(this).css("background","#F6F5F5");$(this).css("border-bottom","1px solid #E8E8E8");
	//     	$(this).parent().siblings().find(".qygm_main").slideDown(500);
	//     	$(this).parent().siblings().find(".gsss_btn1").css("background","white");
	//     	$(this).parent().siblings().find(".gsss_btn1 p").addClass('active');
	//     	$(".qygm ul li ul").slideDown(300);
	//     }
	//     else {
	//     	$(".qygm").find('img').stop(true, false).css("transform", "rotate(0deg)");
	//         $('.page_main_l .qygm_main').slideUp(500);
	//         $(this).parent().children('.qygm_main').slideDown(500);
	//         $(".gsss_btn1").find("p").removeClass('active');
	//         $(this).find("p").addClass('active');
	//         $(this).css("background","white");
	//         $(".qygm ul li ul").slideDown(300);
	//     }
	// })

$(".gygm_li h2").click(function(event) {
	$(this).siblings('ul').slideToggle(300);
});


});

/*main*/ 
//

/*call*/
//
function resize(){
	var ht=$(window).height();
	$(".flht").height(ht);
}

function nDivs(thisObj, Num) {
    var tabObj = thisObj.parentNode.id;
    var tabList = document.getElementById(tabObj).getElementsByTagName("a");
    if ($(thisObj).hasClass('lbqh1hover'))
        return;
    else {
        $('#' + tabObj + ' a').removeClass('lbqh1hover');
        $(thisObj).addClass('lbqh1hover');
    }
    for (i = 0; i < tabList.length; i++) {
        if (i == Num) {
            document.getElementById(tabObj + i).style.display = "block";
        }
        else {
            document.getElementById(tabObj + i).style.display = "none";
        }
    }
}