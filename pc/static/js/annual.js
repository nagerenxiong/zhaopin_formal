// 自适应文字大小 start
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      // if(clientWidth<=640)
        docEl.style.fontSize = clientWidth / 10 + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
// 自适应文字大小 end
var loadData;
var sql;
window.onload = function(){
    loadData = new pagin("positionPagination", "V_HD_Personal_Selection", "", "", "", 8, "paginBind", "loadData");
    $(window).scroll(function() {
        if ($(document).scrollTop() >= $("#positionPagination").offset().top) {
//            var $nextPageLi = $("#positionPagination li:contains('下一页')");
            var $thisPageLi = $("#positionPagination .active");
            var thisPageLi = $thisPageLi.attr("onclick");
//            var nextPageLi = $nextPageLi.attr('onclick');
            var lastPageLi = $("#positionPagination li:last").attr('onclick');
            if(thisPageLi == lastPageLi) {
                console.log('11')
            } else {
                // 下一页
                $thisPageLi.next('li').click();
            }
        }
    });
};

//动态加载页面绑定数据
function paginBind(dataInfo){
     //图片列表数据加载
    $(dataInfo).each(function(i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for (var n = 0; n < len; n++) {
            if (array[n] == null) {
                array[n] = "&nbsp;"
            }
        }
        if(array[1]== 1013){
            array[4] = "江西盈科行网络科技"
        }
        if(array[1]== 1016){
            array[4] = "南昌中环互联信息"
        }
        if(array[1]== 1026){
            array[4] = "江西友尼宝农业科技"
        }
        if(array[1]== 1034){
            array[4] = "亚马逊（中国）餐饮"
        }
        if(array[1]== 1009){
            array[4] = "赣州虔东稀土集团"
        }
        if(array[1]== 1008){
            array[4] = "江西垒旺实业发展集团"
        }
        if(array[1]== 1028){
            array[4] = "江西联创光电科技"
        }
        if(array[1]== 1030){
            array[4] = "江西远成汽车技术"
        }
        var jindu = array[9]/20;//array[9]/2000  *100 
        var content = '';
        content += '<li class="clearfix">';
        content += '	<div class="tx">';
        content += '		<img src="'+array[3]+'" alt="">';
        content += '		<span class="abs"><em>'+array[1]+'</em></span>';
        content += '	</div>';
        content += '	<div class="info f_r">';
        content += '		<h1>';
        content += '			<span class="name">'+array[2]+'</span>';
        content += '			<span class="position">'+array[5]+'</span>';
        content += '		</h1>';
        content += '		<p class="company">'+array[4]+'</p>';
        content += '		<p class="count" id="count'+array[0]+'">';
        content += '			<span>'+array[9]+'</span>';
        content += '			票';
        content += '		</p>';
        content += '		<p class="jindu">';
        content += '			<em></em>';
        content += '			<span style="width:'+jindu+'%;max-width:100%"></span>';
        content += '		</p>';
        content += '	</div>';
        content += '	<button class="up" onclick="selectPersonal(\''+array[0]+'\')">我要投票</button>';
        content += '</li>';
        $('.man').append(content);
    })
}
//我要投票
function selectPersonal(personal_id){
    if($('#nickname').val() == ''){
        $('.o_modal').css('display','block');
        return;
    }

    $.ajax({
        type: "POST",
        url: "/activity/ajax_personal2015selection",
        data: {
            "personal_id": personal_id
        },
        dataType: "json",
        success: function(data){
            if(data == 2){
                window.alert('你已投票，同一个人每天只能投一票');
            }else if(data > 9){
                window.alert('投票成功');
                var dqcount=$('#count'+personal_id+' span').html();
                $('#count'+personal_id+' span').html(parseInt(dqcount)+1);
            }else if(data == 3){
                window.alert('一个人每天最多只能投10票');
            }else if(data == 5){
                window.alert('活动已结束，感谢您的参与');
            }else{
                window.alert('系统繁忙，请稍后再试')
            }
        }
    });
}
//搜索推荐人
function searchPersonal(){
    var condition = $('#search_condition').val();
    if($.trim(condition) != '') {
        sql = ' (user_no="' + condition + '" or user_name="' + condition + '") order by select_count desc, id';
    }else{
        sql = '';
    }
    $('.man').empty();
    loadData = new pagin("positionPagination", "V_HD_Personal_Selection", "", encodeURI(sql), "", 8, "paginBind", "loadData");

}


function closefc(){
    $('.o_modal').css('display','none');
}


//弹框
 var timer = null;
    var alertFram;
    window.alert = function(txt) {
        clearInterval(timer);
        timer =setInterval(function() {
            if ($("#alertFram")[0]) {
                $("#alertFram").remove();
                clearInterval(timer);
            }
        }, 1600)
        alertFram = $('<div id="alertFram" style="color:#fff;border-radius:5px;word-wrap:break-all; overflow:hidden; width:240px; display:block; padding:10px 20px; font-size:14px;background-color:#333; position:fixed; top:50%;left:43%;z-index:999999999;text-align:center;line-height:25px;">' + txt + '</div>')        
        if ($("#alertFram")[0]) {
            return;
        }8
        $("body").append(alertFram);
        var width = alertFram.width();
        var height = alertFram.height();
        alertFram.css({
            marginLeft: -width/2+'px',
            marginTop: -height/2+'px'
        });
      }
