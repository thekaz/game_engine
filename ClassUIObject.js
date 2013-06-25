function ClassUIObject(options) {
	this.x = options.x;
	this.y = options.y;
	this.width = options.width;
	this.height = options.height;
	this.color = options.color;
	
	this.vx = options.vx || 0;
	this.vy = options.vy || 0;
	
	this.ax = options.ax || 1;
	this.ay = options.ay || 1;
	this.terminalX = 5 || 0;
	this.terminalY = 100 || 0;
}

ClassUIObject.prototype = {
	getX: function() {
		return this.x;
	},
	getY: function() {
		return this.y;
	},
	getWidth: function () {
		return this.width;
	},
	getHeight: function () {
		return this.height;
	},
	getColor: function() {
		return this.color;
	},
	getAX: function() {
		return this.ax;
	},
	getAY: function() {
		return this.ay;
	},
	goLeft: function() {
		var newVX = this.vx - this.ax;
		if (-newVX > this.terminalX) {
			newVX = -this.terminalX;
		}
		this.vx = newVX;
		this.x += this.vx;
	},
	goRight: function() {
		var newVX = this.vx + this.ax;
		if (newVX > this.terminalX) {
			newVX = this.terminalX;
		}
		this.vx = newVX;
		this.x += this.vx;
	}, 
	fall: function() {
		var newVY = this.vy + this.ay;
		if (newVY > this.terminalY) {
			newVY = this.terminalY;
		}
		this.vy = newVY;
		this.y += this.vy;
	}
}