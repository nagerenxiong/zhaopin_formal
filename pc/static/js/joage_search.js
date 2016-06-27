/**
 * Created by King on 2015/11/11.
 */

//热门职位
var loadData;
var sqlposition = "pc_type=2 and Audit_Result=3";
getTotalTpcCount(sqlposition);
var companyId = '';
loadData = new pagin("pcPaginInfo", "V_Company", "", encodeURI(sqlposition), "", 5, "tpcPagin", "loadData");
//  企业分页方法
function tpcPagin(data) {
    var file_website = $('#file_website').val();
    $(".tpcPaginUl").empty();
    var content = '';
    $(data).each(function() {
        var array = $(this);
        for(var i = 0; i < array.length; i ++ ) {
            if(array[i] == null || array[i] == '' || array[i] == 'None') {
                array[i] = '&nbsp;';
            }
        }

    if(array[28]== null || array[28] =='' || array[28]=='&nbsp;')
    {
        array[28]=0;
    }
        content += '<li>';
        content += '    <div class="match">';
//        content += '        <div class="seds_left">';
        content += '        <div class="seds_left" onclick="window.location.href=\'/account/new_qyyl?companyId='+array[0] + '\'" style="cursor: pointer;">';
        content += '            <img src="'+ file_website +array[6]+'" alt="" class="comm_img" onerror="notfind(this, 2)">';
        content += '        </div>';
        content += '        <div class="left">';
        content += '            <div class="information">';
        content += '                <p class="comm_name"><a href="/account/new_qyyl?companyId='+array[0];
        content += '                             " target="_blank">' + array[4] + '</a>';
        content += '                    <em class="com_icon" style="cursor: pointer;" onclick="loadCompanyUrl(\''+array[25]+'\')"></em></p>';
        content += '                <p class="comm_jj">';
        content +=                      array[23];
        content += '                </p>';
        content += '                <p class="comm_nowrap" title="">';
        if(array[18] != '&nbsp;')
        content += '                    <span><i class="add_icon"></i>'+array[18]+'</span>';
        if(array[19] != '&nbsp;')
        content += '                    <span><i class="peo_icon"></i>' +array[19]+'</span>';
        if(array[20] != '&nbsp;')
        content += '                    <span><i class="gon_icon"></i>' + array[20] + '</span>';
        if(array[21] != '&nbsp;')
        content += '                    <span><i class="wan_icon"></i>'+array[21]+'</span>';
        if(array[28] != '0') {
            content += '                    <span><i class="zho_icon"></i>' + array[28] + '个招聘职位</span>';
        } else {
            content += '                    <span><i class="zho_icon"></i>暂无招聘职位</span>';
        }
        content += '                </p>';
        content += '            </div>';
        content += '        </div>';
        content += '        <div class="comm_right" data-toggle="modal" data-target="#sx_Modal" onclick="setcompanyid('+array[0]+')">';
        content += '            <a class="btn"><i class="join_ag"></i>申请加入</a>';
        content += '        </div>';
        content += '<div class="clearfix"></div>';
        content += '</div>';
        content += '</li>';
    });
    $(".tpcPaginUl").append(content);
    // 当前页
    var $page_number = $(".page_number .active");
    var currentPage = 1;
    if($page_number.length == 1) {
        currentPage = $page_number.text();
    }
    $(".currentPage").text(currentPage);

    // 热门职位的 上一步、下一步
    $(".left_icon").attr('onclick', $(".page_number li:eq(1)").attr('onclick'));
    $(".right_icon").attr('onclick', $(".page_number li:last").prev().attr('onclick'));
}

function setcompanyid(companysId){
   companyId=companysId;
}
//申请加入公司
function applyJoinCompany(){
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_applyJoinCompany",
            data: {"companyId": companyId},
            dataType: "json",
            success: function (data) {
            // data:    0.申请加入 1.加入未处理 2.加入已通过 3.退出未处理 4.退出未通过
                if (data == 0) {
                    window.location.href = '/position/joagcom'
                } else if(data == 1){
                    alert('您之前提交的申请信息正在接受审核');
                } else if(data == 2){
                    alert('您已加入过企业');
                } else if(data == 3){
                    alert('您退出企业的申请正在接受审核!');
                } else if(data == 4) {
                    alert('您已加入过企业');
                } else {
                    alert('申请失败!')
                }
                layer.close(o_confirm);
            }
        })
}

// 根据条件查询企业
function queryCompany() {
    var sqlposition = '';
    var condition = $.trim($("#condition").val());
    if(condition == '') {
        //热门职位
        $(".searchCompany").hide();
        $(".hotCompany").show();
        sqlposition = "pc_type=2 and Audit_Result=3";
        getTotalTpcCount(sqlposition);
    } else {
        //查找职位分页
        $(".hotCompany").hide();
        $(".searchCompany").show();
        var sqlposition = 'pc_type=2 and Audit_Result=3 and pc_name like \"%%' + condition + '%%\"';
        var totalPc = getTotalTpcCount(sqlposition);
        sqlposition = 'pc_type=2 and Audit_Result=3 and pc_name like \"%' + condition + '%\"';
        if(parseInt(totalPc) == 0) {
            //查找职位分页
            //fixme: 在这加入一张图片提示 没找到职位
            $(".hotCompany").hide();
            $(".searchCompany").show();
            sqlposition = 'pc_type=2 and Audit_Result=3 and pc_name like \"%' + condition + '%\"';
        }
    }
    sqlposition += ' order by PC_Level desc, add_date desc';
    loadData = new pagin("pcPaginInfo", "V_Company", "", encodeURI(sqlposition), "", 5, "tpcPagin", "loadData");
}



// 查询满足条件的总企业数
function getTotalTpcCount(sql) {
    var totalPc = 0;
    $.ajax({
        async: false,
        type: 'post',
        data: {'sql': sql},
        url: '/ajax_findSuitTpuCount',
        dataType: 'json',
        success: function(data) {
            $(".result_left").html('共<span>&nbsp;&nbsp;' + data + '家&nbsp;&nbsp;</span>公司');
            data = parseInt(data);
            if(data != 0) {
                if(data % 5 == 0)   var totalPage = data / 5;
                else                var totalPage = data / 5 + 1;
                $(".totalPage").text('/' + parseInt(totalPage));
            } else {
                $(".totalPage").text('');
            }
            totalPc = data;
        }
    });
    return totalPc;
}
//给企业网址加链接
function loadCompanyUrl(urlPath){
    //当链接不存在时，无响应
    if($.trim(urlPath) != ''){
        window.open('http://' + urlPath, '_blank');
    }
}