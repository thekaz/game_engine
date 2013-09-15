function ClassMakerWrapper(options) {
	this.init(options);
}

ClassMakerWrapper.prototype = {
	init: function(options) {
		this.timer = new ClassTimer({
			'runCallback':this.runOnTickTock.bind(this),
			fps:30
		});
		this.timer.start();

		this.api = new ClassApi();

		this.horiz_platforms = [];
		this.verti_platforms = [];
		this.boxes = [];
		this.player = undefined;
		this.cursorObj = undefined;
		options.setMouseCallback = this.setMouseCallback.bind(this);
		this.canvas = new ClassCanvas(options);
		this.canvas.setXStep(Math.floor(this.canvas.getWidth()/10));
		this.canvas.setYStep(Math.floor(this.canvas.getHeight()/10));
		this.playerButton = options.add_player_button;
		this.horizPlatformButton = options.add_horiz_platform_button;
		this.vertiPlatformButton = options.add_verti_platform_button;
		this.boxButton = options.add_box_button;
		this.deleteButton = options.delete_button;
		this.lengthField = options.length_field;

		this.saveButton = options.save_button;
		this.loadButton = options.load_button;

		this.canvasUpButton = options.canvas_up_button;
		this.canvasDownButton = options.canvas_down_button;
		this.canvasLeftButton = options.canvas_left_button;
		this.canvasRightButton = options.canvas_right_button;

		this.setEventCallbacks();
		this.mode = undefined;
		this.length = 10;

		this.drawer = new ClassDrawSimple(this.canvas);
	},

	setEventCallbacks: function() {

		this.canvasUpButton.addEventListener("click", function(event) {
			event.preventDefault();
			this.canvas.moveUp();
		}.bind(this));
		this.canvasDownButton.addEventListener("click", function(event) {
			event.preventDefault();
			this.canvas.moveDown();
		}.bind(this));
		this.canvasLeftButton.addEventListener("click", function(event) {
			event.preventDefault();
			this.canvas.moveLeft();
		}.bind(this));
		this.canvasRightButton.addEventListener("click", function(event) {
			event.preventDefault();
			this.canvas.moveRight();
		}.bind(this));

		this.playerButton.addEventListener("click", function(event) {
			event.preventDefault();
			this.mode = "player";
			this.resetCursor();
		}.bind(this));

		this.horizPlatformButton.addEventListener("click", function(event) {
			event.preventDefault();
			this.mode = "horiz_platform";
			this.length = parseInt(this.lengthField.value);
			this.resetCursor();
		}.bind(this));

		this.vertiPlatformButton.addEventListener("click", function(event) {
			event.preventDefault();
			this.mode = "verti_platform";
			this.length = parseInt(this.lengthField.value);
			this.resetCursor();
		}.bind(this));

		this.boxButton.addEventListener("click", function(event) {
			event.preventDefault();
			this.mode = "box";
			this.length = parseInt(this.lengthField.value);
			this.resetCursor();
		}.bind(this));

		this.deleteButton.addEventListener("click", function(event) {
			event.preventDefault();
			this.mode = "delete";
			this.resetCursor();
		}.bind(this));

		this.lengthField.addEventListener("keydown", function(event) {
			this.length = parseInt(this.lengthField.value);
			this.resetCursor();
		}.bind(this));

		this.lengthField.addEventListener("keyup", function(event) {
			this.length = parseInt(this.lengthField.value);
			this.resetCursor();
		}.bind(this));

		this.saveButton.addEventListener("click", function(event) {
			var saveObj = {'horiz_platforms':[],
								'verti_platforms':[],
								'boxes':[],
								'player':undefined
							  };
			for (var i=0; i<this.horiz_platforms.length; i++) {
				saveObj.horiz_platforms.push(this.horiz_platforms[i].getParamsObj());
			}
			for (var i=0; i<this.verti_platforms.length; i++) {
				saveObj.verti_platforms.push(this.verti_platforms[i].getParamsObj());
			}
			for (var i=0; i<this.boxes.length; i++) {
				saveObj.boxes.push(this.boxes[i].getParamsObj());
			}
			if (this.player) {
				saveObj.player = this.player.getParamsObj();
			}
			this.api.sendSave(JSON.stringify(saveObj));
		}.bind(this));

		this.loadButton.addEventListener("click", function(event) {
			this.api.sendLoad(this.sendLoadCallback.bind(this));
		}.bind(this));
	},

	sendLoadCallback: function(responseText) {
		var resultJson = JSON.parse(responseText);
		this.horiz_platforms = [];
		this.verti_platforms = [];
		this.boxes = [];
		this.player = undefined;
		this.cursorObj = undefined;
		if (resultJson.player) {
			var options = resultJson.player;
			options.drawer = this.drawer;
			this.player = new ClassUIPlayer(options);
		}
		for (var i=0; i<resultJson.horiz_platforms.length; i++) {
			var options = resultJson.horiz_platforms[i];
			options.drawer = this.drawer;
			this.horiz_platforms.push(new ClassUIHorizPlatform(options));
		}
		for (var i=0; i<resultJson.verti_platforms.length; i++) {
			var options = resultJson.verti_platforms[i];
			options.drawer = this.drawer;
			this.verti_platforms.push(new ClassUIVertiPlatform(options));
		}
		for (var i=0; i<resultJson.boxes.length; i++) {
			var options = resultJson.boxes[i];
			options.drawer = this.drawer;
			this.boxes.push(new ClassUIBox(options));
		}
	},

	setMouseCallback: function(canvasElement) {
		canvasElement.addEventListener("mousemove", function(event) {
			var canvasBox = canvasElement.getBoundingClientRect()
			this.mouseX = event.clientX - canvasBox.left + this.canvas.getX();
			this.mouseY = event.clientY - canvasBox.top + this.canvas.getY();
			this.resetCursor();
		}.bind(this));

		canvasElement.addEventListener("click", function(event) {
			if (this.mode == "player") {
				this.player = this.cursorObj;
			} else if (this.mode == "horiz_platform") {
				this.horiz_platforms.push(this.cursorObj);
			} else if (this.mode == "verti_platform") {
				this.verti_platforms.push(this.cursorObj);
			} else if (this.mode == "box") {
				this.boxes.push(this.cursorObj);
			} else if (this.mode == "delete") {
				for (var i=0; i<this.horiz_platforms.length; i++) {
					var delPlatform = this.checkCursorPosition(this.horiz_platforms[i])
					if (delPlatform) {
						this.horiz_platforms.splice(i, 1);
					}
				}
				for (var i=0; i<this.verti_platforms.length; i++) {
					var delPlatform = this.checkCursorPosition(this.verti_platforms[i])
					if (delPlatform) {
						this.verti_platforms.splice(i, 1);
					}
				}
				for (var i=0; i<this.boxes.length; i++) {
					var delBox = this.checkCursorPosition(this.boxes[i])
					if (delBox) {
						this.boxes.splice(i, 1);
					}
				}
				var delPlayer = this.checkCursorPosition(this.player);
				if (delPlayer) {
					this.player = undefined;
				}
			}
			this.resetCursor();
		}.bind(this));
	},

	checkCursorPosition: function(uiObject) {
		if (!uiObject) {
			return false;
		}
		if (
			(this.mouseX > uiObject.getX()) &&
			(this.mouseX < uiObject.getX() + uiObject.getWidth()) &&
			(this.mouseY > uiObject.getY()) &&
			(this.mouseY < uiObject.getY() + uiObject.getHeight())
		) {
			return true;
		} else {
			return false;
		}
		
	},

	resetCursor: function() {
		if (this.mode == "player") {
			this.cursorObj = new ClassUIPlayer({'x':this.mouseX-5, 'y':this.mouseY-5, 'drawer':this.drawer});
		} else if (this.mode == "horiz_platform") {
			this.cursorObj = new ClassUIHorizPlatform({'x':this.mouseX-(this.length/2), 'y':this.mouseY-5, 'length':this.length, 'drawer':this.drawer});
		} else if (this.mode == "verti_platform") {
			this.cursorObj = new ClassUIVertiPlatform({'x':this.mouseX-5, 'y':this.mouseY-(this.length/2), 'length':this.length, 'drawer':this.drawer});
		} else if (this.mode == "box") {
			this.cursorObj = new ClassUIBox({'x':this.mouseX-(this.length/2), 'y':this.mouseY-(this.length/2), 'length':this.length, 'drawer':this.drawer});
		} else if (this.mode == "delete") {
			this.cursorObj = new ClassUIStatic({'x':this.mouseX-1, 'y':this.mouseY-1, 'height':3, 'width':3, 'color':"#000044", 'drawer':this.drawer});
		}
	},

	runOnTickTock: function() {
		this.canvas.canvasRefresh([this.horiz_platforms, this.verti_platforms, this.boxes], [this.player, this.cursorObj]);
	}
}
