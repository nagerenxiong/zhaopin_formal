var loadData;    var grbq_this = 0;
var file_website = '';
$(function() {
    file_website = $('#file_website').val();
    queryCompany();
    $(".selectControl span").click(function(event) {
        $(this).siblings('ul').slideToggle(150)
    });
     $(".selectControlList li").click(function(event) {
         $(this).parent().siblings('span').html($(this).text()+"<i class=\"iconfont icon-xia1\"></i>");
         $(this).parent().parent().attr('data-key', $(this).attr('data-key'));
         $(this).parent().parent().attr('data-value', $(this).text());
         $(this).parent().slideUp(150);
     });
    //职位分页
    var sqlposition = "source_id="+ $("#pu_id").val() +" and  position_status=1 order by add_date desc";
    loadData = new pagin("positionPaginInfo", "V_Position_Search", "", encodeURI(sqlposition), "", 5, "positionPagin", "loadData");

    $(".grjj").keydown(function(event) {
        $(this).siblings('span').children('i').text($(this).val().length);
    });
    $(".grjj").keyup(function(event) {
        $(this).siblings('span').children('i').text($(this).val().length);
    });
    if(typeof($(".grjj").val())  == "undefined")
        $(".grjj").siblings('span').children('i').text(0);
    else
        $(".grjj").siblings('span').children('i').text($(".grjj").val().length);

    $(".grjj").keydown(function(event) {
        $(this).siblings('span').children('i').text($(this).val().length);
    });
    $(".grjj").keyup(function(event) {
        $(this).siblings('span').children('i').text($(this).val().length);
    });

    $(".grjj").siblings('span').children('i').text($(".grjj").val().length);

    $("#positionType li").click(function(){
        var positionType = $(this).attr("data");
        if(positionType != "all") {
            sqlposition = "source_id=" + $("#pu_id").val() + " and  position_status=1 and Postaion_Type = \"" + positionType + "\" order by add_date desc";
        }
        loadData = new pagin("positionPaginInfo", "V_Position_Search", "", encodeURI(sqlposition), " last_update_date desc", 5, "positionPagin", "loadData");
    });

    //头部点击编辑事件
    $(".jbxx .r .cz").click(function () {
        $(".jbxx").hide();
        $(".grxxbj").show();
        BusinessulControls("edit_businessname",$("#businessname").text() ,$("#business").val() , 'width:274px;padding-left:20px;');
        PositionControls("edit_postname",$("#postname").text() ,$("#post").val() , 'width:274px;padding-left:20px;', true);

        $("#edit_introduction").val($("#introduction").text());
        $("#edit_business").val($("#business").val());
        $("#edit_post").val($("#post").val());

        //点击个人信息编辑中的取消
        $(".grxxbj .cancel").click(function () {
            $(".jbxx").show()
            $(".grxxbj").hide();
        })
    })
    //发布职位和服务评价切换
    $(".qh li").click(function (event) {
        var index = $(this).index();
        $(this).siblings().removeClass("active");
        $(this).addClass('active');
        $(".qh").siblings('div').hide();
        if (index == 0) {
            $(".fbdzw").show();

        }
        else {
            $(".fwpj").show();
        }
    });
    //发布职位搜索条件
    $(".fbdzw .sstj li").on("click", function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    })
    //点击回复
    $(".pjxq li").each(function () {
        var _this = $(this);
        $(this).find("p.cur span").eq(0).on("click", function () {
            $(this).hide();
            $(this).siblings('span').show();
            _this.find("div.hf").show();
            //最多300字
            _this.find("div.hf").find("textarea").keyup(function () {
                var tlen = $(this).val().length;
                if (tlen > 300) {
                    $(this).val($(this).val().substring(0, 300));
                }
            });
            $(this).siblings('span').on("click", function () {
                $(this).hide();
                $(this).siblings('span').show();
                _this.find("div.hf").hide();
                _this.find("div.hf").find("textarea").val("");
            })
        })

    })

    //点击基本信息编辑
    $(".ybjbxx h2 span:eq(0)").on("click", function () {
        var _this = $(this);
        $(this).siblings('span').show();
        $(this).hide();
        $(".ybjbxx .xxlb").hide();
        $(".ybjbxx .jbxxbj").show();

        //设置地点
        $("#edit_location").val($("#location").val());
        $("#edit_locationname").val($("#locationname").text());
        //设置头衔
        $("#edit_headhunt_level").attr({
            "data-key":$("#headhunt_level").val(),
            "data-value":$("#headhunt_levelname").text()
        });
        $("#edit_headhunt_levelname").html($("#headhunt_levelname").text()+"<i class='iconfont icon-xia1'></i>");

        //设置工作年限
        $("#edit_working_time").attr({
            "data-key":$("#working_time").val(),
            "data-value":$("#work_timename").text()
        });
        $("#edit_work_timename").html($("#work_timename").text()+"<i class='iconfont icon-xia1'></i>");

        //点击头部取消
        $(this).siblings('span').on("click", function () {
            $(this).siblings('span').show();
            $(this).hide();
            $(".ybjbxx .jbxxbj").hide();
            $(".ybjbxx .xxlb").show();
        })
        //点击编辑框中取消
        $(".jbxxbj .cancel").click(function () {
            _this.show();
            _this.siblings('span').hide();
            $(".xxlb").show();
            $(".jbxxbj").hide();
        })
    })
    //点击个人标签编辑

    $(".grbq h2 span:eq(0)").on("click", function () {
         grbq_this= $(this);
        $(this).siblings('span').show();
        $(this).hide();
        $(".grbq .bqxx").hide();
        $(".grbq .grbqbj").show();
        //点击头部取消
        $(this).siblings('span').on("click", function () {
            $(this).siblings('span').show();
            $(this).hide();
            $(".grbq .grbqbj").hide();
            $(".grbq .bqxx").show();
        })
        //点击编辑框中取消
        $(".grbqbj .cancel").click(function () {
            
            $(".bqxx").show();
            $(".grbqbj").hide();
            $(".grbq .cur").show();
        })
        //获取猎头标签
        $.ajax({
            type: "POST",
            url: "/ajax_dictionary",
            data: {
                "p_value": '12001000'
            },
            dataType: "json",
            success: function(data){
                labelData = data;
                changeLabel();
            }
        });
        //设置自己的标签
        $("#edit_labels").empty();
        $("#lables li").each(function(){
            $("#edit_labels").append("<li>"+ $(this).text() +"</li>");
        })

    })
    //个人标签最多8个
    $(document).on('click', '#edit_labels li', function () {
            $(this).remove();
    })
    $(document).on('click', '#jlTag li', function () {
        var _this = $(this);
        var i = false;
        if ($("#edit_labels li").length < 8){
            $("#edit_labels li").each(function(index, el) {
                if($(this).text()!=_this.text()){

                }else{
                    i=true;
                }
            });
            if(i == false){
                $("#edit_labels").append(_this);
            }else{
                alert("已有此标签",4);
            }

        }
    })
    $("#jl_tag_button").click(function () {
        var _this = $(this).siblings('input');
        var i = false;
        var val = $(this).prev().val();
        if (val != "" && $("#edit_labels li").length < 8) {
            $("#edit_labels li").each(function(index, el) {
                if($(this).text()!=_this.val()){

                }else{
                    i=true;
                }
            });
             if(i == false){
                $("#edit_labels").append('<li>' + val + '</li>');
                $(this).prev().val('');
            }else{
                alert("已有此标签",4);
            }
        }
    })

    //服务过的企业
    //点击添加
    $(".fwgdqy h2 span:eq(0)").on("click", function () {
        if($("#serve_company li").length > 10){
            alert("您最多只能添加10个服务过的企业",4);
        }
        var _this = $(this);
        $(this).hide().siblings('span').show();
        $(".fwqylb").hide();
        $(".fwqybj").show().find('.gs_input_txt').val("").parent().next().children('b').hide();
        //点击头部取消
        $(this).siblings('span').on("click", function () {
           $(".fwqybj").hide();
           $(".fwqylb").show();
           $(this).hide().siblings('span').show();
        })
        objCompany = null;
    })
    //点击编辑框中取消
    $(".fwqybj").find(".cancel").click(function () {
       $(".fwqybj").hide();
       $(".fwqylb").show();
       $(".fwgdqy>h2>span").css('display', 'none').eq(0).css('display', 'inline');
    })
    //点击编辑
    $(".fwqylb").on("click",".fwqyxx span.cur",function () {
        $(".fwqylb").hide();
        $(".fwqybj").show().find('.gs_input_txt').val($.trim($(this).parent().siblings('div.fwqymc').text())).parent().next().children('b').show();
    })

    var pu_id = $("#pu_id").val();
    //  猎头服务评价
    $(".headhuntEvaluation").click(function(){
        $(".fbdzw").hide();
        $(".publicPositionLi").removeClass("active");
        $(this).addClass("active");
        $(".fwpj").show();
        // 评论分页
        var sql2 = " Object_Type=2 and evaluation_object_id=" + pu_id + "  order by add_date desc";
        loadData = new pagin("evaluationPaginInfo", "V_AJ_Evaluation", "", encodeURI(sql2), "", 10, "evaluationBind", "loadData");
    });
    // 按照星级进行评论分页
    $(".evaluationStar").click(function(){
        var stars = $(this).find(".starb1").length;
        // 评论分页
        var sql2 = " Object_Type=2 and evaluation_object_id=" + pu_id + " and Evaluation_Value=" + stars + " order by add_date desc";
        loadData = new pagin("evaluationPaginInfo", "V_AJ_Evaluation", "", encodeURI(sql2), "", 10, "evaluationBind", "loadData");
    })
})

