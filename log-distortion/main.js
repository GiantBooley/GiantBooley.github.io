let image = new Image();
let canvas;
let ctx;
let base = 0.03;


function getBaseLog(x, y) {
	return Math.log(y) / Math.log(x);
}
function distort() {
	ctx.drawImage(image, 0, 0);
	let data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let newData = ctx.createImageData(canvas.width, canvas.height);
	let stretch = document.getElementById("stretch").checked;
	for (let y = 0; y < canvas.height; y++) {
		for (let x = 0; x < canvas.width; x++) {
			for (let i = 0; i < 4; i++) {
				let yFloat = y / canvas.height;
				let newY;
				if (stretch) {
					newY = getBaseLog(base, (1 - yFloat - 1) * (1 - base) + 1);
				} else {
					newY = getBaseLog(base, 1 - yFloat);
				}
				newData.data[(y * canvas.width + x) * 4 + i] = data.data[(Math.floor(newY * canvas.height) * canvas.width + x) * 4 + i];
			}
		}
	}
	ctx.putImageData(newData, 0, 0);
}
function updateFile(e) {
	if (e.target.files && e.target.files[0]) {
		var reader = new FileReader();
		reader.onload = a => {
			image.onload = b => {
				canvas.width = image.width;
				canvas.height = image.height;
				distort();
			}
			image.src = a.target.result;
		}
		reader.readAsDataURL(e.target.files[0]);
	}
}
function main() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	document.getElementById("base").addEventListener("change", e => {
		base = e.target.value;
		document.getElementById("base-slider").value = e.target.value;
		distort();
	})
	document.getElementById("base-slider").addEventListener("change", e => {
		base = Math.exp(e.target.value);
		document.getElementById("base").value = base;
		distort();
	})
	document.getElementById("stretch").addEventListener("change", distort);
	document.getElementById("file").addEventListener("change", updateFile);
	document.getElementById("distort-button").addEventListener("click", distort);
}
window.addEventListener("load", main);