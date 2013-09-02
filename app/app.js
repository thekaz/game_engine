var http = require('http');
var queryString = require('querystring');
var fileSystem = require('fs');

require('daemon')();

http.createServer(function (req, res) {
	if (req.method == 'GET') {
		fileSystem.readFile("/usr/local/web/game_engine/save/save.json", function(err, data) {
			if (err) {
				console.log('error loading file');
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end("{'status':'failed'}");
			} else {
				console.log('reading file');
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end(data);
			}
		})
	} else if (req.method == 'POST') {
		var body = '';
		req.on('data', function(data) {
			body += data;
		});
		var returnStatus;
		req.on('end', function () {
			fileSystem.writeFile("/usr/local/web/game_engine/save/save.json", body, function(err) {
				if (err) {
					console.log('error saving file');
					returnStatus = "failed";
				} else {
					console.log('save successful');
					returnStatus = "success";
				}
			});
		});
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end("{'status':'"+returnStatus+"'}");
	}
}).listen('8080', '127.0.0.1');
console.log("Server running at http://127.0.0.1:8080");
