var idhide =false;
var o_async = true;
//地区保存后执行
o_area_save = queryData;
o_position_save = queryData;
o_businessul_save = queryData;
$(document).scroll(function () {
    if ($(document).scrollTop() > $('.search_con').height()) {
        if(idhide == false)
        $('.suspend_sea').css('display', 'block');
    }else {
        idhide = false;
        $('.suspend_sea').css('display', 'none');
        $('.super_nat').css('display', 'none');
    }
});
//列表页事件添加
function loadListDataEvent(){
    $('.info_list ul li').mouseover(function(event) {
        $('.info_list ul li').css('border-bottom', '1px dashed #e0e0e0');
        $(this).css('border-bottom', 'none');
        // $('.info_list ul li').children('.pri_lett').css('display', 'none');
        // $(this).children('.pri_lett').css('display', 'block');
    });
    $('.info_list ul li').mouseleave(function(event) {
        // $('.info_list ul li').children('.pri_lett').css('display', 'none');
        $('.info_list ul li').css('border-bottom', '1px dashed #e0e0e0');
    });

    $('.broker_cate ul li').click(function(event) {
        $('.broker_cate ul li').removeClass('active');
        $('.broker_cate1 ul li').removeClass('active');
        $('.broker_cate ul li').eq( $(this).index() ).addClass('active');
        $('.broker_cate1 ul li').eq( $(this).index() ).addClass('active');
    });
    $('.broker_cate1 ul li').click(function(event) {
        $('.broker_cate ul li').removeClass('active');
        $('.broker_cate1 ul li').removeClass('active');
        $('.broker_cate ul li').eq( $(this).index() ).addClass('active');
        $('.broker_cate1 ul li').eq( $(this).index() ).addClass('active');
    });
    $('.suspend_sea').mouseover(function(event){
        $('.suspend_sea').css('display', 'block');
    });

    $('.suspend_sea').mouseleave(function(event) {
         idhide = true;
         $('.suspend_sea').css('display', 'none');
         $('.super_nat').css('display', 'block');
    });
    $('.super_nat').mouseover(function(event){
         $('.super_nat').css('display', 'none');
         $('.suspend_sea').css('display', 'block');
    });
};

var gjzcon="";
$(function(){
     $('.commsea').blur(function(event) {
        gjzcon=$(this).val();
        $('.commsea').val(gjzcon);
    });
     $('.xl_comm').mouseleave(function(event) {
         $(this).slideUp(150);
     });
//学历下拉
    $(".claim_p").click(function (event) {
        if ($(this).next().css('display') == "none") {
            $(this).next().css({
                // borderColor: '#5C91D9',
                // borderTopColor: '#e0e0e0'
            }).slideDown(150);
           }
        else {
            $(this).next().slideUp(150);
            }
    });

    $(".xl_comm li").click(function (event) {
        $(".claim_p").css('color', '#333');
        $('.claim_p').attr('data-value', $(this).val());
        $(this).parent().slideUp(150);
        $('.claim_p').text($(this).text()).append('<img src="/static/images/new_images/xjt.png" alt="" class="claim_img">');
        queryData();
    });
});

