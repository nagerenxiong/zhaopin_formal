var myResumeObj;//我的简历库对象
var loadData;//
var sql;//初始化sql
var querySql;//执行的sql
var pu_id;//用户ID
var page_size = 10;//一页显示数据条数
var load_type = 'all';//加载数据类型
var deleteType = '1';//删除类型
var pu_email;//用户邮箱
var operateObj;//分组的操作对象
var oldGroupId;//原分组ID
o_async = true;//设置分页为异步
var position_id = '';
var recommend_id_list = [];
var order_type = 'update_date desc';
//分页开始执行的方法
fy_start = function () {
    //增加loading，清空列表数据
    if( $("#nochange").css('display') != 'block'){
        $(".resume_info").addClass('loading').children('ul').empty();
        $(".noSendData").hide();
        $('.page_number').hide();
    }
    //如果是 未转换的简历 操作
    else{
        $("#tableInfo1").addClass('loading').children('li').not('.resltop').remove();
    }
}
//分页结束后执行的方法
fy_end = function () {
    $(".resume_info").removeClass('loading');//移除loading
    //数据为0时 隐藏分页 显示无数据提示
    //如果是 未转换的简历 操作
    if( $("#nochange").css('display') == 'block'){
        var $checkAll = $(".tjsx #checkAll");
        $checkAll.is(':checked') && $(".resulist input[type='checkbox']").attr('checked', 'true');
        var count1 = $("input[name='input']:checked").length;
        $("#tableInfo1").removeClass('loading');
        $(".resucount span").html(count1);
        return ;
    }
    if( _counts <= $(".look_count.active").text()){
        $('.page_number').hide();
    }
    if (_counts < 1) {
        if(load_type == 'myResume'){
            $('#noSendData_upload').show();
        }
        else{
            $('#noSendData_library').show();
        }
    } else {
        $('#noSendData_library').hide();
    }
    $(window).scrollTop($('.resume_list').offset().top);
}
window.onload = function () {
    $('.commys').mouseleave(function(event) {
        $(this).slideUp(150);
    });
    pu_id = $('#pu_id').val();
    pu_email = $('#pu_email').val();
    sql = 'resume_status=1 and (id in (select resume_id from T_Resume_View where pu_id=' + pu_id + ' and state=1)';
    sql += ' or id in (select objectid from T_Message_Record where record_type=2 and receive_id=\"' + pu_email + '\" and state=1)';
    sql += ' or id in (select object_id from T_PU_Favorite where favorite_type=1 and pu_id=' + pu_id + '))';
    querySql = sql;
    myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), order_type, page_size, "myResumeBind", "myResumeObj" );

    //简历类别
    $("#resume_type").click(function(event) {
        if ($(this).next().css('display') == "none") {
            $(this).next().slideDown(150);
        } else {
            $(this).next().slideUp(150);
        }
    });

    $(".commys li").click(function(event) {
        $('#resume_type').attr('data-value', $(this).val());
        $(this).parent().slideUp(150);
        $('#resume_type').text($(this).text());
        searchResumeData();
    });
}
//切换数据加载类型
function changeDataType(type) {
    $('.dib').filter('.check').removeClass('active');
    load_type = type;
    loadNewSql();
    loadDataByLoadType();
}
//刷新每页显示数据条数
function reloadPage(reflushCount) {
    page_size = reflushCount;
    loadDataByLoadType();
}
//加载我上传的简历
function myResumeBind(dataInfo) {
    //设置列表头部结果数据条数及页码
    setCountAndSize();
    //图片列表数据加载
    $("#tableInfo").empty();
    $(dataInfo).each(function (i) {
        var array = $(this);
        var content = contentHtml(array);
        $("#tableInfo").append(content);
        var education = $("#tableInfo").children('li:last').find('#education_info');
        //获得教育经历
        loadEducation(education, array[0]);
        //获得工作经历
        var workExperience = $("#tableInfo").children('li:last').find('#work_info');
        loadWorkExperience(workExperience, array[0]);
        if (load_type == 'forward' || load_type == 'myFavourite') {
            //判断该简历是否关注收藏
            var attentionObj = $("#tableInfo").children('li:last').find('.follow');
            judgeAttention(attentionObj, array[0]);
        }
        //获得分组相关ID
        var groupObj = $("#tableInfo").children('li:last').find('#groupBtn');
        loadGroupInfo(groupObj, array[0]);
    })
}
//内容HTML
function contentHtml(array) {
    var len = array.length;
    for (var n = 0; n < len; n++) {
        if (array[n] == null) {
            array[n] = "&nbsp;";
        }
    }
    // 处理值为 null 的字段
    if ($.trim(array[4]) == "") {
        array[4] = "null";
    }
    if (array[35] == "&nbsp;" || array[35] == "None") {
        array[35] = "";
    } else {
        array[35] = "&nbsp;|&nbsp" + array[35];
    }
    if (array[36] == "&nbsp;" || array[36] == "None") {
        array[36] = "";
    } else {
        array[36] = "&nbsp;|&nbsp" + array[36];
    }
     if (array[37] == "&nbsp;" || array[37] == "None") {
        array[37] = "";
    } else {
        array[37] = "&nbsp;|&nbsp" + array[37];
    }
    var o_age = parseInt(new Date().getFullYear()) - array[6];
    if (isNaN(o_age)) {
        o_age = "";
    } else {
        o_age = "&nbsp;|&nbsp;" + o_age + "岁";
    }
    //简历完整度
    if (array[62] == '&nbsp;' || array[62] == '') {
        array[62] = 0;
    }

    var content = '';
    content += '<li>';
    content += '    <div class="l">';
    content += '        <img src="'+ $('#file_website').val() + array[4] + '" style="cursor: pointer;" alt="" onclick="viewResume(' + array[0] + ')" onerror="notfind(this, 1, \'' + array[5] + '\')">';
    var show_rate = 'style="display: none;"';
    if($(".position_id").length == 0){
        show_rate = ''
    }
    content += '        <b '+show_rate+'><span class="resume_integrity">' + array[62] + '</span>%</b>';
    content += '        <p '+show_rate+'>简历完整度</p>';
    content += getResumeType(array[1]);
    content += '        <div class="check clearfix" onclick="active(this)" data-value="' + array[0] + '">';
    content += '            <em class="checkbox"><i class="iconfont icon-32gougou"></i></em>';
    content += '        </div>';
    content += '    </div>';
    content += '    <div class="r">';
    content += '        <h1 style="margin:0">';
    var resume_type = array[array.length - 1];
    content += '            <span class="name" style="cursor: pointer;" onclick="viewResume(' + array[0] + ')">' + array[3] + '</span>';
    content += '            <span>';
    if (array[5] == "女") {
        content += '<i class="iconfont icon-nv"></i><span class="sex_value">女</span>';
    } else {
        content += '<i class="iconfont icon-nan"></i><span class="sex_value">男</span>';
    }
    content += array[37] + '&nbsp;' + array[35] + '&nbsp;' + array[36] + '&nbsp;' + o_age + '</span>';
    content += '            <p class="f_r">';
    var date_type = '更新时间';
    content += '                <span class="time">' + date_type + '：' + array[32].substring(0, 10) + '</span>';
    if (load_type == 'forward' || load_type == 'myFavourite') {//关注他人简历
        if (array[1] == 1)
            content += '                <span class="follow" onclick="attentionOperate(this, ' + array[2] + ')">关注</span>';
    }
    content += '            </p>';
    content += '        </h1>';
    if (array[38]) {
        content += '        <p>';
        content += '            <label>目前职位：</label>';
        content += '            <span class="position">' + array[38] + '</span>';
        content += '        </p>';
    }
    content += '        <p>';
    content += '            <label>毕业院校：</label>';
    content += '            <span id="education_info"></span>';
    content += '        </p>';
    content += '        <p class="clearfix work_info" id="work_info">';
    content += '            <label>工作经历：</label>';
    content += '        </p>';
    //个人标签
    if (array[41] != '' && array[41] != '&nbsp;') {
        content += '        <p class="mt15 o_label">';
        content += '            <label>个人标签:</label>';
        content += '            <span class="ml10">';
        var labelList = array[41].split('**');
        for (var m = 0; m < labelList.length; m++) {
            if ($.trim(labelList[m]) != '' && $.trim(labelList[m]) != '&nbsp;') {
                if (m % 2 == 0)
                    content += '<i>' + labelList[m] + '</i>';
                else
                    content += '<i class="t">' + labelList[m] + '</i>';
                if (m == 5) {
                    break;
                }
            }
        }

        content += '            </span>';
        content += '        </p>';
    }
    content += '    </div>';
    content += '    <div class="b"><input type="hidden" value="' + array[0] + '" /><input type="hidden" value="' + array[2] + '" />';
    var source_name = '';
    if(array[1] == 1){
        source_name = array[3];
    }else{
        source_name = array[66];
    }
    if (load_type == 'myView' || (load_type == 'all' && resume_type == 2 )) {
        content += '        <i class="delete" data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\', \'myView\')"></i>';
        content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, ' + array[0] + ')">分组</span>';
        content += '        <span data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \'' + source_name + '\', \'' + array[2] + '\', '+array[1]+', '+array[0]+', \''+array[3]+'\')">私信</span>';
        content += '        <span onclick="doForwardResume([' + array[0] + '])">转发</span>';
        content += '        <span onclick="recommend(\'' + array[54] + '\', \'' + array[2] + '\', '+array[0]+', \''+array[3]+'\', '+array[1]+')">推荐</span>';
    } else if (load_type == 'forward' || load_type == 'myFavourite' || (load_type == 'all' && (resume_type == 0 || resume_type == 4 || resume_type == 5 || (resume_type == 1 && array[2] != pu_id)) )) {
        var delete_type = 'forward';
        if(load_type == 'myFavourite' || (load_type == 'all' && (resume_type == 0 || resume_type == 5 || (resume_type == 1 && array[2] != pu_id)))){
            delete_type = 'myFavourite';
        }
        content += '        <i class="delete" data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\', \''+delete_type+'\')"></i>';
        content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, ' + array[0] + ')">分组</span>';
        content += '        <span data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \'' + source_name + '\', \'' + array[2] + '\', '+array[1]+', '+array[0]+', \''+array[3]+'\')">私信</span>';
        content += '        <span onclick="doForwardResume([' + array[0] + '])">转发</span>';
        content += '        <span onclick="recommend(\'' + array[54] + '\', \'' + array[2] + '\', '+array[0]+', \''+array[3]+'\', '+array[1]+')">推荐</span>';
