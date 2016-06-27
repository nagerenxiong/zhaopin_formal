function doForwardPosition(vId){
    // vId: TPositionInfo Id 数组
  $("#ozfjl").remove();
    var html = "";
    html += '<div id="ozfjl" style="display:block">';
    html += '    <div class="omark"></div>';
    html += '    <div class="ozfjl" style="height:431px!important;">';
    html += '        <h1>转发职位</h1>';
    html += '        <div class="header" style="height:40px;margin-bottom:6px; margin-top:-20px!important">';
    html += '            <ul class="group addPeopleDiv" style="border:none">';
    html += '               <span style="color:#666;">请在右侧选择职位接收人</span>';
    html += '            </ul>';
   
    html += '        </div>';
    html += '        <ul class="list" style="height:260px;width:670px;margin:0 auto;">';

    $.ajax({
        async: false,
        type: "POST",
        data: {"vId": vId},
        url: "/ajax_forwardPosition",
        dataType: "json",
        success: function(data){
            $(data).each(function(i){
                var work_yearName = this.work_yearName, position_name = this.position_name, work_area = this.work_area,
                        pay_name = this.pay_name, diploma = this.diploma;
                if(work_yearName == null || work_yearName == ""){
                    work_yearName = "&nbsp;"
                }
                if(position_name == null || position_name == ""){
                    position_name = "&nbsp;"
                }
                if(work_area == null || work_area == ""){
                    work_area = "&nbsp;"
                }
                if(pay_name == null || pay_name == ""){
                    pay_name = "&nbsp;"
                }
                if(diploma == null || diploma == ""){
                    diploma = "&nbsp;"
                }
                if(this.pc_logo == null || this.pc_logo == ""){
                    this.pc_logo = "/static/images/qy_logo.png";
                }
                html += '            <li>';
                html += '                <img class="f_l" src="' + this.pc_logo + '" alt="" width="65" height="65" style="margin-top:12px;border:none;!important;" onerror="notfind(this, 2)">';
                html += '                <div class="f_l" style="margin-top:10px">';
                html += '                   <b class="fz14">' + position_name + '</b>'
                html += '                    <p>' + pay_name + '</p>';
                html += '                    <span>' + work_area + '&nbsp;|&nbsp;' + work_yearName + '&nbsp;|&nbsp;' + diploma + '</span>';
                html += '                </div>';
                html += '                <i class="removePosition2" name="' + this.id + '" style="cursor: pointer">×</i>';
                html += '            </li>';
            })
        }
    });
    html += '        </ul>';
    html += '        <a href="javascript: void(0)" class="f_r" onclick="forwardPosition()" >发送</a>';
    html += '    </div>';
    html += '            <div style="clear:both;"></div>';
    html += '    <div class="rzfjl f_r">';
    html += '        <h1>我的联系人<span class="removeThisDialog">×</span></h1>';
    html += '        <p><input type="text" name="searchName">';
    html += '           <i class="iconfont icon-sousuo" style="color:#333;font-size:24px;" onclick="showContectButton(this)"></i>';
    html += '        </p>';
    html += '        <div style="overflow-y:auto;overflow-x:hidden;height:320px;width:250px;">';
    html += '        <div style="overflow:overlay; height:320px "><ul class="zjlxr classfyForContact" id="recentContact" >';
    html += '            <h2 onclick="showMyRecentContacts()" style="cursor: pointer"> <i class="iconfont icon-jinlingyingcaiwangtubiao12"></i> 最近联系人</h2>';
    html += '        </ul>';

    $.ajax({
        type: "POST",
        url:"/ajax_showMyContactGroup",
        dataType:"json",
        async: false,
        success: function(data){
            if(data.length > 0)
                $(data).each(function(){
                    html += '        <ul class="gryh classfyForContact">';
                    html += '            <h2 onclick="showMyContacts(' + this.id + ', this)" style="cursor: pointer"> <i class="iconfont icon-jinlingyingcaiwangtubiao12"></i>' + this.group_name  + '</h2>    ';
                    html += '        </ul>';
                })
        }
    });

    html += '    </div>   <ul class="appendSearchPeople" style="display:none"></ul>';
    html += '    </div>';
    html += '</div>';

    $("body").append(html); //添加弹出框主题
    /// 去除选中简历
     $(".removePosition2").click(function(){
         if($(".removePosition2").length == 1){
             alert("您不能去除所有职位");
             return false;
         }
        $(this).parent().remove();
    });

    // 隐藏弹出框
    $(".removeThisDialog").click(function(){
        $("#ozfjl").css("display", "none");
    })
}


// FIXME: 添加转发接收人(此处可以添加多个接收人)
/*function addContact2(obj){
    var $messageDiv = $('.addPeopleDiv');
    if($messageDiv.find("li").length == 0){
         $messageDiv.text("")
    }
    var username = $(obj).children('span').text();
    var email = $(obj).children('input:last').val();
    var em = '<li>' + username + '<span>×</span><input type="hidden" value="'+email+'" /></li>';
    if(email == ""){
        alert("此好友很懒，尚未填写邮箱信息");
        return false;
    }
    if($messageDiv.html().indexOf(email) != -1){
        window.alert('你已添加联系人：'+ username);
        return;
    }
    $messageDiv.append(em);
    $(".addPeopleDiv span").click(function(){
        $(this).parent().remove();
    })
}*/
// FIXME: 添加转发接收人(此处只能添加一个接收人)
function addContact2(obj){
    var $messageDiv = $('.addPeopleDiv');
    if($messageDiv.find("li").length == 0){
         $messageDiv.text("")
    }
    var username = $(obj).children('span').text();
    var email = $(obj).children('input:last').val();
    var em = '<li>' + username + '<span>×</span><input type="hidden" value="'+email+'" /></li>';
    if(email == ""){
        alert("此好友很懒，尚未填写邮箱信息");
        return false;
    }
    $messageDiv.empty();
    $messageDiv.append(em);
    $(".addPeopleDiv>li>span").click(function(){
        var $li_parent = $(this).parent().parent();
        $(this).parent().remove();
        if($li_parent.children('li').length<1){
            $li_parent.append('<span style="color:#666;letter-spacing:2px">请在右侧选择简历接收人</span>');
         }

    })
}

