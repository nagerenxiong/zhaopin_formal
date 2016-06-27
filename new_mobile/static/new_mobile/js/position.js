
	function showNextLeftJobs() {
		$("#menuJobs").hide();
		$("#selectJobs_next").show();
		var jobstr = '';
		$.ajax({
			async: false,
			type: 'post',
			url: '/mobile/ajax_getAjaxPosition',
			dataType: 'json',
			success: function(data) {
				data.forEach(function(position) {
					jobstr += '<li onclick="showNextRightJobs()" class="area_big" rcoid="' + position.position_value + '" pid="' + position.position_value + '" title="' + position.position_name + '">' + position.position_name + '</li>';
				})
			}
		});
		$("#selectJobs_next_left_list").html(jobstr);
	}
	function selectedJobs(_this) {
		$("#jobs_text").val($(_this).attr("title")).trigger('blur');
		$("#selectJobs_next").hide();
		$("#menuJobs").hide();
		$(".postaion_type").val($(_this).attr('rcoid'));
		$(".postaion_name").val($(_this).attr('title'));
		$(".menu_bg_layer").remove();
	}
	function showNextRightJobs() {
		var rid = $(this).attr("rcoid");
		var rpid = $(this).attr("pid");
		var rtitle = $(this).attr("title");
		var sjobstr = "";
		$.ajax({
			async: false,
			type: 'post',
			data: {
				'p_value': rid
			},
			url: '/mobile/ajax_getAjaxPosition',
			dataType: 'json',
			success: function(data) {
				data.forEach(function(position) {
					sjobstr += '<li onclick="selectedJobs(this)" class="area_small" rcoid="' + position.position_value + '" pid="' + position.position_value + '" title="' + position.position_name + '">' + position.position_name + '</li>';
				})
			}
		});
		$("#selectJobs_next_right_list").html(sjobstr).show();
	}
	function returnShow() {
		$("#menuJobs").show();
		$("#selectJobs_next").hide();
	}
function positionShow() {
	var str = '<div class="menu choose_menu" id="menuJobs" style="display:none;position:absolute;z-index:3;">'
	str += '<div class="menu_title">选择职位</div>';
	str += '<div class="choose_close"></div>';
	str += '<div class="area_choose">';
	str += '<ul class="area_left" id="jobs_left_list">';
	str += '</ul>';
	str += '<ul class="area_right" id="jobs_right_list"></ul>';
	str += '<div class="clear"></div>';
	str += '</div>';
	str += '</div>';

	str += '<div class="menu choose_menu" id="selectJobs_next" style="display:none;position:absolute;z-index:3;">';
	str += '<div class="menu_title"id="return_jobs" onclick="returnShow()">返回上级</div>';
	str += '<div class="choose_close"></div>';
	str += '<div class="area_choose">';
	str += '<ul class="area_left" id="selectJobs_next_left_list">';
	str += '</ul>';
	str += '<ul class="area_right" id="selectJobs_next_right_list"></ul>';
	str += '<div class="clear"></div>';
	str += '</div>';
	str += '</div>';
	$("body").prepend(str);
	$(this).blur();
	showFloatBox();
	$("#menuJobs").css({
		top: ($(window).height() - $('#menuJobs').outerHeight()) / 2 + $(document).scrollTop()
	});
	$("#selectJobs_next").css({
		top: ($(window).height() - $('#menuJobs').outerHeight()) / 2 + $(document).scrollTop()
	});
	$("#menuJobs").show();
	var ifShowNextId = false;
	var jobstr = '';
	$.ajax({
		async: false,
		type: 'post',
		url: '/mobile/ajax_getAjaxPosition',
		dataType: 'json',
		success: function(data) {
			data.forEach(function(position) {
				var indexFont = position.position_value.substr(0, 1);
				var length = position.position_value.length;
				if (indexFont == "h" && length > 6) {
					ifShowNextId = true;
				}
				jobstr += '<li class="area_big" rcoid="' + position.position_value + '"  title="' + position.position_name + '">' + position.position_name + '</li>';
			})
		}
	});
	$("#jobs_left_list").html(jobstr);
	$("#jobs_left_list li").click(function() {
		var rid = $(this).attr("rcoid");
		var rpid = $(this).attr("pid");
		var rtitle = $(this).attr("title");
		var sjobstr = "";
		if (true) {
			$.ajax({
				async: false,
				type: 'post',
				data: {
					'p_value': rid
				},
				url: '/mobile/ajax_getAjaxPosition',
				dataType: 'json',
				success: function(data) {
					data.forEach(function(position) {
						if (ifShowNextId)
							sjobstr += '<li onclick="showNextLeftJobs()" class="area_small" rcoid="' + position.position_value + '"  title="' + position.position_name + '">' + position.position_name + '</li>';
						else
							sjobstr += '<li onclick="selectedJobs(this)" class="area_small" rcoid="' + position.position_value + '"  title="' + position.position_name + '">' + position.position_name + '</li>';
					})
				}
			});
			$("#jobs_right_list").html(sjobstr).show();
		}
	});
}