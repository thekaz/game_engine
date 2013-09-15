function ClassDrawObject(canvas) {
	this.init(canvas);
};

ClassDrawObject.prototype = {
	init: function(canvas) {
		this.canvas = canvas;
	},
	checkBounds: function(uiObject) {
		// check to see if the object is inside the boundary of the canvas
		if (uiObject.getX() + uiObject.getWidth() < this.canvas.getX()) {
			// object is entirely to the left of the canvas
			return false;
		}
		if (uiObject.getX() > this.canvas.getX() + this.canvas.getWidth()) {
			// object is entirely to the right of the canvas
			return false;
		}
		if (uiObject.getY() + uiObject.getHeight() < this.canvas.getY()) {
			// object is entirely above the canvas
			return false;
		}
		if (uiObject.getY() > this.canvas.getY() + this.canvas.getHeight()) {
			// object  is entirely below the canvas
			return false
		}
		// some part of the object is contained in the canvas
		return true;
	},
	draw: function(uiObject) {
		var boundaryCheck = this.checkBounds(uiObject);
		if (!boundaryCheck) {
			return;
		}
		this.actuallyDraw(uiObject);
	},
	actuallyDraw: function(uiObject) {
	}
};
