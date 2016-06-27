/**
 * Created by zhoujia on 2015-08-18.
 * 职位选择控件
 */

var PositionControlsCount;
var startId = false;
var PositionControlsBindDiv;
var bindDiv_height = "";
var allCheckID = false;
var PositionControls_hint=''
var o_position_save = function(){};

function PositionControls(bindDiv, bindName, bindValue,a,b,bindClass,placeholder) {
    if( typeof(bindClass) == 'undefined' || bindClass ==''){
        bindClass = 'ControlsWrap';
    }
    var bindDiv_style = arguments[3] ? arguments[3] : "width:inherit";
    allCheckID = arguments[4];
    PositionControlsBindDiv = bindDiv;
    if( typeof(placeholder) == 'undefined' || placeholder == ''){
        PositionControls_hint = '请选择职位';
    }else{
        PositionControls_hint = placeholder;
    }
    //设置绑定控件样式
    $("#" + bindDiv).addClass( bindClass ).attr('style', bindDiv_style);

    bindDiv_height = $("#" + bindDiv).css('height');

    PositionControlsBindDivShow(bindName, bindValue);

    if ($("#PositionControls").length <= 0) {
        //设置职位信息
        var html = "";
        html += '<div class="modal_backdrop" style="display:none" id="PositionControls">';
        html += '<div class="modal_box" style="width:820px;position:relative;">';
        html += '<em class="b_abs"></em>'
        html += '    <h3 class="zwtcti">选择职位</h3>';
        html += '    <img src="/static/images/19_x.png" onclick="PositionControlsClose()" style="display:inline-block;cursor:pointer;width:19px; height:19px; float:right;margin-top:11px;"  onclick="deleteResume(this)">';
        html += '<div>';
        html += '<input class="autoComplatePositionName" id="zyseachbtn" type="text"/>';
        html += '<span id="seachss" style="cursor:pointer" onclick="seach_mes()">搜索</span>';
        html += '</div>';
        html += '    <div class="select_num" style="overflow:hidden">';
        html += '        <div class="f_l mt10">最多可以选 <span id="PositionControlsCount"></span>项</div>';
        html += '        <ul class="f_l ml15 autoComplatePositionValue" id="PositionControlsChecked_list">';
        html += '            <div style="height:36px;float:left"></div>';
        html += '        </ul>';
        html += '    </div>';
        html += '    <dl class="xzzn_wrap">';
        html += '        <dt class="select_title">';
        html += '            <span onclick="sear_result()" class="active">';
        html += '                全部职位';
        html += '                <i class="iconfont icon-xiajiantou12"></i>';
        html += '            </span>';
        html += '        </dt>';
        html += '        <dd>';
        html += '            <div id="yj_zn">';
        html += '                <div class="tyzw_title">';
        html += '                    <span>通用职位</span>';
        html += '                </div>';
        html += '               <ul class="zn_content" id="tyZn_wrap" style="margin-bottom:0px!important;">';
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_getDictionaryPosition",
            data: {
                "p_value": "T0"
            },
            dataType: "json",
            success: function(data) {
                var count = 0;
                $(data).each(function() {
                    html += '<li data-id="' + this.position_value + '"  data-parent-id="' + this.sort + '">' + this.position_name + '</li>';
                    count++;

                    if (count == 4) {
                        html += '                    <div id="tyZn_box1" class="box">';
                        html += '                    </div>';
                    } else if (count == 8) {
                        html += '                    <div id="tyZn_box2" class=                                    "box">';
                        html += '                    </div>';
                    }
                    else if(count == data.length) {
                        html += '                    <div id="tyZn_box3" class="box">';
                        html += '                    </div>';
                    }
                });
            }
        });
        html += '                </ul>';
        html += '                <div id="zyzn" style="margin-top:3px">';
        html += '                <div class="tyzw_title1">';
        html += '                    <span>专业职能</span>';
        html += '                </div>';
        html += '                <ul class="zn_content clear_bold">';
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_Industry",
            data: {
                "p_value": "H0"
            },
            dataType: "json",
            success: function(data) {
                $(data).each(function() {
                    html += '<li><input type="hidden" value="' + this.industry_value + '">' + this.industry_name + '</li>';
                });
            }
        });
        html += '                </ul>';
        html += '            </div>';
        html += '            </div>';
        html += '            <div id="ej_zn" style="display:none">';
        html += '                <ul class="zn_content clear_bold1" style="margin-top:10px">';
        html += '                </ul>';
        html += '                <div id="showdiv" style="width:100%; height:180px;text-align:center;"></div>';

        html += '            <div id="sj_zn" style="overflow:hidden;display:none;height:247px;border:1px solid #e0e0e0; border-top:none;"  >';
        // html += '            <div class="job_cate"><ul><li>软件/互联网开发/系统集成</li><li>产品/运营/设计</li><li>IT质量管理/测试/配置管理</li>';
        // html += '            <li>T管理/项目协调</li><li>IT运维/技术支持</li></div>';
        html += '                <ul class="l f_l" id="zn_name_list">';
        html += '                </ul>';
        html += '                <dl class="f_l r" style="box-sizing:border-box">';
        html += '                    <dd>';
        html += '                        <ul id="PositionControlsZn_list">';
        html += '                        </ul>';
        html += '                    </dd>';
        html += '                </dl>';
        html += '            </div>';

        html += '            </div>';

        html += '            <div id="seach_zn" style="display:none">';
        html += '                <ul class="szn_content clear_bold wikz" id="szn_content" style="margin-top:30px">';
        html += '                </ul>';
        html += '            </div>';



        html += '            <div class="t_c an_box">';
        html += '                <input type="button" name="" value="确认" class="confirm_btn2" onclick="PositionControlsConfirm(' + bindDiv + ')">';
        html += '                <input type="button" name="" value="取消" class="ml15 cancel_btn2" onclick="PositionControlsClose()"></div>';
        html += '            </dd>';
        html += '        </dl>';
        html += '    </div>';
        html += '</div>';
        html += '<div class="modal_wrap" style="display:none"></div>';

        $("body").append(html); //添加职位信息内容       

        //显示通用职位
        $("#tyZn_wrap").on("click", "li", function() {
            $("#zyzn").hide();
            var dataId = $(this).attr('data-id');
            var parentId = $(this).attr('data-parent-id');
            if ($(this).hasClass('active')) {
                $(".box").hide();
                $("#zyzn").show();
                $(this).removeClass('active');
                return;
            }
            $("#tyZn_wrap li").removeClass('active');
            $(this).addClass('active');
            $(this).css('color', '#333333');
            if (parseInt(parentId) <= 104) {
                $(".box").hide();
                $("#tyZn_box1").show().empty();
            } else if (parseInt(parentId) <= 108) {
                $(".box").hide();
                $("#tyZn_box2").show().empty();
            } else {
                $(".box").hide();
                $("#tyZn_box3").show().empty();
            }

            var aa = $("#tyZn_wrap li").length;

            $.ajax({
                async: false,
                type: "POST",
                url: "/ajax_getDictionaryPosition",
                data: {
                    "p_value": dataId
                },
                dataType: "json",
                success: function(data) {
                    $(data).each(function() {
                        if (parseInt(parentId) <= 104) {
                            $("#tyZn_box1").append('<div data-parent-id="' + parentId + '" data-child-id="' + this.position_value + '">' + this.position_name + '</div>')
                        } else if (parseInt(parentId) <= 108) {
                            $("#tyZn_box2").append('<div data-parent-id="' + parentId + '" data-child-id="' + this.position_value + '">' + this.position_name + '</div>')
                        } else {
                            $("#tyZn_box3").append('<div data-parent-id="' + parentId + '" data-child-id="' + this.position_value + '">' + this.position_name + '</div>')
                        }
                    });
                }
            });
            addCheck();
            PositionControlsAddColor1();
        });
        //通用职位选择功能
        $(".box").on('click', 'div', function() {
            var divObj = this;
            var bo = true;
            $("#PositionControlsChecked_list li").each(function() {
                if ($(this).attr('data-child-id') == $(divObj).attr('data-child-id')) {
                    $(divObj).removeClass('active');

                    $(this).remove();
                    bo = false;
                }
            });

            if (bo) {
                var v = $(this).html();
                if ($("#PositionControlsChecked_list li").length > PositionControlsCount - 1) {
                    alert('最多可以选' + PositionControlsCount + '项');
                    return;
                }
                $("#PositionControlsChecked_list").append('<li data-parent-id="' + $(this).attr("data-parent-id") + '" data-child-id="' +
                    $(this).attr("data-child-id") + '">' + v + '<i class="iconfont icon-cha"></i></li>');

                $(this).addClass('active');

                addCheck();
                PositionControlsAddColor1();
            }
        });
        $("#yj_zn .zn_content:eq(1)").on('click', 'li', function() {
            PositionControlsShowZn.call(this, "yj_zn");
        });
        $("#ej_zn .zn_content").on('click', 'li', function() {
            PositionControlsShowZn.call(this, "ej_zn");

        });
        $(document).on('click', '#PositionControlsChecked_list li .icon-cha', function() {
            $(this).parent().remove();
            addCheck();
            PositionControlsAddColor();
            PositionControlsAddColor1();
            PositionControlsAddColor2();
            PositionControlsAddColor3();
        })

        $(document).on('click', '#PositionControlsZn_list li ', function() {
            var _this = this;
            var divObj = this;
            var bo = true;
            if ($(_this).hasClass('disabled')) return false;
            $("#PositionControlsChecked_list li").each(function() {
                if ($(this).attr('data-child-id') == $(divObj).attr('data-child-id')) {
                    $(divObj).removeClass('active');

                    $(this).remove();
                    bo = false;
                }
            });
            if (bo) {
                var v = $(this).html();
                if ($("#PositionControlsChecked_list li").length > PositionControlsCount - 1) {
                    alert('最多可以选' + PositionControlsCount + '项');
                    return;
                }
                $("#PositionControlsChecked_list").append('<li data-parent-id="' + $(this).attr('data-parent-id') + '" data-child-id="' +
                    $(this).attr('data-child-id') + '">' + v + '<i class="iconfont icon-cha"></i></li>');
                $(this).addClass('active');
            }
            addCheck();
        });
        $("#zn_name_list").on('click', 'li', function() {
            $("#zn_name_list li").removeClass('active');
            $(this).addClass('active');
            $("#PositionControlsZn_list").empty();
            var id = $(this).attr('data-id');
            PositionControlsBindSjData(id);
            PositionControlsAddColor();
        })
        $(".select_title").on('click', 'span', function() {
            // var i = $(".select_title span").index(this);
            $(".select_title span").eq(0).addClass('active').next().removeClass('active').hide().next().removeClass('active').hide();
            // if (i == 0) {
                $("#yj_zn").show();
                $("#ej_zn").hide();
                $("#sj_zn").hide();
                $("#seach_zn").hide();
            // } else if (i == 1) {
            //     $("#yj_zn").hide();
            //     $("#ej_zn").show();
            //     $("#sj_zn").hide();
            //     $("#showdiv").show();
            //     $("#seach_zn").hide();
            // } else if (i == 2) {
            //     $("#yj_zn").hide();
            //     $("#ej_zn").hide();
            //     $("#sj_zn").hide();
            //     $("#showdiv").show();
            // }
        })
    }
    //删除事件
    $("#" + bindDiv).on('mouseenter', '.icon-cha', function() {
        startId = true;
    })
    $("#" + bindDiv).on('mouseleave', '.icon-cha', function() {
        startId = false;
    })
    $("#" + bindDiv).on('click', '.icon-cha', function() {

        var parentObj = $(this).parent();
        var p_parentObj = parentObj.parent();
        // $(this).parent().next().next().remove();
        // $(this).parent().next().remove();
        // $(this).parent().remove();
        // if(parentObj.children('span').length<2)
        // {
        //     parentObj.css({'height':auto,'line-height':auto});
        // }

        parentObj.next().next().remove();
        parentObj.next().remove();
        parentObj.remove();
        //重新设置值
        var value = "";
        $(p_parentObj).children("input:hidden").each(function() {
            if (value == "") {
                value = $(this).val();
            } else {
                value += "," + $(this).val();
            }
        });

        $(p_parentObj).next().val(value);
        if (p_parentObj.children('span').length < 1) {
            p_parentObj.append('<span style="color:#999">'+PositionControls_hint+'</span>');
            // $(p_parentObj).siblings('span').html('<i class="iconfont icon-gantanhao"></i>必填');
        } else {
            // $(p_parentObj).siblings('span').html('<i class="iconfont icon-gou"></i>');
        }
        o_position_save();
    })
    $("#" + bindDiv).mouseenter(function() {
        startId = false;
    })
}
//职位选择框展示
function PositionControlsShow(count, bindObj) {
    // $("html").css('overflow', 'hidden');
    PositionControlsCount = count; // 设置可选取的数量
    $("#PositionControlsCount").text(PositionControlsCount);
    PositionControlsBindDiv = bindObj;
    bindBackfillData();
    if (!startId) {
        //数据回填
        var vauleList = $(PositionControlsBindDiv).next().val();
        $("#PositionControlsChecked_list li").each(function() {
            if (vauleList.indexOf($(this).attr("data-child-id")) < 0) {
                $(this).remove();
            }
        });

        $("#PositionControls").show().next().show();

        $("#yj_zn").show();
        $("#ej_zn").hide();
        $("#sj_zn").hide();
        $("#seach_zn").hide();
        $("#seach_zn_tab").hide();
        $("#yj_zn_tab").hide();
        $("#ej_zn_tab").hide();
    }
}
//职位选择框关闭
function PositionControlsClose() {
    $("#PositionControls").hide().next().hide();
    $("html").css('overflow', 'auto');
}

