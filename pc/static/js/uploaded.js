var myResumeObj;//我的简历库对象
var loadData;//
var sql;//初始化sql
var querySql;//执行的sql
var pu_id;//用户ID
var page_size = 10;//一页显示数据条数
var load_type = 'myResume';//加载数据类型
var deleteType = '1';//删除类型
var pu_email;//用户邮箱
var operateObj;//分组的操作对象
var oldGroupId;//原分组ID
window.onload = function(){
    pu_id = $('#pu_id').val();
    pu_email = $('#pu_email').val();
    sql = 'source_id=' + pu_id + ' and resume_status=1 and id in (select InfoID from V_Group_Info where pu_id='+pu_id+' and group_type=4)';
    querySql = sql;
    myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", querySql, "update_date desc", page_size, "myResumeBind", "myResumeObj");
};
//切换数据加载类型
function changeDataType(type){
    $('.o_search:first').css('display', '');
    $('.o_search:last').css('display', 'none');
    $('.resume_list:first').css('display', '');
    $('.resume_list:last').css('display', 'none');
    $('.dib').filter('.check').removeClass('active');
    load_type = type;
    loadNewSql();
    loadDataByLoadType();
}
//显示未转换简历
function loadUnhandResume(){
    $('.o_search:first').css('display', 'none');
    $('.o_search:last').css('display', '');
    $('.resume_list:first').css('display', 'none');
    $('.resume_list:last').css('display', '');
    sql = 'pu_id = ' + pu_id + ' and state=1';
    querySql = sql + ' order by add_date desc';
    loadData = new pagin("paginInfo1", "T_Resume_File_Upload", "", querySql, "", 20, "unhandleBind", "loadData");
}
//刷新每页显示数据条数
function reloadPage(reflushCount){
    page_size = reflushCount;
    loadDataByLoadType();
}
//加载未转换的简历
function unhandleBind(dataInfo){
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
    $(dataInfo).each(function(i) {

        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for(var n = 0; n < len; n ++){
            if(array[n] == null){
                array[n] = "&nbsp;";
            }
        }
        var content = '';
        content += '<li><div class="resu_titile"><input name="input" type="checkbox" value="'+array[0]+'">';
        if(array[7]==""){
           content += '<i class="Parssucss"></i>';
        }
        else{
           content += '<i class="noparssucss"></i>';
        }
        var parseco=array[6];

        if(parseco <= 10){
            content += array[3]+'</div><div class="parsecount" style="color:#ff6666!important;">'+array[6]+'%</div><div class="resu_time">'+array[9].substring(0, 10)+'</div><div class="hintcon">'+array[7]+'<span></span></div>';
        }
        else{
            content += array[3]+'</div><div class="parsecount">'+array[6]+'%</div><div class="resu_time">'+array[9].substring(0, 10)+'</div>';
            if(array[7]!=""){
               content +='<div class="hintcon">'+array[7]+'<span></span></div>';
            }
        }
        content += '<div class="operation">';
        if(parseco != '0'){
            content += '    <a href="javascript:void(0);" style="margin-right:10px;color:#5c91d9" onclick="changeFileToResume(\''+array[0]+'\')">转化为平台简历</a>';
        }else{
            content += '    <a href="/resume/new_jlsz" style="margin-right:10px;color:#333;">手动创建新简历</a>';
        }
        content += '    <em href="javascript:void(0);" onclick="deleteResumeFile('+array[0]+')"></em></div></li>';
        $("#tableInfo1").append(content);
        //文章列表数据加载  前期主要实现图片列表
    })
     $('#tableInfo li i.noparssucss').hover(
         function() {
            $(this).parent().siblings('.hintcon').css("display", "block");
         },
         function() {
             $(this).parent().siblings('.hintcon').css("display", "none");
         });

}
//加载我上传的简历
function myResumeBind(dataInfo){
    //设置列表头部结果数据条数及页码
    setCountAndSize();
    //图片列表数据加载
    $("#tableInfo").empty();
    $(dataInfo).each(function(i){
        var array = $(this);
        var content = contentHtml(array);
        $("#tableInfo").append(content);
        var education = $("#tableInfo").children('li:last').find('#education_info');
        //获得教育经历
        loadEducation(education, array[0]);
        //获得工作经历
        var workExperience = $("#tableInfo").children('li:last').find('#work_info');
        loadWorkExperience(workExperience, array[0]);
        if(load_type == 'forward' || load_type == 'myFavourite'){
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
function contentHtml(array){
    var len = array.length;
    for(var n = 0; n < len; n ++){
        if(array[n] == null){
            array[n] = "&nbsp;";
        }
    }
    // 处理值为 null 的字段
    if($.trim(array[4]) == ""){
        array[4] = "null";
    }
    if(array[35]=="&nbsp;"|| array[35] =="None"){
        array[35]=="";
    }else{
        array[35]="&nbsp;|&nbsp"+array[35];
    }
    if(array[36]=="&nbsp;"|| array[36] =="None"){
        array[36]=="";
    }else{
        array[36]="&nbsp;|&nbsp"+array[36];
    }
    var o_age = parseInt(new Date().getFullYear()) - array[6];
    if(isNaN(o_age)){
        o_age ="";
    }else{
        o_age = "&nbsp;|&nbsp;"+o_age+"岁";
    }
    //简历完整度
    if(array[62] == '&nbsp;' || array[62] == ''){
        array[62] = 0;
    }

    var content = '';
    content += '<li>';
    content += '    <div class="l">';
    content += '        <img src="'+array[4]+'" style="cursor: pointer;" alt="" onclick="viewResume('+array[0]+ ')" onerror="notfind(this, 1, \''+array[5]+'\')">';
    content += '        <b>'+array[62]+'%</b>';
    content += '        <p>简历完整度</p>';
    content += getResumeType(array[1]);
    content += '        <div class="check clearfix" onclick="active(this)" data-value="'+array[0]+'">';
    content += '            <em class="checkbox"><i class="iconfont icon-32gougou"></i></em>';
    content += '        </div>';
    content += '    </div>';
    content += '    <div class="r">';
    content += '        <h1>';
    content += '            <span class="name" style="cursor: pointer;" onclick="viewResume('+array[0]+ ')">'+array[3]+'</span>';
    content += '            <span>';
    if(array[5] == "女"){
        content += '<i class="iconfont icon-nv"></i>女';
    }else{
        content += '<i class="iconfont icon-nan"></i>男';
    }
    content += '                &nbsp;|&nbsp;'+array[37]+'&nbsp;'+array[35]+'&nbsp;'+array[36]+'&nbsp;'+o_age+'</span>';
    content += '            <p class="f_r">';
    content += '                <span class="time">更新时间：'+array[32].substring(0, 10)+'</span>';
    if(load_type == 'forward' || load_type == 'myFavourite'){//关注他人简历
        if(array[1] == 1)
            content += '                <span class="follow" onclick="attentionOperate(this, '+array[2]+')">关注</span>';
    }
    content += '            </p>';
    content += '        </h1>';
    if(array[44]){
    content += '        <p>';
    content += '            <label>目前职位：</label>';
    content += '            <span class="position">'+array[44]+'</span>';
    content += '        </p>';
    }
    content += '        <p>';
    content += '            <label>毕业院校：</label>';
    content += '            <span id="education_info"></span>';
    content += '        </p>';
    content += '        <p class="mt15 clearfix" id="work_info">';
    content += '            <label>工作经历：</label>';
    content += '        </p>';
    //个人标签
    if(array[41] != '' && array[41] != '&nbsp;'){
    content += '        <p class="mt15 o_label">';
    content += '            <label>个人标签:</label>';
    content += '            <span class="ml10">';
        var labelList = array[41].split('**');
        for(var m = 0;m < labelList.length;m++){
            if($.trim(labelList[m]) != '' && $.trim(labelList[m]) != '&nbsp;'){
                if(m%2 == 0)
                    content += '<i>'+labelList[m]+'</i>';
                else
                    content += '<i class="t">'+labelList[m]+'</i>';
                if(m == 5){
                    break;
                }
            }
        }
    
    content += '            </span>';
    content += '        </p>';
    }
    content += '    </div>';
    content += '    <div class="b"><input type="hidden" value="'+array[0]+'" /><input type="hidden" value="'+array[2]+'" />';
    if(load_type == 'myResume' || (load_type == 'all' && array[array.length -1] == 1 )){
        content = content.replace('viewResume', 'editResume').replace('viewResume', 'editResume');
        content += '        <i class="delete" data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\')"></i>';
        content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, '+array[0]+')">分组</span>';
        content += '        <span onclick="doForwardResume(['+array[0]+'])">转发</span>';
        content += '        <span onclick="autoMatchingPosition('+array[0]+')">匹配</span>';
        content += '        <span onclick="flushDate(' + array[0] + ')">刷新</span>';
    }else if(load_type == 'myView' || (load_type == 'all' && array[array.length -1] == 2 )){
        content = content.replace('viewResume', 'editResume').replace('viewResume', 'editResume');
        content += '        <i class="delete" data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\')"></i>';
        content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, '+array[0]+')">分组</span>';
        content += '        <span data-toggle="modal" data-target="#message_Modal" onclick="getOperateData(this)">私信</span>';
        content += '        <span onclick="doForwardResume(['+array[0]+'])">转发</span>';
        content += '        <span onclick="recommend(\''+array[54]+'\', \''+array[2]+'\')">推荐</span>';
    }else if(load_type == 'entrust' || (load_type == 'all' && array[array.length -1] == 3 )){
        content = content.replace('viewResume', 'editResume').replace('viewResume', 'editResume');
        content += '        <span data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\')">删除</span>';
        content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, '+array[0]+')">分组</span>';
        content += '        <span onclick="doForwardResume(['+array[0]+'])">转发</span>';
        content += '        <span data-toggle="modal" data-target="#message_Modal" onclick="getOperateData(this)">回复</span>';
    }else if(load_type == 'forward' || load_type == 'myFavourite' || (load_type == 'all' && (array[array.length -1] == 4 || array[array.length -1] == 4) )){
        content += '        <i class="delete" data-toggle="modal" data-target="#if_del_Modal" onclick="setDeleteId(this, \'' + array[0] + '\')"></i>';
        content += '        <span id="groupBtn" data-toggle="modal" data-target="#update_fz_Modal" onclick="showGroupName(this, '+array[0]+')">分组</span>';
        content += '        <span data-toggle="modal" data-target="#message_Modal" onclick="getOperateData(this)">私信</span>';
        content += '        <span onclick="doForwardResume(['+array[0]+'])">转发</span>';
        content += '        <span  onclick="autoMatchingPosition('+array[0]+')">匹配</span>';
    }else if(load_type == 'all'){

    }
    content += '    </div>';
    if(array[38] != ''){
        content += '    <span class="attachment"></span>';
    }
    content += '</li>';
    return content;
}
//获得简历类型
function getResumeType(type){
    if(load_type != 'myResume' && load_type != 'entrust'){
        switch(type){
            case 1:
                return '<p>[个人简历]</p>';
            case 2:
                return '<p>[经纪人简历]</p>';
            case 3:
                return '<p>[企业简历]</p>';
            default:
                return '';
        }
    }else{
        return '';
    }
}
//加载教育经历
function loadEducation(obj, resume_id){
    $.ajax({
        type: 'POST',
        url: '/getEducationExperience',
        data: {'resume_id': resume_id},
        dataType: 'json',
        success: function(data){
            if(data.status == '1'){
                var uc_name = data.uc_name;
                var smajor = data.smajor;
                var sdiploma = data.sdiploma;
                obj.text(uc_name + ' | ' + smajor + ' | ' + sdiploma);
            }
        }
    });
}
//加载工作经验
function loadWorkExperience(obj, resume_id){
    $.ajax({
        type: 'POST',
        url: '/getWorkExperience',
        data: {'resume_id': resume_id},
        dataType: 'json',
        success: function(data){
            if(data.status == '1'){
                var workList = data.works;
                for(var n = 0;n < workList.length;n++){
                    var work = workList[n];
                    obj.append('                <span class="bb1"> '+work.work_time+' '+work.company_name+'  |  '+ work.sposition+ '</span>');
                    if(n == 2){
                        break;
                    }
                }
            }
        }
    });
}
//判断简历是否关注
function judgeAttention(attObj, resume_id){
    $.ajax({
        type: 'POST',
        url: '/judgeAttentionAndCollect',
        data: {'resume_id': resume_id},
        dataType: 'json',
        success: function(data){
            if(data.status == '1'){
                if(data.attention == '取消关注'){
                    attObj.text(data.attention);
                    attObj.attr('data-value', data.groupId);
                }
            }
        }
    });
}
//加载分组信息
function loadGroupInfo(obj, resume_id){
    $.ajax({
        type: "POST",
        url: "/ajax_getGroupByResumeId",
        data: {"resume_id": resume_id},
        dataType: "json",
        success: function (data) {
            if(data.status == '1'){
                $(obj).attr('data-value', data.group_id);
                $(obj).attr('data-key', data.group_info_id);
            }else{
                $(obj).attr('data-value', '');
                $(obj).attr('data-key', '');
            }
        }
    });
}
//关注和取消关注
function attentionOperate(obj, source_id){
    var type = '1';
    var groupId = '';
    if($.trim($(obj).text()) == '取消关注'){
        type = '0';
        groupId = $(obj).attr('data-value');
    }
    $.ajax({
        type: 'POST',
        url: '/ajax_attentionOperate',
        data: {'id': source_id, 'type': type, 'groupId': groupId},
        dataType: 'json',
        success: function(data){
            if(data.status && data.status == '0'){
                window.alert('关注人数已达上限',4);
            }else if(data.msg && data.msg == 'success'){
                $(obj).addClass('cancel').text('取消关注');
                $(obj).attr('data-value', data.groupId);
                window.alert('关注成功',1);
            }else if(data.msg && data.msg == '取消关注成功！'){
                $(obj).empty();
                $(obj).append('关注').removeClass('cancel');
                window.alert(data.msg,1);
            }
        }
    })
}
//获得操作的数据
function getOperateData(obj){
    $('#operate_id').val($(obj).parent().children().eq(1).val());//简历拥有人ID
    $('#operateState').val('simple');

    $('.message_Modal_box').children().remove();
    var username = $(obj).parent().prev().children('h1:eq(0)').children('span').eq(0).text();
    var em = '<span>' + username + '</span>';
    $('.message_Modal_box').append(em);
}
//判断是否有选中的人
function judgeSelected(obj){
    var checkboxes = $(".resume_info .check").filter('.active');
    var objValue = $.trim($(obj).text());
    if(checkboxes.length == 0){
        window.alert("请选择要操作的数据！",2);
        $('.more_forward').eq(2).attr('data-target', '');
        return false
    }else{
        $('.more_forward').eq(2).attr('data-target', '#message_Modal');
    }
    if(objValue == '批量私信'){
        $('.message_Modal_box').children().remove();
        for(var m = 0;m < checkboxes.length;m++){
            var username = checkboxes.eq(m).parent().next().children('h1:eq(0)').children('span').eq(0).text();
            var em = '<span>' + username + '<label>x</label></span>';
            $('.message_Modal_box').append(em);
        }
        $(".message_Modal_box label").click(function(){
            if($(".message_Modal_box label") > 1){
                $(this).parent().remove();
            }else{
                window.alert('至少要有一个接收人',2);
            }
        })
    }else if(objValue == '批量转发'){
        var resumeIds = [];
        for(var i = 0; i < checkboxes.length; i ++){
            resumeIds.push(checkboxes.eq(i).attr('data-value'))
        }
        doForwardResume(resumeIds);
    }
    $('#operateState').val('multi');
}
//发送私信
function sendLetter(){
    var letterContent = $('#letterContent').val();
    if($.trim(letterContent) == ''){
        window.alert("请填写私信内容！",4);
        $('#send').attr('data-dismiss', '');
        return;
    }
    //判断是给单个对象发私信还是给选中的对象发私信
    if($('#operateState').val() == 'simple'){
        //简历拥有人ID
        var attentionId = $('#operate_id').val();
        $.ajax({
            type: "POST",
            url: "../ajax_sendLetter",
            data: {"attentionId": attentionId, "letterContent": letterContent},
            dataType: "json",
            success: function (data) {
                if (data.msg != 'success') {
                    window.alert(data.msg,4);
                }else{
                    $('#send').attr('data-dismiss', 'modal');
                    window.alert('发送成功！',1)
                }
            }
        })
    }else{
        var checkboxes = $(".resume_info .check").filter('.active');
        if(checkboxes.length == 0){
            window.alert("请选择私信接收人！",4);
            return;
        }
        var attentionIds = [];//简历拥有人ID
        for(var i = 0;i < checkboxes.length;i++){
            attentionIds.push(checkboxes.eq(i).parent().next().next().children('input:eq(1)').val());
        }
        $.ajax({
            type: "POST",
            url: "../ajax_sendSelected",
            data: {"attentionIds": attentionIds, "letterContent": letterContent},
            dataType: "json",
            success: function (data) {
                if (data.msg == 'success') {
                    $('#send').attr('data-dismiss', 'modal');
                    window.alert('发送成功！',1)
                } else {
                    window.alert(data.msg,4);
                }
            }
        })
    }
}
//批量预览简历
function browseResume(){
    var checkboxes = $(".resume_info .check");
    var selectCount = 0;
    for(var m = 0;m < checkboxes.length;m++){
        if(checkboxes.eq(m).hasClass('active')){
            window.open('/jobs/resume/new_jlyl?resumeID=' + checkboxes.eq(m).attr('data-value'));
            selectCount += 1;
        }
    }
    if(selectCount == 0){
        window.alert('请选择要预览的简历',4);
    }
}
//编辑简历
function editResume(resumeId){
    window.open('/jobs/resume/new_jlsz?resumeID=' + resumeId);
}
//查看简历
function viewResume(resumeId){
    window.open('/jobs/resume/new_jlyl?resumeID=' + resumeId);
}
//设置删除的ID(点击简历删除图标时)
function setDeleteId(obj, resumeId) {
    operateObj = $(obj).next();
    $('#cancelId').val(resumeId);
}
//删除简历
function deleteResume(){
    var resumeId = $('#cancelId').val();
    $.ajax({
        type: "POST",
        url: "/deleteResumeOfDatabase",
        data: {"resumeId": resumeId, "deleteType": load_type},
        dataType: "json",
        success: function (data) {
            if (data.status == '1') {
                window.alert('删除成功',1);
                //修改类型数量及总数
                var typeObj = $('a[onclick="changeDataType(\''+load_type+'\')"]');
                var count = typeObj.children('span').text();
                typeObj.children('span').text(parseInt(count) - 1);
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
function showGroupName(obj, resume_id){
    operateObj = obj;
    oldGroupId = $(obj).attr('data-value');
    $('#groupList').val($(obj).attr('data-value'));
    $('#operate_id').val(resume_id);
}
//更新分组
function updateGroup(){
    var newGroupId = $('#groupList').val();
    if(oldGroupId == newGroupId){
        window.alert('分组没有变化无需保存',4);
    }else{
        var resume_id = $('#operate_id').val();
        var groupInfoId = $(operateObj).attr('data-key');
        $.ajax({
            type: "POST",
            url: "/ajax_updateResumeGroup",
            data: {"resume_id": resume_id, 'oldGroupId': oldGroupId, 'newGroupId': newGroupId, 'groupInfoId': groupInfoId},
            dataType: "json",
            success: function (data) {
                if(data.status == '1'){
                    $(operateObj).attr('data-value', newGroupId);
                    //修改分组数量
                    updateGroupCount(newGroupId, 1);
                    updateGroupCount(oldGroupId, -1);
                    window.alert('修改分组成功',1);
                }else{
                    window.alert(data.msg,4);
                }
            }
        });
    }
}
//修改分组数量
function updateGroupCount(groupId, count){
    var groupObj = $('input[data-value="'+groupId+'"]').next().next();
    var text = groupObj.text().substring(1, groupObj.text().length - 1);
    groupObj.text('（' + (parseInt(text) + count) + '）');
}

function key_number(obj){
    obj.value=obj.value.replace(/[^1-9]/g,'');
}
//根据搜索条件搜索简历
function searchResumeData(){
    var keywords = $('#search_input').val();
    querySql = sql;
    //关键字
    if(keywords != ''){
        var keywordList = keywords.split('，');
        for(var m = 0;m < keywordList.length;m++){
            if(m == 0){
                querySql += ' and (user_name like "%' + $.trim(keywordList[m]) + '%"';
            }else{
                querySql += ' or user_name like "%' + $.trim(keywordList[m]) + '%"';
            }
            querySql += ' or Currently_Pacece like "%' + $.trim(keywordList[m]) + '%"';
            querySql += ' or Currently_Postaion like "%' + $.trim(keywordList[m]) + '%"';

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
        }
        querySql += ')';
    }
    var industrys = $('#businessulValue').val();
    //期望行业
    if(industrys != ''){
        var industryIds = industrys.split(',');
        for(var m = 0;m < industryIds.length;m++){
            if(m == 0){
                querySql += ' and (find_in_set("' + industryIds[m] + '", cast(expect_industry as char))';
            }else{
                querySql += ' or find_in_set("' + industryIds[m] + '", cast(expect_industry as char))';
            }
        }
        querySql += ')';
    }
    var positions = $('#expectPosition').val();
    //期望职位
    if(positions != ''){
        var positionIds = positions.split(',');
        for(var m = 0;m < positionIds.length;m++){
            if(m == 0){
                querySql += ' and (expect_position like "%' + $.trim(positionIds[m]) + '%"';
            }else{
                querySql += ' or expect_position like "%' + $.trim(positionIds[m]) + '%"';
            }
        }
        querySql += ')';
    }
    var expected_area = $('#expected_area').val();
    if(expected_area != ''){//期望工作地点
        var expect_areaes = $('#expected_area').next().val();
        var values = expect_areaes.split(',');
        for(var m = 0;m < values.length;m++){
            if(m == 0){
                querySql += ' and (find_in_set("' + values[m] + '", cast(expect_area as char))';
                querySql += ' or expect_area in (select dictionary_value from T_SYS_Dictionary where p_value="'+values[m]+'")';
            }else{
                querySql += ' or find_in_set("' + values[m] + '", cast(expect_area as char))';
                querySql += ' or expect_area in (select dictionary_value from T_SYS_Dictionary where p_value="'+values[m]+'")';
            }
        }
        querySql += ')';
    }
    var sex = $.trim($('.sex').filter('.active').text());
    if(sex != '不限' ){
        querySql += ' and sex="' + sex + '" ';
    }
    var startAge = $('#startAge').val();
    var endAge = $('#endAge').val();
    var rangeAge = '';
    if(startAge != '' || endAge != ''){
        if(startAge == ''){
            for(var m = 18;m < endAge;m++){
                if(rangeAge == ''){
                    rangeAge += m;
                }else{
                    rangeAge += ',' + m;
                }
            }
            rangeAge += ',' + endAge;
        }else if(endAge == ''){
            rangeAge = startAge;
            for(var m = startAge;m <= 60;m++){
                 rangeAge += ',' + m;
            }
        }else{
            if(endAge <startAge){
                alert('请输入正确的年龄范围',4);
                return false;
            }
            rangeAge = '';
            for(var m = startAge;m <= endAge;m++){
                 if(rangeAge == ''){
                    rangeAge += m;
                }else{
                    rangeAge += ',' + m;
                }
            }
        }
        querySql += ' and find_in_set((year(now()) - birthday_year), "'+ rangeAge + '") ';
    }
    var work_year = $('#work_year').attr('data-value');
    if(work_year != '' && work_year != '0'){
        querySql += ' and workyear=' + work_year;
    }
    var expectSalary = $('#expect_pay').attr('data-value');
    if(expectSalary != '' && expectSalary != '0'){
        querySql += ' and expect_pay=' + expectSalary;
    }
    var company_name = $.trim($('.company_name').val());
    if(company_name != ''){
        var radio = $('.dib').filter('.active');
        if($.trim(radio.text()) == '目前公司'){
            querySql += ' and currently_company like "%' + company_name + '%"';
        }else{
            querySql += ' and (id in (select distinct(Resume_ID) from T_Resume_Work where Company_Name like "%' + company_name + '%")';
            querySql += ' or currently_company like "%' + company_name + '%")';
        }
    }
    var current_area = $('#current_area').val();
    if(current_area != ''){
        var current_Value = $('#current_area').next().val();
        querySql += ' and currently_pacece=' + current_Value;
    }
    var diploma = $('#max_diploma').attr('data-value');
    if(diploma != '' && diploma != '0'){
        querySql += ' and diploma=' + diploma;
    }
    //简历类型（个人简历或经纪人简历）
    var resume_source = $('#resume_type').attr('data-value');
    if(resume_source != '' && resume_source != '0'){
        querySql += ' and resume_source=' + resume_source;
    }
    loadDataByLoadType();
}
//设置列表头部结果数据条数及页码
function setCountAndSize(){
    //复选框置为未选中状态
    $('.dib').filter('.check').removeClass('active');
    var indexPage = $('#paginInfo').children('ul').children('.active').text();
    var pageCount = parseInt(_counts / page_size);
    if(_counts % page_size > 0){
        pageCount += 1;
    }
    if(!indexPage || indexPage == ''){
        if(pageCount > 0){
            indexPage = 1;
        }else{
            indexPage = 0;
        }
    }
    $('.page_right').children('span').text(indexPage);
    $('.page_right').children('b').text(pageCount);
    $('.resume_count').text(_counts);
}

//搜索按钮按下entry键事件
function judgeEntry(){
    if(event.keyCode == 13){
        queryResume();
    }
}
//查询未处理简历
function queryResume(){
    var keywords = $('#condition').val();
    querySql = sql;
    //关键字
    if($.trim(keywords) != ''){
        querySql += ' and file_name like "%'+keywords+'%"';
    }
    querySql += ' order by add_date desc';
    loadData = new pagin("paginInfo1", "T_Resume_File_Upload", "", encodeURI(querySql), "", 20, "unhandleBind", "loadData");
}
//转化为平台简历
function changeFileToResume(file_id){
    var fileIds = '';
    if(file_id){
        fileIds = file_id;
    }else{
        var checkboxes = $('input[name="input"]:checked');
        if(checkboxes.length == 0){
            window.alert('请选择要转化的简历附件',4);
            return;
        }
        for(var index = 0;index < checkboxes.length;index++){
            if(fileIds == ''){
                fileIds = checkboxes.eq(index).val();
            }else{
                fileIds += ',' + checkboxes.eq(index).val();
            }
        }
    }
    post('/fileChangeResume', fileIds);
}
//删除上传的附件
function deleteResumeFile(id){
    var t_id_list = [];
    if(id){
        if(confirm('你确定要删除该附件吗？')){
            t_id_list.push(id);
        }else{
            return false;
        }
    }else{
        var checkboxes = $('input[name="input"]:checked');
        if(checkboxes.length == 0){
            window.alert('请选择要删除的简历附件',4);
            return;
        }
        if(!confirm('你确定要删除选中的附件吗？')){
            return false;
        }
        for(var index = 0;index < checkboxes.length;index++){
            t_id_list.push(checkboxes.eq(index).val());
        }
    }
    $.ajax({
        type: "POST",
        url: "/delResumeFile",
        data: {"t_id_list": t_id_list},
        dataType: "json",
        success: function (data) {
            if(data.status == '1'){
                loadData = new pagin("paginInfo1", "T_Resume_File_Upload", "", encodeURI(querySql), "", 20, "unhandleBind", "loadData");
                var unhandleObj = $('a[onclick="loadUnhandResume()"]').children('span');
                var text = unhandleObj.text().substring(1, unhandleObj.text().length - 1);
                unhandleObj.text('（' + (parseInt(text) - t_id_list.length) + '）');
                window.alert('删除成功',1);
            }else{
                window.alert('数据不存在或登录超时，请刷新页面再操作',2);
            }
        }
    });
}
//重新拼接sql
function loadNewSql(){
    page_size = 10;
    if(load_type == 'myResume'){//我上传的简历
        sql = 'source_id=' + pu_id + ' and resume_status=1 and id in (select InfoID from V_Group_Info where pu_id='+pu_id+' and group_type=4)';
        querySql = sql;
    }else if(load_type == 'myView'){//我购买的简历
        sql = 'id in (select trv.new_resume_id from T_Resume_View trv where trv.pu_id = ' + pu_id + ' and state=1)';
        querySql = sql;
    }else if(load_type == 'entrust'){//委托的简历
        sql = 'source_id=' + pu_id + ' and resume_status=1 and id in (select resume_id from T_PU_Entrust where for_pu_id='+pu_id+' and entrust_status != 4)';
        querySql = sql;
    }else if(load_type == 'forward'){//转发的简历
        sql = 'id in (select objectid from T_Message_Record where record_type=2 and receive_id="'+pu_email+'" and state=1)';
        querySql = sql;
    }else if(load_type == 'myFavourite'){//我收藏的简历
        sql = 'resume_status=1 and id in (select object_id from T_PU_Favorite where favorite_type=1 and pu_id='+pu_id+')';
        querySql = sql;
    }else if(load_type == 'all'){//全部简历
        sql = 'source_id=' + pu_id + ' and resume_status=1';
        sql += ' and id in (select infoid from V_Group_Info where group_type=4 and pu_id='+pu_id+')';
        sql += ' or (resume_status=1 and (id in (select new_resume_id from T_Resume_View where pu_id='+pu_id+' and state=1)';
        sql += ' or id in (select resume_id from T_PU_Entrust where for_pu_id='+pu_id+' and entrust_status != 4)';
        sql += ' or id in (select objectid from T_Message_Record where record_type=2 and receive_id=\'' + pu_email + '\' and state=1)';
        sql += ' or id in (select object_id from T_PU_Favorite where favorite_type=1 and pu_id='+pu_id+')))';
        querySql = sql;
    }
}
//根据加载类型重新加载数据
function loadDataByLoadType(){
    if(load_type == 'myResume'){
        $('.more_forward').eq(2).css('display', 'none');
    }else if(load_type == 'myView'){
        $('.more_forward').eq(2).css('display', 'none');
    }else if(load_type == 'entrust'){
        $('.more_forward').eq(2).css('display', 'none');
    }else if(load_type == 'forward'){
        $('.more_forward').eq(2).css('display', '');
    }else if(load_type == 'myFavourite'){
        $('.more_forward').eq(2).css('display', '');
    }else if(load_type == 'all'){

    }
    myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), "update_date desc", page_size, "myResumeBind", "myResumeObj");
}
//翻页
function pageTurn(type){
    var indexPage = $('.page_right').children('span').text();
    var pageSize = $('.page_right').children('b').text();
    if(type == 'up'){
        if(indexPage == '1'){
            window.alert('已经是第一页',4);
            return;
        }
        if($('#paginInfo_backPage')){
            $('#paginInfo_backPage').click();
        }
    }else if(type == 'down'){
        if(pageSize == indexPage){
            window.alert('已经是最后一页',4);
            return;
        }
        if($('#paginInfo_backPage')){
            $('#paginInfo_backPage').parent().children(':eq(-2)').click();
        }
    }
}