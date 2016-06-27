var positionId;
var accepterId;
var resumeId;
var recieveEmail;
var agent_pu_id;//经纪人的pu_id
var templateContent = '您好！你的简历跟我推荐给您的职位比较适合，希望您可以认真考虑，若合适请点击"投递简历"';
var improperContent = '非常荣幸收到您的简历，招聘方经过评估，认为您与该职位的条件不太匹配，无法进入面试阶段。';
var dom;
//弹窗show
function o_show(cont, id, email, resume_id, resume_name, resume_source){
        switch (cont){
            case "mspj":
                dom = '#comment_interview';
                if($("#comment_interview").length<1)
                    $("body").append(content);
                $("#comment_interview").css('display', 'block').animate({paddingTop:'30px',opacity:'1'}, 150);
                $("#comment_interview input").val('');
                $("#comment_interview textarea").val('');
                positionId = id;
                break;
            case "yq":
                dom = '#recommend_position';
                if($("#recommend_position").length<1)
                    $("body").append(content1);
                $("#recommend_position").css('display', 'block').animate({paddingTop:'30px',opacity:'1'}, 150);;
                setAutoComplete(resume_source);
                $(".ac").css('zIndex', '100');
                $('#content').text('');
                if(resume_source == 1){
                    $('#content').append(templateContent);
                }else{
                    var hunt_resume = '您好！你的简历<a href="/resume/new_jlyl?resumeID='+resume_id+'" class="letterlj" target="_blank">' + resume_name;
                    hunt_resume += '</a>跟我推荐给您的职位比较适合，希望您可以认真考虑，若合适请点击"我要推荐"';
                    $('#content').append(hunt_resume);
                }
                $('#content').keyup();
                accepterId = id;
                break;
            case "gold":
                dom = '#look_resume';
                resumeId = id;
                var isCouldWatchContent = isCouldWatchResume();
                if(isCouldWatchContent == false) {
                    alert("您今天所能查看的简历数已达最大，不能再查看简历!",4);
                    return false;
                }
                showContactDialogByGold(resumeId);
                $("#look_resume").css('display', 'block').animate({paddingTop:'30px',opacity:'1'}, 150);;
                break;
            case "bhs":
                dom = '#inappropriate';
                resumeId = id;
                if($("#inappropriate").length<1)
                    $("body").append(content3);
                $("#inappropriate").css('display', 'block').animate({paddingTop:'30px',opacity:'1'}, 150);;
                $('#improper').val(improperContent);
                getMyModels($("#inappropriate").find('.selectControlList:first'), 'bhs');
                break;
            case "lxfs":
                dom = '#look_contact';
                resumeId = id;
                if($("#look_contact").length<1)
                    $("body").append(content4);
                $("#look_contact").css('display', 'block').animate({paddingTop:'30px',opacity:'1'}, 150);;
                if(resume_source == 2){
                    $('#view_notice').text('您好，在您确认后简历维护经纪人将会收到消息通知，3个工作日后经纪人将能看到您的联系方式，若经纪人因未收到电话沟通而举报，您的信誉将会收到影响。 ');
                }else{
                    $('#view_notice').text('您好！在您确认后候选人将会收到消息通知，3个工作日后候选人将能看到您的联系方式，将若候选人因未收到电话沟通而举报，您的信誉度将会受到影响。');
                }
                break;
            case "mstz":
                dom = '#interview_notice';
                resumeId = id;
                recieveEmail = email;
                if($("#interview_notice").length<1){
                    $("body").append(content5);
                }
                if($(dom).find('.msyl').css('display') == 'block'){
                    $(dom).find('.msyl').hide();
                    $(dom).find('.ms1').show();
                }
                $('#recieveEmail').text(recieveEmail);
                $("#interview_notice").css('display', 'block').animate({paddingTop:'30px',opacity:'1'}, 150);;
                $('.inappropriate').find('.ms1 input').val('');//每次打开置空输入框
                $("#interviewTime").text('');//置空面试时间
                $('#interviewPlace').val($('#tpc_area').val());
                $('#contactName').val($('#my_name').val());
                $('#contactPhone').val($('#my_phone').val());
                getMyModels($("#interview_notice").find('.selectControlList:first'), 'mstz');
                break;
            case "gold_pay":
                dom = '#gold_pay';
                if($("#gold_pay").length<1)
                    $("body").append(content6);
                $("#gold_pay").css('display', 'block').animate({paddingTop:'30px',opacity:'1'}, 150);;
                break;
            case "jjrpj":
                dom = '#comment_jjr';
                agent_pu_id = id;
                if($("#comment_jjr").length<1)
                    $("body").append(content7);
                $("#comment_jjr").css('display', 'block').animate({paddingTop:'30px',opacity:'1'}, 150);;
                break;


        }
            $("body").append('<div class=\"o_shade\" style="display:block" onclick=\"o_hide(\''+dom+'\')\"></div>')
	}

