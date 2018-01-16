(function() {
	var bookmarkid = 'ytumagaramazon';
	var title = document.title;
	var url = location.href;
	if (location.href.match(/\.amazon\..*\/dp\/|\.amazon\..*\/gp\/|\.amazon\..*\/ASIN\//)) {
		var ids = {
			'priceblock_dealprice': 'タイムセール特価',
			'priceblock_saleprice': 'セール品',
			'priceblock_ourprice': '',
			'actualPriceValue': '',
		};
		var amzpage = amazonShorter(ids);
		if (typeof amzpage !== 'undefined') {
			title = amzpage.title;
			url = amzpage.url;
		}
	} else if (/GroupProfilePage.*g=/.test(location.href)) {
		console.log('hoge hoge');
	}
	url = reduceURL(url, /amazon\.co.*\/(dp\/[\d\D]{10})/, 1);
	console.log(title + ':' + url);
	title = prompt('Title:', title);
	if (title !== null && title !== '') {
		location.href = 'http://pllk.net/add.php?id=' + bookmarkid + '&title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(location.href);
	}

	function reduceURL(url, regexp, idPos) {
		var matched = url.match(regexp);
		if (matched !== null) {
			url = location.protocol + '//' + location.host + '/' + matched[idPos];
		}
		return url;
	}

	function amazonShorter(ids) {
		var price;
		var titleSel = 'span#productTitle,span#title';
		var titleEl = document.querySelector(titleSel);
		if (titleEl !== undefined) {
			title = titleEl.innerText;
		} else {
			title = document.title;
		}
		var asin = location.href.match(/(aw\/d|dp|gp\/product)\/(\w{10})/)[2];
		var url = 'http://amazon.jp/dp/' + asin;
		for (var i in ids) {
			console.log(i);
			price = document.getElementById(i);
			if (price !== null) {
				title = title + ":" + price.innerText.replace(/\s/g, '').match(/^.*\d{2}/);
				break;
			}
		}
		return {
			'title': title,
			'url': url
		};
	}
})()
