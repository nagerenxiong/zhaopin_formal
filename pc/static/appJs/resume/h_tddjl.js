/**
 * Created by xk on 2015/9/26.
 */
var loadData;
var pu_id;
var sql;
var querySql;
var file_website = '';
window.onload = function(){
    file_website = $('#file_website').val();
    //切换标签
    $(".tddjl_span_box li").click(function(){
        $('#tableInfo').empty();
        $(".tddjl_span_box li").removeClass("bthover");
        $(this).addClass("bthover");
        var tabIndex = $('.tddjl_span_box li').index($(this));
        querySql = sql + ' and dispose_status=' + tabIndex;
        if(tabIndex == 3){
            querySql = sql + ' and dispose_status=4';
        }else if(tabIndex == 4){
            querySql = sql + ' and dispose_status=5';
        }else if(tabIndex == 5){
            querySql = sql + ' and dispose_status=3';
        }
        querySql += ' order by dispose_time desc';
        loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
        //无数据处理
        // if($("#tableInfo").text()==""){
        //     if(true)
        //         $('#noSendData_tddjl').css('display', 'block');
        //     else
        //         $('#noMatchData_tddjl').css('display', 'block');
        //     $(".page_number").hide();
        //     return;
        // }else{
        //     $('#noSendData_tddjl').css('display', 'none');
        //     $('#noMatchData_tddjl').css('display', 'none');
        //     $(".page_number").show();
        // }
        if($("#tableInfo").text()==""){            
            $(".page_number").hide();
        }else{
            $(".page_number").show();
        }
    });

    pu_id = $('#pu_id').val();
    sql = ' pPosition_Status=1 and id IN (SELECT MAX(a.id) AS aid FROM T_AJ_Info a WHERE release_id=' + pu_id + ' GROUP BY Form_No) and resume_status=1';
    querySql = sql + ' and dispose_status=0 order by dispose_time desc';
    loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
};
//动态加载页面绑定数据
function paginBind(dataInfo){
     $("#tableInfo").empty();
     //图片列表数据加载
     //无数据处理
     if(dataInfo == ''){
         $('#noSendData_tddjl').css('display', 'block');
         $('#noMatchData_tddjl').css('display', 'block');
         $(".page_number").hide();
         return;
     }else{
         $('#noMatchData_tddjl').css('display', 'none');
         $('#noSendData_tddjl').css('display', 'none');
         $(".page_number").show();
     }
    var tabIndex = $('.tddjl_span_box li').index($('.bthover'));
    $(dataInfo).each(function(i) {

        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for(var n = 0; n < len; n ++){
            if(array[n] == null){
                array[n] = "&nbsp;"
            }
        }
        if($.trim(array[4]) == ""){
            array[4] = "null";
        }
        var o_age = parseInt(new Date().getFullYear()) - array[6];
        if(isNaN(o_age)){
            o_age ="";
        }else{
            o_age = "|&nbsp;"+o_age+"岁";
        }
        var content = '';
        content += '<li class="hover">';
        content += '    <div class="t">';
        content += '        <span class="a1">应聘职位：</span><span class="a2" onclick="viewPosition('+array[43]+')" style="cursor: pointer;">'+array[37]+'</span>';
        if(array[64] != '&nbsp;' && array[64] != '' && array[64] != 0){
            content += '        <span class="a3">【赏金:'+array[64]+'】</span>';
        }
        if(tabIndex == 0 || tabIndex == 4){
            content += '        <span class="time">投递时间：'+array[40].substring(0, 16)+'</span>';
        }else{
            content += '        <span class="time">处理时间：'+array[40].substring(0, 16)+'</span>';
        }
        content += '    </div>';
        content += '    <div class="c">';
        content += '        <img src="'+file_website+array[4]+'" style="cursor: pointer;" alt="" onclick="viewResume('+array[41] + ',' + array[39] + ',' + array[0] + ')" onerror="notfind(this, 1, \''+array[5]+'\')">';
        content += '        <ul>';
        content += '            <li><span class="name" style="cursor: pointer;" onclick="viewResume('+array[41] + ',' + array[39] + ',' + array[0] + ')">'+array[3]+'</span><span>';
        if(array[5] == '男'){
            content += '            <i class="iconfont icon-nan"></i>';
        }else{
            content += '            <i class="iconfont icon-nv"></i>';
        }
        content += '                <span class="sex_value">'+array[5]+'</span>';
        content += '                '+array[16]+'  |  '+array[14]+'  |  '+array[15]+'  '+o_age+'';
        content += '            </span></li>';
        content += '            <li><label>目前职位：</label><span class="position">'+array[18]+'</span></li>';
        content += '            <li><label>毕业院校：</label><span id="education_info"></span></li>';
        content += '        </ul>';
        content += '        <div class="ppbtn"><input type="hidden" value="'+array[0]+'" /><input type="hidden" value="'+array[2]+'" />';
        content += '            <div style="width:90px; float:left;margin-top: -4px;">';
        content += '              <p class="zwpp">'+array[array.length - 1]+'%</p>';
        content += '              <p style="margin-top:9px;">职位匹配度</p>';
        content += '            </div><div class="btnlist">';
        if(array[77] != '&nbsp;' && array[77] != 0) {
            if (array[39] == '0') {
                content += '                       <input name="input" type="button" value="查看" class="gnanys"  onclick="o_show(\'lxfs\', ' + array[41] + ', \'\', \'\' ,\'\', '+array[1]+'), getOperateData(this, ' + i + ')">';
            } else if (array[39] == '1') {
                var email = '';
                if(array[1] == 1){
                    email = array[12];
                }else{
                    email = array[78];
                }
                content += '                       <input name="input" type="button" value="面试" class="gnanys"  onclick="getOperateData(this, ' + i + '),o_show(\'mstz\', ' + array[41] + ', \'' + email + '\')">';
            } else if (array[39] == '2') {
                content += '                       <input name="input" type="button" value="已入职" class="gnanys"   data-toggle="modal" data-target="#yrz_Modal" onclick="getOperateData(this, ' + i + ')">';
            } else if (array[39] == '5') {
                content += '                       <input name="input" type="button" value="查看" class="gnanys"   onclick="o_show(\'lxfs\', ' + array[41] + ', \'\', \'\' ,\'\', '+array[1]+'), getOperateData(this, ' + i + ')">';
            }
            if (array[39] < 3 || array[39] == 5) {
                content += '                       <input name="input" type="button" value="不合适" class="gnanys"  onclick="getOperateData(this, ' + i + '),o_show(\'bhs\', ' + array[41] + ')">';
            }
        }
        content += '            <span onclick="getOperateData(this, '+ i+'), doForwardResume([' + array[41] + '])" style="cursor: pointer;">转发</span>';
        var letter_text = letterDefaultContent(array[1], array[72], array[3], array[43], array[37]);
        content += '            <span data-toggle="modal" data-target="#sxmessage_Modal" style="cursor: pointer;"';
        content += '                onclick="getOperateDatass(this, \''+array[3]+'\', '+array[2]+',\'\', \'\', \'\',\''+encodeURIComponent(letter_text)+'\')" >私信</span>';
        content += '        </div></div>';
        content += '    </div>';
//        content += '<div style="clear:both; float:left; margin-left:19px;"><input name="choic_input" type="checkbox" value="'+array[0]+'"></div>';
        content += '</li>';
        $('#tableInfo').append(content);
        var education = $("#tableInfo").children('li:last').find('#education_info');
        //获得教育经历
        loadEducation(education, array[41]);
    })
}
// 私信默认内容
function letterDefaultContent(resume_source, resume_id, resume_name, position_id, position_name){
    var result = '';
    if(resume_source == 1){
        result = '感谢你投递我公司<a href="/resume/zwxq?positionId='+position_id+'" class="letterlj" target="_blank">';
        result += position_name+'</a>职位，我这边想要对您的情况进行详细了解，希望能与您进行沟通。';
    }else{
        result = '已收到您投递给我公司<a href="/resume/zwxq?positionId='+position_id+'" class="letterlj" target="_blank">';
        result += position_name + '</a>职位的简历<a href="/resume/new_jlyl?resumeID='+resume_id+'" class="letterlj" target="_blank">';
        result += resume_name + '</a>，希望能与您就该简历进行详细沟通。';
    }
    return result;
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
                obj.text(uc_name);
            }
        }
    });
}

