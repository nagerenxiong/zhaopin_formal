var c;//调试用
o_sc={
    upload:0,//上传成功
	success:0,//解析成功的数量
	error:0,//上传失败的数量
	select:0,//选择的文件的数量
    cancle:''

};
var group_this;
var file_count = $('#file_count').val();//已经上传的简历数量

danxuan($(".o_search .sex"));//性别单选
danxuan($(".o_search .dib"));//目前公司or全部经历
danxuan($(".look_count"));//多少数据一页
danxuan($(".resume_group .default li"));

//感叹号简历
$('.resume_list').on('mouseenter', '.noparssucss', function(event) {
    $(this).parent().siblings('.hintcon').show();
});
$('.resume_list').on('mouseleave', '.noparssucss', function(event) {
    $(this).parent().siblings('.hintcon').hide();
});
//默认分组条目点击
$('.resume_group .default li').click(function(event) {
    $(".resume_group .all").removeClass('active');
    $(".o_group li").removeClass('ac');
    $('.conversion').removeClass('active');
});
//全部简历点击
$(".resume_group .all").click(function(event) {
    $('.resume_group .default li.active').removeClass('active');
    $(".o_group li").removeClass('ac');
    $('.conversion').removeClass('active');
    $(this).addClass('active');
});
// 自定义分组条目点击
$(".o_group").on('click', 'li', function(event) {
    $('.resume_group .default li.active').removeClass('active');
    $(".resume_group .all").removeClass('active');
    $('.conversion').removeClass('active');
});
$(".resume_group .l:not('.all')").click(function(event) {
   $(this).next().slideToggle(150);
   $(this).hasClass('active')?$(this).removeClass('active'):$(this).addClass('active');
});
select($("#xl"), $("#xl").children('ul'));//学历下拉
select($("#jy"), $("#jy").children('ul'));//经验下拉
select($("#nx"), $("#nx").children('ul'));//年限下拉
select($("#sj"), $("#sj").children('ul'));//委托时间下拉
$(".ControlsWrap").focus(function(event) {
    $(this).blur();
});
//添加分组
$(".add_group").click(function(event) {
    event.stopPropagation();
    var _ul = $(this).parent().next(); 
    if(_ul.children('li').length < 6){
        if(_ul.css('display') == 'none'){
            _ul.slideDown(150);
        }
        if($(".o_group .active").length == 0){
            $(".o_group").append('<li class="active"><div><input class="group_txt" type="text" value="" maxlength="6"><button class="submit">OK</button><a class="cancel" href="javascript:void(0)">取消</a></div><span class="group_name"></span><span class="count">（0）</span><div class="ope"><span class="editor"></span><i class="delete" data-toggle="modal" data-target="#if_del_group"></i></div></li>')
            $(".o_group").children('li.active').find('input').focus();
        }
    }else{
        alert('最多添加5个自定义分组',4);
    }
});
//分组条目被点击
$(".o_group").on('click', 'li', function(event) {
    $('.o_search:first').css('display', '');
    $('.o_search:last').css('display', 'none');
    $('.resume_list:first').css('display', '');
    $('.resume_list:last').css('display', 'none');
    $('.dib').filter('.check').removeClass('active');
    event.preventDefault();//如果是新增条目或者还在输入名称时，不能有被点击样式
    if(!$(this).hasClass('active')){
        $(this).siblings().removeClass('ac').end().addClass('ac');
        var groupId = $(this).children('div:first').children('input').attr('data-value');
        if(groupId == ''){
            if(position_id > 0){
                sql = 'resume_status=1 and (source_id=' + pu_id;
                sql += ' and id in (SELECT t.infoid FROM T_Group_Info t LEFT JOIN T_Group g ON (g.ID = t.GID) LEFT JOIN V_Group_Info v ON (v.`InfoID` = t.`InfoID` AND v.`Group_Type` = 7 and v.pu_id='+pu_id+') WHERE g.group_type = 4 AND g.pu_id = '+pu_id+' AND v.`GID` IS NULL)';
                sql += ' or (resume_status=1 and (id in (select resume_id from T_PU_Entrust t LEFT JOIN V_Group_Info v ON (v.`InfoID` = resume_id AND v.`Group_Type` = 7 and v.pu_id='+pu_id+') where t.for_pu_id='+pu_id+' and entrust_status != 4 and v.gid is null))))';
            }else{
                sql = 'resume_status=1 and (source_id=' + pu_id;
                sql += ' and id in (SELECT t.infoid FROM T_Group_Info t LEFT JOIN T_Group g ON (g.ID = t.GID) LEFT JOIN V_Group_Info v ON (v.`InfoID` = t.`InfoID` AND v.`Group_Type` = 7 and v.pu_id='+pu_id+') WHERE g.group_type = 4 AND g.pu_id = '+pu_id+' AND v.`GID` IS NULL)';
                sql += ' or (resume_status=1 and (id in (select new_resume_id from T_Resume_View t  LEFT JOIN V_Group_Info v ON (v.`InfoID` = new_resume_id AND v.`Group_Type` = 7 and v.pu_id='+pu_id+') where t.pu_id='+pu_id+' and state=1 and v.gid is null)';
                sql += ' or id in (select resume_id from T_PU_Entrust t LEFT JOIN V_Group_Info v ON (v.`InfoID` = resume_id AND v.`Group_Type` = 7 and v.pu_id='+pu_id+') where t.for_pu_id='+pu_id+' and entrust_status != 4 and v.gid is null)';
                if(pu_email != ''){
                    sql += ' or id in (select objectid from T_Message_Record t LEFT JOIN V_Group_Info v ON (v.`InfoID` = objectid AND v.`Group_Type` = 7 and v.pu_id='+pu_id+') where record_type=2 and t.receive_id=\"' + pu_email + '\" and state=1 and v.gid is null)';
                }
                sql += ' or id in (select t.object_id from T_PU_Favorite t LEFT JOIN V_Group_Info v ON (v.`InfoID` = object_id AND v.`Group_Type` = 7 and v.pu_id='+pu_id+') where favorite_type=1 and t.pu_id='+pu_id+' and v.gid is null))))';
            }
        }else{
            if(position_id > 0){
                sql = 'resume_status=1 and id in (select infoid from V_Group_Info where pu_id='+pu_id+' and group_type=7 and gid='+groupId+')';
                sql += ' and id in (SELECT t.infoid FROM T_Group_Info t LEFT JOIN T_Group g ON (g.ID = t.GID) LEFT JOIN V_Group_Info v ON (v.`InfoID` = t.`InfoID` AND v.`Group_Type` = 7) WHERE g.group_type = 4 AND g.pu_id = '+pu_id+' AND v.`GID` IS NULL)';
                sql += ' or (resume_status=1 and (id in (select resume_id from T_PU_Entrust t LEFT JOIN V_Group_Info v ON (v.`InfoID` = resume_id AND v.`Group_Type` = 7) where t.for_pu_id='+pu_id+' and entrust_status != 4 and v.gid is null))))';
            }else{
                sql = 'resume_status=1 and id in (select infoid from V_Group_Info where pu_id='+pu_id+' and group_type=7 and gid='+groupId+')';
            }
        }
        querySql = sql;
        load_type = 'all';
        if(position_id > 0){
            myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), "update_date desc", page_size, "myResumeBind", "myResumeObj", 1, position_id);
        }else{
            myResumeObj = new pagin("paginInfo", "V_Resume_Info", "", encodeURI(querySql), "update_date desc", page_size, "myResumeBind", "myResumeObj");
        }
    }
});
//双击修改名称
$(".o_group").on('click', 'li .editor', function(event) {
    event.preventDefault();//只能仅有一个处于被修改状态
    event.stopPropagation();
    _this = $(this).parent().parent();
    if($(".o_group .active").length == 0 && _this.children('.group_name').text() != '未分组'){
        _this.addClass('active').removeClass('ac');
        _this.find('input').val(_this.children('.group_name').text());
    }
});
//点击取消
$(".o_group").on('click', 'li .cancel', function(event) {
    event.stopPropagation();
    var li = $(this).parent().parent();
    if(li.find('.group_name').text() == ''){
        li.remove();
    }else{
        li.removeClass('active');
    }
})

