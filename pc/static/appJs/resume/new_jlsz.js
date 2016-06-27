/**
 * Created by zhoujia on 2015/9/14.
 */
var nowedit;
var o_i = 0;
function layer_close() {
    layer.close(o_i.index);
}
var uc_select={};

//学院输入处理
$(function(){
    var uc_name = $("#edit_education_uc_name"); //院校名称dom
    var uc_id = $("#edit_education_uc_id"); //院校IDdom
    //学院名称手动改变，如果等于最近一次选中的学校名字，那么id设置为那次的学校id
    //否则id设置为0
    uc_name.change(function(event) {
        if(uc_name.val() == uc_select.name){
            uc_id.val(uc_select.id);
        }
        else{
            uc_id.val(0);
        }
    });
})

$(function() {       
        // var education= $('#edit_workyear').find('span').text();  
        //     if(education !="应届生"){
        //             $('#scurrently_postaion').css('background', '#FFF url("/static/images/bitian.png") no-repeat left 15px'); 
        //     }  
        //     else{
        //            setTimeout(function(){
        //             $('#scurrently_postaion').css('background', '#fff');
        //         },500)
        // }   
        $(".edit_icon").click(function(event) {
            nowedit = $(this);
        });
        $(".icon-jiahao").parent().click(function(event) {
            nowedit = $(this);
        });
        //批量查看简历开始
           //初始化样式
           setTimeout(function(){
           $(".ac").hide();
           },2000)
           function resume_list(){
            $("#resume_list ul").width($("#resume_list ul").height()/40*100+"%");
            $("#resume_list li:last").css('borderRight', '1px solid #e0e0e0');
           }
           resume_list();
           var resume_go;//定时器
           $("#resume_list li").click(function(event) {
               $(this).addClass('active').siblings().removeClass('active');
           });
           $("#resume_list li i").click(function(event) {
              event.stopPropagation();
              //如果关闭的是当前浏览的
              if($(this).parent().hasClass('active')){
                //不是最后一个简历的的话就切换到下一个简历
                  if($(this).parent().index()!=$("#resume_list li").length-1){
                    $(this).parent().next().click();
                  }else{//否则切换到上一个
                    $(this).parent().prev().click();
                  }
              }

              $("#resume_list li").length>1&&$(this).parent().remove();
              resume_list();
           });
           // 右滚动事件
           $("#resume_r").mousedown(function(event) {
            resume_go = setInterval(function(){
                $("#resume_list div").scrollLeft($("#resume_list div").scrollLeft()+3);
            },1)
           });
           //左滚动事件
           $("#resume_l").mousedown(function(event) {
            resume_go = setInterval(function(){
                $("#resume_list div").scrollLeft($("#resume_list div").scrollLeft()-3);
            },1)
           });
           //鼠标按键弹起结束滚动
           $(".resume_go").mouseup(function(event) {
            clearInterval(resume_go);
           });
        //批量查看简历结束
       modulevalue();
       //去掉红框颜色
       // $(".commys").on('keyup keydown', function(event) {
       //     $(this).val() !="" && $(this).css('box-shadow', 'none'); 
       // });

       $('#edit_work_sindustry').on('keyup keydown', function(event) {
           $(this).children('span').eq(0).text() !='请选择行业' && $(this).css('box-shadow', 'none');
       });
        $("textarea").on('keydown keyup', function(event) {
            if($(this).next().hasClass('word_hint')){
                $(this).next().children('b').text($(this).val().length);
            }
        });
        $("textarea").keyup();
      //  $(window).scroll(function(){
      //  if($(document).scrollTop() > $(document).height()-$('.re_bottom').height()-760)
      //  {
      //   $('.sliderDiv').css('height','519px');
      //   $('.sliderCon_m1').css('height','483px');
      //   $('.sliderCon').css('height','auto');
      //  }
      //  else{
      //   console.log('123')
      //   $('.sliderDiv').css('height',$(window).height()-10+"px");
      //   $('.sliderCon_m1').css('height',$(window).height()-50+"px");
      //   $('.sliderCon').css('height','auto');
      //  }
      // })
        $(window).resize(function(event) {
            $('.sliderDiv').css('height',$(window).height()-10+"px");
            $('.sliderCon_m1').css('height',$(window).height()-50+"px");
            $('.sliderCon').css('height','auto');
        });

    if($('.li_mb7').height()>20){   
         $('#self_assessment').css('margin-bottom','5px');
    }
    else{
        $('#self_assessment').css('margin-bottom','18px');
    }
    //显示模式处理
    var showType = GetQueryString("t");
    var showResumeID = GetQueryString("resumeID");
    var fjType = $("#bing_if_fj").val();
    if (showType != null) {
        //预览模式处理
        $(".c_r").hide(); //基础信息编辑按钮
        $("#yq").hide(); //邀请
        $("#gjx").hide(); //工具栏(投递箱，收藏夹，订阅器)
        $(".f_r").hide(); //隐私设置
        $(".edit").hide(); //简历编辑添加
        $("#yl").hide(); //预览按钮
    }

    //设置预览地址
    var yl_url = "/jobs/resume/new_jlyl?t=yl";
    if (showResumeID != null) {
        yl_url += "&resumeID=" + showResumeID;
    }
    $("#yl").attr({
        "href": yl_url
    });
    $("textarea").mousedown(function(e) { //编辑框光标设置第一行第一列
        if ($(this).val().trim() == "") {
            $(this).val("");
            if (e && e.preventDefault)
                e.preventDefault();
            else
                window.event.returnValue = false;
            this.focus();
        }
    });
    //添加简历模式下处理
    if ($("#resumeID").val() == "") {
        $("#yq").hide(); //邀请
        $(".f_r").hide(); //隐私设置
        $(".edit").hide(); //简历编辑添加
        $("#yl").hide(); //预览按钮
        $("#base_cancel").hide(); //基础信息取消按钮
        $(".li_mb10").parent().children("li").hide(); //基础信息展示
        $(".content_box .jl_top").show();
        PositionControls("scurrently_postaion", $("#currently_postaion").text(), $("#edit_currently_postaion").val(), 'width:274px');
    }
    //获取个人标签
    $.ajax({
        type: "POST",
        url: "/ajax_dictionary",
        data: {
            "p_value": '11999000'
        },
        dataType: "json",
        success: function(data) {
            labelData = data;
        }
    });
    // 拖动进度条
    var $box = $('#tdJdt');
    var $bg = $('#tdJdt_bg');
    var $bgcolor = $('#tdJdt_bgColor');
    var $btn = $('#bt');
    var $text = $('#text');
    var statu = false;
    var ox = 0;
    var lx = 0;
    var left = 0;
    var bgleft = 0;
    var unitLeft = $box.attr('data-num');
    var left1 = 0;

    function showJd(p) {
        if (p < 25) {
            $text.html('差');
            $box.attr({
                'data-value': '差',
                'data-num': 25
            });
        }
        if (p >= 25 & p < 50) {
            $text.html('一般');
            $box.attr({
                'data-value': '一般',
                'data-num': 50
            });
        }
        if (p >= 50 & p < 75) {
            $text.html('良好');
            $box.attr({
                'data-value': '良好',
                'data-num': 75
            });
        }
        if (p >= 75) {
            $text.html('精通');
            $box.attr({
                'data-value': '精通',
                'data-num': 100
            });
        }
    }
    $btn.css('left', unitLeft * 2 + "px");
    $bgcolor.width(unitLeft * 2 + "px");
    showJd(unitLeft);
    $btn.mousedown(function(e) {
        lx = $btn.offset().left;
        ox = e.pageX - left;
        statu = true;
    });
    $(document).mouseup(function() {
        statu = false;
    });
    $box.mousemove(function(e) {
        if (statu) {
            left = e.pageX - ox;
            if (left < 0) {
                left = 0;
            }
            if (left > 200) {
                left = 200;
            }
            $btn.css('left', left);
            $bgcolor.width(left);
            showJd(parseInt(left / 2))
        }
    });
    $bg.click(function(e) {
        if (!statu) {
            bgleft = $bg.offset().left;
            left = e.pageX - bgleft;
            left1 = parseInt($("#bt").css('left'));
            left1 = left - left1;
            if (left < 0) {
                left = 0;
            }
            if (left > 200) {
                left = 200;
            }
            left1 > 0 ? left1 = "+=" : left1 = "-=";
            $btn.css('left', left1 + 50 + "px");
            $bgcolor.stop().animate({
                width: left1 + 50 + "px"
            }, 200);
            showJd(parseInt(left / 2))
        }
    });
    // 拖动进度条
    // var $box = $('#tdJdt');
    // var $bg = $('#tdJdt_bg');
    // var $bgcolor = $('#tdJdt_bgColor');
    // var $btn = $('#bt');
    // var $text = $('#text');
    // var statu = false;
    // var ox = 0;
    // var lx = 0;
    // var left = 0;
    // var bgleft = 0;
    // var unitLeft = $box.attr('data-num');

    // function showJd(p) {
    //     if (p < 25) {
    //         $text.html('差');
    //         $box.attr({
    //             'data-value': '差',
    //             'data-num': p
    //         });
    //     }
    //     if (p > 25 & p < 50) {
    //         $text.html('一般');
    //         $box.attr({
    //             'data-value': '一般',
    //             'data-num': p
    //         });
    //     }
    //     if (p > 50 & p < 75) {
    //         $text.html('良好');
    //         $box.attr({
    //             'data-value': '良好',
    //             'data-num': p
    //         });
    //     }
    //     if (p > 75) {
    //         $text.html('精通');
    //         $box.attr({
    //             'data-value': '精通',
    //             'data-num': p
    //         });
    //     }
    // }
    // $btn.css('left', unitLeft + "px");
    // $bgcolor.width(unitLeft + "px");
    // showJd(unitLeft);
    // $btn.mousedown(function(e) {
    //     lx = $btn.offset().left;
    //     ox = e.pageX - left;
    //     statu = true;
    // });
    // $(document).mouseup(function() {
    //     statu = false;
    // });
    // $box.mousemove(function(e) {
    //     if (statu) {
    //         left = e.pageX - ox;
    //         if (left < 0) {
    //             left = 0;
    //         }
    //         if (left > 200) {
    //             left = 200;
    //         }
    //         $btn.css('left', left);
    //         $bgcolor.width(left);
    //         showJd(parseInt(left / 2))
    //     }
    // });
    // $bg.click(function(e) {
    //     if (!statu) {
    //         bgleft = $bg.offset().left;
    //         left = e.pageX - bgleft;
    //         if (left < 0) {
    //             left = 0;
    //         }
    //         if (left > 200) {
    //             left = 200;
    //         }
    //         $btn.css('left', left);
    //         $bgcolor.stop().animate({
    //             width: left
    //         }, 200);
    //         showJd(parseInt(left / 2))
    //     }
    // });
    // 拖动进度条

    //补全院校
    setAutoComplete_uc();
    setAutoComplete_major();
    $(".ac").eq(3).hide();
    setAutoComplete_company(); //补全企业
    setAutoComplete_hadhunt(); //补全猎头

    $(".ac").hide();

    /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
    xiuxiu.embedSWF("photoBox", 5, "100%", "450px"); //编辑器类型（1为轻量编辑，2为轻量拼图，3为完整版，5为头像编辑器，默认值1）
    //修改为您自己的图片上传接口
    xiuxiu.setUploadURL("http://web.upload.meitu.com/image_upload.php");
    xiuxiu.setUploadType(2);
    xiuxiu.setUploadDataFieldName("upload_file");
    xiuxiu.onInit = function() {
        xiuxiu.loadPhoto($("#bind_head_portrait").val()); //修改为要处理的图片url
    };
    xiuxiu.onUploadResponse = function(data) {
        var imgData = $.parseJSON(data);
        var imgURL = $(imgData)[0].original_pic;

        $.ajax({
            type: "POST",
            url: "/jobs/ajax_updateHead_portrait",
            data: {
                "resumeID": $("#resumeID").val(),
                "imgURL": imgURL
            },
            dataType: "json",
            success: function(data) {
                if (data.msg == "error") {
                    window.alert("图像上传失败，请重试！",4);
                } else {
                    $("#head_portrait").attr({
                        "src": data.head_portrait
                    });
                    layer_close();
                }
            }
        });
    };
    xiuxiu.onBeforeUpload = function(data) {
        var size = data.size;
        if (size > 2 * 1024 * 1024) {
            window.alert("图片不能超过2M",4);
            return false;
        }
        return true;
    };

    var allow_zwyq = $(".slide_btn>span").css("left") == "0px" ? true : false;
    $(".slide_btn").click(function(event) {
        var value;
        if (allow_zwyq == false) {
            $(this).children('span').stop(true, true).animate({
                left: "0px"
            }, 150);
            allow_zwyq = !allow_zwyq;
            value = "1";
        } else {
            $(this).children('span').stop(true, true).animate({
                left: "-34px"
            }, 150);
            allow_zwyq = !allow_zwyq;
            value = "0";
        }
        //修改职位邀请类型
        $.ajax({
            type: "POST",
            url: "/jobs/ajax_setResume",
            data: {
                "type": "isinvite",
                "resumeID": $("#resumeID").val(),
                "isinvite": value
            },
            dataType: "json",
            success: function(data) {
                if (data.msg == "error") {
                    window.alert("设置失败，请重试！",4);
                }
            }
        });
    });

    // 所有添加按钮
    $(".edit[datatype='add']").click(function() {
        $('.ascertain').removeClass('load_btn');
        $(this).parent().parent().children('dd.jl_content_box').hide();
        $(this).parent().parent().children().eq(0).show();
        $(this).parent().parent().children('.h').show().find("input:not([class='edit_type'])").val("");
        $(this).parent().parent().children('.h').find('.selectControl').attr({
            "data-value": '',
            "data-key": ''
        }).find('span').html("请选择<i class='iconfont icon-xia1'></i>");
        $(this).parent().parent().children('.h').find('textarea').val("");
        $(this).parent().parent().children('.h').find('.ControlsWrap').children('span,i').remove();
        $(this).parent().parent().children('.h').find('.ControlsWrap').siblings('input').attr('value', '');
        $(this).parent().parent().children('.h').find('.jl_delete').hide();

        //如果是隐私设置添加按钮
        var edit_type = $(this).attr('data-tag');
        if (edit_type == "yssz") {
            $(this).parent().parent().children('.h').children('#qypb_box').show();
            $(this).parent().parent().children('.h').children('#ltpb_box').show();
        }

        $("#edit_work_end_time").css("background-color", "").removeAttr('disabled');
        $("#edit_work_end_time").parent().prev().children("span[class='to_now_control']").text("至今").attr("data-disabled", "no");
        $("#edit_education_end_time").css("background-color", "").removeAttr('disabled');;
        $("#edit_education_end_time").parent().prev().children("span[class='to_now_control']").text("至今").attr("data-disabled", "no");

        $("#edit_item_end_time").css("background-color", "").removeAttr('disabled');;
        $("#edit_item_end_time").parent().prev().children("span[class='to_now_control']").text("至今").attr("data-disabled", "no");

        $("#edit_training_end_time").css("background-color", "").removeAttr('disabled');;
        $("#edit_training_end_time").parent().prev().children("span[class='to_now_control']").text("至今").attr("data-disabled", "no");

        //点击添加时把所有编辑器的内容设为空值
        $("#edit_work_duty").val("");
        $("#edit_education_major_describe").val("");
        $("#edit_item_describe").val("");
        $("#edit_training_describe").val("");
        $("#edit_item_duty").val("");
        if (typeof($("#edit_evaluation").val()) != "undefined")
            $("#edit_evaluation").val("");
        operationNowObj = null;
    });
    // 所有添加按钮

    // 基本信息编辑
    $(".accout_info .c li.li_mb10 span.c_r").click(function() {
            
            $(".content_box .jl_top").show();
            PositionControls("scurrently_postaion", $("#currently_postaion").text(), $("#edit_currently_postaion").val(), 'width:276px !important');
            enjute();
            $('#base_cancel').prev().attr('class', 'active');
        })
        // 求职意向编辑
    $(".edit[datatype='qzyxEdit']").click(function() {
        $(this).parent().parent().children().hide().eq(0).show();
        $(this).parent().parent().children('.h').show();

        PositionControls("edit_sexpect_position", $("#bind_sPosition").val(), $("#bind_expect_position").val(), 'width:274px');
        BusinessulControls("edit_sexpect_industry", $("#bind_sIndustry").val(), $("#bind_expect_industry").val(), 'width:274px');
    })


    // 个人标签编辑
    $(".edit[datatype='grbqEdit']").click(function() {
            changeLabel();
            $(this).parent().parent().children().hide().eq(0).show();
            $(this).parent().parent().children('.h').show();
        })
        // 更多隐私设置编辑
    $(".edit[datatype='gdysEdit_m']").click(function() {
            $(this).parent().parent().parent().children().hide().eq(0).show();
            $(this).parent().parent().parent().children('.h').show();
            $(this).parent().parent().parent().find('.jl_delete').show();
            var index = $(".edit[datatype='gdysEdit_m']").index(this);

            if (index == 0) {
                $("#qypb_box").show();
                $("#ltpb_box").hide();

                $("#edit_filter_tpc").empty();
                $("#edit_filter_type").val("1");
                $("#filter_tpc li").each(function() {
                    $("#edit_filter_tpc").append('<li data-id="' + $(this).attr("data-id") + '">' + $(this).text() + '<i class="iconfont icon-cha"></i></li>');
                });
            } else {
                $("#qypb_box").hide();
                $("#ltpb_box").show();

                $("#edit_filter_tpu").empty();
                $("#edit_filter_type").val("2");
                $("#filter_tpu li").each(function() {
                    $("#edit_filter_tpu").append('<li data-id="' + $(this).attr("data-id") + '">' + $(this).text() + '<i class="iconfont icon-cha"></i></li>');
                });
            }
        })
        // 删除
    $(".jl_delete1").click(function(event) {
        $(this).parent().parent().hide().prev().show();
        $(operationNowObj).parent().remove();        
    });
    $(".jl_delete").click(function() {
            var id = $(this).parent().parent().children("input:hidden").eq(0).val();
            var type = $(this).parent().parent().children("input:hidden").eq(1).val();
            var ret = "error";
            switch (type) {
                case "WorkExperienceSave": //工作经历删除
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: "/ajax_editWork",
                        data: {
                            "type": "del",
                            "resumeID": $("#resumeID").val(),
                            "trwID": id
                        },
                        dataType: "json",
                        success: function(data) {
                            if (data.count != null) {
                                ret = "success";
                                modulevalue();
                                //更新成功后进行设值
                                $("#wsResum_name").text(data.wsres + '%');
                                $("#wsResum_value").val(data.wsres);
                            }
                        }
                    });
                    break;
                case "EducationExperienceSave": //教育经历删除
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: "/ajax_editEducation",
                        data: {
                            "type": "del",
                            "resumeID": $("#resumeID").val(),
                            "treID": id
                        },
                        dataType: "json",
                        success: function(data) {
                            if (data.count != null) {
                                ret = "success";
                                modulevalue();
                                //更新成功后进行设值
                                $("#wsResum_name").text(data.wsres + '%');
                                $("#wsResum_value").val(data.wsres);
                            }
                        }
                    });
                    break;
                case "ItemExperienceSave": //项目经历删除
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: "/ajax_editItem",
                        data: {
                            "type": "del",
                            "resumeID": $("#resumeID").val(),
                            "triID": id
                        },
                        dataType: "json",
                        success: function(data) {
                            if (data.count != null) {
                                ret = "success";
                                modulevalue();
                                //更新成功后进行设值
                                $("#wsResum_name").text(data.wsres + '%');
                                $("#wsResum_value").val(data.wsres);
                            }
                        }
                    });
                    break;
                case "TrainingExperienceSave": //培训经历删除
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: "/ajax_editTraining",
                        data: {
                            "type": "del",
                            "resumeID": $("#resumeID").val(),
                            "trtID": id
                        },
                        dataType: "json",
                        success: function(data) {
                            if (data.count != null) {
                                ret = "success";
                                modulevalue();
                                //更新成功后进行设值
                                $("#wsResum_name").text(data.wsres + '%');
                                $("#wsResum_value").val(data.wsres);
                            }
                        }
                    });
                    break;
                case "SkillSave": //个人技能删除
                    $(this).parent().parent().hide().prev().show();
                    $(operationNowObj).parent().remove();
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: "/ajax_editSkill",
                        data: {
                            "type": "del",
                            "resumeID": $("#resumeID").val(),
                            "trsID": id
                        },
                        dataType: "json",
                        success: function(data) {
                            if (data.count != null) {
                                ret = "success";
                                modulevalue();
                                //更新成功后进行设值
                                $("#wsResum_name").text(data.wsres + '%');
                                $("#wsResum_value").val(data.wsres);
                            }
                        }
                    });
                    break;
                default:
                    break;
            }

            if (ret == "success") {
                modulevalue();
                edit_cancel(this);
                var obj = $(operationNowObj).parent().parent().parent().parent();
                obj.prev().remove().end().remove();
            } else {
                window.alert("删除失败，请重试",2);
            }
        })
        //取消
    $(".cancel").click(function() {
        edit_cancel(this);
    })

    // 上传简历模块滚动
    // $("#jl_upload").screenScroll($("#UseFoScreenScroll"), 1);
    var $tt = $("#jl_upload").offset().top;
    $(document).scroll(function(event) {
        var $dh = $("#jl_upload");
        var $info = $('.sliderDiv');
        var $box = $(".content_box");
        var $gjx = $tt;
        var maxtop = $box.outerHeight()-$(".content_right .r_box").outerHeight();
        if($info.length>0)
            maxtop = $box.outerHeight()-$info.outerHeight()-2;
        if($(window).scrollTop()>=$gjx){
            if($(window).scrollTop()-$gjx<maxtop)
                $dh.css('top', $(window).scrollTop()-$gjx+"px");
            else
                $dh.css('top', maxtop+"px");
        }else{
            $dh.css('top', "0px");
        }
    });

    // 弹出框打开上传头像

    $('#camera').on('click', function() {
        var resumeId = $("#resumeID").val();
        if (resumeId == '') {
            window.alert("请先上传简历再进行保存头像操作!",4);
            return false;
        }
        o_i = layer;
        layer_index = layer.open({
            type: 1,
            title: '上传照片',
            skin: 'o_xiuxiu',
            area: ['900px', '550px'],
            shadeClose: true, //点击遮罩关闭
            content: $("#xiuxiuEditor"),
            btn: [''],
            success: function() {
                $("#clx").css('display', 'block');

            }
        });
    });

    /*初始页面*/
    // 初始化下拉控件
    $(".select1").select({
        width: '273px',
        height: '41px'
    });
    $(".select2").select({
        width: '122px',
        height: '41px'
    });
    $('.select2').click(function(event) {
        enjute();
    });
    $(".select3").select({
        width: '60px',
        height: '26px',
        style: 'background-color:transparent;border:1px solid #999;display:inline-block;color:white;font-size:12px'
    });
    // 初始化下拉控件
    // 初始化姓别
    $(".sex_button").switchTab();
    // 初始化姓别
    // 圆形进度条
    $(".knob").knob({
        thickness: .05,
        fgColor: '#ff8800',
        bgColor: '#e4e4e4',
        displayInput: false,
        readOnly: true
    });
    // 圆形进度条
    // 隐私设置
    $(".privacy .f_r .cursor").hover(function() {
        $(this).children('ul').stop(true, true).slideDown(150);
        $(this).children('ul').children('li').click(function(event) {
            var value = $(this).children('input').val();
            var obj = this;
            //修改职位邀请类型
            $.ajax({
                type: "POST",
                url: "/jobs/ajax_setResume",
                data: {
                    "type": "search_type",
                    "resumeID": $("#resumeID").val(),
                    "search_type": value
                },
                dataType: "json",
                success: function(data) {
                    if (data.msg == "error") {
                         if ($("#resumeID").val() == '') {
                            window.alert("请先保存基本信息再进行隐私操作!",4);
                            return false;
                        }else
                            window.alert("设置失败，请重试！",2);
                        
                    } else {
                        $(obj).parent().prev().html($(obj).html() + "<i class=\'iconfont icon-xiajiantou\'></i>");
                    }
                }

            });
            $(this).parent().hide();
        });
    }, function() {
        $(this).children('ul').stop(true, true).slideUp(150);
    });
    // 开发简历下拉列表
    // 侧边栏导航定位
    $(".content_right .r .b div").click(function(event) {
        var i = $(this).index();
        $(".content_right .r .b div").removeClass('active');
        $(this).addClass('active');
        if (i == 0)
            $(document).scrollTop(0);
        else
            $(document).scrollTop(parseInt($(".jl_title").eq(i - 1).offset().top) - 50);
    });
    $(document).scroll(function() {
            if ($(document).scrollTop() <= parseInt($(".jl_title").eq(0).offset().top) - 60) {
                $(".content_right .r .b div").removeClass('active');
                $(".content_right .r .b div").eq(0).addClass('active');
            } else {
                $(".jl_title").each(function(i, e) {
                    if ($(document).scrollTop() >= parseInt($(e).offset().top) - 50) {
                        $(".content_right .r .b div").removeClass('active');
                        $(".content_right .r .b div").eq(i + 1).addClass('active');
                    }
                })
            }
        })
        //取消
    $(".cancel").click(function() {
        $(this).parent().parent().parent().children().show();
        $(this).parent().parent().hide();
    })

    // 个人隐私
    $(".tag_h input[type='radio']").click(function() {
            if ($(this).val() == "2") {
                $(this).parent().next('.ysSet_box').show();
            } else {
                $(this).parent().next().next('.ysSet_box').hide();
            }
        })
        //保存过滤企业
    $("#qy_save_btn").click(function() {
        var name = $(this).prev().prev().val();
        var val = $(this).parent().children("input:hidden").val();
        var ul = $(this).parent().prev();
        var length = ul.children('li').length;
        var val_list = "";
        //获取现有的企业值
        ul.children("li").each(function() {
            val_list += "," + $(this).attr("data-id");
        });

        if (val == "") {
            window.alert("请选择企业",4);
            return;
        }

        if (val_list.indexOf(val) >= 0) {
            window.alert("已选择该企业",4);
            return;
        }

        if (length > 12) {
            window.alert("只能同时过滤12个企业",4);
            return;
        }

        ul.append('<li data-id="' + val + '">' + name + '<i class="iconfont icon-cha"></i></li>');
        $(this).prev().val('');
        $(this).prev().prev().val('');
    })
    $("#lt_save_btn").click(function() {
        var name = $(this).prev().prev().val();
        var val = $(this).parent().children("input:hidden").val();
        var ul = $(this).parent().prev();
        var length = ul.children('li').length;
        var val_list = "";
        //获取现有的猎头的值
        ul.children("li").each(function() {
            val_list += "," + $(this).attr("data-id");
        });

        if (val == "") {
            window.alert("请选择经纪人",4);
            return;
        }

        if (val_list.indexOf(val) >= 0) {
            window.alert("已选择该经纪人",4);
            return;
        }

        if (length > 12) {
            window.alert("只能同时过滤12个经纪人",4);
            return;
        }

        ul.append('<li data-id="' + val + '">' + name + '<i class="iconfont icon-cha"></i></li>');
        $(this).prev().val('');
        $(this).prev().prev().val('');
    })
    $(document).on('click', '.ysSet_box i', function() {
        $(this).parent().remove();
    })
    if (fjType != "None" && fjType != "") {
        $(".sliderDiv").show();
        $(".c_r").show(); //基础信息编辑按钮
        $("#yq").show(); //邀请
        $("#gjx").show(); //工具栏(投递箱，收藏夹，订阅器)
        $(".f_r").show(); //隐私设置
        $(".edit").show(); //简历编辑添加
    }
    $("#sliderCon_m1 dt").click(function() {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
            $(this).css('background', '#dfe1e4');
            $(".sliderCon_m1 dl dt img").attr('src', '/static/images/jiaj_03.png');
        } else {
            var resumeId = $("#resumeID").val();
            var index=$("#sliderCon_m1 dt").index(this);
            if(index!=0&&resumeId!="") return;
            $(".sliderCon_m1 dl").removeClass('active');
            $(this).parent().addClass('active');
            $(this).children('img').attr('src', '/static/images/jianj_03.png');
        }
    })
    $("#sliderCon_m1 dt:first").click();
    $("#sliderCon_m1").scroll(function(){
       if($(this).scrollTop()>=10)
       {
        $(this).children('dl').eq(0).children('dt').css({position:'absolute',top:'0',width:'100%'})
       }
       else
       {
        $(this).children('dl').eq(0).children('dt').removeAttr('style');
       }
    })
})


