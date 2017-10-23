const $ = new DisplayJS(window);
const db = require("localstoragedb")("Locator", localStorage);
if( db.isNew() ) {
	db.createTable("url", ["url", "notes"])
	db.commit()
}
var first = true;
var note = false;
var done = false
$.target(() => {
	if(new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})").test(newLink)) {
		first = false
		note = true
		done = true
	}
	$.var();
})
$.var();
$.on(".done", "click", e => {
	e.preventDefault();
	const data = {
		url: newLink,
		notes: newNote
	}
	db.insert("url", data);
	db.commit();
	first = true;
	note = false;
	done = false
	$.valEmpty(".link")
	$.valEmpty(".notes")
	$.var();
})
$.on(".show", "click", e => {
	e.preventDefault();
	$.html(".add", "Loading...")
	const path = require('path')
	const url = require('url')
	const { remote } = require('electron')
	remote.getCurrentWindow().loadURL(url.format({
      pathname: path.join(__dirname, '/list.html'),
      protocol: 'file:',
      slashes: true
    }))
})
