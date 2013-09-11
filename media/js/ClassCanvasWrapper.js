function ClassCanvasWrapper (options) {
	this.init(options);
}

ClassCanvasWrapper.prototype = {
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
						this.redrawObject(list[i]);
					}
				}
			}
		}

		for (var k=0; k < singleItems.length; k++) {
			if (singleItems[k]) {
				this.redrawObject(singleItems[k]);
			}
		}

	},

	redrawObject: function(uiObject) {
		// make sure the object is visible on the canvas before drawing
		if (
			(uiObject.getX() + uiObject.getWidth() > this.x) ||
			(uiObject.getX() < this.x + this.width) ||
			(uiObject.getY() + uiObject.getHeight() > this.y) ||
			(uiObject.getY() < this.y + this.height)
		) {
			this.ctx.fillStyle = uiObject.getColor();
			this.ctx.fillRect(uiObject.getX() - this.x, uiObject.getY() - this.y, uiObject.getWidth(), uiObject.getHeight());
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