//点击删除
$(".o_group").on('click', 'li .delete', function(event) {
    event.stopPropagation();
    group_this = this;//获取当前点击的删除dom
    $('#delGroup').click();
})
//分组删除
// $(".o_group").on('click', 'li .delete', function(event) {
    // event.stopPropagation();
    // if(confirm('你确定要删除该分组吗？')){
    function del_group(){
        var _this = group_this;
        //获取输入的分组名称
        var groupObj = $(_this).parent().parent().children('div:first').children('input:first');
        $.ajax({
            type: "POST",
            url: "/deleteResumeGroup",
            data: {'group_id': groupObj.attr('data-value')},
            dataType: "json",
            success: function (data) {
                if(data.status == '1'){
                    var groupCount = groupObj.parent().next().next();
                    var text = groupCount.text().substring(1, groupCount.text().length - 1);
                    updateGroupCount('', parseInt(text));
                    $(_this).parent().parent().remove();
                    window.alert('删除分组成功',1);
                }else{
                    window.alert(data.msg,4);
                }
            }
        });
    }
    // }
// })
//点击提交保存名称
$(".o_group").on('click', 'li .submit', function(event) {
    event.stopPropagation();
    event.preventDefault();//输入框不能为空
    if($.trim($(this).prev().val()) !='' ){
        var groupName = $(this).prev().val();//当前输入的值
        var _this = $(this).prev()[0];//输入框
        var li  = $(this).parent().parent();//外层li
        var text = $(this).parent().next();//显示名称的元素
        var groupType = '7';
        var parentId = 0;
        var operateType = 'add';
        var params = {"parentId": parentId, "groupName": groupName, "groupType": groupType, "operateType": operateType};
        if($(this).prev().attr('data-value') != '' && $(this).prev().attr('data-value') != 0 && $(this).prev().attr('data-value') != undefined){
            operateType = 'update';
            params = {"groupId": $(this).prev().attr('data-value'), "groupName": groupName, "operateType": operateType};
        }
        $.ajax({
            type: "POST",
            url: "/ajax_groupOperate",
            data: params,
            dataType: "json",
            success: function (data) {
                if (data.msg == "新建分组成功！") {
                    li.removeClass('active');
                    text.text(groupName);
                    $('#groupList').append('<option value="' + data.id + '">'+groupName+'</option>');
                    //给分组赋ID
                    $(_this).attr('data-value', data.id);
                    window.alert('成功新建分组',1);
                }else if(data.msg == "修改分组成功！"){
                    li.removeClass('active');
                    text.text(groupName);
                    $('#groupList').children('option[value=' + $(_this).attr('data-value') + ']').text(groupName);
                    window.alert('修改分组成功',1);
                } else {
                    window.alert(data.msg,4);
                }
            }
        })
    }else{
        window.alert('请输入分组名称',4);
    }
});
//阻止输入框冒泡
$(".o_group").on('click', 'li input', function(event) {
    event.stopPropagation();
});
//文本超出显示。。。
$(".bb").each(function(index, el) {
	if ($(this).text().length > 91)
		$(this).addClass('active');
});
//全选
$(".count_operate .check").click(function(event) {
	if ($(this).hasClass('active')){
		$(".resume_info .check").addClass('active');
    }
	else{
        $(".resume_info .check").removeClass('active');
    }
});
//关注事件
$(".follow").click(function(event) {
    _this = $(this);
    _this.html('<span style="line-height:24px;">已关注</span>');
   $.ajax({
       url: '/path/to/file',
       type: 'POST',
       dataType: 'JSON',
       data: {param1: 'value1'},
       success:function(data){
        if(data==1){
            _this.html('<span style="line-height:24px;">已关注</span>');
        }
        else{
            alert("关注失败，请刷新页面重试",4)
        }
       }
   })
   
});


