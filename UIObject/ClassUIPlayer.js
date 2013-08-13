function ClassUIPlayer (options) {
	ClassUIDynamic.call(this, options);
}
ClassUIPlayer.prototype = Object.create(ClassUIDynamic.prototype);

ClassUIPlayer.prototype.init = function(options) {
	ClassUIDynamic.prototype.init.call(this, options);
	this.horizDirection = 0;
	this.jumpState = false;
	this.landed = false;
}

ClassUIPlayer.prototype.setHorizDirection = function(direction) {
	if (direction < 0) {
		this.horizDirection = -1;
	} else if (direction > 0) {
		this.horizDirection = 1;
	} else if (direction == 0) {
		this.horizDirection = 0;
	}
}

ClassUIPlayer.prototype.getHorizDirection = function() {
	return this.horizDirection;
}

ClassUIPlayer.prototype.startJump = function() {
	this.jumpState = true;
}

ClassUIPlayer.prototype.goHoriz = function() {
	var newVX;
	if (this.horizDirection == 0) {
		if (this.vx < 0) {
			if (-this.vx < this.frictionX) {
				newVX = 0;
			} else {
				newVX = this.vx + this.frictionX;
			}
		} else if (this.vx > 0) {
			if (this.vx < this.frictionX) {
				newVX = 0;
			} else {
				newVX = this.vx - this.frictionX;
			}
		} else {
			newVX = 0;
		}
	} else {
		newVX = this.vx + this.horizDirection * this.ax;
		if (-newVX > this.terminalX) {
			newVX = -this.terminalX;
		} else if (newVX > this.terminalX) {
			newVX = this.terminalX;
		}
	}
	this.vx = newVX;
	this.x += this.vx;
}

ClassUIPlayer.prototype.jump = function() {
	if (this.landed == false) {
		this.jumpState = false;
		return;
	}
	if (this.jumpState) {
		this.landed = false;
		this.vy = -10;
		this.jumpState = false;
	}
}

ClassUIPlayer.prototype.fall = function(platformList) {
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
		this.landed = true;
	}
	this.vy = newVY;
	this.y = newY;
}