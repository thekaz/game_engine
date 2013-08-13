function ClassCanvasWrapper (options) {
	var canvasId = options.canvasId;
	this.canvasElement = document.getElementById(canvasId);
	this.ctx = this.canvasElement.getContext('2d');
	this.timer = new ClassTimer({
		'canvasId':canvasId,
		'runCallback':this.runOnTickTock.bind(this),
		fps:30
	});
	this.timer.start();
	this.platforms = [];
	this.player = null;
	/*
	this.canvasElement.addEventListener('tick_tock', this.runTickTock.bind(this));
	*/
}

ClassCanvasWrapper.prototype = {
	canvasRefresh: function() {	
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		for (var i=0; i < this.platforms.length; i++) {
			this.redrawObject(this.platforms[i]);
		}
		this.redrawObject(this.player);
	},
	runOnTickTock: function() {
		// for gravity
		if (this.player) {
			this.player.jump();
			this.player.fall(this.platforms);
			this.player.goHoriz();
		}
		this.canvasRefresh();
	},
	redrawObject: function(uiObject) {
		this.ctx.fillStyle = uiObject.getColor();
		this.ctx.fillRect(uiObject.getX(), uiObject.getY(), uiObject.getWidth(), uiObject.getHeight());
	},
	addPlatform: function(uiObject) {
		this.platforms.push(uiObject);		
	},
	addPlayer: function(uiObject) {
		this.player = uiObject;
	}
}