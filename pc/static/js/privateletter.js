function getOperateDatass(obj, privanames, priaveid, type, id, name, content) {
    // 1-私信接收人名字，2-私信接收人ID，3-类型(1简历或3职位)，4-简历或职位ID，5-简历或职位名称，6-工作平台的模版内容
    if ($("#sxmessage_Modal").length <= 0) {
        var html = "<div class=\"modal fade\" id=\"sxmessage_Modal\" style='margin-top:80px;overflow-y: inherit!important;'; tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">";
        html += "   <div class=\"modal-dialog\" style='width:610px'>";
        html += "     <div class=\"modal-content\">";
        html += "        <div class=\"modal-header\">";
        html += "           <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>";
        html += "<em class='b_abs'></em>";
        html += "            <h4 class=\"modal-title\" id=\"myModalLabel\"><a href='http://www.baidu.com'>发送私信</a></h4>";
        html += "        </div>";
        html += "        <div class=\"modal-body t_c\">";
        html += "             <div  class=\"message_Modal_box\">";
        html += "                 <span>某某某";
        html += "                 <label>x</label>";
        html += "                 </span>";
        html += "             </div>";
        html += "             <div  class=\"modal_wdgz mt10\"> ";
        html += "                  <i class=\"iconfont icon-iconfontmoban2\"></i> ";
        html += "                  <p style=\"display: inline;color: #666;padding-left: 5px; font-size:14px;\">信息模板</p> ";
        html += "                <div class=\"dialog\" style=\"display:none\">";
        html += "                   <div class=\"t_c\">";
        html += "                         <input type=\"button\" name='' class=\"re_btn\" value=\"确认\">";
        html += "                         <input type=\"button\" name='' class=\"qx_btn ml15\" value=\"取消\">";
        html += "                    </div>";
        html += "                </div>";
        html += "             </div>";
        html += "             <div class=\"message_Modal_box1 mt10\" style='height:310px'>";
        html += "              <div contentEditable='true' id='letterContent' class='test_box'></div>";
        html += "             </div>";
        html += "         </div>";
        html += "            <div class=\"modal-footer\">";
        html += "               <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" style=\"background:#5c91d9;\" id=\"send\" onclick=\"sendLetter('" + privanames + "','" + priaveid + "')\">发送</button>";
        html += "           </div>";
        html += "     </div>";
        html += "   </div>";
        html += "</div>";
        $("body").append(html);
    }
    $('#send').attr('onclick', "sendLetter('" + privanames + "','" + priaveid + "')");
    if ($.trim(privanames) == "") {
        alert("请选择要操作的数据！", 4);
    }
    if ($.inArray(",", privanames) > 0) {
        $('.message_Modal_box').children().remove();
        var $message_Modal_box = $('.message_Modal_box');
        $message_Modal_box.children().remove();
        var abli = privanames.split(',');
        $.each(abli, function (n, val) {
            $message_Modal_box.append('<span>' + val + '<label>x</label></span>');
        });
        $(".message_Modal_box label").click(function () {
            if ($(".message_Modal_box").find("span").length == 1) {
                alert("您不能移除所有的私信接收人!", 4);
                return false;
            }
            $(this).parent().remove();
        })
    } else {
        var $message_Modal_box = $('.message_Modal_box');
        $message_Modal_box.children().remove();
        var abli = privanames.split(',');
        $.each(abli, function (n, val) {
            $message_Modal_box.append('<span>' + val + '</span>');
        });

    }
    $('#letterContent').empty();
    var letter_text = '';
    if(type){
        if(type == 1){
            //个人不设默认内容
        }else if(type == 2){
            letter_text = "您好，我对简历<a href=\"/resume/new_jlyl?resumeID="+id+"\" class='letterlj' target='_blank'>" + name + "</a>比较感兴趣，想要了解一下该人才的具体情况，希望能与您进行详细沟通";
        }else{
            letter_text = "您好，我对您发布的职位<a href=\"/resume/zwxq?positionId="+id+"\" class='letterlj' target='_blank'>" + name + "</a>比较感兴趣，想要了解一下该职位的具体情况，希望能与您进行详细沟通";
        }
        $('#letterContent').append(letter_text);
    }else if(content){
        $('#letterContent').append(decodeURIComponent(content));
    }

 $('div[contentEditable=true]').keydown(function(event){
    // console($(this).text());
   var innnerText=$(this).text();
   if(innnerText.length>=300){
        return false;
   }else{
        divinnerhtml="";
   }
  });
}


function sendLetter(privanames, priaveid) {
    var letterContent = $('#letterContent').html();
    if ($.trim(letterContent) == '') {
        window.alert("请填写私信内容！", 4);
        $('#send').attr('data-dismiss', '');
        return;
    }
    if ($.inArray(",", priaveid) > 0) {
        //判断是给单个对象发私信还是给选中的对象发私信
        // if($('#operateState').val() == 'simple'){
        //简历拥有人ID
        var attentionId = priaveid.split(',');
        $.ajax({
            type: "POST",
            url: "/ajax_sendSelected",
            data: {
                "attentionIds": attentionId,
                "letterContent": letterContent
            },
            dataType: "json",
            success: function(data) {
                if (data.msg == 'success') {
                    $('#send').attr('data-dismiss', 'modal');
                    window.alert('发送成功！', 1)
                } else {
                    window.alert(data.msg, 4);
                }
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/ajax_sendLetter",
            data: {
                "attentionId": priaveid,
                "letterContent": letterContent
            },
            dataType: "json",
            success: function(data) {
                if (data.msg != 'success') {
                    window.alert(data.msg, 4);
                } else {
                    $('#send').attr('data-dismiss', 'modal');
                    window.alert('发送成功！', 1)
                }
            }
        })
    }
}