$(document).on('mouseover','.panel-heading',function(){
    $(".panel-heading").removeClass('active');
    $(".wdgz_cal_tree_ul li").removeClass('active');
    $(this).addClass('active');
});
$(document).on('mouseout','.panel-heading',function(){
    $(".panel-heading").removeClass('active');
    $(".wdgz_cal_tree_ul li").removeClass('active');
});
$(document).on('mouseover','.wdgz_cal_tree_ul li',function(){

    $(".panel-heading").removeClass('active');
    $(".wdgz_cal_tree_ul li").removeClass('active');
    $(this).addClass('active');
});
$(document).on('mouseout','.cal_tree_dd #accordion',function(){

    $(".panel-heading").removeClass('active');
    $(".wdgz_cal_tree_ul li").removeClass('active');
});

//获得操作的数据
function getOperateData(obj, index){
    $('#operateIndex').val(index);
//    $('#operateId').val($(obj).parent().prev().children().eq(0).val());//应聘求职ID
    $('#operateId').val($(obj).parent().parent().children().eq(0).val());//应聘求职ID
    $('#operateState').val('simple');
//    $('#sourceId').val($('.jlmp122').eq(index - 1).children('div:eq(1)').children('div:eq(1)').children('ul').children('input').val());
    $('#sourceId').val($(obj).parent().parent().children().eq(1).val());
//    if($(obj).val() == '私信'){
    if($(obj).text() == '私信'){
        $('.message_Modal_box').children().remove();
//        var username = $(obj).parent().parent().parent().children('div:eq(1)').children('div').eq(1).children('ul').children('li:eq(0)').children('b').text();
        var username = $(obj).parent().parent().prev().children('li:eq(0)').children('span').eq(0).text();
        var em = '<span>' + username + '<label>x</label></span>';
        $('.message_Modal_box').append(em);
        $(".message_Modal_box label").click(function(){
            if($(".message_Modal_box label").length <= 1) {
                alert("您不能移除所有私信接收人!",4);
                return false;
            }
            $(this).parent().remove()
        })

    }else if ($(obj).val() == '查看'){
        $('#myPhone').val($('#my_phone').val());
        $('#myEmail').val($('#my_email').val());
    }
}
//简历处理事件
function dealResume(type){
    //type 0-待处理，1-待沟通，2-面试，3-不合适，4-已入职，5-已过滤
    var operateState = $('#operateState').val();
    var content = '';
    var operateIndex = $('#operateIndex').val();
    if(type == '3'){
        //判断是否是不合适操作，如果是要填写不合适理由
        content = $('#reason').val();
        if(content == ''){
            window.alert('请输入不合适理由！',4);
            $('#sureImproper').attr('data-dismiss', '');
            return;
        }else{
            $('#sureImproper').attr('data-dismiss', 'modal');
        }
    }else if(type == '2'){
        //判断是否是面试操作，如果是要填写面试说明
        content = $('#interViewReason').val();
        if(content == ''){
            window.alert('请输入面试说明！',4);
            $('#sureInterview').attr('data-dismiss', '');
            return;
        }else{
            $('#sureInterview').attr('data-dismiss', 'modal');
        }
    }
    dealMethod(type, content);
}
//从通讯录中选择收信人
function addContact(obj){
    var username = $(obj).children('span').text();
    var email = $(obj).children('input:last').val();
    var em = '<span>' + username + '<label>x</label><input type="hidden" value="'+email+'" /></span>';
    $('.message_Modal_box').append(em);
    $(".message_Modal_box label").click(function(){
        if($(".message_Modal_box label").length <= 1) {
            alert("您不能移除所有私信接收人!",4);
            return false;
        }
        $(this).parent().remove();
    })
}

