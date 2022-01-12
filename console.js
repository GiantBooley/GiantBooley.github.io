var bobconhist = [];
var bobconhistpos = -1;
var bobconhisttem = "";
var bobconcon = document.createElement("div");
var bobcon = document.createElement("textarea");
var bobconx = document.createElement("button");
var bobconbar = document.createElement("div");
var bobconout = document.createElement("div");
var bobconcomout = "";
bobcon.setAttribute("spellcheck", "false");
bobconout.style="width: 100%; height: 180px; border: none; position: absolute; text-align: left; top: 26px; font-family: monospace; overflow: auto;";
bobconbar.style="position: absolute; top: 0px; width: 100%; height: 26px; border: 1px solid black;";
bobconx.style="position: absolute; right: 0px;";
bobconx.innerHTML = "X";
bobconout.innerHTML = "<hr>";
function bobconencode(what) {
	return what.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
		return '&#'+i.charCodeAt(0)+';';
	});
};
function bobconaddlin(lin) {
	bobconout.innerHTML = `${bobconout.innerHTML}<br>${lin}<hr>`;
};
function bobconret(ret) {};
bobconx.onclick = function(){
	bobconcon.remove();
};
console.bobconoldlog = console.log;
console.bobconoldclear = console.clear;
console.log = function(value){
	console.bobconoldlog(value);
	setTimeout(()=>{
		bobconout.innerHTML = `${bobconout.innerHTML+value}<hr>`;
	}, 10);
};
console.clear = function(){
	console.bobconoldclear();
	setTimeout(()=>{
		bobconout.innerHTML = "<hr>Console was cleared.<hr>";
	}, 10);
};
var bobconerr = 0;
bobcon.onkeydown = function(e){
	if ((e.code == "Enter") && !e.shiftKey) {
		bobconerr = 0;
		e.preventDefault();
		try {
			bobconcomout = eval.call(window, bobcon.value);
		}
		catch (error) {
			bobconcomout = '<span style="color: red">'+error+'</span>';
			bobconerr = 1;
		}
		if ((typeof bobconcomout) == "string" && bobconerr == 0) {
			bobconcomout = "\""+bobconcomout+"\"";
		} else if ((typeof bobconcomout) == "object") {
			if (Array.isArray(bobconcomout)) {
				bobconcomout = "Array("+bobconcomout.length+") "+JSON.stringify(bobconcomout);
			} else {
				bobconcomout = "Object "+JSON.stringify(bobconcomout);
			};
		};
		bobconout.innerHTML = `${bobconout.innerHTML}» ${bobcon.value}<br>🡸 ${bobconcomout}<hr>`;
		bobconout.scrollTo(0, bobconout.scrollHeight);
		bobconhistpos = -1;
		bobconhist.unshift(bobcon.value);
		bobcon.value="";
	} else if (e.code == "ArrowUp") {
		e.preventDefault();
		if (bobconhist[bobconhistpos+1] !== undefined) {
			if (bobconhistpos == -1) {
				bobconhisttem = bobcon.value;
			};
			bobconhistpos++;
			bobcon.value = bobconhist[bobconhistpos];
		};
	} else if (e.code == "ArrowDown") {
		e.preventDefault();
		if (bobconhistpos > 0) {
			bobconhistpos = bobconhistpos-1;
			bobcon.value = bobconhist[bobconhistpos];
		} else if (bobconhistpos == 0) {
			bobcon.value = bobconhisttem;
			bobconhistpos = -1;
		};
	} else if (e.code == "Tab") {
		e.preventDefault();
		bobcon.value = bobcon.value.substring(0,bobcon.selectionStart)+"\t"+bobcon.value.substring(bobcon.selectionStart,bobcon.value.length);
	};
};
bobcon.style = "width: 100%; position: absolute; resize: none; bottom: 0px; left: 0px;";
bobcon.rows="4";
bobconcon.style="position: fixed; width: 100%; height: 300px; border: 1px solid black; background-color: #f7f7f7; bottom: 0px; left: 0px;";
document.body.appendChild(bobconcon);
bobconcon.appendChild(bobcon);
bobconbar.appendChild(bobconx);
bobconcon.appendChild(bobconbar);
bobconcon.appendChild(bobconout);
