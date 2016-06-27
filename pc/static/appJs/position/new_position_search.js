$(function() {
    $(".sh_submit").click(function(event) {
        var shval = $(".sh_submit").text();
        if (shval == "收起") {
            $('.details').removeClass("dk");
            $('#choice_re').removeClass("dn");
            $('.details').addClass("dn");
            $('#choice_re').addClass("dk");
            $('#nx').text(age);
            $('#gzjl').text(work);
            $('#xl').text(edre);
            $('#xz').text(job);
            $('#fbt').text(rtime);
            $(".sh_submit").html('展开<i class="active"></i>');
        } else {
            $('.details').removeClass("dn");
            $('#choice_re').removeClass("dk");
            $('.details').addClass("dk");
            $('#choice_re').addClass("dn");
            $(".sh_submit").html('收起<i></i>');
        }
    });
    var age = "不限";
    var work = "不限";
    var edre = "不限";
    var job = "不限";
    var rtime = "不限";
    //行业职位确定选择事件
    $('.confirm_btn2').click(function() {
        positionSearch();
    });
    //年薪范围
    $("#age_scope a").each(function(index, el) {
        $(el).click(function(event) {
            $("#age_scope a").removeClass('active');
            $(el).addClass('active');
            age = $(el).text();
            positionSearch();
        });
    });
    //工作经验
    $("#work_ex a").each(function(index, el) {
        $(el).click(function(event) {
            $("#work_ex a").removeClass('active');
            $(el).addClass('active');
            work = $(el).text();
            positionSearch();
        });
    });
    //学历要求
    $("#ed_re a").each(function(index, el) {
        $(el).click(function(event) {
            $("#ed_re a").removeClass('active');
            $(el).addClass('active');
            edre = $(el).text();
            positionSearch();
        });
    });
    //工作性质
    $("#job_nat a").each(function(index, el) {
        $(el).click(function(event) {
            $("#job_nat a").removeClass('active');
            $(el).addClass('active');
            job = $(el).text();
            positionSearch();
        });
    });
    //发布时间
    $("#re_time a").each(function(index, el) {
        $(el).click(function(event) {
            $("#re_time a").removeClass('active');
            $(el).addClass('active');
            rtime = $(el).text();
            positionSearch();
        });
    });
    //热门关键词
    $(".gsss_r_t2 li a").each(function(index, el) {
        $(el).click(function(event) {
            $(".gsss_r_t2 li a").removeClass('active');
            $(el).addClass('active');
            $('#condition').val($(el).text());
        });
    });
    //省市点击出下拉框
    $(".city_p").click(function(event) {
        if ($(".city_p").index($(this)) == 1) {
            if ($(".city_p").eq(0).attr('data-value') == "" || $(".city_p").eq(0).attr('data-value') == 0) {
                window.alert("请选择省份", 4);
                return false;
            }
        }
        if ($(this).next().css('display') == "none") {
            $(this).next().css({
                borderColor: '#5C91D9',
                borderTopColor: '#e0e0e0'
            }).slideDown(150);
            $(this).css({
                borderColor: '#5C91D9',
                borderBottomColor: '#e0e0e0'
            });
        } else {
            $(this).next().slideUp(150);
            $(this).next().css({
                borderColor: '#e0e0e0'
            });
            $(this).css({
                borderColor: '#e0e0e0'
            });
        }
    });
    //省市下拉选择点击事件
    $(".xl_mes li").click(function(event) {
        $(this).parent().slideUp(150).prev().text($(this).text()).append('<img src="/static/images/new_images/xjt.png" alt="">');
        $(this).parent().slideUp(150).prev().attr('data-value', $(this).val());
        $(this).parent().css({
            borderColor: '#e0e0e0'
        });
        $(this).parent().prev().css({
            borderColor: '#e0e0e0'
        });
        if ($(".xl_mes").index($(this).parent()) == 0) {
            var value = $(this).val();
            $(".xl_mes").eq(0).prev().attr('data-value', $(this).val());
            $(".xl_mes").eq(1).prev().text('不限').append('<img src="/static/images/new_images/xjt.png" alt="">');
            $(".xl_mes").eq(1).prev().attr('data-value', '');
            positionSearch();
            if (value == '') {
                $(".xl_mes").eq(1).children('li:gt(0)').remove();
                return;
            }
            $.ajax({
                type: "POST",
                url: "ajax_dictionary",
                data: {
                    "p_value": value
                },
                dataType: "json",
                success: function(data) {
                    var cityUl = $(".xl_mes").eq(1);
                    cityUl.children('li:gt(0)').remove();
                    for (var m = 0; m < data.length; m++) {
                        var city = data[m];
                        cityUl.append('<li value="' + city.dictionary_value + '">' + city.dictionary_name + '</li>')
                    }
                    $(".xl_mes:eq(1) li").click(function(event) {
                        $(this).parent().slideUp(150).prev().text($(this).text()).append('<img src="/static/images/new_images/xjt.png" alt="">');
                        $(this).parent().slideUp(150).prev().attr('data-value', $(this).val());
                        positionSearch();
                        $(this).parent().css({
                            borderColor: '#e0e0e0'
                        });
                        $(this).parent().prev().css({
                            borderColor: '#e0e0e0'
                        });
                    });
                }
            })
        }
    });
     $('.xl_mes').mouseleave(function(event) {
        $(this).slideUp(150);
        $(this).prev().css('borderColor', '#e0e0e0');
     });
});

