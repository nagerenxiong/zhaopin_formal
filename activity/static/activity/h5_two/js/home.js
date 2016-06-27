// JavaScript Document
;(function(win,doc){
	function change(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/10+'px';
    var rem = parseFloat(document.documentElement.style.fontSize);
     

    $(".title_list li").css('lineHeight', $(".title_list li").height()+"px");
        
	}
	win.addEventListener('resize',change,false);
	win.addEventListener('DOMContentLoaded',change,false);
})(window,document);


$(function(){

var oh = document.documentElement.clientHeight;
  if(oh <= 480){
   
    $('.taobao').css({marginTop:"28%"});
  }
});
$(function(){
var obj = $("body");
var startY = 0;//手指按下时的坐标
var endY = 0;//手指离开时的坐标
var startY1 = 0;//职位滑动
var endY1 = 0;//职位滑动
var p_slide = 1;//职位滑动
var isgo =true;
var slide_index=0;//当前显示第几屏0-5
obj.on('touchstart', function(event) {
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
         // 阻止浏览器默认事件，重要
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        startY = touch.pageY;
        endY = startY;
        }
}, false);


obj.on('touchmove', function(event) {
  event.preventDefault();
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        endY = touch.pageY;
        }
}, false);


// 第二屏文字内容 活动 阻止冒泡
$(".index2 .txt_box").on('touchmove', function(event) {
  if(event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
       
        //document.title = Math.abs(touch.pageY - endY);
        
        if(Math.abs(touch.pageY - endY) <= 100){
            event.stopPropagation();
        }
        //endY = touch.pageY;

        
  }
  
});

obj.on('touchend', function(event) {
        if(isgo == true && !$('.index5').hasClass('active')){
        if(endY-startY>100 ){//上一屏
          isgo = false;
          //如果为第1屏 上一屏应该是4 不是0
          slide_index == 0?slide_index = 4:slide_index --;
          //滑动后下一个显示
          $(".o_slide").eq(slide_index).siblings().css('zIndex', '2');
          $(".o_slide").eq(slide_index).css({zIndex:'3'}).attr('id', 'z');

          $(".o_slide").removeClass('o_active');//移除动画类
          //给当前显示块添加动画类
          $(".o_slide").eq(slide_index).addClass('o_active');

          setTimeout(function(){
            $(".o_slide").eq((slide_index-1)<0?4:slide_index-1).attr('id', 's');
            $(".o_slide").eq((slide_index+1)>4?0:slide_index+1).attr('id', 'x');
            isgo=true;
          },800)
          
        }
        else if(startY-endY>100 ){//下一屏
          //如果为第4屏 下一屏应该是1 不是5
          isgo = false;
          slide_index == 4?slide_index = 0:slide_index ++;

          //滑动后下一个显示
          $(".o_slide").eq(slide_index).siblings().css('zIndex', '2');
          $(".o_slide").eq(slide_index).css({zIndex:'3'}).attr('id', 'z');


          $(".o_slide").removeClass('o_active');//移除动画类
          //给当前显示块添加动画类
          $(".o_slide").eq(slide_index).addClass('o_active');


          setTimeout(function(){
            $(".o_slide").eq((slide_index-1)<0?4:slide_index-1).attr('id', 's');;
            $(".o_slide").eq((slide_index+1)>4?0:slide_index+1).attr('id', 'x');
            isgo = true;
          },800)
          
        } 
      }
        startY =0;
        endY = 0;
}, false);

});