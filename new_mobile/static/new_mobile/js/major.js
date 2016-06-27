var str = '<div class="menu choose_menu" id="menuJobs" style="display:none;position:absolute;z-index:3;">'
str += '<div class="menu_title">选择专业</div>';
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
var jobstr = '';
$.ajax({
	async: false,
	type: 'post',
    data: {'father_dictionary_value': '30000000'},
	url: '/mobile/ajax_getAjaxSecondDictionary',
	dataType: 'json',
	success: function(data) {
		data.forEach(function(dictionary) {
			jobstr += '<li class="area_big" rcoid="' + dictionary.dictionary_value + '"  title="' + dictionary.dictionary_name + '">' + dictionary.dictionary_name + '</li>';
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
            data: {'father_dictionary_value': rid},
            url: '/mobile/ajax_getAjaxSecondDictionary',
			dataType: 'json',
			success: function(data) {
				data.forEach(function(dictionary) {
					sjobstr += '<li onclick="showNextLeftJobs(this)" class="area_small" rcoid="' + dictionary.dictionary_value + '"  title="' + dictionary.dictionary_name + '">' + dictionary.dictionary_name + '</li>';
				})
			}
		});
		$("#jobs_right_list").html(sjobstr).show();
	}
});

function showNextLeftJobs(obj) {
    var rid = $(obj).attr('rcoid');
    var title = $(obj).attr('title');
	$("#menuJobs").hide();
	$("#selectJobs_next").show();
//	var jobstr = '';
//	$.ajax({
//		async: false,
//		type: 'post',
//		url: '/mobile/ajax_getAjaxPosition',
//		dataType: 'json',
//		success: function(data) {
//			data.forEach(function(position) {
//				jobstr += '<li onclick="showNextRightJobs()" class="area_big" rcoid="' + position.position_value + '" pid="' + position.position_value + '" title="' + position.position_name + '">' + position.position_name + '</li>';
//			})
//		}
//	});
    var jobstr = '<li onclick="showNextRightJobs(this)" class="area_big" rcoid="' + rid + '" pid="' + rid + '" title="' + title + '">' + title + '</li>';
	$("#selectJobs_next_left_list").html(jobstr);
    $("#selectJobs_next_left_list li:first").click();

}

function showNextRightJobs(obj) {
	var rid = $(obj).attr("rcoid");
	var sjobstr = "";
	$.ajax({
		async: false,
		type: 'post',
		data: {'father_dictionary_value': rid},
        url: '/mobile/ajax_getAjaxSecondDictionary',
		dataType: 'json',
		success: function(data) {
			data.forEach(function(dictionary) {
				sjobstr += '<li onclick="selectedJobs(this)" class="area_small" rcoid="' + dictionary.dictionary_value + '" pid="' + dictionary.dictionary_value + '" title="' + dictionary.dictionary_name + '">' + dictionary.dictionary_name + '</li>';
			})
		}
	});
	$("#selectJobs_next_right_list").html(sjobstr).show();
}

function selectedJobs(_this) {
	$("#major_name").val($(_this).attr('title'));
    $("#major_value").val($(_this).attr('rcoid'));

    $("#jobs_text").val($(_this).attr("title")).trigger('blur');
	$("#selectJobs_next").hide();
	$("#menuJobs").hide();
	$(".menu_bg_layer").remove();


}

function showFloatBox() {
	$("body").prepend("<div class='menu_bg_layer' onclick='closeFloatBox(this)'></div>");
	$(".menu_bg_layer").height($(document).height());
	$(".menu_bg_layer").css({
		width: $(document).width(),
		position: "absolute",
		left: "0",
		top: "0",
		"z-index": "2",
		"background-color": "#000000"
	});
	$(".menu_bg_layer").css("opacity", 0.3);
}
function closeFloatBox(_this)
{
	$("#selectJobs_next").hide();
	$("#menuJobs").hide();
	$(".menu_bg_layer").remove();
}
function majorShow() {
	$(this).blur();
	showFloatBox();
	$("#menuJobs").css({
		top: ($(window).height() - $('#menuJobs').outerHeight()) / 2 + $(document).scrollTop()
	});
	$("#selectJobs_next").css({
		top: ($(window).height() - $('#menuJobs').outerHeight()) / 2 + $(document).scrollTop()
	});
	$("#menuJobs").show();
}
function returnShow()
{
	$("#menuJobs").show();
	$("#selectJobs_next").hide();
}