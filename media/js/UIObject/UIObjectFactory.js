function UIObjectFactory(canvas) {
	this.canvas = canvas;
	this.simpleDrawer = new ClassDrawSimple(this.canvas);
	this.imgDrawer = new ClassDrawImg(this.canvas);
};

UIObjectFactory.prototype = {
	makeBasicStatic: function(options) {
		var newOptions = {
			x: options.x,
			y: options.y,
			width: options.width,
			height: options.height,
			color: options.color,
			drawer: this.simpleDrawer
		}
		return new ClassUIObject(newOptions)	
	},
	makeBasicBox: function(options) {
		var newOptions = {
			x: options.x,
			y: options.y,
			width: options.width,
			height: options.height,
			color: "#FF6600",
			drawer: this.simpleDrawer
		}
		return new ClassUIObject(newOptions)
	},
	makeBasicHorizPlatform: function(options) {
		var newOptions = {
			x: options.x,
			y: options.y,
			width: options.width,
			height: 10,
			color: "#FF0000",
			drawer: this.simpleDrawer
		}
		return new ClassUIObject(newOptions);
	},
	makeBasicVertiPlatform: function(options) {
		var newOptions = {
			x: options.x,
			y: options.y,
			width: 10,
			height: options.height,
			color: "#FF0000",
			drawer: this.simpleDrawer
		}
		return new ClassUIObject(newOptions);
	},
	makeBasicPlayer: function(options) {
		var moverOptions = {
			vx: 0,
			vy: 0,
			ax: 2,
			ay: 1,
			terminalX: 5,
			terminalY: 50,
			frictionX: 2,
			frictionY: 0,
		}
		var newOptions = {
			x: options.x,
			y: options.y,
			width: 10,
			height: 10,
			color: "#00FF00",
			drawer: this.simpleDrawer,
			mover: new ClassMotion(moverOptions)
		}
		return new ClassUIObject(newOptions);
	},
	makeImgBox: function(options) {
		var newOptions = {
			x: options.x,
			y: options.y,
			width: options.width,
			height: options.height,
			drawer: this.imgDrawer,
			element: options.element,
		}
		return new ClassUIObject(newOptions)
	},
	makeImgPlayer: function(options) {
		var moverOptions = {
			vx: 0,
			vy: 0,
			ax: 2,
			ay: 1,
			terminalX: 5,
			terminalY: 50,
			frictionX: 2,
			frictionY: 0,
		}
		var newOptions = {
			x: options.x,
			y: options.y,
			width: 40,
			height: 80,
			drawer: this.imgDrawer,
			element: options.element,
			mover: new ClassMotion(moverOptions),
		}
		return new ClassUIObject(newOptions);
	}
};
