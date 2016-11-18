/**
 * Created by STYZY on 2016/09/20.
 * Update by STYZY on 2016/10/31.
 */

/**
 * 使用说明:
 * 
 * Dom属性绑定:
 * tab 识别属性：styzy-st-tab="i"
 * btn 识别属性：styzy-st-btn="i"
 * btn 回到顶部属性：styzy-st-autoTop="1"
 * btn 切换验证函数: styzy-st-vaildate="fn"
 * 
 * 对外接口方法：
 * 1.初始化
<script type="text/javascript">
	var tab = new styzy.SwitchTab();
	tab.InitSwitchTab({
		btnList: list,
		tabList: list,
		selectClassName:'select',
		initIndex: 1,
	});
</script>
 * 
 * 2.手动跳转
 * tab.DoSwitchTab(index);
 * 
 */

if(typeof(styzy) == "undefined") {
	var styzy = new Object;
} else {
	var styzy = styzy;
}

(function(styzy) {
	var otherOnload = window.onload;
	if(typeof(otherOnload) != "undefined" && otherOnload != null) {
		window.onload = function() {
			otherOnload();
			styzy.t.insideSt = new styzy_SwitchTab();
			styzy.t.insideSt.InitSwitchTab({
				initIndex: 1
			});
		}
	} else {
		window.onload = function() {
			styzy.t.insideSt = new styzy_SwitchTab();
			styzy.t.insideSt.InitSwitchTab({
				initIndex: 1
			});
		}
	}
	styzy.SwitchTab = styzy_SwitchTab;
	//构造函数
	function styzy_SwitchTab() {
		var $switch = this;
		var cache_switch = {
			btnList: document.querySelectorAll("[styzy-st-btn]"),
			tabList: document.querySelectorAll("[styzy-st-tab]"),
			currentTabIndex: 1,
			initIndex: 1,
			selectClassName: 'select',
			loadFlag: false,
			btnFlag: false
		}
		$switch.InitSwitchTab = function(cfg) {
			if(typeof(cfg) != "undefined") {
				cache_switch = {
					btnList: (typeof(cfg.btnList) == "undefined" || cfg.btnList == null) ? cache_switch.btnList : cfg.btnList,
					tabList: (typeof(cfg.tabList) == "undefined" || cfg.tabList == null) ? cache_switch.tabList : cfg.tabList,
					initIndex: (typeof(cfg.initIndex) == "undefined" || cfg.initIndex == null) ? cache_switch.initIndex : cfg.initIndex,
					selectClassName: (typeof(cfg.selectClassName) == "undefined" || cfg.selectClassName == null) ? cache_switch.selectClassName : cfg.selectClassName,
					loadFlag: (typeof(cfg.loadFlag) == "undefined" || cfg.loadFlag == null) ? cache_switch.loadFlag : cfg.loadFlag
				}
				cache_switch.currentTabIndex = cache_switch.initIndex;
			}
			for(var i = 0; i < cache_switch.tabList.length; i++) {
				if(cache_switch.tabList[i].getAttribute("styzy-st-tab") != cache_switch.currentTabIndex) {
					cache_switch.tabList[i].style.display = "none";
				}
			}
			for(var i = 0; i < cache_switch.btnList.length; i++) {
				cache_switch.btnList[i].onclick = function() {
					if(cache_switch.loadFlag) {
						if(cache_switch.btnFlag) {
							return false;
						}
						cache_switch.btnFlag = true;
						setTimeout(function() {
							cache_switch.btnFlag = false;
						}, 1000);
					}
					if(this.getAttribute("styzy-st-btn") == cache_switch.currentTabIndex) {
						return false;
					} else {
						if(typeof(this.getAttribute("styzy-st-vaildate")) != "undefined" && this.getAttribute("styzy-st-vaildate") != null) {
							var vaildateFun = eval(this.getAttribute("styzy-st-vaildate"));
							if(!vaildateFun) {
								return false;
							}
						}
						cache_switch.currentTabIndex = this.getAttribute("styzy-st-btn")
					}
					var btnIndex = this.getAttribute("styzy-st-btn");
					$switch.DoSwitchTab(btnIndex)
				}
			}
		};
		$switch.DoSwitchTab = function(btnIndex) {
			for(var i = 0; i < cache_switch.tabList.length; i++) {
				var tabIndex = cache_switch.tabList[i].getAttribute("styzy-st-tab");
				if(tabIndex == btnIndex) {
					cache_switch.tabList[i].style.display = "block";
				} else {
					cache_switch.tabList[i].style.display = "none";
				}
			}
			for(var i = 0; i < cache_switch.btnList.length; i++) {
				var thisBtnIndex = cache_switch.btnList[i].getAttribute("styzy-st-btn");
				if(thisBtnIndex == btnIndex) {
					cache_switch.btnList[i].setAttribute('class', cache_switch.btnList[i].getAttribute('class') + ' ' + cache_switch.selectClassName);
				} else {
					cache_switch.btnList[i].setAttribute('class', cache_switch.btnList[i].getAttribute('class').slice(0, (cache_switch.btnList[i].getAttribute('class').length - cache_switch.selectClassName.length) - 1));

				}
				if(cache_switch.btnList[btnIndex - 1].getAttribute("styzy-st-autoTop") == "1") {
					document.body.scrollTop = 0;
				}
			}
		}
	}
})(styzy);