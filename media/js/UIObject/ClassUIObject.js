function ClassUIObject(options) {
	this.init(options);
};

ClassUIObject.prototype = {
	init: function(options) {
		this.x = options.x;
		this.y = options.y;
		this.width = options.width;
		this.height = options.height;
		this.color = options.color;
		this.drawer = options.drawer;
		this.mover = options.mover;
	},
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
	getParamsObj: function() {
		var returnObj = {};
		var keys = Object.keys(this);
		for (var i=0; i<keys.length; i++) {
			key = keys[i];
			if (key == 'drawer') {
				continue;
			}
			value = this[key];
			returnObj[key] = value;
		}
		return returnObj;
	},
	draw: function() {
		this.drawer.draw(this);
	},
	setHorizDirection: function(direction) {
		if (this.mover) {
			this.mover.setHorizDirection(direction);
		}
	},
	startJump: function() {
		if (this.mover) {
			this.mover.startJump();
		}
	},
	move: function(platformList) {
		if (this.mover) {
			this.mover.jump();
			var moveResult = this.mover.move(this.x, this.y, this.height, this.width, platformList);
			this.x = moveResult['x'];
			this.y = moveResult['y'];
		}
	}

};
