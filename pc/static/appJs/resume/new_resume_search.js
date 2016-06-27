 var idhide =false;
 $(document).scroll(function () {
        if ($(document).scrollTop() > $('.resu_header').height() + 400) {
            if(idhide == false)
            $('.suspend_sea').css('display', 'block');
        }
        else {
            idhide = false;
            $('.suspend_sea').css('display', 'none');
            $('.super_nat').css('display', 'none');
        }
    })



function qih(){
    $('.panel-heading').hover(function () {
        $(this).children().siblings('.add_up_re_btn').css('display', 'block').parent().css({
            background: '#e7eff9',
            color: '#5c91d9'
        });
    }, function () {
        if (!$(this).children('.name_span').hasClass('active')) {
            $(this).children().siblings('.add_up_re_btn').css('display', 'none').parent().css({
                background: 'white',
                color: '#333'
            });
        }
    });
}

 function reset(){
      $('#keywords').val('');
      $('#startAge').val('');
      $('#endAge').val('');
      $('#company_name').val('');
      $('#current_area').val('');
      $('#expected_area').val('');
      $('#positionDiv').children().remove();
      $('#positionDiv').prev().val('');
      $('#businessulDiv').prev().val('');
      $('#businessulDiv').children().remove();
      $(".bd_Ri>div").removeClass('gender_cho1').css("borderColor", "#e0e0e0");
      $('.bd_Ri div').eq(0).addClass('gender_cho1').css("borderColor", "#5c91d9");
      // console.log($('.positionDiv').next());
      $('#positionDiv').append('<span style="color:#888">请选择职位</span>');
      $('#businessulDiv').append('<span style="color:#888">请选择行业</span>');
      //$(".conditi_top>ul li p").html('不限<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
      $('#main').hide();//搜索结果区域隐藏，完全回到初始状态
   }