function enjute(){
           var education= $('#edit_workyear').find('span').text();  
            if(education !="应届生"){
                    $('#scurrently_postaion').css('background', '#FFF url("/static/images/bitian.png") no-repeat left 15px'); 
            }  
            else{
                    $('#scurrently_postaion').css('background', '#fff');
            }
}


//基本信息保存
function BasicInfoSave(obj) {
    if ($(obj).hasClass('load_btn'))
        return false;
    var user_name = $("#edit_user_name").val(); //姓名
    var sex; //性别
    if ($(".sex_button div").eq(1).hasClass('active')) {
        sex = "女";
    } else {
        sex = "男";
    }
    var birthday_year = $("#edit_birthday_year").val().substr(0,4); //出生年
    var birthday_month = $("#edit_birthday_year").val().substr(5,6); //出生月
    var phone = $("#edit_phone").val(); //电话
    var email = $("#edit_email").val(); //邮箱
    var workyear = $("#edit_workyear").attr("data-key"); //工作经验
    var diploma = $("#edit_diploma").attr("data-key"); //学历
    var currently_postaion = $("#edit_currently_postaion").val(); //当前所在职位
    var currently_company = $("#edit_currently_company").val(); //当前所在公司
    var currently_pacece = $("#edit_currently_pacece").val(); //当前所在地
    var marital = $("#edit_marital").attr("data-key"); //婚姻状况
    var self_assessment = $("#edit_self_assessment").val(); //自我评价
    var source_text = $('#bing_if_fj').val(); //上传简历文本内容
    var education= $('#edit_workyear').find('span').text();  
    var native_key=$('#native_key').val();  //籍贯
    var native_name =$('#native_name').val();//籍贯名称
    var scurrently_pacece = $("#scurrently_pacece").val(); //当前所在地名称
    var smarital = $("#edit_marital").attr("data-value"); //婚姻状况
    if ($.trim(user_name) == "") {
        window.alert("姓名不能为空",4);
        return false;
    }
    if ($.trim(sex) == "" || sex == 0 || sex == "None") {
        window.alert("性别不能为空",4);
        return
    }
    if ($.trim(birthday_year) == "0" || birthday_year == "" || birthday_year == "None") {
        window.alert("出生年不能为空",4);
        return
    }
    if ($.trim(phone) == "") {
        window.alert("手机号码不能为空！",4);
        return false;
    }
    if (!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(phone))) {
        window.alert("手机格式不正确，请重新输入！",4);
        return false;
    }
    // if ($.trim(email) == "") {
    //     alert("常用邮箱不能为空");
    //     return false;
    // }
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    if (!reg.test(email) && $.trim(email) != "") {
        window.alert("邮箱格式不对，请重新输入！",4);
        return false;
    }

    if ($.trim(workyear) == "0" || workyear == "" || workyear == "None") {
        window.alert("工作经验不能为空",4);
        return
    }
    // if (workyear == "0" || $.trim(workyear) == "") {
    //     alert("工作经验不能为空");
    //     return false;
    // }
    // if (diploma == "0" || $.trim(diploma) == "") {
    //     alert("学历不能为空");
    //     return false;
    // }
    if ($.trim(diploma) == "0" || diploma == "" || diploma == "None") {
        window.alert("学历不能为空",4);
        return false;
    }
    
               
    if(education !="应届生"){
                    if ($.trim(currently_postaion) == "" || currently_postaion == "0" || currently_postaion == "None") {
                       window.alert("目前所在职位不能为空",4);
                       return false;                   
                   }   
                    $('#scurrently_postaion').css('background', '#FFF url("../../images/bitian.png") no-repeat left 15px');
    }  
    else{
             if ($.trim(currently_postaion) == "" || currently_postaion == "0" || currently_postaion == "None") {
                 $("#edit_currently_postaion").val('');
             }
             $('#scurrently_postaion').css('background', '#fff');
    }

    // if ($.trim(currently_postaion) == "" || currently_postaion == "0" || currently_postaion == "None") {
    //     alert("目前所在职位不能为空");
    //     return false;
    // }
    if ($.trim(currently_pacece) == "" || currently_pacece == "0" || currently_pacece == "None") {
        window.alert("目前居住地不能为空",4);
        return false;
    }
    if (marital == "0" || $.trim(marital) == "" || marital == "None") {
        window.alert("婚姻状况不能为空",4);
        return false;
    }

    var resumeId = $("#resumeID").val();
    var upload_file_id = '';
    if (resumeId == '' && location.href.indexOf('fileChangeResume') != -1) {
        upload_file_id = $('#sliderCon_m1').children('dl').eq(0).children('input').val();
    }
    $(obj).addClass('load_btn');
    $.ajax({
        type: "POST",
        url: "/ajax_manageResume",
        data: {
            "resumeID": resumeId,
            "user_name": user_name,
            "sex": sex,
            "birthday_year": birthday_year,
            "birthday_month": birthday_month,
            "phone": phone,
            "email": email,
            "workyear": workyear,
            "diploma": diploma,
            "currently_postaion": currently_postaion,
            "currently_company": currently_company,
            "currently_pacece": currently_pacece,
            "marital": marital,
            "self_assessment": self_assessment,
            "type": 1,
            "source_text": source_text,
            "upload_file_id": upload_file_id,
            "native" : native_key
        },
        dataType: "json",
        success: function(data) {
            if (data.resumeID != "") {
                if(resumeId == '' && location.href.indexOf('new_jlsz') != -1){
                    window.location = "/jobs/resume/new_jlsz?resumeID=" + data.resumeID;
                }else{
                     $('.jb_info ul').show();
                    //更新成功后进行设值
                    $("#wsResum_name").text(data.wsres + '%');
                    $("#wsResum_value").val(data.wsres);

                    $("#user_name").text($("#edit_user_name").val()); //姓名
                    //性别
                    if (sex == "男") {
                        $("#sex_ico").attr({
                            "class": "iconfont icon-nan"
                        });
                    } else {
                        $("#sex_ico").attr({
                            "class": "iconfont icon-nv"
                        });
                    }
                    $("#sex").text(sex);
                    $("#age").text(data.age + '岁'); //年龄
                    $("#diploma").text($("#edit_diploma").attr("data-value")); //学历
                    $("#scurrently_pacece").text($("#").val()); //目前居住地
                    $("#marital").text($("#edit_marital").attr("data-value")); //婚姻状况
                    $("#currently_company").text($("#edit_currently_company").val()); //目前所在公司
                  
                   
   
                    if ($.trim($('#currently_company').text()) != '') {
                        $("#currently_company").css('display', '');
                        $("#currently_company").next().css('display', '');
                    } else {
                        $("#currently_company").css('display', 'none');
                        // $("#currently_company").next().css('display', 'none');
                    }
                    if($("#scurrently_postaion").text() =="请选择职位"){
                          $("#currently_postaion").text(''); //目前职位
                          $("#currently_postaion").prev().css('display','none');
                    }
                    else{
                         $("#currently_postaion").text($("#scurrently_postaion").text()); //目前职位
                          $("#currently_postaion").prev().css('display','inline-block');
                    }
                    if($.trim($('#currently_company').text()) ==""){
                         $("#currently_company").next().css('display', 'none');
                          $("#currently_postaion").next().css('display','inline-block');
                    }
                    if($.trim($('#currently_company').text()) =="" && $("#currently_postaion").text() ==""){
                          $("#currently_postaion").next().css('display','none');
                    }

                    // if ($("#currently_postaion").next(':hidden')) {
                    //     $("#currently_postaion").next().css('display', '');
                    // }
                    $("#workyear").text($("#edit_workyear").attr("data-value") + "经验"); //工作经验
                    $("#phone").text("手机:" + $("#edit_phone").val()); //手机
                    if ($("#phone:hidden")) {
                        $("#phone").css('display', '')
                    }
                    $("#email").text("邮箱:" + $("#edit_email").val()); //邮箱
                    if ($.trim(email) != '') {
                        $("#email").css('display', '')
                    } else {
                        $("#email").css('display', 'none')
                    }
                    $("#self_assessment").text(self_assessment); //自我评价
                 
                    $('#jb_info').children('li').eq(0).children('span').eq(1).text(user_name);
                    $('#jb_info').children('li').eq(1).children('span').eq(1).text(birthday_year+'-'+birthday_month);
                    $('#jb_info').children('li').eq(2).children('span').eq(1).text(sex);
                    $('#jb_info').children('li').eq(3).children('span').eq(1).text($("#edit_workyear").attr("data-value"));
                    $('#jb_info').children('li').eq(4).children('span').eq(1).text($("#edit_diploma").attr("data-value"));
                    $('#jb_info').children('li').eq(5).children('span').eq(1).text($("#").val());
                    $('#jb_info').children('li').eq(6).children('span').eq(1).text(smarital);
                    $('#jb_info').children('li').eq(7).children('span').eq(1).text(currently_company);
                    $('#jb_info').children('li').eq(8).children('span').eq(1).text($("#scurrently_postaion").text());
                    $('#jb_info').children('li').eq(9).children('span').eq(1).text(phone);
                    $('#jb_info').children('li').eq(10).children('span').eq(1).text(email);
                    $('#jb_info').children('li').eq(11).children('span').eq(1).text(native_name);
                    $('#jb_info').children('li').eq(12).children('span').eq(1).text(self_assessment);  
                    $(".age").text('('+data.age + '岁)'); //年龄
                    if (resumeId == "") {
                        $("#resumeID").val(data.resumeID);
                        $("#yq").show(); //邀请
                        $(".f_r").show(); //隐私设置
                        $(".edit").show(); //简历编辑添加
                        $("#yl").show(); //预览按钮                        
                        $("#base_cancel").show(); //基础信息取消按钮
                        $(".li_mb10").parent().children("li").show(); //基础信息展示
                        var account_type = $('#account_type').val();
                        //经纪人新增简历，保存基本信息后显示导出图标
                        if(account_type == '3' || account_type == '5'){
                            $(".privacy").show();
                            $('#agent_export').show();//显示导出简历的图标
                            $('#agent_export').children('li:first').attr('onclick', 'recommend(\'1\', \''+$("#pu_id").val()+'\', \''+data.resumeID+'\', \''+user_name+'\', \'2\')');
                            $('#agent_export').children('li:eq(1)').attr('onclick', 'doForwardResume(['+data.resumeID+'])');
                            var exportType = $('#exportType').val();
                            var user_name = $("#edit_user_name").val();
                            $('#agent_export').children('li:eq(2)').attr('onclick', 'showCheck(\''+data.resumeID+'\', \''+user_name+'\', \''+exportType+'\')');
                            $('.hcdy').attr('onclick', 'exportResume(\''+data.resumeID+'\', \''+user_name+'\', \'hcdy\')');
                            $('.sdjl').attr('onclick', 'exportResume(\''+data.resumeID+'\', \''+user_name+'\', \'sdjl\')');
                        }
                    }
                    var yl_url = "/jobs/resume/new_jlyl?t=yl&resumeID=" + data.resumeID;
                    $("#yl").attr({
                        "href": yl_url
                    });
                    edit_cancel(obj);
                    modulevalue();
                }
            } else {
                window.alert("保存失败",2);
            }
            $(obj).removeClass('load_btn');
        }
    });
}

