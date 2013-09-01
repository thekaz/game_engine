function ClassUIVertiPlatform (options) {
	ClassUIPlatform.call(this, options);
}

ClassUIVertiPlatform.prototype = Object.create(ClassUIPlatform.prototype);

ClassUIVertiPlatform.prototype.init = function(options) {
	if (!options.width) {
		options.width = 10;
	}
	if (options.length) {
		options.height = options.length;
	}
	ClassUIPlatform.prototype.init.call(this, options);
}