//            content += '        <span  onclick="autoMatchingPosition(' + array[0] + ', ' + pu_id + ')">匹配</span>';
    } else if (load_type == 'all') {

    }
    content += '    </div>';
    if (array[64] != '' && array[64] != '&nbsp;' && array[64] != 'None') {
        content += '    <span class="attachment"></span>';
    }
    content += '</li>';
    return content;
}
//获得简历类型
function getResumeType(type) {
    if (load_type != 'myResume' && load_type != 'entrust') {
        switch (type) {
            case 1:
                return '<p>[个人简历]</p>';
            case 2:
                return '<p>[经纪人简历]</p>';
            case 3:
                return '<p>[企业简历]</p>';
            default:
                return '';
        }
    } else {
        return '';
    }
}
//加载教育经历
function loadEducation(obj, resume_id) {
    $.ajax({
        type: 'POST',
        url: '/getEducationExperience',
        data: {'resume_id': resume_id},
        dataType: 'json',
        success: function (data) {
            if (data.status == '1') {
                var uc_name = data.uc_name;
                var smajor = data.smajor;
                var sdiploma = data.sdiploma;
                if(smajor !=""){
                    smajor = "&nbsp;|&nbsp;"+smajor;
                }
                if(sdiploma !=""){
                    sdiploma = "&nbsp;|&nbsp;"+sdiploma;
                }
                obj.html(uc_name + smajor + sdiploma);
            }
        }
    });
}
//加载工作经验
function loadWorkExperience(obj, resume_id) {
    $.ajax({
        type: 'POST',
        url: '/getWorkExperience',
        data: {'resume_id': resume_id},
        dataType: 'json',
        success: function (data) {
            if (data.status == '1') {
                var workList = data.works;
                for (var n = 0; n < workList.length; n++) {
                    var work = workList[n];
                    var position_name = '';
                    if (work.sposition != ''){
                        position_name = '  |  ' + work.sposition;
                    }
                    obj.append('                <span class="bb1"><div>' + work.work_time + ' ' + work.company_name + position_name + '</div> </span>');
                    if (n == 2) {
                        break;
                    }
                }
            }
        }
    });
}
//判断简历是否关注
function judgeAttention(attObj, resume_id) {
    $.ajax({
        type: 'POST',
        url: '/judgeAttentionAndCollect',
        data: {'resume_id': resume_id},
        dataType: 'json',
        success: function (data) {
            if (data.status == '1') {
                if (data.attention == '取消关注') {
                    attObj.text(data.attention).addClass('cancel');
                    attObj.attr('data-value', data.groupId);
                }
            }
        }
    });
}
//加载分组信息
function loadGroupInfo(obj, resume_id) {
    $.ajax({
        type: "POST",
        url: "/ajax_getGroupByResumeId",
        data: {"resume_id": resume_id},
        dataType: "json",
        success: function (data) {
            if (data.status == '1') {
                $(obj).attr('data-value', data.group_id);
                $(obj).attr('data-key', data.group_info_id);
            } else {
                $(obj).attr('data-value', '');
                $(obj).attr('data-key', '');
            }
        }
    });
}
//关注和取消关注
function attentionOperate(obj, source_id) {
    var type = '1';
    var groupId = '';
    if ($.trim($(obj).text()) == '取消关注') {
        type = '0';
        groupId = $(obj).attr('data-value');
    }
    $.ajax({
        type: 'POST',
        url: '/ajax_attentionOperate',
        data: {'id': source_id, 'type': type, 'groupId': groupId},
        dataType: 'json',
        success: function (data) {
            if (data.status && data.status == '0') {
                window.alert('关注人数已达上限');
            } else if (data.msg && data.msg == 'success') {
                $(obj).text('取消关注').addClass('cancel');
                $(obj).attr('data-value', data.groupId);
                window.alert('关注成功');
            } else if (data.msg && data.msg == '取消关注成功！') {
                $(obj).empty();
                $(obj).append('关注').removeClass('cancel');
                window.alert(data.msg);
            }
        }
    })
}
//判断是否有选中的人
function judgeSelected(obj) {
    var checkboxes = $(".resume_info .check").filter('.active');
    var objValue = $.trim($(obj).text());
    if (checkboxes.length == 0) {
        window.alert("请选择要操作的数据！");
        $('.more_forward').eq(1).attr('data-target', '');
        return false
    } else {
        $('.more_forward').eq(1).attr('data-target', '#message_Modal');
    }
    if (objValue == '批量私信') {
        $('.message_Modal_box').children().remove();
        for (var m = 0; m < checkboxes.length; m++) {
            var username = checkboxes.eq(m).parent().next().children('h1:eq(0)').children('span').eq(0).text();
            var em = '<span>' + username + '<label>x</label></span>';
            $('.message_Modal_box').append(em);
        }
        $(".message_Modal_box label").click(function () {
            if ($(".message_Modal_box label") > 1) {
                $(this).parent().remove();
            } else {
                window.alert('至少要有一个接收人');
            }
        })
    }
    $('#operateState').val('multi');
}
//批量预览简历
function browseResume() {
    var checkboxes = $(".resume_info .check");
    var selectCount = 0;
    for (var m = 0; m < checkboxes.length; m++) {
        if (checkboxes.eq(m).hasClass('active')) {
            window.open('/jobs/resume/new_jlyl?resumeID=' + checkboxes.eq(m).attr('data-value'));
            selectCount += 1;
        }
    }
    if (selectCount == 0) {
        window.alert('请选择要预览的简历');
    }
}
//查看简历
function viewResume(resumeId) {
    window.open('/jobs/resume/new_jlyl?resumeID=' + resumeId);
}
//设置删除的ID(点击简历删除图标时)
function setDeleteId(obj, resumeId, type) {
    operateObj = $(obj).next();
    $('#cancelId').val(resumeId);
    deleteType = type;
}
//删除简历
function deleteResume() {
    var resumeId = $('#cancelId').val();
    $.ajax({
        type: "POST",
        url: "/deleteResumeOfDatabase",
        data: {"resumeId": resumeId, "deleteType": deleteType},
        dataType: "json",
        success: function (data) {
            if (data.status == '1') {
                window.alert('删除成功');
                //修改类型数量及总数
                var typeObj = $('li[onclick="changeDataType(\'' + load_type + '\')"]');
                var count = typeObj.children('a').children('span').text();
                typeObj.children('a').children('span').text(parseInt(count) - 1);
                var allObj = $('p[onclick="changeDataType(\'all\')"]');
                var allCount = allObj.children('span').text();
                allObj.children('span').text(parseInt(allCount) - 1);
                //修改分组含有的数量
                updateGroupCount($(operateObj).attr('data-value'), -1);
                //重新加载数据
                loadDataByLoadType();
            }
        }
    })
}
//展示分组名称
function showGroupName(obj, resume_id) {
    operateObj = obj;
    oldGroupId = $(obj).attr('data-value');
    $('#groupList').val($(obj).attr('data-value'));
    $('#operate_id').val(resume_id);
}
//更新分组
function updateGroup() {
    var newGroupId = $('#groupList').val();
    if (oldGroupId == newGroupId) {
        window.alert('分组没有变化无需保存');
    } else {
        var resume_id = $('#operate_id').val();
        var groupInfoId = $(operateObj).attr('data-key');
        $.ajax({
            type: "POST",
            url: "/ajax_updateResumeGroup",
            data: {"resume_id": resume_id, 'oldGroupId': oldGroupId, 'newGroupId': newGroupId, 'groupInfoId': groupInfoId},
            dataType: "json",
            success: function (data) {
                if (data.status == '1') {
                    $(operateObj).attr('data-value', newGroupId);
                    //修改分组数量
                    updateGroupCount(newGroupId, 1);
                    updateGroupCount(oldGroupId, -1);
                    window.alert('修改分组成功');
                    if(querySql.indexOf('gid') != -1)
                        myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), order_type, page_size, "myResumeBind", "myResumeObj");
                } else {
                    window.alert(data.msg);
                }
            }
        });
    }
}
//修改分组数量
function updateGroupCount(groupId, count) {
    var groupObj = $('input[data-value="' + groupId + '"]').parent().next().next();
    var text = groupObj.text().substring(1, groupObj.text().length - 1);
    groupObj.text('（' + (parseInt(text) + count) + '）');
}