// 是否超过了可以查看的简历数
function isCouldWatchResume(){
    var flag;
    $.ajax({
        async: false,
        url: "/ajax_isCouldWatchResume",
        type: "post",
        dataType: "json",
        success: function(data) {
            if(data.status != '1') {
                flag = false;
            } else {
                flag = true;
            }
        }
    });
    return flag;
}

// 付才币购买简历
function showContactDialogByGold(resumeId) {
    var needGold = puGold = 0;
    var ownerPuAccount = '';
    $.ajax({
        async: false,
        url: "/ajax_showBuyResumeGolds",
        type: "post",
        data: {"resumeId": resumeId},
        dataType: "json",
        success: function(data) {
            if(data.status == 1) {
                needGold = data.needGold;
                puGold = data.puGold;
                ownerPuAccount = data.ownerPuAccount;
            } else {
                needGold = -1
            }
        }
    });
    if(needGold < 0) {
        alert("获取联系方式失败!",4)
    } else {
        //查看简历
        content2+="<div class=\"o_modal\" id=\"look_resume\" style=\"display: block\">";
        content2+="<div class=\"o_common look_resume\">";
        content2+="    <h1>提示信息<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#look_resume\')\"></i></h1>";
        if(puGold >= needGold) {
           if(needGold== null){needGold=0;}
           content2+="<p class='alcen pad30'>查看这份简历需要花费<b class='cl_12 commzt' style='position:relative'>"+ needGold*0.25 +"才币<i class='sale_icon'></i>(<span class='hd'>" + needGold + "才币)</span></b>哦！</p><p class='alcen'>您当前账户余额为<b>" + puGold + "</b>个才币。</p>";
            content2+="<p class='cl_12'>提示&nbsp;:&nbsp;仅第一次打开需要花费才币哦~</p>";
            content2+="    <button class=\"chanob_btn openResumeFirst\" >确认查看</button>";
            content2+=" <a href='javascript:void(0)' class='cancel' onclick=\"o_hide(\'#look_resume\')\">取消</a>";
        } else {
            content2+="<p>亲，查看这份简历需要花费<b class='c_f6'>" + needGold*0.25 + "</b>个才币哦！您当前账户才币数为<b>" + puGold + "</b>~不能下载~</p>";
            content2+="<p class='c_f6'>提示&nbsp;:&nbsp;您可以\"立即充值\"充值成功后再继续查看~</p>";
            content2+="    <button class=\"o_btn\" onclick=\"o_hide(\'#look_resume\')\">确定</button>";
        }
        content2+="</div>";
        content2+="</div>";
    }
    if($("#look_resume").length<1)  $("body").append(content2);
    $(".openResumeFirst").click(function(){
        $.ajax({
            "async": false,
            "url": "/ajax_sureToBuyResume",
            "data": {
                "resumeId": resumeId,
                "needGold": needGold*0.25,
                "ownerPuAccount": ownerPuAccount
            },
            "dataType": "json",
            "type": "post",
            success: function(data) {
                o_hide('#look_resume');
                if(data.status == 1) {
                    $(".showPhoneSpan").text("手机:" + data.phone);
                    $(".showEmailSpan").text("邮箱:" + data.email);
                    $(".watchContactSpan").remove();
                    alert("简历购买成功!",1);
                    location.reload() 
                } else if(data.status == 2) {
                    alert("你已购买该简历，无需购买",1);
                } else {
                    alert("发生内部错误!",2);
                }
            }
            ,error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                }
        });
    })
}