function addCheck() {
    var znJson = {};
    $("#PositionControlsChecked_list li").each(function(index, el) {
        if (typeof(znJson[$(el).attr('data-parent-id')]) == "undefined") {
            znJson[$(el).attr('data-parent-id')] = [];
        }
        znJson[$(el).attr('data-parent-id')].push($(el).attr('data-child-id'));
    })
    $("#zn_name_list li").children('span').html('').hide();
    for (var k in znJson) {
        $("#zn_name_list li[data-parent-id='" + k + "']").children('span').show().html(znJson[k].length);
    }
    return znJson;
}

function PositionControlsAddColor() {
    var znJson = addCheck();
    $("#PositionControlsZn_list li").removeClass('active');
    $("#PositionControlsZn_list li").each(function(index, el) {
        for (var j in znJson) {
            if ($(el).attr('data-parent-id') == j) {
                for (var k = 0; k < znJson[j].length; k++) {
                    $("#PositionControlsZn_list li[data-child-id='" + znJson[j][k] + "']").addClass('active');
                    $("#PositionControlsZn_list div[data-child-id='" + znJson[j][k] + "']").addClass('active');
                };
            }
        }
    });
}

function PositionControlsAddColor1() {
    var znJson = addCheck();
    $(".box div").removeClass('active');
    $(".box div").each(function(index, el) {
        for (var j in znJson) {
            if ($(el).attr('data-parent-id') == j) {
                for (var k = 0; k < znJson[j].length; k++) {
                    $(".box div[data-child-id='" + znJson[j][k] + "']").addClass('active');
                };
            }
        }
    });
}



