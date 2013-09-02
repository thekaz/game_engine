window.addEventListener("load", function () {
	var maker = new ClassMakerWrapper({'canvasId':'the_game',
		'canvas_up_button':document.getElementById("canvas_up"),
		'canvas_down_button':document.getElementById("canvas_down"),
		'canvas_left_button':document.getElementById("canvas_left"),
		'canvas_right_button':document.getElementById("canvas_right"),
		'add_player_button':document.getElementById("add_player"),
		'add_horiz_platform_button':document.getElementById("add_horiz_platform"),
		'add_verti_platform_button':document.getElementById("add_verti_platform"),
		'add_box_button':document.getElementById("add_box"),
		'delete_button':document.getElementById("delete"),
		'length_field':document.getElementById("length_field"),
		'save_button':document.getElementById("save_button"),
		'load_button':document.getElementById("load_button")
	});
});