// 点击增删active
function active(obj) {
	if ($(obj).hasClass('active'))
		$(obj).removeClass('active');
	else
		$(obj).addClass('active');
}
$(".more_search").click(function(event) {
    $(".o_search .m").slideToggle(150);
    if($(this).hasClass('active')){
        $(this).hide().removeClass('active').css('display', 'inline-block');
    }else{
        $(this).hide().addClass('active').css('display', 'inline-block');
    }
});
// select方法
function select(p, ul, click) {
	p.click(function(event) {
        $(this).siblings().children('ul').slideUp(150);
		ul.slideToggle(150);
	});
	if (!click) {
		ul.on('click', 'li', function(event) {
            event.stopPropagation();
			ul.slideUp(150);
            if($(this).val() != '' && $(this).val() != '1'){
                p.children('p').text($(this).text());
                p.children('p').attr('data-value', $(this).val());
            }else if(p.children('p').attr('id') == 'max_diploma'){
                p.children('p').text('最高学历');
                p.children('p').attr('data-value', '');
            }else if(p.children('p').attr('id') == 'work_year'){
                p.children('p').text('工作经验');
                p.children('p').attr('data-value', '');
            }else if(p.children('p').attr('id') == 'expect_pay'){
                p.children('p').text('期望年薪');
                p.children('p').attr('data-value', '');
            }else if(p.children('p').attr('id') == 'resume_type'){
                p.children('p').text('简历类别');
                p.children('p').attr('data-value', '');
            }
            searchResumeData();
		});
	}
}
//单选
function danxuan(li) {
	li.click(function(event) {
		li.removeClass('active');
		$(this).addClass('active');
	});
}

