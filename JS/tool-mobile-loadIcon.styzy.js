/**
 * Created by STYZY on 2016/11/23.
 * Update by STYZY on 2016/11/23.
 */

if(typeof(styzy) == "undefined") {
	var styzy = new Object;
} else {
	var styzy = styzy;
}

(function(styzy) {
	
	//判断是否使用JQ
	if(typeof($) != "undefined") {
		$(function() {
			pluginOnload();
		})
	} else {
		var otherOnload = window.onload;
		if(typeof(otherOnload) != "undefined" && otherOnload != null) {
			window.onload = function() {
				otherOnload();
				pluginOnload();
			}
		} else {
			window.onload = function() {
				pluginOnload();
			}
		}
	}

	//操作
	function pluginOnload() {
		//插入样式
		var headDom = document.getElementsByTagName('head')[0];
		var styleDom = document.createElement("style");
		var imgBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABw0lEQVRIS+VW21ECQRDsjkCMQDNQI1AjECNQIlAjUCIQIhAiECMQMyADCUEjaKuphTrO22WXOuHD+aHq2O2eR8/OEHsy7okXxcSSugBeAHSC018AeiQnJUEUEUu6APAeIbgkOc0lLyUeALiLgA9J3rdCLMlABwDmJMeSHNF5BPyDpDOSZdGIJc0AnFRQRsBCEzcR5DHJ2yzWAPTrrCQDWEB1GyZSbYHZuSxrjFjSE4DHBoQegNMG8rX6SpqQtPqjFiP2pdeGW2ckZ5JMvmonf8sKs3IoVWOnrVrPPklnohVLtlOIzEqdbhNVdqolHYfa+tcvkmuX/SiUpGIt4oYWMrnrOi8BzTm7Ig7RfjYpuaRNqvfDu+7uuK47vwtiC7IbJbankpzSo4rX3+7bP011ILaoPAjco67vYCfiyhFFW2c29bGj96BwH/fbIjVO6uWqz94Hkv6WtLAseGa/pbqhZCxmzVsPCABX1gjJw5iXKeIlwPLu2lsdetRLgiOzEBcWRqozM0ptJCliK9uDwm/1Goik6gApWnmWDhbtXJWoqttJVgnqKd+W2LvYcwDLEl0rxKGWLkVn21dtq4g3tVTO//+P+AcGYbAft9062AAAAABJRU5ErkJggg==';
		var styleText = "#styzy-load-icon{position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 30px;height: 30px;padding: 5px;background: url('" + imgBase64 + "') no-repeat center;background-color: rgba(0, 0, 0, 0.4);border-radius: 50%;animation: styzy-load-rotate 1.8s linear infinite;-webkit-animation: styzy-load-rotate 1.8s linear infinite;-moz-animation: styzy-load-rotate 1.8s linear infinite;-ms-animation: styzy-load-rotate 1.8s linear infinite;-o-animation: styzy-load-rotate 1.8s linear infinite;}@keyframes styzy-load-rotate{from{transform: rotate(0deg);-ms-transform: rotate(0deg);-moz-transform: rotate(0deg);-webkit-transform: rotate(0deg);-o-transform: rotate(0deg);}to{transform: rotate(360deg);-ms-transform: rotate(360deg);-moz-transform: rotate(360deg);-webkit-transform: rotate(360deg);-o-transform: rotate(360deg);}}@-webkit-keyframes styzy-load-rotate{from{transform: rotate(0deg);-ms-transform: rotate(0deg);-moz-transform: rotate(0deg);-webkit-transform: rotate(0deg);-o-transform: rotate(0deg);}to{transform: rotate(360deg);-ms-transform: rotate(360deg);-moz-transform: rotate(360deg);-webkit-transform: rotate(360deg);-o-transform: rotate(360deg);}}@-moz-keyframes styzy-load-rotate{from{transform: rotate(0deg);-ms-transform: rotate(0deg);-moz-transform: rotate(0deg);-webkit-transform: rotate(0deg);-o-transform: rotate(0deg);}to{transform: rotate(360deg);-ms-transform: rotate(360deg);-moz-transform: rotate(360deg);-webkit-transform: rotate(360deg);-o-transform: rotate(360deg);}}@-ms-keyframes styzy-load-rotate{from{transform: rotate(0deg);-ms-transform: rotate(0deg);-moz-transform: rotate(0deg);-webkit-transform: rotate(0deg);-o-transform: rotate(0deg);}to{transform: rotate(360deg);-ms-transform: rotate(360deg);-moz-transform: rotate(360deg);-webkit-transform: rotate(360deg);-o-transform: rotate(360deg);}}";
		styleDom.innerHTML = styleText;
		headDom.appendChild(styleDom);
		//操作
		var bodyDom = document.getElementsByTagName('body')[0];
		var loadDom = document.createElement("div");
		loadDom.setAttribute('id', 'styzy-load-icon');
		var loadIconController = {
			start: function() {
				Append();
			},
			stop: function() {
				Remove();
			}
		}

		function Append() {
			var oldLoadDom = document.getElementById("styzy-load-icon");
			if(oldLoadDom) {
				//已存在
				return false;
			}
			bodyDom.appendChild(loadDom)
		};

		function Remove() {
			var oldLoadDom = document.getElementById("styzy-load-icon");
			if(!oldLoadDom) {
				//不存在
				return false;
			}
			bodyDom.removeChild(loadDom);
		}
		styzy.loadIcon = loadIconController;
	};
})(styzy)