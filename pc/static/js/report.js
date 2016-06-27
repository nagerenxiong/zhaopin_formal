/**
 * Created by xiaohui on 2015-12-1
 */

//举报填写
function showreport(type, report_model_id) {
/*
    type:   举报类型  1： 举报List, 2: 举报resume, 3:举报职位 4、举报猎头
    report_model_id:    被举报对象 id
 */
    var flag = true;
    $.ajax({
        async: false,
        type: 'POST',
        data: {'report_type': type, 'report_model_id': report_model_id},
        url: '/ajax_isReportedModelRecentTime',
        dataType: 'json',
        success: function(data) {
            if(data == 1) {
                flag = false
            }
        }
    });
    // 今天举报过
    if (flag == false) {
        auditreport();
        return false;
    }


    var html ='<div class="modal_wrap"></div><div class="report_mod"><div class="reheader"><div class="remo_tifl">举报</div>';
        html += '<div class="remo_clfr"><img src="/static/images/new_images/colseck.png" onclick="deleterepor(this)"></div></div><div class="rebody">';
        html += '<div class="re_ti"><img src="/static/images/new_images/ask.png"><span>你为什么要举报此信息？</span></div>';
        html += '<div class="choice_reason"><p class="reason_p">请选择您的举报理由<img src="/static/images/new_images/xjt.png" alt=""></p>';
        html += '<ul class="xl_mes">';
        html += '<input type="hidden" class="reportReason" >';
        $.ajax({
            async: false,
            type: 'POST',
            data: {'type': type},
            url: '/ajax_getReportReasonsByType',
            dataType: 'json',
            success: function(data) {
                if(data.length > 0) {
                    for(i = 0; i < data.length; i ++) {
                        html += '<li class="' + data[i].dictionary_value + '">' + data[i].dictionary_name + '</li>'
                    }
                }
            }
        });
        html += '</ul>';
        html += '</div><div style="clear:both;"></div>';
        html += '<div class="reportcont-wrap" style="position: relative;">';
        html += '<textarea id="reportContent" class="reporcont" placeholder="请描述您的举报理由" style="overflow-x: hidden;overflow-y: auto;outline: none;" tabindex="0"></textarea>';
        html += '<span id="reportNotice01" style="position: absolute;bottom:5px;right: 36px;font-size: 12px;"></span></div>';
        html += '<div class="combtn"><input type="button" class="btn-affirm" value="确认" onclick="sendUserReport(' + type + ',' + report_model_id + ')"><span onclick="deleterepor(this)">取消</span></div></div></div>';
        
        $("body").append(html);
        $('.reason_p').click(function(){ 
            if($(this).next().css('display') == "none"){
              $(this).next().css({
                borderColor: '#5C91D9',
                borderTopColor: '#EEE'
              }).slideDown(150);
              $(this).css({
                borderColor: '#5C91D9',
                borderBottomColor: '#EEE'
              });
            }
            else{
              $(this).next().slideUp(150);
               $(this).next().css({
                borderColor: '#EEE'
              });
              $(this).css({
                borderColor: '#EEE'
              });
            }

            });
            // 理由选择
            $(".xl_mes li").click(function(){
                $(".reportReason").val($(this).attr('class'));
                $(this).parent().slideUp(150).prev().text($(this).text()).append('<img src="/static/images/new_images/xjt.png" alt="">');
                $(this).parent().css({
                    borderColor: '#EEE'
                  });
                  $(this).parent().prev().css({
                    borderColor: '#EEE'
                  });

            });

        //字数限制
        var reportCharLimit = 150;//可设置限制字符数字
        var onCharLimit;
        function check() {
            var str = $("#reportContent").val();
            var len = strlen(str);
            var info = reportCharLimit - len;
            if (len < reportCharLimit) {
                $("#reportNotice01").html("还能输入" + info + "个字符");
                $("#reportNotice01").css('color','#999');
                $('.btn-affirm').on('click',function(){ //当字数符合要求时，将绑定对应事件
                    sendUserReport(3,22792);
                })
                $('.btn-affirm').removeClass("disabled");
            } else {
                $("#reportNotice01").html("达到限制字数！");
                $("#reportNotice01").css('color','#f00');
                $('.btn-affirm').prop("onclick",null); //去除onclick事件method01
                $('.btn-affirm').removeAttr("onclick"); //去除onclick事件method02
                $('.btn-affirm').off("click"); //当字数减少时上面重新绑定事件，这里将解绑事件
                $('.btn-affirm').addClass("disabled");
            }
        }
        $("#reportContent").focus(function(){
            $('.xl_mes').slideUp(150); //原因选择收回
            $('.reason_p').css('border-color',"#eee");//原因选择边框还原为#eee
            onCharLimit = setInterval(function(){ //当聚焦时添加定时任务，检查字数
                    check();
            }, 200);
        });
        $("#reportContent").blur(function(){
            clearInterval(onCharLimit);//当失去焦点时，解除定时任务
        });

}

