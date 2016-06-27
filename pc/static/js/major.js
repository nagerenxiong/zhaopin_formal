/**
 * Created by zhoujia on 2015-07-08.
 */
var major_now_level;

function showMajor(obj, majorCount) {
    major_now_level = 1;
    $("#major_moadl").remove();
    var html = "  <div class=\"modal fade\" id=\"major_moadl\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">";
    html += "         <div class=\"modal-dialog\" style=\"width:840px\">";
    html += "            <div class=\"modal-content\" >";
    html += "                <div class=\"modal-header\">";
    html += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>";
    html += "                    <h4 class=\"modal-title\" id=\"myModalLabel\">选择专业</h4>";
    html += "                </div>";
    html += "                <div class=\"modal-body\">";
    html += "                <div id=\"majorTag\" class=\"schy_tag_ul\" style=\"position: relative;\">最多选择" + majorCount + "项：</div> ";
    html += "                     <div class=\"mt10\">";
    html += "<img src=\"/static/images/xzhy_062.jpg\" alt=\"\">";
    html += "                    </div>";
    html += "                    <ul name=\"majorUL\" class=\"qbhy_ul clearfix mt20\">";

    //获取行业数据
    $.ajax({ //异步获取行业下的子类
        async: false,
        type: "POST",
        url: "ajax_dictionary",
        data: {
            "p_value": "30000000"
        },
        dataType: "json",
        success: function(data) {
            $(data).each(function(i) {
                html += "<li onclick=\"getMajor(this," + majorCount + ")\"><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /><span>" + this.dictionary_name + "</span></li>";

                if (i != 0 && (i + 1) % 6 == 0) {
                    html += "<li class=\"childMajor\" style=\"width: 100%;height: auto;clear: both;display:none\"><ul class=\"qbhy_div\"></ul></li>";
                }
            });
            html += "<li class=\"childMajor\" style=\"width: 100%;height: auto;clear: both;display:none\"><ul class=\"qbhy_div\"></ul></li>";
        }
    });

    html += "                    </ul>";
    // html += "                    <ul class=\"qbhy_div\" style=\"display:none\" id=\"childMajor\"></ul>";
    html += "                    <ul class=\"qbhy_div\" style=\"display:none\"></ul>";
    html += "                </div>";
    html += "                <div class=\"modal-footer\" style=\"text-align: center\">";
    html += "                    <button type=\"button\" class=\"btn btn-default\"";
    html += "                       data-dismiss=\"modal\" style=\"width:120px;height:40px;background-color: #38b7a9\">取消</button>";
    html += "                    <button id=\"confirmMajor\" type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-dismiss=\"modal\" data-target=\"#sczy_moadl\"  style=\"width:120px;height:40px;background-color: #5c91d9\">确认</button>";
    html += "                </div>";
    html += "            </div>";
    html += "         </div>";
    html += "     </div>";

    $("body").append(html); //添加弹出框主题
    //设置选中值
    if ($(obj).val() != "") {
        var majorNameList = $(obj).val().split(",");
        var majorValueList = $(obj).next().val().split(",");

        for (var i = 0; i < majorNameList.length; i++) {
            $("#majorTag:first").append('<span style="width:200px;"><input type="hidden" value="' + majorValueList[i] + '" />' +
                majorNameList[i] + '<i><a href="javascript:void(0);" style="color: white;">x</a></i></span>');
        }

        $("#majorTag:first").children('span').children('i').click(function() {
            $(this).parent().remove();
        });
    }

    $("#major_moadl").modal("show"); //显示弹出框

    $("#confirmMajor").click(function() { //设置值给调用对象
        //获取name
        var name = "";
        var value = ""
        $("#majorTag:first").children('span').each(function() {
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

function getMajor(obj, majorCount) {
    major_now_level = 1;
    $("ul[name='majorUL'] li span").removeClass('active');
    $(obj).children('span').addClass('active');
    // $(obj).parent().children(".childMajor").attr("data-isShow","no");
    var value = $(obj).children('input:first').val(); //获得行业的值

    $.ajax({ //异步获取行业下的子类
        type: "POST",
        url: "ajax_dictionary",
        data: {
            "p_value": value
        },
        dataType: "json",
        success: function(data) {
            if ($(obj).parent().children(".childMajor").index($(obj).parent().children(".childMajor[data-isShow=yes]")) == $(obj).parent().children(".childMajor").index($(obj).nextAll(".childMajor:eq(0)"))) {
                $(obj).nextAll(".childMajor:eq(0)").children("ul").empty();
            } else {
                $(obj).parent().children(".childMajor[data-isShow=yes]").removeAttr("data-isShow");
                $(obj).parent().children(".childMajor").hide();
            }
            $(obj).nextAll(".childMajor:eq(0)").attr("data-isShow", "yes");
            $(data).each(function() {
                $(obj).nextAll(".childMajor:eq(0)").children("ul").append("<li onclick=\"setMajorValue(this," + majorCount + ")\" style=\"width:187px;height:35px;text-align: center; \"><span>" + this.dictionary_name + "</span><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /></li>");
            });
            if ($(obj).nextAll(".childMajor:eq(0)").css("display") == "none") {
                $(obj).nextAll(".childMajor:eq(0)").slideDown('500');
            } else {
                $(obj).nextAll(".childMajor:eq(0)").show();
            }
        }
    });
}
var backspaceConten;
var nowUL;
function setMajorValue(obj, majorCount) {
    if (major_now_level == 1) {
        major_now_level = 2;

        nowUL = $(".childMajor[data-isshow='yes'] ul");
        backspaceConten =  $(nowUL).html();
        $(nowUL).empty();

        $(nowUL).append("<li class=\"return_li\"><span class=\"f_r\" onclick=\" backspace()\">返回上一级 <i class=\"iconfont icon-fanhui\" style=\"font-size: 22px;\"></i>"+
                "</span><span  class=\"f_l\">"+ $(obj).children("span").text() +"</span></li>");
        $.ajax({ //异步获取行业下的子类
            type: "POST",
            url: "ajax_dictionary",
            data: {
                "p_value": $(obj).children("input").val()
            },
            dataType: "json",
            success: function (data) {
                $(data).each(function () {
                    $(nowUL).append("<li title=\"" + this.dictionary_name + "\" onclick=\"setMajorValue(this," + majorCount + ")\" class=\"nowrap\"><span>" +
                        this.dictionary_name + "</span><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /></li>");
                });
            }
        });

    } else {
        var count = $("#majorTag:first").children('span').length;

        

        if ($("#majorTag:first").find("input[value=" + $(obj).find('input').val() + "]").length > 0) {
            alert('该项已选择！');
            return;
        }
        if (count == majorCount) {
            // alert("最多只能选择" + majorCount + "个项目！");
            // return;
            $("#majorTag span:last").html('<input type="hidden" value="' + $(obj).find('input').val() + '" />' +
            $(obj).find('span').text() + '<i><a href="javascript:void(0);" style="color: white;">x</a></i>');
        }else{
        $("#majorTag:first").append('<span style="width:200px;"><input type="hidden" value="' + $(obj).find('input').val() + '" />' +
            $(obj).find('span').text() + '<i><a href="javascript:void(0);" style="color: white;">x</a></i></span>');
    }
        $("#majorTag:first").children('span').children('i').click(function() {
            $(this).parent().remove();
        });

        $('#childMajor').children().children('span').removeClass();
        $('#childMajor').children('span').addClass('active');
    }
}

//返回上一级
function backspace(){
    major_now_level = 1;
    $(nowUL).empty();
    $(nowUL).html(backspaceConten);

}