function key_number(obj) {
    if(obj.value.length == 1){
        obj.value = obj.value.replace(/[^1-9]/g, '');
    }else{
        obj.value = obj.value.replace(/[^0-9]/g, '');
    }
}
$('#search_input').keydown(function (event) {
    if (event.keyCode == 13) {
        searchResumeData();
    }
});
//重置搜索条件
function reset(){
    $("#search_input").val('');
    $(".o_search .sex").removeClass('active').eq(0).addClass('active');
    $("#startAge").val('');$("#endAge").val('');
    $("#businessulValue").val('');$("#businessulDiv").children(':gt(0)').remove().end().append('<span style="color:#999">请选择行业</span>');
    $("#expectPosition").val('');$("#positionDiv").children(':gt(0)').remove().end().append('<span style="color:#999">请选择职位</span>')
    $("#expected_area").val('').next().val('');
    $("#current_area").val('').next().val('');
    $(".company_name").val('').nextAll().removeClass('active').end().next().addClass('active');
}
//根据搜索条件搜索简历
function searchResumeData() {
    var keywords = $('#search_input').val();
    querySql = sql;
    //关键字
    if (keywords != '') {
        var keywordList = keywords.split(' ');
        var positionSql = ' (SELECT T_SYS_Position.Position_Name FROM T_SYS_Position WHERE T_SYS_Position.Position_Value = Currently_Postaion)';
        var locationSql = ' (select T_SYS_Dictionary.dictionary_name from T_SYS_Dictionary where T_SYS_Dictionary.dictionary_value = Currently_Pacece)';
        for(var m = 0;m < keywordList.length;m++){
            if(keywordList[m] == ''){
                continue;
            }
            querySql += ' and (';
            querySql += ' find_in_set("' + $.trim(keywordList[m]) + '", keywords)';  //关键字
            querySql += ' or ' + locationSql + ' like "%' + $.trim(keywordList[m]) + '%"'; //期望职位
            querySql += ' or ' + positionSql + ' like "%' + $.trim(keywordList[m]) + '%"'; //期望行业
            querySql += ' or Sex like "%' + $.trim(keywordList[m]) + '%"'; //性别
            querySql += ' or User_Name like "%' + $.trim(keywordList[m]) + '%"'; //姓名

            //判断是否是数字，如果是数字则进行年龄判断
            if(!isNaN($.trim(keywordList[m]))){
                var d = new Date()
                var year = d.getFullYear() - parseInt($.trim(keywordList[m]));
                querySql += ' or Birthday_Year = ' + year + ''; //年龄
            }

            //期望职位处理
            $.ajax({
                async: false,
                type: "POST",
                url: "/ajax_get_position_for_name",
                data: {"key_name": keywordList[m]},
                dataType: "json",
                success: function (data) {
                    $(data["msg"]).each(function(){
                       querySql += ' or Expect_Position like "%' + this[0] + '%"';
                    });
                }
            });
            querySql += ')'
        }

        if($(".resume_database_type").length > 0) {
            //简历类型（个人简历或经纪人简历）
            loadDataByLoadType();
            return;
        }

    }
    var industrys = $('#businessulValue').val();
    //期望行业
    if (industrys != '') {
        var industryIds = industrys.split(',');
        for (var m = 0; m < industryIds.length; m++) {
            if (m == 0) {
                querySql += ' and (find_in_set("' + industryIds[m] + '", cast(expect_industry as char))';
            } else {
                querySql += ' or find_in_set("' + industryIds[m] + '", cast(expect_industry as char))';
            }
        }
        querySql += ')';
    }
    var positions = $('#expectPosition').val();
    //期望职位
    if (positions != '') {
        var positionIds = positions.split(',');
        for (var m = 0; m < positionIds.length; m++) {
            if (m == 0) {
                querySql += ' and (expect_position like "%' + $.trim(positionIds[m]) + '%"';
            } else {
                querySql += ' or expect_position like "%' + $.trim(positionIds[m]) + '%"';
            }
        }
        querySql += ')';
    }
    var expected_area = $('#expected_area').val();
    if (expected_area != '') {//期望工作地点
        var expect_areaes = $('#expected_area').next().val();
        var values = expect_areaes.split(',');
        for (var m = 0; m < values.length; m++) {
            if (m == 0) {
                querySql += ' and (find_in_set("' + values[m] + '", cast(expect_area as char))';
                querySql += ' or expect_area in (select dictionary_value from T_SYS_Dictionary where p_value="' + values[m] + '")';
            } else {
                querySql += ' or find_in_set("' + values[m] + '", cast(expect_area as char))';
                querySql += ' or expect_area in (select dictionary_value from T_SYS_Dictionary where p_value="' + values[m] + '")';
            }
        }
        querySql += ')';
    }
    var sex = $.trim($('.sex').filter('.active').text());
    if (sex != '不限') {
        querySql += ' and sex="' + sex + '" ';
    }
    var startAge = $('#startAge').val();
    var endAge = $('#endAge').val();
    var rangeAge = '';
    if (startAge != '' || endAge != '') {
        if (startAge == '') {
            for (var m = 18; m < endAge; m++) {
                if (rangeAge == '') {
                    rangeAge += m;
                } else {
                    rangeAge += ',' + m;
                }
            }
            rangeAge += ',' + endAge;
        } else if (endAge == '') {
            rangeAge = startAge;
            for (var m = startAge; m <= 60; m++) {
                rangeAge += ',' + m;
            }
        } else {
            if (endAge < startAge) {
                alert('请输入正确的年龄范围');
                return false;
            }
            rangeAge = '';
            for (var m = startAge; m <= endAge; m++) {
                if (rangeAge == '') {
                    rangeAge += m;
                } else {
                    rangeAge += ',' + m;
                }
            }
        }
        querySql += ' and find_in_set((year(now()) - birthday_year), "' + rangeAge + '") ';
    }
    var work_year = $('#work_year').attr('data-value');
    if (work_year != '' && work_year != '0' && work_year != '1') {
        querySql += ' and workyear=' + work_year;
    }
    var expectSalary = $('#expect_pay').attr('data-value');
    if (expectSalary != '' && expectSalary != '0' && expectSalary != '1') {
        querySql += ' and expect_pay=' + expectSalary;
    }
    var company_name = $.trim($('.company_name').val());
    if (company_name != '') {
        var radio = $('.dib').filter('.active');
        if ($.trim(radio.text()) == '目前公司') {
            querySql += ' and currently_company like "%' + company_name + '%"';
        } else {
            querySql += ' and (id in (select distinct(Resume_ID) from T_Resume_Work where Company_Name like "%' + company_name + '%")';
            querySql += ' or currently_company like "%' + company_name + '%")';
        }
    }
    var current_area = $('#current_area').val();
    if (current_area != '') {
        var current_Value = $('#current_area').next().val();
        querySql += ' and currently_pacece=' + current_Value;
    }
    var diploma = $('#max_diploma').attr('data-value');
    if (diploma != '' && diploma != '0' && diploma != '1') {
        querySql += ' and diploma=' + diploma;
    }
    //简历类型（个人简历或经纪人简历）
    var resume_source = $('#resume_type').attr('data-value');
    //if (resume_source != '' && resume_source != '0' && resume_source != '1') {
    if (resume_source != '' && resume_source != '0') {
        querySql += ' and resume_source=' + resume_source;
    }
    loadDataByLoadType();
}
//设置列表头部结果数据条数及页码
function setCountAndSize() {
    //复选框置为未选中状态
    $('.dib').filter('.check').removeClass('active');
    var indexPage = $('#paginInfo').children('ul').children('.active').text();
    var pageCount = parseInt(_counts / page_size);
    if (_counts % page_size > 0) {
        pageCount += 1;
    }
    if (!indexPage || indexPage == '') {
        if (pageCount > 0) {
            indexPage = 1;
        } else {
            indexPage = 0;
        }
    }
    $('.page_right').children('span').text(indexPage);
    $('.page_right').children('b').text(pageCount);
    $('.resume_count').text(_counts);
}
//重新拼接sql
function loadNewSql() {
    page_size = 10;
    if (load_type == 'myView') {//我购买的简历
        sql = 'resume_status=1 and id in (select trv.resume_id from T_Resume_View trv where trv.pu_id = ' + pu_id + ' and state=1)';
        querySql = sql;
    } else if (load_type == 'forward') {//转发的简历
        sql = 'resume_status=1 and id in (select objectid from T_Message_Record where record_type=2 and receive_id="' + pu_email + '" and state=1)';
        querySql = sql;
    } else if (load_type == 'myFavourite') {//我收藏的简历
        sql = 'resume_status=1 and id in (select object_id from T_PU_Favorite where favorite_type=1 and pu_id=' + pu_id + ')';
        querySql = sql;
    } else if (load_type == 'all') {//全部简历
        sql = 'resume_status=1 and (id in (select resume_id from T_Resume_View where pu_id=' + pu_id + ' and state=1)';
        sql += ' or id in (select objectid from T_Message_Record where record_type=2 and receive_id=\"' + pu_email + '\" and state=1)';
        sql += ' or id in (select object_id from T_PU_Favorite where favorite_type=1 and pu_id=' + pu_id + '))';
        querySql = sql;
    }
}
//根据加载类型重新加载数据
function loadDataByLoadType() {
    if (load_type == 'myResume') {
        $('.more_forward').eq(2).css('display', 'none');
    } else if (load_type == 'myView') {
        $('.more_forward').eq(2).css('display', 'none');
    } else if (load_type == 'entrust') {
        $('.more_forward').eq(2).css('display', 'none');
    } else if (load_type == 'forward') {
        $('.more_forward').eq(2).css('display', '');
    } else if (load_type == 'myFavourite') {
        $('.more_forward').eq(2).css('display', '');
    } else if (load_type == 'all') {

    }
    myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), order_type, page_size, "myResumeBind", "myResumeObj" );
}
//翻页
function pageTurn(type) {
    var indexPage = $('.page_right').children('span').text();
    var pageSize = $('.page_right').children('b').text();
    if (type == 'up') {
        if (indexPage == '1') {
            window.alert('已经是第一页',4);
            return;
        }
        if ($('#paginInfo_backPage')) {
            $('#paginInfo_backPage').click();
        }
    } else if (type == 'down') {
        if (pageSize == indexPage) {
            window.alert('已经是最后一页',4);
            return;
        }
        if ($('#paginInfo_backPage')) {
            $('#paginInfo_backPage').parent().children(':eq(-2)').click();
        }
    }
}



