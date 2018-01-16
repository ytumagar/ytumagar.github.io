(function() {
	console.log('CopyURL : ');
	var href = location.href;
	var url;
	if (/^(http.*salesforce\.com\/).*fId=(\w{15})/.test(href)){
		url = RegExp.$1 + RegExp.$2;
	} else if (/\/org62.*\/(069\w{12})|sObject\/(\w{15})|GroupProfilePage\?g=(\w{15})/.test(href)){
		url = location.origin + '/' + RegExp.$1 + RegExp.$2 + RegExp.$3;
		document.title =  document.title.replace(" | Salesforce", "");
	} else if (location.host.includes('amazon') && /(\/dp\/[A-Za-z0-9]{10})/.test(location.href)){
		url = location.origin + RegExp.$1;
	} else {
		url = href;
	}

	var str = document.title.replace(/\s~\sSalesforce.*Edition$/i, "") + "\n" + url;
	var selStr = window.getSelection().toString();
	var ele = document.createElement("textarea");
	var deleteElement = function(ele){
		if(ele.parentElement!=null){
			ele.parentNode.removeChild(ele);
		}
	};

	ele.id = "urltitle";
	ele.style.width = "100%";
	ele.style.zIndex = "999";
	ele.style.position = "relative";
	ele.value = str + "\n" + selStr;
	document.body.insertBefore(ele, document.body.firstChild);
	ele.style.height = ele.scrollHeight + "px";
	window.scroll(0, 0);
	ele.focus();
	ele.select();
	ele.ondblclick = deleteElement;
	ele.onkeyup = function(e) {
		if (e.keyCode == 27) {
			deleteElement(this);
		}
	};
	ele.oncopy = function() {
		setTimeout(deleteElement, 1, this);
		return true;
	};
})()
