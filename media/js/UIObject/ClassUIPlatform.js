function ClassUIPlatform (options) {
	ClassUIStatic.call(this, options);
}

ClassUIPlatform.prototype = Object.create(ClassUIObject.prototype);

ClassUIPlatform.prototype.init = function(options) {
	if (!options.color) {
		options.color = "#FF0000";
	}
	ClassUIStatic.prototype.init.call(this, options);
}
