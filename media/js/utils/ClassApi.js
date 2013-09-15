ClassApi = function(options) {
	this.init(options);
}

ClassApi.prototype = {
	init: function(options) {
		if (!options) {
			options = {};
		}
		this.url = options.url || "/app/";
	},
	sendSave: function(jsonString) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", "/app/", true);
		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlHttp.send(jsonString);
	},
	sendLoad: function(callback) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", "/app/", true);
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {			
				callback(xmlHttp.responseText);
			}
		}.bind(this);
		xmlHttp.send();
	},
}
