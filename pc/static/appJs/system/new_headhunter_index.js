/**
 * Created by xk on 2015/9/7.
 */
//用于接受5个职位匹配的简历
var matchResumes = new Array();
matchResumes.push('');
matchResumes.push('');
matchResumes.push('');
matchResumes.push('');
matchResumes.push('');
//用于接受5个简历匹配的职位
var matchPositions = new Array();
matchPositions.push('');
matchPositions.push('');
matchPositions.push('');
matchPositions.push('');
matchPositions.push('');
var loadData;
var entrustResume;
var pu_id;
var querySql;
var entrustSql;
var collectType = 'resumeId';//收藏类型，是根据简历ID还是应聘求职ID
var sendResumeId;           //投递简历ID
var sendPositionId;         //投递职位ID
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
    //根据选择条件隐藏热门搜索，只有当选择职位时才显示
    $('#selectItems li').click(function(){
        changeplach();
        var index = $('#selectItems').children('li').index($(this));
        if(index != 0){
            $('.hotsearch').css('display', 'none');
        }else{
            $('.hotsearch').css('display', '');
        }
    });

});
window.onload = function() {
    file_website = $('#file_website').val();
    pu_id = $('#pu_id').val();
    var sql = ' id IN (SELECT MAX(a.id) AS aid FROM T_AJ_Info a WHERE release_id=' + pu_id + ' GROUP BY Form_No) and resume_status=1';
    var obj = $('.leading:first').next();
    //加载第一个职位匹配的简历
    matchResume(obj, 1);
    $('.zpzw .nowrap').eq(0).addClass("active");

    //加载应聘简历
    querySql = sql + ' and dispose_status=0 and pPosition_Status=1';
    loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
    //加载委托的简历
//    entrustSql = 'pu_id=' + pu_id + ' and entrust_status=0';
//    entrustResume = new pagin("paginInfo", "V_Entrust_Resume", "", entrustSql, "", 6, "entrustBind", "entrustResume");
}
function changeplach(){
        var type = $('.search_select').children('div:first').children('span').text();
        if(type =='职位'){
            $('.search_input').attr('placeholder','请输入职位关键词: 如前端开发等');         
        }
        else if(type =='简历'){
            $('.search_input').attr('placeholder','请输入简历关键词');         
        }
        else if(type =='公司'){
            $('.search_input').attr('placeholder','请输入公司关键词');    
        }
 }
