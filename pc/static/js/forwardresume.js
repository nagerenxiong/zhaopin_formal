<!-- 转发简历入口方法 -->
var vIds=[];
function doForwardResume(vId) {
    vIds=vId;
    $(".addr_box").children('.addr_li').remove();
    $("head").append('<link href="/static/css/jquery.autocomplete.css" rel="stylesheet" type="text/css"><script type="text/javascript" src="/static/js/jquery.autocomplete.min.js" ></script><style>.ac{width:auto!important;}</style>');
    var str = '<div id="forward_resume">\
                <ul class="f_l clearfix">\
                    <li class="index_li">\
                        <label for="">收件人：\
                        </label>\
                        <div class="addr_box">\
                            <div class="tip">请选择或者填写收件人，多个收件人用;隔开</div>\
                            <div class="addr_text">\
                                <input type="input" class="addr_input" maxlength="30"  autocomplete="off" />\
                                <div class="sptor"></div>\
                            </div>\
                        </div>\
                    </li>\
                    <li>\
                        <label for="">主题：\
                        </label><input type="text" id="forward_topic">\
                    </li>\
                    <li>\
                        <label for="">附言：\
                        </label><textarea id="forward_content"></textarea>\
                    </li>\
                    <div class="btn_list">\
                        <button onclick="doResumeForward()">发送</button>\
                        <a href="javascript:void(0);" id="closeBtn">取消</a>\
                    </div>\
                </ul>\
                <div class="f_r">\
                    <div class="lxr">\
                        <span class="lxr_1 active">\
                        </span><span class="lxr_2"></span>\
                    </div>\
                    <div class="lxr_l">\
                        <div class="lxr_list">\
                            <p>最近联系人</p>\
                            <ul id="last_addr">\
                            </ul>\
                        </div>\
                        <div id="singleselect">\
                        </div>\
                    </div>\
                    <div class="lxr_r" style="display:none">\
                        <div class="lxr_list">\
                            <ul id="multiselect">\
                            </ul>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <input type="hidden" class="forward_type" value="1">\
            ';
    $("#forward_resume").remove();
    $("body").append(str);
    $.ajax({
        type: "POST",
        url: "/ajax_get_resume_by_id",
        dataType: "json",
        data: {'resume_id': vId[0]},
        async: false,
        success: function (data) {
            $("#forward_topic").val('【怀才当遇网】' + data + '的简历');
            $("#forward_content").val("该简历，我已查阅，觉得不错，特别推荐给你，请查收。");
        }
    });

    var indexLayer=layer.open({
        type: 1,
        area: ['745px', '370px'],
        title: "转发简历<em class='c_abs'></em>",
        fix: true, //不固定
        maxmin: false,
        skin: 'o_layer forward_resume',
        closeBtn: "1",
        content: $('#forward_resume'),
        success: function(layero, index) {

        }
    });
    //联系人数组
     //联系人分组
    if($('#singleselect .lxr_list').length == 0) {
         $.ajax({
            type: "POST",
            url: "/ajax_showMyContactGroup",
            dataType: "json",
            async: false,
            success: function(data) {
                if (data.length > 0)
                    var contect_group = '';
                    var group_checkbox = '';
                    $(data).each(function() {
                        contect_group += '<div class="lxr_list" onclick="showMyContacts1(' + this.id + ', this)" style="cursor: pointer">';
                        contect_group += '   <p>' + this.group_name + '</p>';
                        contect_group += '   <ul>';
//                        <li data-id="895">王大大</li>\
                        contect_group += '   </ul>';
                        contect_group +='</div>';

                        if(this.group_name != '未分组'){
                            group_checkbox += '<li><div class="lxr_list_l">';
                            group_checkbox += '     <input type="checkbox"/>';
                            group_checkbox += '     <em data-zd="' + this.id + '">' + this.group_name + '</em>';
                            group_checkbox += '    </div>';
                            group_checkbox += '</li>'
                        }
                    });
                    $("#singleselect").append(contect_group);
                    $("#multiselect").append(group_checkbox);
            }
        });
    }
     //最近联系人
    if($('#last_addr li').length == 0) {
         $.ajax({
            type: "POST",
            url: "/ajax_showMyRecentContacts",
            dataType: "json",
            success: function(data) {
                var content = '';
                $(data).each(function(i) {
    //                content += '    <input type="hidden" value="' + this.id + '">';
                    content += '<li data-id="' + this.email + '">' + this.user_name + '</li>';
                });
                $("#last_addr").append(content);
            }
         })
    }

    //去重复
    function duplicate(id)
    {
        var fag=true;
        $(".addr_li input").each(function(index, el) {
            if(id==$(el).val())
            {
                alert('已存在！',2);
                fag=false;
            }
            if(index>=4)
            {
                alert('最多不能超过5个',2);
                fag=false;
            }
        });
        return fag;
    }
    //输入框自动索引联系人
    function loadsAddr(_this) {
        var val = $(_this).val();
        $.ajax({
            url: '/ajax_get_all_contacts',
            type: 'POST',
            dataType: 'json',
            data: {
                value: val
            },
            success: function(data) {
                $(".addr_input").AutoComplete({
                    'data': data,
                    'itemHeight': 20,
                    'width': 'auto',
                    'afterSelectedHandler': function(data) {
                        $(".addr_input").val('');
                        if($(".addr_li :input[value='" + data.label + "']").length > 0) {
                            alert('已存在');
                            return false;
                        }
                        var data_value=data.value;
                        var i=data_value.indexOf("(");
                        if(i>0)
                            data_value=data_value.substring(0,i);
                        $(".addr_text").before('<div class="addr_li">' + data_value + ';<i class="iconfont icon-cha"></i></i><input type="hidden" value="' + data.label + '"/></div>');

                    },
                    'listStyle': 'custom',
                    'emphasis': false,
                    'createItemHandler': function(index, data) {
                        return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                    }
                }).AutoComplete('show');

            }
        })
    }
//查询是否存在　返回hidden值
    function exist(_this) {
        var val = $(_this).val();
        val = val.substr(0, val.length-1);
        if($("#last_addr li:contains('" + val + "')").length > 0) {
            return $("#last_addr li:contains('" + val + "')").attr('data-id');
        }
        $.ajax({
            url: '/ajax_get_contact_by_fullname',
            type: 'POST',
            dataType: 'json',
            data: {'contact_name': val},
            async: false,
            success: function(data) {
                return data
            }
        })
    }
   //光标定位
    $(".addr_box").on('click', function() {
        $('.addr_input').focus();
    })
    //单人联系人展开
    $(".lxr_l").on('click','.lxr_list p',function(event) {
       if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
       }
       else{
         $(this).parent().addClass('active');
       }
    });
    $("#closeBtn").click(function(){
        layer.close(indexLayer);
    })
    //单人联系人选取
    $(".lxr_l").on('click','.lxr_list ul li',function(event) {
        if(duplicate($(this).attr('data-id'))==false)return;
        $(".addr_box").children('.addr_zli').remove();
        $(".addr_box .tip").hide();
        $(".addr_text").before('<div class="addr_li">' + $(this).text() + ';<i class="iconfont icon-cha"></i><input type="hidden" value="' + $(this).attr('data-id') + '"/></div>');
        $(".forward_type").val('1');
       
    });
    //多人数组选取
    $(".lxr_r").on('click','.lxr_list_l',function(){

        if ($(".lxr_r input:checkbox:checked").size() == 1){
             $('#multiselect li').css({"background":"#fff"});
         }

        if($(this).children('input').prop('checked')==true){
            $(".addr_text").prev().remove();
            $(this).children('input').prop('checked',false);
            $(".addr_box,.addr_input").css({background:"#fff",cursor: "text"});
            $(".addr_input").attr("disabled", false);
            return;
        } else {
            $(".lxr_r input").prop('checked',false);
            $(this).children('input').prop('checked',true);

            $(".addr_box,.addr_input").css({background:"#F7F7F7",cursor: "default"});
            $(".addr_input").attr("disabled", true);
            $('#multiselect li').css({"background":"#fff"});
            $(this).parent().siblings().css({"background":"#f1f1f1"}); 

        }
        $(".addr_box").children('.addr_li').remove();
        $(".addr_box .tip").hide();
        $(".addr_text").before('<div class="addr_li addr_zli " style="background:#DEDEDE;border-radius:5px;">' + $(this).children('em').text() + ';<input type="hidden" value="' + $(this).children('em').attr('data-zd') + '"/></div>');
        $(".forward_type").val('2');
    })

    $(".lxr_r").on('click','.lxr_list_l input',function(){
   
        if($(this).prop('checked')==true)
        {
         
        $(".addr_text").prev().remove();
        $(".addr_text").children("input").attr({"disabled":true});
        $(this).prop('checked',false);
        $(".addr_box").css({background:"#f1f1f1"});
        
        return;
        }
        else
        {
      
        $(".lxr_r input").prop('checked',false);
        $(this).prop('checked',true);
        }
        $(".addr_box").children('.addr_li').remove();
         $(".addr_text").before('<div class="addr_li addr_zli ">' + $(this).next('em').text() + ';<input type="hidden" value="' + $(this).next('em').attr('data-zd') + '"/></div>');
        $(".forward_type").val('2');
    })
    //单多切换
    $(".lxr").on('click','span',function(){
        $(".lxr span").removeClass('active');
        $(this).addClass('active');
        var index=$(".lxr span").index(this);
        if(index==0)
        {
            $(".lxr_l").show();
            $(".lxr_r").hide();
        }
        else{
            $(".lxr_l").hide();
            $(".lxr_r").show();
        }
    })
    //输入框事件
    $(".addr_input").on('keyup input', function(event) {
        var l = $(this).val().length;
        if(l==0&&$(".addr_box .addr_li").length<=0)
        $(".addr_box .tip").show();
        else
        $(".addr_box .tip").hide();
        // $(this).parent().width(13 + l * 8);
        var lastcode = $(this).val().substring(l - 1);
        $(".addr_li.active").removeClass('active');
        $(".addr_li.addr_zli").remove();
        loadsAddr(this);
        //输入了分号即使选中
        if (lastcode == ";"||lastcode == "；") {
            if ($.trim($(this).val())!= "") {
                if(duplicate(exist(this))==false||duplicate($(this).val())==false)return;
                if (exist(this) != "" && typeof(exist(this)) != "undefined")
                {
                    $(this).parent().before('<div class="addr_li">' + $(this).val() + '<i class="iconfont icon-cha"></i><input type="hidden" value="' + exist(this) + '"/></div>');
                }
                else{
                    var reg= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    var val = $(this).val();
                    val = val.substr(0, val.length-1);
                    if (reg.test(val))
                        $(this).parent().before('<div class="addr_li">' + $(this).val() + '<i class="iconfont icon-cha"></i><input type="hidden" value="' + val+ '"/></div>');
                    else
                        alert('邮箱号不合法', 4);
                     $(this).val('');
                }
            }
        }
        //  $(document).on('keydown',function(){
        //     deleteItemByInput();
        // })
    })
    //输入框离开事件
    $(".addr_input").on('blur', function() {
        if ($.trim($(this).val())!= "" && $(".ac").css('display') == "none") {
            if(duplicate(exist(this))==false||duplicate($(this).val())==false)return;
            //数据库查询到数据即添加联系人
            if (exist(this) != "" && typeof(exist(this)) != "undefined")
                {
                    $(this).parent().before('<div class="addr_li">' + $(this).val() + ';<i class="iconfont icon-cha"></i><input type="hidden" value="' + exist(this) + '"/></div>');
                }
                else{
                    var reg= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    var val = $(this).val();
                    if (reg.test(val))
                        $(this).parent().before('<div class="addr_li">' + $(this).val() + ';<i class="iconfont icon-cha"></i><input type="hidden" value="' + $(this).val() + '"/></div>');
                     $(this).val('');
                }
        }
    })
    $("#forward_resume").on('click', '.addr_li i', function() {
        // $(".addr_li").removeClass('active');
        // $(this).addClass('active');
        var _this = $(this).parent();
        _this.remove();
        // $(document).on('keydown', function() {
        //     deleteItemByActive(_this);
        // })
        // if (event && event.preventDefault)
        //     event.preventDefault();
        // //IE中阻止函数器默认动作的方式
        // else
        //     window.event.returnValue = false;
        // return false;
    })
    // $(document).on('click', function() {
    //         $(".addr_li").removeClass('active');
    //         $(document).unbind('keydown');
    //     })
        //   function deleteItemByInput(){
        //   if(event.keyCode==8&&$(".addr_input").val()=="")
        //   {
        //       $(".addr_text").prev().addClass('active');
        //       $(document).on('keydown',function(){
        //       deleteItemByActive();
        //       })
        //   }
        // }
    $("#forward_resume").on('keydown', '.addr_input', function(event) {
        $(this).val() == '' && deleteItemByActive(event);
    });
    function deleteItemByActive(event) {
        if (event.keyCode == 8 || event.keyCode == 46) {
            $(".addr_li:last").remove();
            if (event && event.preventDefault)
                event.preventDefault();
            //IE中阻止函数器默认动作的方式
            else
                window.event.returnValue = false;
            return false;
        }
    }

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
function addContact2(obj) {
    var $messageDiv = $('.addPeopleDiv');
    if ($messageDiv.find("li").length == 0) {
        $messageDiv.text("")
    }
    var username = $(obj).children('span').text();
    var email = $(obj).children('input:last').val();
    var em = '<li>' + username + '<span>×</span><input type="hidden" value="' + email + '" /></li>';
    if (email == "") {
        alert("此好友很懒，尚未填写邮箱信息");
        return false;
    }
    $messageDiv.empty();
    $messageDiv.append(em);
    $(".addPeopleDiv>li>span").click(function() {
        var $li_parent = $(this).parent().parent();
        $(this).parent().remove();
        if ($li_parent.children('li').length < 1) {
            $li_parent.append('<span style="color:#666;letter-spacing:2px;">请在右侧选择简历接收人</span>');
        }
    })
}


