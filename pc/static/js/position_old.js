/**
 * Created by zhoujia on 2015-07-07.
 */
function showPosition(obj,businessulName,businessulValue,positionCount){
    $("#position_modl").remove();

    var html = "  <div class=\"modal fade\" id=\"position_modl\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">";
    html += "         <div class=\"modal-dialog\" style=\"width:840px\">";
    html += "            <div class=\"modal-content\" >";
    html += "                <div class=\"modal-header\">";
    html += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>";
    html += "                    <h4 class=\"modal-title\" id=\"myModalLabel\">选择职位</h4>";
    html += "                </div>";
    html += "                <div class=\"modal-body\">";
    html += "                <div id=\"positionTag\" class=\"schy_tag_ul\"> 最多选择"+ positionCount +"项： </div> ";
    html += "                     <div class=\"mt10\">";
    html += "                        <img src=\"/static/images/xzhy_06.png\" alt=\"\">";
    html += "                    </div>";
    html += "                    <ul name=\"positionUL\" class=\"qbhy_ul clearfix mt20\">";

    //获取行业数据
    var businessulNameList = businessulName.split(",");
    var businessulValueList = businessulValue.split(",");

    for(var i=0;i<businessulNameList.length;i++ ){
        html += " <li onclick=\"getPosition(this,"+ positionCount+")\"><input type=\"hidden\" value=\""+ businessulValueList[i] +"\" /><span>"+ businessulNameList[i] +"</span></li>";

        if(i != 0 && (i + 1) % 4 == 0){
           html += "<ul name=\"positionUL\" class=\"qbhy_ul clearfix mt20\" ></ul>";
        }
    }

    html += "                    </ul>";
    html += "                    <ul class=\"qbhy_div\" style=\"display:none\" id=\"childposition\"></ul>";
    html += "                    <ul class=\"qbhy_div\" style=\"display:none\"></ul>";
    html += "                </div>";
    html += "                <div class=\"modal-footer\" style=\"text-align: center\">";
    html += "                    <button id=\"confirmPosition\" type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-dismiss=\"modal\" data-target=\"#sczy_moadl\"  style=\"width:120px;height:40px;background-color: #d21d30\">确认</button>";
        html += "                    <button type=\"button\" class=\"btn btn-default\"";
    html += "                       data-dismiss=\"modal\" style=\"width:120px;height:40px;background-color: #38b7a9\">取消</button>";
    html += "                </div>";
    html += "            </div>";
    html += "         </div>";
    html += "     </div>";

    $("body").append(html);

    //设置选中值
    if($(obj).val() != ""){
        var positionNameList = $(obj).val().split(",");
        var positionValueList = $(obj).next().val().split(",");

        for(var i=0;i<positionNameList.length;i++ ) {
            $("#positionTag:first").append('<span style="width:200px;"><input type="hidden" value="' + positionValueList[i] + '" />' +
                positionNameList[i] + '<i><a href="javascript:void(0);" style="color: white;">x</a></i></span>');
        }

        $('#positionTag:first').children('span').children('i').click(function(){
                    $(this).parent().remove();
        });
    }

    $("#position_modl").modal("show"); //显示弹出框

    $("#confirmPosition").click(function(){
        //获取name
        var name="";
        var value=""
        $("#positionTag:first").children('span').each(function(){
            if(name == "") {
                name = $(this).text();
                value = $(this).find("input[type='hidden']").eq(0).val();
            }
            else {
                name += "," + $(this).text();
                value += "," + $(this).find("input[type='hidden']").eq(0).val();
            }
        });
        $(obj).val(name.replace(/x/g,""));
        $(obj).next().val(value);
    });
 }

function getPosition(obj,positionCount){
    $("ul[name='positionUL'] li span").removeClass('active');
	$(obj).children('span').addClass('active');

    var value = $(obj).children('input:first').val();//获得行业的值

    $.ajax({//异步获取行业下的职位
        type: "POST",
        url: "/ajax_dictionary",
        data: {"p_value": value},
        dataType: "json",
        success: function(data){

            $('#childposition').empty();
            $('#childposition').show();

            $(data).each(function(){
                $('#childposition').append("<li style=\"width:150px;height:70px;text-align: center; \"><span>" + this.dictionary_name + "</span><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /></li>");
            });

            //给子行业标签加事件，把值带到选择框里
            $("#childposition").children().click(function(){
                var count = $("#positionTag:first").children('span').length;

                if(count == positionCount){
                    alert("最多只能选择"+ positionCount+"个项目！");
                    return;
                }

                if($("#positionTag:first").find("input[value="+ $(this).children('input').val() +"]").length > 0){
                    alert('该项已选择！');
                    return;
                }

                $("#positionTag:first").append('<span style="width:200px;"><input type="hidden" value="'+ $(this).children('input').val() +'" />'+
                        $(this).children('span').text()+'<i><a href="javascript:void(0);" style="color: white;">x</a></i></span>');

                $('#positionTag:first').children('span').children('i').click(function(){
                    $(this).parent().remove();
                });

                $('#childposition').children().children('span').removeClass();
                $('#childposition').children('span').addClass('active');
            })

        }
    });
}


