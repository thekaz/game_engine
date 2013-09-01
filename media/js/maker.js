window.addEventListener("load", function () {
	var maker = new ClassMakerWrapper({'canvasId':'the_game',
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
