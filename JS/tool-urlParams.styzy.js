/**
* Created by Tprince on 2016/08/20.
* Update by Tprince on 2016/08/20.
*/


function GetRequestUrl() {
	var url = window.location.href;
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(url.indexOf("?") + 1);
		if(str.indexOf("#") > 0) {
			str = str.replace(str.substr(str.indexOf("#")), "");
		}
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
		}
	}
	return theRequest
}