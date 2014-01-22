function ClassDrawImg(canvas) {
	ClassDrawObject.call(this, canvas);
}

ClassDrawImg.prototype = Object.create(ClassDrawObject.prototype);

ClassDrawImg.prototype.actuallyDraw = function(uiObject) {
	var img = uiObject.element;
	this.canvas.ctx.drawImage(img, uiObject.getX() - this.canvas.getX(), uiObject.getY() - this.canvas.getY());
}