var gjzcon="";
$(function () {
    $("#main").hide();$(".sh_submit").hide();

    $('.commsea').blur(function(event) {
        gjzcon=$(this).val();
        $('.commsea').val(gjzcon);
    });

    qih();
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
    $("input[name='choic_input']").change(function () {
        var count = $("input[name='choic_input']:checked").length;
        $(".resucount span").html(count);
    })

    $('#checkAll').click(function () {
        var checkboxes;
        if ($('#Info_list').css("display") != 'none') {
            checkboxes = $("#Info_list input[type='checkbox']");
        }
        if ($(this).is(":checked")) {
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
            }

        } else {
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }
    })


    $(".name_span").click(function (event) {
        $(".name_span").siblings('.add_up_re_btn').css('display', 'none').parent().css({
            background: 'white',
            color: '#333'
        });
        $(this).siblings('.add_up_re_btn').css('display', 'block').parent().css({
            background: '#e7eff9',
            color: '#5c91d9'
        });
        $(".name_span").removeClass('active');
        $(this).addClass('active');
        var _this = $(".xl_crit li").eq( $(this).parent().index() );
        console.log(_this)
        $('.crit_top1').attr('data-value', $(this).val());
        _this.parent().slideUp(150);
        $('.crit_top1').text(_this.text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        _this.parent().css({
            borderColor: '#e0e0e0'
        });
        _this.parent().prev().css({
            borderColor: '#e0e0e0'
        });
    });

    $(".bd_Ri>div").click(function (event) {
        $(".bd_Ri>div").removeClass('gender_cho1').css("borderColor", "#e0e0e0");
        $(this).addClass('gender_cho1').css('borderColor', '#5C91D9');
    });

    $('.xl_comm').mouseleave(function(event) {
        $(this).slideUp(150);
        $(this).prev().css({
            borderColor: '#e0e0e0'
        });
    });

    $('.resucount1 a').click(function(event) {
        $('.resucount1 a').removeClass('active');
        $(this).addClass('active');
    });

    //学历下拉
    $(".claim_p").click(function (event) {
        if ($(this).next().css('display') == "none") {
            $(this).next().slideDown(150);
        }
        else {
            $(this).next().slideUp(150);
        }
    });

    $(".xl_mes1 li").click(function (event) {
        // $(this).parent().slideUp(150).prev().text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        $('.claim_p').attr('data-value', $(this).val());
        $(this).parent().slideUp(150);
        $('.claim_p').text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        searchDataDeal('search');
    });

    //工作经验下拉
    $(".exen_p").click(function (event) {
        if ($(this).next().css('display') == "none") {
            $(this).next().slideDown(150);
        }
        else {
            $(this).next().slideUp(150);
        }
    });

    $(".xl_work li").click(function (event) {
        // $(this).parent().slideUp(150).prev().text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        $('.exen_p').attr('data-value', $(this).val());
        $(this).parent().slideUp(150);
        $('.exen_p').text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        searchDataDeal('search');
    });

    //期望年薪
    $(".pay_p").click(function (event) {
        if ($(this).next().css('display') == "none") {
            $(this).next().slideDown(150);
        }
        else {
            $(this).next().slideUp(150);
        }
    });

    $(".xl_expec li").click(function (event) {
        // $(this).parent().slideUp(150).prev().text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        $('.pay_p').attr('data-value', $(this).val());
        $(this).parent().slideUp(150);
        $('.pay_p').text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        searchDataDeal('search');
    });


    //简历类别
    $(".resu_p").click(function (event) {
        if ($(this).next().css('display') == "none") {
            $(this).next().slideDown(150);
        }
        else {
            $(this).next().slideUp(150);
        }
    });

    $(".xl_cate li").click(function (event) {
        // $(this).parent().slideUp(150).prev().text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        $('.resu_p').attr('data-value', $(this).val());
        $(this).parent().slideUp(150);
        $('.resu_p').text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        searchDataDeal('search');
    });


    //简历过滤
    $(".resu_f").click(function (event) {
        if ($(this).next().css('display') == "none") {
           $(this).next().slideDown(150);
        }
        else {
            $(this).next().slideUp(150);
        }
    });

    $(".xl_fitl li").click(function (event) {
        $('.resu_f').attr('data-value', $(this).val());
        $(this).parent().slideUp(150);
        $('.resu_f').text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        $(this).parent().css({
            borderColor: '#e0e0e0'
        });
        $(this).parent().prev().css({
            borderColor: '#e0e0e0'
        });
        // 设置过虑条件
        var index = $(this).val();
        var new_record = '(select a.pu_id AS a_pu_id, a.resume_id AS a_resume_id, a.update_date from T_Resume_Record a) b';
        var filter_sql = ' and (select count(1) from '+new_record+' where b.a_pu_id='+pu_id+' and id=b.a_resume_id';
        if(index == '0'){
            filter_type = '';
        }else if(index == '1'){//过虑当天
            filter_type = filter_sql + ' and TO_DAYS(update_date)=TO_DAYS(NOW()))=0';
        }else if(index == '2'){//过虑两天
            filter_type = filter_sql + ' and DATE_SUB(CURDATE(), INTERVAL 2 DAY) <= update_date)=0';
        }else if(index == '3'){//过虑三天
            filter_type = filter_sql + ' and DATE_SUB(CURDATE(), INTERVAL 3 DAY) <= update_date)=0';
        }else if(index == '4'){//过虑七天
            filter_type = filter_sql + ' and DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= update_date)=0';
        }else if(index == '5') {//过虑一个月
            filter_type = filter_sql + ' and DATE_SUB(CURDATE(), INTERVAL 1 MONTH) <= update_date)=0';
        }
        searchDataDeal('search');
    });



    $(".crit_top1").click(function (event) {
        if ($(this).next().css('display') == "none") {
            $(this).next().css({
                borderColor: '#e0e0e0',
                borderTopColor: '#e0e0e0'
            }).slideDown(150);
            $(this).css({
                borderColor: '#e0e0e0',
                borderBottomColor: '#e0e0e0'
            });
        }
        else {
            $(this).next().slideUp(150);
            $(this).next().css({
                borderColor: '#e0e0e0'
            });
            $(this).css({
                borderColor: '#e0e0e0'
            });
        }
    });


    $(".xl_crit li").click(function (event) {
        // $(this).parent().slideUp(150).prev().text($(this).text()).append('<img src="/static/images/new_images/xjt.png" alt="" class="claim_img1">');
        $('.crit_top1').attr('data-value', $(this).val());
        $(this).parent().slideUp(150);
        $('.crit_top1').text($(this).text()).append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
        $(this).parent().css({
            borderColor: '#e0e0e0'
        });
        $(this).parent().prev().css({
            borderColor: '#e0e0e0'
        });
        var _this = $(".name_span").eq( $(this).index() );
        $(".name_span").siblings('.add_up_re_btn').css('display', 'none').parent().css({
            background: 'white',
            color: '#333'
        });
        _this.siblings('.add_up_re_btn').css('display', 'block').parent().css({
            background: '#e7eff9',
            color: '#5c91d9'
        });
        $(".name_span").removeClass('active');
        _this.addClass('active');

        searchDataDeal('search');
    });


    var keywords = "";
    var expected_area = "";
    var current_area="";
    var posit1 = "";
    var busin1 = "";
    var startAge = "";
    var endAge = "";
    var company_name = "";
    var nlyq="";
    var sex="";

    //头部收起展开
    $(".sh_submit").click(function (event) {
        var shval = $(".sh_submit").text();
        if (shval == "收起") {
            $('.resu_top').removeClass("dk");
            $('.resu_ss').removeClass("dn");
            $('.resu_top').addClass("dn");
            $('.resu_ss').addClass("dk");
            if($('#keywords').val() != null && $('#keywords').val() != "")
            {
                keywords= $('#keywords').val()+"+";
            }
            else{
                keywords="";
            }
            if($('.bd_Ri .gender_cho1').text() !=null && $('.bd_Ri .gender_cho1').text() != "" && $('.bd_Ri .gender_cho1').text() !="不限")
            {
                if($('#startAge').val()!="" || $('#endAge').val()!="" || $('#businessulDiv span').eq(0).text() !="" || $('#businessulDiv span').text() !="请选择行业"){
                    sex= $('.bd_Ri .gender_cho1').text()+"+";
                }
                else{
                    sex= $('.bd_Ri .gender_cho1').text();
                }
            }
            else{
                sex="";
            }
            if($('#startAge').val() !=null && $('#startAge').val() != ""){
                startAge= $('#startAge').val()+"_";
            }
            else{
                startAge="";
            }
            if($('#endAge').val() !=null && $('#endAge').val() != ""){
                endAge= $('#endAge').val()+"+";
            }
            else{
                endAge="";
            }
            nlyq=startAge+ endAge;
            if($('#businessulDiv span').eq(0).text() !="" && $('#businessulDiv span').text() !="请选择行业"){
                if($('#businessulDiv span').eq(1).text() !=""){
                  busin1 =$('#businessulDiv span').eq(0).text() +"...+";
                }
                else{
                  busin1 =$('#businessulDiv span').eq(0).text() +"+";
                }
            }
            else{
                busin1="";
            }
            if($('#positionDiv span').eq(0).text() !="" && $('#positionDiv span').text()!="请选择职位"){
                if($('#positionDiv span').eq(1).text() !=""){
                  posit1 =$('#positionDiv span').eq(0).text() +"...";
                }
                else{
                    if($('#expected_area').val() !=""){
                        posit1 =$('#positionDiv span').eq(0).text()+"+";
                    }
                    else{
                        posit1 =$('#positionDiv span').eq(0).text();
                    }
                }
            }
            else{
                posit1="";
            }
            if($('#expected_area').val() !=null && $('#expected_area').val() !="" && $('#expected_area').val() != "请选择工作地区"){
                expected_area= $('#expected_area').val()+"+";
            }
            else{
                expected_area="";
            }
            if($('#current_area').val() !=null && $('#current_area').val() !="" && $('#current_area').val() != "请选择工作地区"){
                current_area= $('#current_area').val()+"+";
            }
            else{
                current_area="";
            }
            company_name = $('#company_name').val();
            $(".sh_submit").html('展开<i class="active"></i>');
            $('.sh_submit').css({
                top: '70px'
                
            });
            $(".sea_resu").html(keywords+ sex + nlyq+ busin1 +posit1+ expected_area+current_area+company_name);
        }
        else {
            $('.resu_top').removeClass("dn");
            $('.resu_ss').removeClass("dk");
            $('.resu_top').addClass("dk");
            $('.resu_ss').addClass("dn");
            $(".sh_submit").html('收起<i></i>');
            $('.sh_submit').css({top:'94%',right:'20px'});
        }
    });

    $('.modify_btn').click(function(event) {
           $('.resu_top').removeClass("dn");
            $('.resu_ss').removeClass("dk");
            $('.resu_top').addClass("dk");
            $('.resu_ss').addClass("dn");
            $(".sh_submit").html('收起<i></i>');
            $('.sh_submit').css({top:'94%',right:'20px'});
    });
    
});

