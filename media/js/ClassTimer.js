function ClassTimer (options) {
	this.canvasElement = document.getElementById(options.canvasId);
	var eventName = 'tick_tock';
	this.event = new CustomEvent(eventName);
	this.event.initEvent(eventName, false, false);
	
	this.fps = options.fps || 30;
	this.timeInterval = Math.floor(1000/this.fps);
	this.timeInit = null;
	
	this.runCallback = options.runCallback;
}

ClassTimer.prototype = {
	start: function() {
		if (this.timer == null) {
			this.timeInit = Date.now();
			this.run();
		}
	},
	run: function() {
		this.timeInit += this.timeInterval;
		this.timer = setTimeout (
			function (){
				//this.canvasElement.dispatchEvent(this.event);
				this.runCallback();
				this.run();
			}.bind(this),
			this.timeInit - Date.now()
		);
	},
	stop: function () {
		clearTimeout(this.timer);
		this.timer = null;
	}
}