function PositionControlsShowZn(sortId) {
    var id = $(this).children("input:hidden").val();

    if (sortId == "yj_zn") {

        $("#" + sortId).hide();
        $(".select_title").children('#' + sortId + '_tab').remove();
        $(".select_title").append('<span class="active" id="' + sortId + '_tab">' + $(this).html() + '<i class="iconfont icon-xiajiantou12"></i></span>');

        $("#ej_zn ul").empty();
        //加载二级数据
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_Industry",
            data: {
                "p_value": id
            },
            dataType: "json",
            success: function(data) {
                 
                $(data).each(function() {
                    $("#ej_zn ul").append('<li><input type="hidden" value="' + this.industry_value + '">' + this.industry_name + '</li>')
                });
            }
        });
        $("#ej_zn").show();
        $("#showdiv").show();
        $(".select_title .active").removeClass('active');
        $("#yj_zn_tab").addClass('active');
    } else if (sortId == "ej_zn") {
        $("#zn_name_list").empty();
        $("#ej_zn ul li").removeClass('active');
        var first_id;
        //加载三级数据
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_getDictionaryPosition",
            data: {
                "p_value": id 
            },
            dataType: "json",
            success: function(data) {
                $(data).each(function(i) {                    
                    var html = "";
                    var pos=this.position_value;
                    // if(pos.substring(0,1) !="T")
                    // {
                        html += '<li data-id="' + this.position_value + '"';
                        if (i == 0) {
                            first_id = this.position_value;
                            html += 'class="active"';
                        }
                            html += ' data-parent-id="' + this.position_value + '">' + this.position_name + '<span style="display:none"></span></li>';
                    // }
                    $("#zn_name_list").append(html);                    
                });
            }
        });

        PositionControlsBindSjData(first_id);
        $(".select_title .active").removeClass('active');
        $("#yj_zn_tab").addClass('active');
        $("#yj_zn").addClass('active');
        $(this).addClass('active');
        $("#showdiv").hide();
        $("#sj_zn").show();

    }
}
//四级数据绑定
function PositionControlsBindSjData(id) {
    $("#PositionControlsZn_list").empty();
    //默认加载四级数据
    var sjhtml = "";

    $.ajax({
        async: false,
        type: "POST",
        url: "/ajax_getDictionaryPosition",
        data: {
            "p_value": id
        },
        dataType: "json",
        success: function(dataInfo) {
            if (allCheckID) {
                $("#PositionControlsZn_list").append("<div data-parent-id='" + id + "' data-child-id='" + id + "' style=\"margin-bottom:20px;cursor:pointer\"  onClick='allCheckChild(this)'>全部</div>");
            }
            $(dataInfo).each(function(num) {
                sjhtml += '<li data-parent-id="' + id + '" data-child-id="' + this.position_value + '"';
                sjhtml += '>' + this.position_name + '</li>';
            });
        }
    });
    $("#PositionControlsZn_list").append(sjhtml);
}

