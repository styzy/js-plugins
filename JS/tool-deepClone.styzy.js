/**
 * Desc DeepClone 
 * Created by STYZY on 2016/11/03.
 * Update by STYZY on 2016/11/03.
 */

if(typeof(styzy) == "undefined") {
	var styzy = new Object;
} else {
	var styzy = styzy;
}
(function(styzy) {
	styzy.deepClone = DeepClone;
	//深度克隆
	function DeepClone(obj) {
		var result, oClass = isClass(obj);
		//确定result的类型
		if(oClass === "Object") {
			result = {};
		} else if(oClass === "Array") {
			result = [];
		} else {
			return obj;
		}
		for(key in obj) {
			var copy = obj[key];
			if(isClass(copy) == "Object") {
				result[key] = arguments.callee(copy); //递归调用
			} else if(isClass(copy) == "Array") {
				result[key] = arguments.callee(copy);
			} else {
				result[key] = obj[key];
			}
		}
		return result;
	}
	//返回传递给他的任意对象的类
	function isClass(o) {
		if(o === null) return "Null";
		if(o === undefined) return "Undefined";
		return Object.prototype.toString.call(o).slice(8, -1);
	}
	var oPerson = {
		oName: "rookiebob",
		oAge: "18",
		oAddress: {
			province: "beijing"
		},
		ofavorite: [
			"swimming", {
				reading: "history book"
			}
		],
		skill: function() {
			console.log("bob is coding");
		}
	};
})(styzy)