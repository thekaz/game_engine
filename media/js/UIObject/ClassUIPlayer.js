function ClassUIPlayer (options) {
	ClassUIDynamic.call(this, options);
};

ClassUIPlayer.prototype = Object.create(ClassUIDynamic.prototype);

ClassUIPlayer.prototype.init = function(options) {
	if (!options.width) {
		options.width = 10;
	}
	if (!options.height) {
		options.height = 10;
	}
	if (!options.color) {
		options.color = "#00FF00";
	}
	if (!options.frictionX) {
		options.frictionX = 2;
	}
	ClassUIDynamic.prototype.init.call(this, options);
	this.horizDirection = 0;
	this.jumpState = false;
	this.landed = false;
};

ClassUIPlayer.prototype.setHorizDirection = function(direction) {
	if (direction < 0) {
		this.horizDirection = -1;
	} else if (direction > 0) {
		this.horizDirection = 1;
	} else if (direction == 0) {
		this.horizDirection = 0;
	}
};

ClassUIPlayer.prototype.getHorizDirection = function() {
	return this.horizDirection;
};

ClassUIPlayer.prototype.startJump = function() {
	this.jumpState = true;
};

ClassUIPlayer.prototype.move = function(platformList) {
	this.jump();
	var xValues = this.__getNewX(); //keys are vx and x
	var yValues = this.__getNewY(); //keys are vy and y
	var collisions = this.__getCollisions(platformList, xValues['x'], yValues['y']); //keys are x and y
	var oldX = this.x;
	if (collisions['x'] > -1) {
		this.vx = 0;
		this.x = collisions['x'];
	} else {
		this.vx = xValues['vx'];
		this.x = xValues['x'];
	}
	if (collisions['y'] > -1) {
		this.vy = 0;
		this.y = collisions['y'];
		if (collisions['landed']) {
			this.landed = true;
		} else {
			this.landed = false;
		}
	} else {
		this.landed = false;
		this.vy = yValues['vy'];
		this.y = yValues['y'];
	}
};

ClassUIPlayer.prototype.__getNewX = function(platformList) {
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

	return {'vx':newVX, 'x':this.x+newVX};
	//this.vx = newVX;
	//this.x += this.vx;
};

ClassUIPlayer.prototype.jump = function() {
	if (this.landed == false) {
		this.jumpState = false;
		return;
	}
	if (this.jumpState) {
		this.landed = false;
		this.vy = -12;
		this.jumpState = false;
	}
};

ClassUIPlayer.prototype.__getNewY = function(platformList) {
	// get the new velocity
	var newVY = this.vy + this.ay;
	// check fall speed vs terminal velocity
	if (newVY > this.terminalY) {
		newVY = this.terminalY;
	}
	// build the new position
	var newY = this.y + newVY;
	
	return {'vy':newVY, 'y':newY};
	//this.vy = newVY;
	//this.y = newY;
};

ClassUIPlayer.prototype.__getCollisions = function(platformList, newX, newY) {
	// check the new position for collision
	var collisions = {'x':-1, 'y':-1, 'landed':false};
	for (var i=0; i<platformList.length; i++) {
		var platform = platformList[i];
		// check to see if the player new position collides with any platform
		// check if the player is potentially colliding with the platform vertically
		if (collisions['y'] < 0) {
			if (
				(
					(newX <= platform.getX() + platform.getWidth()) && // the player's right will be to the left of the platform's right edge
					(newX + this.width >= platform.getX()) // the player's left will be to the right of the platform's left edge
				)
			) {
				var vertCollisionReturn = this.__checkVertCollision(platform, newY);
				if (vertCollisionReturn['y'] > -1) {
					collisions['y'] = vertCollisionReturn['y'];
					collisions['landed'] = vertCollisionReturn['landed'];
				}
			}
		}
		
		// check if the player is potentially colliding with the platform horizontally
		if (collisions['x'] < 0) {
			if (
				(
					(newY + this.height >= platform.getY()) && // the player's feet will be below the platform's top
					(newY <= platform.getY() + platform.getHeight()) // the player's head will be above the platform's bottom
				)
			) {
				var xCollisions = this.__checkHorizCollision(platform, newX);
				if (xCollisions > -1) {
					collisions['x'] = xCollisions;
				}
			}
		}
	}
	return collisions;
};

ClassUIPlayer.prototype.__checkVertCollision = function(platform, newY) {
	// check if the player is passing through the top of the platform
	if ( 
		(this.y + this.height <= platform.getY()) &&
		(newY + this.height >= platform.getY())
	) {
		return {'y':platform.getY() - this.height, 'landed':true};
	}
	// check if the player is passing through the bottom of the platform
	if (
		(this.y >= platform.getY() + platform.getHeight()) &&
		(newY <= platform.getY() + platform.getHeight())
	) {
		return {'y':platform.getY() + platform.getHeight(), 'landed':false};
	}
	
	return {'y':-1};
};

ClassUIPlayer.prototype.__checkHorizCollision = function(platform, newX) {
	// check if the player is passing through the right of the platform
	if (
		(this.x >= platform.getX() + platform.getWidth()) &&
		(newX <= platform.getX() + platform.getWidth())
	) {
		return platform.getX() + platform.getWidth();
	}
	
	// check if the player is passing through the left of the platform
	if (
		(this.x + this.width <= platform.getX()) &&
		(newX + this.width >= platform.getX())
	) {
		return platform.getX() - this.width;
	}
	return -1;
};













