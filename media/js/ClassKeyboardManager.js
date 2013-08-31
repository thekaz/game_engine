function ClassKeyboardManager(options) {
	this.init(options);
};

ClassKeyboardManager.prototype = {
	init: function(options) {
		this.codeMap = {
			37:"left",
			38:"up",
			39:"right",
			40:"down"
		};
		this.defaultExemptions = {
			116: true
		};
		this.keyPressMap = {};
		this.registerKeyDown();
		this.registerKeyUp();
	},
	registerKeyDown: function() {
		top.addEventListener("keydown", function (event) {
			if (!event) {
				event = window.event
			}
			var code = event.keyCode;
			if (!(code in this.defaultExemptions)) {
				event.preventDefault();
			}
			if (event.charCode && code == 0) {
				code = event.charCode;
			}
			var keyName = this.__lookUpKeyCode(code);
			if (keyName != undefined) {
				this.keyPressMap[keyName] = true;
			}
		}.bind(this));
	},
	registerKeyUp: function() {
		top.addEventListener("keyup", function (event) {
			if (!event) {
				event = window.event
			}
			event.preventDefault();
			var code = event.keyCode;
			if (event.charCode && code == 0) {
				code = event.charCode;
			}
			var keyName = this.__lookUpKeyCode(code);
			if ((keyName != undefined) && (keyName in this.keyPressMap)) {
				delete this.keyPressMap[keyName];
			}			
		}.bind(this));
	},
	getKeyPressMap: function() {
		return this.keyPressMap;
	},
	__lookUpKeyCode: function(code) {
		if (code in this.codeMap) {
			return this.codeMap[code];
		} else {
			return undefined;
		}
	}
};