function PositionControlsAddColor3() {    
    if ($("#PositionControlsZn_list div").hasClass('active')) {
        $("#PositionControlsZn_list div").removeClass('active');
        $("#PositionControlsZn_list li").removeClass('disabled').css('cursor', 'default');
        $("#PositionControlsChecked_list li[data-parent-id='" + $(_this).attr('data-parent-id') + "'").remove();
    }
}





function allCheckChild(_this) {
    if ($(_this).hasClass('active')) {
        $(_this).removeClass('active');
        $("#PositionControlsZn_list li").removeClass('disabled').css('cursor', 'default');
        $("#PositionControlsChecked_list li[data-parent-id='" + $(_this).attr('data-parent-id') + "'").remove();
    } else {
        if ($("#PositionControlsChecked_list li").length > PositionControlsCount - 1) {
            alert('最多可以选' + PositionControlsCount + '项');
            return;
        }
        var parentNameStr = $("#zn_name_list li[data-parent-id='" + $(_this).attr('data-parent-id') + "'").html();
        var parentName = parentNameStr.substr(0, parentNameStr.indexOf('<'));
        $("#PositionControlsChecked_list li[data-parent-id='" + $(_this).attr('data-parent-id') + "'").remove();
        $(_this).addClass('active');
        $("#PositionControlsZn_list li").removeClass('active').css('cursor', 'no-drop').addClass('disabled');
        $("#zn_name_list li[data-parent-id='" + $(_this).attr('data-parent-id') + "'").children('span').show().html(1);
        $("#PositionControlsChecked_list").append('<li data-parent-id="' + $(_this).attr('data-parent-id') + '" data-child-id="' + $(_this).attr('data-child-id') + '">' + parentName + '<i class="iconfont icon-cha"></i></li>');

    }
}

