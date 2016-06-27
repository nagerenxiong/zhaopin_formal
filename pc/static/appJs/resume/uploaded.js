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
    position_id = $(".position_id").val();
    var recommend_ids = $('#recommend_ids').val();
    if(recommend_ids && recommend_ids != ''){
        recommend_id_list = recommend_ids.split(',');
    }
    if(parseInt(window.location.hash.replace(/#/,"")) == 1){
        loadUnhandResume($(".conversion"));
    }else{
        if(position_id > 0){
            order_type = '';
            sql = 'resume_status=1 and (source_id=' + pu_id;
            sql += ' and id in (select infoid from V_Group_Info where group_type=4 and pu_id=' + pu_id + ')';
            sql += ' or (resume_status=1 and (id in (select resume_id from T_PU_Entrust where for_pu_id=' + pu_id + ' and entrust_status != 4))))';
        }else{
            sql = 'resume_status=1 and (source_id=' + pu_id;
            sql += ' and id in (select infoid from V_Group_Info where group_type=4 and pu_id=' + pu_id + ')';
            sql += ' or (resume_status=1 and (id in (select new_resume_id from T_Resume_View where pu_id=' + pu_id + ' and state=1)';
            sql += ' or id in (select resume_id from T_PU_Entrust where for_pu_id=' + pu_id + ' and entrust_status != 4)';
            if(pu_email != ''){
                sql += ' or id in (select objectid from T_Message_Record where record_type=2 and receive_id=\"' + pu_email + '\" and state=1)';
            }
            sql += ' or id in (select object_id from T_PU_Favorite where favorite_type=1 and pu_id=' + pu_id + '))))';
        }
        querySql = sql;
        if(position_id > 0) {
            myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), order_type, page_size, "myResumeBind", "myResumeObj", 1, position_id);
        } else {
            myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), order_type, page_size, "myResumeBind", "myResumeObj" );
        }
    }

    //简历类别
    $("#resume_type").click(function(event) {
        if ($(this).next().css('display') == "none") {
            $(this).next().slideDown(150);
        } else {
            $(this).next().slideUp(150);
        }
    });
    $("#resume_type").next().children('li').click(function(event) {
        $('#resume_type').attr('data-value', $(this).val());
        $(this).parent().slideUp(150);
        $('#resume_type').text($(this).text());
        searchResumeData();
    });
}
//切换数据加载类型
function changeDataType(type) {
    $('.o_search:first').css('display', '');
    $('.o_search:last').css('display', 'none');
    $('.resume_list:first').css('display', '');
    $('.resume_list:last').css('display', 'none');
    $('.dib').filter('.check').removeClass('active');
    load_type = type;
    if(type == 'myResume' || type == 'entrust'){
        $('#sj').css('display', 'none');
    }else{
        $('#sj').css('display', '');
    }
    loadNewSql();
    loadDataByLoadType();
}
//显示未转换简历
function loadUnhandResume(obj) {
    $(obj).addClass('active');
    $(".resume_group .all").removeClass('active');
    $('.default li').removeClass('active');
    $('.o_group li').removeClass('ac');
    $('.o_search:first').css('display', 'none');
    $('.o_search:last').css('display', '');
    $('.resume_list:first').css('display', 'none');
    $('.resume_list:last').css('display', '');
    sql = 'pu_id = ' + pu_id + ' and state=1';
    querySql = sql + ' order by add_date desc';
    loadData = new pagin("paginInfo1", "T_Resume_File_Upload", "", querySql, "", 20, "unhandleBind", "loadData");
}
//刷新每页显示数据条数
function reloadPage(reflushCount) {
    page_size = reflushCount;
    loadDataByLoadType();
}
//加载未转换的简历
function unhandleBind(dataInfo) {
    //图片列表数据加载
    $("#tableInfo1").empty();
    $('#tableInfo1').addClass('resulist');
    var titleHtml = '';
    titleHtml += '<li class="resltop">';
    titleHtml += '    <div class="lb1 lbcomm">简历名称</div>';
    titleHtml += '    <div class="lb2 lbcomm">简历解析度</div>';
    titleHtml += '    <div class="lb3 lbcomm">上传时间</div> ';
    titleHtml += '    <div class="lb4 lbcomm">操作</div>';
    titleHtml += '</li>';
    $("#tableInfo1").append(titleHtml);
    $(dataInfo).each(function (i) {

        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for (var n = 0; n < len; n++) {
            if (array[n] == null) {
                array[n] = "&nbsp;";
            }
        }
        var content = '';
        content += '<li><div class="resu_titile"><input name="input" type="checkbox" value="' + array[0] + '">';
        if (array[7] == "") {
            content += '<i class="Parssucss"></i>';
        }
        else {
            content += '<i class="noparssucss"></i>';
        }
        var parseco = array[6];

        if (parseco <= 10) {
            content += '<span title=' + array[3] + '>' + array[3] + '</span></div><div class="parsecount" style="color:#ff6666!important;">' + array[6] + '%</div><div class="resu_time">' + array[9].substring(0, 10) + '</div><div class="hintcon">' + array[7] + '<span></span></div>';
        }
        else {
            content += '<span title=' + array[3] + '>' + array[3] + '</span></div><div class="parsecount">' + array[6] + '%</div><div class="resu_time">' + array[9].substring(0, 10) + '</div>';
            if (array[7] != "") {
                content += '<div class="hintcon">' + array[7] + '<span></span></div>';
            }
        }
        content += '<div class="operation">';
//        if (parseco != '0') {
        content += '    <a href="javascript:void(0);" onclick="changeFileToResume(\'' + array[0] + '\')">转化为平台简历</a>';
//        } else {
//            content += '    <a href="/resume/new_jlsz" style="margin-right:10px;color:#333;">手动创建新简历</a>';
//        }
        content += '    <em href="javascript:void(0);" onclick="deleteResumeFile(' + array[0] + ')" data-toggle="modal" data-target="#isdelete_Modal"></em></div></li>';
        $("#tableInfo1").append(content);
        //文章列表数据加载  前期主要实现图片列表
    })
    $('#tableInfo li i.noparssucss').hover(
        function () {
            $(this).parent().siblings('.hintcon').css("display", "block");
        },
        function () {
            $(this).parent().siblings('.hintcon').css("display", "none");
        });

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
    if($(".position_id").length == 0) {
        // 非推荐
        content += '        <div class="check clearfix" onclick="active(this)" data-value="' + array[0] + '">';
        content += '            <em class="checkbox"><i class="iconfont icon-32gougou"></i></em>';
        content += '        </div>';
    }
    content += '    </div>';
    content += '    <div class="r">';
    content += '        <h1 style="margin:0">';
    var resume_type = array[65];
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
    if (load_type == 'entrust' || (load_type == 'all' && resume_type == 3 )) {
        date_type = '委托时间';
    }
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
    if(position_id > 0) {
        //判断是否推荐,true表示已推荐，false表示为推荐
        var recommend_or_not = false;
        var id_length = recommend_id_list.length;
        if(id_length > 0){
            for(var id_index = 0;id_index < id_length;id_index++){
                if(recommend_id_list[id_index] == array[0]){
                    recommend_or_not = true;
                    break;
                }
            }
        }
        if(recommend_or_not){
            content += '<div class="recommend_btn_box active1">';
        }else{
            content += '<div class="recommend_btn_box">';
        }
        content += '    <a href="javascript:void(0)" name="' + array[0] + '"></a>';
        content += '     <b>' + array[array.length - 1] + '%</b><p>匹配度</p>';
        content += '</div>';
    }

    content += '    </div>';
    if($(".position_id").length == 0) {
        // 非推荐
        var source_name = '';
        if(array[1] == 1){
            source_name = array[3];
        }else{
            source_name = array[66];
        }
        content += '    <div class="b"><input type="hidden" value="' + array[0] + '" /><input type="hidden" value="' + array[2] + '" />';
        if (load_type == 'myResume' || (load_type == 'all' && resume_type == 1 && array[2] == pu_id)) {
            content = content.replace('viewResume', 'editResume').replace('viewResume', 'editResume');
            content += '        <i class="delete" data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\', \'myResume\')"></i>';
            content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, ' + array[0] + ')">分组</span>';
            content += '        <span onclick="forward_resume(' + array[0] + ')">转发</span>';
            content += '        <span onclick="autoMatchingPosition(' + array[0] + ', ' + pu_id + ')">匹配</span>';
            content += '        <span onclick="flushDate(' + array[0] + ')">刷新</span>';
        } else if (load_type == 'myView' || (load_type == 'all' && resume_type == 2 )) {
            content = content.replace('viewResume', 'editResume').replace('viewResume', 'editResume');
            var result = getOriginalSourceId(array[0], 'myView');
            content += '<input type="hidden" value="' + result.original_id + '" />';
            content += '        <i class="delete" data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\', \'myView\')"></i>';
            content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, ' + array[0] + ')">分组</span>';
            content += '        <span data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \'' + result.original_resume_name + '\', \'' + result.original_id + '\', '+array[1]+', '+result.original_resume_id+', \''+array[3]+'\')">私信</span>';
            content += '        <span onclick="forward_resume(' + array[0] + ')">转发</span>';
            content += '        <span onclick="recommend(\'' + array[54] + '\', \'' + result.original_id + '\', '+array[0]+', \''+array[3]+'\', '+array[1]+')">推荐</span>';
        } else if (load_type == 'entrust' || (load_type == 'all' && resume_type == 3 )) {
            content = content.replace('viewResume', 'editResume').replace('viewResume', 'editResume');
            var result = getOriginalSourceId(array[0], 'entrust');
            content += '<input type="hidden" value="' + result.original_id + '" />';
            content += '        <i class="delete" data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\', \'entrust\')"></i>';
            content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, ' + array[0] + ')">分组</span>';
            content += '        <span onclick="forward_resume(' + array[0] + ')">转发</span>';
            content += '        <span data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \'' + array[3] + '\', \'' + result.original_id + '\')">回复</span>';
        } else if (load_type == 'forward' || load_type == 'myFavourite' || (load_type == 'all' && (resume_type == 0 || resume_type == 4 || resume_type == 5 || (resume_type == 1 && array[2] != pu_id)) )) {
            var delete_type = 'forward';
            if(load_type == 'myFavourite' || (load_type == 'all' && (resume_type == 0 || resume_type == 5 || (resume_type == 1 && array[2] != pu_id)))){
                delete_type = 'myFavourite';
            }
            content += '        <i class="delete" data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\', \''+delete_type+'\')"></i>';
            content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, ' + array[0] + ')">分组</span>';
            content += '        <span data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \'' + source_name + '\', \'' + array[2] + '\', '+array[1]+', '+array[0]+', \''+array[3]+'\')">私信</span>';
            content += '        <span onclick="forward_resume(' + array[0] + ')">转发</span>';
            content += '        <span onclick="recommend(\'' + array[54] + '\', \'' + array[2] + '\', '+array[0]+', \''+array[3]+'\', '+array[1]+')">推荐</span>';
