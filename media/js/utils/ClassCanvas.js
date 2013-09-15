function ClassCanvas (options) {
	this.init(options);
}

ClassCanvas.prototype = {
	init: function(options) {
		var canvasId = options.canvasId;
		this.canvasElement = document.getElementById(canvasId);
		this.ctx = this.canvasElement.getContext('2d');
		this.x = 0;
		this.y = 0;
		this.height = this.canvasElement.height;
		this.width = this.canvasElement.width;
		this.xStep = Math.floor(this.width/100);
		this.yStep = Math.floor(this.height/100);


		if (options.setMouseCallback) {
			options.setMouseCallback(this.canvasElement);
		}
	},

	canvasRefresh: function(listItems, singleItems) {	
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		for (var j=0; j < listItems.length; j++) {
			var list = listItems[j];
			if (listItems[j]) {
				for (var i=0; i < list.length; i++) {
					if (list[i]) {
						list[i].draw();
					}
				}
			}
		}

		for (var k=0; k < singleItems.length; k++) {
			if (singleItems[k]) {
				singleItems[k].draw();
			}
		}

	},

	moveUp: function() {
		this.y -= this.yStep;
	},
	moveDown: function() {
		this.y += this.yStep;
	},
	moveLeft: function() {
		this.x -= this.xStep;
	},
	moveRight: function() {
		this.x += this.xStep;
	},
	getX: function() {
		return this.x;
	},
	getY: function() {
		return this.y;
	},
	setX: function(x) {
		this.x = x;
	},
	setY: function(y) {
		this.y = y;
	},
	getWidth: function() {
		return this.width;
	},
	getHeight: function() {
		return this.height;
	},
	setXStep: function(xStep) {
		this.xStep = xStep;
	},
	setYStep: function(yStep) {
		this.yStep = yStep;
	},
}
