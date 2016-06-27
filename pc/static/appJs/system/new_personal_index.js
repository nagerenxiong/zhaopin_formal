/**
* Created by zhoujia on 2015/9/14.
*/
var loadData;
var positionId = $("#positionId").val();
var resumeId = $("#resumeId").val();
var puId = $("#puId").val();
var allData;//接收页面匹配数据
var matchJob;
var file_website = '';
var querySql = ' ID IN (SELECT MAX(a.ID) FROM V_AJ_Resume_Deal a WHERE a.pPosition_Status=1 and a.source_ID = '+ puId +' GROUP BY Form_No)';
//    $(function()
window.onload = function() {
    file_website = $('#file_website').val();
    if (resumeId != '') {
        loadData = new pagin("paginTddzwInfo", "V_AJ_Resume_Deal", "", encodeURI(querySql), "dispose_time desc", 6, "deliveryResume", "loadData", 3, resumeId);
    } else {
        $('#noSendData').css('display', 'block');
    }

    if (positionId && positionId != '') {
        var matchSql = "  position_status = 1 and rewards_money=0 and find_in_set(postaion_type,'" +positionId +"') or find_in_set(postaion_type,'"+currently_postaion +"')";

        matchJob = new pagin("matchPage", "V_Position_Search", "", encodeURI(matchSql), "", 6, "matchData", "matchJob", 2, resumeId)
    } else {
        $('#noMatchData').css('display', 'block');
    }
    $(".knob1").knob({
        thickness: .05,
        fgColor: '#ff8800',
        bgColor: '#e4e4e4',
        displayInput: false,
        readOnly: true
    });
    //当投递的职位小于7也就是只有一页时，隐藏分页
    // if($("#tddjl_sz").text()< 7){
    //     $("#paginTddzwInfo").hide();
    // }
}
//    })
//投递的简历
function deliveryResume(dataInfo){
    $("#tddzwInfo").empty();
//无数据处理
    if(dataInfo.length == 0 || dataInfo == ''){
        $('#noSendData_tddzw').css('display', 'block');
        $('#noMatchData_tddzw').css('display', 'block');
        $(".page_number").hide();
        return;
    }else{
        $('#noSendData_tddzw').css('display', 'none');
        $('#noMatchData_tddzw').css('display', 'none');
        $(".page_number").show();
    }
    $(dataInfo).each(function(i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for(var n = 0; n < len; n ++){
            if(array[n] == null){
                array[n] = "&nbsp;"
            }
        }   
        var content = '';
        if(i==0){
            content += '<li class="active">';
        }
        else{
            content += '<li>';
        }
        content += '    <div class="tddzw_header">';
        content += '        <div class="left" style="cursor: pointer; margin-left:10px;" onclick="viewPosition('+array[43]+')">';
        content += '            <h2>';
        content += array[37];
        content += '                <span class="number_v" style="margin:0px 6px 0px 6px">'+ array[70] + '</span>';
        content += '                <span>匹配值</span>';
        content += '                <span class="number_v">'+ array[array.length - 1] +'%</span>';
        content += '            </h2>';
        content += '            <p>'+ array[73] +'<span style="font-size:14px!important;">[&nbsp;'+array[69]+'&nbsp;]</span></p>';
//           content += '            <p><span>使用简历:</span>在线简历</p>';
        content += '        </div>';
        content += '        <div class="right" style="margin-right:10px;">';
        if(array[39] == 2 || array[39] == 3 || array[39] == 4){
            //获得是否面试评论状态
            $.ajax({
                type: 'POST',
                async: false,
                url: "/ajax_getInterviewState",
                data: {"positionId": array[43]},
                dataType: "json",
                success: function(data){
                    if(data.status == '1'){
                        content += '<p style="color:#5c91d9" onclick="viewPosition('+array[43]+', \'evaluation\')">查看面试评价</p>';
                    }else if(data.status == '2'){
                        content += '            <p style="color:#5c91d9" id="'+array[43]+'" onclick="o_show(\'mspj\', '+array[43]+')">';
                        content += '                <img style="margin: -3px 5px 0 0;" src="'+$("#static_url").val()+'images/qp.png">评价面试体验</p>';
                    }
                }
            });
        }
        content += '            <span><i><img src="/static/images/sj1.png" alt="" style="margin-right: 5px;margin-bottom: 2.5px;"></i>'+ array[40].substring(0, 16) +'</span>';
        var status = "";

        switch(array[39]){
            case 0:
                status = "待处理";
                break;
            case 1:
                status = "待沟通";
                break;
            case 2:
                status = "面试";
                break;
            case 3:
                status = "不合适";
                break;
            case 4:
                status = "已入职";
                break;
            case 5:
                status = "待处理";
                break;
            default :
                break;
        }

        content += '            <p class="state">' +status + '<i class="iconfont icon-xiajiantou" style="color:#999!important;margin-left:5px"></i></p>';
        content += '        </div>';
        content += '    </div>';

        //投递处理时间轴
        content += '<div class="tddzw_state">';
        content += '<ul class="o_progress">';
        content += '	<b></b>';
        content += '	<b class="c_5c"></b>';
        // content += '	<li>';
        // content += '		<p>1</p>';
        // content += '		<span>已投递</span>';
        // content += '	</li>';
        content += '	<li>';
        content += '		<p>1</p>';
        content += '		<span>待处理</span>';
        content += '	</li>';
        content += '	<li>';
        content += '		<p>2</p>';
        content += '		<span>待沟通</span>';
        content += '	</li>';
        content += '	<li>';
        content += '		<p>3</p>';
        content += '		<span>面试</span>';
        content += '	</li>';
        content += '	<li style="display:none;">';
        content += '		<p>4</p>';
        content += '		<span>不合适</span>';
        content += '	</li>';
        content += '	<li class="q_mr">';
        content += '		<p>4</p>';
        content += '		<span>已入职</span>';
        content += '	</li>';
        content += '</ul>';
        content += '<div class="particulars">';
        // content += '<img class="right" src="" alt="">';
        content += '	<ul class="left">';
        // content += '		<li><img src="" alt=""></li>';
        var form_no = array[46]; //简历投递编号
        $.ajax({
            async:false,
            type: "POST",
            url: "/ajax_getAj",
            data: {"form_no": form_no},
            dataType: "json",
            success: function (dataInfo) {
                $(dataInfo).each(function(){
                        var showContent = ""; //显示内容
                        switch(this.dispose_status){
                            case 0:
                                showContent = '<p>您的简历投递成功，等待处理中。</p>';
                                break;
                            case 1:
                                showContent = '<p>你的简历已经通过筛选,三个工作日内将与您进行沟通。</p>';
                                break;
                            case 2:
                                showContent = this.remark;
                                break;
                            case 3:
                                showContent = this.remark;
                                break;
                            case 4:
                                showContent = "入职成功。";
                                break;
                            case 5:
                                showContent = "您的简历投递成功，等待处理中！";
                                break;
                        }


                        content += '<li>';
                        content += '	<span>';
                        content += '		<i>';
                        content += '			<img src="'+$("#static_url").val()+'images/sj1.png" alt="">';
                        content += '		</i>' + this.dispose_time;
                        content += '	</span>';
                        content += '	<div>';
                        content +=  showContent;
                        content += '	</div>';
                        content += '</li>';
                })
            }
        })
        content += '    </ul>';
        content += '</div>';
        content += '</div>';
        content += '</li>';

        $('#tddzwInfo').removeClass('load').append(content);
        $("#tddzwInfo>li .particulars .left").each(function(index, el) {
            $(this).children('li').eq(0).find('i>img').attr('src', ''+$("#static_url").val()+'images/sj.png');
        });
    })

}
//投递职位分类获取数据
function get_tddzw(type){
    querySql = ' ID IN (SELECT MAX(a.ID) FROM V_AJ_Resume_Deal a WHERE a.pPosition_Status=1 and a.source_ID = '+ puId +' GROUP BY Form_No)';
    if(type == "all"){
        loadData = new pagin("paginTddzwInfo", "V_AJ_Resume_Deal", "", encodeURI(querySql), "dispose_time desc", 6, "deliveryResume", "loadData",3, resumeId);
    }
    else{
        if(type == "0"){
            querySql = querySql + " and (Dispose_Status = " + type + " or Dispose_Status = 5)";
        }
        else {
            querySql = querySql + " and Dispose_Status = " + type;
        }
        loadData = new pagin("paginTddzwInfo", "V_AJ_Resume_Deal", "", encodeURI(querySql), "dispose_time desc", 6, "deliveryResume", "loadData",3, resumeId);
    }
// 无数据处理
    if($("#tddzwInfo li").length<1){
        $('#noSendData_tddzw').css('display', 'block');
        $('#noMatchData_tddzw').css('display', 'block');
        $(".page_number").hide();
        return;
    }else{
        $('#noSendData_tddzw').css('display', 'none');
        $('#noMatchData_tddzw').css('display', 'none');
        $(".page_number").show();
    }
}
//智能匹配
function matchData(dataInfo){
    allData = dataInfo;
    $("#ppzwInfo").empty();
    if(!dataInfo || dataInfo.length == 0){
    // if(true)
        $("#znpp_sz").hide();
        $('#noMatchData').css('display', 'block');
        return;
    }else{
        $("#znpp_sz").text(dataInfo.length);
        $("#znpp_sz").show();
        $('#noMatchData').css('display', 'none');
    }
    $(dataInfo).each(function(i) {

        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for(var n = 0; n < len; n ++){
            if(array[n] == null){
                array[n] = "&nbsp;"
            }
        }
        if($.trim(array[56]) ==""){
            array[56] ="null";
        }
        var content = '';
        content += '<li>';
        content += '<div onclick="viewPosition('+array[0]+')">';
        content += '    <input class="knob1" data-width="152" data-height="152" data-skin="tron" data-displayInput="true" value="'+ array[array.length - 1] +'">';
        content += '	<img src="'+file_website+ array[56] +'" alt="" onerror="notfind(this, 2)">';
        content += '	<h3>匹配值<span>'+array[array.length - 1]+'%</span></h3>';
        content += '	<h2 class="nowrap" title="'+ array[3] +'">'+ array[3] +'</h2>';
        content += '	<p class="company">'+ array[55] +'</p>';
        var recruitType = '';
        if(array[1] == 1){
            recruitType = '[&nbsp;企业直招&nbsp;]';
        }else{
            // recruitType = '经纪人发布';
        }
        content += '	<p class="znpp_info"><b style="color:#5c91d9; font-weight:nowrap;">'+recruitType+'</b>&emsp;年薪:&nbsp;<span>'+ array[19] +'</span></p>';
        content += '	<p class="nowrap" title="'+array[14]+'&nbsp;|&nbsp; '+
                (array[23] == null || array[23] =="" ? "工作经验不限":array[23])+ '&nbsp;|&nbsp; '+
                (array[26] == null || array[26] ==""? "学历不限":array[26])+ '&nbsp;|&nbsp;' +
                array[48].substring(0, 10) + '发布">'+array[14]+'&nbsp;|&nbsp; '+
                (array[23] == null || array[23] ==""? "工作经验不限":array[23])+ '&nbsp;|&nbsp; '+
                (array[26] == null || array[26] ==""?"学历不限":array[26])+ '&nbsp;|&nbsp;' +
                array[48].substring(0, 10) + "发布";

        content += '</div>';
        content += '	<h1 class="welfare">';

        //福利
        var labels = array[67];
        var labelStr = '';
        if(labels && labels != ''){
            var labellist = labels.split('**', 4);
            // for(var l = 0;l < labellist.length;l++){
            for(var l = 0;l < 3;l++){
                if($.trim(labellist[l]) != '&nbsp;' && $.trim(labellist[l]) != '')
                    labelStr += '<span>'+labellist[l]+'</span>';
            }
        }
        // content += '	<h1 class="welfare">';

        content +=          labelStr;
        content += '	</h1>';
        content += '	<h1 class="znpp_handle" style="display: none;">';
        content += '        <input type="hidden" value="'+array[2]+'" /><input type="hidden" value="'+array[72]+'" />';
        content += '        <input type="hidden" value="'+array[0]+'" />';
//        content += '		<span onclick="getOperateData(this, '+i+')" name="' + array[0] + '">投递简历</span>';
        content += '		<span onclick="tdjl_confirm('+resumeId+', '+array[0]+', '+array[2]+')" name="' + array[0] + '" id="sendBtn">投递简历</span>';
        content += '		<span onclick="collectPosition(this)" id="favoriteBtn">收藏</span>';
        // content += '		<span onclick="getOperateDatass(this, '+i+')">私信</span>';
        content += '	</h1>';
        content += '</li>';
        $("#ppzwInfo").removeClass('load');
        $('#ppzwInfo').append(content);
        var sendBtn = $('#ppzwInfo').children('li:last').find('#sendBtn');
        loadSendStatus(sendBtn, resumeId, array[0], array[2]);
        var favoriteBtn = $('#ppzwInfo').children('li:last').find('#favoriteBtn');
        loadFavoriteStatus(favoriteBtn, array[0], 3);
    })

    $('#ppzwInfo').append('<div class="clearfix"></div>');
    $('#ppzwInfo').append('<script>$(".knob1").knob({thickness:.03,fgColor:"#ff8800",bgColor:"#FFF",displayInput:false,readOnly:true})<\/script>');
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
//处理信息模板
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

//职位收藏
function collectPosition(obj){
    var positionId = $(obj).parent().children('input').eq(2).val();
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
                window.alert('你已收藏该职位，无需收藏！');
            }else{
                window.alert(data.msg);
            }
        }
    })
}
//搜索数据（页面跳转）
function queryData(){
    var type = $('.search_select').children('div:first').children('span:first').text();
    var condition = $('.search_input').val();
    if(type == '职位'){
        window.open('/jobs/position/npositionsearch?condition=' + condition, '_blank');
    }else if(type == '公司'){
        window.open('/jobs/position/ncompanysearch?condition=' + condition, '_blank');
    }else{
        window.open('/system/new_agent_search?condition=' + condition, '_blank');
    }
}
//查看职位
function viewPosition(positionId, type){
    var condition = '';
    if(type){
        condition += '&evaluation=1';
    }
    window.open('/jobs/resume/zwxq?positionId=' + positionId + condition, '_blank');
}
//选择公司、人才经纪人时隐藏热门搜索
$('.search_select').children('ul').children('li').click(function(){
    var index = $('.search_select').children('ul').children('li').index($(this));
    if(index == 0){
        $('.hotsearch').css('display', '');
    }else{
        $('.hotsearch').css('display', 'none');
    }
});
$(function(){
    $('.search_select ul li').click(function(event) {
        switch( $(this).text() ){
            case '职位': $('.search_input').attr('placeholder', '请输入职位关键词: 如前端开发等');
                        break;
            case '公司':$('.search_input').attr('placeholder', '请输入公司关键词');
                        break;
            case '人才经纪人':$('.search_input').attr('placeholder', '请输入经纪人关键词');
                        break;
        }
    });
})