//  职位分页
function positionPagin(dataInfo) {
    $("#positionsPaginBody").empty();
    var content = '';
    $(dataInfo).each(function(i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for (var n = 0; n < len; n++) {
            if (array[n] == null) {
                array[n] = "&nbsp;"
            }
        }
        content += '<li onclick="viewPosition('+array[0]+')">';
        content += '    <div class="f_l">';
        content += '        <h2>';
        content += '            <span class="nowrap" style="max-width:85%;">' + array[3] + '</span><span class="gold">' + array[19] + '</span>';
        if(array[30] != '&nbsp;' && array[30] != '0' && array[30] != 0){
            content += '<span class="gold">【赏金：' + array[30] + '】</span>';
        }
        content += '        </h2>';
        content += '        <p class="c_33 gs">' + array[55] +'</p>';
        if($.trim(array[23])=="" || $.trim(array[23])=="&nbsp;")
            array[23] ="经验不限";
        if($.trim(array[26])=="" || $.trim(array[26])=="&nbsp;")
            array[26] ="学历不限";
        content += '        <p class="c_99 clearfix">' + array[14] + '|' + array[23] + '|' + array[26] + '|' + array[10] + '|' + array[8];
        // 格式化时间
        var suitTime = array[52];
        if(suitTime != '' && suitTime.length >= 10) {
            suitTime = suitTime.substr(0, 10);
        }
        content += '           <span class="f_r"><i class="iconfont icon-shijian"></i>' + suitTime + '  发布</span>';
        content += '        </p>';
        content += '    </div>';
        content += '</li>';
    });
    $("#positionsPaginBody").append(content);
}

