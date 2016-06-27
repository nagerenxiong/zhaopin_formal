  

   //编辑能力传值
   // var obj_id1=$('#obj_id').val();
   var abilityto_com=$('#abilityto_com').val();
   var logical_think=$('#logical_think').val();
   var character_trait=$('#character_trait').val();
   var team_govern =$('#team_govern').val();
   var profe_skill =$('#profe_skill').val();

   $(function() {
     $(window).scroll(function(event) {
         $(window).resize();
      });
       $('.edittjbg').click(function(event) {           
           $('.advanbox').find("textarea[datatype='advantage']").val($('#kxys').html().replace(/<br>/g, "\n"));
           $('.advanbox1').find("textarea[datatype='salary']").val($('#xcfl').html().replace(/<br>/g, "\n"));
           $('.advanbox').find("textarea[datatype='evaluate']").val($('#jjrpj').html().replace(/<br>/g, "\n"));
           hidcen();
           var abli=$('#abilityto_com').val().split(',');
           commfun(abli,'#make_compromises');
           var logic=$('#logical_think').val().split(',');
           commfun(logic,'#logic_thinking');
           var chara=$('#character_trait').val().split(',');
           commfun(chara,'#character');
           var teamgo=$('#team_govern').val().split(',');
           commfun(teamgo,'#team_management');
           var profesk=$('#profe_skill').val().split(',');
           commfun(profesk,'#expertise');  
           var num = $.trim($('#advantage').val()).length;
           $('.numTip').find('span').eq(0).text(num);
            var num1 =$.trim($('#evaluate').val()).length;
           $('.numTip1').find('span').first().text(num1);
            var num2=$.trim($('#salary').val()).length;
           $('.numTip2').find('span').first().text(num2);    
       });
      
       
    
       // 
       // 计算输入内容的数量
       // setTimeout(function(){
       //   alert($('#advantage').val().length);
       // },100);      

            $('#advantage').keyup(function() {
               var num = $(this).val().length;
               $('.numTip').find('span').eq(0).text(num);
            })
            $('#evaluate').keyup(function() {
               var num = $(this).val().length;    
               $('.numTip1').find('span').eq(0).text(num);              
            })            
            $('#salary').keyup(function() {
               var num = $(this).val().length; 
               $('.numTip2').find('span').eq(0).text(num);                     
            })
           
           //收起展开
       $(".sh_submit").click(function(event) {
           var shval = $(".sh_submit").text();
           if (shval == "收起") {
               $('.moreability').css('display', 'none');
               $(".sh_submit").html('展开<i class="active"></i>');
           } else {
               $('.moreability').css('display', 'block');
               $(".sh_submit").html('收起<i></i>');
           }
       });

       //推荐报告下拉框
       $('.temp').children('p').click(function(event) {
           $(this).parent().children('ul').slideDown(120);
       });
       $('.temp').mouseleave(function(event) {
             $(this).children('ul').slideUp(120);
       });
       var isWrite = true;
       var advtag;
       $('.temp').on('click', 'li', function(event) {
           var val = $(this).text();
           if (isWrite) {
               advtag = $('#advantage').val();
               if (advtag != "") {
                   advtag = advtag + '\n';
               }
               isWrite = false;
           }
           $(this).parent().parent().children('p').text(val).attr('data-val', $(this).attr('data-val'));
           $(this).parent().parent().children('ul').slideUp(120);
           if ($(this).index() == 0) {                  
                  $('#advantage').val(advtag + "1、多年广告公司平面设计工作经验，熟练掌握Photoshop、Illustrator等设计软件；\n" +
                   "2、独立完成公司的多个设计项目，广受客户好评，有较强的手绘能力和创意思维；\n" +
                   "3、设计排版多本杂志和企业样册，熟知印刷制作与印前印后工艺流程、纸张、出片、打样等专业知识； \n" +
                   "4、有良好的团队精神和团队协作能力，并能指导其他设计师进行专业的设计工作。");
           } else if ($(this).index() == 1) {
                  $('#advantage').val(advtag + "1、多年大型企业销售管理、渠道管理、服务管理经验；\n" +
                   "2、擅长创新营销模式，与多家渠道合作，由渠道拓展和深度分销等有成功实战经验，\n" +
                   "3、有效促进销售、提升公司品牌影响力，与渠道形成长期深度合作关系；\n" +
                   "4、对于中高端产品的市场定位，渠道布局和国内重要区域划分有自己独到的见解。");          
           } else {                   
                   $('#advantage').val(advtag + "1、从事财务工作数年，拥有多年大型企业财务工作、管理经验；\n" +
                   "2、熟悉财务管理各个模块，擅长税务筹划、对外关系的处理，尤其是在财务内部管控和资金管理等方面积累了丰富的实操经验；\n" +
                   "3、熟悉税务和银行环境，并且拥有良好的关系和资源，有一定的大局观念。"); 
           }
           var num = $('#advantage').val().length;
           $('.numTip').find('span').eq(0).text(num);
       });
       //能力选择和删除
       $('#advantage').change(function(event) {
           isWrite = true;
       });

       $('.commadd').click(function(event) {
           $(this).css('display', 'none');
           $(this).siblings('.addll').css('display', 'block');
       });
       $('.repitchon').click(function(event) {
           var x = true;
           var dx=$(this).parent().siblings('ul').children('li');
           var val = $(this).prev().val();
           $('.repitchon').css('background-color', '#5c91d9');
           if ($.trim($(this).siblings('input[type=text]').val()) == "") {
               alert("请输入内容",2);
               return false;
           } else {
               $(this).parent().siblings('.commadd').css('display', 'block');
               $(this).parent().css('display', 'none');
               dx.each(function(index, el) {            
                    if ($(this).text() == val){
                       alert("已存在相同标签",2);
                       x=false;
                    }                
                });
               if(x == true){
                        $(this).parent().siblings('ul').append('<li class="addfield">' +
                        $(this).siblings('input[type=text]').val() + '<i></i></li>');
                        $(this).siblings('input[type=text]').val('');
               }    
           }
       });

       $('.comm_rig').on('click', 'li', function(event) {
           //灰色变蓝
           if ($(this).hasClass('huise') && !$(this).hasClass('addfield')) {
               $(this).addClass('addfield');
               $(this).append('<i></i>');
           } else if ($(this).hasClass('addfield')) {
               var that = this;
               if ($(this).hasClass('huise')) {
                   $(that).removeClass('addfield');
                   $(that).find('i').remove();
               } else {
                   // setTimeout(function(){

                   // }, 1000);  
                   $(that).remove();
               }
           }
       });
       $('.comm_rig').on('mouseover', 'li', function(event) {
           $(this).find('i').addClass('active');
       });
       $('.comm_rig').on('mouseleave', 'li', function(event) {
           $(this).find('i').removeClass('active');
       });

       //赋值
       var str = '"goutong": '
       $('.comm_rig li.addfield').each(function(index, el) {
           var str = str + $(el).text();
       });

       //提交推荐报告
       $('.saveok').click(function (event) {
           var resume_id = $('#resumeID').val();
           var obj_id = $('#obj_id').val();
           if (resume_id == '') {
               alert("请先保存基本信息", 2);
               return false;
           }
           var core_advantage = $.trim($('#advantage').val());
           var evaluate=$.trim($('#evaluate').val());
           if (core_advantage == "") {
               alert("请输入核心优势", 2);
               return false;
           } else if (core_advantage.length < 50) {
               alert("核心优势最少输入50个字", 2);
               return false;
           } else if (evaluate.length < 50) {
               alert("经纪人评价最少输入50个字", 2);
               return false;
           }  else {
               core_advantage = core_advantage.replace(/\n/g, '<br>');
           }
           var consultant_evaluation = $.trim($('#evaluate').val());
           if (consultant_evaluation == "") {
               alert("请输入经纪人评价", 2);
               return false;
           } else {
               consultant_evaluation = consultant_evaluation.replace(/\n/g, '<br>');
           }
           var salary_welfare = $.trim($('#salary').val());
           if (salary_welfare != '') {
               salary_welfare = salary_welfare.replace(/\n/g, '<br>');
           }
           var make_compromises = skillItemDeal($('#make_compromises'));
           var logic_thinking = skillItemDeal($('#logic_thinking'));
           var expertise = skillItemDeal($('#expertise'));
           var team_management = skillItemDeal($('#team_management'));
           var character = skillItemDeal($('#character'));
           $.ajax({
               type: 'POST',
               url: '/saveRecommendReport',
               data: {'resume_id': resume_id, 'id': obj_id, 'core_advantage': core_advantage, 'salary_welfare': salary_welfare,
                   'consultant_evaluation': consultant_evaluation, 'make_compromises': make_compromises,
                   'logic_thinking': logic_thinking, 'expertise': expertise, 'team_management': team_management,
                   'character': character},
               dataType: 'json',
               success: function (data) {
                   if (data.status == '1') {
                       alert('保存成功', 1);
                        showcen();
                        $('#kxys').html(core_advantage);
                        $('#xcfl').html(salary_welfare);
                        $('#jjrpj').html(consultant_evaluation);
                        $('.capacyl p').remove();
                        var html='';
                        if($.trim(make_compromises) !=""){
                           html +='<p><span class="bold">沟通协调能力：</span>'+make_compromises+'</p>';
                        }
                        if($.trim(logic_thinking) !=""){
                           html +='<p><span class="bold">逻辑思维能力：</span>'+logic_thinking+'</p>';
                        }
                        if($.trim(character) !=""){
                           html +='<p><span class="bold">性格特点：</span>'+character+'</p>';
                        }
                        if($.trim(team_management) !=""){
                           html +='<p><span class="bold">团队管理能力：</span>'+team_management+'</p>';
                        }
                        if($.trim(expertise) !=""){
                           html +='<p><span class="bold">专业技能能力：</span>'+expertise+'</p>';
                        }                    
                        $(".capacyl").append(html);
                         var abli=$('#abilityto_com').val(make_compromises); //沟通能力
                         var logic=$('#logical_think').val(logic_thinking);
                         var chara=$('#character_trait').val(character); 
                         var teamgo=$('#team_govern').val(team_management);
                         var profesk=$('#profe_skill').val(expertise);                   

                       if($.trim(obj_id) ==""){
                           $('#obj_id').val(data.obj_id);
                       }
                   } else if (data.status == '2') {
                       alert('推荐报告已存在', 4);
                   } else if (data.status == '3') {
                       alert('推荐报告ID不对', 4);
                   } else if (data.status == '0') {
                       alert('你没有权限操作此数据或登录超时', 4);
                   }
               }
           });
       });

   })