// 确定购买并显示联系方式
function openResumeFirst(resumeId, needGold, ownerPuAccount){
    $.ajax({
        async: false,
        url: "/ajax_sureToBuyResume",
        data: {"resumeId": resumeId, "needGold": needGold, "ownerPuAccount": ownerPuAccount},
        dataType: "json",
        type: "post",
        success: function(data) {
            o_hide('#look_resume');
            if(data.status == 1) {
                $(".showPhoneSpan").text("手机:" + data.phone);
                $(".showEmailSpan").text("邮箱:" + data.email);
                $(".watchContactSpan").remove();
                alert("简历购买成功!",1);
            } else {
                alert("发生内部错误!",2);
            }
        }
    });
}
//弹窗hide
function o_hide(obj){
    $(obj).animate({paddingTop:'0px',opacity:'0'}, 150,function(){
        $(obj).css('display', 'none');
    });
    $('.o_shade').remove();
}
//保存评价信息
function saveEvaluate(obj, type){
    var evaluateLength = $(obj).find('.star .active').length;
    var object_id = '';
    if(type == '1'){
        object_id = positionId;
    }else{
        object_id = agent_pu_id;
    }
    if(evaluateLength == 0){
        if(type == '1'){
            window.alert('请给面试打星',4);
        }else{
            window.alert('请给经纪人打星',4);
        }
        return;
    }
    var interviewContent = $(obj).find('#interviewContent').val();
    if($.trim(interviewContent) == ''){
        if(type == '1'){
            window.alert('请填写面试经历',4);
        }else{
            window.alert('请填写对经纪人的评价',4);
        }
        return;
    }
    var isanonymity = $(obj).find('#anonymity:first').is(':checked');
    if(isanonymity){
        isanonymity = 1;
    }else{
        isanonymity = 0;   
    }
    $.ajax({
        type: "POST",
        url: "/ajax_saveEvaluate",
        data: {"object_id": object_id, "evaluateValue": evaluateLength, "content": interviewContent,
            "isanonymity": isanonymity, "object_type": type},
        dataType: "json",
        success: function (data) {
            if (data.msg == 'success') {
                if(type == '1'){
                    $('#'+positionId).text('查看面试评价');
                    $('#'+positionId).attr('onclick', 'viewPosition('+positionId+', \'evaluation\')');
                }else{
                    $('.guanzhu:last').text('查看点评');
                    $('.guanzhu:last').attr('onclick', 'headhunterView('+agent_pu_id+', \'evaluation\')');
                }
                $("#interviewContent .queren p").text("你的评价已提交成功！").siblings('div').children('').css('display', 'none');
                $("#interviewContent .queren div .gb").css('display', 'block');
            }else if(data.msg == 'exist'){
                window.alert('你已评论过，不能再评论了',4);
            }else{
                window.alert(data.msg,4);
            } 
        }
    });
	o_hide(obj);
}
//推荐职位
function recommendPosition(obj){
    var positionName = $('input[name="autoFinish"]').val();
    if(positionName == ''){
        window.alert('请输入你拥有的职位',4);
        return;
    }
    var pId = $('input[name="autoFinish"]').next().val();
    if(pId == ''){
        window.alert('请正确输入你拥有的职位',4);
        return;
    }
    var letterContent = $('#content').html();
    if(letterContent.trim() == ''){
        window.alert('请输入私信内容',4);
        return;
    }
    var attentionIds = [];
    attentionIds.push(accepterId);
    var positionIds = [];
    positionIds.push(pId);
    $.ajax({
        type: "POST",
        url: "/ajax_sendPositionRecommendMessage",
        data: {"attentionIds": attentionIds, "positionIds": positionIds, "letterContent": letterContent},
        dataType: "json",
        success: function (data) {
            if (data.status == '2') {
                window.alert('您已经为此人才推荐过该职位了',4);
            }else if(data.status == '1'){
                window.alert('职位邀请成功!',1);
            }else{
                window.alert('推荐失败，服务器连接异常',2);
            }
        }
    });
    o_hide('#recommend_position');
}
//文本框已输入字符显示
function word_length(textarea,span){
	textarea.keydown(function(event) {
		span.text($(this).val().length);
	});
	textarea.keyup(function(event) {
		span.text($(this).val().length);
	});
}