//上传简历按钮点击
function addNewJl() {
	$.ajax({
		async: false,
		type: "POST",
		url: "/getResumeFileCount",
		dataType: "json",
		success: function(data) {
			if (data.status == '1') {
				file_count = data.file_count;//已经上传的简历数量
			} else {
				window.alert(data.msg,4);
			}
		}
	});
	uploadCount = 500 - file_count;//剩余可上传数量
    o_sc.upload = 0;//上传成功的数理
	o_sc.success = 0;//成功的数量
	o_sc.error = 0;//失败的数量
	o_sc.select = 0;//选择的数量
    $("#sc_upload").text(o_sc.upload);//初始化值
	$("#sc_success").text(o_sc.success);//初始化值
	$("#sc_error").text(o_sc.error);//初始化值
	$("#sc_select").text(o_sc.select);//初始化值
	if (uploadCount <= 0) {
		alert('已经上传了500份', 4);
		return;
	}
    //上传操作窗口打开
	layer_index = layer.open({
		title: "简历上传<em class='c_abs'></em>",
		type: 1,
		area: ['788px', 'auto'],
		skin: 'o_layer',
		shade: [0.4, '#333'],
		content: $("#selectJl"),
		success: function(layero, index) {
			$("#uploadCount").show().html('该账号还能再上传<span style="color:#ff6666;font-size:16px;">' + uploadCount + '</span>份未处理附件简历,单次上传不能超过50份');
                $("#finish_btn").attr('href', 'javascript:void(0)');
            
		},cancel:function(index){
            //弹出层关闭后，把当前所有上传条目取消
            close_upload();
            upload_success();
        }
	});
}
$("#start_upload").click(function(event) {
    if( o_sc.select<1){
        alert('请先选择要上传的附件简历',2);
        return false;
    }
    $('#file_upload').uploadify('upload','*');
});
var uploadCount=50;
var _content=document.getElementById('some_file_queue');//简历列表内容区域
//str == 进度条相关
var str='<div id="${fileID}" class="uploadify-queue-item" style="overflow:hidden;height:30px;line-height:30px;">';
str+='<div style="float:left"><img src="/static/images/xtb2.png" style="margin-right:10px;vertical-align:middle;margin-left:10px"/>';
str+='<span class="fileName" style="vertical-align:middle;display:inline-block;width:460px;text-align:left">${fileName}</span><span\
    style="display:inline-block;width:120px;text-align:left">${fileSize}</span><span class="data" style="color:#5c91d9"></span></div>\
    <div style="float:left;margin-right:10px;text-align:left">';
