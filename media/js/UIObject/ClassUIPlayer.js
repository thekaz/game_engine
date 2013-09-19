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
	this.mover = new ClassMotion(options);
};

ClassUIPlayer.prototype.oldsetHorizDirection = function(direction) {
	if (direction < 0) {
		this.horizDirection = -1;
	} else if (direction > 0) {
		this.horizDirection = 1;
	} else if (direction == 0) {
		this.horizDirection = 0;
	}
};

ClassUIPlayer.prototype.setHorizDirection = function(direction) {
	this.mover.setHorizDirection(direction)
}

ClassUIPlayer.prototype.getHorizDirection = function() {
	return this.horizDirection;
};

ClassUIPlayer.prototype.startJump = function() {
	this.jumpState = true;
};

ClassUIPlayer.prototype.move = function(platformList) {
	if (this.landed == false) {
		this.jumpState = false;
	}
	if (this.jumpState) {
		this.landed = false;
		this.jumpState = false;
		this.mover.setVY(-12);
	}
	var moveResult = this.mover.move(this.x, this.y, this.height, this.width, platformList);
	this.x = moveResult['x'];
	this.y = moveResult['y'];
	this.landed = moveResult['landed'];
};