//确定事件
function PositionControlsConfirm(bindDiv) {
    $("#PositionControls").hide().next().hide();
    var value = "";
    var html = '<dl style="height:25px;float:left"></dl>';
    // if($("#PositionControlsChecked_list li").length>1)
    // {
    //     $(bindDiv).css({'height':'auto','line-height':'inherit'});
    // }
    // else{
    //      $(bindDiv).css({'height':auto,'line-height':auto});
    // }

    $("#PositionControlsChecked_list li").each(function(i, e) {
        html += ("<span>" + $(e).html() + "</span><br><input type='hidden' value='" + $(e).attr("data-child-id") + "'>");

        if (value == "") {
            value = $(e).attr("data-child-id");
        } else {
            value += "," + $(e).attr("data-child-id");
        }
    })

    $(PositionControlsBindDiv).empty().append(html);
    $(PositionControlsBindDiv).next().val(value);
    if ($(PositionControlsBindDiv).children('span').length < 1) {
        $(PositionControlsBindDiv).append('<span style="color:#999">'+PositionControls_hint+'</span>');
        // $(PositionControlsBindDiv).siblings('span').html('<i class="iconfont icon-gantanhao"></i>必填');
    } else {
        // $(PositionControlsBindDiv).siblings('span').html('<i class="iconfont icon-gou"></i>');
    }
    o_position_save();
    $("html").css('overflow', 'auto');
}
//回填数据绑定
function bindBackfillData() {

    $("#PositionControlsChecked_list li").remove();

    $(PositionControlsBindDiv).children("span").each(function() {
        $("#PositionControlsChecked_list").append('<li data-parent-id="" data-child-id="' +
            $(this).next().next().val() + '">' + $(this).text() + '<i class="iconfont icon-cha"></i></li>');
    });
}



