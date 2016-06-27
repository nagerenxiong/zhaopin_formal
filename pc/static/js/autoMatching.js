/**
 * Created by zhoujia on 2015-08-03.'
 * 自动匹配
 */
 var c;
//自动匹配职位
function autoMatchingPosition(resume_id, pu_id){
    $("#pp_Modal").remove();

    var html = "";
    html += '<div class="modal fade" id="pp_Modal" tabindex="-1" role="dialog"   aria-labelledby="myModalLabel" aria-hidden="true">';
    html += '   <div class="modal-dialog"style="width:695px">';
    html += '       <div class="modal-content" >';
    html += '           <div class="modal-header">';
    html += '               <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    html += '               <h4 class="modal-title" id="myModalLabel">一键匹配</h4>';
    html += '           </div>';
    html += '           <div class="modal-body t_c">';
    html += '               <div class="t">';


    //获取简历信息
    $.ajax({
        async : false,
        type: "POST",
        url: "ajax_getResume",
        data: {
            "resume_id": resume_id
        },
        dataType: "json",
        success: function(data) {
            var resume = $.parseJSON(data.dataInfo);
            if(resume.scurrently_postaion==null)
                resume.scurrently_postaion="";
            if(resume.currently_company==null)
                resume.currently_company="";

            var riqi = parseInt(new Date().getFullYear()) - parseInt(resume.birthday_year);
            if(resume.sworkyear==null)
                resume.sworkyear="";
            else
                resume.sworkyear = "&nbsp;|&nbsp;"+resume.sworkyear;
            if(resume.sdiploma==null)
                resume.sdiploma="";
            else
                resume.sdiploma = "&nbsp;|&nbsp;"+resume.sdiploma;
            if(isNaN(parseInt(resume.birthday_year))){
                riqi="";
            }
            else
                riqi = "&nbsp;|&nbsp;"+riqi+"岁";
            html += '                   <img src="'+ resume.head_portrait +'" alt="" width="55" height="55" style="border-radius:50%;" class="f_l" onerror="notfind(this, 1, \''+resume.sex+'\')">';
            html += '                   <dl class="f_l ml15" style="text-align: left">';
            html += '                       <dt>' ;
            html += '<span class="f_bold" >'+ resume.user_name +'</span>' ;
            if(resume.sex == "男"){
                 html += '<i class="iconfont icon-nan cr"></i>';
            }
            else{
                 html += '<i class="icon-nv iconfont c_c8"></i>';
            }
            html += '<span>'+ resume.sex +'</span><span class="ml15">'+ resume.scurrently_pacece +'</span>' ;
            html += '<span>'+ resume.sworkyear +'</span><span>'+ resume.sdiploma +'</span><span>';
            html += riqi+'</span></dt>';
            html += '<dd>';
            html += '<span class="c_c8">'+ resume.scurrently_postaion +'</span><span class="ml15">'+ resume.currently_company +'</span>';
        }
    });

    html += '                       </dd>';
    html += '                   </dl>';
    html += '               </div>';
    html += '               <div>';
    html += '                   <img src="/static/images/ls_07.png" alt="">';
    html += '               </div>';
    html += '               <ul class="list">';

    if(!isNaN(pu_id)){
        pu_id = 0;
    }
    $.ajax({
        async : false,
        type: "POST",
        url: "ajax_autoMatching",
        data: {
            "type": 1,
            'resumeID':resume_id,
            'matchingCount': 4
        },
        dataType: "json",
        success: function(data) {

                var resume = data.dataInfo;
                $(resume).each(function(){
                    _this = $(this);
                    if(_this[19] == null)
                        _this[19] = '';
                    if(_this[55] == null || _this[55] == "null"){
                        var c_name = "&nbsp;"
                    }else{
                        var c_name = _this[55];
                    }
                    if(_this[8] == null || _this[8] =="null"){
                        _this[8] ="&nbsp;";
                    }
                    var o_list = new Array();
                    if(_this[14] != null)
                        o_list.push(_this[14]);
                    if(_this[23] != null)
                        o_list.push(_this[23]);
                    if(_this[26] != null)
                        o_list.push(_this[26]);
                    o_list = o_list.join("&nbsp;|&nbsp;");
                    

                    html += '                 <li style="cursor: pointer;" onclick="visitPosintion('+  _this[0] +')">';
                    html += '                       <div>';
                    html += '                          <div class="f_l">';
                    html += '                              <div class="q">';
                    html += '                               <p>'+ _this[_this.length-1] +'%</p>';
                    html += '                               <p>匹配值</p>';
                    html += '                             </div>';
                    html += '                             <div class="pu-co">';
                    if($(this)[1] == '1'){
                        html += '【企业直招】';
                    }
                    else{
//                        html += '【经纪人发布】';
                    }
                    html += '                             </div>';
                    html += '                          </div>';
                    html += '                           <div class="f_l ml15">';
                    html += '                              <p style="margin-bottom:5px" class="clearfix"><span title="'+_this[3]+'" class="f_bold nowrap f_l" style="font-size:18px;width:118px">'+ _this[3] +'</span><span class="nowrap c_c8 ml15 f_l" title="'+_this[19]+'" style="font-size:16px;width:65px;">'+ _this[19] +'</span></p>';
                    html += '                              <p>'+ c_name +'</p>';
                    html += '                              <p style="margin: 2px 0px;">'+ _this[8] +'</p>';
                    html += '                              <p class="nowrap" style="inline-block;width:190px">'+ o_list+'</p>';
                    html += '                            </div>';
                    html += '                       </div>';
                    html += '                       <div style="clear:both"></div>';
                    html += '                       <div class="s">';

                    var labels = _this[67];
                    var labelStr = '';
                    if(labels && labels != ''){
                        var labellist = new Array();
                        labellist = labels.split('**', 4);
                        for(var l = 0;l < labellist.length;l++){
                            html += '<span>'+labellist[l]+'</span>';
                        }
                    }

                    html += '                       </div>';
                    html += '                   </li>';

                });
            }
        });
    html += '               </ul>';
    html += '               <div class="mt20">';
    html += '               <div class="div1">';
    html += '    <div class="right-div2">';
    html += '        <div class="right-div3"></div>';
    html += '       </div>';
    html += '       <div class="left-div2">';
    html += '        <div class="left-div3"></div>';
    html += '       </div>';
    html += '   </div>';
//    html += '                           <div class="g">';
//    html += '                               查看更多';
//    html += '                           </div>';
    html += '                       </div>';
    html += '                   </div>';
    html += '               </div>';
    html += '           </div>';
    html += '       </div>';

    $("body").append(html); //添加弹出框主题
    $("#pp_Modal").modal("show"); //显示弹出框
}

function visitPosintion(positionId){
    window.open('/resume/zwxq?positionId=' + positionId, '_blank');
}