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
		this.canvas = new ClassCanvasWrapper(options);
		this.platforms = [];
		this.player = undefined;

		if (options.online == true) {
			this.apiWrapper = new ClassApiWrapper();
			this.apiWrapper.sendLoad(this.loadCallback.bind(this));
		} else {
			this.timer.start();
		}
	},
	loadCallback: function(responseText) {
		var resultJson = JSON.parse(responseText);
		if (resultJson.player) {
			var options = resultJson.player;
			this.player = new ClassUIPlayer(options);
		}
		for (var i=0; i<resultJson.horiz_platforms.length; i++) {
			var options = resultJson.horiz_platforms[i];
			this.platforms.push(new ClassUIHorizPlatform(options));
		}
		for (var i=0; i<resultJson.verti_platforms.length; i++) {
			var options = resultJson.verti_platforms[i];
			this.platforms.push(new ClassUIVertiPlatform(options));
		}
		for (var i=0; i<resultJson.boxes.length; i++) {
			var options = resultJson.boxes[i];
			this.platforms.push(new ClassUIBox(options));
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
		this.canvas.canvasRefresh([this.platforms], [this.player]);
	},
	addPlatform: function(uiObject) {
		this.platforms.push(uiObject);		
	},
	addPlayer: function(uiObject) {
		this.player = uiObject;
	}
}