function word_length1(textarea,span){
    textarea.keydown(function(event) {
        span.text($(this).text().length);
    });
    textarea.keyup(function(event) {
        span.text($(this).text().length);
    });
}
function astrictfig(textarea){
  textarea.keydown(function(event){
   var innnerText=$(this).text();
   if(innnerText.length>=200){
        return false;
     }
   });
}
//星星移入效果
function star_enter(stars){
	$(stars).mouseenter(function(event) {
		$(stars+":gt("+($(this).index())+")").removeClass('active');
		$(stars+":lt("+($(this).index()+1)+")").addClass('active');
	});
}
//单选效果
function radio_li(li){
	li.click(function(event) {
		$(this).addClass('active').siblings('').removeClass('active');
	});
}
function o_slideclick(hehe,obj){
	$(hehe).click(function(event) {
		$(obj).slideToggle(150);
	});
    $(obj).children('li').click(function(event) {
        $(hehe).val($(this).text());
        $(obj).slideUp(150);
    });
}
function o_select(div,li){
    $(div).click(function(event) {
            $(this).children('ul').slideToggle(150);
        });
        $(li).click(function(event) {
            $(this).parent().siblings('span').text($(this).text()).append('<i class="iconfont icon-xia1"></i>');
        });
}
function select_div(li,div){
    li.click(function(event) {
        div.css("display","none").eq($(this).index()).css('display', 'block');
    });
}
// $(window).resize(function(event) {
//     $('.o_common').each(function(index, el) {
//         $(this).css('paddingTop', -$(this).height()/2+'px');
//     });
// });

//面试评价content
var content=content1=content2=content3=content4=content5=content6=content7="";
content+="<div class=\"o_modal\" id=\"comment_interview\">";
content+="<div class=\"o_common\">";
content+="    <h1>评价面试体验<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#comment_interview\')\"></i></h1>";
content+="  <div>  <dl>";
content+="        <dt>面试评分：</dt>";
content+="        <dd style=\"vertical-align: bottom\">";
content+="            <ul class=\"clearfix star\">";
content+="                <li></li>";
content+="                <li></li>";
content+="                <li></li>";
content+="                <li></li>";
content+="                <li></li>";
content+="            </ul>";
content+="        </dd>";
content+="    </dl>";
content+="    <dl>";
content+="        <dt>面试评价：</dt>";
content+="        <dd><textarea maxlength=\"200\" name=\"\" id=\"interviewContent\" placeholder=\"详细描述一下自己的面试经历\"></textarea></dd>";
content+="    </dl>";
content+="    <div class=\"btn_list\">";
content+="        <input type=\"checkbox\" id=\"anonymity\">";
content+="        <label for=\"anonymity\" class=\"o_tishi\">匿名提交</label>";
content+="        <span>(<b>0</b>/200)</span>";
content+="    </div>";
content+="    <div><button class=\"o_btn tj\" >确认提交</button></div>";
content+="</div>";
content+="<div class=\"queren\" style=\"display:none;\"><p style=\"font-size: 18px; padding-top: 10px; text-align: center;\">面试评价一旦提交将无法修改,是否确认继续提交？</p>"
content+="<div style=\"text-align: center;\"><button style=\"margin-left:0px\" class=\"o_btn\" onclick=\"saveEvaluate(\'#comment_interview\', \'1\')\">确认提交</button><a href=\"javascript:void(0)\" class=\"tj\" style=\"font-size:16px;margin-left:40px;\" >再次编辑</a><button style=\"margin-left:0px;display:none;width:80px\" class=\"o_btn gb\" onclick=\"o_hide(\'#comment_interview\')\">关闭</button></div></div>"
content+="</div></div>";
content+="<script>word_length($(\"#comment_interview textarea\"),$(\"#comment_interview .btn_list span b\"));star_enter(\"#comment_interview .star li\");";
content+="$(\"#comment_interview .tj\").click(function(event) {$(this).parent().parent().hide().siblings('div').show();});<\/script>"