//查看简历
function viewResume(resumeId, type, ajInfoId){
    window.location.href = '/resume/new_jlyl?type=' + type + '&ajInfoId=' + ajInfoId + '&resumeID=' + resumeId;
}
//预览职位
function viewPosition(position_id){
    window.open('/resume/zwxq?positionId=' + position_id, '_blank');
}
//查看联系方式
function viewResumeContact(obj){
    var phone = $('#myPhone').val();
    if($.trim(phone) == ''){
        window.alert('请输入您的联系方式',4);
        return;
    }else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
        window.alert('你输入的电话号码格式不对，请重新输入',4);
        return;
    }
    var email = $('#myEmail').val();
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if($.trim(email) == ''){
        window.alert('请输入您的邮箱地址',4);
        return;
    }else if(!reg.test(email)){
        window.alert('你输入的邮箱格式不对，请重新输入',4);
        return;
    }
    var ajInfoIds = [];
    var count = 1;
    var operateState = $('#operateState').val();
    if(operateState == 'simple'){
        var ajInfoId = $('#operateId').val();
        ajInfoIds.push(ajInfoId);
    }
    $.ajax({
        type: "POST",
        url: "/ajax_viewResume",
        data: {"ajInfoIds": ajInfoIds, "email": email, "phone": phone},
        dataType: "json",
        success: function (data) {
            if (data.status == 0) {
                window.alert(data.msg,4);
            }else{
                updateTabCount('1', count);
                loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
                window.alert('处理完成！',1);
            }
        }
    });
    $(obj).hide(300);$('.o_shade').remove();
}
//不合适处理
function improperDeal(obj){
    var content = $('#improper').val();
    dealMethod('3', content);
    $(obj).hide(300);$('.o_shade').remove();
}
//面试处理
function interviewDeal(obj){
    var textValue = '';
    var interviewTitle = $('#interviewTitle').val();
    if($.trim(interviewTitle) == ''){
        window.alert('请输入面试主题',4);
        return;
    }
    var interviewTime = $('#interviewTime').text();
    if($.trim(interviewTime) == ''){
        window.alert('请选择面试时间',4);
        return;
    }
    var interviewPlace = $('#interviewPlace').val();
    if($.trim(interviewPlace) == ''){
        window.alert('请输入面试地点',4);
        return;
    }
    var contactName = $('#contactName').val();
    if($.trim(contactName) == ''){
        window.alert('请输入联系人',4);
        return ;
    }
    var contactPhone = $('#contactPhone').val();
    if($.trim(contactPhone) == ''){
        window.alert('请输入联系电话',4);
        return;
    }else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(contactPhone)) && !(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(contactPhone))){
        window.alert('你输入的电话号码格式不对，请重新输入',4);
        return;
    }
    var note = $('#remark').val();
    if($.trim(note) == ''){
        window.alert('请填写补充内容',4);
        return;
    }
    textValue += interviewTitle + ':';
    textValue += '<p style="text-align:left;">'+note+'</p>';
    textValue += '<p style="text-align:left;">面试时间：'+interviewTime+'</p>';
    textValue += '<p style="text-align:left;">面试地点：'+interviewPlace+'</p>';
    textValue += '<p style="text-align:left;">联系人：'+contactName+'</p>';
    textValue += '<p style="text-align:left;">联系电话：'+contactPhone+'</p>';
    var ajInfoIds = [];
    var count = 1;
    var operateState = $('#operateState').val();
    if(operateState == 'simple'){
        var ajInfoId = $('#operateId').val();
        ajInfoIds.push(ajInfoId);
    }
    $.ajax({
        type: "POST",
        url: "/ajax_interviewDeal",
        data: {"ajInfoIds": ajInfoIds, "interviewTime": interviewTime, "interviewPlace": interviewPlace, "note": note,
                "contactName": contactName, "contactPhone": contactPhone, "content": textValue},
        dataType: "json",
        success: function (data) {
            if (data.status == 0) {
                window.alert(data.msg,4);
            }else{
                updateTabCount('2', count);
                loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
                $('#reason').val('');
                window.alert('处理完成！',1);
            }
        }
    });
    $(obj).hide(300);$('.o_shade').remove();
}
//简历处理方法
function dealMethod(type, content){
    var operateState = $('#operateState').val();
    if(operateState == 'simple'){
        var ajInfoId = $('#operateId').val();
        if(ajInfoId != ''){
            $.ajax({
                type: "POST",
                url: "/ajax_dealResume",
                data: {"ajInfoId": ajInfoId, "type": type, "content": content},
                dataType: "json",
                success: function (data) {
                    if (data.msg != 'success') {
                        window.alert(data.msg,4);
                    }else{
                        updateTabCount(type, 1);
                        loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
                        $('#reason').val('');
                        window.alert('处理完成！',1)
                    }
                }
            })
        }
    }
}
//修改上面切换标签数据的数量
function updateTabCount(index, count){
    if(index == 3){
        index = 5;
    }else if(index == 4){
        index = 3;
    }else if(index == 5){
        index = 4;
    }
    var m = $(".tddjl_span_box li").index($(".tddjl_span_box .bthover"));
    var first = $('.tddjl_span_box').children('li:eq('+m+')').children('span').text();
    $('.tddjl_span_box').children('li:eq('+m+')').children('span').text(parseInt(first) - count);
    if(parseInt(first) - count == 0){
        $('.tddjl_span_box').children('li:eq('+m+')').children('span').css('display', 'none');
    }
    var second = $('.tddjl_span_box').children('li:eq('+index+')').children('span').text();
    $('.tddjl_span_box').children('li:eq('+index+')').children('span').text(parseInt(second) + count);
    if(parseInt(second) == 0){
        $('.tddjl_span_box').children('li:eq('+index+')').children('span').css('display', '');
    }
}