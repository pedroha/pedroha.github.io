var error, warn, debug, info, prog; // log: redefinition of log()?

if (!error) {
	error = warn = debug = info = function (msg) {
		if (typeof console !== "undefined") {
			console.log(msg);
		}
	};
}

if (!prog) {
	prog = function (msg) { // Programmer error, not user error
		alert(msg);
	};
}

//-------------------------------------------------

var JF = JF || {};

JF.DrawingSvgCanvasExecutor = function (context) {
	if (!context) {
		prog("DrawingSvgCanvasExecutor: Missing Context argument!");
		return;
	}
	var ctx = context;
	
	var debug_color = "#f7a";
	
	this.beginPath = function () {
		ctx.beginPath();
	};
	this.quadraticCurveTo = function (cpx, cpy, endx, endy) {
		ctx.quadraticCurveTo(cpx, cpy, endx, endy);
	};	
	this.bezierCurveTo = function (cpx, cpy, cp2x, cp2y, endx, endy) {
		ctx.bezierCurveTo(cpx, cpy, cp2x, cp2y, endx, endy);
	};
	this.moveTo = function (x, y) {
		ctx.moveTo(x, y);
	};
	this.lineTo = function (x, y) {
		ctx.lineTo(x, y);
	};
	this.closePath = function () {
		ctx.closePath();
		if (JF.debug.embedded_path_coloring) {
			ctx.fillStyle = debug_color;
			ctx.fill();
		}
	};
};

