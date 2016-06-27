/**
 * Created by zhoujia on 2015-08-17.
 * 行业选择控件
 * count : 可选择项目数量
 **/
var BusinessulControlsCount;
var startId=false;
var BusinessulControlsBindDiv;
var bindDiv_height="";
var BusinessulControls_hint='';
var o_businessul_save = function(){};
$(window).scroll(function(event) {
    $(window).resize();
});
function BusinessulControls(bindDiv,bindName,bindValue,a,b,bindClass,placeholder){
    var bindDiv_style=arguments[3]?arguments[3]:"width:inherit";
    if( typeof(bindClass) == 'undefined' || bindClass == ''){
        bindClass = 'ControlsWrap';
    }
    if( typeof(placeholder) == 'undefined' || placeholder == ''){
        BusinessulControls_hint = '请选择行业';
    }else{
        BusinessulControls_hint = placeholder;
    }
    //设置绑定控件样式    //
    $("#" + bindDiv).addClass( bindClass ).attr('style',bindDiv_style);

    bindDiv_height=$("#" + bindDiv).css('height');
    //
    BusinessulControlsBindDiv = bindDiv;

    BusinessulControlsBindDivShow(bindName,bindValue);

    if($("#BusinessulControls").length <= 0) {
        //设置行业数据
        var html = "";

        html += '<div class="modal_backdrop" style="display:none" id="BusinessulControls">';
        html += '   <div class="modal_box" style="width:750px;">';
        html += '    <h3><em></em>';
        html += '        选择行业分类';
        html += '    </h3>';
        html += '    <div class="select_num">';
        html += '        <div class="f_l">最多可以选 <span id="BusinessulControlsCount"></span> 项</div>';
        html += '    </div>';
        html += '    <ul class="BusinessulControls_box">';

        //获取行业数据
        $.ajax({
            async: false,
            type: "POST",
            url: "/ajax_getIndustryAll",
            //data: {"p_value": "H0"},
            dataType: "json",
            success: function (data) {
                $(data).each(function(){
                    if(this.p_value === "H0"){
                        var p_value = this.industry_value;
                        var businessul_id = "businessul_" + this.industry_value;
                        html += '        <li>';
                        html += '            <div class="l">';
                        html += '                <span>' + this.industry_name + '</span><input id="' + businessul_id + '" type="hidden" >';
                        html += '            </div>';
                        html += '            <ul class="f_r r">';

                        $(data).each(function() {
                            if(p_value == this.p_value){
                                html += '                <li>';
                                html += '                    <input type="checkbox" id="' + this.industry_value + '"  value="' + this.industry_value + '">';
                                html += '                    <label for="' + this.industry_value + '">' + this.industry_name + '</label>';
                                html += '                </li>';
                            }
                        })

                        html += '</ul>';
                        html += '</li>';
                    }
                })
            }
        });

        html += '    </ul>';
        html += '    <div class="t_c mt10">';
        html += '        <input type="button" name="" value="确认" class="confirm_btn2" onclick="BusinessulControlsConfirm()">';
        html += '        <input type="button" name="" value="取消" class="ml15 cancel_btn2" onclick="BusinessulControlsClose()"></div>';
        html += '   </div>';
        html += '</div>';
        html += '<div class="modal_wrap" style="display:none"></div>';

        $("body").append(html); //添加行业信息内容
    }

    //绑定行业选择事件 for li
    $(".BusinessulControls_box").on('change','ul.r li input',function(){
        if($(".BusinessulControls_box li input:checked").length>=BusinessulControlsCount){
            $(".BusinessulControls_box li input:not(:checked)").each(function(i,e){
                e.disabled=true;
            });
        }
        else{
             $(".BusinessulControls_box li input").each(function(i,e){
                e.disabled=false;
            });
        }
    })
    
    $("#"+bindDiv).mouseenter(function(){
        startId=false;
    })
}
//行业选择框展示
function BusinessulControlsShow(count,bindObj){
    $("html").css('overflow', 'hidden');
    BusinessulControlsCount = count; // 设置可选取的数量
    $("#BusinessulControlsCount").text(BusinessulControlsCount);

    BusinessulControlsBindDiv = bindObj;

    if(!startId){
        //数据回填
        var vauleList = $(bindObj).next().val();
        var bo = false;

        if(vauleList!="" && vauleList.split(',').length >= count){
            bo= true;
        }

        $(".BusinessulControls_box input[type='checkbox']").each(function(){
            this.disabled = bo;
            if(vauleList.indexOf(this.value) >= 0){
                this.checked = true;
                this.disabled = false;
            }
            else{
                this.checked = false;
            }
        });
        $("#BusinessulControls").show().next().show();
    }
}
//行业选择框关闭
function BusinessulControlsClose(){
    $("#BusinessulControls").hide().next().hide();
    $("html").css('overflow', 'auto');
}
//确定事件
function BusinessulControlsConfirm(){

    $("#BusinessulControls").hide().next().hide();
    var value = "";
    var html= '<dl style="height:25px;float:left"></dl>';
    // if($(".BusinessulControls_box li input:checked").length>1)
    // {
    //     $(bindDiv).css({'height':'auto','line-height':'inherit'});
    // }
    // else{
    //      $(bindDiv).css({'height':'auto','line-height':'auto'});
    // }
    $(".BusinessulControls_box li input:checked").each(function(i,e){
        html += ("<span>"+$(e).next().html()+"</span><i class='iconfont icon-cha' onclick='BusinessulControlsDeleteBus(this,event)'"+
            "  onmouseenter='startId=true;' onmouseleave='startId=false;' ></i><br><input type='hidden' value='"+$(e).val()+"'>");

        if(value==""){
            value = $(e).val();
        }
        else{
            value += ","+$(e).val();
        }
    })
    $(BusinessulControlsBindDiv).html(html);

    $(BusinessulControlsBindDiv).next().val(value);
    if($(BusinessulControlsBindDiv).children('span').length<1){
        $(BusinessulControlsBindDiv).append('<span style="color:#999">'+BusinessulControls_hint+'</span>')
        // $(BusinessulControlsBindDiv).siblings('span').html('<i class="iconfont icon-gantanhao"></i>必填');
    }else{
        // $(BusinessulControlsBindDiv).siblings('span').html('<i class="iconfont icon-gou"></i>');
   }
   o_businessul_save();
   $("html").css('overflow', 'auto');

}
//删除事件
function BusinessulControlsDeleteBus(_this,event){
    event.stopPropagation();
    //获取上级对象
    var parentObj = $(_this).parent();

    $(_this).next().next().remove();
    $(_this).prev().remove();
    $(_this).next().remove();
    $(_this).remove();
    //重新设置值
    var value = "";
    $(parentObj).children("input:hidden").each(function(){
        if(value==""){
            value = $(this).val();
        }
        else{
            value += ","+ $(this).val();
        }
    });
    $(parentObj).next().val(value);
    if(parentObj.children("span").length<1){
        parentObj.append('<span style="color:#999">'+BusinessulControls_hint+'</span>');
        // parentObj.siblings('.scjl_span').html('<i class="iconfont icon-gantanhao"></i>必填');
    }
    else{
        // parentObj.siblings('span').html('<i class="iconfont icon-gou"></i>');
   }
   o_businessul_save();
   $("html").css('overflow', 'auto');

}

//数据展示Div的数据绑定
function BusinessulControlsBindDivShow(name,value){
    var nameList = name.replace(/、/g,",").split(',');
    var valueList = value.replace(/、/g,",").split(',');
    var html = "";
    html += '<dl style="height:25px;float:left"></dl>';

    if(name != ''){
        for(var i=0;i < nameList.length; i++){
            html += '<span>'+ nameList[i] +'</span>';
            html += '<i class="iconfont icon-cha" onmouseleave="startId=false;" onmouseenter="startId=true;" onclick="BusinessulControlsDeleteBus(this,event)"></i>';
            html += '<br>';
            html += '<input type="hidden" value="'+ valueList[i] +'">';
        }
    }

    $("#"+ BusinessulControlsBindDiv).html(html);
    if(value=="" && name==""){
        $("#"+ BusinessulControlsBindDiv).append('<span style="color:#999">'+BusinessulControls_hint+'</span>')
    }else{
        // $("#"+ BusinessulControlsBindDiv).siblings('span').html('<i class="iconfont icon-gou"></i>');
    }
}

