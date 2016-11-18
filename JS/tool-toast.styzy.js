/**
 * Created by STYZY on 2016/11/17.
 * Update by STYZY on 2016/11/17.
 */

if(typeof(styzy) == "undefined") {
	var styzy = new Object;
} else {
	var styzy = styzy;
}

(function(styzy) {
	styzy.toast = Toast;
	//模拟原生toast
	function Toast(msg,position) {
		var t_config = {
			"msg": (typeof(arguments[0]) != "undefined") ? arguments[0] : "error",
			//样式可选为 默认 top
			"position": (typeof(arguments[1]) != "undefined") ? arguments[1] : "",
			"slideDuration": 800,
			"duration": 800
		}
		var bg_dom = document.createElement("div");
		var msg_dom = document.createElement("div");
		bg_dom.setAttribute("class", "bs-toast-bg " + t_config.position + "");
		msg_dom.setAttribute("class", "bs-toast-body " + t_config.position + "");
		var bgStyle = "-webkit-animation-duration: " + t_config.slideDuration / 1000 + "s;-moz-animation-duration: " + t_config.slideDuration / 1000 + "s;-o-animation-duration: " + t_config.slideDuration / 1000 + "s;animation-duration: " + t_config.slideDuration / 1000 + "s;"
		var bodyStyle = "-webkit-animation-duration: " + t_config.slideDuration / 1000 + "s;-moz-animation-duration: " + t_config.slideDuration / 1000 + "s;-o-animation-duration: " + t_config.slideDuration / 1000 + "s;animation-duration: " + t_config.slideDuration / 1000 + "s;"
		bg_dom.setAttribute("style", bgStyle);
		msg_dom.setAttribute("style", bodyStyle);
		msg_dom.innerHTML = t_config.msg;

		//执行插入
		window.document.body.style.overflow = "hidden"
		window.document.body.appendChild(bg_dom);
		window.document.body.appendChild(msg_dom);
		bg_dom.setAttribute("state", "in");
		msg_dom.setAttribute("state", "in");
		setTimeout(function() {
			bg_dom.setAttribute("state", "out");
			msg_dom.setAttribute("state", "out");
			setTimeout(function() {
				document.body.removeChild(bg_dom);
				document.body.removeChild(msg_dom);
				window.document.body.style.overflow = "auto"
			}, 1000)
		}, 1000 + t_config.duration);
	}
})(styzy)