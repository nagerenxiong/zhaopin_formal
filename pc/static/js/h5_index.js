// 自适应文字大小 start
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      var clientHeight = $(window).height();
      var x = (clientHeight/clientWidth);
      console.log(x)
      if (!clientWidth) return;
      // if (clientWidth > 640) {
      //   clientWidth = 640;
      // }       1.5 : 11.8
      //         1.7178:10.5
       //        1.775: 9.8
       //        10+10.2-(x/1.777777777777778)*10

      docEl.style.fontSize = clientWidth / (10+10.2-((clientHeight/clientWidth)/1.777777777777778)*10) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
// 自适应文字大小 end
var obj = $("body");
var startX;
var startY;
var endX;
var endY;
var isgo;
var slide_index=0;
obj.on('touchstart', function(event) {
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
　　　　 event.preventDefault();// 阻止浏览器默认事件，重要 
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        isgo = true;
        startX = touch.pageX;
        startY = touch.pageY;
        }
}, false);

obj.on('touchmove', function(event) {
     // 如果这个元素的位置内只有一个手指的话
    if (event.targetTouches.length == 1) {
　　　　 event.preventDefault();// 阻止浏览器默认事件，重要 
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        endX = touch.pageX;
        endY = touch.pageY;
        }
}, false);

obj.on('touchend', function(event) {
     // 如果这个元素的位置内只有一个手指的话

　　　　 event.preventDefault();// 阻止浏览器默认事件，重要 
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
        if(endY-startY>100 && slide_index <0){
          slide_index ++;
          $("#o_slide").css('top',slide_index*100+"%");
          $(".o_slide").removeClass('o_active');
            setTimeout(function(){$(".index"+-(slide_index-1)).addClass('o_active');},200);
        }
        else if(startY-endY>100 && slide_index>-5){
          slide_index --;
          $("#o_slide").css('top',slide_index*100+"%");
            $(".o_slide").removeClass('o_active');
            setTimeout(function(){$(".index"+-(slide_index-1)).addClass('o_active');},200);
        }
        startY =0;
        endY = 0;
}, false);