//处理核心优势选择项
function skillItemDeal(obj){
    var result = '';
    var li_list = $(obj).children(' .addfield');
    var li_len = li_list.length;
    if(li_len > 0){
        for(var m = 0;m < li_len;m++){
            if(result == ''){
                result = li_list.eq(m).text();
            }else{
                result += ',' + li_list.eq(m).text();
            }
        }
    }
    return result;
}

   function o_hides() {
       hidcen();
       $('#recommreports').hide();
       $('.o_shade').hide();
   }


  function commfun(values,elem){
    if(values == ""){
       $(elem +" li").attr('class', 'huise');
       $(elem +" li i").remove();
    }
    else{
      $.each(values, function(n, val) {
              var isflag=false;
              $(elem+' li').each(function(index, el) {              
                   if($(this).text() == val){
                     $(this).addClass('addfield').append('<i></i>');
                     isflag=true;
                   }
               });
             if(isflag == false){
                  if($.trim(val) !=""){
                     $(elem).append('<li class="addfield">'+val+'<i></i></li> ');      
                  }                    
               }
        });
    }
   }


 function showcen(){
                $('.coreadva').css('height', '470px');
                $('.temp').css('display', 'none');
                $('.advanbox').css('display', 'none');
                $('.advanbox1').css('display', 'none');
                $('.okno').css('display', 'none');
                $('.capacitymod').css('display', 'none');
                $('.kxsl_mes').css('display', 'block');
                $('.edittjbg').css('display', 'block');
                $('.capacyl').css('display', 'block');
 }
 function hidcen(){
               $('.coreadva').css('height', '430px');
               $('.temp').css('display', 'block');
               $('.advanbox').css('display', 'block');
               $('.advanbox1').css('display', 'block');
               $('.okno').css('display', 'block');
               $('.capacitymod').css('display', 'block');
               $('.kxsl_mes').css('display', 'none');
               $('.edittjbg').css('display', 'none');
               $('.capacyl').css('display', 'none');
 }