//推荐简历content
content1+="<div class=\"o_modal\" id=\"recommend_position\" style='display: block;overflow-y: inherit!important;'>";
content1+="<div class=\"o_common o_tjzw\">";
content1+="    <h1>推荐职位<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#recommend_position\')\"></i></h1>";
content1+="    <dl>";
content1+="        <dt>职位名称：</dt>";
content1+="        <dd>";
content1+="            <input type=\"text\" class=\"w300\" name=\"autoFinish\" placeholder=\"请输入正在发布的职位名称\" autocomplete=\"off\">";
content1+="            <input type=\"hidden\" />";
content1+="        </dd>";
content1+="        <dd class=\"o_rule\">";
content1+="            规则：成功推荐职位，可获得+10才币奖励，每日15次";
content1+="        </dd>";
content1+="    </dl>";
content1+="    <dl>";
content1+="        <dt >私信内容：</dt>";
content1+="        <dd><div contentEditable='true' name=\"\" class='test_box1 tujn' id=\"content\"></div></dd>";
content1+="    </dl>";
content1+="    <div class=\"btn_list\">";
//content1+="        <label for=\"anonymity\" class=\"o_tishi\">以上模板为可编辑</label>";
content1+="        <span>(<b>0</b>/200)</span>";
content1+="    </div>";
content1+="    <button class=\"o_btn\" onclick=\"recommendPosition(\'#recommend_position\')\">确认提交</button>";
content1+="</div>";
content1+="</div>";
content1+="<script>word_length1($(\"#recommend_position .tujn\"),$(\"#recommend_position .btn_list span b\"));o_slideclick($(\".tjzw_name\"),$(\".position_name\"));astrictfig($(\"#recommend_position .tujn\"));<\/script>";

//经纪人评价content
content7+="<div class=\"o_modal\" id=\"comment_jjr\">";
content7+="<div class=\"o_common\">";
content7+="    <h1>经纪人评价<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#comment_jjr\')\"></i></h1>";
content7+="  <div>  <dl>";
content7+="        <dt>经纪人评分：</dt>";
content7+="        <dd style=\"vertical-align: bottom\">";
content7+="            <ul class=\"clearfix star\">";
content7+="                <li></li>";
content7+="                <li></li>";
content7+="                <li></li>";
content7+="                <li></li>";
content7+="                <li></li>";
content7+="            </ul>";
content7+="        </dd>";
content7+="    </dl>";
content7+="    <dl>";
content7+="        <dt>经纪人评价：</dt>";
content7+="        <dd><textarea maxlength=\"200\" name=\"\" id=\"interviewContent\" placeholder=\"详细描述一下自己的经纪人\"></textarea></dd>";
content7+="    </dl>";
content7+="    <div class=\"btn_list\">";
content7+="        <input type=\"checkbox\" id=\"anonymity\">";
content7+="        <label for=\"anonymity\" class=\"o_tishi\">匿名提交</label>";
content7+="        <span>(<b>0</b>/200)</span>";
content7+="    </div>";
content7+="    <div><button class=\"o_btn tj\" >确认提交</button></div>";
content7+="</div>";
content7+="<div class=\"queren\" style=\"display:none;\"><p style=\"font-size: 18px; padding-top: 10px; text-align: center;\">经纪人评价一旦提交将无法修改,是否确认继续提交？</p>"
content7+="<div style=\"text-align: center;\"><button style=\"margin-left:0px\" class=\"o_btn\" onclick=\"saveEvaluate(\'#comment_jjr\', \'2\')\">确认提交</button><a href=\"javascript:void(0)\" class=\"tj\" style=\"font-size:16px;margin-left:40px;\" >再次编辑</a><button style=\"margin-left:0px;display:none;width:80px\" class=\"o_btn gb\" onclick=\"o_hide(\'#comment_jjr\')\">关闭</button></div></div>"
content7+="</div></div>";
content7+="<script>word_length($(\"#comment_jjr textarea\"),$(\"#comment_jjr .btn_list span b\"));star_enter(\"#comment_jjr .star li\");";
content7+="$(\"#comment_jjr .tj\").click(function(event) {$(this).parent().parent().hide().siblings('div').show();});<\/script>"


