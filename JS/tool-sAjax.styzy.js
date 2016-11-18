/**
 * Created by STYZY on 2016/09/01.
 * Update by STYZY on 2016/09/02.
 */

if(typeof(styzy) == "undefined") {
	var styzy = new Object;
} else {
	var styzy = styzy;
}

(function(styzy) {

	/*
	 * 封装原生ajax Post方法
	 */
	styzy.ajax = sAjax;

	function sAjax(params) {
		var XHR;
		if(window.ActiveXObject) {
			XHR = new ActiveXObject("Microsoft.XMLHTTP");
		} else if(window.XMLHttpRequest) {
			XHR = new XMLHttpRequest();
		} else {
			XHR = null;
		}

		//针对某些特定版本的mozillar浏览器的bug进行修正。
		if(XHR.overrideMimeType) {
			XHR.overrideMimeType('text/xml');
		}

		var finParams = {
			type: ((params.type) ? params.type : "POST"),
			url: ((params.url) ? params.url : null),
			async: ((typeof(params.async) == "undefined") ? true : params.async),
			data: ((params.data) ? params.data : null),
			dataType: ((params.dataType) ? params.dataType : "json"),
			beforeSend: ((params.beforeSend) ? params.beforeSend : null),
			success: ((params.success) ? params.success : null),
			error: ((params.error) ? params.error : null),
		};

		//将data的json转换为url中的参数
		if(finParams.data) {
			var dataStr = "";
			for(var item in finParams.data) {
				dataStr += item + "=" + finParams.data[item] + "&"
			}
			dataStr = dataStr.substring(0, dataStr.length - 1);
			finParams.data = dataStr;
		}

		//注册回调函数
		XHR.onreadystatechange = function() {
			//判断对象状态是交互完成，接收服务器返回的数据
			if(XHR.readyState == 4) {
				if(XHR.status == 200) {
					if(finParams.success) {
						var json = eval("(" + XHR.responseText + ")")
						finParams.success(json);
					}
				} else {
					if(finParams.error) {
						finParams.error();
					}
				}
			}
		};

		//发出请求
		XHR.open(finParams.type, finParams.url, finParams.async);
		if(finParams.beforeSend != null) {
			finParams.beforeSend();
		}
		if(finParams.type == "POST") {
			XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		XHR.send(finParams.data);
	}
})(styzy)