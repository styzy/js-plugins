/**
 * Log调试工具
 * Created by STYZY on 2016/12/02.
 * Update by STYZY on 2016/12/02.
 */

/**
 * 使用说明
 * 1.自带调试输出
 * 打开调试模式
 * styzy.debug(true)
 * 关闭调试模式
 * styzy.debug(false)
 * 使用log
 * styzy.log()
 * 2.默认console.log开关
 * 关闭
 * styzy.consoleLog(false)
 * 打开
 * styzy.consoleLog(true)
 */

if(typeof(styzy) == "undefined") {
	var styzy = new Object;
} else {
	var styzy = styzy;
}

(function(styzy) {
	styzy.debug = SwitchDebugMode;
	styzy.consoleLog = SwitchConcoleLog;
	styzy.log = NoLog;
	var debugConfig = {
		mode: false,
		consoleLogMode:true
	}
	var consoleLog = console.log;  
	
	function SwitchDebugMode(boolean) {
		debugConfig.mode = boolean
		if(debugConfig.mode) {
			console.log('打开调试模式')
			styzy.log = console.log;
		} else {
			styzy.log = NoLog;
			console.log('关闭调试模式')
		}
	}

	function NoLog() {
	}
	
	function SwitchConcoleLog(boolean){
		debugConfig.consoleLogMode = boolean;
		if (!debugConfig.consoleLogMode) {
			console.log('关闭默认控制台输出')
			console.log = NoLog;
		}
		else{
			console.log = consoleLog;
			console.log('打开默认控制台输出')
		}
	}
})(styzy)