//简历不合适
content3+="<div class=\"o_modal\" id=\"inappropriate\" style=\"display: block\">";
content3+="<div class=\"o_common inappropriate bhs\">";
content3+="    <h1>确认这份简历不合适<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#inappropriate\')\"></i></h1>";
content3+="<h2 class=\'c_f6\'>确认这份简历不合适？</h2>";
content3+="<p class=\"b\" class=\"c_66\">确认后，系统将自动发送不合适通知邮件至用户邮箱</p>";
content3+="<div class=\"clearfix\"> ";
content3+="    <span>可选模板：</span>";
content3+="";
content3+="    <div class=\"o_txt selectControl f_l bitian\" style=\"margin-top: 0px;\" >";
content3+="        <span style=\"margin-left: 0px\"><i class=\"iconfont icon-xia1\"></i></span>";
content3+="        <ul style=\"display: none;\" class=\"selectControlList\">";
content3+="            <li>123</li>";
content3+="            <li>123</li>";
content3+="            <li>123</li>";
content3+="            <li>31</li>";
content3+="     </ul>";
content3+="    </div>";
content3+="    <span class=\"c_5c mbgl\" onclick=\"editModel()\">模板管理</span>";
content3+="</div>";
content3+="<textarea maxlength=\"200\" id=\"improper\" maxlength=\"200\" placeholder=\"\"></textarea>";
content3+="<p><span class=\"c_99 fz12\">编辑内容仅针对本次发送，不会影响模板</span><span class=\"f_r c_f6\">(<b>43</b>/200)</span></p>";
content3+="    <button class=\"o_btn \" onclick=\"improperDeal(\'#inappropriate\')\">确认不合适</button>";
content3+=" <a href=\'javascript:void(0)\' onclick=\"o_hide(\'#inappropriate\')\">取消</a>";
content3+="</div>";
content3+="</div>";
content3+="<script>";
content3+="    $(function(){o_select(\".bhs .o_txt\",\".bhs .o_txt li\");word_length($(\".bhs textarea\"),$(\".bhs p span b\"));})";
content3+="</script>";

//查看联系方式
content4+="<div class=\"o_modal\" id=\"look_contact\" style=\"display: block\">";
content4+="<div class=\"o_common inappropriate\">";
content4+="    <h1>查看联系方式<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#look_contact\')\"></i></h1>";
content4+="<p style=\"font-size:14px;margin-bottom:40px\" class=\"c_66\" id=\"view_notice\">您好！在您确认后候选人将会收到消息通知，3个工作日后候选人将能看到您的联系方式，将若候选人因未收到电话沟通而举报，您的信誉度将会受到影响。</p>";
content4+="<p><span >联系电话：</span><input type=\"text\" class=\"o_txt bitian\" id=\"myPhone\" placeholder=\"请填写联系人电话\" /></p>";
content4+="<p><span>联系邮箱：</span><input type=\"text\" class=\"o_txt bitian\" id=\"myEmail\" placeholder=\"请填写真实的联系邮箱\" /></p>";
content4+="    <button class=\"o_btn \" onclick=\"viewResumeContact(\'#look_contact\')\">确认查看</button><a href=\"javascript:void(0)\" onclick=\"o_hide(\'#look_contact\')\">取消</a>";
content4+="</div>";
content4+="</div>";


