//弹窗show
function o_show(obj,cont){
	if($(obj).length==0){
	switch (cont){
		case "mspj":$("body").append(content);$(obj).show(300);break;
		case "yq":$("body").append(content1);$(obj).show(300);break;
	}
	}else{
		$(obj).show(300);
	}
}
//弹窗hide
function o_hide(obj){
	$(obj).hide(300);
}
//文本框已输入字符显示
function word_length(textarea,span){
	textarea.keydown(function(event) {
		span.text($(this).val().length);
	});
	textarea.keyup(function(event) {
		span.text($(this).val().length);
	});
}
//星星移入效果
function star_enter(stars){
	$(stars).mouseenter(function(event) {
		$(stars+":gt("+($(this).index())+")").removeClass('active');
		$(stars+":lt("+($(this).index()+1)+")").addClass('active');
	});
}
//单选效果
function radio_li(li){
	li.click(function(event) {
		$(this).addClass('active').siblings('').removeClass('active');
	});
}
//面试评价content
var content=content1="";
content+="<div class=\"o_modal\" id=\"comment_interview\">";
content+="<div class=\"o_shade\" onclick=\"o_hide(\'#comment_interview\')\"></div>";
content+="<div class=\"o_common\">";
content+="    <h1>评价面试体验<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#comment_interview\')\"></i></h1>";
content+="    <dl>";
content+="        <dt>面试评分：</dt>";
content+="        <dd style=\"vertical-align: bottom\">";
content+="            <ul class=\"clearfix star\">";
content+="                <li></li>";
content+="                <li></li>";
content+="                <li></li>";
content+="                <li></li>";
content+="                <li></li>";
content+="            </ul>"
content+="        </dd>";
content+="    </dl>";
content+="    <dl>";
content+="        <dt>面试评价：</dt>";
content+="        <dd><textarea maxlength=\"200\" name=\"\" id=\"\" placeholder=\"详细描述一下自己的面试经历\"></textarea></dd>";
content+="    </dl>";
content+="    <div class=\"btn_list\">";
content+="        <input type=\"checkbox\" id=\"anonymity\">";
content+="        <label for=\"anonymity\" class=\"o_tishi\">匿名提交</label>";
content+="        <span>(<b>0</b>/200)</span>";
content+="    </div>";
content+="    <button class=\"o_btn\" onclick=\"o_hide(\'#comment_interview\')\">确认提交</button>";
content+="</div>";
content+="</div>";
content+="<script>word_length($(\"#comment_interview textarea\"),$(\"#comment_interview .btn_list span b\"));star_enter(\"#comment_interview .star li\");<\/script>";

//推荐简历content
content1+="<div class=\"o_modal\" id=\"recommend_position\" style=\"display: block\">";
content1+="<div class=\"o_shade\" onclick=\"o_hide(\'#recommend_position\')\"></div>";
content1+="<div class=\"o_common o_tjzw\">";
content1+="    <h1>推荐职位<i class=\"iconfont icon-cha\" onclick=\"o_hide(\'#recommend_position\')\"></i></h1>";
content1+="    <dl>";
content1+="        <dt>职位名称：</dt>";
content1+="        <dd>";
content1+="            <input type=\"text\" placeholder=\"请输入正在发布的职位名称\">";
content1+="        </dd>";
content1+="        <dd class=\"o_rule\">";
content1+="            规则：成功向经理人推荐职位，可获得+10金币奖励，每日15次";
content1+="        </dd>";
content1+="    </dl>";
content1+="    <dl>";
content1+="        <dt >私信内容：</dt>";
content1+="        <dd><textarea maxlength=\"200\" name=\"\" id=\"\" placeholder=\"\"></textarea></dd>";
content1+="    </dl>";
content1+="    <div class=\"btn_list\">";
content1+="        <label for=\"anonymity\" class=\"o_tishi\">以上模板为可编辑</label>";
content1+="        <span>(<b>45</b>/200)</span>";
content1+="    </div>";
content1+="    <button class=\"o_btn\" onclick=\"o_hide(\'#recommend_position\')\">确认提交</button>";
content1+="</div>";
content1+="</div>";
content1+="<script>word_length($(\"#recommend_position textarea\"),$(\"#recommend_position .btn_list span b\"));<\/script>";
