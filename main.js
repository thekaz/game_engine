window.addEventListener("load", function () {
	var canvas = new ClassCanvasWrapper({'canvasId':'the_game'});
	canvas.addPlatform(new ClassUIStatic({'x':110, 'y':10, 'width':20, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':40, 'y':70, 'width':20, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':200, 'y':90, 'width':20, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':10, 'y':460, 'width':200, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':110, 'y':420, 'width':30, 'height':10, 'color':'#FF0000'}));
	canvas.addPlayer(new ClassUIDynamic({'x':121, 'y':50, 'width':10, 'height':10, 'color':'00FF00'}));
});