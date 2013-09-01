function ClassCanvasWrapper (options) {
	this.init(options);
}

ClassCanvasWrapper.prototype = {
	init: function(options) {
		var canvasId = options.canvasId;
		this.canvasElement = document.getElementById(canvasId);
		this.ctx = this.canvasElement.getContext('2d');
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
		this.ctx.fillStyle = uiObject.getColor();
		this.ctx.fillRect(uiObject.getX(), uiObject.getY(), uiObject.getWidth(), uiObject.getHeight());
	}
}
