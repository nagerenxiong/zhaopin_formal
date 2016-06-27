/**
 * Created by zhoujia on 2015-08-05.
 * 简历投递
 */

/*    
*   positonID: 要投递的职位ID
*   puID: 需要匹配的所属人ID
*/
function deliverResumes(positionID,puID){
    $("#deliverResumes").remove();

    var html = "";
    html += '<div class="modal fade" id="deliverResumes" tabindex="-1" role="dialog"aria-labelledby="myModalLabel" aria-hidden="true">';
    html += '    <div class="modal-dialog"style="width:1170px">';
    html += '        <div class="modal-content" style="width:780px;float:left; height:550px;">';
    html += '            <div class="modal-header">                   ';
    html += '                <h4 class="modal-title" id="myModalLabel">投递简历<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></h4>';
    html += '            </div>';
    html += '            <div class="modal-body">  ';
    html += '                <div class="tdjl_l_m">                  ';
    html += '                    <div class="ht25"></div>';
    html += '                    <div class="tdjl_l_l">';
    html += '                        <h2>您所投递的职位</h2>';
    html += '                        <div class="ht10"></div>';
    html += '                        <div class="jlxz_tc_l">';

    //获取职位信息
    $.ajax({
        async: false,
        type: "POST",
        url: "ajax_getPosition",
        data: {
            "position_id": positionID
        },
        dataType: "json",
        success: function (data){
            var position = $.parseJSON(data.dataInfo);
            var pc_name = position.pc_name, position_name = position.position_name, postaion_typename = position.postaion_typename, payname = position.payname;
            var work_areaname = position.work_areaname, work_yearname = position.work_yearname, diplomaname = position.diplomaname;
            if(pc_name == null || pc_name == ""){
                pc_name = "&nbsp;"
            }
            if(position_name == null || position_name == ""){
                position_name = "&nbsp;"
            }
            if(postaion_typename == null || postaion_typename == ""){
                postaion_typename = "&nbsp;"
            }
            if(payname == null || payname == ""){
                payname = "&nbsp;"
            }
            if(work_areaname == null || work_areaname == ""){
                work_areaname = "&nbsp;"
            }
            if(work_yearname == null || work_yearname == ""){
                work_yearname = "经验不限"
            }
            if(diplomaname == null || diplomaname == ""){
                diplomaname = "学历不限"
            }
            if(position.pc_logo ==null || position.pc_logo =="")
            {
                position.pc_logo="/static/images/qy_logo.png";
            }
            html += '                            <img src="' + position.pc_logo + '" onerror="notfind(this, 2)">';
            html += '                            <div class="jl_wb_sm">';
            html += '                                <h3>' + pc_name + '</h3>';
            html += '                                <div class="ht10"></div>';
            html += '                                <p>' + position_name + '</p>';
            html += '                                <div class="ht10"></div>';
            html += '                                <p>' + postaion_typename + '</p>';
            html += '                            </div>                               ';
            html += '                            <div class="clear"></div>';
            html += '                            <div class="jldz_gzjs">';
            html += '                                <p><b style="color:#5c91d9;font-weight:normal;">';
            if (position.position_source == 1) {
                html += '【企业直招】';
                html += '</b><font style="color:#ff8800;">'+ payname +'</font></p>    ';
            }
            else{
                // html += ' 【经纪人发布】';
                html += '</b><font style="color:#ff8800; margin-left:20px;">'+ payname +'</font></p>    ';
            }
          
            html += '<p> ' + work_areaname +
                ' | ' + work_yearname +
                ' | ' + diplomaname +
                ' | ' + position.last_update_date.substring(0, 10) +
                '发布</p>';

            var labelStr = '';
            if(position.highlights != null){
                var labellist = position.highlights.split('**', 4);
                for(var l = 0;l < labellist.length;l++){
                    if($.trim(labellist[l])!="" && $.trim(labellist[l]) !="&nbsp;")
                        labelStr += '<span>'+labellist[l]+'</span>';
                }
            }

            html += '                                <p>'+ labelStr +'</p>';
            html += '                            </div>';
            html += '                        </div>';
            html += '                    </div>';
            html += '                    <div class="tdjl_l_r" style="width:370px">';
            html += '                        <h2>您选择的简历</h2>';
            html += '                        <div class="ht10"></div>';
            html += '                        <div class="jl_item">';
            html += '                            <ul id="selectResumes">';
            html += '                            </ul>';
            html += '                        </div>';
            html += '                    </div>';
            html += '                    <div class="clear"></div>                       ';
            html += '                </div>';
            html += '                <p class="tdjl_btn_z"><a class="btn_qrtd" href="javascript:void(0);" onclick="sendResumes('+ position.source_id +','+ position.id +')">确认投递</a></p>';
        }
    });


    html += '            </div>          ';
    html += '        </div>';
    html += '        <div class="modal-content" style="width:390px;float: left;height: 550px;">';
    html += '            <div class="modal-header">';
    html += '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    html += '                <h4 class="modal-title" id="myModalLabel">简历选择</h4>';
    html += '            </div>';
    html += '            <div class="modal-body">          ';
    html += '                <div class="ht10"></div>';
    html += '                <div class="tdjl_r_main" style="margin:0px">';
    html += '                    <div class="tdjl_search">';
    html += '                        <input type="text" style="width:280px;" id="seacinput"><a class="seachdel" href="javascript:void(0);" onclick="deleteinput(this)"><img src="/static/images/ix.png"></a><a href="#" class="seachjl" href="javascript:void(0);" onclick="seachresume(this, ' + positionID + ', ' + puID + ')" style="position:absolute;right:27px;">搜索</a>';
    html += '                    </div>';
    html += '                    <div class="ht10"></div>';



   //////////////////////这里是默认的值

    html += '                    <div class="jl_item" id="defaitem">';
    html += '                        <ul>';
    //获取简历
    /*$.ajax({
        async: false,
        type: "POST",
        url: "/ajax_autoMatching",
        data: {
            "type": 2,
            "positionID": positionID,
            "pu_id": puID,
            "matchingCount": 5000
        },
        dataType: "json",
        success: function (data) {
            var positionList =data.dataInfo;
            $(positionList).each(function(){
                // 处理值为 null 的字段
                var len = $(this).length;
                var array = $(this);
                for(var n = 0; n < len; n ++){
                    if(array[n] == null){
                        array[n] = "&nbsp;"
                    }
                }

                html += '                                    <li style="margin-right: 0">';
                html += '                                        <div class="jl_user_pic">';
                if(array[4] =="" ||array[4]==null)
                {
                    array[4]="null";
                }
                html += '                                            <img style="width:60px;height:60px;cursor: pointer;" src="'+ array[4] +'" onerror="notfind(this, 1, \''+array[5]+'\')">';
                html += '                                            <input type="hidden" value="'+ array[0]+'" />';
                html += '                                        </div>';
                html += '                                        <div class="jl_user_wb" style="margin-left:10px;width:260px">';
                html += '                                            <h4>'+ array[3] ;
                html += '                                                <span>';
                if(array[5] == '男' ){
                    html += '<i class="iconfont icon-nan c_c8"></i> 男';
                }
                else{
                    html += '<i class="iconfont icon-nv c_c8"></i> 女';
                }
                html += '                                                </span>';
                html += '                                                <span class="c_c8 ml5 " style="font-size: 16px">';
                html += '匹配值:<span style="font-size: 16px" class="matchGrade">'+                                                   array[array.length-1] + '</span>%';
                html += '                                                </span>';
                html += '                                            </h4>';
                html += '                                            <p>'+ array[38] +' | '+ array[35] +' | '+ array[36] +' | '+ (parseInt(new Date().getFullYear()) - array[6]) +'岁</p>';
                html += '                                        </div>';
                html += '                                        <div class="clear"></div>';
                html += '                                        <a class="btn_jlxz_del" style="background:transparent" href="javascript:void(0);" onclick="selectResume(this,'+ array[0] +')"><img src="/static/images/tj.png"></a>';
                html += '                                    </li>';
            });
        }
    });*/
    html += '                        </ul>';
    html += '                    </div>';







/////////////////////////////////这里是搜索值
   html += '                    <div class="jl_item" id="searchitem">';
    html += '                        <ul>';
    html += '                        </ul>';
    html += '                    </div>';

    html += '                </div>';
    html += '           ';
    html += '            </div>        ';
    html += '        </div>     ';
    html += '    </div>';
    html += '</div>';

    $("body").append(html);
    var sql = 'resume_status=1 and source_id=' + puID;
    var loadData = new pagin("resumePaginInfo", "V_Resume_Info", "", encodeURI(sql), "", 500, "resumePaginInfo", "loadData", 4, positionID, 1);

    $("#deliverResumes").modal("show"); //显示弹出框
}


