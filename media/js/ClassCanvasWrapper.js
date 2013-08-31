function ClassCanvasWrapper (options) {
	this.init(options);
}

ClassCanvasWrapper.prototype = {
	init: function(options) {
		var canvasId = options.canvasId;
		this.canvasElement = document.getElementById(canvasId);
		this.ctx = this.canvasElement.getContext('2d');
		if ('debug' in options) {
			top.addEventListener("keydown", function (event) {
				if (!event) {
					event = window.event
				}
				var code = event.keyCode;
				if (code == 32) {
					this.runOnTickTock();
					event.preventDefault();
				}
			}.bind(this));
		} else {
			this.timer = new ClassTimer({
				'canvasId':canvasId,
				'runCallback':this.runOnTickTock.bind(this),
				fps:30
			});
			this.timer.start();
		}
		this.platforms = [];
		this.player = null;
		this.keyboardManager = new ClassKeyboardManager();
	},
	canvasRefresh: function() {	
		this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		for (var i=0; i < this.platforms.length; i++) {
			this.redrawObject(this.platforms[i]);
		}
		this.redrawObject(this.player);
	},
	runOnTickTock: function() {
		// for gravity
		var keymap = this.keyboardManager.getKeyPressMap();
		if (this.player) {
			if ("up" in keymap) {
				this.player.startJump();
			}
			if (("left" in keymap) && ("right" in keymap)) {
				this.player.setHorizDirection(0);
			} else if ("left" in keymap) {
				this.player.setHorizDirection(-1);
			} else if ("right" in keymap) {
				this.player.setHorizDirection(1);
			} else {
				this.player.setHorizDirection(0);
			}
			this.player.move(this.platforms);
			//this.player.jump();
			//this.player.fall(this.platforms);
			//this.player.goHoriz();
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