const $ = new DisplayJS(window);
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
	alert(`URL = ${newLink}\nNotes = ${newNote}`)
	first = true;
	note = false;
	done = false
	$.valEmpty(".link")
	$.valEmpty(".notes")
	$.var();
})
