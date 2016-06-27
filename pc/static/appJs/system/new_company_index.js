/**
 * Created by xk on 2015/9/7.
 */
 //公司主页下拉去除公司主页
$(".grxx ul li").eq(0).css('display', 'none');
$(".accout_list li").eq(0).css('display', 'none');




//用于接收5个职位匹配的简历
var matchPositions = new Array();
matchPositions.push('');
matchPositions.push('');
matchPositions.push('');
matchPositions.push('');
matchPositions.push('');
var loadData;
var pu_id;
var querySql;
var collectType = 'resumeId';//收藏类型，是根据简历ID还是应聘求职ID
var file_website = '';
//初始化数据
$(function(){
    //======= 信息模版
    $(".icon-iconfontmoban2").click(function(){
        $(".dialog").show();
    })
    $(".qx_btn").click(function(){
        $(".dialog").hide();
    })
    $(".dialog li").click(function(){
        $(".dialog li").removeClass('active');
        $(this).addClass('active');
    })
    $(".dialog li").dblclick(function(){
         confirms.call(this);
    })
    $(".modal_wdgz .re_btn").click(function(){
        confirms.call(this);
    })
    function confirms(){
        $("#letterContent").val($(".dialog li.active").children('input').val());
        $(this).parent().parent().hide();
    }


});
window.onload = function() {
    file_website = $('#file_website').val();
    if($('.zpzw li').length > 1) {
        pu_id = $('#pu_id').val();
        var sql = ' id IN (SELECT MAX(a.id) AS aid FROM T_AJ_Info a WHERE release_id=' + pu_id + ' GROUP BY Form_No) and resume_status=1';
        var obj = $('.leading').next();
        matchResume(obj, 1);
        querySql = sql + ' and dispose_status=0 and pPosition_Status=1';
        loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
    }
}
//根据简历或人才经纪人查询数据
function queryData(){
    var type = $('.search_select').children('div:first').children('span').text();
    var condition = $('.search_input').val();
    if($('#selectItems').children('li:first').text() == type){
        window.open('/jobs/resume/new_resume_search?condition=' + condition, '_blank');
    }else{
        window.open('/system/new_agent_search?condition=' + condition, '_blank');
    }
}
//智能匹配
function matchResume(obj, index){
    var positionId = $(obj).val();
    var matchContain = $('.ppd_zw').eq(0);
    if (matchPositions[index - 1] == ''){
        $.ajax({
            type: "POST",
            url: "/ajax_autoMatching",
            data: {"positionID": positionId, "type": 2},
            dataType: "json",
            success: function (data) {
                matchContain.empty();
                var content =addresume(data.dataInfo);
                matchPositions[index - 1] = content;
                matchContain.append(content);
                matchContain.append('<script>$(".knob1").knob({thickness:.05,fgColor:"#ff8800",bgColor:"#e4e4e4",displayInput:false,readOnly:true})</script>');
            }
        });
    }else{
        matchContain.empty();
        matchContain.append(matchPositions[index - 1]);
    }
}
//加载匹配的简历
function addresume(dataInfo){
    //无数据处理  
    if(dataInfo== ""){
        $('#noSendData_znpp').css('display', 'block');
        $("#paginTddzwInfo").hide();
        return;
    } else {
        $('#noSendData_znpp').css('display', 'none');
        $("#paginTddzwInfo").hide();
    }
    var content="";
    var userValidateStatus = $("#userValidateStatus").val();
    $(dataInfo).each(function() {
        var array = $(this);
        for(var i = 0 ; i < array.length; i ++){
            if(array[i] == null || array[i] == ""){
                array[i] = "&nbsp;";
            }
        }
        if(array[5] == '女'){
            array[3] = $.trim(array[3]).substring(0,1)+"女士";
        }else{
            array[3] = $.trim(array[3]).substring(0,1)+"先生";
        }
        if($.trim(array[4]) == "")
            array[4] ="null";

        var o_list = new Array();
        var sj = new Date().getFullYear() - parseInt(array[6]);

        if(array[37] != "&nbsp;" && $.trim(array[37]) !=""){
            o_list.push(array[37]);
        }
        if(array[35] != "&nbsp;" && $.trim(array[35]) !=""){
            o_list.push(array[35]);
        }
        if(array[36] != "&nbsp;" && $.trim(array[36]) !=""){
            o_list.push(array[36]);
        }
        if(!isNaN(sj)){
            o_list.push(sj+"岁");
        }
        o_list.push('<i class="iconfont icon-shijian"></i>'+array[32].substring(0, 10));
        o_list = o_list.join("&emsp;|&emsp;");

        content += '<li>';
        content += '    <div class="match">';
        content += '        <div class="left dt" style="cursor: pointer;" onclick="viewResume('+array[0]+')">';
        content += '            <input class="knob1" type="hidden" data-width="100" data-height="100" data-skin="tron" data-displayInput="true" value="'+array[array.length - 1]+'">';
        content += '            <img src="'+file_website+array[4]+'" alt="" onerror="notfind(this, 1, \''+array[5]+'\')">';
        content += '            <p class="fc">匹配值<span>'+array[array.length - 1]+'%</span></p>';
        content += '        </div>';
        content += '        <div class="left">';
        content += '            <div class="information">';
        content += '                <p><b class="fz16 fw_n" style="cursor: pointer;" onclick="viewResume('+array[0]+')">'+array[3]+'</b>&emsp;';
        if(array[5] == '女'){
            content += '                    <i class="iconfont icon-nv"></i>女&emsp;';
        }else{
            content += '                    <i class="iconfont icon-nan"></i>男&emsp;';
        }
        if(array[1] == 1){
            content += '                    <a href="javascript:void(0);" style="color:#5c91d9" onclick=viewResume('+array[0]+')>[&nbsp;个人&nbsp;]</a>';
        }else{
            content += '                    <a href="javascript:void(0);" style="color:#5c91d9" onclick=viewResume('+array[0]+')>[&nbsp;经纪人&nbsp;]</a>';
        }
    //     if(array[47] != null  && array[47].indexOf('在职') != -1){
    //      content += '                    <span class="o_zzz" style="width: 36px;display: inline-block;text-align: center;';
    // content += 'font-size: 12px;height: 16px;line-height: 16px;">在职</span>';
    //     }else{
    //         content += '                    <span>求职中</span>';
    //     }
        content += '                </p>';
        content += '                <p><b class="fz14 fw_n">'+array[38]+'</b></p>';
        content += '                <p class="i_info nowrap">';
        content += o_list                   ;
        content += '                </p>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="right">';
        // content += '            <a class="btn" onclick="showInviteDialog('+pu_id+', '+array[2]+')">邀请</a>';
       content += '            <a class="btn" onclick="recommend(\''+array[54]+'\', \''+array[2]+'\', '+array[0]+', \''+array[3]+'\', '+array[1]+')">邀请</a>';
        content += '            <a class="btn"data-toggle="modal" data-target="#if_sc_Modal" onclick="setCollectId(\''+array[0]+'\')">收藏</a>';
        if(userValidateStatus == 3) {
            content += '            <a class="btn" onclick="doForwardResume([' + array[0] + '])">转发</a>';
            content += '            <a class="btn" data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \'' + array[3] + '\', \'' + array[2] + '\')">私信</a>';
        } else {
            content += '            <a class="btn" onclick="doAlertToAudit(' + userValidateStatus + ')">转发</a>';
            content += '            <a class="btn" onclick="doAlertToAudit(' + userValidateStatus + ')">私信</a>';
        }
        content += '        </div>';
        content += '        <div class="clearfix"></div>';
        content += '    </div>';
        content += '</li>';
        
     });
    return content
}
//推荐职位时判断是否设置了允许推荐
function recommend(isInvite, source_id, resume_id, resume_name, resume_source){
    if(isInvite == '1'){
        o_show('yq', source_id, '', resume_id, resume_name, resume_source);
    }else{
        window.alert('该简历不接受推荐职位',4);
    }
}
//加载应聘简历数据
function paginBind(dataInfo){
    $('#tableInfo').empty();
    //无数据处理  
    if(dataInfo == ""){
        $("#noSendData_ypjl").show();
        $("#paginTddzwInfo").hide();
        return;
    } else {
        $("#noSendData_ypjl").hide();
        $("#paginTddzwInfo").hide();
    }
    var userValidateStatus = $("#userValidateStatus").val();
    $(dataInfo).each(function(i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for(var n = 0; n < len; n ++){
            if(array[n] == null){
                array[n] = "&nbsp;"
            }
        }
        if($.trim(array[4]) == "")
            array[4] ="null";
        var content = '';
        content += '<li class="f_l">';
        content += '    <h2><span>面试:&nbsp;</span>'+array[37]+'';
        content += '        <span class="fz_r"><i class="iconfont"></i>'+array[38].substring(0, 10)+'</span>';
        content += '    </h2>';
        content += '    <div class="match">';
        content += '        <div class="left dt" style="cursor: pointer;" onclick="viewResume('+array[41]+',0)">';
        content += '            <input class="knob1" data-width="100" data-height="100" data-skin="tron" data-displayInput="true" value="'+array[array.length - 1]+'">';
        content += '            <img src="'+file_website+array[4]+'" alt="" onerror="notfind(this, 1, \''+array[5]+'\')">';
        content += '            <p class="fc">匹配值<span>'+array[array.length - 1]+'%</span></p>';
        content += '        </div>';
        content += '        <div class="left">';
        content += '            <div class="information">';
        content += '                <p class="" title="">';
        content += '                    <b class="name" style="cursor: pointer;" onclick="viewResume('+array[41]+',0)">'+array[3]+'</b>';
        if(array[5] == '女'){
            content += '                    <i class="iconfont icon-nv"></i><b>女</b>';
        }else{
            content += '                    <i class="iconfont icon-nan"></i><b>男</b>';
        }
        // if(array[45].indexOf('在职') != -1){
        //     content += '                    <span class="status">在职中</span>';
        // }else{
        //     content += '                    <span class="status qzz">求职中</span>';
        // }
        content += '                </p>';
        content += '                <p class="nowrap" title="">';
        content += '                    <a href="javascript:void(0);" onclick=viewResume('+array[41]+', 0)>&nbsp;'+array[21]+'&nbsp;</a>';
        content += '                </p>';
        content += '                <p class="nowrap" title="">'+array[37]+'</p>';
        content += '                <p class="i_info nowrap" title="'+array[16]+'&nbsp;|&nbsp;'+array[14]+'&nbsp;|&nbsp;'+array[15]+'&nbsp;|&nbsp;'+(new Date().getFullYear() - parseInt(array[6]))+'岁">';
        content += '                    '+array[16]+'&nbsp;|&nbsp;'+array[14]+'&nbsp;|&nbsp;'+array[15]+'&nbsp;|&nbsp;'+(new Date().getFullYear() - parseInt(array[6]))+'岁';
        content += '                </p>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="right"><input type="hidden" value="'+array[0]+'" />';
        content += '            <a class="btn" onclick="getOperateData(this), o_show(\'lxfs\', '+array[41]+')">查看</a>';
        content += '            <a class="btn" onclick="getOperateData(this), o_show(\'bhs\')">不合适</a>';
        if(userValidateStatus == 3) {
            content += '            <a class="btn" onclick="doForwardResume([' + array[41] + '])">转发</a>';
            content += '            <a class="btn" data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this,\'' + array[3] + '\', \'' + array[2] + '\')">私信</a>';
        } else {
            content += '            <a class="btn" onclick="doAlertToAudit(' + userValidateStatus + ')">转发</a>';
            content += '            <a class="btn" onclick="doAlertToAudit(' + userValidateStatus + ')">私信</a>';
        }
        content += '        </div>';
        content += '        <div class="clearfix"></div>';
        content += '    </div>';
        content += '</li>';
        content += '<script>$(".knob1").knob({thickness:.05,fgColor:"#ff8800",bgColor:"#e4e4e4",displayInput:false,readOnly:true})<\/script>';
        $('#tableInfo').append(content);
    });
}
//热门关键字搜索
function hotJobQuery(obj){
    $('.gr_glxss_k').val($(obj).text());
    queryData();
}
function setCollectId(resumeId){
    $('#operateId').val(resumeId);
    collectType = 'resumeId';
}
//获得操作的数据
function getOperateData(obj){
    $('#operateId').val($(obj).parent().children().eq(0).val());//应聘求职ID
    collectType = 'ajInfoId';
    $('#myPhone').val($('#my_phone').val());
    $('#myEmail').val($('#my_email').val());
}
//简历处理事件
function dealResume(type){
    //type 0-待处理，1-待沟通，2-面试，3-不合适，4-已入职，5-已过滤
    var content = '';
    var ajInfoId = $('#operateId').val();
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
    }
    $.ajax({
        type: "POST",
        url: "/ajax_dealResume",
        data: {"ajInfoId": ajInfoId, "type": type, "content": content},
        dataType: "json",
        success: function (data) {
            if (data.msg != 'success') {
                window.alert(data.msg,4);
            }else{
                loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
                $('#reason').val('');
                var count = $('.num_box').children('span').text();
                $('.num_box').children('span').text(parseInt(count) - 1);
                window.alert('处理完成！',1)
            }
        }
    })
}
//收藏简历
function collectResume(){
    if(collectType == 'resumeId'){
        var resumeId = $("#operateId").val();
        $.ajax({
            type: "POST",
            url: "/ajax_collectResume",
            data: {"resumeId": resumeId},
            dataType: "json",
            success: function (data) {
                if(data.msg == 'success'){
                    window.alert('收藏成功',1);
                }else if(data.msg == 'exist'){
                    window.alert('你已收藏该简历，无需收藏！',4);
                }else{
                    window.alert(data.msg,4);
                }
            }
        })
    }else{
        var ajInfoId = $('#operateId').val();
        $.ajax({
            type: "POST",
            url: "/ajax_favoriteResume",
            data: {"ajInfoId": ajInfoId},
            dataType: "json",
            success: function (data) {
                if(data.msg == 'success'){
                    window.alert('收藏成功',1);
                }else if(data.msg == 'exist'){
                    window.alert('你已收藏该简历，无需收藏！',4);
                }else{
                    window.alert(data.msg,4);
                }
            }
        })
    }
}
//进入职位搜索页面
function intoPositionManage(){
    window.open('/jobs/position/company/zwgl', '_blank');
}
//发布职位
function publishPosition(){
    window.open('/jobs/position/company/fbdzw', '_blank');
}
//简历预览
function viewResume(resumeId, type){
     if(type == undefined)  window.open('/jobs/resume/new_jlyl?resumeID=' + resumeId, '_blank');
     else                   window.location.href = '/jobs/resume/new_jlyl?type=' + type + '&resumeID='  + resumeId;
}
//跳到猎头
function href_lt(){
    window.open('/jobs/position/zlt', '_blank');
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
    var ajInfoId = $('#operateId').val();
    ajInfoIds.push(ajInfoId);
    $.ajax({
        type: "POST",
        url: "/ajax_viewResume",
        data: {"ajInfoIds": ajInfoIds, "email": email, "phone": phone},
        dataType: "json",
        success: function (data) {
            if (data.status == 0) {
                window.alert(data.msg,4);
            }else{
                loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
                var ajTapObj = $('.resume_select').children('li:eq(1)').children('span');
                if(parseInt(ajTapObj.text()) > 1){
                    ajTapObj.text(parseInt(count) - 1);
                }else{
                    ajTapObj.css('display', 'none');
                }
                window.alert('处理完成！',1)
            }
        }
    });
    $(obj).hide(300);
    $(".o_shade").hide(300);

}
//不合适处理
function improperDeal(obj){
    var content = $('#improper').val();
    dealMethod('3', content);
    $(obj).hide(300);
}
//简历处理方法
function dealMethod(type, content) {
    var ajInfoId = $('#operateId').val();
    if (ajInfoId != '') {
        $.ajax({
            type: "POST",
            url: "/ajax_dealResume",
            data: {"ajInfoId": ajInfoId, "type": type, "content": content},
            dataType: "json",
            success: function (data) {
                if (data.msg != 'success') {
                    window.alert(data.msg);
                } else {
                    $('#reason').val('');
                    loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
                    var ajTapObj = $('.resume_select').children('li:eq(1)').children('span');
                    if(parseInt(ajTapObj.text()) > 1){
                        ajTapObj.text(parseInt(count) - 1);
                    }else{
                        ajTapObj.css('display', 'none');
                    }
                    window.alert('处理完成！');
                }
            }
        })
    }
}