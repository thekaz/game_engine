function ClassUIHorizPlatform (options) {
	ClassUIPlatform.call(this, options);
}

ClassUIHorizPlatform.prototype = Object.create(ClassUIPlatform.prototype);

ClassUIHorizPlatform.prototype.init = function(options) {
	if (!options.height) {
		options.height = 10;
	}
	if (options.length) {
		options.width = options.length;
	}
	ClassUIPlatform.prototype.init.call(this, options);
}
