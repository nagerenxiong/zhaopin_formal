$(function(){
$(".grxx").hover(function() {
	$(this).find('ul').show();
}, function() {
	$(this).find('ul').hide();
});
//下划线根据active初始化位置
var x = 0;
	$(".slide").each(function(index, el) {
		$(this).stop(true, false).animate({width:$(this).siblings('li').filter('.active').outerWidth() +"px"}, 300);
	});

//下划线切换
	function underline(li,slide){
		var _this = li;
		li.hover(function(event) {
			if($(this).index() !=_this.filter('.active').index()){
			slide.stop(true, false).fadeOut(300);
			slide.css({left:this.offsetLeft+"px",width:$(this).outerWidth() +"px"});
			slide.stop(true, true).fadeIn(300);
		}
			// slide.stop(true, false).animate({left:this.offsetLeft+"px",width:$(this).outerWidth() +"px"}, 300);
		},function(){
			if($(this).index() !=_this.filter('.active').index()){
			slide.stop(true, false).fadeOut(300);
			slide.css({left:_this.filter('.active')[0].offsetLeft+"px",width:li.filter('.active').outerWidth() +"px"});
			slide.stop(true, true).fadeIn(300);
		}
			 // slide.stop(true, false).animate({left:_this.filter('.active')[0].offsetLeft+"px",width:li.filter('.active').outerWidth() +"px"}, 300);
		});
	};
	underline($(".nav li:not('.slide')"),$(".nav li.slide"));
	underline($(".resume_select li:not('.slide')"),$(".resume_select li.slide"));
	underline($(".sidebar1 .sidebar_select>li:not('.slide')"),$(".sidebar1 .sidebar_select li.slide"));
	underline($(".tddzw_select li:not('.slide')"),$(".tddzw_select li.slide"));
//热门搜索点击
		$(".o_search .hotsearch li").click(function(event) {
			$(".o_search .search_input").val($(this).text());
		});

//下拉
		function slide(btn,ul){
			btn.click(function(event) {
				ul.slideToggle(150);
			});
			ul.children('li').click(function(event) {
				ul.slideUp(150);
				btn.children('span').text($(this).text());
			});
			ul.parent().mouseleave(function(event) {
				ul.slideUp(150);
			});
		}
		slide($(".o_search .search_select div"),$(".o_search .search_select ul"));

//简历收缩拉伸
		$(".result #ppd_zw h2").click(function(event) {
				$(this).siblings('div').slideToggle(150);

				if($(this).children('span').text()=="+")
					$(this).children('span').css({'font-size':'14px','top':'16px'}).text("—");
				else
					$(this).children('span').css({'font-size':'25px','top':'8px'}).text("+");
		});

	//新增委托下的全选
		$("#qx").click(function(event) {
			if($(this).attr("checked")){
				$("#xz_wt .match input[type='checkbox']").attr('checked', true);
			}
			else{
				$("#xz_wt .match input[type='checkbox']").attr('checked', false);
			}
		});
	//招聘职位选择
	$(".zpzw li:not('.leading')").click(function(event) {
		$(this).addClass('active').siblings('li').removeClass('active');
	});
	$(".tddzw_select li:not('.leading')").click(function(event) {
		$(this).addClass('active').siblings('li').removeClass('active');
	});
	//简历条件选择
	function select_slide(li,div){
		li.click(function(event) {
			$(this).addClass('active').siblings('li').removeClass('active');
			div.css('display', 'none');
			div.eq($(this).index()).css('display', 'block');
		});
	}
		select_slide($(".resume_select li:not('.slide')"),$(".result>div"));
		select_slide($(".sidebar1 .sidebar_select>li:not('.slide')"),$(".sidebar1 .sidebar_man"));
		$(".result").on('click', '.tddzw_header .state', function(event) {
			var _this = $(this); 
			var o_this = $(this).parent().parent();
			o_this.siblings('.tddzw_state').find('b').stop(true, false).css('display', 'none');
			o_this.siblings('.tddzw_state').find('.particulars').css('opacity', '0')
			o_this.siblings('.tddzw_state').slideToggle(150,function(){
				$(this).find('b').fadeIn(300);
				var $jdt = $(this).find('.o_progress b.c_5c');
            	$jdt.css('width', '0px');
            	$jdt.siblings('li').children('p').removeClass('active');

				switch(_this.text()){
					case "待处理":
						$jdt.animate({width:"0px"}, 600,function(){
							$jdt.siblings('li').eq(0).children('p').addClass('active');
							$('.particulars').animate({opacity:1}, 150);
						});
						break;
					case "待沟通":
						$jdt.animate({width:"0px"}, 600,function(){
							$jdt.siblings('li').eq(0).children('p').addClass('active');
						});
						$jdt.animate({width:"160px"}, 600,function(){
							$jdt.siblings('li').eq(1).children('p').addClass('active');
							$('.particulars').animate({opacity:1}, 150);
						});
						break;
					case "面试":
						$jdt.animate({width:"0px"}, 600,function(){
							$jdt.siblings('li').eq(0).children('p').addClass('active');
						});
						$jdt.animate({width:"160px"}, 600,function(){
							$jdt.siblings('li').eq(1).children('p').addClass('active');
						});
						$jdt.animate({width:"320px"}, 600,function(){
							$jdt.siblings('li').eq(2).children('p').addClass('active');
							$('.particulars').animate({opacity:1}, 150);
						});
						break;
					case "不合适":
						$jdt.animate({width:"0px"}, 600,function(){
							$jdt.siblings('li').eq(0).children('p').addClass('active');
						});
						$jdt.animate({width:"160px"}, 600,function(){
							$jdt.siblings('li').eq(1).children('p').addClass('active');
						});
						$jdt.animate({width:"320px"}, 600,function(){
							$jdt.siblings('li').eq(2).children('p').addClass('active');
						});
						
						$jdt.animate({width:"480px"}, 600,function(){
							$jdt.siblings('li').eq(3).show().children('p').addClass('active');
                    		$jdt.siblings('li').eq(4).css('display', 'none');
							$jdt.siblings('b').css('width', '65%');
							$('.particulars').animate({opacity:1}, 150);
						})
						 
                    	break;
					case "已入职":
						$jdt.animate({width:"0px"}, 600,function(){
							$jdt.siblings('li').eq(0).children('p').addClass('active');
						});
						$jdt.animate({width:"160px"}, 600,function(){
							$jdt.siblings('li').eq(1).children('p').addClass('active');
						});
						$jdt.animate({width:"320px"}, 600,function(){
							$jdt.siblings('li').eq(2).children('p').addClass('active');
						});
						$jdt.animate({width:"480px"}, 600,function(){
							$jdt.siblings('li').eq(4).children('p').addClass('active');
                    		$jdt.siblings('li').eq(3).css('display', 'none');
							$jdt.siblings('b').css('width', '65%');
							$('.particulars').animate({opacity:1}, 150);
						})
                    	break;
					}
					
				});
		});
		
	
    // 求职者首页下投递的职位下的状态进度


    
})