var loadData;
var sql;
var querySql;
var resumeId;
var pu_id;
var condition = '';
var search_type = '';
window.onload = function() {
    //数据初始化
    pu_id = $('#pu_id').val();
    resumeId = $('#resumeId').val();
    //保密职位职能查自己的，别人的保密职位不能查询
    sql = ' position_status=1 and (isconfidentiality=0 OR isconfidentiality IS NULL)';
    querySql = sql;
    var resumePosition = $('#resumePosition').val();
    var initData = $.trim($('#initData').val());
    var viewSql = $('#viewSql').val();
    if (initData != '') {
        $('#condition').val(initData);
        condition = $.trim(initData);
        if (condition != '') {
            var key_list = condition.split(' ');
            for (var n = 0; n < key_list.length; n++) {
                querySql += ' and (position_name like "%' + key_list[n] + '%" or (SELECT T_SYS_Dictionary.Dictionary_Name FROM T_SYS_Dictionary WHERE (T_SYS_Dictionary.Dictionary_Value = Work_Area)) like "%' + key_list[n] + '%" or';
                querySql += ' postaion_type in (select Position from T_SYS_Keywords where Keywords like "%' + key_list[n] + '%"))';
            }
        }
        //        querySql += ' and (position_name like "%' + condition + '%" or postaion_type in (select Position from T_SYS_Keywords where Keywords like "%'+condition+'%"))';
    } else if (viewSql != '') {
        condition = $.trim(viewSql);
        querySql += decodeURI(viewSql);
    } else if (resumePosition != '') {
        var resumePositionName = $('#resumePositionName').val();
        $('#condition').val(resumePositionName);
        condition = $.trim(resumePositionName);
        querySql += ' and (position_name like "%' + condition + '%" or postaion_type in (select Position from T_SYS_Keywords where Keywords like "%' + condition + '%"))';
    }
    querySql += ' and rewards_money=0';
    querySql += ' order by last_update_date desc';
    if (resumeId != '') {
        loadData = new pagin("paginInfo", "V_Position_Search", "", encodeURI(querySql), "", 6, "paginBind", "loadData", 1, resumeId);
    } else {
        loadData = new pagin("paginInfo", "V_Position_Search", "", encodeURI(querySql), "", 6, "paginBind", "loadData");
        window.alert('你还没有简历，没有匹配值', 4);
    }
};