var loadData;
var pu_id;
var account_type;
var opentype = '';
var sql;
var querySql;
var condition;
var pageSize = 10;
var operate_type = '';
var file_website = '';
var validStatus = '1';
var filter_type = '';
window.onload = function(){
    file_website = $('#file_website').val();
    validStatus = $('#validStatus').val();
    //删除快捷搜索
    $(".add_up_re_btn .colse_icon").click(function(){
        var searchId = $(this).parent().parent().children('input').val();
        $('#searchResumeId').val(searchId);
    });
    pu_id = $('#pu_id').val();
    //根据登录类型，添加查询简历的过滤条件（是否开放和对某些人可见）
    account_type = $('#account_type').val();
    if(account_type == '3' || account_type == '5'){
        opentype = ' and (search_type = 0 or search_type = 12121000 or search_type = 12123000)';
        opentype += ' and (filter_headhunt is null or filter_headhunt = "" or not find_in_set("' + pu_id + '", filter_headhunt))';
    }else if(account_type == '2' || account_type == '4'){
        opentype = ' and (search_type = 0 or search_type = 12121000 or search_type = 12124000)';
        opentype += ' and (filter_company is null or filter_company = "" or not find_in_set("' + $('#pc_id').val() + '", filter_company))';
    }
    sql = ' resume_status=1 and source_id !=' + pu_id + opentype;
    querySql = sql;
//    $('#expectPosition').val($('#queryPosition').val());
    BusinessulControls("businessulDiv", '', '', 'width:435px;min-height:38px!important;border:1px solid #e0e0e0;margin-top:5px;height:auto;font-size:14px;line-height:38px;text-align:left!important; padding-left:10px!important;background: transparent url("/static/images/new_images/openmes.png") no-repeat scroll 95% center;');
    PositionControls("positionDiv", '', '', 'width:435px;min-height:38px!important;border:1px solid #e0e0e0;margin-top:5px;line-height:38px;font-size:14px;border:1px solid #e0e0e0;', true);
    condition = $('#initData').val();
    //关键字
    if(condition != ''){
        $('.commsea').val(condition);
        searchDataDeal('search');
    }else{
//        searchDataDeal('search');
    }
};
//设置快捷搜索修改类型
function setOperateType(obj, type){
    var searchId = $(obj).parent().parent().children('input').val();
    $('#searchResumeId').val(searchId);
    $('#searchName').val($(obj).parent().prev().val());
    operate_type = type;
}
//刷新每页显示数据条数
function reloadPage(reflushCount){
    pageSize = reflushCount;
    loadData = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), "", pageSize, "paginBind", "loadData");
}
//动态加载页面绑定数据
function paginBind(dataInfo){
     if(dataInfo[0]==null){
                $("#tableInfo").removeClass('load');
                $('.page_number').hide();
                $('#noSendData_tddjl').show();
                $("#tableInfo").empty().hide();
                return;
     }
     else{
        $('#noSendData_tddjl').hide();
        $("#tableInfo").show();
     }
     //图片列表数据加载
    $("#tableInfo").empty();
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
    $('.page_right').children('b').text(pageCount);
    var userValidateStatus = $("#userValidateStatus").val();
    $(dataInfo).each(function(i) {

        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        var sex=array[5];
        if(array[5] =="男"){
            sex="<i class=\"talsex_icon1\"></i>"+array[5];
        }
        else{
            sex="<i class=\"talsex_icon\"></i>"+array[5];
        }
        for(var n = 0; n < len; n ++){
            if(array[n] == null){
                array[n] = "&nbsp;"
            }
        }
        if($.trim(array[4]) == "" || array[4] =="&nbsp;"){           
                if(array[5]=="女"){
                        array[4]="/static/mobile/images/rcf_tx1.png";
                    }else{
                        array[4]="/static/mobile/images/rcf_tx.png";
                }
        }
        if($.trim(array[35])=="&nbsp;" || array[35] =="None")
            array[35]="";
        else
            array[35]="&nbsp;|&nbsp;"+array[35];
        if($.trim(array[36])==""|| array[36] =="None")
            array[36]="";
        else
            array[36]="&nbsp;|&nbsp;"+array[36];
        if($.trim(array[37])==""|| array[37] =="None")
            array[37]="";
        else
            array[37]="&nbsp;|&nbsp;"+array[37];

        var o_age = parseInt(new Date().getFullYear()) - array[6];
        if(isNaN(o_age)){
            o_age ="";
        }else{
            o_age = "&nbsp;|&nbsp;"+o_age+"岁";
        }
        //图片列表数据加载
        var content = '';
        content += '<li>';
        content += '    <div class="img_lf"> <img src="'+file_website+array[4]+'" onclick="viewResume('+array[0]+')" onerror="notfind(this, 1, \''+array[5]+'\')">';
        content += '        <p>';
        switch(array[1]){
            case 1:
                content += '[个人]';
                break;
            case 2:
                content += '[经纪人]';
                break;
            case 3:
                content += '[企业]';
                break;
            default:
                break;
        }
        content += '        <p>';
        content += '            <input name="choic_input" type="checkbox" value="'+array[0]+'" >';
        content += '    </div>';
        content += '    <div class="re_details">';
        content += '        <p><span class="talents_name" onclick="viewResume('+array[0]+')" style="cursor: pointer;">'+array[3]+'</span><span class="edu_des">'+sex+'  '+array[37]+'  '+array[35]+'  '+array[36]+'  '+o_age+'  </span><span class="det_time">更新时间：'+array[32].substring(0, 10)+'</span>';
        content += '            <i class="readmes" style="display: none;" title="七天内浏览过该简历"></i></p>';
        content += '        <p><span  class="rus_tit">目前职位：</span><span class="res_post">'+array[38]+'</span></p>';
        content += '        <p><span  class="rus_tit">毕业院校：</span><span class="res_comm"></span></p>';
        content += '        <div><span  class="rus_tit" style="vertical-align: top!important;">工作经历：</span>';
        content += '            <div class="exper_list">';
        content += '            </div>';
        content += '        </div>';

        //个人标签
        if(array[41] != '' && array[41] != '&nbsp;'){
            content += '        <div class="ru_tab"><span class="rus_tit" style="vertical-align:top; margin-top:14px">个人标签：</span>';
            content += '            <ul>';
            var labelList = array[41].split('**');
            for(var m = 0;m < labelList.length;m++){
                if($.trim(labelList[m]) != '' && $.trim(labelList[m]) != '&nbsp;'){
                    content += '<li>'+labelList[m]+'</li>';
                    if(m == 5){
                        break;
                    }
                }
            }
            content += '            </ul>';
            content += '        </div>';
        }
        content += '    </div>';
        content += '    <div class="det_rg">';
        var showAttention = '';
        if(array[1] == 2){
            showAttention = ' style="display: none;"';
        }
        content += ' <span class="attent_des" onclick="attentionOperate(this, '+array[2]+')" '+showAttention+'><i></i>关注</span> ';
        content += '        <div class="rg_btn"><input type="hidden" value="'+array[2]+'" />';
        content += '            <a class="btn" onclick="recommend(\''+array[54]+'\', \''+array[2]+'\', '+array[0]+', \''+array[3]+'\', '+array[1]+')">推荐</a>';
        content += '            <a class="btn" onclick="collectResume(this, '+array[0]+')">收藏</a>';
        content += '            <a onclick="judgeForwardResume(' + array[0] + ')">转发</a>';
        var source_name = '';
        if(array[1] == 1){
            source_name = array[3];
        }else{
            source_name = array[66];
        }
        content += '            <a data-toggle="modal" data-target="#sxmessage_Modal" onclick="getOperateDatass(this, \''+source_name+'\', '+array[2]+', '+array[1]+', '+array[0]+', \''+array[3]+'\')">私信</a> </div>';
        content += '        <div class="comm_right"></div>';
        content += '    </div>';
        content += '</li>';
        $("#tableInfo").append(content);
        var education = $("#tableInfo").children('li:last').find('.res_comm');
        //获得教育经历
        loadEducation(education, array[0]);
        //获得工作经历
        var workExperience = $("#tableInfo").children('li:last').find('.exper_list');
        loadWorkExperience(workExperience, array[0]);
        //判断该简历是否关注收藏
        var attentionObj = $("#tableInfo").children('li:last').find('.attent_des');
        var collectObj = $("#tableInfo").children('li:last').children('div:last').children('div').children('a:eq(1)');
        judgeAttentionAndCollect(attentionObj, collectObj, array[0]);
        // 获得简历是否7天内查看过
        var view_img = $("#tableInfo").children('li:last').find('.readmes');
        loadViewImg(view_img, array[0]);
    })
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
                if(smajor =="" || smajor ==null){
                   smajor="";
                }
                else{
                   smajor = "|"+ data.smajor ;
                }
                if(sdiploma =="" || sdiploma ==null){
                   sdiploma="";
                }
                else{
                   sdiploma = "|"+ data.sdiploma ;
                }
                obj.text(uc_name + smajor  + sdiploma);
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
                    var worpos="";
                    if(work.sposition =="" || work.sposition ==null){
                        worpos="";
                    }else{
                        worpos="|"+ work.sposition ;
                    }

                    obj.append('<p> '+work.work_time+' '+work.company_name + worpos + '</p>');
                    if(n == 2){
                        break;
                    }
                }
            }
        }
    });
}
//判断简历是否关注收藏
function judgeAttentionAndCollect(attObj, collObj, resume_id){
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
                collObj.text(data.collect);
                collObj.attr('data-value', data.cGroupId);
            }
        }
    });
}
// 获得简历是否7天内查看过
function loadViewImg(obj, resume_id){
    $.ajax({
        type: 'POST',
        url: '/judgePreviewResume',
        data: {'resume_id': resume_id, 'limit_day': '7'},
        dataType: 'json',
        success: function(data){
            if(data.status == '1'){
                obj.css('display', '');
            }
        }
    });
}
//删除快捷搜索
function deleteQuickSearch(){
    var searchId = $('#searchResumeId').val();
    var _this = $('.cal_tree_dd1 input[value="'+searchId+'"]');
    $.ajax({
        type: 'POST',
        url: '/ajax_deleteQuickSearch',
        data: {'searchId': searchId},
        dataType: 'json',
        success: function(data){
            if(data.msg == 'success'){
                window.alert('删除成功',1);
                $(_this).parent().remove();
                $('.xl_crit li[onclick="quickSearch(\''+searchId+'\',this)"]').remove();
                if($('.cal_tree_dd1 .panel-heading').length == 0)
                {
                    $('.xl_crit').append('<span class="nonezi" style="height:40px; text-align: center; width:100%; display:block; line-height:40px;">暂无保存搜索条件</span>');
                    $('.cal_tree_dd1').append('<span class="nonezi" style="height:40px; text-align: center; width:100%; display:block; line-height:40px;">暂无保存搜索条件</span>');
                }
            }else{
                window.alert('删除失败',2);
            }
        }
    });
}
//修改快捷搜索名称
function updateSearchName(){
    var search_id = $('#searchResumeId').val();
    var _this = $('.cal_tree_dd1 input[value="'+search_id+'"]');
    var search_name =$('#searchName').val();
    if($.trim(search_name) == ''){
        window.alert('请输入快捷搜索名称',4);
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/ajax_updateSearchName',
        data: {'search_id': search_id, 'search_name': search_name},
        dataType: 'json',
        success: function(data){
            if(data == 1){
                $(_this).next().next().text(search_name);
                $('.xl_crit li[onclick="quickSearch(\''+search_id+'\',this)"]').text(search_name);
                window.alert('修改成功',1);
            }else{
                window.alert('修改失败',2);
            }
        }
    })
}
function ageask(){

    if(isNaN($('#startAge').val()) && isNaN($('#startAge').val()))
    {
        window.alert("年龄要求必须为数字",4);
        $('#startAge').val('');
        $('#endAge').val('');
    }
    if($('#startAge').val() =="" && $('#endAge').val() !=""){
        window.alert("请输入要搜索的年龄要求",4);
        $('#startAge').val('');
        $('#endAge').val('');
    }
    if($('#endAge').val() =="" && $('#startAge').val() !=""){
        window.alert("请输入要搜索的年龄要求",4);
         $('#startAge').val('');
        $('#endAge').val('');
    }
    if($('#endAge').val() !="" && $('#startAge').val() !="" && $('#startAge').val() >= $('#endAge').val()){
        window.alert("请输入合理的年龄要求",4);
        $('#startAge').val('');
        $('#endAge').val('');
    }
}
//搜索数据处理
function searchDataDeal(type){
    if(type != 'save'){
        $("#main").show();$(".sh_submit").show();
        $(window).scrollTop($('#main').offset().top);
    }
    ageask();
    querySql = sql;
    var searchName = $('#searchName').val();
    if(operate_type == 'update' && !$('#search_Modal').is(":hidden")){
        updateSearchName();
        operate_type = '';
        return;
    }
    if(type == 'save'){
        var searchList = $('.cal_tree_dd1').children('div');
        if(searchList.length > 4){
            window.alert('最多只能添加5个快捷搜索',4);
            return;
        }
        if($.trim(searchName) == ''){
            window.alert('请填写快捷搜索名称',4);
            return;
        }
        for(var m = 0;m < searchList.length;m++){
            if($.trim(searchName) == searchList.eq(m).children('div').text()){
                window.alert('该搜索名称已存在，请重新输入',4);
                $('#sureInterview').attr('data-dismiss', '');
                return;
            }
        }
        $('#sureInterview').attr('data-dismiss', 'modal');
    }
    var searchObj = [];
    var keywords = $.trim($('#keywords').val());
    searchObj.push(keywords);
    //关键字
    if(keywords != ''){
        keywords = $.trim(keywords);
        keywords = keywords.replace(/\s*/," ");
        keywords = keywords.replace(/\s*$/," ");
        keywords = keywords.replace(/\s+/g," ");
        var keywordList = keywords.split(' ');
        var positionSql = ' (SELECT T_SYS_Position.Position_Name FROM T_SYS_Position WHERE T_SYS_Position.Position_Value = V_Resume_Info.Currently_Postaion)';
        var locationSql = ' (select T_SYS_Dictionary.dictionary_name from T_SYS_Dictionary where T_SYS_Dictionary.dictionary_value = V_Resume_Info.Currently_Pacece)';
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
//            querySql += ' OR ( id IN (SELECT Resume_ID FROM T_Resume_Work WHERE Work_Duty LIKE "%'+keywordList[m]+'%"))';
//            querySql += ' OR ( id IN (SELECT Resume_ID FROM T_Resume_Item WHERE Duty LIKE "%'+keywordList[m]+'%" OR Item_Describe LIKE "%'+keywordList[m]+'%" ))';
            //判断是否是数字，如果是数字则进行年龄判断
            if(!isNaN($.trim(keywordList[m]))){
                var d = new Date();
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
    }

    var expected_industry = '';
    var expectBis = $('#businessulDiv').children('span');
    var industrys = $('#businessulValue').val();
    //期望行业
    if(industrys != ''){
        for(var n = 0;n < expectBis.length;n++){
            if(expected_industry == ''){
                expected_industry = expectBis.eq(n).text();
            }else{
                expected_industry += ',' + expectBis.eq(n).text();
            }
        }
        var industryIds = industrys.split(',');
        for(var m = 0;m < industryIds.length;m++){
            if(m == 0){
                querySql += ' and (find_in_set("' + industryIds[m] + '", cast(expect_industry as char))';
            }else{
                querySql += ' or find_in_set("' + industryIds[m] + '", cast(expect_industry as char))';
            }
        }
        querySql += ')';
        expected_industry += '**' + industrys;
    }
    searchObj.push(expected_industry);
    var expected_position = '';
    var positions = $('#expectPosition').val();
    var expectPs = $('#positionDiv').children('span');
    //期望职位
    if(positions != ''){
        for(var n = 0;n < expectPs.length;n++){
            if(expected_position == ''){
                expected_position = expectPs.eq(n).text();
            }else{
                expected_position += ',' + expectPs.eq(n).text();
            }
        }
        var positionIds = positions.split(',');
        for(var m = 0;m < positionIds.length;m++){
            if(m == 0){
                querySql += ' and (expect_position like "%' + $.trim(positionIds[m]) + '%"';
            }else{
                querySql += ' or expect_position like "%' + $.trim(positionIds[m]) + '%"';
            }
        }
        querySql += ')';
        expected_position += '**' + positions;
    }
    searchObj.push(expected_position);
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
        expected_area += '**' + expect_areaes;
    }
    searchObj.push(expected_area);
    var sex = '';
    if($.trim($('.gender_cho1').text()) != '不限' ){
        sex = $.trim($('.gender_cho1').text());
        querySql += ' and sex="' + sex + '" ';
    }
    searchObj.push(sex);
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
    searchObj.push(rangeAge);
    var work_year = $('#work_year').attr('data-value');
    searchObj.push(work_year);
    if(work_year != '' && work_year != '0' && work_year != '1'){
        querySql += ' and workyear=' + work_year;
    }
    var expectSalary = $('#expectSalary').attr('data-value');
    searchObj.push(expectSalary);
    if(expectSalary != '' && expectSalary != '0' && expectSalary != '1'){
        // 期望年薪处理
        var payname = $('#expectSalary').text();
        var start_salary = 0;
        var end_salary = 1000;
        if(payname.indexOf('以上') != -1){
            querySql += ' and (expect_start_salary is not null and expect_end_salary is null';
        }else if(payname.indexOf('以下') != -1){
            querySql += ' and (expect_start_salary is null and expect_end_salary is not null';
        }else{
            start_salary = payname.split('-')[0];
            end_salary = payname.split('-')[1].split('万')[0];
            querySql += ' and ((expect_start_salary < '+ end_salary+' and expect_end_salary > '+start_salary+' )';
        }
        querySql += ')';
//        querySql += ' and (expect_pay=' + expectSalary;
    }
    var company_name = $.trim($('#company_name').val());
    searchObj.push(company_name);
    if(company_name != ''){
        var radios = $('input[type="radio"]');
        if(radios.eq(0)[0].checked){
            querySql += ' and currently_company like "%' + company_name + '%"';
        }else{
            querySql += ' and (id in (select distinct(Resume_ID) from T_Resume_Work where Company_Name like "%' + company_name + '%")';
            querySql += ' or currently_company like "%' + company_name + '%")';
        }
    }
    //当前职位
    var current_position = '';
    searchObj.push(current_position);
    var current_area = $('#current_area').val();
    if(current_area != ''){
        var current_Value = $('#current_area').next().val();
        querySql += ' and currently_pacece=' + current_Value;
        current_area += '**' + current_Value;
    }
    searchObj.push(current_area);
    var diploma = $('#diploma').attr('data-value');
    searchObj.push(diploma);
    if(diploma != '' && diploma != '0' && diploma != '1'){
        querySql += ' and diploma=' + diploma;
    }
    //婚姻状况==用于保存简历类型（个人简历或经纪人简历）
    var married = $('#resume_source').attr('data-value');

    //if(married != '' && married != '0' && married != '1'){
    if(married != '' && married != '0'){
        querySql += ' and resume_source=' + married;
    }
    searchObj.push(married);
    if(querySql == sql){
        window.alert('至少要有一个查询条件，请输入或选择一个条件',4);
        $('#main').css('display','none');
        return false;
    }
    querySql += filter_type;
    querySql += ' order by update_date desc';
    if(type == 'search'){

        loadData = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), "", pageSize, "paginBind", "loadData");
        $('#resultCount1').text(_counts);
        $('#resultCount2').text(_counts);
    }else{
        var resumeSearchId = '';
        searchObj.push(searchName);
        $.ajax({
            type: "POST",
            url: "/ajax_saveSearchCondition",
            data: {"searchObj": searchObj, "id": resumeSearchId},
            dataType: "json",
            success: function (data) {
                if(data.msg == 'success'){
                    if(resumeSearchId == ''){
                        var content = '';
                        content += '<div class="panel-heading">';
                        content += '    <input type="hidden" value="'+data.id+'">';
                        content += '    <i class="iconfont icon-fangxiang2 f_l" style="font-size:16px"></i>';
                        content += '    <span class="name_span"  onclick="quickSearch(\''+data.id+'\',this)">'+searchName+'</span>';
                        content += '    <input type="text" id="" value="'+searchName+'" class="edit_name_input">';
                        content += '    <span class="f_r add_up_re_btn">';
                        content += '        <i class="bj_icon" onclick="setOperateType(this, \'update\')" data-toggle="modal" data-target="#search_Modal"></i>';
                        content += '        <i class="colse_icon" data-toggle="modal" data-target="#if_del_Modal"></i>';
                        content += '    </span>';
                        content += '</div>';
                        $('.cal_tree_dd1').append(content);
                        var searchText = '<li onclick="quickSearch(\''+data.id+'\',this)">'+searchName+'</li>';
                        $('.xl_crit:first').append(searchText);
                        $('.xl_crit:last').append(searchText);
                        $(".add_up_re_btn .colse_icon").click(function(){
                            var searchId = $(this).parent().parent().children('input').val();
                            $('#searchResumeId').val(searchId);
                        });
                    }else{
                        $('input[value="'+data.id+'"]:last').next().text(searchName);
                    }
                    window.alert('保存成功',1);
                    $('.nonezi').hide();
                    qih();
                }else{
                    window.alert(data.msg,4);
                }
            }
        });
    }
    return true;
}
//点击快捷搜索事件
function quickSearch(searchId){
    $.ajax({
        type: 'POST',
        url: '/ajax_getQuickSearchById',
        data: {'searchId': searchId},
        dataType: 'json',
        success: function(data){
            if(!data.msg){
                $('#resumeSearchId').val(data.id);
                $('#keywords').val(data.keywords);
                if(data.expected_industry != null && data.expected_industry != ''){
                    $('#BusinessulControls').remove();
                    BusinessulControls("businessulDiv",data.expected_industry.split('**')[0],data.expected_industry.split('**')[1], 'width:435px;margin-top:5px;min-height:38px;line-height:38px;font-size:14px;text-align:left!important; padding-left:10px!important;background: transparent url("/static/images/new_images/openmes.png") no-repeat scroll 95% center;');
                    $('#businessulValue').val(data.expected_industry.split('**')[1]);
                }else{
                    $('#businessulDiv').children(':gt(0)').remove();
                    $('#businessulDiv').append('<span style="color:#999;">请选择行业</span>');
                    $('#businessulValue').val('');
                }
                if(data.expected_position != null && data.expected_position != ''){
                    $('#PositionControls').remove();
                    PositionControls("positionDiv",data.expected_position.split('**')[0],data.expected_position.split('**')[1], 'width:435px;margin-top:5px;min-height:38px;line-height:38px;font-size:14px;text-align:left!important; padding-left:10px!important; border:1px solid #e0e0e0!important; border-radius:4px;background: transparent url("/static/images/new_images/openmes.png") no-repeat scroll 95% center;', true);
                    $('#expectPosition').val(data.expected_position.split('**')[1]);
                }else{
                    $('#positionDiv').children(':gt(0)').remove();
                    $('#businessulDiv').append('<span style="color:#999;">请选择职位</span>');
                    $('#expectPosition').val('');
                }
                if(data.expected_area != null && data.expected_area != ''){
                    $('#expected_area').val(data.expected_area.split('**')[0]);
                    $('#expected_area').next().val(data.expected_area.split('**')[1]);
                }else{
                    $('#expected_area').val('');
                    $('#expected_area').next().val('');
                }
                if(data.sex == '男'){
                    $(".bd_Ri div").attr('class', 'gender_cho gencomm');
                    $(".bd_Ri div").eq(1).click();
                }else if(data.sex == '女'){
                    $(".bd_Ri div").attr('class', 'gender_cho gencomm');
                    $(".bd_Ri div").eq(2).click();
                }else{
                    $(".bd_Ri div").attr('class', 'gender_cho gencomm');
                    $(".bd_Ri div").eq(0).click();
                }
                if(data.age_year != null && data.age_year != '') {
                    var rangeAge = data.age_year;
                    var ageList = rangeAge.split(',');
                    var startAge = ageList[0];
                    var endAge = ageList[ageList.length - 1];
                    if (startAge != '18'){
                        $('#startAge').val(startAge);
                    }else{
                        $('#startAge').val('');
                    }
                    if(endAge != '60'){
                        $('#endAge').val(endAge);
                    }else{
                         $('#endAge').val('');
                    }
                }else{
                    $('#startAge').val('');
                    $('#endAge').val('');
                }
                $('#company_name').val(data.company_name);
                if(data.current_area != null && data.current_area != ''){
                    $('#current_area').val(data.current_area.split('**')[0]);
                    $('#current_area').next().val(data.current_area.split('**')[1]);
                }else{
                    $('#current_area').val('');
                    $('#current_area').next().val('');
                }
                //工作经验
                if(data.work_year == null || data.work_year == '0'){
                    $('.exen_p').attr('data-value', '');
                    $('.exen_p').text('工作经验');
                    $('.exen_p').append(' <img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
                }else{
                    $('.xl_work li[value="'+data.work_year+'"]').click();
                }
                //期望年薪
                if(data.expected_salary == null || data.expected_salary == '0'){
                    $('.pay_p').attr('data-value', '');
                    $('.pay_p').text('期望年薪');
                    $('.pay_p').append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
                }else{
                    $('.xl_expec li[value="'+data.expected_salary+'"]').click();
                }
                //学历
                if(data.diploma == null || data.diploma == '0'){
                    $('.claim_p').attr('data-value', '');
                    $('.claim_p').text('学历要求');
                    $('.claim_p').append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
                }else{
                    $('.xl_mes1 li[value="'+data.diploma+'"]').click();
                }
                //简历类型
                if(data.married == null || data.married == '0'){
                    $('.resu_p').attr('data-value', '');
                    $('.resu_p').text('简历类别');
                    $('.resu_p').append('<img src="/static/images/new_images/xl.png" alt="" class="claim_img">');
                }else{
                    $('.xl_cate li[value="'+data.married+'"]').click();
                }

                searchDataDeal('search');
            }
        }
    })
}
//推荐职位时判断是否设置了允许推荐
function recommend(isInvite, source_id, resume_id, resume_name, resume_source){
    if(isInvite == '1'){
        o_show('yq', source_id, '', resume_id, resume_name, resume_source);
    }else{
        window.alert('该简历不接受推荐职位',4);
    }
}
//关注和取消关注
function attentionOperate(obj, source_id){
    if(validStatus != '3'){
        doAlertToAudit(validStatus);
        return false;
    }
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
                $(obj).text('取消关注');
                $(obj).attr('data-value', data.groupId);
                window.alert('关注成功',1);
            }else if(data.msg && data.msg == '取消关注成功！'){
                $(obj).empty();
                $(obj).append('<i></i>关注');
                window.alert(data.msg,4);
            }
        }
    })
}
//收藏简历
function collectResume(obj, resumeId){
    var groupId = $(obj).attr('data-value');
    var content = $(obj).text();
    if(content == '收藏'){
        $.ajax({
            type: "POST",
            url: "/ajax_collectResume",
            data: {"resumeId": resumeId},
            dataType: "json",
            success: function (data) {
                if(data.msg == 'success'){
                    $(obj).text('已收藏');
                    $(obj).attr('data-value', data.groupId);
                    window.alert('收藏成功',1);
                }else if(data.msg == 'exist'){
                    window.alert('你已收藏该简历，无需收藏！',4);
                }else{
                    window.alert(data.msg,4);
                }
            }
        })
    }else{
        $.ajax({
            type: "POST",
            url: "/ajax_deleteResume",
            data: {"resumeId": resumeId, 'groupId': groupId, 'deleteType': '2'},
            dataType: "json",
            success: function (data) {
                if(data.msg == 'success'){
                    $(obj).text('收藏');
                    window.alert('取消收藏成功',1);
                }
            }
        })
    }

}
//转发简历
 function judgeForwardResume(resumeId){
     if(validStatus != '3'){
        doAlertToAudit(validStatus);
        return false;
    }else{
         doForwardResume([resumeId]);
     }
 }
//查看简历
function viewResume(resumeId){
    var name_obj = $('span[onclick="viewResume('+resumeId+')"]');
    if(!name_obj.hasClass('active')){
        name_obj.addClass('active');
    }
    name_obj.parent().children('i').css('display','');
    window.open('/resume/new_jlyl?type=souSuo&resumeID=' + resumeId, '_blank');
}
//批量查看简历
function browseResume(){
    var checkboxes = $("#tableInfo input[type='checkbox']:checked");
    if(checkboxes.length == 0){
        window.alert('请选择要查看的简历',4);
        return;
    }
    for(var m = 0; m < checkboxes.length;m++){
        window.open('/resume/new_jlyl?resumeID=' + checkboxes.eq(m).val(), '_blank');
    }
}
//翻页
function pageTurn(type){
    var indexPage = $('.page_right').children('span').text();
    var pageCount = $('.page_right').children('b').text();
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
}
$(function(){
    $(".crit_add").mouseleave(function(event) {
        $(this).children('ul').slideUp(150);
    });
});
