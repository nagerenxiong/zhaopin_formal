/**
 * Created by zhoujia on 2015-07-13.
 */
var poition_all_now_level;

function showPoitionAll(obj, position_all_Count) {
    poition_all_now_level = 1;
    $("#position_all_moadl").remove();
    var html = "  <div class=\"modal fade\" id=\"position_all_moadl\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">";
    html += "         <div class=\"modal-dialog\" style=\"width:840px\">";
    html += "            <div class=\"modal-content\" >";
    html += "                <div class=\"modal-header\">";
    html += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>";
    html += "                    <h4 class=\"modal-title\" id=\"myModalLabel\">选择职位</h4>";
    html += "                </div>";
    html += "                <div class=\"modal-body\">";
    html += "                <div id=\"position_all_Tag\" class=\"schy_tag_ul\" style=\"position: relative;\">最多选择" + position_all_Count + "项：</div> ";
    html += "                     <div class=\"mt10\">";
    html += "<img src=\"/static/images/xzhy_062.jpg\" alt=\"\">";
    html += "                    </div>";
    html += "                    <ul name=\"position_all_UL\" class=\"qbhy_ul clearfix mt20\">";

    //获取行业数据
    $.ajax({ //异步获取行业下的子类
        async: false,
        type: "POST",
        url: "/ajax_dictionary",
        data: {
            "p_value": "20000000"
        },
        dataType: "json",
        success: function(data) {
            $(data).each(function(i) {
                html += "<li onclick=\"getPositionALL(this," + position_all_Count + ")\"><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /><span>" + this.dictionary_name + "</span></li>";

                if (i != 0 && (i + 1) % 4 == 0) {
                    html += "<li class=\"childPositionAll\" style=\"width: 100%;height: auto;clear: both;display:none\"><ul class=\"qbhy_div\"></ul></li>";
                }
            });
            html += "<li class=\"childPositionAll\" style=\"width: 100%;height: auto;clear: both;display:none\"><ul class=\"qbhy_div\"></ul></li>";
        }
    });

    html += "                    </ul>";
    // html += "                    <ul class=\"qbhy_div\" style=\"display:none\" id=\"childPositionAll\"></ul>";
    html += "                    <ul class=\"qbhy_div\" style=\"display:none\"></ul>";
    html += "                </div>";
    html += "                <div class=\"modal-footer\" style=\"text-align: center\">";
    html += "                    <button id=\"confirmPositionAll\" type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-dismiss=\"modal\" data-target=\"#sczy_moadl\"  style=\"width:120px;height:40px;background-color: #d21d30\">确认</button>";
    html += "                    <button type=\"button\" class=\"btn btn-default\"";
    html += "                       data-dismiss=\"modal\" style=\"width:120px;height:40px;background-color: #38b7a9\">取消</button>";
    html += "                </div>";
    html += "            </div>";
    html += "         </div>";
    html += "     </div>";

    $("body").append(html); //添加弹出框主题
    //设置选中值
    if ($(obj).val() != "") {
        var PositionNameList = $(obj).val().split(",");
        var PositionValueList = $(obj).next().val().split(",");

        for (var i = 0; i < PositionNameList.length; i++) {
            $("#position_all_Tag:first").append('<span style="width:200px;"><input type="hidden" value="' + PositionValueList[i] + '" />' +
                PositionNameList[i] + '<i><a href="javascript:void(0);" style="color: white;">x</a></i></span>');
        }

        $("#position_all_Tag:first").children('span').children('i').click(function() {
            $(this).parent().remove();
        });
    }

    $("#position_all_moadl").modal("show"); //显示弹出框

    $("#confirmPositionAll").click(function() { //设置值给调用对象
        //获取name
        var name = "";
        var value = ""
        $("#position_all_Tag:first").children('span').each(function() {
            if (name == "") {
                name = $(this).text();
                value = $(this).find("input[type='hidden']").eq(0).val();
            } else {
                name += "," + $(this).text();
                value += "," + $(this).find("input[type='hidden']").eq(0).val();
            }
        });
        $(obj).val(name.replace(/x/g, ""));
        $(obj).next().val(value);
    });
}