//动态加载页面绑定数据
function paginBind(dataInfo) {
    var indexPage = $('#paginInfo').children('ul').children('.active').text();
    var pageSize = parseInt(_counts / 6);
    if (_counts % 6 > 0) {
        pageSize += 1;
    }
    if (!indexPage || indexPage == '') {
        if (pageSize > 0) {
            indexPage = 1;
        } else {
            indexPage = 0;
        }
    }
    if (_counts < 1) {
        $("#noSendData").show();
        $('.page_number').hide();
    } else {
        $("#noSendData").hide();
        $('.page_number').show();
    }
    $('.page_right').children('span').text(indexPage);
    $('.page_right').children('b').text(pageSize);
    $('#resultCount').text(_counts + '个');
    //图片列表数据加载
    $(".sea_list").empty();
    $(dataInfo).each(function(i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for (var n = 0; n < len; n++) {
            if (array[n] == null) {
                array[n] = "&nbsp;"
            }
        }
        if ($.trim(array[56]) == "") {
            array[56] = "null";
        }
        if (array[14] == "&nbsp;" || array[14] == "None") {
            array[14] = "";
        } else {
            array[14] = array[14]+"&nbsp;|&nbsp;";
        }
        if ($.trim(array[23]) == "" || $.trim(array[23]) == "&nbsp;")
            array[23] = "经验不限";
        if ($.trim(array[26]) == "" || $.trim(array[26]) == "&nbsp;")
            array[26] = "学历不限";
        if ($.trim(array[6]) == "" || $.trim(array[6]) == "&nbsp;") {
            array[6] = '';
        } else {
            array[6] = '&nbsp|&nbsp;' + array[6];
        }
        //图片列表数据加载
        var content = '';
        content += '<li>';
        content += '    <div class="match">';
        content += '        <div class="seds_left personal">';
        content += '<div onclick="viewPosition(' + array[0] + ')">';
        content += '            <input class="knob" data-width="100" data-height="100" data-skin="tron" data-displayInput="true" value="' + array[array.length - 1] + '">';
        content += '            <img src="' + $('#file_website').val() + array[56] + '" alt=""  onerror="notfind(this, 2)">';
        content +='</div>';
        content += '            <p class="fc">';
        content += '                匹配值';
        content += '                <span>' + array[array.length - 1] + '%</span>';
        content += '            </p>';
        content += '        </div>';
        content += '        <div class="left">';
        content += '            <div class="information">';
        content += '                <p> <b class="post_name" onclick="viewPosition(' + array[0] + ')" style="cursor: pointer;">' + array[3] + '</b>';
        content += '                    <span class="post_price">' + array[19] + '</span>';
        content += '                </p>';
        content += '                <p class="mbt">';
        content += '                    <span class="post_comm" onclick="viewCompany(' + array[4] + ')" style="cursor: pointer;">' + array[55] + '</span>';
        var recruitType = '';
        if (array[1] == 1) {
            recruitType = '<span class="o_zzz">企业直招</span>';
        } else {
            // recruitType = '【经纪人职位】';
        }
        content += recruitType;
        content += '                </p>';
        content += '                <p class="post_nowrap mbt" title="">';
        content += '                    ' + array[14] + array[23] + '&nbsp;|&nbsp;' + array[26] + array[6];
        content += '                    <i class="s_time"></i>';
        content += '                    &nbsp;' + array[48].substring(0, 10) + '';
        content += '                </p>';
        content += '                <p class="post_welfare">';
        var labels = array[67];
        var labelStr = '';
        if (labels && labels != '') {
            var labellist = new Array();
            labellist = labels.split('**', 8);
            for (var l = 0; l < labellist.length; l++) {
                labelStr += '<span>' + labellist[l] + '</span>';
            }
        }
        content += labelStr;
        content += '                </p>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="right personal"><input type="hidden" value="' + array[0] + '" /><input type="hidden" value="' + array[2] + '" /><input type="hidden" value="' + array[72] + '" />';
        // content += '        <a class="btn" onclick="getOperateData(this, ' + i + ')" name="' + array[0] + '">投递</a>';
        content += '        <a class="btn" onclick="tdjl_confirm('+resumeId+', '+array[0]+', '+array[2]+')" id="sendBtn">投递</a>';
        content += '        <a class="btn" onclick="collectPosition(' + array[0] + ', this)" id="favoriteBtn">收藏</a>';
        content += '        <a class="btn" onclick="new_doForwardPosition([' + array[0] + '])">转发</a>';
        content += '        <a class="btn" data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \''+array[72]+'\', '+array[2]+', 3, '+array[0]+', \''+array[3]+'\')">私信</a>';
        content += '        </div>';
        if(array[1] == 1) {
            content += '        <img src="/static/images/xs3.png" class="r_img">';
        } else {
            content += '        <img src="/static/images/xs4.png" class="r_img">';
        }
        content += '        <div class="clearfix"></div>';
        content += '    </div>';
        content += '</li>';
        content += '<script>$(".knob").knob({thickness:.05,fgColor:"#ff8800",bgColor:"#e4e4e4",displayInput:false,readOnly:true})<\/script>';
        $(".sea_list").append(content);
        var sendBtn = $('.sea_list').children('li:last').find('#sendBtn');
        loadSendStatus(sendBtn, resumeId, array[0], array[2]);
        var favoriteBtn = $('.sea_list').children('li:last').find('#favoriteBtn');
        loadFavoriteStatus(favoriteBtn, array[0], 3);
    });
}
//获得投递状态
function loadSendStatus(obj, resume_id, position_id, source_id){
    $.ajax({
        type: "POST",
        url: "/judgeSendOrNot",
        data: {
            "position_id": position_id,
            "resume_id": resume_id,
            "source_id": source_id
        },
        dataType: "json",
        success: function(data) {
            if(data.status == '2'){
                $(obj).attr('onclick', 'alert("你已投递过此职位，无需再次投递！", 4);');
                $(obj).text('已投递');
            }
        }
    });
}
//判断搜索框回车事件
function judgeEntry() {
    if (event.keyCode == 13) {
        queryData();
    }
}
//点击搜索事件
function queryData() {
    condition = $.trim($('#condition').val());
    //    querySql = sql + ' and nkeywords like "%' + condition + '%"';
    positionSearch();
}
//查询热门职位
function hotJobQuery(obj) {
    $('#condition').val($(obj).text());
    positionSearch();
}
//进行职位搜索
function positionSearch() {
    querySql = sql;
    var pQuery = $('#positionDiv1').next().val();
    var bQuery = $('#businessulDiv1').next().val();
    if (pQuery != '') {
        var positionIds = pQuery.split(',');
        for (var m = 0; m < positionIds.length; m++) {
            if (m == 0) {
                querySql += ' and (postaion_type like "%' + $.trim(positionIds[m]) + '%"';
            } else {
                querySql += ' or postaion_type like "%' + $.trim(positionIds[m]) + '%"';
            }
        }
        querySql += ')';
    }
    if (bQuery != '') {
        querySql += ' and find_in_set(industry_type, "' + bQuery + '")';
    }
    if ($('#age_scope').children('.active').text() != '不限') {
        //年薪条件搜索修改
        var payname = $('#age_scope').children('.active').text();
        var start_salary = 0;
        var end_salary = 1000;
        if(payname.indexOf('以上') != -1){
            querySql += ' and (start_salary is not null and end_salary is null';
        }else if(payname.indexOf('以下') != -1){
            querySql += ' and (start_salary is null and end_salary is not null';
        }else{
            start_salary = payname.split('-')[0];
            end_salary = payname.split('-')[1].split('万')[0];
            querySql += ' and ((start_salary < ' + end_salary + ' and end_salary > ' + start_salary + ')';
        }
        querySql += ')';
//        querySql += ' and (pay=' + $('#age_scope').children('.active').attr('data-value');
    }
    if ($('#work_ex').children('.active').text() != '不限') {
        querySql += ' and work_year=' + $('#work_ex').children('.active').attr('data-value');
    }
    if ($('#ed_re').children('.active').text() != '不限') {
        querySql += ' and diploma=' + $('#ed_re').children('.active').attr('data-value');
    }
    if ($('#job_nat').children('.active').text() != '不限') {
        querySql += ' and work_nature=' + $('#job_nat').children('.active').attr('data-value');
    }
    if ($('#re_time').children('.active').text() != '不限') {
        var publishDate = $.trim($('#re_time').children('.active').text());
        if (publishDate == '3天内') {
            querySql += ' and date_sub(curdate(), INTERVAL 3 DAY) <= date(last_update_date)';
            //                ' and update_day < 3';
        } else if (publishDate == '一周内') {
            querySql += ' and date_sub(curdate(), INTERVAL 7 DAY) <= date(last_update_date)';
            //                ' and update_day < 7';
        } else if (publishDate == '一月内') {
            querySql += ' and date_sub(curdate(), INTERVAL 30 DAY) <= date(last_update_date)';
            //                ' and update_day < 30';
        }
    }
    //    querySql += ' and postaion_type="' + value + '"';
    var cityValue = $('.city_p:eq(1)').attr('data-value');
    var provinceValue = $('.city_p:eq(0)').attr('data-value');
    if (cityValue != '' && cityValue != '0'&& cityValue != '1') {
        querySql += ' and work_area=' + cityValue;
    } else if (provinceValue != '' && provinceValue != '0' && provinceValue != '1') {
        querySql += ' and (work_area=' + provinceValue + ' or work_area in (select dictionary_value from T_SYS_Dictionary where p_value="' + provinceValue + '"))';
    }
    var queryKey = $.trim($('#condition').val());
    if (queryKey != '') {
        var key_list = queryKey.split(' ');
        for (var n = 0; n < key_list.length; n++) {
            querySql += ' and (position_name like "%' + key_list[n] + '%" or postaion_type in (select Position from T_SYS_Keywords where Keywords like "%' + key_list[n] + '%") or';
            querySql += ' (SELECT T_SYS_Dictionary.Dictionary_Name FROM T_SYS_Dictionary WHERE (T_SYS_Dictionary.Dictionary_Value = Work_Area)) like "%' + key_list[n] + '%")';
        }
    }
    //    querySql += ' and (position_name like "%' + queryKey + '%" or postaion_type in (select Position from T_SYS_Keywords where Keywords like "%'+queryKey+'%"))';
    querySql += ' and rewards_money=0';
    querySql += search_type;
    querySql += ' order by last_update_date desc';

    if (resumeId != '') {
        loadData = new pagin("paginInfo", "V_Position_Search", "", encodeURI(querySql), "", 6, "paginBind", "loadData", 1, resumeId);
    } else {
        loadData = new pagin("paginInfo", "V_Position_Search", "", encodeURI(querySql), "", 6, "paginBind", "loadData");
    }
}
//职位预览
function viewPosition(positionId) {
    window.open('/resume/zwxq?positionId=' + positionId, '_blank');
}
//企业预览
function viewCompany(company_id) {
    window.open('/account/new_qyyl?companyId=' + company_id, '_blank');
}
//收藏职位
function collectPosition(positionId, obj) {
    $.ajax({
        type: "POST",
        url: "/ajax_collectPosition",
        data: {
            "positionId": positionId
        },
        dataType: "json",
        success: function(data) {
            if (data.msg == 'success') {
                window.alert('收藏成功', 1);
                $(obj).text('已收藏');
                $(obj).attr('onclick', 'alert("你已收藏该职位，无需收藏！", 4);');
            } else if (data.msg == 'exist') {
                window.alert('你已收藏该职位，无需收藏！', 4);
            } else {
                window.alert(data.msg, 4);
            }
        }
    })
}
//翻页
function pageTurn(type) {
    var indexPage = $('.page_right').children('span').text();
    var pageSize = $('.page_right').children('b').text();
    if (type == 'up') {
        if (indexPage == '1') {
            window.alert('已经是第一页', 4);
            return;
        }
        if ($('#paginInfo_backPage')) {
            $('#paginInfo_backPage').click();
        }
    } else if (type == 'down') {
        if (pageSize == indexPage) {
            window.alert('已经是最后一页', 4);
            return;
        }
        if ($('#paginInfo_backPage')) {
            $('#paginInfo_backPage').parent().children(':eq(-2)').click();
        }
    }
}
//筛选职位类型和悬赏类型
$(".type_position").on('click', 'li', function() {
    if ($(this).attr('data-key') == '') {
        search_type = '';
    } else if ($(this).attr('data-key') == '1') {
        search_type = ' and position_source=1';
    } else if ($(this).attr('data-key') == '2') {
        search_type = ' and position_source=2';
    }
    positionSearch();
})
