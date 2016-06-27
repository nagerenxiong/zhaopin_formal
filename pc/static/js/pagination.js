/**
 * Created by zhoujia on 2015-06-29.
 */

var bj = 5; //同时显示的最大页数
var _counts = 0;
var o_load = true;//当前不在分页进行中
var o_async = false; //是否异步
var fy_start = function(){};
var fy_end = function(){};
/**
 * pagin_bindObj : 绑定分页控件的对象
 * pagin_table :  分页的表
 * pagin_field :  分页查询的字段，可为空
 * pagin_where :  分页的条件
 * pagin_order :  分页排序的方法
 * pagin_pagesize : 每页条数
 * paginBind_FN : 分页数据的绑定方法
 * pagin_function_Name : 分页方法的回调对象
 * is_sorce: 0 不使用分值计算， 1 使用分值计算
 * objectID: 计算分值所使用的主体对象ID,查简历-职位ID,查职位-简历ID
 */
function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

function pagin(pagin_bindObj, pagin_table, pagin_field, pagin_where, pagin_order, pagin_pagesize, paginBind_FN, pagin_function_Name) {
    var is_sorce = arguments[8] ? arguments[8] : 0
    var objectID = arguments[9] ? arguments[9] : 0

    //创建唯一随机数
    var guid = newGuid();

    if (is_sorce == 0) {
        this.paginDispose(pagin_bindObj, pagin_table, pagin_field, pagin_where, pagin_order, 1, pagin_pagesize, paginBind_FN, pagin_function_Name, is_sorce, objectID, 0, guid);
    } else {
        if (pagin_table.toLowerCase() == "v_resume_info") {
            this.paginDispose(pagin_bindObj, pagin_table, pagin_field, pagin_where, pagin_order, 1, pagin_pagesize, paginBind_FN, pagin_function_Name, is_sorce, objectID, 1, guid);
        } else if (pagin_table.toLowerCase() == "v_position_search") {
            this.paginDispose(pagin_bindObj, pagin_table, pagin_field, pagin_where, pagin_order, 1, pagin_pagesize, paginBind_FN, pagin_function_Name, is_sorce, objectID, 2, guid)
        } else if (pagin_table.toLowerCase() == "v_aj_resume_deal") {
            this.paginDispose(pagin_bindObj, pagin_table, pagin_field, pagin_where, pagin_order, 1, pagin_pagesize, paginBind_FN, pagin_function_Name, is_sorce, objectID, is_sorce, guid)
        } else {
            alert("在分页控件中启用了匹配模式后，请选择正确的查询对象");
        }
    }
}

