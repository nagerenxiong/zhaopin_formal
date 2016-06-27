var file_name;
var done=function(){};
function Uploader() {
	this.cfg = {
		uploader: '/fileupload/',
		type: 1,
		tipSize: '5MB',
		tipType: ['*'],
		multi:true,
		note:"若从其它网站下载的word简历，请将文件另存为.docx格式后上传",
		success: null
	};
}
Uploader.prototype = {
	open: function(cfg) {
		var CFG = $.extend(this.cfg, cfg);
		var queueSizeLimit;
		var layer_index;
		if(CFG.multi)		
			queueSizeLimit=999;
		 else
		 	queueSizeLimit=1;		
		$("head").append('<link rel="stylesheet" type="text/css" href="/static/js/uploader/uploadify.css"><link rel="stylesheet" href="/static/js/uploader/layer/skin/layer.css" id="layui_layer_skinlayercss"><script src="/static/js/uploader/layer/layer.js" type="text/javascript"></script><script src="/static/js/uploader/jquery.uploadify.min.js" type="text/javascript"></script>');
		$(".uploader").remove();
		if (CFG.type == 1) {
			var tipTypeStr = "";
			var typeExts = "";
			for (var i = 0; i < CFG.tipType.length - 1; i++) {
				tipTypeStr += CFG.tipType[i] + "、";
				typeExts += "*." + CFG.tipType[i] + ";";
			};
			tipTypeStr += CFG.tipType[CFG.tipType.length - 1];
			typeExts += "*." + CFG.tipType[CFG.tipType.length - 1];
			// 注：'+CFG.node+'
			$("body").append('<ul class="uploader" style="display:none"><li><a href="javascript:void(0)"><span class="uploadify-button" id="uploader_btn">选择上传文件</span></a></li><li class="uploader_info1"><span>支持' + CFG.tipType + '格式文件</span><br>\
			文件大小需小于' + CFG.tipSize + '</li><li class="uploader_info2" id="node"></li><li class="uploader_jdt_box" id="uploader_jdt_box"></li><li class="uploader_b" >\
			<span class="uploader_cbtn" onclick="$(\'#uploader_btn\').uploadify(\'upload\',\'*\')">确认</span><span class="uploader_canncl" onclick="$(\'#uploader_btn\').uploadify(\'cancel\',\'*\');layer.closeAll();">取消</span></li></ul>');
			layer_index = layer.open({
				title: "上传文件",
				type: 1,
				area: ['546px', '393px'],
				shadeClose: true, //点击遮罩关闭
				content: $(".uploader")
			});				
			$('#uploader_btn').uploadify({
				'buttonClass': 'uploader_btn',
				'buttonText': '选择文件上传',
				'width': '304px',
				'height': '57px',	
				'multi':CFG.multi,					
				'fileTypeExts': typeExts,
				'fileSizeLimit': CFG.tipSize,				
				'swf': '/static/js/uploader/uploadify.swf',
				'uploader': CFG.uploader,
				'cancelImg': 'uploadify-cancel.png',
				'auto': false,
				'queueSizeLimit':queueSizeLimit,				
				'queueID': 'uploader_jdt_box',
				'onUploadStart': function(file) {
					$("#uploader_btn").uploadify("settings", "formData", {
						'fileType': CFG.fileType
					});
				},
				'onUploadSuccess': function(file, data, response) {
					CFG.success(file, JSON.parse(data).save_name, response);
					file_name = file.name;
					done();
					setTimeout(function() {
						layer.close(layer_index);
					}, 500);
				},				
				'onSelectError': function(file, errorCode, errorMsg) {
					 $("#node").text("图片不能超过"+CFG.tipSize);
					alert("图片不能超过"+CFG.tipSize);
					
				},
				'itemTemplate': '<div id="${fileID}" class="uploadify-queue-item">\
		    <span class="fileName">${fileName}</span><div class="uploadify-progress"><div class="uploadify-progress-bar"></div></div><span class="data"></span><div class="cancel">\
		    <a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">删除</a></div></div>'
			});
		}
	}
}