//选择简历
function selectResume(obj,resume_id){
    if($("#selectResumes").find("input:hidden[value='"+ resume_id +"']").length > 0){
        alert("该简历已选择！",4);
        return
    }
    else {
        var ul = $('#selectResumes');
        ul.append('<li></li>');
        var li = ul.children('li:last');
        li.append($(obj).parent().html());
        li.children('a:last').remove();
        li.append('<a class="btn_jlxz_del" href="javascript:void(0);" onclick="deleteResume(this)"><img src="/static/images/jlxz_del.png"></a>');
    }
}

function deleteResume(obj){
    $(obj).parent().remove();
}

// 删除查找简历条件按钮
function deleteinput(obj){
    $("#seacinput").val("");  
    $("#searchitem").hide();
    $("#defaitem").show();
    $(".seachdel").hide(); 
}

// 点击查找简历按钮
function seachresume(obj, positionID, puID){
    var searchResumeName = $.trim($("#seacinput").val());
    if(searchResumeName == '') {
        $("#searchitem").hide();
        $("#defaitem").show();
        return;
    }

    $(".seachdel").show();

    $("#defaitem").hide();
    $("#searchitem").show();
    var sql = 'user_name like "%' + searchResumeName + '%" and resume_status=1 and source_id=' + puID;
    sql += ' and id in (select InfoID from V_Group_Info where pu_id=' + puID + ' and group_type=4)';
    var loadData = new pagin("resumePaginInfo", "V_Resume_Info", "", encodeURI(sql), "", 500, "resumePaginInfo", "loadData", 4, positionID, 1);
}

