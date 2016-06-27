/**
 * Created by xk on 2015/9/16.
 */
var imageObj;//操作的图片对象的div
var operateObj;//操作的产品对象
var o_sy=0;
var o_index = 1;
var o_array = new Array();
var xiuxiu_mb=0;
$(function(){
    //右侧浮动块导航start
    $(".jl_upload div").click(function(event) {
        $(this).siblings('').removeClass("active").children('i').css('display', 'none');
        $(this).addClass('active').children('i').css('display', 'block');
    });
    $(window).scroll(function(event) {
        if($("#gscp").offset().top>$(window).scrollTop()){
            $(".jl_upload div").removeClass("active").children('i').css('display', 'none');
             $(".jl_upload div").eq(0).addClass('active').children('i').css('display', 'block');
        }
        else if($(window).scrollTop()>=$("#gscp").offset().top && $(window).scrollTop()<$("#gswz").offset().top){
            $(".jl_upload div").removeClass("active").children('i').css('display', 'none');
             $(".jl_upload div").eq(1).addClass('active').children('i').css('display', 'block');
        }
        else{
            $(".jl_upload div").removeClass("active").children('i').css('display', 'none');
             $(".jl_upload div").eq(2).addClass('active').children('i').css('display', 'block');
        }
        if(736<$(window).scrollTop()){
            $(".jl_upload").css('top', $(window).scrollTop()-736+"px");
        }
        else{
            $(".jl_upload").css('top', "0px");
        }
        
    });
    //右侧浮动块导航end
    
    // 公司介绍为空时
    if($.trim($(".word_content").text())==""){
        $(".word_content").css('display', 'none');
        $(".qyzy .addgsjs").css('display', 'block');
    }
    // 公司照片为空时
    if($("#viewImages li").eq(0).children('img').attr("src")==""|| $("#viewImages li").length==0){
        // $("#viewImages").parent().css('display', 'none').next().css('display', 'block');
        //隐藏（最新）
        $(".qyzy .addphoto").css('display', 'block');      
        $(".phoneshow").css('display', 'none');
    }

    // 公司产品为空时
    if($("#productDiv dd").length<=2){
                    $("#productDiv .o_tj").css('display', 'block');                   
                }
    // 公司照片编辑的删除事件
    $(".company_js").on('mouseenter', '.sctp', function(event) {
        event.preventDefault();
        $(this).children('p').stop(true, false).animate({bottom:"0px"}, 150);
    });
    $(".company_js").on('mouseleave', '.sctp', function(event) {
        event.preventDefault();
        $(this).children('p').stop(true, false).animate({bottom:"-50px"}, 150);
    });
    $(".company_js ").on('click', '.sctp .delete', function(event) {
        event.preventDefault();
        $(this).parent().parent().remove();
        $(".company_js h2 b").text($(".company_js .sctp").length);
    });
    $(".company_js").on('click', '.sctp .change', function(event) {
        event.preventDefault();
        $(this).parent().siblings('img').click();
    });


    var o_i=0;
    function layer_close(){
        layer.close(o_i.index);
    }
$('.o_page').on('click',"#omg", function() {
    xiuxiu.embedSWF("photoBox", 5, "100%", "450px"); //编辑器类型（1为轻量编辑，2为轻量拼图，3为完整版，5为头像编辑器，默认值1）
        o_i = layer;
        imageObj = $(this);
        layer_index=layer.open({
            type: 1,
            area: ['900px', '550px'],
            zIndex:999,
            skin:'o_xiuxiu1',
            btn:[''],
            shadeClose: true, //点击遮罩关闭
            content: $("#clx"),
            success:function(){
                $("#clx").css('display', 'block');
                xiuxiu_mb =5;
               
            }
        });
});
////////////////////////////////////
$(".o_close").click(function(event) {
    layer_close();
});
////////////////////////////////////
$(".editor_content").on('click', '.sctp img', function(event) {
    xiuxiu.embedSWF("photoBox1", 1, "100%", "450px"); //编辑器类型（1为轻量编辑，2为轻量拼图，3为完整版，5为头像编辑器，默认值1）
    o_i = layer;
        imageObj = $(this);
        layer_index=layer.open({
            type: 1,
            area: ['900px', '550px'],
            zIndex : 999,
            shadeClose: true, //点击遮罩关闭
            skin:'o_xiuxiu1',
            btn:[''],
            content: $("#clx1"),
            success:function(){
                $("#clx1").css('display', 'block');
                if(typeof(imageObj.attr("id"))=="undefined"){
                    xiuxiu_mb=15;
                }
                else{
                    xiuxiu_mb = 10;
                }
            }
        });
});


/*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
    // xiuxiu.embedSWF("photoBox", 5, "100%", "450px"); //编辑器类型（1为轻量编辑，2为轻量拼图，3为完整版，5为头像编辑器，默认值1）
    //修改为您自己的图片上传接口
    xiuxiu.setUploadURL("http://web.upload.meitu.com/image_upload.php");
    xiuxiu.setUploadType(2);
    xiuxiu.setUploadDataFieldName("upload_file");
    xiuxiu.onInit = function() {
        xiuxiu.loadPhoto($("#bind_head_portrait").val()); //修改为要处理的图片url
    };

   xiuxiu.onBeforeUpload = function (data, id)
   {
       var size = data.size;
       if(size > 1024*1024*xiuxiu_mb)
       {
           alert("图片不能超过"+xiuxiu_mb+"M",2);
           return false;
       }

       if(data.width>xiuxiu_width || data.height>xiuxiu_height){
           alert("请上传规定尺寸的图片",2);
           return false;
       }
       return true;
   }

    xiuxiu.onUploadResponse = function(data) {
        var imgData = $.parseJSON(data);
        var imgURL = $(imgData)[0].original_pic;
        if(imageObj.attr('id') == "omg"){
            var pc_logo = editResumenInfo(imgURL, imgURL, '6');
            $.ajax({
                type: "POST",
                url: "/ajax_updatePcLogo",
                data: {
                    "pc_id": $('#pc_id').val(),
                    "pc_logo": pc_logo
                },
                dataType: "json",
                success: function(data){
                    if(data.status == 0){
                        alert("图像上传失败，请重试！",2);
                    }else{
                        imageObj.attr({"src": pc_logo});
                        $(".integrity").text(data.integrity + '%');
                        layer_close();
                    }
                },
                yes:function(index){
                        layer.close(index);
                    }
                });
            }
            else{
                imageObj.attr('src', imgURL);
                $(".company_js .o_pic").removeClass('sctp1');
                $(".company_js h2 b").text($(".company_js .sctp").length);
                layer_close();
            }

    };

 })






//下划线切换
function underline(li,slide){
    var _this = li;
    li.hover(function(event) {
        if($(this).index() !=_this.filter('.active').index()){
        slide.stop(true, false).fadeOut(300);
        slide.css({left:this.offsetLeft+"px",width:$(this).outerWidth() +"px"});
        slide.stop(true, true).fadeIn(300);
    }

    },function(){
        if($(this).index() !=_this.filter('.active').index()){
        slide.stop(true, false).fadeOut(300);
        slide.css({left:_this.filter('.active')[0].offsetLeft+"px",width:li.filter('.active').outerWidth() +"px"});
        slide.stop(true, true).fadeIn(300);
    }

    });
    li.click(function(event) {
        $(this).siblings('').removeClass('active');
        $(this).addClass('active');
        $(".qygl_main>.left>div").css('display', 'none');
        $(".qygl_main>.left>div").eq($(this).index()).css('display', 'block');
    });
};


function o_cancel(obj){
    $(obj).parent().hide().siblings('.preview').show();
    $('.editor1').css('display', 'block');
}
function word_length(textarea,span){
	textarea.keydown(function(event) {
		span.text($(this).val().length);
	});
	textarea.keyup(function(event) {
		span.text($(this).val().length);
	});
}
$(function(){
//删除本条
var editor2 = "";
$('.preview').on('click',".editor2", function() {
    editor2=$(this);
})
$(".editor_content").on('click', '.delete_info', function(event) {
    var productId = $('#operateId').val();
    if(productId == ''){
        window.alert('你还没保存，无需删除',2);
        return;
    }
    if(!confirm('你确定要删除该产品吗？')){
        return;
    }
    //删除产品
    var _this = this;
    var pc_id = $('#pc_id').val();
    $.ajax({
        type: "POST",
        url: "/jobs/ajax_deleteProduct",
        data: {
            "pc_id": pc_id,
            "productId": productId
        },
        dataType: "json",
        success: function(data){
            if(data.msg == 'success'){
                $(_this).parent().parent().hide().siblings('.preview').show();
                editor2.parent().remove();
                //公司产品删除时
                if($("#productDiv dd").length<=2){
                    $("#productDiv .o_tj").css('display', 'block');
                }else{
                    $("#productDiv .o_tj").css('display', 'none');
                }
                window.alert('删除成功',1);
                perfect_info();
            }else{
                window.alert(data.msg,2);
            }
        }
    })
});
    underline($(".content_select li:not('.slide')"),$(".content_select li.slide"));
    var x = 0;
	$(".slide").each(function(index, el) {
		$(this).stop(true, false).animate({width:$(this).siblings('li').filter('.active').outerWidth() +"px"}, 300);
	});
    $(".knob").knob({
        thickness: .1,
        fgColor: '#ff8800',
        bgColor: '#e4e4e4',
        displayInput:false,
        readOnly:true
    });
    $(".editor").click(function(event) {
//        var worcont=$('.word_content').html().replace(/\s+$/,"").replace(/<br>/g,'\n');
       var worcont=$('#pc_introduce').val().replace(/\s+$/,"").replace(/<br>/g,'\n');

       $('#introduce').val(worcont);
        $(".qyzy #introduce").css('display', 'block');
        $('#short_introduce').keyup();
        if($.trim($(this).text()) == '添加' || $.trim($(this).text()) == '添加公司公司产品'){
            if($('#productDiv').children('dd').length > 4){
                window.alert('最多只能添加3个产品',2);
                return;
            }
            $(".company_cp .o_txt").eq(0).val('');
            $('#productIntroduce').val('');
            $('#productImage').attr('src', '');
            $('#productIntroduce').next().empty();
            $('#productIntroduce').next().append('(0/<b>70</b>)');
        }
        $(this).parent().hide().siblings('.editor_content').show();
        $('#introduce').focus();
        $(".company_js h2 b").text($(".company_js .sctp").not('.sctp1').length);
        $('#operateId').val('');
    });
    $(".editor1").click(function(event) {
        $(this).parent().siblings('.preview').hide().siblings('.editor_content').show();
        $(this).css('display', 'none');
    });
    $(".qyzy .preview .editor2").click(function(event) {
        //点击编辑时带入产品的信息
        $(this).parent().parent().hide().siblings('.editor_content').show();
        $(".company_cp .o_txt").eq(0).val($(this).siblings('h1').text());
        $('#productIntroduce').val($(this).siblings('p').text());
        $('#productImage').attr('src', $(this).siblings('.img').children('img').attr('src'));
        $('#productIntroduce').next().empty();
        $('#productIntroduce').next().append('('+$('#productIntroduce').val().length+'/<b>70</b>)');
        operateObj = $(this);
        //编辑时设置产品ID
        $('#operateId').val($(this).siblings('input').val());
        $(this).siblings('h2').children('span').each(function(index, el) {
            var _this = $(this);
            $(".o_group").children('label').attr('checked', 'false');
            $(".o_group").children('label').each(function(index, el) {
                if($(this).text()==_this.text()){
                    $(this).prev().attr('checked', 'true');
                }else{
                    $(".o_group").last().prev().attr('checked', 'true');
                }
            });
        });
    });
    //公司介绍图片左右点击事件
    var pic_index = 1;//当前展示的图片序号
    $(".pic ol li i.icon-zuojiantou").click(function(event) {
            var x = $(this).parent().parent().siblings('ul');
            if(pic_index>1){
                pic_index--;
            }
            else{
                pic_index=x.find('li').length;
            }
            x.stop(true,true).animate({left:-(pic_index-1)*100+"%"}, 300);
    });
    $(".pic ol li i.icon-youjiantou").click(function(event) {
            var x = $(this).parent().parent().siblings('ul');
            if(pic_index<x.find('li').length){
                pic_index++;
            }
            else{
                pic_index=1;
            }
            x.stop(true,true).animate({left:-(pic_index-1)*100+"%"}, 300);
    });

    $(".o_pic1").click(function(event) {
        if($(this).siblings('.o_pic').length>2)
            alert("最多只能上传3张图片",2);
        else
            $(this).before('<div class="o_pic sctp sctp1"><img src="" alt=""><p> <span class="delete">删除</span><span class="change">更换</span><i class="mark1"></i></p></div>');
    });
});
//===============================
var loadData;
var urlPath;
var labelData;
var pageIndex = 1;
var file_website = '';
window.onload = function(){
    file_website = $('#file_website').val();
    if(window.location.href.indexOf('param=more') != -1){
        $('.content_select li').removeClass('active');
        $('.content_select li:eq(1)').addClass('active');
        $('.zqzw').css('display', 'block');
        $('.qyzy').css('display', 'none');
    }
    urlPath = $('#urlPath').val();
    $('#companyUrl').click(function(){
        if(urlPath != ''){
            window.open('http://' + urlPath, '_blank');
        }
    });
    var businessname = $('#businessname').val();
    if(businessname == 'None'){
        businessname = '';
    }
    BusinessulControls("businessulDiv", businessname, $('#business').val(),
        'width:150px;margin-top:5px;font-size:14px;');
    var company_id = $('#pc_id').val();
//    $(".sstj li").click(function () {
//        $(".sstj li").removeClass('active');
//        $(this).addClass('active');
//        var positionType = $(this).text();
//        if (positionType == "全部") {
//            positionType = "";
//        }
//        var sql = 'company_id='+ company_id +' and  position_status=1 and Postaion_TypeName like"%' + positionType + '%"  order by add_date desc';
//        loadData = new pagin("positionPaginInfo", "V_Position_Search", "", encodeURI(sql), "", 10, "positionPagin", "loadData");
//    });
    // 发布的职位分页
    if(company_id != '') {
        var sql = 'company_id='+ company_id +' and  position_status=1 order by add_date desc';
        var account_type = $('#account_type').val();
        if(account_type == '1'){
            sql = 'rewards_money=0 and company_id='+ company_id +' and  position_status=1 order by add_date desc';
        }
        loadData = new pagin("positionPaginInfo", "V_Position_Search", "", encodeURI(sql), "", 10, "positionPagin", "loadData");
    }
    //获取猎头标签
    $.ajax({
        type: "POST",
        url: "/ajax_dictionary",
        data: {
            "p_value": '12000000'
        },
        dataType: "json",
        success: function(data){
            labelData = data;
            changeLabel();
        }
    });
};
//显示当前输入了多少字
function changeLength(obj, max){
    var length = $(obj).val().length;
    $(obj).next().empty();
    $(obj).next().append('('+length+'/<b>'+max+'</b>)');
};
//保存公司简短信息（公司简称、公司网址、公司简介）
function saveShortInfo(obj){
    var short_name = $('#short_name').val();
    if($.trim(short_name) == ''){
        window.alert('请输入公司简称',2);
        return;
    }
    var pc_url = $('#pc_url').val();
//    if($.trim(pc_url) == ''){
//        window.alert('请输入公司网址');
//        return;
//    }
    var short_introduce = $('#short_introduce').val();
    if($.trim(short_introduce) == ''){
        window.alert('请输入公司简介',2);
        return;
    }
    if($.trim(short_introduce).length < 6){
        window.alert('公司简介不能小于6个字',2);
        return;
    }
    var pc_id = $('#pc_id').val();
    $.ajax({
        type: "POST",
        url: "/ajax_saveShortInfo",
        data: {"pc_id": pc_id, "short_name": short_name, "pc_url": pc_url, "short_introduce": short_introduce},
        dataType: "json",
        success: function(data){
            if(data.status == '1'){
                if(pc_url == ''){
                    $('#companyUrl').css('display', 'none');
                }else{
                    $('#companyUrl').css('display', '');
                    $('#companyUrl').attr('title', pc_url);
                }
                $('.company_intro').children('h1').children('span:first').text(short_name);
                urlPath = pc_url;
                $('.company_intro').children('h2').text(short_introduce);
                $(".integrity").text(data.integrity + '%');
                window.alert('保存成功',1);
                o_cancel(obj);
            }else{
                window.alert(data.msg,2);
            }
        }
    });
}
//保存公司简介
function saveIntroduce(obj){
    $(".company_js .sctp1").remove();
//    var introduce = $('#introduce').val().replace(/\n/g,'<br/>');
    var introduce = $('#introduce').val();

    if($.trim(introduce).length == 0){
        window.alert('请填写公司介绍',2);

        //添加自动聚焦，并移动到该区域
        setTimeout(function(){
            $('#introduce').focus();
            $('#introduce').val("");
            $('body').animate({'scrollTop':232},150);
            $('#alertFram img').eq(0).prop("onclick",null);
            $('#alertFram img').eq(0).removeAttr("onclick");
            $('#alertFram img').eq(0).on('click',function(){
                $(this).parent().remove();
                $('#introduce').focus();
            })
        },200);


        return;
    }
    if($.trim(introduce).length < 6){
        window.alert('公司介绍不能小于6个字符',2);
        return;
    }
    var pc_id = $('#pc_id').val();
    var pc_images = $('#pc_images').val();
    var imgs = '';
    var imgObjs = $(obj).parent().children('.sctp').children('img');
    for(var m = 0; m < imgObjs.length;m++){
        var xiuxiuPath = imgObjs.eq(m).attr('src');
        if(pc_images == '' || pc_images.indexOf(xiuxiuPath) == -1){
            var realPath = editResumenInfo(xiuxiuPath, xiuxiuPath, '7');
            if(imgs == ''){
                imgs = realPath;
            }else{
                imgs += '**' + realPath;
            }
        }else if(pc_images.indexOf(xiuxiuPath) != -1){
            if(imgs == ''){
                imgs = xiuxiuPath;
            }else{
                imgs += '**' + xiuxiuPath;
            }
        }
    }
    $.ajax({
        type: "POST",
        url: "/ajax_saveCompanyIntroduce",
        data: {"introduce": introduce, 'pc_id': pc_id, 'pc_images': imgs},
        dataType: "json",
        success: function(data){
            if(data.status == 1){
                updateCount(1);
                console.log(introduce);
                // introduce.replace (/[\r\n]/g, '</br>')
                $('.word_content').html(introduce);
                if($("#viewImages").length==0)
                    $("dd.pic").append('<ul id="viewImages"></ul>');
                $('#viewImages').empty();
                var imgList = imgs.split('**');
                for(var n = 0;n < imgList.length;n++){
                    if($.trim(imgList[n])=="")
                        continue;
                    $('#viewImages').append('<li><img src="'+file_website+imgList[n]+'" alt=""></li>')
                }
                o_cancel(obj);

                if($.trim(imgList[0])==""){
                    $('#viewImages').parent().css('display', 'none').next().css('display', 'block');
                }else{
                    $('#viewImages').parent().css('display', 'block').next().css('display', 'none');
                }
                $(".integrity").text(data.integrity + '%');
                $(".qyzy .addgsjs").css('display', 'none');
                location.reload();
            }else{
                window.alert('保存失败',2);
            }
            perfect_info();
        }
    });
}

//保存公司产品
function saveProduct(obj){
    var pc_id = $('#pc_id').val();
    var productName = $('#productName').val();
    if($.trim(productName) == ''){
        window.alert('请填写产品名称',2);
        return;
    }
    var productIntroduce = $('#productIntroduce').val();
    if($.trim(productIntroduce) == ''){
        window.alert('请填写产品介绍',2);
        return;
    }
    var productId = $('#operateId').val();
    var productImage = $('#productImage').attr('src');
    
    var oldPath = '';
    if(operateObj){
        oldPath = operateObj.siblings('.img').children('img').attr('src');
    }
    if(oldPath != productImage){
        realPath = editResumenInfo(productImage, productImage, '7');
    }
    if(realPath=="" || typeof(realPath)=="undefined"){
        var realPath="/static/images/cp_logo.png";
    }
    $("#saveProduct").addClass('load_btn').attr('disabled', 'true');
    $.ajax({
        type: "POST",
        url: "/jobs/ajax_saveProduct",
        data: {
            "pc_id": pc_id,
            "realPath": realPath,
            "productId": productId,
            "productName": productName,
            "introduce": productIntroduce
        },
        dataType: "json",
        success: function(data){
            if(data.msg == "success"){
                updateCount(2);
                if(productId != ''){
                    if(realPath != ''){
                        operateObj.siblings('.img').children('img').attr('src', realPath);
                    }else{
                        console.log("1")
                        operateObj.siblings('.img').children('img').attr('src', "/static/images/cp_logo.png");
                    }
                    operateObj.siblings('p').text(productIntroduce);
                    operateObj.siblings('h1').text(productName);
                }else{
                    var html = '';
                    html += '<dd>';
                    html += '    <input type="hidden" value="'+data.id+'" />';
                    html += '    <div class="img"><img src="'+file_website+realPath+'" alt=""></div>';
                    html += '    <h1>'+productName+'</h1>';
                    html += '    <p>'+productIntroduce+'</p>';
                    html += '    <span class="editor2"><i class="iconfont icon-xiugaiziliao"></i>编辑</span>';
                    html += '</dd>';
                    $('#productDiv').children('dd:last').before(html);
                    $(".integrity").text(data.integrity + '%');
                    //给新增的产品添加编辑事件
                    $(".qyzy .preview .editor2").click(function(event) {
                        //点击编辑时带入产品的信息
                        $(this).parent().parent().hide().siblings('.editor_content').show();
                        $(".company_cp .o_txt").eq(0).val($(this).siblings('h1').text());
                        $('#productIntroduce').val($(this).siblings('p').text());
                        $('#productImage').attr('src', $(this).siblings('.img').children('img').attr('src'));
                        operateObj = $(this);
                        //编辑时设置产品ID
                        $('#operateId').val($(this).siblings('input').val());
                    });
                }
                o_cancel(obj);
                if($("#productDiv dd").length>2){
                    $("#productDiv .o_tj").css('display', 'none');
                }
               location.reload();
            }else{
                window.alert('保存失败',2);
            }
            $("#saveProduct").removeClass('load_btn').removeAttr('disabled');
            perfect_info();
        }
    });
}
//保存企业信息（地区、性质、规模、行业）
function saveCompanyInfo(obj){
    var location = $('#areaid').val();
    if(location == ""){
        alert("请选择地区!",2);
        return false;
    }
    var scale = $('#scale').val();
    if(scale == ""){
        alert("请选择企业规模!",2);
        return false;
    }
    var nature = $('#nature').val();
    if(nature == ""){
        alert("请选择企业性质!",2);
        return false;
    }
    var business = $('#industry').val();
    if(business == ""){
        alert("请选择所属行业!",2);
        return false;
    }
    var companyId = $('#pc_id').val();
    $.ajax({
        type: "POST",
        url: "/ajax_saveCompanyInfo",
        data: {"companyId": companyId, "location": location, "scale": scale, "nature": nature, "business": business},
        dataType: "json",
        success: function(data){
            if(data.msg == 'success'){
                var locationname = $('#areaid').prev().val();
                var scalename = $('#scale').children('option:selected').text();
                var naturename = $('#nature').children('option:selected').text();
                var businessname = $('#businessulDiv').children('span').text();
                $('.preview').eq(4).empty().append(locationname);
                $('.preview').eq(5).empty().append(scalename);
                $('.preview').eq(6).empty().append(naturename);
                $('.preview').eq(7).empty().append(businessname);
                $(".integrity").text(data.integrity + '%');
                window.alert('保存成功',1);
                o_cancel(obj);
            }else{
                window.alert(data.msg,2);
            }
        }
    });
}
//保存企业亮点
function saveHighlights(obj){
    var highlights = '';
    var companyId = $('#pc_id').val();
    var liList = $('#highlights').children('li');
    if(liList.length == 0){
        window.alert('请输入你公司最吸引人的福利',2);
        return;
    }
    for(var m = 0;m < liList.length;m++){
        if(highlights == ''){
            highlights = liList.eq(m).text();
        }else{
            highlights += '**' + liList.eq(m).text();
        }
    }
    $.ajax({
        type: "POST",
        url: "/ajax_saveHighlights",
        data: {'pc_id': companyId, 'highlights': highlights},
        dataType: "json",
        success: function(data){
            if(data.status == 1){
                //给修改前的标签赋值
                $('.preview:last').empty();
                for(var n = 0;n < liList.length;n++){
                    $('.preview:last').append('<li title="'+liList.eq(n).text()+'">'+liList.eq(n).text()+'</li>');
                }
                o_cancel(obj);
                $(".integrity").text(data.integrity + '%');
                window.alert('保存成功',1);
            }else{
                window.alert('保存失败',2);
            }
        }
    });
}
//保存公司地址
function saveAddress(obj){
    var address = $('#address').val();
    if($.trim(address) == ''){
        window.alert('公司地址不能为空，请输入公司地址',2);
        return;
    }
    var pc_id = $('#pc_id').val();
    $.ajax({
        type: "POST",
        url: "/ajax_saveCompanyAddress",
        data: {'pc_id': pc_id, 'address': address},
        dataType: "json",
        success: function(data){
            if(data.status == 1){
                updateCount(3);
                //修改显示的地址
                $(obj).parent().prev().children('span:first').empty();
                $(obj).parent().prev().children('span:first').append(address);
                o_cancel(obj);
                local.search(address);
                $(".integrity").text(data.integrity + '%');
                window.alert('保存成功',1);
            }else{
                window.alert('保存失败',2);
            }
            perfect_info();
        }
    })
}
//修改
function updateCount(count){
    var index = o_array.indexOf(count);
    if(index != -1){
        var new_array = [];
        for(var n = 0;n < o_array.length;n++){
            if(n != index){
                new_array.push(o_array[n]);
            }
        }
        o_array = new_array;
        o_sy -= 1;
        if(o_sy == 0){
            $(".company_intro>p").css("display","none");
        }else{
            $(".company_number b").eq(0).text(1);
            $(".company_number b").eq(1).text(o_sy);
        }
    }
}
//从美图秀秀上获取图片到服务器上
function editResumenInfo(head_portrait, imgURL, fileType){
    var realPath = '';
    $.ajax({
        type: "POST",
        url: "/jobs/account/ajax_personalHeadPortrait",
        data: {
            "head_portrait": head_portrait,
            "imgURL":imgURL,
            "fileType": fileType
        },
        dataType: "json",
        async: false,
        success: function(data){
            if(data.status == "1"){
                realPath = data.head_portrait;
            }
        }
    });
    return realPath;
}
//  职位分页
function positionPagin(dataInfo) {
    $("#positionsPaginBody").empty();
    var content = '';
    $(dataInfo).each(function(i) {
        // 处理值为 null 的字段
        var len = $(this).length;
        var array = $(this);
        for (var n = 0; n < len; n++) {
            if (array[n] == null) {
                array[n] = "&nbsp;"
            }
        }
        var o_list = new Array();
        if($.trim(array[14]) != "")
            o_list.push(array[14]);

        if($.trim(array[23]) != "" && array[23] != "&nbsp;")
            o_list.push(array[23]);
        else 
            o_list.push('经验不限');

        if($.trim(array[26]) != "" && array[26] != "&nbsp;")
            o_list.push(array[26]);
        else
            o_list.push('学历不限');

        if($.trim(array[10]) != "")
            o_list.push(array[10]);

        if($.trim(array[8]) != "")
            o_list.push(array[8]);
        o_list = o_list.join("&nbsp;|&nbsp;");
        content += '<li onclick="viewPosition('+array[0]+')">';
        content += '    <div class="f_l">';
        content += '        <h2>';
        content += '            <span class="nowrap" style="max-width:85%;">' + array[3] + '</span><span class="gold">' + array[19] + '</span>';
        if(array[30] != '&nbsp;' && array[30] != '0' && array[30] != 0){
            content += '<span class="gold">【赏金：' + array[30] + '】</span>';
        }
        content += '        </h2>';
        content += '        <p class="c_33 gs">' + array[55] +'</p>';
        content += '        <p class="c_99 clearfix">' + o_list;
        // 格式化时间
        var suitTime = array[48];
        if(suitTime != '' && suitTime.length >= 10) {
            suitTime = suitTime.substr(0, 10);
        }
        content += '           <span class="f_r"><i class="iconfont icon-shijian"></i>' + suitTime + '<label style="margin-left:10px">发布</label></span>';
        content += '        </p>';
        content += '    </div>';
        content += '</li>';
    });
    $("#positionsPaginBody").append(content);
}
//职位查看
function viewPosition(positionId){
    window.open('/resume/zwxq?positionId=' + positionId, '_blank');
}
$(function(){
    var dingshi = 0;
    $(".editor_content").on('keydown keyup', '#address', function(event) {
        clearTimeout(dingshi);
        var _this = $(this);
        dingshi = setTimeout(function(){
            local.search(_this.val());
        },500)
    });
    $(".company_area").on('click', '.preview .editor_area', function(event) {
        if($(this).siblings('span').text()!='请点击“编辑”维护公司地址')
            $(this).parent().siblings('.editor_content').children('#address').val($(this).siblings('span').text());
        else{
            $(this).parent().siblings('.editor_content').children('#address').val("");
        }
    });
   
})
//换一换标签
function changeLabel(){
    $("#jlTag").empty();
    var count = pageIndex * 8;
    if(count >= labelData.length){
        count = labelData.length;
        for(var i =(pageIndex-1)*8; i < count; i++){
            $("#jlTag").append("<li>"+ labelData[i].dictionary_name +"</li>");
        }
        pageIndex = 1;
    }else{
        for(var i =(pageIndex-1)*8; i < count; i++){
            $("#jlTag").append("<li style=\"cursor: pointer;\">"+ labelData[i].dictionary_name +"</li>");
        }
        pageIndex++;
    }
    //企业标签添加点击事件
    $('#jlTag li').click(function(){
        if ($('#highlights').children('li').length < 8){
            var liList = $('#highlights').children('li')
            for(var m = 0;m < liList.length;m++){
                if($.trim(liList.eq(m).text()).indexOf($(this).text()) != -1 ){
                    window.alert('你已添加该企业亮点，无需再添加',2);
                    return;
                }
            }
            $('#highlights').append("<li>"+$(this).text()+"<i class='iconfont icon-cha'></i></li>")
        }else{
            window.alert('最多添加8个标签',2);
            return;
        }
    });
    //添加后的标签删除事件添加
    $(".highlights .editor_content").on('click', 'li i', function(event) {
        $(this).parent().remove();
    });
}


//完善信息初始化方法
function perfect_info(){
        o_sy = 0;
        if($.trim($(".word_content").text())==""){
            o_sy++;
            o_array.push(1)
        }
        if($(".company_product .preview dd").length<3){
            o_sy++;o_array.push(2)
        }
        var judgeLocation = $.trim($(".company_area .preview span").eq(0).text());
        if(judgeLocation == "" || judgeLocation.indexOf('请点击“编辑”维护公司地址') != -1){
            o_sy++;o_array.push(3)
        }
        if(o_sy==0){
            $(".company_intro>p").css("display","none");
        }
        o_index = 1;
        $(".company_number b").eq(0).text(o_index);
        $(".company_number b").eq(1).text(o_sy);
    }
$(function(){
    //完善信息初始化
    perfect_info();
    // 完善信息左右点击事件
    $(".company_number i").eq(0).click(function(){
    if(o_index > 1){
            o_index--;
            $(".company_number b").eq(0).text(o_index);
        }
    })
    $(".company_number i").eq(1).click(function(){
        if(o_index < o_array.length){
            o_index++;
            $(".company_number b").eq(0).text(o_index);
        }
    })
    //完善信息点击跳转事件
    $(".write_info").click(function(event) {
        var r_dh = $(".jl_upload div a");
        var index = $(".company_number b").eq(0);
        $(window).scrollTop($(r_dh.eq(o_array[index.text()-1]-1).attr('href')).offset().top);
    });
})