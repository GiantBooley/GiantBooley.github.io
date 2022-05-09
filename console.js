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

		addLine: line => bobcon.output.innerHTML += `<br>${line}<hr>`,
		error: e => `<pre style="color:#a3010a;display:inline;background-color:#fdf2f5;">🛑 Uncaught ${e.stack.replaceAll("    ", "        ")}</pre>`,

		logError: e => {bobcon.addLine(bobcon.error(e))},
		mapArray: function(array, mapFunction){
			let newArray = [...array];
			for (let i = 0; i < array.length; i++) {
				newArray[i] = mapFunction(newArray[i]);
			};
			return newArray;
		},
		downloadFile: function(name, contents){
			let a = document.createElement("a");
			a.href = "data:," + contents;
			a.download = name;
			a.style.display = "none";
			bobcon.container.appendChild(a);
			a.click();
			a.remove();
		},
		convertOutput: function convertOutput(variable){
			switch (typeof variable) {
				case "string":
					return `"${variable}"`;
					break;
				case "object":
					try {
						if (Array.isArray(variable)) {
							return `Array(${variable.length}) [${bobcon.mapArray(variable, it => convertOutput(it)).join(", ")}]`;
						} else if (variable === null) {
							return "null";
						} else if (variable.constructor.name == "RegExp") {
							return variable.toString();
						} else {
							return `${variable.constructor.name} {${bobcon.mapArray(Object.getOwnPropertyNames({...Object.getPrototypeOf(variable), ...variable}), key => `"${key}": ${bobcon.convertOutput(variable[key])}`).join(", ")}}`;
						};
					} catch (e) {console.log(bobcon.error(e))};
					break;
				case "bigint":
					return variable.toString() + "n";
					break;
				case "undefined":
					return "undefined";
					break;
				case "number":
					return variable.toString();
					break;
				case "boolean":
					return variable.toString();
				default:
					return variable.toString();
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
		border: none;
		background-color: white;
		width: 24px;
		height: 24px;
	`;
	bobcon.console.style = `
		width: 100%;
		position: absolute;
		resize: none;
		bottom: 0px;
		left: 0px;
		padding: 0px;
		font-family: monospace;
		outline: none;
	`;
	bobcon.bar.innerHTML = "Console";
	bobcon.console.rows = "2";
	bobcon.container.style = `
		position: fixed;
		width: 100%;
		height: 300px;
		border: 1px solid black;
		background-color: #f7f7f7;
		bottom: 0px;
		left: 0px;
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
	window.addEventListener("error", bobcon.logError);
	bobcon.console.onkeydown = function(e){
		if ((e.code == "Enter") && !e.shiftKey) {
			e.preventDefault();
			if (bobcon.console.value.length > 0) {
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
				bobcon.output.innerHTML += `» <pre style="display:inline;">${bobcon.console.value}</pre><br>🡸 ${tempout}<hr>`;
				bobcon.output.scrollTo(0, bobcon.output.scrollHeight);
				bobcon.historyPos = -1;
				bobcon.history.unshift(bobcon.console.value);
				bobcon.console.value = "";
			};
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
		} else if (e.code == "KeyS" && e.ctrlKey) {
			e.preventDefault();
			bobcon.downloadFile("console_input.js", bobcon.console.value);
		};
	};
	bobcon.console.onkeyup = function(e){
		bobcon.console.rows = Math.min((bobcon.console.value.match(/\n/g) ?? []).length, 10) + 2;
	};
	document.body.appendChild(bobcon.container);
	bobcon.container.appendChild(bobcon.bar);
	bobcon.container.appendChild(bobcon.output);
	bobcon.container.appendChild(bobcon.console);
	bobcon.bar.appendChild(bobcon.x);