//根据简历或人才经纪人查询数据
function queryData(){
    var type = $('.search_select').children('div:first').children('span').text();
    var condition = $('.search_input').val();
    if($('#selectItems').children('li:first').text() == type){
        window.open('/position/headhunter/naagentsearch?condition=' + condition, '_blank');
    }else if($('#selectItems').children('li:eq(1)').text() == type){
        window.open('/resume/new_resume_search?condition=' + condition, '_blank');
    }else if($('#selectItems').children('li:eq(2)').text() == type){
        window.open('/position/ncompanysearch?condition=' + condition, '_blank');
    }
}
//智能匹配（简历）
function matchResume(obj, index){
    var positionId = $(obj).val();
    var matchContain = $('.ppd_zw').eq(0);
    if (matchResumes[index - 1] == ''){
        $.ajax({
            type: "POST",
            url: "/ajax_autoMatching",
            data: {"positionID": positionId, "type": 2},
            dataType: "json",
            success: function (data) {
                matchContain.empty();
                var content = addresume(data.dataInfo);
                matchResumes[index - 1] = content;console.log(content);
                matchContain.append(content);
                var lis = matchContain.children('li');
                var length = lis.length;
                if (length > 0){
                    for(var n = 0; n < length;n += 1){
                        var favoriteBtn = lis.eq(n).find('.loveBtn');
                        loadFavoriteStatus(favoriteBtn, data.dataInfo[n][0], 1);
                    }
                }
                matchContain.append('<script>$(".knob1").knob({thickness:.04,fgColor:"#ff8800",bgColor:"transparent",displayInput:false,readOnly:true})<\/script>');
            }
        });
    }else{
        matchContain.empty();
        matchContain.append(matchResumes[index - 1]);
        matchContain.append('<script>$(".knob1").knob({thickness:.04,fgColor:"#ff8800",bgColor:"transparent",displayInput:false,readOnly:true})<\/script>');
    }
}
//加载匹配的简历
function addresume(dataInfo){
    //无数据处理
    if(dataInfo== ""){
        $('#noSendData_ppdjl').css('display', 'block');
        $("#paginTddzwInfo").hide();
        return;
    } else {
        $('#noSendData_ppdjl').hide();
        $("#paginTddzwInfo").hide();
    }
    var content="";
    var userValidateStatus = $("#userValidateStatus").val();    // 认证状态
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
        if(array[array.length - 1] == '&nbsp;'){
            array[array.length - 1] = 0;
        }
        content += '<li>';
        content += '    <div class="match">';
        content += '        <div class="left dt"  style="cursor: pointer;" onclick="viewResume('+array[0]+')">';
        content += '            <input class="knob1" data-width="100" data-height="100" data-skin="tron" data-displayInput="true" value="'+array[array.length - 1]+'">';
        content += '            <img src="'+file_website+array[4]+'" alt="" onerror="notfind(this, 1, \''+array[5]+'\')" >';
        content += '            <p class="fc">匹配值<span>'+array[array.length - 1]+'%</span></p>';
        content += '        </div>';
        content += '        <div class="left">';
        content += '            <div class="information">';
        content += '                <p><b class="fz16 fw_n"  style="cursor: pointer;" onclick="viewResume('+array[0]+')">'+array[3]+'</b>&emsp;';
        if(array[5] == '女'){
            content += '                    <i class="iconfont icon-nv"></i>女&emsp;';
        } else {
            content += '                    <i class="iconfont icon-nan"></i>男&emsp;';
        }
        if(array[1] == 1){
            content += '                    [&nbsp;个人&nbsp;]';
        }else{
            content += '                    [&nbsp;经纪人&nbsp;]';
        }
       //  if(array[47].indexOf('在职') != -1){
       //      content += '                    <span class="o_zzz" style="width: 36px;display: inline-block;text-align: center;';
       //      content += 'font-size: 12px;height: 16px;line-height: 16px;">在职</span>';
       //  }
       //  if(array[47]=="暂时不想找工作")
       //  {
       //      content += '                    <span class="o_zzz" style="width: 36px;display: inline-block;text-align: center;';
       //      content += 'font-size: 12px;height: 16px;line-height: 16px;">在职</span>';
       //  }
       // else if(array[47].indexOf('已离职') != -1){
       //      content += '<span style="cursor: default;margin-left: 20px;font-size: 12px;color: #f80;border: 1px solid #f80;';
       //      content += 'padding: 3px 7px 3px 0px;border-radius: 5px;">';
       //      content += '<i class="iconfont icon-xin fz16"></i>求职中</span>';
       //  }
        content += '                </p>';
        content += '                <p><b class="fz14 fw_n">'+array[38]+'</b></p>';
        content += '                <p class="i_info nowrap" title='+      array[37]+'&emsp;|&emsp;'+array[35]+'&emsp;|&emsp;'+array[36]+'&emsp;|&emsp;'+(new Date().getFullYear() - parseInt(array[6]))+'岁&emsp;|&emsp;'+array[32].substring(0, 10)+'>';
        content +=o_list;
        content += '                    ';
        content += '                </p>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="right">';
        // content += '            <a class="btn" onclick="showInviteDialog('+pu_id+', '+array[2]+')">邀请</a>';
        content += '            <a class="btn" onclick="recommend(\''+array[54]+'\', \''+array[2]+'\', '+array[0]+', \''+array[3]+'\', '+array[1]+')">邀请</a>';
        content += '            <a class="btn loveBtn"data-toggle="modal" data-target="#if_sc_Modal" onclick="setCollectId(\''+array[0]+'\')">收藏</a>';
        if(userValidateStatus == 3) {
            content += '            <a class="btn" onclick="doForwardResume([' + array[0] + '])">转发</a>';
            var source_name = '';
            if(array[1] == 1){
                source_name = array[3];
            }else{
                source_name = array[66];
            }
            content += '            <a class="btn" data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \'' + source_name + '\', \'' + array[2] + '\', '+array[1]+', '+array[0]+', \''+array[3]+'\')">私信</a>';
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
//匹配的职位
function matchPosition(resumeId, index){
    var matchContainer = $('.ppd_zw').eq(1).children('li').eq(index - 1);
    if (matchPositions[index - 1] == ''){
        $.ajax({
            type: "POST",
            url: "/ajax_autoMatching",
            data: {"resumeID": resumeId, "type": 1},
            dataType: "json",
            success: function (data) {
                matchContainer.children(':gt(0)').remove();
                var content = addPosition(data.dataInfo, resumeId);
                //无数据处理
                if(content == ''){
                    $('#noMatchData_ppdzw').css('display', 'block');
                    $("#paginTddzwInfo").hide();
                    return;
                }else{
                    $('#noMatchData_ppdzw').css('display', 'none');
                    $("#paginTddzwInfo").show();
                }
                matchPositions[index - 1] = content;
                matchContainer.append(content);
                var divs = matchContainer.children('div');
                var length = divs.length;
                if (length > 0){
                    for(var m = 0; m < length;m += 1){
                        var favoriteBtn = divs.eq(m).find('.favoriteBtn');
                        loadFavoriteStatus(favoriteBtn, data.dataInfo[m][0], 3);
                    }
                }
                matchContainer.append('<script>$(".knob").knob({thickness:.05,fgColor:"#ff8800",bgColor:"#e4e4e4",displayInput:false,readOnly:true})</script>');
            }
        });
    }
}
//加载匹配的职位
function addPosition(dataInfo, resumeId){
    var content = '';
    var userValidateStatus = $("#userValidateStatus").val();    // 认证状态
    //无数据处理
    if(dataInfo == ''){
        $('#noMatchData_ppdzw').css('display', 'block');
        $("#paginTddzwInfo").hide();
        return;
    }else{
        $('#noMatchData_ppdzw').css('display', 'none');
        $("#paginTddzwInfo").show();
    }
    $(dataInfo).each(function() {
        var array = $(this);
        for (var i = 0; i < array.length; i++) {
            if (array[i] == null || array[i] == "") {
                array[i] == "&nbsp;";
            }
        }
        if($.trim(array[56]) == "")
            array[56] ="null";
        if(array[23] == null || array[23] == '' || array[23] == 'null'){
            array[23] = '经验不限'
        }
        if(array[26] == null || array[26] == '' || array[26] == 'null'){
            array[26] = '学历不限'
        }
        content += '<div class="match" style="display: block;">';
        content += '    <div class="left dt" onclick="viewPosition(\''+$(this)[0]+'\')"  style="cursor: pointer">';
        content += '        <input class="knob" data-width="100" data-height="100" data-skin="tron" data-displayInput="true" value="'+array[array.length - 1]+'">';
        content += '        <img src="'+file_website+array[56]+'" alt="" onerror="notfind(this, 2)">';
        content += '        <p class="fc">匹配值<span>'+array[array.length - 1]+'%</span></p>';
        content += '    </div>';
        content += '    <div class="left">';
        content += '        <div class="information">';
        content += '            <p><b class="fz16 fw_n" onclick="viewPosition(\''+$(this)[0]+'\')"  style="cursor: pointer">'+array[3]+'</b>';
        if(array[1] == 1){
            content += '                <span>企业直招</span>';
        }else{
            content += '                <span>经纪人发布</span>';
        }
        content += '            </p>';
        content += '            <p><b class="fz14 fw_n">'+array[55]+'</b></p>';
        content += '            <p class="i_info nowrap">'+array[14]+'&emsp;|&emsp;'+array[23]+'&emsp;|&emsp;'+array[26]+'&emsp;|&emsp;'+array[48].substring(0, 10)+'</p>';
        content += '        </div>';
        content += '    </div>';
        content += '    <div class="right">';
        // content += '        <a class="btn" onclick="deliverResumes('+array[0]+', '+ pu_id +')">投递</a>';
        content += '        <a class="btn" onclick="recommend_resume(' + array[0] + ')">推荐</a>';
        content += '        <a class="btn favoriteBtn" href="javascript:void(0);" onclick="collectPosition('+array[0]+', this)">收藏</a>';
        if(userValidateStatus == 3) {
            content += '        <a class="btn" onclick="new_doForwardPosition([\''+array[0]+'\'])">转发</a>';
            content += '        <a class="btn" data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this,\'' + array[72] + '\', \'' + array[2] + '\', 3, '+array[0]+', \''+array[3]+'\')">私信</a>';
        } else {
            content += '        <a class="btn" onclick="doAlertToAudit(' + userValidateStatus + ')">转发</a>';
            content += '        <a class="btn" onclick="doAlertToAudit(' + userValidateStatus + ')">私信</a>';
        }

        content += '    </div>';
        content += '    <div class="clearfix"></div>';
        content += '</div>';
    });
    return content;
}
//加载应聘简历数据
function paginBind(dataInfo){
    //无数据处理
    if(dataInfo ==''){
        $('#noSendData_ypjl').css('display', 'block');
        $("#paginTddzwInfo").hide();
        $("#tableInfo").hide();
        return;
    }else{
        $('#noSendData_ypjl').css('display', 'none');
        $("#paginTddzwInfo").show();
    }
    if(dataInfo != undefined && dataInfo.length>0)
    {
         $('#tableInfo').empty();
    }
    var userValidateStatus = $("#userValidateStatus").val();    // 认证状态
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
        var i_info = [];
        array[16] != '&nbsp;' && i_info.push(array[16]);
        array[14] != '&nbsp;' && i_info.push(array[14]);
        array[15] != '&nbsp;' && i_info.push(array[15]);
        array[6]  != '&nbsp;' && i_info.push(new Date().getFullYear() - parseInt(array[6])+'岁');
        i_info = i_info.join("&nbsp;|&nbsp;");
        var content = '';
        content += '<li class="f_l">';
        content += '    <h2><span>面试:&nbsp;</span>'+array[37]+'';
        content += '        <span class="fz_r"><i class="iconfont"></i>'+array[38].substring(0, 10)+'</span>';
        content += '    </h2>';
        content += '    <div class="match">';
        content += '        <div class="left dt"  style="cursor: pointer;" onclick="viewResume('+array[41]+',0)">';
        content += '            <input class="knob1" data-width="100" data-height="100" data-skin="tron" data-displayInput="true" value="'+array[array.length - 1]+'">';
        content += '            <img src="'+file_website+array[4]+'" alt="" onerror="notfind(this, 1, \''+array[5]+'\')">';
        content += '            <p class="fc">匹配值<span>'+array[array.length - 1]+'%</span></p>';
        content += '        </div>';
        content += '        <div class="left">';
        content += '            <div class="information">';
        content += '                <p class="nowrap" style="height:26px;" title="">';
        content += '                    <b class="name"  style="cursor: pointer;" onclick="viewResume('+array[41]+',0)">'+array[3]+'</b>';
        if(array[5] == '女'){
            content += '                    <i class="iconfont icon-nv"></i><b>女</b>';
        }else{
            content += '                    <i class="iconfont icon-nan"></i><b>男</b>';
        }
        // if(array[45].indexOf('在职') != -1){
        //     content += '                    <span class="status">在职中</span>';
        // }else{
        //     content += '<span style="cursor: default;margin-left: 20px;font-size: 12px;color: #f80;border: 1px solid #f80;';
        //     content += 'padding: 3px 7px 3px 0px;border-radius: 5px;">';
        //     content += '<i class="iconfont icon-xin fz16"></i>求职中</span>';
        // }
        content += '                </p>';
        content += '                <p class="nowrap" title="">';
        content += '                    [&nbsp;个人简历&nbsp;]';
        content += '                </p>';
        content += '                <p class="nowrap" title="'+array[37]+'">'+array[37]+'</p>';
        content += '                <p class="i_info nowrap" title='+i_info+'>';
        content +=                      i_info;
        content += '                </p>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="right"><input type="hidden" value="'+array[0]+'" />';
        content += '            <a class="btn" onclick="o_show(\'lxfs\', '+array[41]+'), getOperateData(this)">查看</a>';
        content += '            <a class="btn" onclick="getOperateData(this),o_show(\'bhs\', '+array[41]+')">不合适</a>';
        if(userValidateStatus == 3) {
            content += '            <a class="btn" onclick="doForwardResume([' + array[41] + '])">转发</a>';
            content += '            <a class="btn" data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \'' + array[3] + '\', \'' + array[2] + '\', '+array[1]+', '+array[41]+', \''+array[3]+'\')">私信</a>';
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
//加载委托的简历
function entrustBind(dataInfo){
    $('#entrustInfo').empty();
    $(dataInfo).each(function(i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for (var n = 0; n < len; n++) {
            if (array[n] == null) {
                array[n] = "&nbsp;"
            }
        }
        if($.trim(array[4]) == "")
            array[4] ="null";
        //图片列表数据加载
        var o_info = new Array();
        var o_str ="";
        if(array[16]=="&nbsp;" || $.trim(array[16]=="")){
            o_info.push(array[16]);
        }
        if(array[14]=="&nbsp;" || $.trim(array[14]=="")){
            o_info.push(array[14]);
        }
        if(array[15]=="&nbsp;" || $.trim(array[15]=="")){
            o_info.push(array[15]);
        }
        if(!isNaN(parseInt(new Date().getFullYear()) - array[6])){
            o_info.push((parseInt(new Date().getFullYear()) - array[6])+"岁");
        }
        o_str = o_info[0];
        for (var i = 1; i < o_info.length; i++) {
            o_str += "&nbsp|&nbsp;"+o_info[i];
        }
        var content = '';
        content += '<li class="f_l">';
        content += '    <h2>[&nbsp;个人简历&nbsp;]<span class="fz_r"><i class="iconfont"></i>'+array[32].substring(0, 16)+'&nbsp;更新</span></h2>';
        content += '    <div class="match">';
        content += '        <div class="left dt" style="cursor: pointer;" onclick="viewResume('+array[0]+',\'weiTuo\')">';
        content += '            <img src="'+file_website+array[4]+'" alt="" onerror="notfind(this, 1, \''+array[5]+'\')">';
        content += '        </div>';
        content += '        <div class="left">';
        content += '            <div class="information">';
        content += '                <p class="nowrap" style="height:26px" title="">';
        content += '                    <b class="name"  style="cursor: pointer;" onclick="viewResume('+array[0]+',\'weiTuo\')">'+array[3]+'</b>';
        if(array[5] == '男'){
            content += '                    <i class="iconfont icon-nan"></i><b>男</b>';
        }else{
            content += '                    <i class="iconfont icon-nv"></i><b>女</b>';
        }
        content += '                    <span class="status">在职中</span>';
        content += '                </p>';
        content += '                <p class="nowrap" title="">'+array[18]+'</p>';
        content += '                <p class="nowrap" title="">'+array[19]+'</p>';
        content += '                <p class="i_info nowrap">'+o_str+'</p>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="right"><input type="hidden" value="'+array[0]+'" /><input type="hidden" value="'+array[2]+'" />';
        content += '            <input type="checkbox" value="'+array[0]+'" >';
        content += '            <a class="btn" onclick="acceptResume('+array[0]+')">接受</a>';
        content += '            <a class="btn" data-toggle="modal" data-target="#if_jj_Modal" onclick="getOperateData(this)">拒绝</a>';
        content += '            <a class="btn" onclick="doForwardResume([' + array[0] + '])">转发</a>';
        content += '            <a class="btn" data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \'' + array[3] + '\', \'' + array[2] + '\', '+array[1]+', '+array[0]+', \''+array[3]+'\')">私信</a>';
        content += '        </div>';
        content += '        <div class="clearfix"></div>';
        content += '    </div>';
        content += '</li>';
        $('#entrustInfo').append(content);
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
//热门关键字搜索
function hotJobQuery(obj){
    $('.gr_glxss_k').val($(obj).text());
    queryData();
}
//设置收藏的简历ID
function setCollectId(resumeId){
    $('#operateId').val(resumeId);
    collectType = 'resumeId';
}
//设置私信接受人pu_id和姓名
function setIdAndName(source_id, source_name){
    $("#forpuid").val(source_id);
    $('.message_Modal_box').children().remove();
    $('.message_Modal_box').append('<span id="lettername"></span>');
    $("#lettername").empty();
    $("#lettername").append(source_name);
    $('#operateState').val('simple');
}
//获得操作的数据
function getOperateData(obj){
    $('#operateId').val($(obj).parent().children().eq(0).val());//操作ID
    $('#operateState').val('simple');
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
//收藏职位
function collectPosition(positionId, obj){
    $.ajax({
        type: "POST",
        url: "/ajax_collectPosition",
        data: {"positionId": positionId},
        dataType: "json",
        success: function (data) {
            if(data.msg == 'success'){
                window.alert('收藏成功',1);
                $(obj).text('已收藏');
                $(obj).attr('onclick', 'alert("你已收藏该职位，无需收藏！", 4);');
            }else if(data.msg == 'exist'){
                window.alert('你已收藏该职位，无需收藏！',4);
            }else{
                window.alert(data.msg,4);
            }
        }
    })
}
//接受简历
function acceptResume(resumeId){
    $.ajax({
        type: "POST",
        url: "/ajax_acceptResume",
        data: {"resumeId": resumeId},
        dataType: "json",
        success: function (data) {
            if (data.msg == 'success') {
                window.alert('简历已接受！',4);
                entrustResume = new pagin("paginInfo", "V_Entrust_Resume", "", entrustSql, "", 6, "entrustBind", "entrustResume");
                var entrustObj = $('.resume_select').children('li').eq(3).children('span');
                var count = entrustObj.text();
                entrustObj.text(parseInt(count) - 1);
                if(parseInt(count) - 1 == 0){
                    entrustObj.css('display', 'none');
                }
            } else {
                window.alert(data.msg,4);
            }
        }
    });
}
//拒绝简历
function rejectResume(){
    var content = $('#reject').val();
    if(content == ''){
        window.alert('拒绝理由不能为空，请输入拒绝理由！',4);
        $('#sureReject').attr('data-dismiss', '');
        return ;
    }
    //拒绝单个简历
    if($('#operateState').val() == 'simple'){
        var resumeId = $('#operateId').val();
        $('#sureReject').attr('data-dismiss', 'modal');
        $.ajax({
            type: "POST",
            url: "/ajax_rejectResume",
            data: {"resumeId": resumeId, "content": content},
            dataType: "json",
            success: function (data) {
                if (data.msg == 'success') {
                    window.alert('简历已拒绝！',4);
                    $('#reject').val('');
                    entrustResume = new pagin("paginInfo", "V_Entrust_Resume", "", entrustSql, "", 6, "entrustBind", "entrustResume");
                    var entrustObj = $('.resume_select').children('li').eq(3).children('span');
                    var count = entrustObj.text();
                    entrustObj.text(parseInt(count) - 1);
                    if(parseInt(count) - 1 == 0){
                        entrustObj.css('display', 'none');
                    }
                } else {
                    window.alert(data.msg,4);
                }
            }
        });
    }else{
        //拒绝选中的简历
        var checkboxes = $("#entrustInfo input[type='checkbox']:checked");
        if(checkboxes.length == 0){
            window.alert("请选择要要拒绝的简历！",4);
            return;
        }
        $('#sureReject').attr('data-dismiss', 'modal');
        var resumeIds = [];
        for(var i = 0;i < checkboxes.length;i++){
            resumeIds.push(checkboxes.eq(i).val());
        }
        $.ajax({
            type: "POST",
            url: "/ajax_rejectResume",
            data: {"resumeIds": resumeIds, "content": content},
            dataType: "json",
            success: function (data) {
                if (data.msg == 'success') {
                    window.alert('简历已拒绝！',4);
                    $('#reject').val('');
                    entrustResume = new pagin("paginInfo", "V_Entrust_Resume", "", entrustSql, "", 6, "entrustBind", "entrustResume");
                    var entrustObj = $('.resume_select').children('li').eq(3).children('span');
                    var count = entrustObj.text();
                    entrustObj.text(parseInt(count) - checkboxes.length);
                    if(parseInt(count) - checkboxes.length == 0){
                        entrustObj.css('display', 'none');
                    }
                } else {
                    window.alert(data.msg,4);
                }
            }
        });
    }
}
//批量接受简历
function acceptSelectResume(){
    var checkboxes = $("#entrustInfo input[type='checkbox']:checked");
    if(checkboxes.length == 0){
        window.alert("请选择要要接受的简历！",4);
        return;
    }
    var resumeIds = [];
    for(var i = 0;i < checkboxes.length;i++){
        resumeIds.push(checkboxes.eq(i).val());
    }
    $.ajax({
        type: "POST",
        url: "/ajax_acceptResume",
        data: {"resumeIds": resumeIds},
        dataType: "json",
        success: function (data) {
            if (data.msg == 'success') {
                window.alert('简历已接受！',1);
                entrustResume = new pagin("paginInfo", "V_Entrust_Resume", "", entrustSql, "", 6, "entrustBind", "entrustResume");
                var entrustObj = $('.resume_select').children('li').eq(3).children('span');
                var count = entrustObj.text();
                entrustObj.text(parseInt(count) - checkboxes.length);
                if(parseInt(count) - checkboxes.length == 0){
                    entrustObj.css('display', 'none');
                }
            } else {
                window.alert(data.msg,4);
            }
        }
    });
}
//进入职位搜索页面
function intoPositionManage(){
    window.open('/position/company/zwgl', '_blank');
}
//发布职位
function publishPosition(){
    window.open('/position/company/fbdzw', '_blank');
}
//简历预览
function viewResume(resumeId, type){
    if(type == undefined)  window.open('/jobs/resume/new_jlyl?resumeID=' + resumeId, '_blank');
    else    window.location.href = '/jobs/resume/new_jlyl?type=' + type + '&resumeID='  + resumeId;
}
//查看简历
function browseResume(resumeId){
    if(resumeId){
        window.open('/jobs/resume/yrjl?resumeID=' + resumeId, '_blank');
    }else{
        var checkboxes = $("#entrustInfo input[type='checkbox']:checked");
        if(checkboxes.length == 0){
            window.alert("请选择要要查看的简历！",4);
            return;
        }
        for(var i = 0;i < checkboxes.length;i++){
            window.open('/jobs/resume/yrjl?resumeID=' + checkboxes.eq(i).val(), '_blank');
        }
    }
}

//查看职位
function viewPosition(positionId){
    window.open('/jobs/resume/zwxq?positionId=' + positionId, '_blank');
}
// 推荐简历页面
function recommend_resume(position_id) {
    if($('#my_phone').val() == ''){
        alert('您还未绑定手机，请先绑定手机', 2);
        return false;
    }
    if($('#my_email').val() == ''){
        alert('您还未绑定邮箱，请先绑定邮箱', 2);
        return false;
    }
    if(!isIdentityHeadhunt('3,5', '2')){
        return false;
    }
    window.open('/position/recommend?position_id=' + position_id, '_blank');
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
                window.alert(data.msg);
            }else{
                loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
                var ajTapObj = $('.resume_select').children('li:eq(2)').children('span');
                if(parseInt(ajTapObj.text()) > 1){
                    ajTapObj.text(parseInt(count) - 1);
                    $('#noSendData_ypjl').css('display', 'none');
                    $("#paginTddzwInfo").show();
                }else{
                    ajTapObj.css('display', 'none');
                    $('#noSendData_ypjl').css('display', 'block');
                    $("#paginTddzwInfo").hide();
                }
                window.alert('处理完成！',1)
            }
        }
    });
    o_hide(obj);
    
}
//不合适处理
function improperDeal(obj){
    var content = $('#improper').val();
    dealMethod('3', content);
    o_hide(obj);
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
                    window.alert(data.msg,4);
                } else {
                    $('#reason').val('');
                    loadData = new pagin("paginInfo", "V_AJ_Resume_Deal", "", querySql, "", 6, "paginBind", "loadData", 4);
                    var ajTapObj = $('.resume_select').children('li:eq(2)').children('span');
                    if(parseInt(ajTapObj.text()) > 1){
                        ajTapObj.text(parseInt(count) - 1);
                    }else{
                        ajTapObj.css('display', 'none');
                    }
                    window.alert('处理完成！',1);
                }
            }
        })
    }
}

//我的钱包
function myWallet(){
    var tempwindow=window.open();
    $.ajax({
        type: "POST",
        url: "/ajax_intoMyWallet",
        dataType: "json",
        success: function (data) {
            if(data.status == '2'){
                 tempwindow.location='/account/transfer?type=phone';
            }else if(data.status == '3'){
                 tempwindow.location='/account/transfer?type=email';
            }else if(data.status == '1'){
                var  code = data.result;
               tempwindow.location=cash_website + '/api/login_api?code=' + encodeURIComponent(code);
            }
        }
    })
}