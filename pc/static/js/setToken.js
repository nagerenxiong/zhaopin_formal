/**
 * Created by zhoujia on 2015-05-22.
 * 在当前用户Session中添加Token
 */

$(function setToken(){
    $.ajax({
        type : "POST", //要插入数据，所以是POST协议
        url : "/jobs/ajax_token/", //注意结尾的斜线，否则会出现500错误
        success: function(data){
            alert(data)
            $("form").append('<input type="text" name="token" value="'+data+'" />')
        }
    });
})