//职位查看
function viewPosition(positionId){
    window.open('/resume/zwxq?positionId=' + positionId, '_blank');
}

//保存猎头信息
function baseSave(obj,type){
    var _this = grbq_this;
    if(type == 1) {
        var introduction = $("#edit_introduction").val();
        var business = $("#edit_business").val();
        var post = $("#edit_post").val();

        if (introduction == "") {
            alert("请填写自我描述",4);
            return;
        }
        if (business == "") {
            alert("请选择擅长行业",4);
            return;
        }
        if (post == "") {
            alert("请选择擅长职位",4);
            return;
        }
        $.ajax({
            type: "POST",
            url: "/ajax_saveHeadhunter",
            data: {
                "headhuntID": $("#headhuntID").val(),
                "introduction": introduction,
                "business": business,
                "post": post,
                "type": 1
            },
            dataType: "json",
            success: function (data) {
                if (data.msg == "success") {
                    $("#introduction").text(introduction);
                    var businessname = "";
                    $("#edit_businessname").children("span").each(function (i) {
                        if (i == 0) {
                            businessname = $(this).text();
                        }
                        else {
                            businessname += "," + $(this).text();
                        }
                    })
                    $("#businessname").text(businessname);
                    $("#business").val($("#edit_business").val());
                    //期望职位
                    var postname = "";
                    $("#edit_postname").children("span").each(function (i) {
                        if (i == 0) {
                            postname = $(this).text();
                        }
                        else {
                            postname += "," + $(this).text();
                        }
                    })
                    $("#postname").text(postname);
                    $("#post").val($("#edit_post").val());
                    edit_cancel(obj);

                }
                else {
                    alert("保存失败",2);
                }
            }
        });
    }
    else if(type == 2){
        var location = $("#edit_location").val();
        var headhunt_level = $("#edit_headhunt_level").attr("data-key");
        var working_time = $("#edit_working_time").attr("data-key");

        if (location == "") {
            alert("请选择服务范围",4);
            return;
        }
        if (headhunt_level == "") {
            alert("请选择头衔",4);
            return;
        }
        if (working_time == "") {
            alert("请选择工作年限",4);
            return;
        }
        $.ajax({
            type: "POST",
            url: "/ajax_saveHeadhunter",
            data: {
                "headhuntID": $("#headhuntID").val(),
                "location": location,
                "headhunt_level": headhunt_level,
                "working_time": working_time,
                "type": 2
            },
            dataType: "json",
            success: function (data) {
                if (data.msg == "success") {
                    //设置地点
                    $("#location").val($("#edit_location").val());
                    $("#locationname").text($("#edit_locationname").val());
                    //设置头衔
                    $("#headhunt_level").val($("#edit_headhunt_level").attr("data-key"));
                    $("#headhunt_levelname").text($("#edit_headhunt_level").attr("data-value"));
                    //设置工作年限
                    $("#working_time").val($("#edit_working_time").attr("data-key"));
                    $("#work_timename").text($("#edit_working_time").attr("data-value"));
                    $(obj).parent().parent().siblings('h2').children('span').eq(0).removeClass('dis').css('display', 'inline').next('span').addClass('dis').css('display', 'none');
                    edit_cancel(obj);
                }
                else {
                    alert("保存失败",2);
                }
            }
        });
    }
    else if(type == 3) {
        var labels = "";
        $("#edit_labels li").each(function () {
            if (labels == "") {
                labels = $(this).text();
            }
            else {
                labels += "**" + $(this).text();
            }
        })
        $.ajax({
            type: "POST",
            url: "/ajax_saveHeadhunter",
            data: {
                "pu_id": $("#pu_id").val(),
                "labels": labels,
                "type": 3
            },
            dataType: "json",
            success: function (data) {
                if (data.msg == "success") {
                    //设置标签
                    $("#lables").empty();

                    $("#edit_labels li").each(function () {
                        $("#lables").append("<li>" + $(this).text() + "</li>");
                    })

                    _this.show();
                    _this.siblings('span').hide();
                    $(".bqxx").show();
                    $(".grbqbj").hide();

                    edit_cancel(obj);
                }
                else {
                    alert("保存失败",2);
                }
            }
        });
    }
}
// 服务过的企业删除
function fwgdqy_sc(obj){
    //编辑企业
        var company_name = $("#edit_company").val();
        var value = parseInt($(objCompany).parent().prev().children("input:hidden").val());

        //组装服务企业
        var server_company = "";
        $("#serve_company li").each(function(i){
            var company = $(this).find("span").eq(0).text();
            if(i != value) {
                if (server_company == "") {
                    server_company = company;
                }
                else {
                    server_company += "**" + company;
                }
            }
        });

        $.ajax({
            type: "POST",
            url: "/ajax_saveServerCompany",
            data: {
                "headhuntID": $("#headhuntID").val(),
                "serve_company": server_company
            },
            dataType: "json",
            success: function (data) {
                if (data.msg == "success") {
                    $(objCompany).parent().parent().parent().remove();

                    edit_cancel(obj);
                }
                else {
                    alert("保存失败",2);
                }
            }
        })
}
//编辑模块取消方法
function edit_cancel(obj){
    $(obj).parent().parent().parent().children().show();
    $(obj).parent().parent().hide();
}

