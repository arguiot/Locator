const $ = new DisplayJS(window);
const db = require("localstoragedb")("Locator", localStorage);
if( db.isNew() ) {
	db.createTable("url", ["url", "notes"])
	db.commit()
}
$.ready(() => {
	const { remote } = require('electron');
	remote.getCurrentWindow().setSize(800, 500);
})
const rows = db.queryAll("url");
if (!rows[0]) {
	$.after(".collection", "Empty")
} else {
	for (let i of rows) {
		var getTitleAtUrl = require('get-title-at-url');
		getTitleAtUrl(i.url, title => {
			$.single(".collection").innerHTML +=
			`<li class="collection-item avatar">
				<a onclick="require('electron').shell.openExternal('${i.url}')" id="${i.ID}" class="li">
					<img src="http://www.google.com/s2/favicons?domain=${i.url}" alt="" class="circle">
					<span class="title">${title}</span>
					<p>
						${i.notes}
					</p>
					<a href="#!" class="secondary-content delete" id="${i.ID}"><i class="material-icons">delete</i></a>
				</a>
			</li>`
		})
	}
}
$.all(".delete", el => {
	$.on(el, "click", e => {
		const el = event.targe || event.srcElement;
		db.deleteRows("url", {ID: el.parentNode.getAttribute("id")})
		db.commit()
		$.remove($.parent($.toNodeList(el), 1))
	})
})