function resumePaginInfo(data){
    var html = '';
    $(data).each(function() {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for(var n = 0; n < len; n ++){
            if(array[n] == null){
                array[n] = "&nbsp;"
            }
        }
        html += '                                    <li style="margin-right: 0">';
        html += '                                        <div class="jl_user_pic">';
        html += '                                            <img style="width:60px;height:60px;cursor: pointer;" src="'+ array[4] +'" onerror="notfind(this, 1, \''+array[5] +'\')">';
        html += '                                            <input type="hidden" value="'+ array[0] +'" />';
        html += '                                        </div>';
        html += '                                        <div class="jl_user_wb" style="margin-left:10px;width:260px">';
        html += '                                            <h4>'+ array[3];
        html += '                                                <span>';
        if(array.sex == '男' ){
            html += '<i class="iconfont icon-nan c_c8"></i> 男';
        }
        else{
            html += '<i class="iconfont icon-nv c_c8"></i> 女';
        }
        html += '                                                </span>';
        html += '                                                <span class="c_c8 ml5 " style="font-size: 16px">';
        html += '匹配值:<span style="font-size: 16px" class="matchGrade">'+ array[array.length - 1] + '</span>%';
        html += '                                                </span>';
        html += '                                            </h4>';
        html += '                                            <p>'+ array[38] +' | '+ array[35] +' | '+ array[33] +' | '+ (parseInt(new Date().getFullYear()) - array[6]) +'岁</p>';
        html += '                                        </div>';
        html += '                                        <div class="clear"></div>';
        html += '                                        <a class="btn_jlxz_del" style="background:transparent" href="javascript:void(0);" onclick="selectResume(this,'+ array[0] +')"><img src="/static/images/tj.png"></a>';
        html += '                                    </li>';
    });
    var seacinput = $("#seacinput").val();
    if(seacinput == '') {
        $("#defaitem ul").empty().append(html);
    } else {
        $("#searchitem ul").empty().append(html);
    }

}

//投递简历
function sendResumes(sourceId,positionId){
    var resumeIds = [], matchGrades = [];
    var ul = $('#selectResumes');
    var inputObj = ul.children('li').children('div').children('input');
    if(inputObj.length == 0){
        window.alert('请选择要投递的简历',4);
        return;
    }
    for(var m = 0;m < inputObj.length;m++){
        resumeIds.push(inputObj.eq(m).val());
        var matchGrade = $('#selectResumes li:eq('+ m +') .matchGrade').text();
        matchGrades.push(matchGrade);
    }

    $.ajax({
        type: "POST",
        url: "/ajax_sendResume",
        data: {"sourceId": sourceId, "positionId": positionId, "resumeIds": resumeIds, "matchGrades": matchGrades},
        dataType: "json",
        success: function (data) {
            if(data.msg == 'success'){
                window.alert('投递成功',1);

                $("#deliverResumes").modal("hide"); //关闭弹出框
            }else if(data.msg == 'exist'){
                window.alert('你已投递该职位，无需投递！',2);
            }else{
                window.alert(data.msg,4);
            }
            $('.page_tc').css("display", "none");
        }
    })
}