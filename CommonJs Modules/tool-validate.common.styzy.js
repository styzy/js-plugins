/**
 * Desc 表单验证插件
 * Created by STYZY on 2016/11/17.
 * Update by STYZY on 2016/11/17.
 */

/**
 * 使用说明：
 *  styzy.validate({
		selector: '#container', //选择器，选择当前节点下的所有有标识的input
		flagName: 'v-check', //标识，插件只检测带有标识的input
		typeName: 'v-type', //验证类别，目前有 name、idcard、phone、mobile、email,不使用表示只验证非空
		labelName: 'v-name', //输出信息的关键信息，姓名、手机号等
		passName: 'v-pass', //跳过标识，表示当前的input不需要验证
		//成功后的回调函数
		success: function() {
				alert('验证成功,全部通过');
			},
		//出现验证不通过的情况下，调用的提示插件接口，msg为错误信息的注入变量
		error: function(msg) {
				alert(msg);
			}
		});
 */

var styzy = {}
styzy.validate = Validate;

function Validate(config) {
		config = {
			selector: typeof(config.selector) != "undefined" ? config.selector : 'html',
			flagName: typeof(config.flagName) != "undefined" ? config.flagName : 'styzy-validate',
			typeName: typeof(config.typeName) != "undefined" ? config.typeName : 'styzy-validate-typeName',
			labelName: typeof(config.labelName) != "undefined" ? config.labelName : 'styzy-validate-labelName',
			passName: typeof(config.passName) != "undefined" ? config.passName : 'styzy-validate-pass',
			success: typeof(config.success) != "undefined" ? config.success : null,
			error: typeof(config.error) != "undefined" ? config.error : null,
		}
		this.v_list = document.querySelector(config.selector).querySelectorAll('[' + config.flagName + ']');
		for(var i = 0; i < this.v_list.length; i++) {
			var obj = this.v_list[i];
			if(obj.getAttribute(config.passName) != null) {
				continue;
			}
			var value;
			if(String.hasOwnProperty('trim')) {
				value = obj.value.trim();
			} else {
				value = obj.value.replace(/(\s*$)/g, "");
			}
			var isValid = false;
			//验证非空
			switch(obj.tagName) {
				case 'INPUT':
					if(value.length <= 0) {
						ErrorHandle('empty', obj.getAttribute(config.labelName))
						return false;
					}
					break;
				case 'SELECT':
					break;
				default:
					break;
			}
			//验证是否合法
			if(obj.getAttribute(config.typeName)) {
				switch(obj.getAttribute(config.typeName)) {
					case 'name':
						isValid = NameValidator(value);
						break;
					case 'idcard':
						isValid = IdcardValidator(value);
						break;
					case 'phone':
						isValid = PhoneValidator(value);
						break;
					case 'mobile':
						isValid = MobileValidator(value);
						break;
					case 'email':
						isValid = EmailValidator(value);
						break;
					default:
						ErrorHandle('unknowType', obj.getAttribute(config.labelName))
						return false;
						break;
				}
			} else {
				continue;
			}
			if(!isValid) {
				ErrorHandle('illegal', obj.getAttribute(config.labelName))
				return false;
			}
			isValid = false;
		}
		config.success();

	function NameValidator(value) {
		var reg = /^[\u4E00-\u9FA5]+$/;
		if(value.length < 2 || value.length > 5) {
			return false;
		}
		if(!reg.test(value)) {
			return false;
		} else {
			return true;
		}
	}

	function PhoneValidator(value) {
		var reg = /^((0\d{2,3})-)?(\d{7,8})$/
		if(!reg.test(value)) {
			return false;
		} else {
			return true;
		}
	}

	function MobileValidator(value) {
		var len = value.length;
		if(len != 11) {
			return false;
		}
		var reg = /^1\d{10}$/;
		if(reg.test(value)) {
			return true;
		} else {
			return false;
		}
	}

	function EmailValidator(value) {
		var reg = /\w@\w*\.\w/;
		if(!reg.test(value)) {
			return false;
		} else {
			return true;
		}
	}

	function IdcardValidator(obj) {
		//校验长度，类型 
		if(isCardNo(obj) === false) {
			return false;
		}
		//检查省份 
		if(checkProvince(obj) === false) {
			return false;
		}
		//校验生日 
		if(checkBirthday(obj) === false) {
			return false;
		}
		//检验位的检测 
		if(checkParity(obj) === false) {
			return false;
		}
		return true;

		//检查号码是否符合规范，包括长度，类型 
		function isCardNo(obj) {
			//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
			var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
			if(reg.test(obj) === false) {
				return false;
			}
			return true;
		};
		//取身份证前两位,校验省份 
		function checkProvince(obj) {
			//省份代码
			var vcity = {
				11: "北京",
				12: "天津",
				13: "河北",
				14: "山西",
				15: "内蒙古",
				21: "辽宁",
				22: "吉林",
				23: "黑龙江",
				31: "上海",
				32: "江苏",
				33: "浙江",
				34: "安徽",
				35: "福建",
				36: "江西",
				37: "山东",
				41: "河南",
				42: "湖北",
				43: "湖南",
				44: "广东",
				45: "广西",
				46: "海南",
				50: "重庆",
				51: "四川",
				52: "贵州",
				53: "云南",
				54: "西藏",
				61: "陕西",
				62: "甘肃",
				63: "青海",
				64: "宁夏",
				65: "新疆",
				71: "台湾",
				81: "香港",
				82: "澳门",
				91: "国外"
			};
			var province = obj.substr(0, 2);
			if(vcity[province] == undefined) {
				return false;
			}
			return true;
		};
		//检查生日是否正确 
		function checkBirthday(obj) {
			var len = obj.length;
			//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字 
			if(len == '15') {
				var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
				var arr_data = obj.match(re_fifteen);
				var year = arr_data[2];
				var month = arr_data[3];
				var day = arr_data[4];
				var birthday = new Date('19' + year + '/' + month + '/' + day);
				return verifyBirthday('19' + year, month, day, birthday);
			}
			//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X 
			if(len == '18') {
				var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
				var arr_data = obj.match(re_eighteen);
				var year = arr_data[2];
				var month = arr_data[3];
				var day = arr_data[4];
				var birthday = new Date(year + '/' + month + '/' + day);
				return verifyBirthday(year, month, day, birthday);
			}
			return false;
		};
		//校验日期 
		function verifyBirthday(year, month, day, birthday) {
			var now = new Date();
			var now_year = now.getFullYear();
			//年月日是否合理 
			if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
				//判断年份的范围（3岁到100岁之间) 
				var time = now_year - year;
				if(time >= 0 && time <= 130) {
					return true;
				}
				return false;
			}
			return false;
		};
		//校验位的检测 
		function checkParity(obj) {
			//15位转18位 
			obj = changeFivteenToEighteen(obj);
			var len = obj.length;
			if(len == '18') {
				var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
				var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
				var cardTemp = 0,
					i, valnum;
				for(i = 0; i < 17; i++) {
					cardTemp += obj.substr(i, 1) * arrInt[i];
				}
				valnum = arrCh[cardTemp % 11];
				if(valnum == obj.substr(17, 1)) {
					return true;
				}
				return false;
			}
			return false;
		};
		//15位转18位身份证号 
		function changeFivteenToEighteen(obj) {
			if(obj.length == '15') {
				var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
				var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
				var cardTemp = 0,
					i;
				obj = obj.substr(0, 6) + '19' + obj.substr(6, obj.length - 6);
				for(i = 0; i < 17; i++) {
					cardTemp += obj.substr(i, 1) * arrInt[i];
				}
				obj += arrCh[cardTemp % 11];
				return obj;
			}
			return obj;
		};
	}

	function ErrorHandle(type, name) {
		var msg = ''
		if(arguments.length = 2) {
			switch(type) {
				case 'empty':
					msg = name + '不能为空';
					break;
				case 'illegal':
					msg = '请输入正确的' + name;
					break;
				case 'unknowType':
					msg = '验证类型未知，验证目标名称：' + name;
					break;
				default:
					msg = '非法输入';
					break;
			}
		}
		config.error(msg);
	}
}

export default styzy