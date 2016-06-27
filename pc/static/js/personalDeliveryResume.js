// 投递简历插件
$("#tdjl_Modal1").remove();
$("#tdjl_Modal2").remove();
$("body").append('<div id="tdjl_Modal1" style="display: none;">\
  <p class="title">简历中：</p>\
  <p class="content1" id="send_notice"><a href="javascript:void(0)">学历、期望工作城市</a>\
  与该职位要求不匹配，确认要投递吗</p>\
  <div class="bottom">\
    <a href="javascript:void(0)" class="confirm_btn">确定投递</a>\
    <a href="javascript:void(0)" class="active cancel_btn" >放弃投递</a>\
  </div>\
</div>\
<div id="tdjl_Modal2" style="display: none;">\
   <p class="title">简历已成功投出去了，请静候佳音！\
   <a href="javascript:void(0)" id="back_btn">撤回</a><em id="timer">( 15 )</em>\
   </p>\
   <div class="complete_box">\
     <span class="complete_btn">我知道了</span>\
   </div>\
   <p class="title_back" style="display: none;">\
     简历已成功撤回。\
   </p>\
   <div class="back_box" style="display: none">\
     <span class="back_btn">我知道了</span>\
   </div>\
   <div class="b">\
       <div id="qrcode"></div>\
       <dl>\
         <dt>简历二维码</dt>\
         <dd>扫一扫并分享增加面试机会</dd>\
       </dl>\
   </div>\
</div>')

var totalSecond = 15;
var deliveryTimer;
var forwardFag = true;
var send_resume_id;
var send_position_id;
var send_source_id;

function tdjl_confirm(resume_id, position_id, source_id) {
  send_position_id = position_id;
  send_resume_id = resume_id;
  send_source_id = source_id;
    var send_or_not = false;
    $.ajax({
        async: false,
        type: "POST",
        url: "/judgeSendOrNot",
        data: {
            "position_id": send_position_id,
            "resume_id": send_resume_id,
            "source_id": send_source_id
        },
        dataType: "json",
        success: function(data) {
            if(data.status == '2'){
                send_or_not = true;
            }
        }
    });
    if(send_or_not){
        alert('你已投递该职位，无需投递！', 4);
        return false;
    }
    var result = '';
    //判断职位与简历的匹配条件
    $.ajax({
        async: false,
        type: "POST",
        url: "/resumeMatchPositionInfo",
        data: {
        "position_id": send_position_id,
        "resume_id": send_resume_id
        },
        dataType: "json",
        success: function(data) {
            if(data.status == '1'){
                result = data.msg;
            }
        }
    });
    if(result == ''){
        tdjl();
    }else{
        $('#send_notice').empty();
        $('#send_notice').append('您的<a href="javascript:void(0)" style="font-size:16px; color:#5c91d9;">' + result + '</a>与该职位要求不匹配，确认要投递吗');
        layer.open({
            title: "投递简历确定<em class='c_abs'></em>",
            type: 1,
            area: ['486px', 'auto'],
            skin: 'tdjl_Modal1',
            shade: [0.7, '#393D49'],
            content: $("#tdjl_Modal1"),
            success: function(layero, index) {
                $("#tdjl_Modal1 .cancel_btn").click(function() {
                    layer.close(index);
                })
                $(".confirm_btn").click(function() {
                    tdjl();
                })
            }
        });
    }

}

function tdjl() {
  layer.closeAll();
  if (send_resume_id == '') {
     window.alert('你还没有简历，请维护简历后在投递', 4);
     return;
  }
  forwardFag = true;
  layer.open({
    title: "投递简历<em class='c_abs'></em>",
    type: 1,
    area: ['550px', 'auto'],
    shade: [0.7, '#393D49'],
    skin: 'tdjl_Modal2',
    content: $("#tdjl_Modal2"),
    zIndex: 19891016,
    cancel: function() {
      if (forwardFag)
        delivery();
    },
    success: function(layero, index) {
      totalSecond = 15;
      clearInterval(deliveryTimer);
      $("#timer").text("( " + totalSecond + " )");
      $("#qrcode").empty().removeAttr('title');
      deliveryTimer = setInterval(function() {
        if (totalSecond <= 0) {
          clearInterval(deliveryTimer);
          delivery();
        }
        $("#timer").text("( " + totalSecond + " )");
        totalSecond = totalSecond * 1 - 1;
      }, 1000)
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 118, //设置宽高
        height: 116
      });
      qrcode.makeCode("http://home.hcdyhr.com/mobile/headhunter/detail_uploaded_resume?resume_id=" + send_resume_id);
      $("#tdjl_Modal2 .title").show();
      $("#tdjl_Modal2 .b").show();
      $("#tdjl_Modal2 .complete_box").show();
      $("#tdjl_Modal2 .title_back").hide();
      $("#tdjl_Modal2 .back_box").hide();
      $(".complete_box .complete_btn, .back_box .back_btn").click(function() {
        layer.close(index);
      })
    }
  });
}


$("#back_btn").click(function() {
  $("#tdjl_Modal2 .title").hide();
  $("#tdjl_Modal2 .b").hide();
  $("#tdjl_Modal2 .complete_box").hide();
  $("#tdjl_Modal2 .title_back").show();
  $("#tdjl_Modal2 .back_box").show();
  clearInterval(deliveryTimer);
  totalSecond = 15;
  forwardFag = false;
})
$("#tdjl_Modal2 .complete_btn").click(function() {
  delivery();
})


//投递事件
function delivery() {
  if (send_resume_id != '') {
    $.ajax({
      type: "POST",
      url: "/ajax_sendResume",
      data: {
        "sourceId": send_source_id,
        "positionId": send_position_id,
        "resumeId": send_resume_id
      },
      dataType: "json",
      success: function(data) {
        if (data.msg == 'success') { location.href = "/resume/success_resume_td?position_id=" + send_position_id;} else if (data.msg == 'exist') {
          window.alert('你已投递该职位，无需投递！', 4);
        } else {
          window.alert(data.msg, 4);
        }
      }
    })
  } else {
    window.alert('你还没有简历，请维护简历后在投递', 4);
  }
}