var pageIndex = 1;
var labelData;
//换一换标签
function changeLabel(){
    $("#jlTag").empty();
    var count = pageIndex * 8;

    if(count >= labelData.length){
        count = labelData.length;
        for(var i=(pageIndex-1)*8; i < count; i++){
            $("#jlTag").append("<li>"+ labelData[i].dictionary_name +"</li>");
        }
        pageIndex = 1;
    }
    else{
        for(var i=(pageIndex-1)*8; i < count; i++){
            $("#jlTag").append("<li>"+ labelData[i].dictionary_name +"</li>");
        }
        pageIndex++;
    }
}
//服务企业编辑方法
function edit_server_company(obj){
    var _this = $(obj);
    $(this).find(".fwqyxx span.cur").on("click", function () {
        var _this = $(this);
        $(".fwqylb").hide();
        $(".fwqybj").show().find('.gs_input_txt').val($.trim($(this).parent().siblings('div.fwqymc').text())).parent().next().children('b').show();

    })
    objCompany = obj;
}

//保存服务企业
var objCompany;
function server_companySave(obj){
    if(objCompany == null){
        //添加企业
        var company = $("#edit_company").val();

        if(company == ""){
            alert("请输入企业名称",4);
            return;
        }
        //组装服务企业
        var server_company = "";
        $("#serve_company li").each(function(){
            var company = $(this).find("span").eq(0).text();
            if(server_company == ""){
                server_company = company;
            }
            else{
               server_company += "**" + company;
           }
        });

        if(server_company == ""){
            server_company = company;
        }
        else{
            server_company = server_company + "**" + company;
        }

        $.ajax({
            type: "POST",
            url: "/ajax_saveServerCompany",
            data: {
                "headhuntID": $("#headhuntID").val(),
                "serve_company": server_company
            },
            dataType: "json",
            success: function (data) {
                if (data.msg == "success") {
                    var html = "";
                    html += '<li class="fwqy">';
					html += '			<div class="clearfix fwqyxx">';
					html += '				<div class="f_l fwqymc" >';
					html += company;
					html += '				</div>';
					html += '				<div class="f_r">';
					html += '					<span class="c_99 f_r cur" onclick="edit_server_company(this)"><i class="iconfont icon-xiugaiziliao"></i>编辑</span>';
					html += '				</div>';
					html += '			</div>';
					html += '		</li>';
                    $("#serve_company").append(html);

                    $(".fwqybj").hide();
                    $(".fwqylb").show();
                    $(".fwgdqy>h2>span").css('display', 'none').eq(0).css('display', 'inline');

                    edit_cancel(obj);
                }
                else {
                    alert("保存失败",2);
                }
            }
        });
    }
    else{
        //编辑企业
        var company_name = $("#edit_company").val();
        var value = parseInt($(objCompany).parent().prev().children("input:hidden").val());

        if(company_name == ""){
            alert("请输入企业名称",4);
            return;
        }
        //组装服务企业
        var server_company = "";
        $("#serve_company li").each(function(i){
            var company = $(this).find("span").eq(0).text();
            if(i == value){
                company = company_name;
            }
            if(server_company == ""){
                server_company = company;
            }
            else{
               server_company += "**" + company;
           }
        });

        $.ajax({
            type: "POST",
            url: "/ajax_saveServerCompany",
            data: {
                "headhuntID": $("#headhuntID").val(),
                "serve_company": server_company
            },
            dataType: "json",
            success: function (data) {
                if (data.msg == "success") {
                    $("#serve_company").find("li").eq(value).find("span").eq(0).text(company_name);

                    $(".fwqybj").hide();
                    $(".fwqylb").show();
                    $(".fwgdqy>h2>span").css('display', 'none').eq(0).css('display', 'inline');

                    edit_cancel(obj);
                }
                else {
                    alert("保存失败",2);
                }
            }
        })
    }
}
//搜索公司
function queryCompany() {
    var condition = $('#queryCondition').val();
    $.ajax({
        type: "POST",
        url: "/jobs/resume/ajax_queryCompany",
        data: {
            "condition": condition,
            "pc_type": 2
        },
        dataType: "json",
        success: function (data) {
            $('#companyul').children().remove();
            for (var i = 0; i < data.length; i++) {
                var company = data[i];
                var em = '<li class="clearfix"><div class="ssqy_box f_l"><img src="'+file_website+company.pc_logo+'" alt="" onerror="notfind(this, 2)" ></div><div class="f_l ml15" style="text-align: left;_display:inline"><div>' + company.pc_name + '</div>';
                em += '<div class="mt10"><input type="button" name="" value="确认申请" onclick="applyJoinCompany(' + company.id + ')" style="width:68px;height:24px;color:white;text-align: center;line-height: 24px;background:#5C91D9;border:none"></div></div></li>';
                $('#companyul').append(em);
            }
        }
    });
}
//申请加入公司
function applyJoinCompany(companyId){
    if($("#isApplyedJoinCompany").val() != '') {
        alert("您已经申请过加入企业，不能再次申请!",2)
        return false;
    }
    if(confirm("你只能申请加入一个企业，你确定要加入该企业吗？")){
        $.ajax({
            type: "POST",
            url: "/ajax_applyJoinCompany",
            data: {"companyId": companyId},
            dataType: "json",
            success: function (data) {
                if (data.msg == 'success') {
                    window.alert("您的申请已接受，请耐心等待管理员的审核！",1);
                    $(".join_company").empty().removeAttr('data-toggle').removeAttr('data-target').addClass('join_company').append('加入企业审核中');
                    $(".closeSearchCompanyDialog").click();
                    $("#isApplyedJoinCompany").val('applyedJoinCompany')

                } else {
                    window.alert(data.msg,4);
                }
            }
        })
    }
}