var c;//调试用
o_sc={
    upload:0,//上传成功
	success:0,//解析成功的数量
	error:0,//上传失败的数量
	select:0,//选择的文件的数量
    cancle:''

};
var group_this;
var file_count = $('#file_count').val();//已经上传的简历数量

danxuan($(".o_search .sex"));//性别单选
danxuan($(".o_search .dib"));//目前公司or全部经历
danxuan($(".look_count"));//多少数据一页
danxuan($(".resume_group .default li"));

//感叹号简历
$('.resume_list').on('mouseenter', '.noparssucss', function(event) {
    $(this).parent().siblings('.hintcon').show();
});
$('.resume_list').on('mouseleave', '.noparssucss', function(event) {
    $(this).parent().siblings('.hintcon').hide();
});
//默认分组条目点击
$('.resume_group .default li').click(function(event) {
    $(".resume_group .all").removeClass('active');
    $(".o_group li").removeClass('ac');
    $('.conversion').removeClass('active');
});
//全部简历点击
$(".resume_group .all").click(function(event) {
    $('.resume_group .default li.active').removeClass('active');
    $(".o_group li").removeClass('ac');
    $('.conversion').removeClass('active');
    $(this).addClass('active');
});
// 自定义分组条目点击
$(".o_group").on('click', 'li', function(event) {
    $('.resume_group .default li.active').removeClass('active');
    $(".resume_group .all").removeClass('active');
});
$(".resume_group .l:not('.all')").click(function(event) {
   $(this).next().slideToggle(150);
   $(this).hasClass('active')?$(this).removeClass('active'):$(this).addClass('active');
});
select($("#xl"), $("#xl").children('ul'));//学历下拉
select($("#jy"), $("#jy").children('ul'));//经验下拉
select($("#nx"), $("#nx").children('ul'));//年限下拉
select($("#sj"), $("#sj").children('ul'));//委托时间下拉
$(".ControlsWrap").focus(function(event) {
    $(this).blur();
});
//添加分组
$(".add_group").click(function(event) {
    event.stopPropagation();
    var _ul = $(this).parent().next();
    if(_ul.children('li').length < 6){
        if(_ul.css('display') == 'none'){
            _ul.slideDown(150);
        }
        if($(".o_group .active").length == 0){
            $(".o_group").append('<li class="active"><div><input class="group_txt" type="text" value="" maxlength="6"><button class="submit">OK</button><a class="cancel" href="javascript:void(0)">取消</a></div><span class="group_name"></span><span class="count">（0）</span><div class="ope"><span class="editor"></span><i class="delete" data-toggle="modal" data-target="#if_del_group"></i></div></li>')
            $(".o_group").children('li.active').find('input').focus();
        }
    }else{
        alert('最多添加5个自定义分组',4);
    }
});
//分组条目被点击
$(".o_group").on('click', 'li', function(event) {
    event.preventDefault();//如果是新增条目或者还在输入名称时，不能有被点击样式
    if(!$(this).hasClass('active')){
        $(this).siblings().removeClass('ac').end().addClass('ac');
        var groupId = $(this).children('div:first').children('input').attr('data-value');
        if(groupId == ''){
            sql = 'resume_status=1 and (id in (select resume_id from T_Resume_View t  LEFT JOIN V_Group_Info v ON (v.`InfoID` = resume_id AND v.`Group_Type` = 7) where t.pu_id='+pu_id+' and state=1 and v.gid is null)';
            sql += ' or id in (select objectid from T_Message_Record t LEFT JOIN V_Group_Info v ON (v.`InfoID` = objectid AND v.`Group_Type` = 7) where record_type=2 and t.receive_id=\"' + pu_email + '\" and state=1 and v.gid is null)';
            sql += ' or id in (select t.object_id from T_PU_Favorite t LEFT JOIN V_Group_Info v ON (v.`InfoID` = object_id AND v.`Group_Type` = 7) where favorite_type=1 and t.pu_id='+pu_id+' and v.gid is null))';
        }else{
            sql = 'resume_status=1 and id in (select infoid from V_Group_Info where pu_id='+pu_id+' and group_type=7 and gid='+groupId+')';
        }
        querySql = sql;
        load_type = 'all';
        myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), "update_date desc", page_size, "myResumeBind", "myResumeObj");
    }
});
//双击修改名称
$(".o_group").on('click', 'li .editor', function(event) {
    event.preventDefault();//只能仅有一个处于被修改状态
    event.stopPropagation();
    _this = $(this).parent().parent();
    if($(".o_group .active").length == 0 && _this.children('.group_name').text() != '未分组'){
        _this.addClass('active').removeClass('ac');
        _this.find('input').val(_this.children('.group_name').text());
    }
});
//点击取消
$(".o_group").on('click', 'li .cancel', function(event) {
    event.stopPropagation();
    var li = $(this).parent().parent();
    if(li.find('.group_name').text() == ''){
        li.remove();
    }else{
        li.removeClass('active');
    }
})

