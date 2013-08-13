function ClassUIDynamic (options) {
	ClassUIObject.call(this, options);
}
ClassUIDynamic.prototype = Object.create(ClassUIObject.prototype);

ClassUIDynamic.prototype.init = function(options) {
	ClassUIObject.prototype.init.call(this, options);

	this.vx = options.vx || 0;
	this.vy = options.vy || 0;

	this.ax = options.ax || 2;
	this.ay = options.ay || 1;
	
	this.terminalX = options.terminalX || 10;
	this.terminalY = options.terminalY || 100;
	
	this.frictionX = options.frictionX || 0;
	this.frictionY = options.frictionY || 0;
}

ClassUIDynamic.prototype.getAX = function() {
	return this.ax;
}

ClassUIDynamic.prototype.getAY = function() {
	return this.ay;
}