//求职意向保存
function JobIntensionSave(obj) {
    if ($(obj).hasClass('load_btn'))
        return false;
    var currently_salary = $("#edit_currently_salary").attr("data-key"); //目前年薪
    var expect_pay = $("#edit_expect_pay").attr("data-key"); //期望薪资
    var expect_pay1 = $("#edit_expect_pay").attr("data-value");
    var expect_industry = $("#edit_expect_industry").val(); //期望行业
    var expect_position = $("#edit_expect_position").val(); //期望职位
    var expect_work_nature = $("#edit_expect_work_nature").attr("data-key"); //期望工作性质
    var expect_area = $("#edit_expect_area").val(); //期望工作地点
    var work_time = $("#edit_work_time").attr("data-key"); //到岗时间  
    if($.trim($("#resumesouid").val()) != 1){        
         var position_status = $("#edit_position_status").attr("data-key"); //求职状态
        //信息验证
        if ($.trim(position_status) == "" || $.trim(position_status) == "None") {
            window.alert("求职状态不能为空",4);
            return false;
        }
    }
    var position_status = $("#edit_position_status").attr("data-key"); //求职状态

    // //信息验证
    if ($.trim(position_status) == "" || $.trim(position_status) == "None") {
       position_status = '';
    }
    if (($.trim(expect_pay) == "None" || $.trim(expect_pay) == "") && $('#edit_expect_pay').children('span').text() == '请选择') {
        window.alert("期望年薪不能为空",4);
        return false;
    }
    if (($.trim(expect_pay1) == "None" || $.trim(expect_pay1) == "") && $('#edit_expect_pay').children('span').text() == '请选择') {
        window.alert("期望年薪不能为空",4);
        return false;
    }
    if ((currently_salary == "None" || currently_salary == "") && $('#edit_currently_salary').children('span').text() == '请选择') {
        window.alert("目前年薪不能为空",4);
        return false;
    }
    // if (expect_work_nature == "None" || expect_work_nature == "") {
    //     alert("期望工作性质不能为空");
    //     return false;
    // }
    // if (work_time == "None" || work_time == "") {
    //     alert("到岗时间不能为空");
    //     return false;
    // }
    if (expect_work_nature == "None" || expect_work_nature == "") {
        expect_work_nature='';
    }
    if (work_time == "None" || work_time == "") {
        work_time='';
    }
    if (expect_area == "None" || $.trim(expect_area) == "") {
        window.alert("期望工作地点不能为空",4);
        return false;
    }
    if (expect_industry == "None" || $.trim(expect_industry) == "") {
        window.alert("期望行业不能为空",4);
        return false;
    }
    if (expect_position == "None" || $.trim(expect_position) == "") {
        window.alert("期望职位不能为空",4);
        return false;
    }
    $(obj).addClass('load_btn');
    $.ajax({
        type: "POST",
        url: "/jobs/ajax_manageResume",
        data: {
            "resumeID": $("#resumeID").val(),
            "currently_salary": currently_salary,
            "expect_pay": expect_pay,
            "expect_industry": expect_industry,
            "expect_position": expect_position,
            "expect_work_nature": expect_work_nature,
            "expect_area": expect_area,
            "work_time": work_time,
            "position_status": position_status,
            "type": 2
        },
        dataType: "json",
        success: function(data) {
            if (data.resumeID != "") {
                //更新成功后进行设值
                $("#wsResum_name").text(data.wsres + '%');
                $("#wsResum_value").val(data.wsres);

                $("#sposition_status").text($("#edit_position_status").attr("data-value")); //求职状态
                $("#scurrently_salary").text($("#edit_currently_salary").children('span').text()); //目前年薪
                $("#sexpect_pay").text($("#edit_expect_pay").children('span').text()); //期望年薪
                if($("#edit_expect_work_nature").attr("data-value") =='None'){
                     $("#sexpect_work_nature").text(''); //期望工作性质
                }else{
                    $("#sexpect_work_nature").text($("#edit_expect_work_nature").attr("data-value")); //期望工作性质
                }

                $("#sArea").text($("#edit_sexpect_area").val()); //期望工作地点
                //期望行业
                var sExpect_industry = "";
                $("#edit_sexpect_industry").children("span").each(function(i) {
                    if (i == 0) {
                        sExpect_industry = $(this).text();
                    } else {
                        sExpect_industry += "、" + $(this).text();
                    }
                })
                $("#sIndustry").text(sExpect_industry);
                //设置隐藏值
                $("#bind_sIndustry").val(sExpect_industry);
                $("#bind_expect_industry").val(expect_industry);
                //期望职位
                var sExpect_position = "";
                $("#edit_sexpect_position").children("span").each(function(i) {
                    if (i == 0) {
                        sExpect_position = $(this).text();
                    } else {
                        sExpect_position += "、" + $(this).text();
                    }
                })
                $("#sPosition").text(sExpect_position);
                //设置隐藏值
                $("#bind_sPosition").val(sExpect_position);
                $("#bind_expect_position").val(expect_position);
                if($("#edit_work_time").attr("data-value") =='None'){
                    $("#swork_time").text(''); //到岗时间
                }else{
                    $("#swork_time").text($("#edit_work_time").attr("data-value")); //到岗时间
                }
                
                edit_cancel(obj);
                modulevalue();

            } else {
                window.alert("保存失败",2);

            }
            $(obj).removeClass('load_btn');
        }
    });
}

var operationNowObj; //当前操作对象(适用于工作经历、教育经历、项目经历、培训经历、个人技能)

