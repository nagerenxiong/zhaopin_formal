var areastr = '';
function selectedarea1(_this) {
		$("#area_txt").val($(_this).attr("title")).trigger('blur');
		$("#menuarea").hide();
		$(".city_value").val($(_this).attr('rcoid'));
		$(".city_name").val($(_this).attr('title'));
		$(".menu_bg_layer").remove();
	}
function areaShow() {
	var str = '<div class="menu choose_menu" id="menuarea" style="display:none;position:absolute;z-index:3;">'
	str += '<div class="menu_title">所在城市</div>';
	str += '<div class="choose_close"></div>';
	str += '<div class="area_choose">';
	str += '<ul class="area_left" id="area_left_list">';
	str += '</ul>';
	str += '<ul class="area_right" id="area_right_list"></ul>';
	str += '<div class="clear"></div>';
	str += '</div>';
	str += '</div>';
	$("body").prepend(str);
	$(this).blur();
	showFloatBox();
	$("#menuarea").css({
		top: ($(window).height() - $('#menuarea').outerHeight()) / 2 + $(document).scrollTop()
	});
	$("#menuarea").show();
	$.ajax({
		async: false,
        type: 'post',
        url: '/mobile/ajax_getAjaxProvinces',
        dataType: 'json',
		success: function(data) {
			data.forEach(function(dictionary) {
				areastr += '<li class="area_big" rcoid="' + dictionary.area_value + '"  title="' + dictionary.area_name + '">' + dictionary.area_name + '</li>';
			})
		}
	});
	$("#area_left_list").html(areastr);
	$("#area_left_list li").click(function() {
		var rid = $(this).attr("rcoid");
		var sareastr = "";
		if (true) {
			$.ajax({
				async: false,
                type: 'post',
                data: {'father_dictionary_value': rid},
                url: '/mobile/ajax_getAjaxSecondDictionary',
                dataType: 'json',
				success: function(data) {
					data.forEach(function(dictionary) {
						sareastr += '<li onclick="selectedarea1(this)" class="area_small" rcoid="' + dictionary.dictionary_value + '"  title="' + dictionary.dictionary_name + '">' + dictionary.dictionary_name + '</li>';
					})
				}
			});
			$("#area_right_list").html(sareastr).show();
		}
	});
}