//面试通知
content5+="<div class=\"o_modal\" id=\"interview_notice\" style=\"display: block\">";
content5+="<div class=\"o_common inappropriate\">";
content5+="    <h1>已安排面试<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#interview_notice\')\"></i></h1>";
content5+="<ul class=\"clearfix s\"><li class=\"active\" style=\"width:490px;cursor:default;\">面试</li></ul>"
content5+="<div class=\"ms1 ms\" >";
// content5+="<div class=\"clearfix\" > ";
// content5+="    <span>可选模板：</span>";
// content5+="    <div class=\"o_txt selectControl f_l bitian\" style=\"margin-top: 0px;width:205px;\" >";
// content5+="        <span style=\"margin-left: 0px;width:205px;\"><i class=\"iconfont icon-xia1\"></i></span>";
// content5+="        <ul style=\"display: none;\" class=\"selectControlList\">";
// content5+="            <li>123</li>";
// content5+="            <li>123</li>";
// content5+="            <li>123</li>";
// content5+="            <li>31</li>";
// content5+="     </ul>";
// content5+="    </div>";
// content5+="    <span class=\"c_5c mbgl\" onclick=\"editModel()\" style=\"margin-left:10px;font-size:14px;\">模板管理</span>";
// content5+="</div>";
content5+="<div class=\"clearfix\" style=\"line-height:40px\"> ";
content5+="    <span>收件人：</span><span class=\"sjr\" style='width:auto' id=\"recieveEmail\">131313@qq.com</span>";
content5+="</div>";
content5+="<div class=\"clearfix\"> ";
content5+="    <span>主题：</span>";
content5+="<input type=\"text\" class=\"o_txt bitian position\" id=\"interviewTitle\" placeholder=\"请输入您邀请面试的主题\" />";
content5+="</div>";
content5+="<div class=\"clearfix\"> ";
content5+="    <span>面试时间：</span>";
content5+="    <div class=\"o_txt selectControl f_l bitian\" style=\"margin-top: 0px;\" >";
content5+="        <span onclick=\"WdatePicker({maxDate:'2099-12-31 23:59:59',dateFmt:'yyyy-MM-dd HH:mm'})\" style=\"margin-left: 0px\" class=\"time\" id=\"interviewTime\"><i class=\"iconfont icon-xia1\"></i></span>";
// content5+="        <ul style=\"display: none;\" class=\"selectControlList\">";
// content5+="            <li>123</li>";
// content5+="            <li>123</li>";
// content5+="            <li>123</li>";
// content5+="            <li>31</li>";
// content5+="     </ul>";
content5+="    </div>";
content5+="</div>";
content5+="<div class=\"clearfix\"> ";
content5+="    <span>面试地点：</span>";
content5+="<input type=\"text\" class=\"o_txt bitian area\" id=\"interviewPlace\" placeholder=\"请输入您邀请面试的地点\" />"
content5+="</div>";
content5+="<div class=\"clearfix\"> ";
content5+="    <span>联系人：</span>";
content5+="<input type=\"text\" class=\"o_txt bitian contact\" id=\"contactName\" placeholder=\"请输入您面试联系人的姓名\" />"
content5+="</div>";
content5+="<div class=\"clearfix\"> ";
content5+="    <span>联系电话：</span>";
content5+="<input type=\"text\" class=\"o_txt bitian phone\" id=\"contactPhone\" placeholder=\"请输入您面试联系人的电话\" />"
content5+="</div>";
content5+="<div class=\"clearfix\"> ";
content5+="    <span>补充内容：</span>";
content5+="<textarea maxlength=\"200\" class=\"bitian cont\" id=\"remark\" placeholder=\"请输入补充内容\"></textarea>";
content5+="<p><span class=\"c_99 fz12\" style=\"width:auto;font-size:12px;margin-left:80px;\">编辑内容仅针对本次发送，不会影响模板</span><span style=\"font-size:12px;width:auto;\" class=\"f_r c_f6\">(<b class=\"d\">0</b>/200)</span></p>";
content5+="</div>";
content5+="    <button class=\"o_btn \" onclick=\"interviewDeal(\'#interview_notice\')\">确认提交</button><a href=\"javascript:void(0)\" onclick=\"o_yl(this)\">预览</a>";
content5+="</div>";
content5+="<div class=\"ms2 ms\" style=\"display:none\">";
content5+="<p style=\"font-size:14px;margin-bottom:20px;line-height:26px\" class=\"c_66\">您好！如果你已经跟候选人进行过面试，您可以标记简历状态为“已安排面试”，标记后，简历会进入“已安排面试”列表中。</p>";
content5+="<p><span>面试时间：</span><input type=\"text\" class=\"o_txt bitian\" placeholder=\"请选择您邀约面试的时间\" /></p>";
content5+="<p><span>联系电话：</span><input type=\"text\" class=\"o_txt bitian\" placeholder=\"请输入面试者的电话\" /></p>";
content5+="<p><span >联系人：</span><input type=\"text\" class=\"o_txt bitian\" placeholder=\"请输入面试者的姓名\" /></p>";
content5+="    <button class=\"o_btn \">确认</button><a href=\"javascript:void(0)\" onclick=\"o_hide(\'#interview_notice\')\">取消</a>";
content5+="</div>";
content5+="<div class=\"msyl\" style=\"display:none\">";
content5+="<h2 class=\'c_33\'><span class=\'position\' style='min-width:auto'></span></h2>";
content5+="<p style=\"margin:0px 0px 10px 0px\">发送给：<span class='email'>673619783@qq.com</span></p>";
content5+="<p class=\"ml15\"><span class='email'>673619783@qq.com</span>，您好：</p>";
content5+="<p class=\"ml15 cont\" style=\"margin-bottom:10px\"></p>";
content5+="<p class=\"ml15\">面试时间：<span class='time'></span></p>";
content5+="<p class=\"ml15\">面试地点：<span class='area'></span></p>";
content5+="<p class=\"ml15\">联系人：<span class='contact'></span></p>";
content5+="<p class=\"ml15\">联系电话：<span class='phone'></span></p>";
content5+="    <button class=\"o_btn \" onclick=\"fhxg(this)\">返回修改</button>";
content5+="</div>";
content5+="</div>";
content5+="</div>";
content5+="<script>$(function(){select_div($(\"#interview_notice .s li\"),$(\"#interview_notice .ms\"));radio_li($(\"#interview_notice li\"))});o_select(\"#interview_notice .selectControl\",\"#interview_notice .selectControl li\");word_length($(\"#interview_notice textarea\"),$(\"#interview_notice .d\"));</script>";
//查看联系方式
content6+="<div class=\"o_modal\" id=\"gold_pay\" style=\"display: block\">";
content6+="<div class=\"o_common gold_pay\">";
content6+="    <h1>提示信息<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#gold_pay\')\"></i></h1>";
content6+="         <p style=\"font-size:14px;color:#666;\">查看这份简历需要花<span style=\"color:#ff6a6a;margin-right:5px;\">￥100</span>元！你确定要查看吗？</p>"
content6+="    <button class=\"o_btn \" onclick=\"\" style=\"margin:30px auto 0px;display:block\">立即支付</button>";
content6+="</div>";
content6+="</div>";

