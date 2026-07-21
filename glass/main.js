function main() {
	document.getElementById("width").addEventListener("change", e => {
		document.getElementById("widthValue").innerText = Math.round(e.target.valueAsNumber * 1000) / 1000 + "m";
		document.getElementById("glass").style.width = (e.target.valueAsNumber * 100) + "px";
	});
	document.getElementById("height").addEventListener("change", e => {
		document.getElementById("heightValue").innerText = Math.round(e.target.valueAsNumber * 1000) / 1000 + "m";
		document.getElementById("glass").style.height = (e.target.valueAsNumber * 100) + "px";
	});
	document.getElementById("thickness").addEventListener("change", e => {
		document.getElementById("thicknessValue").innerText = Math.round(e.target.valueAsNumber * 1000) / 1000 + "m";
	});
	document.getElementById("reset").addEventListener("click", e => {
		document.getElementById("glass").src = "glass.jpg";
		e.target.style.display = "none";
	});
	document.getElementById("glass").addEventListener("click", e => {
		const strength = getStrength();
		const chanceToBreak = 0.001 / strength;
		if (Math.random() < chanceToBreak) {
			shatter();
		}
	});
}
function getStrength() {
	const width = document.getElementById("width").valueAsNumber;
	const height = document.getElementById("height").valueAsNumber;
	const thickness = document.getElementById("thickness").valueAsNumber;
	const type = document.getElementById("type").value;
	let strength = thickness / (width * height);
	if (type === "tempered" || type === "temperedlaminated") {
		strength *= 4;
	}
	return strength;
}
function shatter() {
	const type = document.getElementById("type").value;
	const image = document.getElementById("glass");
	if (type === "annealed") image.src = "annealed.jpg";
	if (type === "tempered") image.src = "tempered.jpg";
	if (type === "temperedlaminated") image.src = "laminated.jpg";
	document.getElementById("reset").style.display = "block";
}

window.addEventListener("load", main);