//点击删除
$(".o_group").on('click', 'li .delete', function(event) {
    event.stopPropagation();
    group_this = this;//获取当前点击的删除dom
    $('#delGroup').click();
})
//分组删除
// $(".o_group").on('click', 'li .delete', function(event) {
    // event.stopPropagation();
    // if(confirm('你确定要删除该分组吗？')){
    function del_group(){
        var _this = group_this;
        //获取输入的分组名称
        var groupObj = $(_this).parent().parent().children('div:first').children('input:first');
        $.ajax({
            type: "POST",
            url: "/deleteResumeGroup",
            data: {'group_id': groupObj.attr('data-value')},
            dataType: "json",
            success: function (data) {
                if(data.status == '1'){
                    var groupCount = groupObj.parent().next().next();
                    var text = groupCount.text().substring(1, groupCount.text().length - 1);
                    updateGroupCount('', parseInt(text));
                    $(_this).parent().parent().remove();
                    window.alert('删除分组成功',1);
                }else{
                    window.alert(data.msg,4);
                }
            }
        });
    }
    // }
// })
//点击提交保存名称
$(".o_group").on('click', 'li .submit', function(event) {
    event.stopPropagation();
    event.preventDefault();//输入框不能为空
    if($.trim($(this).prev().val()) !='' ){
        var groupName = $(this).prev().val();//当前输入的值
        var _this = $(this).prev()[0];//输入框
        var li  = $(this).parent().parent();//外层li
        var text = $(this).parent().next();//显示名称的元素
        var groupType = '7';
        var parentId = 0;
        var operateType = 'add';
        var params = {"parentId": parentId, "groupName": groupName, "groupType": groupType, "operateType": operateType};
        if($(this).prev().attr('data-value') != '' && $(this).prev().attr('data-value') != 0 && $(this).prev().attr('data-value') != undefined){
            operateType = 'update';
            params = {"groupId": $(this).prev().attr('data-value'), "groupName": groupName, "operateType": operateType};
        }
        $.ajax({
            type: "POST",
            url: "/ajax_groupOperate",
            data: params,
            dataType: "json",
            success: function (data) {
                if (data.msg == "新建分组成功！") {
                    li.removeClass('active');
                    text.text(groupName);
                    $('#groupList').append('<option value="' + data.id + '">'+groupName+'</option>');
                    //给分组赋ID
                    $(_this).attr('data-value', data.id);
                    window.alert('成功新建分组',1);
                }else if(data.msg == "修改分组成功！"){
                    li.removeClass('active');
                    text.text(groupName);
                    $('#groupList').children('option[value=' + $(_this).attr('data-value') + ']').text(groupName);
                    window.alert('修改分组成功',1);
                } else {
                    window.alert(data.msg,4);
                }
            }
        })
    }else{
        window.alert('请输入分组名称',4);
    }
});
//阻止输入框冒泡
$(".o_group").on('click', 'li input', function(event) {
    event.stopPropagation();
});
//文本超出显示。。。
$(".bb").each(function(index, el) {
	if ($(this).text().length > 91)
		$(this).addClass('active');
});
//全选
$(".count_operate .check").click(function(event) {
	if ($(this).hasClass('active')){
		$(".resume_info .check").addClass('active');
    }
	else{
        $(".resume_info .check").removeClass('active');
    }
});
//关注事件
$(".follow").click(function(event) {
    _this = $(this);
    _this.html('<span style="line-height:24px;">已关注</span>');
   $.ajax({
       url: '/path/to/file',
       type: 'POST',
       dataType: 'JSON',
       data: {param1: 'value1'},
       success:function(data){
        if(data==1){
            _this.html('<span style="line-height:24px;">已关注</span>');
        }
        else{
            alert("关注失败，请刷新页面重试",4)
        }
       }
   })

});


