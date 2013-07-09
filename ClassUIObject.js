function ClassUIObject(options) {
	this.x = options.x;
	this.y = options.y;
	this.width = options.width;
	this.height = options.height;
	this.color = options.color;
	
	this.vx = options.vx || 0;
	this.vy = options.vy || 0;
	
	this.ax = options.ax || 1;
	this.ay = options.ay || 1;
	this.terminalX = 5 || 0;
	this.terminalY = 100 || 0;
}

ClassUIObject.prototype = {
	getX: function() {
		return this.x;
	},
	getY: function() {
		return this.y;
	},
	getWidth: function () {
		return this.width;
	},
	getHeight: function () {
		return this.height;
	},
	getColor: function() {
		return this.color;
	},
	getAX: function() {
		return this.ax;
	},
	getAY: function() {
		return this.ay;
	},
	goLeft: function() {
		var newVX = this.vx - this.ax;
		if (-newVX > this.terminalX) {
			newVX = -this.terminalX;
		}
		this.vx = newVX;
		this.x += this.vx;
	},
	goRight: function() {
		var newVX = this.vx + this.ax;
		if (newVX > this.terminalX) {
			newVX = this.terminalX;
		}
		this.vx = newVX;
		this.x += this.vx;
	}, 
	fall: function(platformList) {
		// get the new velocity
		var newVY = this.vy + this.ay;
		// check fall speed vs terminal velocity
		if (newVY > this.terminalY) {
			newVY = this.terminalY;
		}
		// build the new position
		var newY = this.y + newVY;
		// check the new position for collision
		for (var i=0; i<platformList.length; i++) {
			var thisPlatform = platformList[i];
			// check the x coordinates first
			// check the player left and platform right
			if (this.x > thisPlatform.getX() + thisPlatform.getWidth()) {
				// the player's left is past the platform's right and falls past
				continue;
			}
			// check the player right and the platform left
			if (this.x + this.width < thisPlatform.getX()) {
				// the player's right is past the platform's left and falls past
				continue;
			}
			// check if the player should land on the platform this frame
			// check if the player will be below the platform
			if (newY + this.height < thisPlatform.getY()) {
				// the player will be above the platform this frame
				continue;
			}
			// check if the player was above the platform to start 
			if (this.y > thisPlatform.getY() + thisPlatform.getHeight()) {
				// the player started below this platform
				continue;
			}
			// at this point:
			//	player's left is above the platform's right
			//	player's right is above the platform's left
			//	the player's new position is below the platform
			//	the player's old position is above the platform
			newY = thisPlatform.getY() - this.height;
			newVY = 0;
		}
		this.vy = newVY;
		this.y = newY;
	}
}