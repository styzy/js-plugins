/**
 * Created by STYZY on 2016/10/26.
 * Update by STYZY on 2016/10/26.
 */

/**
 * 使用说明：
 * 年：
 * <select name="" type="year" from="1990" to="2020"></select>
 * 月：
 * <select name="" type="month"></select>
 * 日：
 * <select name="" type="day"></select>
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
			typeDate();
		}
	} else {
		window.onload = function() {
			typeDate();
		}
	}

	function typeDate() {
		yearPlugin();
		monthPlugin();
		dayPlugin();
	}

	function yearPlugin() {
		var yearSelectors = [];
		var selects = document.getElementsByTagName('select');
		for(var i = 0; i < selects.length; i++) {
			if(selects[i].getAttribute('type') == 'year') {
				yearSelectors.push(selects[i])
			}
		}
		for(var i = 0; i < yearSelectors.length; i++) {
			var yearBegin = parseInt(yearSelectors[i].getAttribute('from'));
			var yearEnd = parseInt(yearSelectors[i].getAttribute('to'));
			for(var j = yearBegin; j <= yearEnd; j++) {
				var thisOption = new Option(j);
				thisOption.setAttribute('value', j)
				yearSelectors[i].add(thisOption)
			}

		}
	}

	function monthPlugin() {
		var monthSelectors = [];
		var selects = document.getElementsByTagName('select');
		for(var i = 0; i < selects.length; i++) {
			if(selects[i].getAttribute('type') == 'month') {
				monthSelectors.push(selects[i])
			}
		}
		for(var i = 0; i < monthSelectors.length; i++) {
			for(var j = 1; j <= 12; j++) {
				var thisOption = new Option(j + '月');
				if(j.toString().length <= 1) {
					var value = '0' + j.toString();
				} else {
					var value = j.toString();
				}
				thisOption.setAttribute('value', value)
				monthSelectors[i].add(thisOption)
			}

		}
	}

	function dayPlugin() {
		var daySelectors = [];
		var selects = document.getElementsByTagName('select');
		for(var i = 0; i < selects.length; i++) {
			if(selects[i].getAttribute('type') == 'day') {
				daySelectors.push(selects[i])
			}
		}
		var dayPlugins = []
		for(var i = 0; i < daySelectors.length; i++) {
			var plugin = new dayPluginFc(daySelectors[i])
			dayPlugins.push(plugin)
		}

	}

	function dayPluginFc(selector) {
		selector.style.overflow = 'hidden';
		if(selector.getAttribute('class') == null) {
			selector.setAttribute('class', 'styzy-typeDate-daySelect')
		} else {
			selector.setAttribute('class', selector.getAttribute('class') + ' ' + 'styzy-typeDate-daySelect')
		}
		var dayCtn = document.createElement('div');
		var p = absPos(selector);
		var h = selector.offsetHeight;
		var w = selector.offsetWidth;
		dayCtn.setAttribute('style', 'display:none;position: absolute;top: ' + (p.y + h) + 'px;left: ' + p.x + 'px;width: ' + w + 'px;background-color: #FFFFFF;z-index: 600;');
		var table = document.createElement('table')
		table.setAttribute('class', 'styzy-typeDate-table');
		var styleText = '.styzy-typeDate-daySelect option{display:none;outline-style:none;} .styzy-typeDate-table {display:table;width:100%;border-spacing: 0;table-layout: fixed;border-top: 1px solid #FAFBFC;border-left: 1px solid #FAFBFC;}.styzy-typeDate-table tr{display:table-row;} .styzy-typeDate-table td{display:table-cell;border-right: 1px solid #FAFBFC;border-bottom: 1px solid #FAFBFC;text-align: center;color:#888888;font-size: 12px;line-height:24px;cursor:pointer;margin:0;padding:0;-moz-user-select: none;-ms-user-select: none;-webkit-user-select: none;}.styzy-typeDate-table td:hover{background-color:#3A75B4;color:#FFFFFF;}.styzy-typeDate-table td.empty:hover{background-color:#FFFFFF;color:#888888;cursor:auto;}'
		var styleElement = document.head.getElementsByTagName('style');
		if(styleElement.length <= 0) {
			styleElement = document.createElement('style')
			styleElement.innerHTML = styleText;
			document.head.appendChild(styleElement)
		} else {
			styleElement.innerHTML = styleElement.innerHTML + styleText;
		}
		var tr = document.createElement('tr');
		for(var k = 1, selector = selector; k <= 31; k++) {
			var td = document.createElement('td');
			td.innerHTML = k;
			td.onclick = function() {
				addToValue(this, selector);
			}
			tr.appendChild(td)
			if(k != 0 && (k % 7) == 0) {
				table.appendChild(tr);
				tr = document.createElement('tr');
			}
			if(k == 31) {
				var emptyTd = document.createElement('td');
				emptyTd.setAttribute('colspan', '4')
				emptyTd.setAttribute('class', 'empty')
				tr.appendChild(emptyTd);
				table.appendChild(tr);
			}
		}
		dayCtn.appendChild(table);
		selector.parentNode.appendChild(dayCtn)
		selector.onclick = function() {
			if(dayCtn.style.display == 'none') {
				dayCtn.style.display = 'block';
				this.onblur = function() {
					setTimeout(function() {
						dayCtn.style.display = 'none';
					}, 200)
				}
			} else {
				setTimeout(function() {
					dayCtn.style.display = 'none';
				}, 200)
			}
		}

		function addToValue(td, selector) {
			var thisOption = new Option(td.innerHTML);
			thisOption.setAttribute('value', td.innerHTML);
			selector.innerHTML = null;
			selector.add(thisOption)
		}
	}

	function absPos(node) {
		var x = y = 0;
		do {
			x += node.offsetLeft;
			y += node.offsetTop;
		} while (node = node.offsetParent);
		return {
			'x': x,
			'y': y
		};
	}
})()