$(function(){
	(function(doc, win) {
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) return;
				if (clientWidth > 640) {
					clientWidth = 640;
				}
				docEl.style.fontSize = clientWidth / 10 + 'px';

			};
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	})(document, window);
	$('.ea_selet ul li').each(function(index,el) {
		 $(el).click(function(event) {
		 	$('.ea_selet ul li').removeClass('active');
		 	$(el).addClass('active');
		 	$('.item_ea .ea_info').css('display', 'none');
		 	$('#eain'+(index+1)).css('display', 'block');
		 });
	});

	var swiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    grabCursor: true,
	    loop: true,
	    autoplay: 3000,
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    paginationClickable: true
  });
})