// 处理文字数量显示特效
function words_deal() {
    var len = $("#forwardContent2").val().length;
    $("#remainWorld").text(1000 - len);
    if (1000 - len <= 0) {
        alert("您输入的超出字数将被截断")
    }
}

// 查找通讯录联系人
function showContectButton(obj) {
    var searchName = $(":input[name=searchName]").val();
    var $ul = $(".classfyForContact");
    var $appendDiv = $(".appendSearchPeople");
    if ($.trim(searchName) == "") {
        $appendDiv.hide();
        if ($ul.is(":hidden")) {
            $ul.slideDown(200);
        }
        return false;
    }
    $ul.slideUp(200);

    $.ajax({
        type: "POST",
        url: "/ajax_findPersonWithContact",
        data: {
            "searchname": searchName
        },
        dataType: "json",
        success: function(data) {
            var newli = '';
            for (var i = 0; i < data.length; i++) {
                var contact = data[i];
                newli += '<li style="padding-left: 40px;" onclick="addContact2(this)">';
                // newli += '    <img src="" alt="" width="40" height="40">'
                newli += '    <span class="ml25">' + contact.fields.contact_name + '</span>';
                newli += '    <input type="hidden" value="' + contact.pk + '">';
                newli += '    <input type="hidden" value="' + contact.fields.email + '">';
                newli += '</li>';
            }
            $appendDiv.empty();
            $appendDiv.append(newli);
            $appendDiv.slideDown(200);
        }
    })
}

