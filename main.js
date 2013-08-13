window.addEventListener("load", function () {
	var canvas = new ClassCanvasWrapper({'canvasId':'the_game'});
	var player = new ClassUIPlayer({'x':121, 'y':50, 'width':10, 'height':10, 'color':'00FF00', 'frictionX':2});
	canvas.addPlatform(new ClassUIStatic({'x':110, 'y':10, 'width':20, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':40, 'y':70, 'width':20, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':200, 'y':90, 'width':20, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':10, 'y':460, 'width':200, 'height':10, 'color':'#FF0000'}));
	canvas.addPlatform(new ClassUIStatic({'x':110, 'y':420, 'width':30, 'height':10, 'color':'#FF0000'}));
	canvas.addPlayer(player);

	top.addEventListener("keydown", function (event) {
		if (!event) {
			event = window.event
		}
		var code = event.keyCode;
		if (event.charCode && code == 0) {
			code = event.charCode;
		}
		switch(code) {
			case 37:
				// Key left
				player.setHorizDirection(-1);
				event.preventDefault();
				break;
			case 38:
				// Key up.
				player.startJump(true);
				break;
			case 39:
				// Key right.
				player.setHorizDirection(1);
				event.preventDefault();
				break;
			case 40:
				// Key down.
				break;
		}
		
	});
	top.addEventListener("keyup", function (event) {
		if (!event) {
			event = window.event
		}
		var code = event.keyCode;
		if (event.charCode && code == 0) {
			code = event.charCode;
		}
		switch(code) {
			case 37:
				// Key left
				player.setHorizDirection(0);
				event.preventDefault();
				break;
			case 38:
				// Key up.
				break;
			case 39:
				// Key right.
				player.setHorizDirection(0);
				event.preventDefault();
				break;
			case 40:
				// Key down.
				break;
		}
		
	});
});