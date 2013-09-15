function ClassDrawSimple(canvas) {
	ClassDrawObject.call(this, canvas);
}

ClassDrawSimple.prototype = Object.create(ClassDrawObject.prototype);

ClassDrawSimple.prototype.actuallyDraw = function(uiObject) {
	this.canvas.ctx.fillStyle = uiObject.getColor();
	this.canvas.ctx.fillRect(uiObject.getX() - this.canvas.getX(), uiObject.getY() - this.canvas.getY(), uiObject.getWidth(), uiObject.getHeight());
}
