function ClassMotion (options) {
	this.init(options);
}

ClassMotion.prototype = {
	init: function(options) {
		this.vx = options.vx || 0;
		this.vy = options.vy || 0;

		this.ax = options.ax || 2;
		this.ay = options.ay || 1;
	
		this.terminalX = options.terminalX || 5;
		this.terminalY = options.terminalY || 100;
	
		this.frictionX = options.frictionX || 0;
		this.frictionY = options.frictionY || 0;
		this.horizDirection = 0;
		this.jumpState = false;
		this.landed = false;
	},
	startJump: function() {
		this.jumpState = true;
	},
	setHorizDirection: function(direction) {
		if (direction < 0) {
			this.horizDirection = -1;
		} else if (direction > 0) {
			this.horizDirection = 1;
		} else if (direction == 0) {
			this.horizDirection = 0;
		}
	},
	jump: function() {
		if (this.landed == false) {
			this.jumpState = false;
		}
		if (this.jumpState) {
			this.landed = false;
			this.jumpState = false;
			this.vy = -12;
		}
	},
	move: function(x, y, height, width, platformList) {
		var xValues = this.__getNewX(x); //keys are vx and x
		var yValues = this.__getNewY(y); //keys are vy and y
		var collisions = this.__getCollisions(platformList, x, y, xValues['x'], yValues['y'], height, width); //keys are x and y
		var newX = x;
		var newY = y;
		if (collisions['x'] > -1) {
			this.vx = 0;
			newX = collisions['x'];
		} else {
			this.vx = xValues['vx'];
			newX = xValues['x'];
		}
		if (collisions['y'] > -1) {
			this.vy = 0;
			newY = collisions['y'];
		} else {
			this.vy = yValues['vy'];
			newY = yValues['y'];
		}
		return {'x':newX, 'y':newY}
	},
	__getNewX: function(oldX) {
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
		return {'vx':newVX, 'x':oldX+newVX};

	},
	__getNewY: function(oldY) {
		// get the new velocity
		var newVY = this.vy + this.ay;
		// check fall speed vs terminal velocity
		if (newVY > this.terminalY) {
			newVY = this.terminalY;
		}
		// build the new position
		var newY = oldY + newVY;
		
		return {'vy':newVY, 'y':newY};
	},
	__getCollisions: function(platformList, oldX, oldY, newX, newY, height, width) {
		// check the new position for collision
		var collisions = {'x':-1, 'y':-1};
		for (var i=0; i<platformList.length; i++) {
			var platform = platformList[i];
			// check to see if the player new position collides with any platform
			// check if the player is potentially colliding with the platform vertically
			if (collisions['y'] < 0) {
				if (
					(
						(newX <= platform.getX() + platform.getWidth()) && // the player's right will be to the left of the platform's right edge
						(newX + width >= platform.getX()) // the player's left will be to the right of the platform's left edge
					)
				) {
					var vertCollisionReturn = this.__checkVertCollision(platform, oldY, newY, height);
					if (vertCollisionReturn['y'] > -1) {
						collisions['y'] = vertCollisionReturn['y'];
					}
				}
			}
			
			// check if the player is potentially colliding with the platform horizontally
			if (collisions['x'] < 0) {
				if (
					(
						(newY + height >= platform.getY()) && // the player's feet will be below the platform's top
						(newY <= platform.getY() + platform.getHeight()) // the player's head will be above the platform's bottom
					)
				) {
					var xCollisions = this.__checkHorizCollision(platform, oldX, newX, width);
					if (xCollisions > -1) {
						collisions['x'] = xCollisions;
					}
				}
			}
		}
		return collisions;

	},
	__checkVertCollision: function(platform, oldY, newY, height) {
		// check if the player is passing through the top of the platform
		if ( 
			(oldY + height <= platform.getY()) &&
			(newY + height >= platform.getY())
		) {
			this.landed = true;
			return {'y':platform.getY() - height};
		}
		// check if the player is passing through the bottom of the platform
		if (
			(oldY >= platform.getY() + platform.getHeight()) &&
			(newY <= platform.getY() + platform.getHeight())
		) {
			this.landed = false;
			return {'y':platform.getY() + platform.getHeight()};
		}
		
		return {'y':-1};
	},

	__checkHorizCollision: function(platform, oldX, newX, width) {
		// check if the player is passing through the right of the platform
		if (
			(oldX >= platform.getX() + platform.getWidth()) &&
			(newX <= platform.getX() + platform.getWidth())
		) {
			return platform.getX() + platform.getWidth();
		}
		
		// check if the player is passing through the left of the platform
		if (
			(oldX + width <= platform.getX()) &&
			(newX + width >= platform.getX())
		) {
			return platform.getX() - width;
		}
		return -1;
	}
}