function o_yl(obj){
    $(obj).parent().css('display', 'none').siblings('').not("h1").css('display', 'none');$(".msyl").css('display', 'block');
    $("#interview_notice .msyl").find('.email').text($("#interview_notice .ms1").find('.sjr').text());
    $("#interview_notice .msyl").find('.position').text($("#interview_notice .ms1").find('.position').val());
    $("#interview_notice .msyl").find('.time').text($("#interview_notice .ms1").find('.time').text());
    $("#interview_notice .msyl").find('.area').text($("#interview_notice .ms1").find('.area').val());
    $("#interview_notice .msyl").find('.contact').text($("#interview_notice .ms1").find('.contact').val());
    $("#interview_notice .msyl").find('.phone').text($("#interview_notice .ms1").find('.phone').val());
    $("#interview_notice .msyl").find('.cont').text($("#interview_notice .ms1").find('.cont').val());
}    
function fhxg(obj){
    $(obj).parent().css('display', 'none').siblings('ul').css('display', 'block');$(".ms1").css('display', 'block');
}
//自动查找信息（职位）
function setAutoComplete(resume_source){
    $.ajax({
        type: "POST",
        url: "/getAjaxPosition",
        async: false,
        data: {"resume_source": resume_source},
        dataType: "json",
        success: function(data){
            console.log($('input[name="autoFinish"]'))
            $('input[name="autoFinish"]').AutoComplete({
                'data': data ,
                'itemHeight': 20,
                'width': 'auto',
                'afterSelectedHandler': function(data) {
                    $('input[name="autoFinish"]').next().val(data.label)
                }
                ,'listStyle': 'custom',
                'emphasis': false,
                'createItemHandler': function(index, data) {
                    return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                }
            }).AutoComplete('show');
        }
    });
}
//获得模板
function getMyModels(obj, type){
    $.ajax({
        type: "POST",
        url: "/ajax_getMyModels",
        async: false,
        dataType: "json",
        success: function(data){
            obj.empty();
            for(var m = 0;m < data.length;m++){
                var str = '<li value="'+data[m].content+'">' + data[m].model_name + '</li>';
                obj.append(str);
            }
            obj.children('li').click(function(){
                var _this = this;
                obj.prev().empty();
                obj.prev().append($(_this).text() + '<i class="iconfont icon-xia1"></i>');
                if(type == 'bhs'){
                    $('#improper').val($(_this).attr('value'));
                }
            });
        }
    });
}
//编辑模板
function editModel(){
    window.open('/account/zhsz?index_type=third', '_blank');
}