//选择加载的联系人
function showMyContacts1(groupId, obj) {
    var $lis = $(obj).find("li");
    if ($lis.length > 0) {
//        if ($lis.is(":hidden")) {
//            $lis.slideDown(200)
//        } else {
//            $lis.slideUp(200)
//        }
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/ajax_addAllGroupContacts",
        data: {
            "groupId": groupId
        },
        dataType: "json",
        success: function(data) {
            var content = '';
            $(data).each(function(i) {
//                content += '<li onclick="addContact2(this)">';
//                // content += '    <img src="" alt="" width="40" height="40">';
//                content += '    <span class="ml25">' + this.contact_name + '</span>';
//                content += '    <input type="hidden" value="' + this.id + '">';
//                content += '    <input type="hidden" value="' + this.email + '">';
//                content += '</li>';
                content += '<li data-id="' + this.email + '">' + this.contact_name + '</li>';
            });
            $(obj).find('ul').append(content);
        }
    });
}


// 转发简历按钮点击
function doResumeForward() {
    var $addr_li = $(".addr_box .addr_li");
    if ($addr_li.length == 0) {
        window.alert("请输入正确的收件人!", 4);
        return false;
    }
    var vids =vIds;
    $(".resume_id_list").each(function(i) {
        vids[i] = $(this).attr("name");
    });
    var emails = [];
    $addr_li.find(":hidden").each(function(i) {
        emails[i] = $(this).val();
    });
    var forward_topic = $.trim($("#forward_topic").val());
    if(forward_topic == '') {
        alert('请输入主题描述!', 4);
        return false;
    }
    var content = $.trim($("#forward_content").val());
    if(content == '') {
        alert('请输入描述!', 4);
        return false;
    }
    var type = $(".forward_type").val();
    $.ajax({
        type: "POST",
        url: "/ajax_doResumeForward",
        data: {
            "vids": vids,
            "emails": emails,
            "content": content,
            "forward_topic": forward_topic,
            "type": type
        },
        dataType: "json",
        success: function(data) {
            if (data.status == "1") {
                window.alert("发送成功!", 1);
                $("#ozfjl").css("display", "none");
            } else if (data.status == "2") {
                window.alert("您在三天之内已经转发过该简历，故此次转发未能成功!", 2)
            } else if (data.status == "3") {
                window.alert('部分简历转发成功，因为 ' + data.msg + ' 这些简历您已经在三天内转发给您选中的联系人，故此次未再次转发!', 2)
            } else {
                window.alert('发生内部错误', 2)
            }
        }
    });
}