//职位搜索结果
function seach_mes() {    
    var position_name = $.trim($(".autoComplatePositionName").val());
    if(position_name == '') {
        alert('请输入搜索内容');
        return false;
    }
    $("#yj_zn").hide();
    $("#ej_zn").hide(); 
    $("#yj_zn_tab").hide();
    $('#seach_zn ul').empty();     
    $(".select_title").children('#seach_zn_tab').remove();
    $(".select_title").append('<span class="active" id="seach_zn_tab">搜索结果<i class="iconfont icon-xiajiantou12"></i></span>');
    
     
    $.ajax({
        async: false,
        type: "POST",
        url: "/ajax_getInputPositionName",
        data: {"position_name": position_name },
        dataType: "json",
        success: function(data) {
            if(data.length > 0){
                var positionHTML = '';
                for (var i = 0; i < data.length; i ++) {
                    positionHTML += '<li onclick="zwx(this)" class="box1" data-child-id=' + data[i].position_value + ' >' + data[i].position_name + '</li>'
                }
            }
            $("#seach_zn ul").append(positionHTML);
        }
          
    }); 
    $('#seach_zn').show();
}


//职位搜索结果
function sear_result() {
    $("#yj_zn").show();
    $("#tyZn_box1").hide();
    $("#tyZn_box2").hide();
    $("#tyZn_box3").hide();
    $("#zyzn").show();
    $("#tyZn_wrap li").removeClass('active');
}


function PositionControlsAddColor2() {
    var znJson = addCheck();
    $("#szn_content li").removeClass('active');
    $("#szn_content li").each(function(index, el) {
        for (var j in znJson) {
            if ($(el).attr('data-parent-id') == j) {
                for (var k = 0; k < znJson[j].length; k++) {
                    $("#szn_content li[data-child-id='" + znJson[j][k] + "']").addClass('active');
                };
            }
        }
    });
}


function  zwx(obj){
    var divObj = obj;
    var bo = true;
    $("#PositionControlsChecked_list li").each(function() {
        if ($(this).attr('data-child-id') == $(divObj).attr('data-child-id')) {
            $(divObj).removeClass('active');
            $(this).remove();
            bo = false;
        }
    });

    if (bo) {
        var v = $(obj).html();
        if ($("#PositionControlsChecked_list li").length > PositionControlsCount - 1) {
            alert('最多可以选' + PositionControlsCount + '项');
            return;
        }
        $("#PositionControlsChecked_list").append('<li data-child-id="' +
            $(obj).attr("data-child-id") + '">' + v + '<i class="iconfont icon-cha"></i></li>');

        $(obj).addClass('active');
    }
}


//数据展示Div的数据绑定
function PositionControlsBindDivShow(name, value) {
    var nameList = name.replace(/、/g, ",").split(',');
    var valueList = value.replace(/、/g, ",").split(',');

    var html = "";

    html += '<dl style="height:25px;float:left"></dl>';
    if (nameList != "") {
        for (var i = 0; i < nameList.length; i++) {
            html += '<span>' + nameList[i]
            html += '<i class="iconfont icon-cha" onmouseleave="startId=false;" onmouseenter="startId=true;" ></i>';
            html += '</span>';
            html += '<br>';
            html += '<input type="hidden" value="' + valueList[i] + '">';
        }
    }

    $("#" + PositionControlsBindDiv).html(html);
    if (value == "" && name == "") {
        $("#" + PositionControlsBindDiv).append('<span style="color:#999">'+PositionControls_hint+'</span>')
    } else {
        // $("#"+ PositionControlsBindDiv).siblings('span').html('<i class="iconfont icon-gou"></i>');
    }
}