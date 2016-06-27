var tradestr = '';

function selectedtrade(_this) {
		$("#trad_text").val($(_this).attr("title")).trigger('blur');
		$("#trad_span").text($(_this).attr("title"));
		$("#menutrade").hide();
		$("#trade").val($(_this).attr('rcoid'));
        $(".industry_type").val($(_this).attr('rcoid'));
		$(".postaion_name").val($(_this).attr('title'));
		$(".menu_bg_layer").remove();
	}

function tradeShow() {
	var str = '<div class="menu choose_menu" id="menutrade" style="display:none;position:absolute;z-index:3;">'
	str += '<div class="menu_title">选择行业</div>';
	str += '<div class="choose_close"></div>';
	str += '<div class="area_choose">';
	str += '<ul class="area_left" id="trade_left_list">';
	str += '</ul>';
	str += '<ul class="area_right" id="trade_right_list"></ul>';
	str += '<div class="clear"></div>';
	str += '</div>';
	str += '</div>';
	$("body").prepend(str);
	$(this).blur();
	// showFloatBox();
	var meheight = ($(window).height() - $('#menutrade').outerHeight()) / 2 + $(document).scrollTop()
	$("#menutrade").css({
		top: (meheight + 50) });
	$("#menutrade").show();
	$.ajax({
		async: false,
		type: 'post',
		data: {
			'p_value': 'H0'
		},
		url: '/mobile/ajax_get_industry_value',
		dataType: 'json',
		success: function(data) {
			data.forEach(function(dictionary) {
				tradestr += '<li class="area_big" rcoid="' + dictionary.dictionary_value + '"  title="' + dictionary.dictionary_name + '">' + dictionary.dictionary_name + '</li>';
			})
		}
	});
	$("#trade_left_list").html(tradestr);
	$("#trade_left_list li").click(function() {
		var rid = $(this).attr("rcoid");
		var stradestr = "";
		if (true) {
			$.ajax({
				async: false,
				type: 'post',
				data: {
					'p_value': rid
				},
				url: '/mobile/ajax_get_industry_value',
				dataType: 'json',
				success: function(data) {
					data.forEach(function(dictionary) {
						stradestr += '<li onclick="selectedtrade(this)" class="area_small" rcoid="' + dictionary.dictionary_value + '"  title="' + dictionary.dictionary_name + '">' + dictionary.dictionary_name + '</li>';
					})
				}
			});
			$("#trade_right_list").html(stradestr).show();
		}
	});
}
