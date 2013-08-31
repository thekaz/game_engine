window.addEventListener("load", function () {
	var canvas = new ClassCanvasWrapper({'canvasId':'the_game'});
	var player = new ClassUIPlayer({'x':75, 'y':700, 'width':10, 'height':10, 'color':'#00FF00', 'frictionX':2});
	// bounding box
	canvas.addPlatform(new ClassUIStatic({'x':50, 'y':740, 'width':900, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':50, 'y':40, 'width':10, 'height':710, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':950, 'y':40, 'width':10, 'height':710, 'color':'#FF0000'}));
	// 
	canvas.addPlatform(new ClassUIStatic({'x': 100, 'y':700, 'width':40, 'height':40, 'color':'#FF0000'}));
	canvas.addPlayer(player);
	canvas.runOnTickTock();
});