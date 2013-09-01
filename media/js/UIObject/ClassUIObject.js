function ClassUIObject(options) {
	this.init(options);
};

ClassUIObject.prototype = {
	init: function(options) {
		this.x = options.x;
		this.y = options.y;
		this.width = options.width;
		this.height = options.height;
		this.color = options.color;
	},
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
	getParamsObj: function() {
		var returnObj = {};
		var keys = Object.keys(this);
		for (var i=0; i<keys.length; i++) {
			key = keys[i];
			value = this[key];
			returnObj[key] = value;
		}
		return returnObj;
	}
};