var loadData;
var pu_id;
var sql;
var querySql;
var condition;
var pageSize = 10;
var order_type = '';
var orderSql = ' order by Entrust_Count desc, Account_Level desc, Evaluation_Count desc';
var file_website = '';
window.onload = function(){
    file_website = $('#file_website').val();
    $("#tableInfo").addClass('loading');
    pu_id = $('#pu_id').val();
    sql = ' pu_id != -1 and audit_result = 3';
    condition = $('#initData').val();
    querySql = sql;
    if(condition != ''){
        var keywords = condition.split(' ');
        for(var index = 0;index < keywords.length;index++){
            if(keywords[index] == ''){
                continue;
            }
            var locationSql = ' (select T_SYS_Dictionary.dictionary_name from T_SYS_Dictionary where T_SYS_Dictionary.dictionary_value = location)';
            var provinceSql = ' (select T_SYS_Dictionary.p_value from T_SYS_Dictionary where T_SYS_Dictionary.dictionary_value = location)';
            querySql += ' and (real_name like "%' + keywords[index] + '%"';
            querySql += ' or ' + locationSql + ' like "%' + keywords[index] + '%"';
            querySql += ' or ' + provinceSql + ' in (select T_SYS_Dictionary.dictionary_value from T_SYS_Dictionary where T_SYS_Dictionary.dictionary_name like "%' + keywords[index] + '%")';
            //行业搜索
            $.ajax({
                async: false,
                type: "POST",
                url: "/ajax_get_industry_for_name",
                data: {"key_name": keywords[index]},
                dataType: "json",
                success: function (data) {
                    $(data["msg"]).each(function(){
                       querySql += ' or find_in_set("' + this[0] + '", business)'
                    });
                }
            });
            querySql += ')';
        }
    }

    loadData = new pagin("paginInfo", "V_PU_HeadHunt", "", encodeURI(querySql + orderSql), "", 10, "paginBind", "loadData");
    BusinessulControls("businessulDiv1", '', '', 'width:383px;float:left;margin-top:5px;height:auto;font-size:14px;',true,'o_bounced');
    PositionControls("positionDiv", '', '', 'width:383px;float:left;margin-top:5px;height:auto;font-size:14px;', true,'o_bounced');
};
//重新排序数据
function changeOrderType(type){
    $("#tableInfo").empty().addClass('loading');
    $(".page_number").hide();
    order_type = type;
    if(type == 'deal_time'){
        orderSql = ' order by ' + order_type;
    }else{
        orderSql = ' order by ' + order_type + ' desc';
    }
    loadData = new pagin("paginInfo", "V_PU_HeadHunt", "", encodeURI(querySql + orderSql), "", 10, "paginBind", "loadData");
}
function fy_end(){
    $("#tableInfo").removeClass('loading');
    if(_counts == 0){
        $("#tableInfo").hide();
        $("#noSendData_library").show();
    }
    else{
        $("#tableInfo").show();
        $("#noSendData_library").hide();
        if(_counts > 10){
            $(".page_number").show();
        }
    }
}
//动态加载页面绑定数据
function paginBind(dataInfo){
    $("#tableInfo").empty();
    //设置查询结果条数
    $('#resultCount').text(_counts);
    $('#resultCount1').text(_counts);
    //设置当前页数及总页数
    var indexPage = $('#paginInfo').children('ul').children('.active').text();
    var pageCount = parseInt(_counts / pageSize);
    if(_counts % pageSize > 0){
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
    $('.page_right').children('em').text(pageCount);
     //图片列表数据加载
    $(dataInfo).each(function(i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for(var n = 0; n < len; n ++){
            if(array[n] == null){
                array[n] = "&nbsp;"
            }
        }
       
        var sex = '男';
        //给经纪人加性别，从身份证中抓取
        if($.trim(array[3]) != '' && $.trim(array[3]).length == 18){
            var sexValue = array[3].charAt(16);
            if(parseInt(sexValue) % 2 == 0){
                sex = '女';
            }
        }
         if($.trim(array[15]) == "" || array[15] =="&nbsp;" ){
                if($.trim(sex)=="女"){
                        array[15]="/static/mobile/images/jjr_tx1.png";
                    }else{
                        array[15]="/static/mobile/images/jjr_tx.png";
                }
        }
        var area_year = [];
        if( array[18] !='&nbsp;'){
            area_year.push( array[18] );
        }
        if( array[23] !='&nbsp;'){
            area_year.push( array[23] );
        }
        area_year = area_year.join('&nbsp;|&nbsp;');
        var content = '';
        content += '<li>';
        content += '    <div class="img_lf"> <img src="'+file_website+array[15]+'" class="head_img" onclick="viewHeadhunter('+array[1]+')" onerror="notfind(this, 3, \'' + sex + '\')">';
        content += '        <div class="status"> <span> <img class="v" src="/static/images/new_images/v.png"  style="cursor: pointer;" alt="">已认证 </span> </div>';
        content += '    </div>';
        content += '    <div class="re_details">';
        content += '        <p><span class="talents_name" onclick="viewHeadhunter('+array[1]+')" style="cursor: pointer;">'+array[2]+'</span> <span class="grade_agr">'+array[21]+'</span> <span class="deji">LV'+array[26]+'</span> </p>';
        content += '        <p><span class="edu_des">'+area_year+' </span></p>';
        content += '        <p><span class="rus_tit">擅长行业：</span><span class="res_comm">'+array[19]+'</span></p>';
        content += '        <p class="wtnum">已接收 <span>'+array[31]+'</span> 份委托简历</p>';
        content += '        <div class="ru_tab">';
        if(array[30] != '' && array[30] != '&nbsp;'){
            var labels = array[30].split('**');
            for(var j = 0;j < labels.length;j++){
                content += '    <span>'+labels[j]+'</span>';
            }
        }
        content += '        </div>';
        content += '    </div>';
        content += '    <div class="det_rg">';
        content += '        <div class="ser_eva"><span>服务评价</span>';
        content += '            <div class="starlev">';
        //服务评价
        var evaluationValue = '';
        if(array[24] != '&nbsp;'){
            evaluationValue = array[24];
        } else {
            evaluationValue = '5.0';
        }
        for(var index = 0;index < 5;index++){
            if(index < parseInt(evaluationValue)){
                content += '<img src="/static/images/new_images/star.png" alt="">';
            }else{
                content += '<img src="/static/images/new_images/star1.jpg" alt="">';
            }
        }
        content += '            </div>';
        content += '        </div>';
        content += '        <p class="comment">评论'+array[32]+'条</p>';
        var deal_time = 0;
        if(array[33].indexOf('.') != -1){
            deal_time = parseInt(array[33].substring(0, array[33].indexOf('.'))) + 1;
        }else if(array[33] != '&nbsp;'){
            deal_time = parseInt(array[33]);
        }
        if (deal_time > 72){
            deal_time = '3天以上';
        }else{
            deal_time += 'h';
        }
        content += '        <p class="response">平均响应时间 <span>'+deal_time+'</span></p>';
        content += '    </div>';
        content += '    <div class="pri_lett"><div class="attent_des" onclick="attentionOperate(this, \''+array[1]+'\')"><i></i>关注</div><input type="hidden" value="'+array[1]+'" /> <span ';
        if(pu_id != ''){
            content += ' data-toggle="modal" data-target="#sxmessage_Modal" ';
        }
        content += ' onclick="getopersx(this, \''+array[2]+'\', '+array[1]+')">私信</span> </div>';
        content += '</li>';
        $("#tableInfo").append(content);
        var attentionObj = $("#tableInfo").children('li:last').find('.attent_des');
        judgeAttention(attentionObj, array[1]);
    });
    loadListDataEvent();
}
function getopersx(obj,privanames, priaveid){ 
    if(pu_id == ''){
        unLoginDeal();
        return;
    }   
    getOperateDatass(obj,privanames,priaveid);
}
//判断简历是否关注
function judgeAttention(attObj, pu_id) {
    $.ajax({
        type: "post",
        url: "/ajax_attentionOrNot",
        data: {
            "attention_pu_id": pu_id,
            "type": '1'
        },
        dataType: "json",
        async: true,
        success: function(data) {
            if(data.msg == 'yes')
                $(attObj).text('取消关注');
        }
    });
}
//判断搜索框回车事件
function judgeEntry(){
    if(event.keyCode == 13){
        queryData();
    }
}
//查询数据
function queryData(){
    $(".page_number").hide();
    $("#tableInfo").empty().addClass('loading');
    querySql = sql;
    condition = $.trim($('#condition').val());
    if(condition != ''){
        var keywords = condition.split(' ');
        for(var index = 0;index < keywords.length;index++){
            if(keywords[index] == ''){
                continue;
            }
            var locationSql = ' (select T_SYS_Dictionary.dictionary_name from T_SYS_Dictionary where T_SYS_Dictionary.dictionary_value = location)';
            var provinceSql = ' (select T_SYS_Dictionary.p_value from T_SYS_Dictionary where T_SYS_Dictionary.dictionary_value = location)';
            querySql += ' and (real_name like "%' + keywords[index] + '%"';
            querySql += ' or ' + locationSql + ' like "%' + keywords[index] + '%"';
            querySql += ' or ' + provinceSql + ' in (select T_SYS_Dictionary.dictionary_value from T_SYS_Dictionary where T_SYS_Dictionary.dictionary_name like "%' + keywords[index] + '%")';
            //行业搜索
            $.ajax({
                async: false,
                type: "POST",
                url: "/ajax_get_industry_for_name",
                data: {"key_name": keywords[index]},
                dataType: "json",
                success: function (data) {
                    $(data["msg"]).each(function(){
                       querySql += ' or find_in_set("' + this[0] + '", business)'
                    });
                }
            });
            querySql += ')';
        }
    }
    var areaValue = $('#areaValue').val();
    if(areaValue != ''){
        querySql += ' and (';
        var areaValues = areaValue.split(",");
        for(var m = 0; m < areaValues.length; m ++){
            querySql += 'location=' + areaValues[m] + ' or ';
            querySql += 'location in (select dictionary_value from T_SYS_Dictionary where p_value="'+areaValues[m]+'") or ';
        }
        querySql = querySql.substring(0, querySql.length - 3) + ')';
    }
    var work_year = $('.claim_p').attr('data-value');
    if(work_year != '' && work_year != '0' && work_year != '1'){
        querySql += ' and working_time = "' + work_year + '" ';
    }
    var business = $('#businessulValue').val();
    if(business != ''){
        querySql += ' and (';
        var businesses = business.split(",");
        for(var i = 0; i < businesses.length; i ++ ){
            querySql += 'find_in_set("' + businesses[i] + '", business) or '
        }
        querySql = querySql.substring(0, querySql.length - 3) + ')';
    }
    var positions = $('#positionValue').val();
    if(positions != ''){
        querySql += ' and (';
        var posts = positions.split(",");
        for(i = 0; i < posts.length; i ++ ){
            querySql += 'post like "%' + posts[i] + '%" or '
        }
        querySql = querySql.substring(0, querySql.length - 3) + ')';
    }
    loadData = new pagin("paginInfo", "V_PU_HeadHunt", "", encodeURI(querySql + orderSql), "", 10, "paginBind", "loadData");
}
//查看猎头
function viewHeadhunter(headhunterId){
    window.open('/system/ckjjrsy?puid=' + headhunterId, '_blank');
}
//关注和取消关注
function attentionOperate(obj, source_id) {
    if(pu_id == ''){
        unLoginDeal();
        return;
    }
    var tpuIdsArray = [];
    tpuIdsArray.push(source_id);
    $.ajax({
        type: 'POST',
        url: '/ajax_attentionedSwap',
        data: {"tpuIds": tpuIdsArray},
        dataType: 'json',
        success: function (data) {
            if (data.status && data.status == '0') {
                window.alert('关注人数已达上限',2);
            } else if (data.msg && data.msg == 'isAttentioned') {
                $(obj).text('取消关注');
                window.alert('关注成功',1);
            } else if (data.msg && data.msg == 'noAttentioned') {
                $(obj).empty();
                $(obj).append('<i></i>关注');
                window.alert('取消关注成功',1);
            }
        }
    })
}
//翻页
function pageTurn(type){
    var indexPage = $('.page_right').children('span').text();
    var pageCount = $('.page_right').children('em').text();
    if(type == 'up'){
        if(indexPage == '1'){
            window.alert('已经是第一页',4);
            return;
        }
        if($('#paginInfo_backPage')){
            $('#paginInfo_backPage').click();
        }
    }else if(type == 'down'){
        if(pageCount == indexPage){
            window.alert('已经是最后一页',4);
            return;
        }
        if($('#paginInfo_backPage')){
            $('#paginInfo_backPage').parent().children(':eq(-2)').click();
        }
    }
    $("#tableInfo").empty().addClass('loading');
    $(".page_number").hide();
}
//未登录处理
function unLoginDeal(){
    var loginDialog=new LoginDialog();
    loginDialog.open();
}

