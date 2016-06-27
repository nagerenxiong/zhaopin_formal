/**
 * Created by zhoujia on 2015-07-07.
 * 行业选择控件
 */
function showBusinessul(obj,businessulCount){

    $("#businessul_moadl").remove();

    var html = "  <div class=\"modal fade\" id=\"businessul_moadl\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">";
    html += "         <div class=\"modal-dialog\" style=\"width:840px\">";
    html += "            <div class=\"modal-content\" >";
    html += "                <div class=\"modal-header\">";
    html += "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>";
    html += "                    <h4 class=\"modal-title\" id=\"myModalLabel\">选择行业</h4>";
    html += "                </div>";
    html += "                <div class=\"modal-body\">";
    html += "                <div id=\"businessilTag\" class=\"schy_tag_ul\"> 最多选择"+ businessulCount +"项： </div> ";
    html += "                     <div class=\"mt10\">";
    html += "                        <img src=\"/static/images/xzhy_06.png\" alt=\"\">";
    html += "                    </div>";
    html += "                    <ul name=\"businessilUL\" class=\"qbhy_ul clearfix mt20\">";

    //获取行业数据
    $.ajax({//异步获取行业下的子类
        async: false,
        type: "POST",
        url: "/ajax_dictionary",
        data: {"p_value": "20000000"},
        dataType: "json",
        success: function (data) {
            $(data).each(function(i){
                html += "<li onclick=\"getBusinessul(this,"+ businessulCount+")\"><input type=\"hidden\" value=\""+ this.dictionary_value +"\" /><span>"+ this.dictionary_name +"</span></li>";

                if(i != 0 && (i + 1) % 4 == 0){
                   html += "<ul name=\"businessilUL\" class=\"qbhy_ul clearfix mt20\" ></ul>";
                }
            });
        }
    });

    html += "                    </ul>";
    html += "                    <ul class=\"qbhy_div\" style=\"display:none\" id=\"childbusiness\"></ul>";
    html += "                    <ul class=\"qbhy_div\" style=\"display:none\"></ul>";
    html += "                </div>";
    html += "                <div class=\"modal-footer\" style=\"text-align: center\">";
    html += "                    <button id=\"confirmBusiness\" type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-dismiss=\"modal\" data-target=\"#sczy_moadl\"  style=\"width:120px;height:40px;background-color: #d21d30\">确认</button>";
    html += "                    <button type=\"button\" class=\"btn btn-default\"";
    html += "                       data-dismiss=\"modal\" style=\"width:120px;height:40px;background-color: #38b7a9\">取消</button>";
    html += "                </div>";
    html += "            </div>";
    html += "         </div>";
    html += "     </div>";

    $("body").append(html); //添加弹出框主题

    //设置选中值
    if($(obj).val() != ""){
        var businessulNameList = $(obj).val().split(",");
        var businessulValueList = $(obj).next().val().split(",");

        for(var i=0;i<businessulNameList.length;i++ ) {
            $("#businessilTag:first").append('<span style="width:200px;"><input type="hidden" value="' + businessulValueList[i] + '" />' +
                businessulNameList[i] + '<i><a href="javascript:void(0);" style="color: white;">x</a></i></span>');
        }

        $("#businessilTag:first").children('span').children('i').click(function(){
                    $(this).parent().remove();
        });
    }

    $("#businessul_moadl").modal("show"); //显示弹出框

    $("#confirmBusiness").click(function(){ //设置值给调用对象
        //获取name
        var name="";
        var value=""
        $("#businessilTag:first").children('span').each(function(){
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

function getBusinessul(obj,businessulCount){
    $("ul[name='businessilUL'] li span").removeClass('active');
    $(obj).children('span').addClass('active');

    var value = $(obj).children('input:first').val();//获得行业的值

    $.ajax({//异步获取行业下的子类
        type: "POST",
        url: "/ajax_dictionary",
        data: {"p_value": value},
        dataType: "json",
        success: function(data){

            $('#childbusiness').empty();
            $('#childbusiness').show();

            $(data).each(function(){
                $('#childbusiness').append("<li style=\"width:25%;height:70px;text-align: center; \"><span>" + this.dictionary_name + "</span><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /></li>");
            });

            //给子行业标签加事件，把值带到选择框里
            $("#childbusiness").children().click(function(){

                var count = $("#businessilTag:first").children('span').length;

                if(count == businessulCount){
                    alert("最多只能选择"+ businessulCount+"个项目！");
                    return;
                }

                if($("#businessilTag:first").find("input[value="+ $(this).children('input').val() +"]").length > 0){
                    alert('该项已选择！');
                    return;
                }

                $("#businessilTag:first").append('<span style="width:200px;"><input type="hidden" value="'+ $(this).children('input').val() +'" />'+
                        $(this).children('span').text()+'<i><a href="javascript:void(0);" style="color: white;">x</a></i></span>');

                $("#businessilTag:first").children('span').children('i').click(function(){
                    $(this).parent().remove();
                });

                $('#childbusiness').find('span').removeClass();
                $(this).find('span').addClass('active');
            })


        }
    });
}
