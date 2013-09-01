function ClassUIBox (options) {
	ClassUIStatic.call(this, options);
}

ClassUIBox.prototype = Object.create(ClassUIObject.prototype);

ClassUIBox.prototype.init = function(options) {
	if (!options.color) {
		options.color = "#FF6600";
	}
	if (options.length) {
		options.height = options.length;
		options.width = options.length;
	}
	ClassUIStatic.prototype.init.call(this, options);
}
