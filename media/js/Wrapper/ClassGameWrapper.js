function ClassGameWrapper(options) {
	this.init(options);
}

ClassGameWrapper.prototype = {
	init: function(options) {
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
				'runCallback':this.runOnTickTock.bind(this),
				fps:30
			});
		}

		this.keyboardManager = new ClassKeyboardManager();
		this.canvas = new ClassCanvas(options);
		this.xThresh = Math.floor(this.canvas.getWidth()/3);
		this.yThresh = Math.floor(this.canvas.getHeight()/3);
		this.platforms = [];
		this.player = undefined;
		this.uiFactory = new UIObjectFactory(this.canvas);
		this.drawer = new ClassDrawSimple(this.canvas);

		if (options.online == true) {
			this.api= new ClassApi();
			this.api.sendLoad(this.loadCallback.bind(this));
		} else {
			this.timer.start();
		}
	},
	loadCallback: function(responseText) {
		var resultJson = JSON.parse(responseText);
		if (resultJson.player) {
			var options = resultJson.player;
			options.drawer = this.drawer;
			this.player = new ClassUIPlayer(options);
		}
		for (var i=0; i<resultJson.horiz_platforms.length; i++) {
			var options = resultJson.horiz_platforms[i];
			this.platforms.push(this.uiFactory.makeBasicHorizPlatform(options));
		}
		for (var i=0; i<resultJson.verti_platforms.length; i++) {
			var options = resultJson.verti_platforms[i];
			this.platforms.push(this.uiFactory.makeBasicVertiPlatform(options));
		}
		for (var i=0; i<resultJson.boxes.length; i++) {
			var options = resultJson.boxes[i];
			this.platforms.push(this.uiFactory.makeBasicBox(options));
		}
		this.timer.start();
	},
	runOnTickTock: function() {
		// for gravity
		var keymap = this.keyboardManager.getKeyPressMap();
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

		// check to see if the player is near the edge of the screen.  if she/he is, scroll the screen

		// left side of screen
		if (this.player.getX() < this.canvas.getX() + this.xThresh) {
			this.canvas.setX(this.player.getX() - this.xThresh);
		}
		// right side of screen
		if (this.player.getX() + this.player.getWidth() > this.canvas.getX() + this.canvas.getWidth() - this.xThresh) {
			this.canvas.setX(this.player.getX() + this.player.getWidth() - this.canvas.getWidth() + this.xThresh);
		}
		// top of screen
		if (this.player.getY() < this.canvas.getY() + this.yThresh) {
			this.canvas.setY(this.player.getY() - this.yThresh);
		}
		// bottom of screen
		if (this.player.getY() + this.player.getHeight() > this.canvas.getY() + this.canvas.getHeight() - this.yThresh) {
			this.canvas.setY(this.player.getY() + this.player.getHeight() - this.canvas.getHeight() + this.yThresh);
		}

		this.canvas.canvasRefresh([this.platforms], [this.player]);
	},
	addPlatform: function(uiObject) {
		this.platforms.push(uiObject);		
	},
	addPlayer: function(uiObject) {
		this.player = uiObject;
	}
}
