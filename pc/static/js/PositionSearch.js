/**
 * Created by zhoujia on 2015-08-18.
 * 职位选择控件
 */

var PositionSearchControlsCount;
var startId=false;
var PositionSearchControlsBindDiv;

function PositionSearchControls(){
    if($("#PositionSearchControls").length <= 0) {
        //设置行业信息
        var html = "";
        html += '<div class="modal_backdrop" style="display:none" id="PositionSearchControls">';
        html += '<div class="modal_box" style="width:900px;">';
        html += '    <h3>选择职位</h3>';
        html += '    <div class="select_num" style="overflow:hidden">';
        html += '        <div class="f_l mt10">最多可以选 <span id="PositionSearchControlsCount"></span>项</div>';
        html += '        <ul class="f_l ml15" id="PositionSearchControlsChecked_list">';
        html += '            <div style="height:36px;float:left"></div>';
        html += '        </ul>';
        html += '    </div>';
        html += '    <dl class="mt20 xzzn_wrap">';
        html += '        <dt class="select_title">';
        html += '            <span>';
        html += '                全部职位';
        html += '                <i class="iconfont icon-xiajiantou12"></i>';
        html += '            </span>';
        html += '        </dt>';
        html += '        <dd>';
        html += '            <div id="yj_zn">';
        html += '                <div class="zn_title" style="margin-top: 38px;">';
        html += '                    <span>通用职位</span>';
        html += '                </div>';
        html += '               <ul class="zn_content" id="tyZn_wrap"  style="margin-top:30px">';
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_getDictionaryPosition",
            data: {"p_value": "T0"},
            dataType: "json",
            success: function (data) {
                $(data).each(function () {
                    html += '<li data-id="' + this.position_value + '"  data-parent-id="' + this.sort + '">' + this.position_name + '</li>';
                });
            }
        });
        html += '                    <div id="tyZn_box">';
        html += '                    </div>';
        html += '                </ul>';
        html += '                <div class="zn_title" style="margin-top: 38px;">';
        html += '                    <span>行业职位</span>';
        html += '                </div>';
        html += '                <ul class="zn_content clear_bold"  style="margin-top:30px">';
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_Industry",
            data: {"p_value": "H0"},
            dataType: "json",
            success: function (data) {
                $(data).each(function () {
                    html += '<li><input type="hidden" value="' + this.industry_value + '">' + this.industry_name + '</li>';
                });
            }
        });
        html += '                </ul>';
        html += '            </div>';
        html += '            <div id="ej_zn" style="display:none">';
        html += '                <ul class="zn_content clear_bold" style="margin-top:30px">';
        html += '                </ul>';
        html += '            </div>';
        html += '            <div id="sj_zn" style="overflow:hidden;display:none;margin-top:20px"  >';
        html += '                <ul class="l f_l" id="zn_name_list">';
        html += '                </ul>';
        html += '                <dl class="f_l r">';
        html += '                    <dd>';
        html += '                        <ul id="PositionSearchControlsZn_list">';
        html += '                        </ul>';
        html += '                    </dd>';
        html += '                </dl>';
        html += '            </div>';
        html += '            <div class="t_c an_box">';
        html += '                <input type="button" name="" value="确认" class="confirm_btn2" onclick="PositionSearchControlsConfirm()">';
        html += '                <input type="button" name="" value="取消" class="ml15 cancel_btn2" onclick="PositionSearchControlsClose()"></div>';
        html += '            </dd>';
        html += '        </dl>';
        html += '    </div>';
        html += '</div>';
        html += '<div class="modal_wrap" style="display:none"></div>';

        $("body").append(html); //添加行业信息内容

        //显示通用职位
        $("#tyZn_wrap").on("click", "li", function () {
            var dataId = $(this).attr('data-id');
            var parentId = $(this).attr('data-parent-id');
            $("#tyZn_wrap li").removeClass('active');
            $(this).addClass('active');
            $("#tyZn_box").show().empty();

            $.ajax({
                async: false,
                type: "POST",
                url: "/ajax_getDictionaryPosition",
                data: {"p_value": dataId},
                dataType: "json",
                success: function (data) {
                    $(data).each(function () {
                        $("#tyZn_box").append('<div data-parent-id="' + parentId + '" data-child-id="' + this.position_value + '">' + this.position_name + '</div>')
                    });
                }
            });
            addCheck();
            PositionSearchControlsAddColor1();
        });
        //通用职位选择功能
        $("#tyZn_box").on('click', 'div', function () {

            var _this = this;
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $("#PositionSearchControlsChecked_list li").each(function (index, el) {
                    if ($(this).attr('data-parent-id') == $(_this).attr('data-parent-id') && $(this).attr('data-child-id') == $(_this).attr('data-child-id')) {
                        $(this).remove();

                    }
                });
            }
            else {
                var v = $(this).html();

                if ($("#PositionSearchControlsChecked_list li").length > PositionSearchControlsCount - 1) {
                    alert('最多可以选' + PositionSearchControlsCount + '项');
                    return;
                }

                $("#PositionSearchControlsChecked_list").append('<li data-parent-id="' + $(this).attr("data-parent-id") + '" data-child-id="' +
                    $(this).attr("data-child-id") + '">' + v + '<i class="iconfont icon-cha"></i></li>');

                $(this).addClass('active');
            }
            addCheck();
            PositionSearchControlsAddColor1();
        });
        $("#yj_zn .zn_content:eq(1)").on('click', 'li', function () {
            PositionSearchControlsShowZn.call(this, "yj_zn");
        });
        $("#ej_zn .zn_content").on('click', 'li', function () {
            PositionSearchControlsShowZn.call(this, "ej_zn");
        });
        $(document).on('click', '#PositionSearchControlsChecked_list li .icon-cha', function () {
            $(this).parent().remove();
            addCheck();
            PositionSearchControlsAddColor();
            PositionSearchControlsAddColor1();
        })

        $(document).on('click', '#PositionSearchControlsZn_list li ', function () {
            var _this = this;
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $("#PositionSearchControlsChecked_list li").each(function (index, el) {
                    if ($(this).attr('data-parent-id') == $(_this).attr('data-parent-id') && $(this).attr('data-child-id') == $(_this).attr('data-child-id')) {
                        $(this).remove();
                    }
                });
            }
            else {
                var v = $(this).html();
                if ($("#PositionSearchControlsChecked_list li").length > PositionSearchControlsCount - 1) {
                    alert('最多可以选' + PositionSearchControlsCount + '项');
                    return;
                }
                $("#PositionSearchControlsChecked_list").append('<li data-parent-id="' + $(this).attr('data-parent-id') + '" data-child-id="' +
                    $(this).attr('data-child-id') + '">' + v + '<i class="iconfont icon-cha"></i></li>');
                $(this).addClass('active');
            }
            addCheck();
        });
        $("#zn_name_list").on('click', 'li', function () {
            $("#zn_name_list li").removeClass('active');
            $(this).addClass('active');
            $("#PositionSearchControlsZn_list").empty();
            var id = $(this).attr('data-id');
            PositionSearchControlsBindSjData(id);
            PositionSearchControlsAddColor();
        })
        $(".select_title").on('click', 'span', function () {
            var i = $(".select_title span").index(this);
            $(this).addClass('active').next().removeClass('active').hide().next().removeClass('active').hide();
            if (i == 0) {
                $("#yj_zn").show();
                $("#ej_zn").hide();
                $("#sj_zn").hide();
            }
            else if (i == 1) {
                $("#yj_zn").hide();
                $("#ej_zn").show();
                $("#sj_zn").hide();
            }
            else if (i == 2) {
                $("#yj_zn").hide();
                $("#ej_zn").hide();
                $("#sj_zn").show();
            }
        })
    }
}
//行业选择框展示
function PositionSearchControlsShow(count,bindObj){
    PositionSearchControlsCount = count; // 设置可选取的数量
    $("#PositionSearchControlsCount").text(PositionSearchControlsCount);
    PositionSearchControlsBindDiv = bindObj;
    bindBackfillData();
    if(!startId){

        $("#PositionSearchControls").show().next().show();

        $("#yj_zn").show();

        $("#ej_zn").hide();
        $("#sj_zn").hide();
        $("#yj_zn_tab").hide();
        $("#ej_zn_tab").hide();
    }
}
//行业选择框关闭
function PositionSearchControlsClose(){
    $("#PositionSearchControls").hide().next().hide();
}
function addCheck(){
    var znJson={};
    $("#PositionSearchControlsChecked_list li").each(function(index,el){
        if(typeof(znJson[$(el).attr('data-parent-id')])=="undefined")
        {
            znJson[$(el).attr('data-parent-id')]=[];
        }
        znJson[$(el).attr('data-parent-id')].push($(el).attr('data-child-id'));
    })
    $("#zn_name_list li").children('span').html('').hide();
    for(var k in znJson) {
        $("#zn_name_list li[data-parent-id='"+k+"']").children('span').show().html(znJson[k].length);
    }
    return znJson;
}
function PositionSearchControlsAddColor(){
    var znJson=addCheck();
    $("#PositionSearchControlsZn_list li").removeClass('active');
    $("#PositionSearchControlsZn_list li").each(function(index, el) {
        for(var j in znJson)
        {
            if($(el).attr('data-parent-id')==j)
            {
                 for (var k = 0; k < znJson[j].length; k++) {
                    $("#PositionSearchControlsZn_list li[data-child-id='"+znJson[j][k]+"']").addClass('active');
                 };
            }
        }
    });
}
function PositionSearchControlsAddColor1(){
    var znJson=addCheck();
    $("#tyZn_box div").removeClass('active');
    $("#tyZn_box div").each(function(index, el) {
        for(var j in znJson)
        {
            if($(el).attr('data-parent-id')==j)
            {
                 for (var k = 0; k < znJson[j].length; k++) {
                    $("#tyZn_box div[data-child-id='"+znJson[j][k]+"']").addClass('active');
                 };
            }
        }
    });
}
function PositionSearchControlsShowZn(sortId){
    var id = $(this).children("input:hidden").val();
    $(".select_title").children('#'+sortId+'_tab').remove();
    $(".select_title").append('<span class="active" id="'+sortId+'_tab">'+$(this).html()+'<i class="iconfont icon-xiajiantou12"></i></span>');
    $("#"+sortId).hide();
    if(sortId=="yj_zn"){
        $("#ej_zn ul").empty();
        //加载二级数据
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_Industry",
            data: {"p_value": id},
            dataType: "json",
            success: function (data) {
                $(data).each(function() {
                    $("#ej_zn ul").append('<li><input type="hidden" value="'+ this.industry_value +'">'+ this.industry_name +'</li>')
                });
            }
        });
        $("#ej_zn").show();
    }
    else if(sortId=="ej_zn")
    {
        $("#zn_name_list").empty();
        var first_id;
        //加载三级数据
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_getDictionaryPosition",
            data: {"p_value": id + ",T0"},
            dataType: "json",
            success: function (data) {
                $(data).each(function(i) {
                    var html ="";
                    html += '<li data-id="'+ this.position_value + '"';
                    if(i == 0){
                        first_id = this.position_value;
                        html += 'class="active"';
                    }
                    else if(i%2 == 1){
                        html += 'class="zn_bg"';
                    }

                    html += ' data-parent-id="'+ this.position_value +'">'+ this.position_name +'<span style="display:none"></span></li>';
                    $("#zn_name_list").append(html);
                });
            }
        });

        PositionSearchControlsBindSjData(first_id);
        $("#yj_zn_tab").removeClass('active');
        $("#sj_zn").show();
    }
}
//四级数据绑定
function PositionSearchControlsBindSjData(id){
     $("#PositionSearchControlsZn_list").empty();
    //默认加载四级数据
    var sjhtml="";

    $.ajax({
        async: false,
        type: "POST",
        url: "/ajax_getDictionaryPosition",
        data: {"p_value": id},
        dataType: "json",
        success: function (dataInfo) {
            $(dataInfo).each(function(num){
                sjhtml += '<li data-parent-id="'+ id +'" data-child-id="'+ this.position_value  +'"';
                sjhtml+= '>'+ this.position_name +'</li>';
            });
        }
    });

    $("#PositionSearchControlsZn_list").append(sjhtml);
}
//确定事件
function PositionSearchControlsConfirm(bindDiv){
    $("#PositionSearchControls").hide().next().hide();
    var name = "";
    var value = "";

    $("#PositionSearchControlsChecked_list li").each(function(i,e){
        if(value==""){
            name = $(e).text();
            value = $(e).attr("data-child-id");
        }
        else{
            name += ","+ $(e).text();
            value += ","+$(e).attr("data-child-id");
        }
    })
    $(".gsss_r_t3").css("display","block");

    $("#tag_list span:contains('职位')").parent().remove();

    $('#tag_list').append('<p class="t3p2"><span style="color:#777">职位'+
        '：</span><span>'+name+'</span><input type="hidden" value= "'+value+
        '" /><a href="javascript:void(0);" onclick="deleteThis(this)"></a></p>');
    positionSearch();
}
//回填数据绑定
function bindBackfillData(){
    $("#PositionSearchControlsChecked_list li").remove();

    $("#" + PositionSearchControlsBindDiv).children("p").each(function(){
        if($(this).find("span:eq(0)").text() == "职位："){

            $("#PositionSearchControlsChecked_list").append('<li data-parent-id="" data-child-id="' +
                    $(this).find("input:hidden").val() + '">' + $(this).find("span:eq(1)").text() + '<i class="iconfont icon-cha"></i></li>');

        }
    });
}