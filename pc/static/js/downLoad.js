/**
 * Created by zhoujia on 2015-08-05.
 * 文件下载
 */

/*
* fileName: 下载文件名
* */
function downLoad(fileName){
    var form = $("<form>");
        form.attr('style', 'display:none');
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', '/download');
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'file');
        input1.attr('value', $("#attachment").val());
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', 'fileName');
        input2.attr('value',fileName);
        $('body').append(form);
        form.append(input1);
        form.append(input2);
        form.submit();
        form.remove();
}