pagin.prototype.paginDispose = function(pagin_bindObj, pagin_table, pagin_field, pagin_where, pagin_order, pagin_page, pagin_pagesize, paginBind_FN, pagin_function_Name, is_sorce, objectID, sorceType, guid) {
    fy_start();
    $.ajax({
        type: "POST",
        url: "/ajax_pagination/",
        async: o_async,
        data: {
            "table": pagin_table,
            "fields": pagin_field,
            "where": decodeURI(pagin_where),
            "order": decodeURI(pagin_order),
            "page": pagin_page,
            "pagesize": pagin_pagesize,
            "is_sorce": is_sorce,
            "objectID": objectID,
            "sorceType": sorceType,
            "guid": guid
        },
        dataType: "json",
        success: function(data) {

            var count = data.count; //总条数
            _counts = data.count;
           
            var pageCount = parseInt((count + parseInt(pagin_pagesize) - 1) / parseInt(pagin_pagesize)); //总页数
            if (pageCount > 1) {
                $("#" + pagin_bindObj + "").html(
                    "    <ul class=\"page_number\">" +
                    "    <li onclick=\"" + pagin_function_Name + ".paginDispose('" + pagin_bindObj + "','" + pagin_table + "','" + pagin_field +
                    "','" + pagin_where + "','" + pagin_order + "'," + 1 + "," + pagin_pagesize + ",'" + paginBind_FN + "','" + pagin_function_Name +
                    "','" + is_sorce + "','" + objectID + "','" + sorceType + "','" + guid + "')\" >首页</li>" +
                    "        <li id=\"" + pagin_bindObj + "_backPage\">上一页" +
                    "        </li>" +
                    "        <li id=\"" + pagin_bindObj + "_nextPage\">" +
                    "        </li>" +
                    "    </ul>"
                );
            };

            //计算上一页
            var backPage = pagin_page - 1;
            if (pagin_page - 1 == 0) {
                backPage = pagin_page;
            }
            $("#" + pagin_bindObj + "_backPage").attr("onclick", pagin_function_Name + ".paginDispose('" + pagin_bindObj + "','" + pagin_table + "','" + pagin_field +
                "','" + pagin_where + "','" + pagin_order + "'," + backPage + "," + pagin_pagesize + ",'" + paginBind_FN + "','" + pagin_function_Name +
                "','" + is_sorce + "','" + objectID + "','" + sorceType + "','" + guid + "')");

            var maxPage = 5;
            var first = 1;

            if (pagin_page >= 5 && (pagin_page - 5) % 2 == 0) {
                bj = pagin_page;
            }

            if (pageCount <= 5) {
                maxPage = pageCount;
            } else if (pagin_page + 2 >= pageCount) {
                maxPage = pageCount;
                first = pageCount - 4;
            } else if (pagin_page >= 5) {
                maxPage = bj + 2;
                first = bj - 2;
            }

            //清除所有同级元素
            $("#" + pagin_bindObj + "_backPage").nextAll().remove();

            var content = "";

            for (var j = first; j <= maxPage; j++) {
                if (j == pagin_page) {
                    content += "<li class='active' ";
                    content += "onclick=\"" + pagin_function_Name + ".paginDispose('" + pagin_bindObj + "','" + pagin_table + "','" + pagin_field +
                        "','" + pagin_where + "','" + pagin_order + "'," + j + "," + pagin_pagesize + ",'" + paginBind_FN + "','" + pagin_function_Name +
                        "','" + is_sorce + "','" + objectID + "','" + sorceType + "','" + guid + "')\" >";
                    content += j + "</li>";
                } else {
                    content += "<li onclick=\"" + pagin_function_Name + ".paginDispose('" + pagin_bindObj + "','" + pagin_table + "','" + pagin_field +
                        "','" + pagin_where + "','" + pagin_order + "'," + j + "," + pagin_pagesize + ",'" + paginBind_FN + "','" + pagin_function_Name +
                        "','" + is_sorce + "','" + objectID + "','" + sorceType + "','" + guid + "')\" >";
                    content += j + "</li>";
                }
            }

            //计算下一页
            var nextPage = pagin_page + 1;

            if (nextPage > pageCount) {
                nextPage = pagin_page
            }
            content += "<li onclick=\"" + pagin_function_Name + ".paginDispose('" + pagin_bindObj + "','" + pagin_table + "','" + pagin_field +
                "','" + pagin_where + "','" + pagin_order + "'," + nextPage + "," + pagin_pagesize + ",'" + paginBind_FN + "','" + pagin_function_Name +
                "','" + is_sorce + "','" + objectID + "','" + sorceType + "','" + guid + "')\" >下一页</li>" +
                "<li onclick=\"" + pagin_function_Name + ".paginDispose('" + pagin_bindObj + "','" + pagin_table + "','" + pagin_field +
                "','" + pagin_where + "','" + pagin_order + "'," + pageCount + "," + pagin_pagesize + ",'" + paginBind_FN + "','" + pagin_function_Name +
                "','" + is_sorce + "','" + objectID + "','" + sorceType + "','" + guid + "')\" >尾页</li>";

            $("#" + pagin_bindObj + "_backPage").after(content);

            //数据绑定
            paginBind_FN += "(data.paginData)";
            eval(paginBind_FN);
            o_load = true;
            fy_end();
            $("#fy_load").remove();
            if(window.location.href.indexOf('company/position_manage?status=1')>0)
            {
            layer.closeAll();
            }
        }
    });
}