//            content += '        <span  onclick="autoMatchingPosition(' + array[0] + ', ' + pu_id + ')">匹配</span>';
        } else if (load_type == 'all') {

        }
    }
    content += '    </div>';
    if (array[64] != '' && array[64] != '&nbsp;' && array[64] != 'None') {
        content += '    <span class="attachment"></span>';
    }
    content += '</li>';
    return content;
}
//获得我购买的简历或委托给我的简历的原始拥有人ID
function getOriginalSourceId(resume_id, type){
    var result = {};
    $.ajax({
        async: false,
        type: 'POST',
        url: '/getOriginalSourceId',
        data: {'resume_id': resume_id, 'type': type},
        dataType: 'json',
        success: function (data) {
            if(data.status == '1'){
                result = data;
            }
        }
    });
    return result;
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
                    obj.append('                <span class="bb1"><div style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">' + work.work_time + ' ' + work.company_name + position_name + '</div> </span>');
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
//编辑简历
function editResume(resumeId) {
    window.open('/jobs/resume/new_jlsz?resumeID=' + resumeId);
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
//改变未处理简历数量
function updateUnhandleCount(obj, count){
    var unhandleObj = $(obj).children('span');
    var text = unhandleObj.text().substring(1, unhandleObj.text().length - 1);
    unhandleObj.text('（' + (parseInt(text) + count) + '）');
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
    if (work_year != '' && work_year != '0') {
        querySql += ' and workyear=' + work_year;
    }
    var expectSalary = $('#expect_pay').attr('data-value');
    if (expectSalary != '' && expectSalary != '0') {
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
    console.log(resume_source);
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

//搜索按钮按下entry键事件
function judgeEntry() {
    if (event.keyCode == 13) {
        queryResume();
    }
}
//查询未处理简历
function queryResume() {
    var keywords = $('#condition').val();
    querySql = sql;
    //关键字
    if ($.trim(keywords) != '') {
        querySql += ' and file_name like "%' + keywords + '%"';
    }
    querySql += ' order by add_date desc';
    if(position_id > 0) {
        loadData = new pagin("paginInfo1", "T_Resume_File_Upload", "", encodeURI(querySql), "", 20, "unhandleBind", "loadData", 1, position_id);
    } else {
        loadData = new pagin("paginInfo1", "T_Resume_File_Upload", "", encodeURI(querySql), "", 20, "unhandleBind", "loadData");
    }
}
//转化为平台简历
function changeFileToResume(file_id) {
    var fileIds = '';
    if (file_id) {
        fileIds = file_id;
    } else {
        var checkboxes = $('input[name="input"]:checked');
        if (checkboxes.length == 0) {
            window.alert('请选择要转化的简历附件');
            return;
        }
        for (var index = 0; index < checkboxes.length; index++) {
            if (fileIds == '') {
                fileIds = checkboxes.eq(index).val();
            } else {
                fileIds += ',' + checkboxes.eq(index).val();
            }
        }
    }
    post('/fileChangeResume', fileIds);
}
//删除上传的附件
function deleteResumeFile(id) {
    $('#accessory').val(id);
}
//转发简历
function forward_resume(resume_id){
    if(isIdentityHeadhunt('3,5', '2')){
        doForwardResume([resume_id]);
    }
}

function delefunfile(){
    var id=$('#accessory').val();
    var t_id_list = [];
    if (id) {
            t_id_list.push(id);
    } else {
        var checkboxes = $('input[name="input"]:checked');
        if (checkboxes.length == 0) {
            window.alert('请选择要删除的简历附件',4);
            return;
        }
        for (var index = 0; index < checkboxes.length; index++) {
            t_id_list.push(checkboxes.eq(index).val());
        }
    }
    $("#tableInfo1").addClass('loading').children('li').not(".resltop").hide();
    $("#checkAll")[0].checked = false;
    $.ajax({
        type: "POST",
        url: "/delResumeFile",
        data: {"t_id_list": t_id_list},
        dataType: "json",
        success: function (data) {
            if (data.status == '1') {
                loadData = new pagin("paginInfo1", "T_Resume_File_Upload", "", encodeURI(querySql), "", 20, "unhandleBind", "loadData");
                updateUnhandleCount($(".conversion"), -t_id_list.length);
                window.alert('删除成功',1);
            } else {
                window.alert('数据不存在或登录超时，请刷新页面再操作',4);
                $("#tableInfo1 li").show();
            }
            $("#tableInfo1").removeClass('loading');
        }
    });
}

//重新拼接sql
function loadNewSql() {
    page_size = 10;
    if (load_type == 'myResume') {//我上传的简历
        sql = 'source_id=' + pu_id + ' and resume_status=1 and id in (select InfoID from V_Group_Info where pu_id=' + pu_id + ' and group_type=4)';
        querySql = sql;
    } else if (load_type == 'myView') {//我购买的简历
        sql = 'id in (select trv.new_resume_id from T_Resume_View trv where trv.pu_id = ' + pu_id + ' and state=1)';
        querySql = sql;
    } else if (load_type == 'entrust') {//委托的简历
        sql = 'source_id=' + pu_id + ' and resume_status=1 and id in (select resume_id from T_PU_Entrust where for_pu_id=' + pu_id + ' and entrust_status != 4)';
        querySql = sql;
    } else if (load_type == 'forward') {//转发的简历
        if(pu_email == ""){
            sql = 'id in (select objectid from T_Message_Record where record_type=2 and receive_id="' + pu_id + '" and state=1)';
        }
        else{
            sql = 'id in (select objectid from T_Message_Record where record_type=2 and receive_id="' + pu_email + '" and state=1)';
        }

        querySql = sql;
    } else if (load_type == 'myFavourite') {//我收藏的简历
        sql = 'resume_status=1 and id in (select object_id from T_PU_Favorite where favorite_type=1 and pu_id=' + pu_id + ')';
        querySql = sql;
    } else if (load_type == 'all') {//全部简历
        if(position_id > 0){
            sql = 'resume_status=1 and (source_id=' + pu_id;
            sql += ' and id in (select infoid from V_Group_Info where group_type=4 and pu_id=' + pu_id + ')';
            sql += ' or (resume_status=1 and (id in (select resume_id from T_PU_Entrust where for_pu_id=' + pu_id + ' and entrust_status != 4))))';
        }else{
            sql = 'resume_status=1 and (source_id=' + pu_id;
            sql += ' and id in (select infoid from V_Group_Info where group_type=4 and pu_id=' + pu_id + ')';
            sql += ' or (resume_status=1 and (id in (select new_resume_id from T_Resume_View where pu_id=' + pu_id + ' and state=1)';
            sql += ' or id in (select resume_id from T_PU_Entrust where for_pu_id=' + pu_id + ' and entrust_status != 4)';
            if(pu_email != ''){
                sql += ' or id in (select objectid from T_Message_Record where record_type=2 and receive_id=\"' + pu_email + '\" and state=1)';
            }
            sql += ' or id in (select object_id from T_PU_Favorite where favorite_type=1 and pu_id=' + pu_id + '))))';
        }
        querySql = sql;
    }
}
//根据加载类型重新加载数据
function loadDataByLoadType() {
    if(position_id > 0) {
        myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), order_type, page_size, "myResumeBind", "myResumeObj", 1, position_id);
    } else {
        myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), order_type, page_size, "myResumeBind", "myResumeObj" );
    }
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