str+='<div class="cancel" style="display:inline"><a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\',';
str+='\'${fileID}\')"><img src="/static/images/shanchu.png" /></a></div></div></div>';
//上传配置start
    $("#file_upload").uploadify({
        'buttonText':'',
        'width':'234px',
        'height':'57px',
        'auto':false,
        'multi':true,
        'fileSizeLimit':'5MB',
        'successTimeout': 60000,
        'queueSizeLimit' : uploadCount,
        'uploadLimit' : uploadCount,
        'buttonClass':'sajl_btn',
        'swf':'/static/js/uploader/uploadify.swf',
        'itemTemplate':str,
        'removeCompleted' : false,
        'queueID'  : 'some_file_queue',
        'fileTypeDesc' : 'Any old file you want...',
        'fileTypeExts' : '*.doc; *.docx; *.pdf;*.txt;*.html;',
        'uploader': '/fileupload/',//当文件即将开始上传时立即触发
        'onUploadStart': function(file) {
             $("#"+file.id+" .cancel img").hide();
                $('#file_upload').uploadify('disable', true);
                    $("#file_upload").uploadify("settings", "formData", {
                        'fileType': 5
                    });
            $("#finish_btn").addClass('load_btn').text('正在解析中').attr('disable', 'true');
         },//当选择文件框被打开时触发
        'onDialogOpen':function() {
            if(uploadCount<=0)
            {
                $('#file_upload').uploadify('disable',true);
            }
            else
            {
                $("#finish_btn").attr('href','javascript:void(0)');
                $('#file_upload').uploadify('settings','queueSizeLimit',uploadCount);
                $('#file_upload').uploadify('settings','uploadLimit',uploadCount);
            }
        },//选择文件时触发
        'onSelect':function(file){
            $("#uploadCount").hide();//隐藏初始提示内容
            _content.scrollTop=_content.scrollHeight;//如果文件过多，滚动条会滚到底部
            $(_content).css('border', '1px solid #CCC');
            o_sc.select++;
            $("#sc_select").text(o_sc.select);
        },//选择的文件不对时
        'onSelectError' : function(file,errorCode,errorMsg) {
            // console.log(errorCode);
            if(errorCode=="-110")
                alert('请上传不超过5Mb大小的文件',2);
            else if(errorCode=="-130")
                alert('请上传word文档',2);
            else if(errorCode == "-120")
                alert('上传的该文档没有内容',2);
            else if(errorCode=="-100")
                alert('选择的文件数量超过限制!',2);
        },//每个文件上传成功后
        'onUploadSuccess': function(file, data, response){
            var file_path = JSON.parse(data).save_name;
            var file_name = file.name;
            var _this = file.id;
            o_sc.upload ++;
            $("#sc_upload").text(o_sc.upload);
            // 保存简历附件
            $.ajax({
                type: "POST",
                url: "/saveResumeFile",
                data: {"file_path": file_path, "file_name": file_name},
                dataType: "json",
                success: function (data) {
                    if(data.status == '1'){
                        o_sc.success ++;
                        $('#'+_this).find('.data').text('解析成功').attr('style', 'color:#ff8800;');
                    }else{
                        o_sc.error ++;
                        $('#'+_this).find('.data').text('解析失败').attr('style', 'color:#ff6666;');
                    }
                    $("#sc_success").text(o_sc.success);
                    $("#sc_error").text(o_sc.error);
                }
            });

          },
          'onError':function(event,queueId,fileObj,errorObj){
            o_sc.error ++;
            $("#"+queueID).find('.data').text('上传失败').attr('style', 'color:#ff6666;');
          },
          //每个文件上传完成后
          'onUploadComplete' : function(file) {
            if(o_sc.success>3)
                _content.scrollTop=(o_sc.success-4)*30;
            else
                _content.scrollTop=0;
        },//当点击文件队列中文件的关闭按钮或点击取消上传时触发。
        'onCancel' : function(file) {
            $("#"+file.id+" .cancel img").hide();
            o_sc.select--;
            $("#sc_select").text(o_sc.select);
        },//当队列中的所有文件上传完成时触发
        'onQueueComplete' : function(queueData) {
           o_sc.cancel = setInterval(function(){
                if( (o_sc.success+o_sc.error) == o_sc.select ){
                    $('#file_upload').uploadify('disable',false);
                    $("#finish_btn").removeAttr('disable').removeClass('load_btn').addClass('active').text('完成').attr({
                        'onclick': 'upload_success();'
                    });
                    clearInterval(o_sc.cancel);
                }
            },1000)
        }
    });
//取消全部上传
function close_upload(){
    $('.uploadify-queue-item').each(function(index, el) {
        $('#file_upload').uploadify('cancel',$(this).attr('id'));
        clearInterval(o_sc.cancel);
    });
}
function upload_success(){
    close_upload();
    layer.closeAll();
    if(position_id > 0){
        window.location.href = '/resume/uploaded#1';
    }else{
        loadUnhandResume($(".conversion"));
        updateUnhandleCount($(".conversion"), o_sc.success);
    }
}

//刷新简历
function flushDate(resumeId){
    $.ajax({
        type: "POST",
        url: "/ajax_flushResume",
        data: {"resumeId": resumeId},
        dataType: "json",
        success: function (data) {
            if(data.msg == 'success'){
                window.alert("成功刷新简历",1);
            }
        }
    })
}
//推荐职位时判断是否设置了允许推荐
function recommend(isInvite, source_id, resume_id, resume_name, resume_source){
    if(isInvite == '1'){
        o_show('yq', source_id, '', resume_id, resume_name, resume_source);
    }else{
        window.alert('该简历不接受推荐职位',4);
    }
}

