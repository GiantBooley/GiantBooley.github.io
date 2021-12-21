var htmldomtooltip = document.createElement("div");
htmldomtooltip.style = "font-size: 120%; border-radius: 10px; padding: 5px; background-color: darkslategray; opacity: 0.9; color: white; position: fixed; left: 0px; top: 0px; font-family: monospace; display: inline-block";
document.body.appendChild(htmldomtooltip);

var htmldomtooltipwindow = document.createElement("div");
htmldomtooltipwindow.style = "text-align: left; white-space: pre; font-size: 120%; width: 800px; height: 400px; border-radius: 15px; padding: 20px; background-color: darkslategray; opacity: 0.95; color: white; position: fixed; font-family: monospace; display: none; top: 50%; left: 50%; transform: translate(-50%, -50%);";
document.body.appendChild(htmldomtooltipwindow);
var htmldomtooltipwindowx = "<button onclick=\"htmldomtooltip.style.display=\'inline-block\';htmldomtooltipwindow.style.display = \'none\';setTimeout(() => {  htmldomabletoinspect = \'true\'; }, 100);\" style=\"display: block; width: 40px; height: 40px; border-radius: 50px; padding: 5px; background-color: darkslategray; opacity: 0.95; color: white; position: fixed; font-family: monospace; top: 10px; right: 10px;\">X</button>";

var mousex = 0;
var mousey = 0;
var htmldomabletoinspect = "true";
function closehtmldomtooltipwindow() {
	htmldomtooltip.style.display="inline-block";
	htmldomtooltipwindow.style.display = "none";
	setTimeout(() => {  htmldomabletoinspect = "true"; }, 100);
};
document.addEventListener("mousemove", () => {
	mousex = event.clientX;
	mousey = event.clientY;
});
document.addEventListener("click", () => {
	if (htmldomabletoinspect == "true") {
		htmldomabletoinspect = "false";
		htmldomtooltip.style.display="none";
		htmldomtooltipwindow.style.display = "block";
		htmldomtooltipwindow.innerHTML = htmldomtooltipwindowx+"HTML DOM node name: "+elementMouseIsOver+"<br>Node name:"+elementMouseIsOver.nodeName+"<br>Style: "+elementMouseIsOver.style+"<br>Id: "+elementMouseIsOver.id+"<br>Classes: "+elementMouseIsOver.classList;
	};
});
var htmldomtooltipinterval = setInterval(function() {
	elementMouseIsOver = document.elementFromPoint(mousex, mousey);
	htmldomtooltip.innerHTML = elementMouseIsOver;
	htmldomtooltip.style.top = (mousey+10) + "px";
	htmldomtooltip.style.left = (mousex+10) + "px";
}, 10);