function getPositionALL(obj, position_all_Count) {
    poition_all_now_level = 1;
    $("ul[name='position_all_UL'] li span").removeClass('active');
    $(obj).children('span').addClass('active');
    // $(obj).parent().children(".childPositionAll").attr("data-isShow","no");
    var value = $(obj).children('input:first').val(); //获得行业的值

    $.ajax({ //异步获取行业下的子类
        type: "POST",
        url: "/ajax_dictionary",
        data: {
            "p_value": value
        },
        dataType: "json",
        success: function(data) {
            if ($(obj).parent().children(".childPositionAll").index($(obj).parent().children(".childPositionAll[data-isShow=yes]")) == $(obj).parent().children(".childPositionAll").index($(obj).nextAll(".childPositionAll:eq(0)"))) {
                $(obj).nextAll(".childPositionAll:eq(0)").children("ul").empty();
            } else {
                $(obj).parent().children(".childPositionAll[data-isShow=yes]").removeAttr("data-isShow");
                $(obj).parent().children(".childPositionAll").hide();
            }
            $(obj).nextAll(".childPositionAll:eq(0)").attr("data-isShow", "yes");
            $(data).each(function() {
                $(obj).nextAll(".childPositionAll:eq(0)").children("ul").append("<li onclick=\"setPositionAllValue(this," + position_all_Count + ")\" style=\"width:150px;height:70px;text-align: left; \"><span>" + this.dictionary_name + "</span><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /></li>");
            });
            if ($(obj).nextAll(".childPositionAll:eq(0)").css("display") == "none") {
                $(obj).nextAll(".childPositionAll:eq(0)").slideDown('500');
            } else {
                $(obj).nextAll(".childPositionAll:eq(0)").show();
            }
        }
    });
}
var PositionBackspaceConten;
var PositionNowUL;
function setPositionAllValue(obj, position_all_Count) {    
    if (poition_all_now_level == 1) {
        poition_all_now_level = 2;

        PositionNowUL = $(".childPositionAll[data-isshow='yes'] ul");
        PositionBackspaceConten =  $(PositionNowUL).html();
        $(PositionNowUL).empty();

        $(PositionNowUL).append("<li class=\"return_li\"><span class=\"f_r\" onclick=\" PositionBackspace()\">返回上一级 <i class=\"iconfont icon-fanhui\" style=\"font-size: 22px;\"></i>"+
                "</span><span class=\"f_l active\" style=\"margin-top:10px;height: 35px; line-height: 35px;\">"+ $(obj).children("span").text() +"</span></li>");
        $.ajax({ //异步获取行业下的子类
            type: "POST",
            url: "/ajax_dictionary",
            data: {
                "p_value": $(obj).children("input").val()
            },
            dataType: "json",
            success: function (data) {
                $(data).each(function () {
                    $(PositionNowUL).append("<li onclick=\"setPositionAllValue(this," + position_all_Count + ")\" style=\"margin-right:20px;width:150px;height:30px;text-align: center;line-height:30px; \"><span style=\"padding:0;line-height:inherit\">" +
                        this.dictionary_name + "</span><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /></li>");
                });
            }
        });

    } else {
        var count = $("#position_all_Tag:first").children('span').length;

        if (count == position_all_Count) {
            // alert("最多只能选择" + position_all_Count + "个项目！");
            // alert("success");
            // return;
             $(obj).siblings().css({backgroundColor:'transparent',color:'#666'});
             $(obj).css({backgroundColor:'#D21C30',color:'white'});
             $("#position_all_Tag span").remove();
        }

        if ($("#position_all_Tag:first").find("input[value=" + $(obj).find('input').val() + "]").length > 0) {
            alert('该项已选择！');
            return;
        }

        $("#position_all_Tag:first").append('<span style="width:200px;"><input type="hidden" value="' + $(obj).find('input').val() + '" />' +
            $(obj).find('span').text() + '<label style="color: white;float:right;margin-right:15px;font-size:19px;cursor: pointer;">x</label></span>');

        $("#position_all_Tag:first").children('span').children('label').click(function() {
            $(this).parent().remove();
        });

        $('#childPositionAll').children().children('span').removeClass();
        $('#childPositionAll').children('span').addClass('active');
    }
}

//返回上一级
function PositionBackspace(){
    poition_all_now_level = 1;
    $(PositionNowUL).empty();
    $(PositionNowUL).html(PositionBackspaceConten);

}