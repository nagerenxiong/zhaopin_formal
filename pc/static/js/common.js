// 导航栏滑动
$(".nav_b  li").click(function(e) {
	sideTab.call(this);
});
$(".ltml_grid_ul  li.side_li").click(function(e) {
	sideTab.call(this);
});

function sideTab() {
	if ($(this).hasClass('slider')) {
		return;
	}

	var whatTab = $(this).index();
	var w = parseInt($(this).css('width'));
	var howFar = w * whatTab;
	$(this).parent().children('.slider').css({
		left: howFar + "px"
	});
}

function switchTab(stor) {
	$(document).on("mouseover", stor, function() {
		if ($(this).hasClass('active')) return;
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	})
}
if($(".knob").length>0)
{
    $(".knob").knob({
        thickness:0.1,
        fgColor: '#ff8800',
        bgColor: '#e4e4e4',
        draw : function () {
            // "tron" case
            if(this.$.data('skin') == 'tron') {
                this.cursorExt = 0.3;
                var a = this.arc(this.cv)  // Arc
                    , pa                   // Previous arc
                    , r = 1;
                this.g.lineWidth = this.lineWidth;
                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();
                return false;
            }
        }
    });
}