//字数限制模块-过滤空字符
function trim(str) {
    return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}
//字符限制-获取字数总长充，ASCLL < 255 在这里算0.5个字，其他算1个字
function strlen(str) {
    var str = trim(str);
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255 ? 0.5 : 1;
    }
    return len;
}

// 举报提交
var iii=0
function sendUserReport(type, report_model_id) {
    var reportReason = $(".reportReason").val();
    var reportContent = $("#reportContent").val();
    if(reportReason == "" && !($('.btn-affirm').hasClass("disabled"))&&iii==0){
        alert("请选择举报原因");
        return false;
    }
    if(reportContent == ""&&iii==0){
        alert("请输入举报理由");
        return false;
    }
    if(iii!=0)
    {
        return;
    }
    $.ajax({
        async: false,
        type: "POST",
        url: "/ajax_userReportModel",
        data: {"report_type": type, 'report_model_id': report_model_id, 'report_reason': reportReason, 'report_content': reportContent},
        dataType: "json",
        success: function (data) {
            // data:  1: 成功    2： 今天已经操作过   3： 失败
            $(".report_mod").hide();
            if(data == '1') {
                reportsuccess();
                $(".reportBlock").attr('onclick', 'auditreport()');
                $("#reportContent").val('');
                $(".reportReason").val('');
                iii++;
            } else if(data == '2') {
                auditreport();
            } else {
                alert('举报失败！');
            }
        }
    });
}


//审核中的举报
function auditreport()
{
    var html ='<div class="modal_wrap"></div><div class="report_mod" style="height:auto!important;"><div class="reheader"><div class="remo_tifl">举报</div>';
        html += '<div class="remo_clfr"><img src="/static/images/new_images/colseck.png" onclick="deleterepor(this)"></div></div><div class="rebody">';  
        html += '<div class="rebohint">您已经举报过该条信息啦，管理员正在处理中，请耐心等待哦~</div>';
        html += '<div class="confirm_btn"><a href="javascript:void(0);" onclick="deleterepor(this)">知道了</a></div></div></div>';
        $("body").append(html); 
}

//举报成功
function reportsuccess()
{
    
     var html ='<div class="modal_wrap"></div><div class="report_mod" style="height:auto!important;"><div class="reheader"><div class="remo_tifl">举报</div>';
           html += '<div class="remo_clfr"><img src="/static/images/new_images/colseck.png" onclick="deleterepor(this)"></div></div><div class="rebody">';  
       html += '<div class="re_ti"><img src="/static/images/new_images/success.png"><span>举报信息提交成功！</span></div>';
       html += '<div class="rebohint1">您的举报正在等待管理员审核中，我们会在24小时内审核完成，处理完成后会私信通知您，感谢您的反馈！</div>';
       html += '<div class="confirm_btn"><a href="javascript:void(0);" onclick="deleterepor(this)">知道了</a></div></div></div>';
       $("body").append(html); 
}

// 删除举报框
function deleterepor(obj){
    $('.modal_wrap,.report_mod').remove();
}