//工作经历保存
function WorkExperienceSave(obj) {
    if ($(obj).hasClass('load_btn')) {
        return false;
    }
    var info_obj = $(obj).parent().parent();
    // alert($(info_obj).find("input[datatype='edit_work_industry']").val());    
    var trwID = $(info_obj).children('input:hidden').eq(0).val(); //  $("#eidt_resume_work_id").val(); //主键ID
    var company_name = $(info_obj).find("input[datatype='edit_work_company_name']").val(); // $("#edit_work_company_name").val(); //公司名称
    var industry = $(info_obj).find("input[datatype='edit_work_industry']").val(); // $("#edit_work_industry").val(); //行业
    var sindustry = $(info_obj).find("div[datatype='edit_work_sindustry']").children("span").text();
    var position = $(info_obj).find("input[datatype='edit_work_position']").val(); // $("#edit_work_position").val(); //职位
//    var sposition = $(info_obj).find("div[datatype='edit_work_sposition']").children("span").text();
    var subordinate = $(info_obj).find("div[datatype='edit_work_subordinate']").attr("data-key"); // $("#edit_work_subordinate").attr("data-key"); //下属人数
    var ssubordinate = $(info_obj).find("div[datatype='edit_work_subordinate']").attr("data-value");
    var start_time = $(info_obj).find("input[datatype='edit_work_start_time']").val(); // $("#edit_work_start_time").val(); //入职时间
    var work_duty = $(info_obj).find("textarea[datatype='edit_work_duty']").val().replace(/\n/g, '<br/>'); //工作职责
    var scompany_scale = $(info_obj).find("div[datatype='edit_company_size']").attr("data-key"); //公司规模
    var company_scale = $(info_obj).find("div[datatype='edit_company_size']").attr("data-value");
    var scompany_nature = $(info_obj).find("div[datatype='edit_company_nature']").attr("data-key"); //公司性质
    var company_nature = $(info_obj).find("div[datatype='edit_company_nature']").attr("data-value"); 
    var company_introduce = $(info_obj).find("textarea[datatype='edit_company_profile']").val().replace(/\n/g,'<br/>'); //公司简介
    var job_performance =$(info_obj).find("textarea[datatype='edit_perfor_duty']").val().replace(/\n/g,'<br/>');//工作业绩
    var report_object = $(info_obj).find("input[datatype='edit_report_object']").val(); //汇报对象
    //离职原因
    var leaving_reasons = '';
    if( $(".departure .why p").attr('data-val') != 4){
        // leaving_reasons = $(".departure .why p").attr('data-val');
        leaving_reasons =$(obj).parent().prev().children().find('p').text();
    }else{
        if($.trim($(".departure .describe").val()) == ""){
            leaving_reasons = $(".departure .describezh").val();
        }
        else{
            leaving_reasons = $(".departure .describe").val();
        }        
    }
    if (start_time.length > 12) {
        start_time = start_time.substring(0, start_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
    } else if (start_time.length == 7) {
        start_time += '-01';
    }
    var end_time = $(info_obj).find("input[datatype='edit_work_end_time']").val(); // $("#edit_work_end_time").val(); //离职时间
    if (end_time.length > 12) {
        end_time = end_time.substring(0, end_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
    } else if (end_time.length == 7) {
        end_time += '-01';
    }
    if ($.trim($("#resumeID").val()) == "") {
        window.alert("请先保存基本信息",4);
        return false;
    }

    // if ($.trim(work_duty).length == 0 || $.trim(work_duty).length < 6) {
    //     window.alert("工作职责不能为空并且不能小于6个字",4);
    //     return false;
    // }
    if ($.trim(work_duty).length > 1000) {
        window.alert("工作职责不能超过1000个字",4);
        return false;
    }
    if ($.trim(company_name) == "") {
        alert("公司名称不能为空");
        return false;
    }
    // if ($.trim(company_name).length > 50) {
    //     alert("公司名称不能超过50个字");
    //     return false;
    // }
    if ($.trim(industry) == "" || industry == 0) {
        window.alert("行业不能为空",4);
        return false;
    }
    if ($.trim(position) == "" || position == 0) {
        window.alert("职位不能为空",4);
        return false;
    }
    // if ($.trim(subordinate) == "" || subordinate == 0) {
    //     window.alert("下属人数不能为空",4);
    //     return false;
    // }
    if (start_time == "" || start_time == 0) {
        window.alert("入职时间不能为空",4);
        return false;
    }
    if ($.trim(end_time) == "" || end_time == 0) {
        window.alert("离职时间不能为空!",4);
        return false;
    } else if (end_time != "至今" && start_time > end_time) {
        window.alert("您输入的起始日期大于结束日期!",4);
        return false;
    }
    $(obj).addClass('load_btn');
    $.ajax({
        type: "POST",
        url: "/ajax_editWork",
        data: {
            "company_name": company_name,
            "industry": industry,
            "position": position,
            "subordinate": subordinate,
            "start_time": start_time,
            "end_time": end_time,
            "work_duty": work_duty,
            "trwID": trwID,
            "company_introduce": company_introduce,
            "company_nature": scompany_nature,
            "company_scale": scompany_scale,
            "report_object": report_object,
            "job_performance": job_performance,
            "leaving_reasons": leaving_reasons,
            "resumeID": $("#resumeID").val(),
            "type": "edit"
            // "departure_why":departure_why
        },
        dataType: "json",
        success: function(data) {
            if (data.trwID != "") {                
                if (trwID == "") {                    
                    var html = '';              
                        html += '<dd style="clear:both;"></dd>';
                        html += '<dd class="jl_content_box clearfix">';                    
                        html += '<div class="r r_box">';
                        html += '<i class="iconfont icon-time"></i>';
                        html += '<div><div>';
                        html += '<div class="edit comm_compile" datatype="gzjlEdit_m" onclick="gzjlEdit(this)"  >';
                        html += '<img src="/static/images/icon_05.png">';
                        html += '</div>';
                        html += '<ul class="work_exper" id="work_exper">';
                        html += '<li>';
                        html += '<input type="hidden" value="' + data.trwID + '" >';
                        html += '<span class="c_99">入职时间：</span>';
                        html += '<span class="c_33">' + start_time.substr(0, 7).replace('-', '/') + '</span>';                                 
                        html += '</li>';
                        html += '<li>';
                        html += '<span class="c_99">离职时间：</span>';
                        html += '<span class="c_33">' + end_time.substr(0, 7).replace('-', '/');
                        html += '</span>';
                        html += '<input type="hidden" value="' + start_time + '|' + end_time + '">';
                        html += '</li>';
                        html += '<li>';
                        html += '             <span class="c_99">公司名称：</span>';
                        html += '            <span class="c_33">'+company_name+'</span>';
                        html += '       </li>';                       
                        html += '       <li>';
                        html += '            <span class="c_99">所属行业：</span>';
                        html += '            <span class="c_33">'+sindustry+'</span>';
                        html += '            <input type="hidden" value="'+industry+'" />';
                        html += '       </li>';
                        if($.trim(company_scale)!=""){
                             html += '<li style="display:block">';
                        }else{
                             html += '<li style="display:none">';
                        }
                        html += '            <span class="c_99">公司规模：</span>';
                        html += '            <span class="c_33">'+company_scale+'</span>';
                        html += '            <input type="hidden" value="'+scompany_scale+'" />';
                        html += '       </li>';                       
                         if($.trim(company_nature)!=""){
                             html += '<li style="display:block">';
                        }else{
                             html += '<li style="display:none">';
                        }
                        html += '            <span class="c_99">公司性质：</span>';
                        html += '            <span class="c_33">'+company_nature+'</span>';
                        html += '            <input type="hidden" value="'+scompany_nature+'" />';
                        html += '       </li>';

                        if($.trim(company_introduce)!="" && $.trim(company_introduce) !="<br/>"){
                             console.log(company_introduce);
                             html += '<li style="display:block;width:95%!important;">';
                        }else{
                             html += '<li style="display:none;width:95%!important;">';
                        }
                        html += '           <span class="c_99" style="vertical-align: top;">公司简介：</span>';
                        html += '           <span class="c_33" style="display: inline-block;word-wrap: break-word; width: 85%;">'+company_introduce+'</span>';
                        html += '      </li>';
                        html += '        <li>';
                        html += '            <span class="c_99">职位名称：</span>';
                        html += '            <span class="c_33">'+position+'</span>';
                        html += '            <input type="hidden" value="' + position + '" >';
                        html += '       </li>';
                        html += '       <li>';
                        html += '            <span class="c_99">下属人数：</span>';
                        html += '            <span class="c_33">'+ssubordinate+'</span>';
                        html += '             <input type="hidden" value="'+subordinate+'">';
                        html += '       </li>';
                        if($.trim(report_object)!=""){
                             html += '<li style="display:block">';
                        }else{
                             html += '<li style="display:none">';
                        }
                        html += '            <span class="c_99">汇报对象：</span>';
                        html += '            <span class="c_33">'+report_object+'</span>';
                        html += '            <input type="hidden" value="'+report_object+'">';
                        html += '       </li>';                       
                        html += '       <li style="width:95%!important;">';
                        html += '           <span class="c_99" style="vertical-align: top;">工作职责：</span>';
                        html += '           <span class="c_33" style="display: inline-block;word-wrap: break-word; width: 85%;">'+work_duty+'</span>';
                        html += '      </li>';
                        html += '       <li style="width:95%!important;">';
                        html += '           <span class="c_99" style="vertical-align: top;">工作业绩：</span>';
                        html += '           <span class="c_33" style="display: inline-block;word-wrap: break-word; width: 85%;">'+job_performance+'</span>';
                        html += '      </li>';                       
                        if($.trim(leaving_reasons)!=""){
                             html += '<li style="display:block">';
                        }else{
                             html += '<li style="display:none">';
                        }
                        html += '            <span class="c_99">离职原因：</span>';
                        html += '            <span class="c_33">'+leaving_reasons+'</span>';
                        html += '            <input type="hidden" value="'+leaving_reasons+'">';
                        html += '       </li>';
                        html += '   </ul>';
                        html += '   </div>';
                        html += '</div>   ';                         
                        html += ' </div>';
                        html += '</dd>';
                    $("#work_title").after(html);
                    //更新成功后进行设值
                    $("#wsResum_name").text(data.wsres + '%');
                    $("#wsResum_value").val(data.wsres);
                } else {     
                    //var parentObj = $(operationNowObj).parent().parent().parent().prev().children("div");                
                    //parentObj.eq(0).children("input:hidden").val(position);                    
                    //开始结束时间
                    $(operationNowObj).siblings('ul').children('li').eq(0).children("span").eq(1).text(start_time.substr(0, 7).replace("-", "-"));
                    $(operationNowObj).siblings('ul').children('li').eq(1).children("span").eq(1).text(end_time.substr(0, 7).replace("-", "-"));
                    $(operationNowObj).siblings('ul').children('li').eq(1).children("input:hidden").val(start_time + "|" + end_time);
                     $(operationNowObj).siblings('ul').children('li').eq(0).children("input:hidden").val(data.trwID);
                    //设置公司与行业
                    var company_nameAndindustry = company_name + " | " + sindustry;
                    // $(operationNowObj).parent().children("span").text(company_nameAndindustry);
                    $(operationNowObj).siblings('ul').children('li').eq(2).children('span').eq(1).text(company_name);
                    $(operationNowObj).siblings('ul').children('li').eq(3).children("input:hidden").val(industry);
                    $(operationNowObj).siblings('ul').children('li').eq(3).children("span").eq(1).text(sindustry);
                     //设置职位
                    $(operationNowObj).siblings('ul').children('li').eq(7).children('span').eq(1).text(position);
                    //下属人数
                    $(operationNowObj).siblings('ul').children('li').eq(8).children('span').eq(1).text(ssubordinate);
                    $(operationNowObj).siblings('ul').children('li').eq(8).children("input:hidden").val(subordinate);
                    //设置工作职责
                    $(operationNowObj).siblings('ul').children('li').eq(10).children('span').eq(1).html(work_duty);  
                    if($.trim(company_scale)!=""){
                       $(operationNowObj).siblings('ul').children('li').eq(4).css('display', 'block'); 
                    }
                    //公司规模
                    $(operationNowObj).siblings('ul').children('li').eq(4).children("span").eq(1).text(company_scale);
                    if($.trim(company_nature)!=""){
                       $(operationNowObj).siblings('ul').children('li').eq(5).css('display', 'block'); 
                    }
                    //公司性质
                    $(operationNowObj).siblings('ul').children('li').eq(5).children("span").eq(1).text(company_nature);
                    if($.trim(company_introduce)!="" && $.trim(company_introduce)!="<br/>"){
                       $(operationNowObj).siblings('ul').children('li').eq(6).css('display', 'block'); 
                    }
                    //设置工作简介
                    $(operationNowObj).siblings('ul').children('li').eq(6).children('span').eq(1).html(company_introduce);
                    if($.trim(report_object)!=""){
                       $(operationNowObj).siblings('ul').children('li').eq(9).css('display', 'block'); 
                    }
                    //汇报对象
                    $(operationNowObj).siblings('ul').children('li').eq(9).children('span').eq(1).text(report_object);
                    //公司业绩
                    $(operationNowObj).siblings('ul').children('li').eq(11).children('span').eq(1).html(job_performance);
                    if(leaving_reasons !="" || leaving_reasons != undefined){
                        $(operationNowObj).siblings('ul').children('li').eq(12).css('display', 'block'); 
                       //离职原因
                       $(operationNowObj).siblings('ul').children('li').eq(12).children('span').eq(1).text(leaving_reasons);
                    }     
                                
                }
                edit_cancel(obj);
                modulevalue();
            } else {
                window.alert("保存失败",2);
            }
            $(obj).removeClass('load_btn');
        }
    });
}

//教育经历保存
function EducationExperienceSave(obj) {
    if ($(obj).hasClass('load_btn'))
        return false;

    var info_obj = $(obj).parent().parent();
    var treID = $(info_obj).find("input[datatype='eidt_resume_education_id']").val(); //  $("#eidt_resume_work_id").val(); //主键ID
    var uc_name = $(info_obj).find("input[datatype='edit_education_uc_name']").val(); // $("#edit_education_uc_name").val(); //院校名称
    var uc_id = $(info_obj).find("input[datatype='edit_education_uc_id']").val(); // $("#edit_education_uc_id").val(); //院校ID
    var diploma = $(info_obj).find("div[datatype='edit_education_diploma']").attr("data-key"); // $("#edit_education_diploma").attr("data-key"); //学历
    var sdiploma = $(info_obj).find("div[datatype='edit_education_diploma']").attr("data-value");
    var major = $(info_obj).find("input[datatype='edit_education_major']").val(); // $("#edit_education_major").val(); //专业
    var smajor = $(info_obj).find("input[datatype='edit_education_smajor']").val();
    var major_describe = $(info_obj).find("textarea[datatype='edit_education_major_describe']").val().replace(/\n/g, '<br/>'); // ue_edit_education_major_describe.getContent(); //专业描述
    var start_time = $(info_obj).find("input[datatype='edit_education_start_time']").val(); // $("#edit_education_start_time").val(); //开始时间
    var end_time = $(info_obj).find("input[datatype='edit_education_end_time']").val(); // //结束时间
    if ($.trim($("#resumeID").val()) == "") {
        window.alert("请先保存基本信息",4);
        return false;
    }

   if (start_time.length > 12) {
        start_time = start_time.substring(0, start_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
    } else if (start_time.length == 7) {
        start_time += '-01';
    }

    if (end_time.length > 12) {
        end_time = end_time.substring(0, end_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
    } else if (end_time.length == 7) {
        end_time += '-01';
    }
    //    if ($.trim($(major_describe).text()).length == 0 || $.trim($(major_describe).text()).length < 6) {
    //        alert("专业描述不能为空并且不能小于6个字");
    //        return false;
    //    }
    if ($.trim(major_describe).length > 1000) {
        window.alert("专业描述不能超过1000个字",4);
        return false;
    }
    // if ($.trim(uc_id) == "" || $.trim(uc_id) == '0') {
    //     alert("请输入并选择正确的院校");
    //     return false;
    // }
    if ($.trim(major) == ""||$.trim(smajor) == "") {
        window.alert("请输入并选择正确的专业",4);
        return false;
    }
    if ($.trim(diploma) == "" || diploma == "0") {
        window.alert("学历不能为空",4);
        return false;
    }
    if ($.trim(start_time) == "") {
        window.alert("开始时间不能为空",4);
        return false;
    }
    if ($.trim(end_time) == "") {
        window.alert("结束时间不能为空",4);
        return false;
    }

    if (end_time != "至今" && start_time > end_time) {
        window.alert("您输入的起始日期大于结束日期!",4);
        return false;
    }
    
    if (start_time.length > 12) {
        start_time = start_time.substring(0, start_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
    } else if (start_time.length == 7) {
        start_time += '-01';
    }

    if (end_time.length > 12) {
        end_time = end_time.substring(0, end_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
    } else if (end_time.length == 7) {
        end_time += '-01';
    }
    //    if ($.trim($(major_describe).text()).length == 0 || $.trim($(major_describe).text()).length < 6) {
    //        alert("专业描述不能为空并且不能小于6个字");
    //        return false;
    //    }
    if ($.trim(major_describe).length > 1000) {
        window.alert("专业描述不能超过1000个字",4);
        return false;
    }
   if ($.trim(uc_name) == "") {
       window.alert("院校名称不能为空",4);
       return false;
   }
    if ($.trim(major) == "") {
        window.alert("专业不能为空",4);
        return false;
    }
    if ($.trim(diploma) == "" || diploma == "0") {
        window.alert("学历不能为空",4);
        return false;
    }
    if ($.trim(start_time) == "") {
        window.alert("开始时间不能为空",4);
        return false;
    }
    if ($.trim(end_time) == "") {
        window.alert("结束时间不能为空",4);
        return false;
    }

    if (end_time != "至今" && start_time > end_time) {
        window.alert("您输入的起始日期大于结束日期!",4);
        return false;
    }

    // if ($.trim(uc_name) == "") {        
    //     $('#edit_education_uc_name').css('box-shadow', '0px 0px 3px red');
    //     $('#edit_education_uc_name').focus();
    //     return false;
    // }
    // if ($.trim(major) == "") 
    //     alert("专业名称不能为空");
    //     return false;
    // } 
    $(obj).addClass('load_btn');
    // $(".commys").each(function(index, el) {
    //    $(this).val() =="" && $(this).css('box-shadow', '0px 0px 3px red');
    // });   

    $.ajax({
        type: "POST",
        url: "/ajax_editEducation",
        data: {
            "uc_name": uc_name,
            "uc_id": uc_id,
            "diploma": diploma,
            "major": major,
            "major_describe": major_describe,
            "start_time": start_time,
            "end_time": end_time,
            "treID": treID,
            "resumeID": $("#resumeID").val(),
            "type": "edit"
        },
        dataType: "json",
        success: function(data) {
            if (data.treID != "") {
                if (treID == "") {
                  var html = '';
                  html += '<dd style="clear:both;"></dd>';
                  html += '<dd class="jl_content_box clearfix">';
                  html += '<div class="r r_box">';
                  html += '<i class="iconfont icon-time"></i>';
                  html += ' <div><div>';
                  html += ' <div class="edit comm_compile" datatype="jyjlEdit_m" onclick="jyjlEdit(this)">';
                  html += '              <img src="/static/images/icon_05.png">';
                  html += '  </div>';
                  html += '  <ul class="work_exper" id="jy_exper">';
                  html += '      <li>';
                  html += '          <input type="hidden" value="' + data.treID + '" >';
                  html += '          <span class="c_99">开始时间：</span>';
                  html += '          <span class="c_33">' + start_time.substr(0, 7).replace('-', '/') + '</span>';
                  html += '     </li>';
                  html += '     <li>';
                  html += '          <span class="c_99">结束时间：</span>';
                  html += '          <span class="c_33">' + end_time.substr(0, 7).replace('-', '/') + '</span>';
                  html += '           <input type="hidden" value="' + start_time + '|' + end_time + '">';
                  html += '     </li>';
                  html += '      <li>';
                  html += '          <span class="c_99">学院名称：</span>';
                  html += '          <span class="c_33">'+ uc_name +'</span>';
                  html += '          <input type="hidden" value="' + uc_id + '|' + major + '|' + diploma + '">';
                  html += '     </li>';
                  html += '      <li>';
                  html += '          <span class="c_99">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：</span>';
                  html += '          <span class="c_33">'+ sdiploma +'</span>';
                  html += '     </li>';
                  html += '      <li>';
                  html += '          <span class="c_99">专业名称：</span>';
                  html += '          <span class="c_33">'+ smajor +'</span>';
                  html += '     </li>';
                  html += '     <li style="width:95%!important;">';
                  html += '          <span class="c_99" style="vertical-align: top;">专业描述：</span>';
                  html += '          <span class="c_33" style="display:inline-block;word-wrap: break-word;width: 85%;">' + major_describe + '</span>';
                  html += '     </li>';
                  html += '  </ul>';                           
                  html += '</div></div>';
                  html += '</div>';                        
                  html += '</dd>';
                    $("#education_title").after(html);
                    //更新成功后进行设值
                    $("#wsResum_name").text(data.wsres + '%');
                    $("#wsResum_value").val(data.wsres);
                } else {
                    //设置教育经历主键                    
                    var uc_major_diplomaForValue = uc_id + '|' + major + '|' + diploma; //获取学院专业学历值
                    $(operationNowObj).siblings('ul').children('li').eq(0).children("input:hidden").val(data.treID);
                    //设置院校名称
                    $(operationNowObj).siblings('ul').children('li').eq(2).children('span').eq(1).text(uc_name);
                    //设置学历
                    $(operationNowObj).siblings('ul').children('li').eq(3).children('span').eq(1).text($("#edit_education_diploma").attr("data-value"));
                    //设置专业
                    $(operationNowObj).siblings('ul').children('li').eq(4).children('span').eq(1).text($("#edit_education_smajor").val());
                    $(operationNowObj).siblings('ul').children('li').eq(2).children("input:hidden").val(uc_major_diplomaForValue);
                    //设置专业描述
                    $(operationNowObj).siblings('ul').children('li').eq(5).children('span').eq(1).html(major_describe);
                    //开始结束时间                    
                    $(operationNowObj).siblings('ul').children('li').eq(0).children("span").eq(1).text(start_time.substr(0, 7).replace("-", "-"));
                    $(operationNowObj).siblings('ul').children('li').eq(1).children("span").eq(1).text(end_time.substr(0, 7).replace("-", "-"));
                    $(operationNowObj).siblings('ul').children('li').eq(1).children("input:hidden").val(start_time + "|" + end_time);
                }
                modulevalue();
                edit_cancel(obj);
            } else {
                window.alert("保存失败",2);
            }
            $(obj).removeClass('load_btn');
        }
    });
}

//项目经历保存
function ItemExperienceSave(obj) {
        if ($(obj).hasClass('load_btn'))
            return false;
        var info_obj = $(obj).parent().parent();
        var triID = $(info_obj).find("input[datatype='eidt_resume_item_id']").val(); //$("#eidt_resume_item_id").val(); //主键ID
        var company_id = $(info_obj).find("input[datatype='edit_item_company_id']").val(); //$("#edit_item_company_id").val(); //公司名称
        var item_name = $(info_obj).find("input[datatype='edit_item_name']").val(); //$("#edit_item_name").val(); //项目名称
        var job = $(info_obj).find("input[datatype='edit_item_job']").val(); //$("#edit_item_job").val(); //项目职位
        var duty = $(info_obj).find("textarea[datatype='edit_item_duty']").val().replace(/\n/g, '<br/>'); //ue_edit_item_duty.getContent(); //项目职责
        var item_describe = $(info_obj).find("textarea[datatype='edit_item_describe']").val().replace(/\n/g, '<br/>'); //ue_edit_item_describe.getContent(); //项目描述
        var start_time = $(info_obj).find("input[datatype='edit_item_start_time']").val(); //$("#edit_item_start_time").val(); //项目开始时间
        if (start_time.length > 12) {
            start_time = start_time.substring(0, start_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
        } else if (start_time.length == 7) {
            start_time += '-01';
        }
        var end_time = $(info_obj).find("input[datatype='edit_item_end_time']").val(); //$("#edit_item_end_time").val(); //项目结束时间
        if (end_time.length > 12) {
            end_time = end_time.substring(0, end_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
        } else if (end_time.length == 7) {
            end_time += '-01';
        }
        if ($.trim($("#resumeID").val()) == "") {
            window.alert("请先保存基本信息",4);
            return false;
        }

        if ($.trim(duty).length == 0 || $.trim(duty).length < 6) {
            window.alert("项目职责不能为空并且不能小于6个字",4);
            return false;
        }
        if ($.trim(duty).length > 1000) {
            window.alert("项目职责不能超过1000个字",4);
            return false;
        }

        if ($.trim(item_describe).length == 0 || $.trim(item_describe).length < 6) {
            window.alert("项目描述不能为空并且不能小于6个字",4);
            return false;
        }
        if ($.trim(item_describe).length > 1000) {
            window.alert("项目描述不能超过1000个字",4);
            return false;
        }

        if ($.trim(company_id) == "") {
            window.alert("公司名称不能为空");
            return false;
        }
        if ($.trim(company_id).length > 50) {
            window.alert("公司名称不能超过50个字",4);
            return false;
        }
        if ($.trim(item_name) == "") {
            window.alert("项目名称不能为空",4);
            return false;
        }
        if ($.trim(item_name).length > 20) {
            window.alert("项目名称不能超过20个字",4);
            return false;
        }
        if ($.trim(start_time) == "") {
            window.alert("项目开始时间不能为空",4);
            return false;
        }
        if ($.trim(end_time) == "") {
            window.alert("项目结束时间不能为空",4);
            return false;
        }

        if (end_time != "至今" && start_time > end_time) {
            window.alert("您输入的起始日期大于结束日期!",4);
            return false;
        }

        // if ($.trim(job) == "") {
        //     alert("项目职务不能为空");
        //     return false;
        // }
        if ($.trim(duty) == "") {
            window.alert("项目职责不能为空",4);
            return false;
        }
        $(obj).addClass('load_btn');

        $.ajax({
            type: "POST",
            url: "/ajax_editItem",
            data: {
                "company_id": company_id,
                "item_name": item_name,
                "job": job,
                "duty": duty,
                "item_describe": item_describe,
                "start_time": start_time,
                "end_time": end_time,
                "triID": triID,
                "resumeID": $("#resumeID").val(),
                "type": "edit"
            },
            dataType: "json",
            success: function(data) {
                if (data.triID != "") {
                    if (triID == "") {
                        var html = "";
                            html += '<dd style="clear:both;"></dd>';
                            html += '<dd class="jl_content_box clearfix">';                 
                            html += '   <div class="r r_box">';
                            html += '   <i class="iconfont icon-time"></i>';
                            html += '   <div><div>';
                            html += '    <div class="edit comm_compile" datatype="xmjlEdit_m" onclick="xmjlEdit(this)">';
                            html += ' <img src="/static/images/icon_05.png">';
                            html += '    </div>';
                            html += '    <ul class="work_exper" id="project_exper">';
                            html += '       <li>';
                            html += '            <span class="c_99">开始时间：</span>';
                            html += '            <span class="c_33">' + start_time.substr(0, 7).replace('-', '/') + '</span>';
                            html += '            <input type="hidden" value="' + data.triID + '" >';
                            html += '      </li>';
                            html += '      <li>';
                            html += '           <span class="c_99">结束时间：</span>';
                            html += '           <span class="c_33">' + end_time.substr(0, 7).replace('-', '/') + '</span>';
                            html += '           <input type="hidden" value="' + start_time + '|' + end_time + '">';
                            html += '      </li>';
                            html += '      <li>';
                            html += '          <span class="c_99">公司名称：</span>';
                            html += '          <span class="c_33">' + company_id + '</span>';
                            html += '     </li>';
                            html += '     <li>';
                            html += '          <span class="c_99">项目名称：</span>';
                            html += '         <span class="c_33">' + item_name + '</span>';
                            html += '     </li>';
                            html += '      <li>';
                            html += '          <span class="c_99">项目职务：</span>';
                            html += '          <span class="c_33">' + job + '</span>';
                            html += '     </li>';
                            html += '     <li style="width:95%!important;">';
                            html += '          <span class="c_99" style="vertical-align: top;">项目职责：</span>';
                            html += '          <span class="c_33" style="display: inline-block;word-wrap: break-word; width: 85%;">' + duty + '</span>';
                            html += '     </li>';
                            html += '     <li style="width:95%!important;">';
                            html += '          <span class="c_99" style="vertical-align: top;">项目描述：</span>';
                            html += '          <span class="c_33" style="display: inline-block;word-wrap: break-word; width: 85%;">' + item_describe + '</span>';
                            html += '     </li>';
                            html += '  </ul> ';
                            html += '</div></div>';                   
                            html += '</div>';
                            html += '</dd>';


                        $("#item_title").after(html);
                        //更新成功后进行设值
                        $("#wsResum_name").text(data.wsres + '%');
                        $("#wsResum_value").val(data.wsres);
                    } else {
                        $(operationNowObj).siblings('ul').children('li').eq(0).children("input:hidden").val(data.triID);
                        //设置公司
                        $(operationNowObj).siblings('ul').children('li').eq(2).children('span').eq(1).text(company_id);
                        //设置项目名称
                        $(operationNowObj).siblings('ul').children('li').eq(3).children('span').eq(1).text(item_name);
                        //设置项目职务
                        $(operationNowObj).siblings('ul').children('li').eq(4).children('span').eq(1).text(job);
                        //设置项目职责
                        $(operationNowObj).siblings('ul').children('li').eq(5).children('span').eq(1).html(duty);

                        //设置项目描述
                        $(operationNowObj).siblings('ul').children('li').eq(6).children('span').eq(1).html(item_describe);
                        //设置项目时间
                        // var parentObj = $(operationNowObj).parent().parent().parent().prev().children("div");
                       
                        $(operationNowObj).siblings('ul').children('li').eq(0).children("span").eq(1).text(start_time.substr(0, 7).replace("-", "-"));
                        $(operationNowObj).siblings('ul').children('li').eq(1).children("span").eq(1).text(end_time.substr(0, 7).replace("-", "-"));
                        $(operationNowObj).siblings('ul').children('li').eq(1).children("input:hidden").val(start_time + "|" + end_time);                        
                    }
                    modulevalue();
                    edit_cancel(obj);
                } else {
                    alert("保存失败");
                }
                $(obj).removeClass('load_btn');
            }
        });
    }
    //培训经历保存
function TrainingExperienceSave(obj) {
        if ($(obj).hasClass('load_btn'))
            return false;
        var info_obj = $(obj).parent().parent();
        var trtID = $(info_obj).find("input[datatype='eidt_training_id']").val(); //$("#eidt_training_id").val(); //主键ID
        var institution = $(info_obj).find("input[datatype='edit_training_institution']").val(); //$("#edit_training_institution").val(); //培训机构
        var area = $(info_obj).find("input[datatype='edit_training_area']").val(); //$("#edit_training_area").val(); //培训地点
        var course = $(info_obj).find("input[datatype='edit_training_course']").val(); //$("#edit_training_course").val(); //培训课程
        var certificate = $(info_obj).find("input[datatype='edit_training_certificate']").val(); //$("#edit_training_certificate").val(); //获得证书
        var training_describe = $(info_obj).find("textarea[datatype='edit_training_describe']").val().replace(/\n/g, '<br/>'); //ue_edit_training_describe.getContent(); //培训描述
        var start_time = $(info_obj).find("input[datatype='edit_training_start_time']").val(); //$("#edit_training_start_time").val(); //开始时间
        if (start_time.length > 12) {
            start_time = start_time.substring(0, start_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
        } else if (start_time.length == 7) {
            start_time += '-01';
        }
        var end_time = $(info_obj).find("input[datatype='edit_training_end_time']").val(); //$("#edit_training_end_time").val(); //结束时间
        if (end_time.length > 12) {
            end_time = end_time.substring(0, end_time.indexOf(" ")).replace("年", "-").replace("月", "-").replace("日", "");
        } else if (end_time.length == 7) {
            end_time += '-01';
        }

        if ($.trim($("#resumeID").val()) == "") {
            window.alert("请先保存基本信息",4);
            return false;
        }

        // if ($.trim(institution) == "") {
        //     alert("培训机构不能为空");
        //     return false;
        // }
        // if ($.trim(area) == "") {
        //     alert("培训地点不能为空");
        //     return false;
        // }
        // if ($.trim(course) == "") {
        //     alert("培训课程不能为空");
        //     return false;
        // }
        //    if ($.trim($(training_describe).text()).length == 0 || $.trim($(training_describe).text()).length < 6) {
        //        alert("培训描述不能为空并且不能小于6个字");
        //        return false;
        //    }
        // if ($.trim($($.parseHTML(training_describe)).text()).length > 1000) {
        //     alert("培训描述不能超过1000个字");
        //     return false;
        // }
        // if ($.trim(start_time) == "") {
        //     start_time='';
        // }
        console.log($.trim(start_time));
        if ($.trim(end_time) != "" && $.trim(start_time) =="") {
            window.alert("起始时间不能为空",4);
            return false;
        }
        if($.trim(certificate) == "" && $.trim(course) == "" ){
              window.alert("培训课程和获得证书 需要至少填写1项",4);
               return false;
        }
        if (end_time != "至今" && start_time > end_time) {
            window.alert("您输入的起始日期大于结束日期!",4);
            return false;
        }
        $(obj).addClass('load_btn');
        $.ajax({
            type: "POST",
            url: "/ajax_editTraining",
            data: {
                "institution": institution,
                "area": area,
                "course": course,
                "certificate": certificate,
                "training_describe": training_describe,
                "start_time": start_time,
                "end_time": end_time,
                "trtID": trtID,
                "resumeID": $("#resumeID").val(),
                "type": "edit"
            },
            dataType: "json",
            success: function(data) {
                if (data.trtID != "") {
                    // $.trim(certificate) !="" && (certificate = " | "+certificate); 
                    if (trtID == "") {                        
                        var html = "";
                            html += '<dd style="clear:both;"></dd>';
                            html += '<dd class="jl_content_box clearfix">';                           
                            html += '<div class="r r_box">';
                            html += ' <i class="iconfont icon-time"></i>';
                            html += '<div><div>';
                            html += '<div class="edit comm_compile" datatype="pxjlEdit_m" onclick="pxjlEdit(this)">';
                            html += '<img src="/static/images/icon_05.png">';
                            html += '</div>';
                            html += ' <ul class="work_exper" id="train_exper">';
                            html += '    <li>';
                            html += '        <span class="c_99">开始时间：</span>';
                            html += '        <span class="c_33">' + start_time.substr(0, 7).replace('-', '/') + '</span>';
                            html += '        <input type="hidden" value="' + data.trtID + '" >';
                            html += '  </li>';
                            html += '  <li>';
                            html += '       <span class="c_99">结束时间：</span>';                            
                            html += '       <span class="c_33">' + end_time.substr(0, 7).replace('-', '/') + '</span>';
                            html += '       <input type="hidden" value="' + start_time + '|' + end_time + '">';
                            html += '  </li>';
                            html += '   <li>';
                            html += '       <span class="c_99">培训机构：</span>';
                            html += '       <span class="c_33">'+ institution +'</span>';
                            html += '  </li>';
                            html += '   <li>';
                            html += '       <span class="c_99">培训地点：</span>';
                            html += '       <span class="c_33">' + area + '</span>';
                            html += '  </li>';
                            html += '  <li>';
                            html += '       <span class="c_99">培训课程：</span>';
                            html += '       <span class="c_33">' + course + '</span>';
                            html += '  </li>';
                            html += '   <li>';
                            html += '       <span class="c_99">获取证书：</span>';
                            html += '       <span class="c_33">'+ certificate +'</span>';
                            html += '  </li>';                               
                            html += '  <li style="width:95%!important;">';
                            html += '       <span class="c_99" style="vertical-align: top;">培训描述：</span>';
                            html += '       <span class="c_33" style="display: inline-block;word-wrap: break-word; width: 85%;">' + training_describe + '</span>';
                            html += '  </li>';
                            html += '</ul>';
                            html += '</div></div>';
                            html += '</div>';
                            html += '</dd>';
                        $("#training_title").after(html);
                        //更新成功后进行设值
                        $("#wsResum_name").text(data.wsres + '%');
                        $("#wsResum_value").val(data.wsres);
                    } else {            
                        $(operationNowObj).siblings('ul').children('li').eq(0).children('input:hidden').val(data.trtID);
                        //设置培训机构和证书
                        $(operationNowObj).siblings('ul').children('li').eq(2).children('span').eq(1).text(institution);
                        $(operationNowObj).siblings('ul').children('li').eq(5).children('span').eq(1).text(certificate);
                        //设置培训地点
                        $(operationNowObj).siblings('ul').children('li').eq(3).children('span').eq(1).text(area);
                        //设置培训课程
                        $(operationNowObj).siblings('ul').children('li').eq(4).children('span').eq(1).text(course);
                        //设置培训时间
                        // var parentObj = $(operationNowObj).parent().parent().parent().prev().children("div");
                        $(operationNowObj).siblings('ul').children('li').eq(0).children("span").eq(1).text(start_time.substr(0, 7).replace("-", "-"));
                        $(operationNowObj).siblings('ul').children('li').eq(1).children("span").eq(1).text(end_time.substr(0, 7).replace("-", "-"));
                        $(operationNowObj).siblings('ul').children('li').eq(1).children("input:hidden").val(start_time + "|" + end_time);
                        //设置课程描述
                        $(operationNowObj).siblings('ul').children('li').eq(6).children('span').eq(1).html(training_describe);
                    }
                    modulevalue();
                    edit_cancel(obj);
                } else {
                    window.alert("保存失败",2);
                }
                $(obj).removeClass('load_btn');
            }
        });
    }
    //个人技能
function SkillSave(obj) {
        if ($(obj).hasClass('load_btn'))
            return false;
        var info_obj = $(obj).parent().parent();
        var trsID = $(info_obj).find("input[datatype='eidt_skill_id']").val(); //$("#eidt_skill_id").val(); //主键ID
        var skill_name = $(info_obj).find("input[datatype='edit_skill_name']").val(); //$("#edit_skill_name").val(); //技能名称
        var level_attained = $(info_obj).find("div[datatype='edit_skill_level_attained']").attr("data-key"); //$("#edit_skill_level_attained").attr("data-key"); //掌握程度
        var slevel_attained = $(info_obj).find("div[datatype='edit_skill_level_attained']").attr("data-value");
        var level_value = $(info_obj).find("div[datatype='edit_skill_level_attained']").attr("data-name");


        if ($.trim($("#resumeID").val()) == "") {
            window.alert("请先保存基本信息",4);
            return false;
        }

        if ($.trim(skill_name) == "") {
            window.alert("请输入技能名称",4);
            return false;
        } else if (skill_name.length > 100) {
            window.alert("您输入的技能名称不能超过100个字符",4);
            $(":input[name=skill_name]").val("");
            return false;
        }
        if (level_attained == 0) {
            window.alert("请选择技能掌握程度",4);
            return false;
        }
        $(obj).addClass('load_btn');
        $.ajax({
            type: "POST",
            url: "/ajax_editSkill",
            data: {
                "skill_name": skill_name,
                "level_attained": level_attained,
                "trsID": trsID,
                "resumeID": $("#resumeID").val(),
                "type": "edit"
            },
            dataType: "json",
            success: function(data) {
                if (data.trsID != "") {
                    if (trsID == "") {
                        var html = "";                     
                        html += '<div class="clearfix">';
                        html += '    <div style="display:inline-block;float:left; color:#888;">技能名称:&nbsp;&nbsp;</div><div class="f_l w1">' + skill_name + '</div>';
                        html += '       <div class="f_l w2">';
                        html += '            <div class="jl_jdt">';
                        html += '               <span style="width:' + level_value + '%"></span>';
                        html += '                <input type="hidden" value="' + level_value + '">';
                        html += '                <input type="hidden" value="' + level_attained + '">';
                        html += '            </div>';
                        html += '        </div>';
                        html += '       <div class="f_l w3">' + slevel_attained + '</div>';
                        html += '       <div class="edit" datatype="grjlEdit_m" onclick="grjlEdit(this)" >';
                        html += '           <i class="edit_icon"></i>';
                        html += '        </div>';
                        html += '        <input type="hidden" value="' + data.trsID + '">';
                        html += '</div>';
                        $("#skill_title").after(html);
                        //更新成功后进行设值
                        $("#wsResum_name").text(data.wsres + '%');
                        $("#wsResum_value").val(data.wsres);
                    } else {
                        $(operationNowObj).next().val(data.trsID);
                        $(operationNowObj).prev().prev().prev().text(skill_name);
                        $(operationNowObj).prev().prev().find("span").css({
                            "width": level_value + "%"
                        });
                        $(operationNowObj).prev().prev().find("input:hidden").eq(0).val(level_value);
                        $(operationNowObj).prev().prev().find("input:hidden").eq(1).val(level_attained);
                        $(operationNowObj).prev().text(slevel_attained);
                    }
                    modulevalue();
                    edit_cancel(obj);
                } else {
                    window.alert("保存失败",2);
                }
                $(obj).removeClass('load_btn');
            }
        });
    }
    //个人标签
function LabelsSave(obj) {
        if ($(obj).hasClass('load_btn'))
            removeClass('load_btn');
        var labels = "";
        $("#jlTagList li").each(function() {
            if (labels == "") {
                labels = $(this).text();
            } else {
                labels += "**" + $(this).text();
            }
        });
        $(obj).addClass('load_btn');
        $.ajax({
            type: "POST",
            url: "/ajax_labels",
            data: {
                "labels": labels,
                "resume_id": $("#resumeID").val()
            },
            dataType: "json",
            success: function(data) {
                if (data.msg == "success") {
                    $("#jlTagListShow").empty();

                    $("#jlTagList li").each(function() {
                        $("#jlTagListShow").append("<li>" + $(this).text() + "</li>");
                    });
                    modulevalue();
                    edit_cancel(obj);
                } else {
                    window.alert("保存失败",2);
                }
                $(obj).removeClass('load_btn');
            }

        });
    }
    //顾问评价
function EvaluationSave(obj) {
    if ($(obj).hasClass('load_btn'))
        return false;

    if ($.trim($("#resumeID").val()) == "") {
        window.alert("请先保存基本信息",4);
        return false;
    }

    $(obj).addClass('load_btn');
    $.ajax({
        type: "POST",
        url: "/ajax_updateEvaluation",
        data: {
            "resumeID": $("#resumeID").val(),
            "evaluation": $("#edit_evaluation").val().replace(/\n/g, '<br/>')
        },
        dataType: "json",
        success: function(data) {
            if (data.msg == "success") {
                $("#edit_evaluation_show").html($("#edit_evaluation").val().replace(/\n/g, '<br/>'));
                edit_cancel(obj);
                modulevalue();
            } else {
                window.alert("保存失败",2);
            }
            $(obj).removeClass('load_btn');
        }
    });
}



//自我评价保存
function selfIntroduceSave(obj) {
    var self_introduce = $.trim($("#edit_zwpj").val().replace(/\n/g, '<br/>'));

    if (self_introduce == '') {
        window.alert("请输入自我评价内容再进行保存!",4);
        return false;
    }
    if ($.trim(self_introduce).length > 1000) {
        window.alert("自我评价内容不能超过1000个字!",4);
        return false;
    }
    $(obj).addClass('load_btn');

    $.ajax({
        type: 'post',
        url: "/ajax_updateSelfIntroduce",
        data: {
            "resumeID": $("#resumeID").val(),
            "self_introduce": self_introduce
        },
        dataType: 'json',
        success: function(data) {
            if (data == 1) {
                $("#edit_zwpj_show").html(self_introduce);
                edit_cancel(obj);
                modulevalue();
            } else {
                window.alert("保存失败!",2);
            }
            $(obj).removeClass('load_btn');
        }
    })

}

// 自我评价编辑按钮
function selfIntroducejEdit(obj) {
    operationNowObj = obj; //设置当前操作对象
    $(obj).parent().next().hide().siblings('.h').show();
    $(obj).parent().parent().children('.h').show();
    $("#edit_zwpj").val($("#edit_zwpj_show").html().replace(/<br>/g, "\n"));
}

//隐私设置
function filterSave(obj) {
    if ($(obj).hasClass('load_btn'))
        return false;
    var type = $("#edit_filter_type").val();
    var filter = "";
    if (type == "1") {
        $("#edit_filter_tpc li").each(function() {
            if (filter == "") {
                filter = $(this).attr("data-id");
            } else {
                filter += "," + $(this).attr("data-id");
            }
        });
    } else {
        $("#edit_filter_tpu li").each(function() {
            if (filter == "") {
                filter = $(this).attr("data-id");
            } else {
                filter += "," + $(this).attr("data-id");
            }
        });
    }
    $(obj).addClass('load_btn');
    $.ajax({
        type: "POST",
        url: "/ajax_updateResumeFilter",
        data: {
            "resumeID": $("#resumeID").val(),
            "filter": filter,
            "type": type
        },
        dataType: "json",
        success: function(data) {
            if (data.msg == "success") {
                if (type == "1") {
                    $("#filter_tpc").empty();
                    $("#edit_filter_tpc li").each(function() {
                        $("#filter_tpc").append('<li data-id="' + $(this).attr("data-id") + '">' + $(this).text() + '</li>');
                    })
                } else {
                    $("#filter_tpu").empty();
                    $("#edit_filter_tpu li").each(function() {
                        $("#filter_tpu").append('<li data-id="' + $(this).attr("data-id") + '">' + $(this).text() + '</li>');
                    })
                }

                edit_cancel(obj);
                modulevalue();
            } else {
                window.alert("保存失败",2);
            }
            $(obj).removeClass('load_btn');
        }
    });
}


// 选择个人标签
$(document).on('click', '#jlTagList li', function() {

    // $("#jlTag").append("<li data-id='"+$(this).attr('data-id')+"'>"+$(this).text()+"</li>");
    $(this).remove();
})
var timer;
$(document).on('click', '#jlTag li', function() {
    var _this = $(this);
    var x = true;
    if ($("#jlTagList li").length < 8) {
        $("#jlTagList li").each(function(index, el) {
            if ($(this).text() == _this.text())
                x = false;
        });
        if (x == true) {
            $("#jlTagList").append("<li data-id='" + $(this).attr('data-id') + "'>" + $(this).text() + "<i class='iconfont icon-cha'></i></li>");
            $(this).remove();
        } else {
            window.alert("已存在相同标签~",4);
        }
    } else {
        clearTimeout(timer);
        $(".alert.f_r").show();
        window.alert("最多添加8个个性标签~",4);
        timer = setTimeout(function() {
            $(".alert.f_r").hide()
        }, 2000);
    }
})

function tieshang(obj) {
        var x = true;
        var val = $(obj).prev().val();
        if ($.trim(val) != "") {
            if ($("#jlTagList li").length < 8) {
                $("#jlTagList li").each(function(index, el) {
                    if ($(this).text() == val)
                        x = false;
                });
                if (x == true) {
                    $("#jlTagList").append('<li></li>');
                    $("#jlTagList li:last").text(val);
                    $("#jlTagList li:last").append('<i class="iconfont icon-cha"></i>')

                    $(this).prev().val('');
                } else {
                    window.alert("已存在相同标签~",4);
                }
            } else {
                window.alert("最多添加8个个性标签~",4);
            }
        } else {
            window.alert("不能添加空标签",4);
        }
    }
    // 选择个人标签
    // 个人隐私
$(".tag_h input[type='radio']").click(function() {
    if ($(this).val() == "2") {
        $(this).parent().next('.ysSet_box').show();
    } else {
        $(this).parent().next().next('.ysSet_box').hide();
    }
})

$("#lt_save_btn").click(function() {
    var val = $(this).prev().val();
    var ul = $(this).parent().prev();
    var length = ul.children('li').length;
    if (val != "" && length < 12) {
        ul.append('<li>' + val + '<i class="iconfont icon-cha"></i></li>');
        $(this).prev().val('');
    }
})
$(document).on('click', '.ysSet_box i', function() {
    $(this).parent().remove();
})

//编辑模块取消方法
function edit_cancel(obj) {
        var class_type = $(obj).parent().parent().attr("class");

        if (class_type == "edit_h") {
            $(obj).parent().parent().remove();
        } else {
            $(obj).parent().parent().parent().children().show();
            $(obj).parent().parent().hide();
        }
        $("body").animate({scrollTop:nowedit.offset().top-20}, 150);
    }
    //自动查找院校
function setAutoComplete_uc() {
        $.ajax({
            type: "POST",
            url: "/getAjaxTUcInfo",
            dataType: "json",
            success: function(data) {
                $("#edit_education_uc_name").keyup(function() {
                        $("#edit_education_uc_id").val('');
                        $("#edit_education_uc_name").AutoComplete({
                            'data': data,
                            'itemHeight': 20,
                            'width': 'auto',
                            'afterSelectedHandler': function(data) {
                                $("#edit_education_uc_name").next().val(data.label);
                                uc_select.name = data.value;
                                uc_select.id = data.label;
                            },
                            'listStyle': 'custom',
                            'emphasis': false,
                            'createItemHandler': function(index, data) {
                                return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                            }
                        }).AutoComplete('show');
                    })
                    //判断是否是转化简历
                if ($('#is_import').val() != '') {
                    $("input[datatype='edit_education_uc_name']").each(function() {
                        var this_ = $(this);
                        this_.AutoComplete({
                            'data': data,
                            'itemHeight': 20,
                            'width': 'auto',
                            'afterSelectedHandler': function(data) {
                                this_.next().val(data.label);
                                uc_select.name = data.value;
                                uc_select.id = data.label;
                            },
                            'listStyle': 'custom',
                            'emphasis': false,
                            'createItemHandler': function(index, data) {
                                return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                            }
                        }).AutoComplete('show');
                    })
                }
            }
        });
    }
//自动查找企业
function setAutoComplete_major() {
        $.ajax({
            type: "POST",
            url: "/ajax_getAjaxAllMajorDictionary",
            dataType: "json",
            success: function(data) {
                $("#edit_education_smajor").keyup(function() {
                        $("#edit_education_major").val('');
                        $("#edit_education_smajor").AutoComplete({
                            'data': data,
                            'itemHeight': 20,
                            'width': 'auto',
                            'afterSelectedHandler': function(data) {
                                $("#edit_education_smajor").next().val(data.label);
                                uc_select.name = data.value;
                                uc_select.id = data.label;
                            },
                            'listStyle': 'custom',
                            'emphasis': false,
                            'createItemHandler': function(index, data) {
                                return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                            }
                        }).AutoComplete('show');
                    })
                    //判断是否是转化简历
                if ($('#is_import').val() != '') {
                    $("input[datatype='edit_education_smajor']").each(function() {
                        var this_ = $(this);
                        this_.AutoComplete({
                            'data': data,
                            'itemHeight': 20,
                            'width': 'auto',
                            'afterSelectedHandler': function(data) {
                                this_.next().val(data.label);
                                uc_select.name = data.value;
                                uc_select.id = data.label;
                            },
                            'listStyle': 'custom',
                            'emphasis': false,
                            'createItemHandler': function(index, data) {
                                return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                            }
                        }).AutoComplete('show');
                    })
                }
            }
        });
    }
    //自动查找企业
function setAutoComplete_company() {
        $.ajax({
            type: "POST",
            url: "/jobs/resume/ajax_getAllCompanyInfo",
            dataType: "json",
            success: function(data) {
                $("#search_filter_tpc").AutoComplete({
                    'data': data,
                    'itemHeight': 20,
                    'width': 'auto',
                    'afterSelectedHandler': function(data) {
                        $("#search_filter_tpc").next().val(data.label);
                    },
                    'listStyle': 'custom',
                    'emphasis': false,
                    'createItemHandler': function(index, data) {
                        return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                    }

                }).AutoComplete('show');
            }
        });
    }
    //自动查找猎头
function setAutoComplete_hadhunt() {
        $.ajax({
            type: "POST",
            url: "/jobs/resume/getAllPuInfo",
            dataType: "json",
            data: {
                account_type: "3,5"
            },
            success: function(data) {
                $("#search_filter_tpu").AutoComplete({
                    'data': data,
                    'itemHeight': 20,
                    'width': 'auto',
                    'afterSelectedHandler': function(data) {
                        $("#search_filter_tpu").next().val(data.label);
                    },
                    'listStyle': 'custom',
                    'emphasis': false,
                    'createItemHandler': function(index, data) {
                        return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                    }

                }).AutoComplete('show');
            }
        });
    }
    // 工作经历编辑
function gzjlEdit(obj) {
        $('.ascertain').removeClass('load_btn');
        operationNowObj = obj; //设置当前操作对象
        $(obj).parent().parent().parent().parent().parent().children().hide().eq(0).show();
        $(obj).parent().parent().parent().parent().parent().children('.h').show();
        $(obj).parent().parent().parent().parent().parent().find('.jl_delete').show();   
        $('body').animate({scrollTop:$("#work_title").offset().top+"px"});
        //设置要编辑的值        
        $("#eidt_resume_work_id").val($(obj).siblings('ul').children('li').eq(0).children("input:hidden").val()); //工作经历主键
        var company_nameAndindustry = $(obj).parent().children("span").text(); //获取公司与行业的源数据        
        //设置公司名称        
        var company_name = $(obj).siblings('ul').children('li').eq(2).children('span').eq(1).text();
        $("#edit_work_company_name").val(company_name); //公司名称
        //设置所属行业        
        var sindustry = $.trim($(obj).siblings('ul').children('li').eq(3).children('span').eq(1).text());
        //此对象有未获取值待考证
        var industry = $(obj).siblings('ul').children('li').eq(3).children("input:hidden").val();
        $("#edit_work_industry").val(industry);
        //设置职位
        var position = $(obj).siblings('ul').children('li').eq(7).children('span').eq(1).text();
        BusinessulControls("edit_work_sindustry", sindustry, industry, 'width:274px');
//        PositionControls("edit_work_sposition", sposition, position, 'width:274px');
        $("#edit_work_position").val(position);

        //设置下属人数        
        var ssubordinate = $(obj).siblings('ul').children('li').eq(8).children('span').eq(1).text();
        var subordinate = $(obj).siblings('ul').children('li').eq(8).children("input:hidden").val();
        $("#edit_work_subordinate").attr({
            "data-key": subordinate,
            "data-value": ssubordinate
        });
        $("#edit_work_subordinate").children("span").text(ssubordinate);
        $("#edit_work_subordinate").children("span").append("<i class=\"iconfont icon-xia1\"></i>");
        //设置工作时间        
        var time = $(obj).siblings('ul').children('li').eq(1).children("input:hidden").val(); //获取时间
        var start_time = time.split('|')[0];
        var end_time = time.split('|')[1];
        $("#edit_work_start_time").val(strForDate(start_time));
        if (end_time == "None" || end_time == "至今") {
            $("#edit_work_end_time").val("至今").attr('disabled', 'disabled').css({
                "background-color": "#ddd"
            });
            //至今控件属性
            $("#edit_work_end_time").parent().prev().children("span[class='to_now_control']").text("选择时间").attr("data-disabled", "yes");
        } else {
            $("#edit_work_end_time").val(strForDate(end_time));
        }

        //设置工作职责
        $("#edit_work_duty").val($(obj).siblings('ul').children('li').eq(10).children('span').eq(1).html().replace(/<br>/g, "\n"));
 
        //公司规模    
        var company_scale = $(obj).siblings('ul').children('li').eq(4).children('span').eq(1).text();
        var company_scalehid = $(obj).siblings('ul').children('li').eq(4).children("input:hidden").val();
        $("#edit_company_size").attr({
            "data-key": company_scalehid,
            "data-value": company_scale
        });
        $("#edit_company_size").children("span").text(company_scale);
        $("#edit_company_size").children("span").append("<i class=\"iconfont icon-xia1\"></i>");
        
        //公司性质      
        var company_nature = $(obj).siblings('ul').children('li').eq(5).children('span').eq(1).text();
        var company_naturehid = $(obj).siblings('ul').children('li').eq(5).children("input:hidden").val();
        $("#edit_company_nature").attr({
            "data-key": company_naturehid,
            "data-value": company_nature
        });
        $("#edit_company_nature").children("span").text(company_nature);
        $("#edit_company_nature").children("span").append("<i class=\"iconfont icon-xia1\"></i>");

         //公司简介
        $("#edit_company_profile").val($(obj).siblings('ul').children('li').eq(6).children('span').eq(1).html().replace(/<br>/g, "\n"));
        //工作业绩
        $("#edit_perfor_duty").val($(obj).siblings('ul').children('li').eq(11).children('span').eq(1).html().replace(/<br>/g, "\n"));
        //工作汇报
        $('#edit_report_object').val($(obj).siblings('ul').children('li').eq(9).children('span').eq(1).text());
        //设置离职原因
        var leaving_reasons = $(obj).siblings('ul').children('li').eq(12).children('span').eq(1).text();
        if(leaving_reasons.trim() !="个人原因" && leaving_reasons.trim() !="不适合公司文化" && leaving_reasons.trim() !="与期望薪资不符"){
            $('.describe').val(leaving_reasons);
        }
        else{
            $('.departure p').text(leaving_reasons);
            $('.describe').css('display', 'none');
        }
    }
    // 教育经历编辑
function jyjlEdit(obj) {
        operationNowObj = obj; //设置当前操作对象
        $(obj).parent().parent().parent().parent().parent().children().hide().eq(0).show();
        $(obj).parent().parent().parent().parent().parent().children('.h').show();
        $(obj).parent().parent().parent().parent().parent().find('.jl_delete').show();
       // alert($(obj).siblings('ul').children('li').eq(0).children("input:hidden").val());
        //设置要编辑的值
        $("#eidt_resume_education_id").val($(obj).siblings('ul').children('li').children("input:hidden").val()); //教育经历主键       
        var uc_major_diplomaForName = $(obj).parent().children("span").text(); //获取学院专业学历名称
        var uc_major_diplomaForValue = $(obj).siblings('ul').children('li').eq(2).children("input:hidden").val(); //获取学院专业学历值
        //设置院校
        $("#edit_education_uc_name").val($(obj).siblings('ul').children('li').eq(2).children('span').eq(1).text());
        $("#edit_education_uc_id").val(uc_major_diplomaForValue.split('|')[0]);
        //设置专业
        $("#edit_education_smajor").val($(obj).siblings('ul').children('li').eq(4).children('span').eq(1).text());
        $("#edit_education_major").val(uc_major_diplomaForValue.split('|')[1]);
        //设置学历
        $("#edit_education_diploma").attr({
            "data-key": uc_major_diplomaForValue.split('|')[2],
            "data-value": $(obj).siblings('ul').children('li').eq(3).children('span').eq(1).text()
        });
        $("#edit_education_diploma").children("span").text($(obj).siblings('ul').children('li').eq(3).children('span').eq(1).text()).append('<i class="iconfont icon-xia1"></i>');
        //设置教育时间
        var time = $(obj).siblings('ul').children('li').eq(1).children("input:hidden").val(); //获取时间
        var start_time = time.split('|')[0];
        var end_time = time.split('|')[1];
        $("#edit_education_start_time").val(strForDate(start_time));
        if (end_time == "None" || end_time == "至今") {
            $("#edit_education_end_time").val("至今").attr('disabled', 'disabled').css({
                "background-color": "#ddd"
            });
            //至今控件属性
            $("#edit_education_end_time").parent().prev().children("span[class='to_now_control']").text("选择时间").attr("data-disabled", "yes");
        } else {
            $("#edit_education_end_time").val(strForDate(end_time));
        }
        //设置专业描述
        $("#edit_education_major_describe").val($(obj).siblings('ul').children('li').eq(5).children('span').eq(1).html().replace(/<br>/g, "\n"));
    }
    // 项目经历编辑
function xmjlEdit(obj) {
        operationNowObj = obj; //设置当前操作对象

        $(obj).parent().parent().parent().parent().parent().children().hide().eq(0).show();
        $(obj).parent().parent().parent().parent().parent().children('.h').show();
        $(obj).parent().parent().parent().parent().parent().find('.jl_delete').show();
        
        //设置要编辑的值
        $("#eidt_resume_item_id").val($(obj).siblings('ul').children('li').eq(0).children("input:hidden").val()); //项目经历主键
        //设置公司名称
        $("#edit_item_company_id").val($(obj).siblings('ul').children('li').eq(2).children('span').eq(1).text()); //公司名称
        //设置项目名称
        $("#edit_item_name").val($(obj).siblings('ul').children('li').eq(3).children('span').eq(1).text());        
        //设置项目职务
        $("#edit_item_job").val($(obj).siblings('ul').children('li').eq(4).children('span').eq(1).text());
        //设置项目时间
        var time = $(obj).siblings('ul').children('li').eq(1).children("input:hidden").val(); //获取时间
        var start_time = time.split('|')[0];
        var end_time = time.split('|')[1];
        $("#edit_item_start_time").val(strForDate(start_time));
        if (end_time == "None" || end_time == "至今") {
            $("#edit_item_end_time").val("至今").attr('disabled', 'disabled').css({
                "background-color": "#ddd"
            });
            //至今控件属性
            $("#edit_item_end_time").parent().prev().children("span[class='to_now_control']").text("选择时间").attr("data-disabled", "yes");
        } else {
            $("#edit_item_end_time").val(strForDate(end_time));
        }
        //设置项目职责
        //    if($.trim($(obj).parent().next().children("span").html())=="")
        //        $(obj).parent().next().children("span").html("<p></p>");
        $("#edit_item_duty").val($(obj).siblings('ul').children('li').eq(5).children('span').eq(1).html().replace(/<br>/g, "\n"));
        //设置项目描述
        //    if($.trim($(obj).parent().next().next().children('span').html())=="")
        //        $(obj).parent().next().next().children('span').html("<p></p>");
        $("#edit_item_describe").val($(obj).siblings('ul').children('li').eq(6).children('span').eq(1).html().replace(/<br>/g, "\n"));
    }
    // 培训经历编辑
function pxjlEdit(obj) {
        operationNowObj = obj; //设置当前操作对象
        $(obj).parent().parent().parent().parent().parent().children().hide().eq(0).show();
        $(obj).parent().parent().parent().parent().parent().children('.h').show();
        $(obj).parent().parent().parent().parent().parent().find('.jl_delete').show();
        //设置要编辑的值
        $("#eidt_training_id").val($(obj).siblings('ul').children('li').eq(0).children('input:hidden').val()); //培训经历主键
        // var institutionAndcertificate = $(obj).parent().children("span").text();
        $("#edit_training_institution").val($(obj).siblings('ul').children('li').eq(2).children('span').eq(1).text()); //培训机构
        $("#edit_training_certificate").val($(obj).siblings('ul').children('li').eq(5).children('span').eq(1).text()); //设置获得证书
        //设置培训地点
        $("#edit_training_area").val($(obj).siblings('ul').children('li').eq(3).children('span').eq(1).text());
        //设置培训课程
        $("#edit_training_course").val($(obj).siblings('ul').children('li').eq(4).children('span').eq(1).text());

        //设置培训时间
        var time = $(obj).siblings('ul').children('li').eq(1).children("input:hidden").val(); //获取时间
        var start_time = time.split('|')[0];
        var end_time = time.split('|')[1];
        $("#edit_training_start_time").val(strForDate(start_time));
        if (end_time == "None" || end_time == "至今") {
            $("#edit_training_end_time").val("至今").attr('disabled', 'disabled').css({
                "background-color": "#ddd"
            });
            //至今控件属性
            $("#edit_training_end_time").parent().prev().children("span[class='to_now_control']").text("选择时间").attr("data-disabled", "yes");
        } else {
            $("#edit_training_end_time").val(strForDate(end_time));
        }
        //设置培训描述
        //    if($.trim($(obj).parent().next().children('span').html())=="")
        //        $(obj).parent().next().children('span').html("<p></p>");
        $("#edit_training_describe").val($(obj).siblings('ul').children('li').eq(6).children('span').eq(1).html().replace(/<br>/g, "\n"));
    }
    // 个人技能编辑
function grjlEdit(obj) {
        operationNowObj = obj; //设置当前操作对象

        $(obj).parent().parent().parent().children().hide().eq(0).show();
        $(obj).parent().parent().parent().children('.h').show();
        $(obj).parent().parent().parent().find('.jl_delete').show();

        $("#eidt_skill_id").val($(obj).next().val());
        $("#edit_skill_name").val($(obj).prev().prev().prev().text());
        $("#edit_skill_level_attained").attr({
            "data-name": $(obj).prev().prev().find("input:hidden").eq(0).val(),
            "data-key": $(obj).prev().prev().find("input:hidden").eq(1).val(),
            "data-value": $(obj).prev().text()
        });
        $("#edit_skill_level_attained").children("span").html($(obj).prev().text() + "<i class=\"iconfont icon-xia1\"></i>");
    }
    // 顾问评价编辑
function gwpjEdit(obj) {
    operationNowObj = obj; //设置当前操作对象

    $(obj).parent().next().hide().siblings('.h').show();
    $(obj).parent().parent().children('.h').show();
    //    if($.trim($("#edit_evaluation_show").html())=="")
    //        ue_edit_evaluation.setContent("<p></p>");
    $("#edit_evaluation").val($("#edit_evaluation_show").html().replace(/<br>/g, "\n"));
}

//转换成日期控件接受的格式
function strForDate(str) {
    if (str == "" || str == "undefined")
        return "";
    if (str.indexOf(' ') > 0) {
        str = str.substr(0, str.indexOf(' '));
    }

    str = str.replace("年", "-").replace("月", "-").replace("日", "");

    var dateList = str.split('-')
    var year = dateList[0];
    year = year.length >= 2 ? year : "0" + year;
    var monthg = dateList[1];
    monthg = monthg.length >= 2 ? monthg : "0" + monthg;
    //    var day = dateList[2];
    //    day = day.length >= 2 ? day : "0" + day;
    return year + "-" + monthg;
    //    return year + "-" + monthg + "-" + day;
}
var pageIndex = 1;
var labelData;
//换一换标签
function changeLabel() {
        $("#jlTag").empty();
        var count = pageIndex * 8;

        if (count >= labelData.length) {
            count = labelData.length;
            for (var i = (pageIndex - 1) * 8; i < count; i++) {
                $("#jlTag").append("<li>" + labelData[i].dictionary_name + "</li>");
            }
            pageIndex = 1;
        } else {
            for (var i = (pageIndex - 1) * 8; i < count; i++) {
                $("#jlTag").append("<li>" + labelData[i].dictionary_name + "</li>");
            }
            pageIndex++;
        }
    }
    //获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function loadNewResumeFile(_this, index) {
    if (index == 1) {
        return false;
    }
    var resumeId = $("#resumeID").val();
    var fileIds = '';
    var dlList = $('#sliderCon_m1').children('dl');
    fileIds = dlList.eq(index - 1).children('input').val();
    for (var m = 0; m < dlList.length; m++) {
        if (index != m + 1) {
            fileIds += ',' + dlList.eq(m).children('input').val();
        }
    }
    if (resumeId == '') {
        post('/fileChangeResume', fileIds);
        //        window.location.href = '/resumeFileUpload?file_path=' + file_path;
    }
     else{
        alert('您正在转化编辑该简历，您确定要转化编辑其他简历',3,function(){
            post('/fileChangeResume', fileIds);
        })
     }
    //  else if (confirm('您正在转化编辑该简历，您确定要转化编辑其他简历吗？')) {
    //     //        window.location.href = '/resumeFileUpload?file_path=' + file_path;
    //     post('/fileChangeResume', fileIds);
    // }
}

function danxuan(obj) {
    $(obj).addClass('active').siblings().removeClass('active');

}

// 是否创业
function changeEntrepreneurValue(obj, type) {
    if(type == '1') {
        $(obj).addClass('active');
        $(obj).next().removeClass('active');
    } else {
        $(obj).addClass('active');
        $(obj).prev().removeClass('active');
    }
    var resume_id = $("#resumeID").val();
    $.ajax({
        async: false,
        type: 'POST',
        data: {'resume_id': resume_id, 'is_entrepreneue': type},
        url: '/ajax_changeResumeEntreneurValue',
        dataType: 'json',
        success: function(data) {
            // 成功
        }
    })
}

//判断模块是否有值
function modulevalue(){
       //基本信息
       if($('#resumeID').val()!=""){
           $('#jl_upload').children().children('div').eq(0).html('基本信息<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       else{
           $('#jl_upload').children().children('div').eq(0).html('基本信息<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
     //工作经历
       if($('#work_exper li').eq(0).children('input:hidden').val() !="" && $('#work_exper li').eq(0).children('input:hidden').val() !=undefined)
       {
          $('#jl_upload').children().children('div').eq(1).html('工作经历<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       else{
         $('#jl_upload').children().children('div').eq(1).html('工作经历<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }       
       //教育经历
       if($('#jy_exper li').eq(0).children('input:hidden').val() !="" && $('#jy_exper li').eq(0).children('input:hidden').val() !=undefined)
       {
          $('#jl_upload').children().children('div').eq(2).html('教育经历<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       else{
         $('#jl_upload').children().children('div').eq(2).html('教育经历<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       
       //项目经历
       if($('#project_exper li').eq(0).children('input:hidden').val() !="" && $('#project_exper li').eq(0).children('input:hidden').val() !=undefined)
       {
          $('#jl_upload').children().children('div').eq(3).html('项目经历<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       else{
          $('#jl_upload').children().children('div').eq(3).html('项目经历<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       } 
       //自我评价
       if($('#edit_zwpj_show').text() !="")
        {
          $('#jl_upload').children().children('div').eq(5).html('<i class="zwpj_img"></i>自我评价<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }else{
          $('#jl_upload').children().children('div').eq(5).html('<i class="zwpj_img"></i>自我评价<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       //求职意向
       if($('#sposit1').val() !="")
       {          
          $('#jl_upload').children().children('div').eq(6).html('求职意向<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }else{
          $('#jl_upload').children().children('div').eq(6).html('求职意向<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       //培训经历
       if($('#train_exper li').eq(0).children('input:hidden').val() !="" && $('#train_exper li').eq(0).children('input:hidden').val() !=undefined)
       {
          $('#jl_upload').children().children('div').eq(4).html('培训经历<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       else{
         $('#jl_upload').children().children('div').eq(4).html('培训经历<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }

       //个人技能
       if($('#skill_title').siblings().find('div').eq(0).text() !="")
       {
          $('#jl_upload').children().children('div').eq(7).html('个人技能<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       else{
         $('#jl_upload').children().children('div').eq(7).html('个人技能<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }             
       
       //个人标签
       if($('#jlTagListShow').children('li').eq(0).text() !="")
       {
          $('#jl_upload').children().children('div').eq(8).html('个人标签<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }
       else{
          $('#jl_upload').children().children('div').eq(8).html('个人标签<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
       }  
       
       // //顾问评价
       // if($('#edit_evaluation_show').text() !=""){
       //    <i class="zwpj_img"></i>顾问评价<img class="icon-ditu" src="/static/images/o_ditu.png" alt="">
       // }
       //更多隐私设置
       if($('#gwpj_mes').val() =='3' || $('#gwpj_mes').val() =='5'){
              if($('#edit_evaluation_show').text() !="")
               {
                  $('#jl_upload').children().children('div').eq(9).html('<i class="zwpj_img"></i>&nbsp;顾问评价<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
               }
               else{
                  $('#jl_upload').children().children('div').eq(9).html('<i class="zwpj_img"></i>&nbsp;顾问评价<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
               } 

               if($('#filter_tpc').children('li').eq(0).text() !="" || $('#filter_tpu').children('li').eq(0).text() !="")
               {
                  $('#jl_upload').children().children('div').eq(10).html('更多隐私设置<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
               }
               else{
                  $('#jl_upload').children().children('div').eq(10).html('更多隐私设置<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
               } 
       }       
       else{

               if($('#filter_tpc').children('li').eq(0).text() !="" || $('#filter_tpu').children('li').eq(0).text() !="")
               {
                  $('#jl_upload').children().children('div').eq(9).html('更多隐私设置<i class="con_exist"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
               }
               else{            
                  $('#jl_upload').children().children('div').eq(9).html('更多隐私设置<i class="on_con"></i><img class="icon-ditu" src="/static/images/o_ditu.png" alt="">');
               } 
       }
}




//导出类型
function showCheck(resume_id, user_name, exportType){
    if(exportType == '1'){
        $('.modal_wrap').show();
        $('.dcjl').show();
    }else{
        exportResume(resume_id, user_name);
    }
}

//导出简历
function exportResume(resume_id, user_name, exportType){
    PositionClose();
    $.ajax({
        type: "POST",
        url: "/exportResume",
        data: {"resume_id": resume_id, 'exportType': exportType},
        dataType: "json",
        success: function (data) {
            if(data.status == '1'){
                $('#attachment').val(data.filePath);
                 if(exportType == 'sdjl'){
                    user_name += '-仕道金略简历报告';
                }else{
                    user_name += '-怀才当遇简历报告';
                }
                downLoad(user_name);
            }else{
                window.alert('导出失败',2);
            }
        }
    });
}
function PositionClose() {
    $(".dcjl").hide();
    $(".modal_wrap").hide();
}
//推荐职位时判断是否设置了允许推荐
function recommend(isInvite, source_id, resume_id, resume_name, resume_source){
    if(isInvite == '1'){
        o_show('yq', source_id, '', resume_id, resume_name, resume_source);
    }else{
        window.alert('该简历不接受推荐职位',4);
    }
}
$(function(){
    $(".departure .why li").click(function(event) {
        if( $(this).text() == '其他（填写）'){
            $(".departure .describe").css('display', 'block');
        }
        else{
            $(".departure .describe").css('display', 'none');
        }
    });
    $(".more_entry").click(function(event) {
        $(this).prev().slideToggle(120);
        $(this).text() == '展开更多项'?$(this).text('收起更多项').addClass('active'):$(this).text('展开更多项').removeClass('active');
    });
})

 function loadsAddr(_this) {
        var val =$(_this).val();
        $.ajax({
            type: "POST",
            url: "/ajax_getAjaxAllMajorDictionary",
            dataType: "json",
            success: function(data) {
                $("input[datatype='edit_education_smajor']").AutoComplete({
                    'data': data,
                    'itemHeight': 20,
                    'width': 'auto',
                     'autoFill': true,
                    'afterSelectedHandler': function(data) {
                        $("input[datatype='edit_education_smajor']").empty().val(data.value ).next().val(data.label);
                    },
                    'listStyle': 'custom',
                    'emphasis': false,
                    'createItemHandler': function(index, data) {
                        return data.value; // 文本显示为绿色，并在前后使用'--'包裹
                    }
                }).AutoComplete('show');
                    //判断是否是转化简历
            }
        });
    }
setTimeout(function(){
$(".ac").hide();
},2000);
loadsAddr();




$(function(){
    //职位状态下拉
    $(".jobtie").children('span').click(function(event) {
        if(resumeId == ''){
            alert('请先保存基本信息', 4);
            return;
        }
        $(this).parent().children('ul').slideDown(120);
        $(this).parent().append('<em></em>');
    });
    $(".jobtie").on('click', 'em', function(event) {
        $(this).parent().children('ul').slideUp(120);
        $(this).remove();
    });
    $(".jobtie").on('click', 'li', function(event) {
        var val = $(this).text();
        $(this).parent().parent().children('span').html(val+"<i class='iconfont icon-xia1'></i>").attr('data-val', $(this).attr('data-val'));
        $(this).parent().parent().children('em').click();
        // 改变求职状态
        var position_status = $(this).attr('data-key');
        $(this).parent().parent().attr('data-key', position_status);
        $(this).parent().parent().attr('data-value', $(this).text());
        $.ajax({
            type: "POST",
            url: "/savePositionStatus",
            data: {"resume_id": $("#resumeID").val(), 'position_status': position_status},
            dataType: "json",
            success: function (data) {
                if(data.status == '1'){
                    alert('求职状态保存成功', 1);
                }
            }
        });

    });
    $('.twodime').mouseover(function(event) {
      $('.dimetier').show();
    });
    $('.twodime').mouseleave(function(event) {
       $('.dimetier').hide();
    });

    $('.jobstatilist').mouseleave(function(event) {
         $('.jobstatilist').hide();
    });
    // 基本信息编辑
    $(".edit[datatype='jibeninfo']").click(function() {        
        $(".content_box .jl_top").show();
        $('.jb_info ul').hide();
        PositionControls("scurrently_postaion", $("#currently_postaion").text(), $("#edit_currently_postaion").val(), 'width:276px !important');

        PositionControls("scurrently_postaion", $("#muzw").text(), $("#edit_currently_postaion").val(), 'width:276px !important');
        enjute();
        $('#base_cancel').prev().attr('class', 'active');
    })
    $('#base_cancel').click(function(event) {
        $('.jb_info ul').show();
    });
})

function refresh(){
    if($('#resumeID').val() == ''){
        alert('请先保存基本信息', 4);
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/ajax_flushResume",
        data: {"resumeId": $('#resumeID').val()},
        dataType: "json",
        success: function (data) {
            if(data.msg == 'success'){
                window.location.reload();
            }
        }
    })
}