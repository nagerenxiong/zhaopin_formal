// 显示推荐弹框
// pu*d 为发送者Id, idArrays 为接收者id数组
function showInviteDialog(puId, idArrays){
    <!-- ---------------------------------推荐弹框--------------------------------- -->
    $("#yqzd").remove();
    var html = '';
    html += '<div id="yqzd">';
    html += '   <div class="omark"></div>';
    html += '	<div class="yqzd">';
    html += '	    <div class="center">';
    html += '           <div class="header" style="overflow:hidden;">';
    html += '               <div class="f_l">';
    html += '                   推荐菜单';
    html += '               </div>';
    html += '     <div class="close" style="font-size: 30px!important;color: #888; opacity: 1; font-weight: normal;" data-dismiss="modal" onclick="removeDialog()">×</div>';
    html += '           </div>';
    html += '           <div class="qx">';
    html += '               <input type="checkbox" id="qx" class="checkAll" onclick="checkAll(this)">';
    html += '               <label for="qx">全选</label>';
    html += '           </div>';
    html += '           <div style="width:103%;overflow:auto;margin-left:-10px;">';
    html += '               <ul class="main" id="tableInfoForInvite"></ul>';
    html += '           </div>';
    html += '           <input type="button" value="确定" onclick="inviteResumeOwner()" id="ok">';
    html += '       </div>';
    html += '   </div>';
    html += '</div>';
    $("body").append(html);

    $("#ok").attr("name", idArrays);
    var sql = "source_id = " + puId ;
    var loadData = new pagin("paginInfo", "V_Position_Search", "", sql, "", 100, "invitePaginBind", "loadData");
}

// 点击 ‘X’关闭弹框
function removeDialog(){
    $("#yqzd").hide();
}


//全选事件
function checkAll(obj){
    var checkboxes = $("#tableInfoForInvite input[type='checkbox']");
    if($(obj).is(":checked")){
         for(var i = 0;i < checkboxes.length; i ++){
            checkboxes[i].checked = true;
        }
    }else{
        for(var i = 0;i < checkboxes.length; i ++){
            checkboxes[i].checked = false;
        }
    }
}

// 点击推荐按钮
function inviteResumeOwner(){
    $("#yqzd").css("display","none");
    var $checkboxs = $("#tableInfoForInvite input[type='checkbox']:checked");
    if($checkboxs.length == 0){
        alert("请选择职位在进行推荐!");
        return;
    }
//    var context = "";
//    for(var i = 0; i < $checkboxs.length; i ++){
//        context += "<a href='/jobs/position/zwyl?positionId=" + $checkboxs.eq(i).attr("name") + "'>" + $checkboxs.eq(i).val() + "</a>&nbsp;&nbsp;";
//    }
    var positionIds = [];
    for(var i = 0; i < $checkboxs.length; i ++){
        positionIds.push($checkboxs.eq(i).attr("name"))
    }
    var attentionIds = $("#ok").attr("name").split(",");
    $.ajax({
        async: false,
        data: {"attentionIds": attentionIds, "positionIds": positionIds}, //"letterContent": context,
        url: "/ajax_sendPositionRecommendMessage",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.status == '1') {
                alert("职位邀请成功!");
            } else if(data.status == '2') {
                alert('您今天已经为此用户推荐过该职位了！')
            } else if(data.status == '0') {
                alert("发送内部错误")
            }
        }
    })
}


function invitePaginBind(dataInfo){
    $("#tableInfoForInvite").empty();
    $(dataInfo).each(function(i) {
        var array = $(this);
        for(var i = 0; i < array.length; i ++){
            if(array[i] == "" || array[i] == null){
                array[i] = "&nbsp;"
            }
        }
        var context = "";
        context += '<li>';
        context += '    <input type="checkbox" id="qx" name=' + array[0] + ' value=' + array[3] + '>';
        context += '    <div class="content">';
        context += '        <h2>' + array[3] + '<span>' + array[19] + '</span>&nbsp;</h2>';
        context += '        <p>'+ array[14] +'&nbsp;丨&nbsp;' + array[23] + '&nbsp;丨&nbsp;' + array[26] + '&nbsp;丨&nbsp;' + array[65] + '</p>';
        context += '    </div>';
        context += '</li>';
       $("#tableInfoForInvite").append(context);
    })
}
