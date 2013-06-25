window.addEventListener("load", function () {
	var canvas = new ClassCanvasWrapper({'canvasId':'the_game'});
	canvas.addPlatform(new ClassUIObject({'x':10, 'y':10, 'width':20, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIObject({'x':0, 'y':470, 'width':640, 'height':10, 'color':'#FF0000'}));
	canvas.addPlayer(new ClassUIObject({'x':35, 'y':10, 'width':10, 'height':10, 'color':'00FF00'}));
});