//  猎头服务评价
function evaluationBind(dataInfo) {
    $("#evaluationUl").empty();
    var content = '';
    $(dataInfo).each(function(i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for (var n = 0; n < len; n++) {
            if (array[n] == null) {
                array[n] = "&nbsp;"
            }
        }
        content += '<li >';
        content += '    <div class="clearfix">';
        content += '        <div class="f_l pjzp">';
        content += '            <img src="'+file_website + array[10] + '" alt="" onerror="notfind(this, 1, \'' + array[11] + '\')" />';
        content += '         </div>';
        content += '         <div class="f_l">';
        content += '            <p>';
        if(array[4] == 1) {
            content += '                <span class="w6">匿名用户</span>';
        } else {
            content += '                <span class="w6">' + array[9] + '</span>';
        }
        content += '                    <span class="star">';
        if(array[5] != '') {
            for(var i = 0; i < 5; i++) {
                if(i < array[5]) content += '<i class="starb1"></i>';
                else content += '<i class="starb"></i>';
            }
        }
        content += '                     </span>';
        content += '              </p>';
        content += '              <p>' + array[6] + '</p>';
        content += '           </div>';
        content += '           <div class="f_r">';
        var suitTime = array[8];
        if(suitTime != '' && suitTime.length >= 10) {
            suitTime = suitTime.substr(0, 10);
        }
        content += '               <p class="c_99">' + suitTime + '</p>';
        content += '            </div>';
        content += '        </div>';
        content += ' </li>'
    })
    $("#evaluationUl").append(content);
}

function exit_company(){
    $.ajax({
        type: "POST",
        url: "/ajax_quitJoinCompany",
        dataType: "json",
        success: function (data) {
            if (data == '1') {
                window.alert("您的申请已接受，请耐心等待管理员的审核！",1);
                $(".quitCompanySpan").empty().removeAttr('data-toggle').removeAttr('data-target').append("退出企业审核中")
            } else {
                window.alert('申请失败',2);
            }
        }
    })
}

$(".isAuditingJoinCompany").click(function(){
    hint("您提交的加入企业信息正在审核中，请您耐心等候");
});

// 弹出不能加入其他企业的弹框
function alertJoinCompanyDialog(obj) {
    var status = $(obj).attr("name");
    if(status == '2') {
        hint("您的个人信息尚未认证通过，通过后才能申请加入企业！");
    } else {
        hint("您已经是企业经纪人角色，不能加入其它企业!");
    }
}