// 处理文字数量显示特效
function words_deal(){
    var len = $("#forwardContent2").val().length;
    $("#remainWorld").text(1000 - len);
    if (1000 - len <= 0){
        alert("您输入的超出字数将被截断");
         $("#forwardContent2").val($("#forwardContent2").val().substr(0,1000));
            $("#remainWorld").text(0);
    }
    
}


// 查找通讯录联系人
function showContectButton(obj){
    var searchName = $(":input[name=searchName]").val();
    var $ul = $(".classfyForContact");
    var $appendDiv = $(".appendSearchPeople");
    if ($.trim(searchName) == ""){
        $(".recent_contact_div").show();
        $appendDiv.hide();
        if($ul.is(":hidden")){
            $ul.slideDown(200);
        }
        return false;
    }
    $ul.slideUp(200);
    $(".recent_contact_div").hide();
    $appendDiv.empty();
    if($('.recent_contact_name_li:contains("' + searchName + '")').length > 0){
        $('.recent_contact_name_li:contains("' + searchName + '")').each(function() {
            var newli = '';
            newli += '<li style="padding-left: 40px;" onclick="addContact2(this)">';
            newli += '    <span class="ml25">' + $(this).text() + '</span>';
            newli += '    <input type="hidden" value="' + $(this).nextAll(":input:first").val() + '">';
            newli += '    <input type="hidden" value="' + $(this).nextAll(":input:last").val() + '">';
            newli += '</li>';
           $appendDiv.append(newli);
        })
    }
    $.ajax({
        type: "POST",
        url: "/ajax_findPersonWithContact",
        data: {"searchname": searchName},
        dataType: "json",
        success: function (data) {
            var newli = '';
            for(var i = 0;i < data.length;i++){
                var contact = data[i];
                newli += '<li style="padding-left: 40px;" onclick="addContact2(this)">';
                // newli += '    <img src="" alt="" width="40" height="40">';
                newli += '    <span class="ml25">' + contact.fields.contact_name + '</span>';
                newli += '    <input type="hidden" value="'+contact.pk+'">';
                newli += '    <input type="hidden" value="'+contact.fields.email+'">';
                newli += '</li>';
            }
            $appendDiv.append(newli);
            $appendDiv.slideDown(200);
        }
    })
}


//选择加载的联系人
function showMyContacts(groupId, obj){
    var $lis = $(obj).parent().find("li");
    if($lis.length > 0){
        if($lis.is(":hidden")){
            $lis.slideDown(200)
        } else {
            $lis.slideUp(200)
        }
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/ajax_addAllGroupContacts",
        data: {"groupId": groupId},
        dataType: "json",
        success: function(data){
            var content = '';
            $(data).each(function(i){
                content += '<li onclick="addContact2(this)">';
                // content += '    <img src="" alt="" width="40" height="40">';
                content += '    <span class="ml25">' + this.contact_name + '</span>';
                content += '    <input type="hidden" value="' + this.id + '">';
                content += '    <input type="hidden" value="' + this.email + '">';
                content += '</li>';
            });
            $(obj).parent().append(content);
        }
     });
}
showMyRecentContacts();
// 查看最近联系人
function showMyRecentContacts(){
    var $lis = $("#recentContact").find("li");
    if($lis.length > 0){
        if($lis.is(":hidden")){
            $lis.slideDown(200);
        } else {
            $lis.slideUp(200);
        }
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/ajax_showMyRecentContacts",
        dataType: "json",
        success: function(data) {
            var content = '';
            $(data).each(function (i) {
                content += '<li onclick="addContact2(this)">';
                // content += '    <img src="" alt="" width="40" height="40">';
                content += '    <span class="ml25 recent_contact_name_li">' + this.user_name + '</span>';
                content += '    <input type="hidden" value="' + this.id + '">';
                content += '    <input type="hidden" value="' + this.email + '">';
                content += '</li>';
            });
            $("#recentContact").append(content);
        }
    })
}

// 转发职位按钮点击
function forwardPosition(){
    if($(".addPeopleDiv").find("li").length == 0){
        alert("请选择接收者在转发职位!",4);
        return false;
    }
    var vids = [];
    $(".removePosition2").each(function(i){
        vids[i] = $(this).attr("name");
    });
    var emails = [];
    $(".addPeopleDiv").find(":hidden").each(function(i){
        emails[i] = $(this).val();
    });
    var content = $("#forwardContent2").val();
    $.ajax({
        type: "POST",
         url: "/ajax_doPositionForward",
        data: {"vids": vids, "emails": emails, "content": content},
        dataType: "json",
        success: function(data){
            if(data.status == "1"){
                alert("发送成功!",1);
                $("#ozfjl").css("display", "none");
            } else if(data.status == "2") {
                alert("您在三天之内已经转发过以下全部职位，故此次转发未能成功!",2)
            } else if(data.status == "3") {
                alert('部分简历转发成功，因为 ' + data.msg + ' 这些简历您已经在三天内转发过，故此次未能转发成功!',2)
            } else {
                alert('发生内部错误',2)
            }
        }
    })
}