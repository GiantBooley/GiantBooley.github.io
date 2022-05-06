javascript:(()=>{
	let oldbobcon = typeof bobcon == "object" ? {...bobcon} : {};
	var bobcon = {
		history: [],
		historyPos: -1,
		historyTemp: "",

		container: document.createElement("div"),
		console: document.createElement("textarea"),
		x: document.createElement("button"),
		bar: document.createElement("div"),
		output: document.createElement("div"),

		encode: what => what.replace(/[\u00A0-\u9999<>\&]/g, i => `&#${i.charCodeAt(0)};`),
		addLine: line => bobcon.output.innerHTML += `<br>${line}<hr>`,
		error: e => `<pre style="color:red;display:inline;background-color:#FFDDDD;">Uncaught ${e.stack.replaceAll("    ", "        ")}</pre>`,
		mapArray: function(array, mapFunction){
			let newArray = [...array];
			for (let i = 0; i < array.length; i++) {
				newArray[i] = mapFunction(newArray[i]);
			};
			return newArray;
		},
		convertOutput: function convertOutput(variable){
			switch (typeof tempout) {
				case "string":
					return `"${variable}"`;
					break;
				case "object":
					try {
						if (Array.isArray(variable)) {
							return `Array(${variable.length}) [${bobcon.mapArray(variable, it => convertOutput(it)).join(", ")}]`;
						} else if (variable === null) {
							return "null";
						} else {
							return variable + " " + JSON.stringify(variable);
						};
					} catch (e) {console.log(bobcon.error(e))};
					break;
				case "bigint":
					return variable.toString() + "n";
					break;
				case "undefined":
					return "undefined";
			};
		},
		...oldbobcon
	};

	bobcon.console.spellcheck = false;
	bobcon.output.style = `
		width: 100%;
		height: 180px;
		border: none;
		position: absolute;
		text-align: left;
		top: 26px;
		font-family: monospace;
		overflow: auto;
	`;
	bobcon.bar.style = `position: absolute;
		top: 0px;
		width: 100%;
		height: 26px;
		border: 1px solid black;
	`;
	bobcon.x.style = `
		position: absolute;
		right: 0px;
		top: 0px;
		transform: none;
		margin: 0;
		width: auto;
		height: auto;
		font-size: 14px;
		padding: 0px;
		border: 1px solid gray;
		background-color: white;
		width: 26px;
		height: 26px;
	`;
	bobcon.x.innerHTML = "X";
	bobcon.x.onclick = function(){
		bobcon.container.remove();
		console.log = console.bobconoldlog;
		console.clear = console.bobconoldclear;
	};
	bobcon.output.innerHTML = "<hr>";

	console.bobconoldlog = console.log;
	console.bobconoldclear = console.clear;
	console.log = function(value){
		console.bobconoldlog(value);
		setTimeout(function(){
			bobcon.output.innerHTML += `${value}<hr>`;
			bobcon.output.scrollTo(0, bobcon.output.scrollHeight);
		}, 10);
	};
	console.clear = function(){
		console.bobconoldclear();
		setTimeout(function(){
			bobcon.output.innerHTML = "<hr>Console was cleared.</hr>";
		}, 10);
	};
	window.addEventListener("error", bobcon.error);
	bobcon.console.onkeydown = function(e){
		if ((e.code == "Enter") && !e.shiftKey) {
			e.preventDefault();
			let commandError = false;
			try {
				tempout = eval.call(window, bobcon.console.value);
			} catch (error) {
				tempout = bobcon.error(error);
				commandError = true;
			};
			if (!commandError) {
				tempout = bobcon.convertOutput(tempout);
			};
			bobcon.output.innerHTML += `» ${bobcon.console.value}<br>🡸 ${tempout}<hr>`;
			bobcon.output.scrollTo(0, bobcon.output.scrollHeight);
			bobcon.historyPos = -1;
			bobcon.history.unshift(bobcon.console.value);
			bobcon.console.value = "";
		} else if (e.code == "ArrowUp") {
			e.preventDefault();
			if (bobcon.history[bobcon.historyPos + 1] !== undefined) {
				if (bobcon.historyPos == -1) {
					bobcon.historyTemp = bobcon.console.value;
				};
				bobcon.historyPos++;
				bobcon.console.value = bobcon.history[bobcon.historyPos];
			};
		} else if (e.code == "ArrowDown") {
			e.preventDefault();
			if (bobcon.historyPos > 0) {
				bobcon.historyPos -= 1;
				bobcon.console.value = bobcon.history[bobcon.historyPos];
			} else if (bobcon.historyPos == 0) {
				bobcon.console.value = bobcon.historyTemp;
				bobcon.historyPos = -1;
			};
		} else if (e.code == "Tab") {
			e.preventDefault();
			bobcon.console.value = bobcon.console.value.substring(0, bobcon.selectionStart) + "\t" + bobcon.console.value.substring(bobcon.selectionStart,bobcon.console.value.length);
		};
	};
	bobcon.console.style = `
		width: 100%;
		position: absolute;
		resize: none;
		bottom: 0px;
		left: 0px;
		padding: 0px;
		font-family: monospace;
	`;
	bobcon.console.rows = "4";
	bobcon.container.style = `
		position: fixed;
		width: 100%;
		height: 300px;
		border: 1px solid black;
		background-color: #f7f7f7;
		bottom: 0px;
		left: 0px;
	`;
	document.body.appendChild(bobcon.container);
	bobcon.container.appendChild(bobcon.console);
	bobcon.bar.appendChild(bobcon.x);
	bobcon.container.appendChild(bobcon.bar);
	bobcon.container.appendChild(bobcon.output);
})();
