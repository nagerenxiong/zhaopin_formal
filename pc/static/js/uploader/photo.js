function photoUploader() {
	this.cfg = {
		// uploader: '/fileupload/',
		// type: 1,
		// tipSize: '5MB',
		// tipType: ['*'],
		// multi:true,
		// success: null
	};
}
photoUploader.prototype = {
	open: function(cfg) {
		var CFG = $.extend(this.cfg, cfg);
		var layer_index;
		var str='<div id="photoBox_upload"><OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
		str+='codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"';
		str+='WIDTH = "650" HEIGHT = "450" id = "myMovieName" ><PARAM NAME=movie VALUE="avatar\.swf" >';
		str+='<PARAM NAME = quality VALUE = high ><PARAM NAME=bgcolor VALUE=\#FFFFFF >';
		str+='<param name = "flashvars" value = "imgUrl=./default.jpg&uploadUrl=./upfile.php&uploadSrc=false"/>';
		str+='<EMBED src = "/static/js/uploader/avatar.swf" quality = high bgcolor = # FFFFFF WIDTH = "650" HEIGHT = "450"';
		str+=' wmode = "transparent" flashVars = "imgUrl=/static/images/1.jpg&uploadUrl=/ajax_upload_photo?type=1/&uploadSrc=false"';
		str+=' NAME = "myMovieName" ALIGN = "" TYPE = "application/x-shockwave-flash" allowScriptAccess = "always"';
		str+=' PLUGINSPAGE = "http://www.macromedia.com/go/getflashplayer" > </EMBED> </OBJECT> </div>';
		$("head").append('<link rel="stylesheet" href="/static/js/uploader/layer/skin/layer.css" id="layui_layer_skinlayercss"><script src="/static/js/uploader/layer/layer.js" type="text/javascript"></script>');
		$("#photoBox_upload").remove();
		$("body").append(str);
		layer_index = layer.open({
			title: "上传图片",
			type: 1,
			area: ['800px', '600px'],
			shadeClose: true, //点击遮罩关闭
			content: $("#photoBox_upload")
		});
	}
}

function uploadevent(status, picUrl, callbackdata) {
	//alert(picUrl); //后端存储图片
	//alert(callbackdata); //后端返回数据
	status += '';
	switch (status) {
		case '1':
			var time = new Date().getTime();
			var filename162 = picUrl + '_162.jpg';
			var filename48 = picUrl + '_48.jpg';
			var filename20 = picUrl + "_20.jpg";

			document.getElementById('avatar_priview').innerHTML = "头像1 : <img src='" + filename162 + "?" + time + "'/> <br/> 头像2: <img src='" + filename48 + "?" + time + "'/><br/> 头像3: <img src='" + filename20 + "?" + time + "'/>";

			break;
		case '-1':
			window.location.reload();
			break;
		default:
			window.location.reload();
	}
}