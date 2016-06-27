$(function(){
    $(".sh_submit").click(function(event) {
        var shval=$(".sh_submit").text();
        if(shval=="收起"){
            $('.details').removeClass("dk");
            $('#choice_re').removeClass("dn");
            $('.details').addClass("dn");
            $('#choice_re').addClass("dk");
            $('#scale').text(scale);
            $('#nature').text(nature);
            $('#field').text(field);
            $(".sh_submit").html('展开<i class="active"></i>');
        }else{
            $('.details').removeClass("dn");
            $('#choice_re').removeClass("dk");
            $('.details').addClass("dk");
            $('#choice_re').addClass("dn");
            $(".sh_submit").html('收起<i></i>');
        }
    });
    var scale="不限";
    var nature="不限";
    var field="不限";
    //公司规模
    $("#comm_scale a").each(function(index,el) {
        $(el).click(function(event) {
            $("#comm_scale a").removeClass("active");
            $(el).addClass("active");
            scale=$(el).text();
            companySearch();
        });
    });
    //公司性质
    $("#comm_nature a").each(function(index,el) {
        $(el).click(function(event) {
            $("#comm_nature a").removeClass("active");
            $(el).addClass("active");
            nature=$(el).text();
            companySearch();
        });
    });
    //公司所属领域
    $("#comm_field a").each(function(index,el) {
        $(el).click(function(event) {
            $("#comm_field a").removeClass("active");
            $(el).addClass("active");
            field=$(el).text();
            companySearch();
        });
    });
    //公司所属领域更多
    $(".more1").click(function(event) {
        if($(".more_mes").css("display")=="block"){
            $(".more_mes").css("display","none");
            $("#comm_field").css("background-color","#fff");
            $(".more1").html('更多<i></i>');
        }else{
            $(".more_mes").show();
            $("#comm_field").css("background-color","#f8f8f8");
            $(".more1").html('更多<i class="moactive"></i>');
        }
    });
    //公司性质更多
    $(".more").click(function(event) {
        if($(".more_mes1").css("display")=="block"){
            $(".more_mes1").css("display","none");
            $("#comm_nature").css("background-color","#fff");
            $(".more").html('更多<i></i>');
        }else{
            $(".more_mes1").show();
            $("#comm_nature").css("background-color","#f8f8f8");
            $(".more").html('更多<i class="moractive"></i>');
        }
    });
    //省市点击出下拉框
    $(".city_p").click(function(event) {
        if($(".city_p").index($(this))==1){
            if($(".city_p").eq(0).attr('data-value')=="" || $(".city_p").eq(0).attr('data-value')==0){
                window.alert("请选择省份",4);
                return false;
            }
        }
        if($(this).next().css('display') == "none"){
            $(this).next().css({
                borderColor: '#5C91D9',
                borderTopColor: '#e0e0e0'
            }).slideDown(150);
            $(this).css({
                borderColor: '#5C91D9',
                borderBottomColor: '#e0e0e0'
            });
        }else{
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
        $(this).parent().css({
            borderColor: '#e0e0e0'
        });
        $(this).parent().prev().css({
            borderColor: '#e0e0e0'
        });
        if($(".xl_mes").index($(this).parent()) == 0){
            var value = $(this).val();
            $(".xl_mes").eq(0).prev().attr('data-value', value);
            $(".xl_mes").eq(1).prev().text('不限').append('<img src="/static/images/new_images/xjt.png" alt="">');
            $(".xl_mes").eq(1).prev().attr('data-value', '');
            companySearch();
            if(value == ''){
                $(".xl_mes").eq(1).children('li:gt(0)').remove();
                return;
            }
            $.ajax({
                type: "POST",
                url: "ajax_dictionary",
                data: {"p_value": value},
                dataType: "json",
                success: function (data) {
                    var cityUl = $(".xl_mes").eq(1);
                    cityUl.children('li:gt(0)').remove();
                    for(var m = 0;m < data.length;m++){
                        var city = data[m];
                        cityUl.append('<li value="'+city.dictionary_value+'">'+city.dictionary_name+'</li>')
                    }
                    $(".xl_mes:eq(1) li").click(function(event) {
                        $(this).parent().slideUp(150).prev().text($(this).text()).append('<img src="/static/images/new_images/xjt.png" alt="">');
                        $(this).parent().slideUp(150).prev().attr('data-value', $(this).val());
                        companySearch();
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
var pu_id;
var sql = ' pc_type = 1 and audit_result = 3';
var querySql = sql;
var condition = '';
var file_website = '';
window.onload = function(){
    file_website = $('#file_website').val();
    pu_id = $('#pu_id').val();
    $('#condition').val($('#initData').val());
    if($('#initData').val() != ''){
        condition = $.trim($('#initData').val());
        querySql += ' and (pc_name like "%' + condition + '%" or pc_short_name like "%' + $.trim(condition) + '%")';
    }
    loadData = new pagin("paginInfo", "V_Company", "", encodeURI(querySql), "", 10, "paginBind", "loadData");

};
//动态加载页面绑定数据
function paginBind(dataInfo) {
    var indexPage = $('#paginInfo').children('ul').children('.active').text();
    var pageSize = parseInt(_counts / 10);
    if (_counts % 10 > 0) {
        pageSize += 1;
    }
    if (!indexPage || indexPage == '') {
        if(pageSize > 0) {
            indexPage = 1;
        }else{
            indexPage = 0;
        }
    }
    if(_counts <1){
        $("#noSendData").show();
        $('.page_number').hide();
    }else{
        $("#noSendData").hide();
         $('.page_number').show();
    }
    $('.page_right').children('span').text(indexPage);
    $('.page_right').children('b').text(pageSize);
    $('#resultCount').text(_counts + '个');
    //图片列表数据加载
    $(".sea_list").empty();
    $(dataInfo).each(function (i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for (var n = 0; n < len; n++) {
            if (array[n] == null) {
                array[n] = "&nbsp;"
            }
        }
        var content = '';
        content += '<li>';
        content += '    <div class="match">';
        content += '        <div class="seds_left">';
        if(array[6]==""|| array[6]=="None" || array[6] =="&nbsp;")
        {
            array[6]="/static/images/qy_logo.png";
        }
        content += '            <img src="'+file_website+array[6]+'" alt="" class="comm_img" onerror="notfind(this, 2)" onclick="viewCompany('+array[0]+')">';
        content += '        </div>';
        content += '        <div class="left" style="width:73%;">';
        content += '            <div class="information">';
        content += '                <p class="comm_name" onclick="viewCompany('+array[0]+')">'+array[4]+'</p>';
        // onclick="viewCompanyUrl(\''+array[25]+'\')"
        content += '                <p class="comm_jj" style="word-break: break-all;white-space: normal;">';
        content += '                '+array[24]+'&nbsp;';
        content += '                </p>';
        content += '                <p class="comm_nowrap" title="">';
        content += '                      <span style="max-wdith:21.1%;"><i class="add_icon"></i>'+array[18]+'</span>';
        content += '                      <span style="max-wdith:92px;"><i class="peo_icon"></i>'+array[19]+'</span>';
        content += '                      <span style="max-wdith:92px;"><i class="gon_icon"></i>'+array[20]+'</span>';
        content += '                      <span style="max-wdith:21.1%;"><i class="wan_icon"></i>'+array[21]+'</span>';
        content += '                      <span style="max-width:121px;margin-right:0px!important;"><i class="zho_icon"></i>'+array[28]+'个招聘职位</span>';
        content += '                </p>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="comm_right w150">';
        //判断是否关注该公司
        var pc_id = $(this)[0];
        $.ajax({
            type: "post",
            url: "/ajax_attentionOrNot",
            data: {
                "attention_pu_id": pc_id,
                "type": '2'
            },
            dataType: "json",
            async: false,
            success: function(data) {
                if (data.msg == 'yes') {
                    content += '<div class="ycomm_right">';
                    content += '已关注<i class="yij_over"></i> </div>';
                } else {
                    content += '        <div class="comm_right" style="margin-top:2px!important">';
                    content += '            <a class="btn" href="javascript:void(0);" onclick="attentionCompany(' + array[0] + ', this)">关注公司<i class="look_over"></i></a>';
                    content += '        </div>';
                }
            }
        });
    
        content += '        <div class="clearfix"></div>';
        content += '    </div>';
        content += '</li>';
        $(".sea_list").append(content);
        
        $(".comm_nowrap span").each(function(index, el) {
            if($.trim($(this).text())=="")
                $(this).remove();
        });
    });
}
//判断搜索框回车事件
function judgeEntry(){
    if(event.keyCode == 13){
        queryData();
    }
}
//点击搜索事件
function queryData(){
    var queryType = $('.ss_div').children('span:first').text();
    condition = $.trim($('#condition').val());
    if(!queryType || $.trim(queryType) == '公司'){
        companySearch();
    }else{
        window.location = '/position/headhunter/naagentsearch?condition=' + condition;
    }

}
//进行企业搜索
function companySearch(){
    querySql = sql;
    if($('#comm_scale').children('.active').text() != '不限'){
        querySql += ' and scale=' + $('#comm_scale').children('.active').attr('data-value');
    }
    if($('#comm_nature').children('.active').text() != '不限'){
        querySql += ' and nature=' + $('#comm_nature').children('.active').attr('data-value');
    }
    if($('#comm_field').children('.active').text() != '不限'){
        var industry = $('#comm_field').children('.active').attr('data-value');
        querySql += ' and business in (select industry_value from T_SYS_Industry where p_value="' + industry + '") ';
    }
    var cityValue = $('.city_p:eq(1)').attr('data-value');
    var provinceValue = $('.city_p:eq(0)').attr('data-value');
    if(cityValue != '' && cityValue != '0' && cityValue !='1'){
        querySql += ' and location=' + cityValue;
    }else if(provinceValue != '' && provinceValue != '0' && provinceValue != '1'){
        querySql += ' and (location=' + provinceValue + ' or location in (select dictionary_value from T_SYS_Dictionary where p_value="'+provinceValue+'"))';
    }
    condition = $('#condition').val();
    querySql += ' and (pc_name like "%' + $.trim(condition) + '%" or pc_short_name like "%' + $.trim(condition) + '%")';
    loadData = new pagin("paginInfo", "V_Company", "", encodeURI(querySql), "", 10, "paginBind", "loadData");
    
}
//关注公司
function attentionCompany(companyId, obj){
    if($(obj).text() == '已关注'){
        return;
    }
    if(!pu_id || pu_id == ''){
        var loginDialog=new LoginDialog();
        loginDialog.open();
        return;
//        window.open('/system/general_logins', '_blank');
    }
    $.ajax({
        type: "POST",
        url: "/ajax_attentionOperate",
        data: {"id": companyId, "type": 1, "attentionType": 2},
        dataType: "json",
        success: function (data) {
            if(data.status == '0'){
                window.alert("您已达到关注人数的上限!",4)
            } else if(data.msg == 'success'){
                $(obj).attr('disabled', 'disabled').addClass('active').html('已关注<i class="yij_over"></i>');
                window.alert('关注成功',1);
            }else if(data.msg == 'exist'){
                window.alert('你已关注该公司，无需再关注',4);
            }else{
                window.alert(data.msg,4);
            }
        }
    });
}
//查看公司网址
function viewCompanyUrl(url){
    if($.trim(url) != ''){
        if(url.indexOf('http://') == -1){
            url = 'http://' + url;
        }
        window.open(url, '_blank');
    }
}
//查看公司
function viewCompany(companyId){
    window.open('/account/new_qyyl?companyId=' + companyId, '_blank');
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