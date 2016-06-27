/**
 * Created by zhoujia on 2015-07-08.
 */
var areaCountW;
var allProvince;
var area_list;
var o_area_save = function(){};
$("head").prepend('<script type="text/javascript" src="/static/js/jquery.autocomplete.min.js" ></script>');
$("head").prepend('<link rel="stylesheet" type="text/css" href="/static/css/jquery.autocomplete.css" />');
$("head").append('<style>.showArea .layui-layer-content{height:auto!important;}</style>');

    //初始化自动补全地区
    $.ajax({
        type: "POST",
        url: "/ajax_getAutoCompleteArea",
        dataType: "json",
        success: function(data) {
            area_list = data;
        }
    });

function showArea(obj, areaCount) {
    $(obj).blur();
    $("#AreaBox").remove();
    $("body").append('<div id="AreaBox"><div><span  style=\'font-size:16px;width:108px;height:39px;background-color:#5C91D9;text-align:center;color:#fff;display:inline-block;vertical-align:middle;line-height:37px;float:right;\'>\
        搜索</span><input class=\"autoComplateAreaName\" type=\"text\"  style=\'width:696px;height:35px;border:2px solid #5C91D9;vertical-align:middle;text-indent: 10px;box-sizing:content-box;padding:0\'/></div>\
         <div id=\"areaTag\"  style=\"padding-top: 10px;box-sizing: content-box;background-color: #f4f4f4;padding-bottom: 15px;padding-left: 10px;height:26px;line-height:32px;color:#777;font-size:12px\" class=\"schy_tag_ul autoComplateAreaValue\">最多选择' + areaCount + '项：</div>\
         <div style="overflow:hidden;padding-top:10px"><span style="width:70px;float:left;color:#5C91D9;font-weight:bold">热门城市: </span><ul style="float:left;width:736px;"><li onclick="hotCity(this,' + areaCount + ')" style="float:left;width:122px;text-align:center;cursor:pointer;font-weight:bold"><input type="hidden" value="23840000"><span class="">北京市</span></li><li onclick="hotCity(this,' + areaCount + ')" style="float:left;width:122px;text-align:center;cursor:pointer;font-weight:bold"><input type="hidden" value="24640000"><span class="">上海市</span></li><li onclick="hotCity(this,' + areaCount + ')" style="float:left;width:122px;text-align:center;cursor:pointer;font-weight:bold">\
         <input type="hidden" value="25980000"><span class="">广州市</span></li><li onclick="hotCity(this,' + areaCount + ')" style="float:left;width:122px;text-align:center;cursor:pointer;font-weight:bold"><input type="hidden" value="26000000"><span class="">深圳市</span></li><li onclick="hotCity(this,' + areaCount + ')" style="float:left;width:122px;text-align:center;cursor:pointer;font-weight:bold"><input type="hidden" value="24800000"><span class="">杭州市</span></li><li onclick="hotCity(this,' + areaCount + ')" style="float:left;width:122px;text-align:center;cursor:pointer;font-weight:bold"><input type="hidden" value="24700000"><span class="">苏州市</span></li></ul></div>\
         <span style=\"width:70px;float:left;color:#5C91D9;margin-top:7px;font-weight:bold\">热门省份: </span><ul name=\"areaUL\" style=\"float:left;width:736px\" class=\"qbhy_ul oadd clearfix\" id="hot_sf_ul"></ul><div style="clear:both"></div><div style="text-align:center;margin-top:20px;"><button id=\"confirmArea\" type=\"button\" class=\"btn btn-primary m-l30\" data-toggle=\"modal\" data-dismiss=\"modal\" data-target=\"#sczy_moadl\"  style=\"width:60px;height:20px;background-color: #5c91d9;box-sizing: content-box;margin-left: 0;margin-right: 10px;vertical-align: middle;">完成</button><a href="javascript:void(0)" styel="vertical-align: middle;"  class=\"btn-qx m-l5\" onclick="layer.close(layer_index)">取消</a></div></div>');
    layer_index = layer.open({
        title: "<h1>选择地区<em></em></h1>",
        type: 1,
        offset: '70px',
        area: ['848px', 'auto'],
        skin: 'showArea',
        shade: [0.7, '#393D49'],
        content: $("#AreaBox")
    });
    if (arguments[2] != null)
        allProvince = arguments[2];
    else
        allProvince = true;
    areaCountW = areaCount;
    //获取行业数据
    $.ajax({ //异步获取
        type: "POST",
        url: "/ajax_dictionary",
        data: {
            "p_value": "10000000"
        },
        dataType: "json",
        success: function(data) {
            $(data).each(function(i) {
                $("#hot_sf_ul").append("<li onclick=\"getArea(this," + areaCount + ")\"><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /><span>" + this.dictionary_name + "</span></li>");
            });
        }
    });

    //设置选中值
    if ($(obj).val() != "") {
        var areaNameList = $(obj).val().replace(/、/g, ",").split(",");
        var areaValueList = $(obj).next().val().replace(/、/g, ",").split(",");

        for (var i = 0; i < areaNameList.length; i++) {
            $("#areaTag:first").append('<span><input type="hidden" value="' + areaValueList[i] + '" />' +
                areaNameList[i] + '<i><a href="javascript:void(0);" style="color: white;font-size:16px">x</a></i></span>');
        }

        $("#areaTag:first").children('span').children('i').click(function() {
            $(this).parent().remove();
        });
    }
    $("#confirmArea").click(function() { //设置值给调用对象
        //获取name
        var name = "";
        var value = "";
        $("#areaTag:first").children('span').each(function() {
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
        if ($("#areaTag:first").children('span').length < 1) {
            $(obj).siblings('span').children('i').removeClass('icon-gou').addClass('icon-gantanhao');
        } else {
            $(obj).siblings('span').children('i').removeClass('icon-gantanhao').addClass('icon-gou');
        }
        o_area_save();
        layer.close(layer_index);
    });
    //初始化自动补全地区数据
    setAutoCompleteArea(areaCount);


}

function hotCity(_this, areaCount) {
    var count = $("#areaTag:first").children('span').length;
    if (count == areaCount) {
        alert("最多只能选择" + areaCount + "个项目！",4);
        return false;
        // $('#areaTag').find('span').remove();
    }
    if ($("#areaTag:first").find("input[value=" + $(_this).children('input').val() + "]").length > 0) {
        alert('该项已选择！',4);
        return;
    }
    $("#areaTag:first").append('<span><input type="hidden" value="' + $(_this).children('input').val() + '" />' +
        $(_this).children('span').text() + '<i><a href="javascript:void(0);" style="color: white;font-size:16px">x</a></i></span>');
    $("#areaTag:first").children('span').children('i').click(function() {
        $(this).parent().remove();
    });
}

function getArea(obj, areaCount) {
    if ($(obj).children('span').hasClass('active')) {
        $(obj).children('span').removeClass('active');
        $('obj').removeClass('active');
        $("#childarea_area").remove();
        return;
    }
    $("ul[name='areaUL'] li").removeClass('active');
    $("ul[name='areaUL'] li span").removeClass('active');
    $(obj).addClass('active').children('span').addClass('active');
    var value = $(obj).children('input:first').val(); //获得行业的值

    $.ajax({ //异步获取行业下的子类
        type: "POST",
        url: "/ajax_dictionary",
        data: {
            "p_value": value
        },
        dataType: "json",
        success: function(data) {
            $('#childarea_area').remove();
            var hehe = (6 * (parseInt($("#hot_sf_ul li").index($(obj)) / 6) + 1) - 1); //所在行的第4个元素
            if (hehe > $("#hot_sf_ul li").length - 1) {
                hehe = $("#hot_sf_ul li").length - 1;
            }
            $("#hot_sf_ul li").eq(hehe).after('<div id="childarea_area" class="qbhy_div"></div>');
            $('#childarea_area').empty();
            $('#childarea_area').show();
            if (allProvince && $(obj).children('span').html() != '直辖市') {
                $('#childarea_area').append("<li style=\"width:122px;text-align: center; \"><span style='font-weight:bold'>" + $(obj).children('span').html() + "</span><input type=\"hidden\" value=\"" + value + "\" /></li>");
            }
            $(data).each(function() {
                $('#childarea_area').append("<li style=\"width:122px;text-align: center; \"><span>" + this.dictionary_name + "</span><input type=\"hidden\" value=\"" + this.dictionary_value + "\" /></li>");
            });

            //给子行业标签加事件，把值带到选择框里
            $("#childarea_area").children().click(function() {
                var count = $("#areaTag:first").children('span').length;

                if (count == areaCount) {
                    alert("最多只能选择" + areaCount + "个项目！",4);
                    return false;
                    // $('#areaTag').find('span').remove();
                }

                if ($("#areaTag:first").find("input[value=" + $(this).children('input').val() + "]").length > 0) {
                    alert('该项已选择！',4);
                    return;
                }

                $("#areaTag:first").append('<span><input type="hidden" value="' + $(this).children('input').val() + '" />' +
                    $(this).children('span').text() + '<i><a href="javascript:void(0);" style="color: white;font-size:16px">x</a></i></span>');

                $("#areaTag:first").children('span').children('i').click(function() {
                    $(this).parent().remove();
                });

                $('#childarea_area').children().children('span').removeClass();
                $('#childarea_area').children('span').addClass('active');
            })

        }
    });
}

// Add By King
//自动加载地区
function setAutoCompleteArea(areaCount) {
    var data = area_list;
     $(".autoComplateAreaName").on('input',function() {
        $(".autoComplateAreaName").AutoComplete({
            'data': data,
            'itemHeight': 20,
            'width': 'auto',
            'afterSelectedHandler': function(data) {
                if ($("span :hidden[value=" + data.label + "]").length != 0) {
                    alert('您已经添加过该城市啦!',4);
                    return false;
                }
                if ($(".autoComplateAreaValue span").length > areaCountW) {
                    alert('最多只能选择' + areaCountW + '个职位!',4);
                    return false;
                }
                var areaHTML = '';
                areaHTML += '<span>';
                areaHTML += '   <input type="hidden" value="' + data.label + '">' + data.value;
                areaHTML += '   <i onclick="$(this).parent().remove();"><a href="javascript:void(0);" style="color: white;">x</a></i>';
                areaHTML += '</span>';
                if ($("#areaTag").children('span').length >= areaCountW) {
                    alert("最多只能选择" + areaCountW + "个项目！",4);
                    return;
                }
                $(".autoComplateAreaValue").append(areaHTML);
            },
            'listStyle': 'custom',
            'emphasis': false,
            'createItemHandler': function(index, data) {
                // 过滤 不已此开头的 地区
                var autoComplateAreaName = $(".autoComplateAreaName").val();
                var reg = new RegExp("\^" + autoComplateAreaName, "g");
                if (reg.test(data.value) == true)
                    return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                // 去除空 li
                $(".custom").each(function() {
                    if ($(this).find('div').text() == '') {
                        $(this).remove();
                    }
                })
            }
        }).AutoComplete('show');
    })

}