// 点击增删active
function active(obj) {
	if ($(obj).hasClass('active'))
		$(obj).removeClass('active');
	else
		$(obj).addClass('active');
}
$(".more_search").click(function(event) {
    $(".o_search .m").slideToggle(150);
    if($(this).hasClass('active')){
        $(this).hide().removeClass('active').css('display', 'inline-block');
    }else{
        $(this).hide().addClass('active').css('display', 'inline-block');
    }
});
// select方法
function select(p, ul, click) {
	p.click(function(event) {
        $(this).siblings().children('ul').slideUp(150);
		ul.slideToggle(150);
	});
	if (!click) {
		ul.on('click', 'li', function(event) {
            event.stopPropagation();
			ul.slideUp(150);
            if($(this).val() != '' && $(this).val() != '1'){
                p.children('p').text($(this).text());
                p.children('p').attr('data-value', $(this).val());
            }else if(p.children('p').attr('id') == 'max_diploma'){
                p.children('p').text('最高学历');
                p.children('p').attr('data-value', '');
            }else if(p.children('p').attr('id') == 'work_year'){
                p.children('p').text('工作经验');
                p.children('p').attr('data-value', '');
            }else if(p.children('p').attr('id') == 'expect_pay'){
                p.children('p').text('期望年薪');
                p.children('p').attr('data-value', '');
            }else if(p.children('p').attr('id') == 'resume_type'){
                p.children('p').text('简历类别');
                p.children('p').attr('data-value', '');
            }
            searchResumeData();
		});
	}
}
//单选
function danxuan(li) {
	li.click(function(event) {
		li.removeClass('active');
		$(this).addClass('active');
	});
}

//推荐职位时判断是否设置了允许推荐
function recommend(isInvite, source_id, resume_id, resume_name, resume_source){
    if(isInvite == '1'){
        o_show('yq', source_id, '', resume_id, resume_name, resume_source);
    }else{
        window.alert('该简历不接受推荐职位',4);
    }
}