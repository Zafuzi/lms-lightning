let screen = vec(1280, 960);

let titleFont = load_font("Arial", 30, "#F09D28");

let assets = {};

let images = [
	"data/slime1.png"
];

let sounds = [
	"data/plink.ogg"
];

let can_play_audio = false;

let ctx = null;

let score = 0;
let lives = 3;

document.addEventListener("DOMContentLoaded", function()
{
	canvas.width = screen.x;
	canvas.height = screen.y;

	scale_canvas(screen);

	debug = false;

	ctx = canvas.getContext("2d");

	// title/loading screen
	title = new Thing();
	load_progress = 0;
	load_file = "";

	title.listen( "draw_4", ( mouse_x, mouse_y ) => {
		if( load_progress < 1.0 ) {
			draw_text( "LMS Lightning", screen.x * 0.5, screen.y * 0.5 - 15, titleFont, "center", 0.4 );
			draw_text( "Loading: "+round(load_progress * 100)+"% "+load_file, screen.x * 0.5 + 15, screen.y * 0.4, titleFont, "center", 0.5 );
		} else  {
			draw_text( "Try to catch the clouds before they disappear", screen.x * 0.5, screen.y * 0.5 - 15, titleFont, "center", 1 );
			draw_text( "Click to start ", screen.x * 0.5, screen.y * 0.5 + 15, titleFont, "center", 1 );

			load_file = "";
		}
	} );


	load_assets( images, sounds, ( prog, file, asst, type ) => {

		load_progress = prog;
		load_file = file;
		assets[ file ] = asst;

		log( load_progress+"% "+type+" "+file );
		if( load_progress >= 1.0 ) {
			title.listen( "mousedown", () => {
				title.destroy();	// destroy the title page
				//debug = true;

				lightningStrike();

				let gui = new Thing();
				gui.lost = false;
				gui.listen("tick", function()
				{
					if(lives === 0)
					{
						gui.lost = true;
					}
				})
				gui.listen( "draw_0", ( mouse_x, mouse_y ) => {
					if(gui.lost === false)
					{
						draw_text( `Score: ${score}`, 24, 24, titleFont, "left", 1 );
						draw_text( `Lives: ${lives}`, screen.x - 24, 24, titleFont, "right", 1 );
					}
					else
					{
						draw_text( `Game Over!`, screen.x * 0.5, screen.y * 0.4, titleFont, "center", 1 );
						draw_text( `Final Score: ${score}`, screen.x * 0.5, screen.y * 0.5, titleFont, "center", 1 );
						draw_text( `Click to try again`, screen.x * 0.5, screen.y * 0.6, titleFont, "center", 1 );

						if(Player)
						{
							Player.destroy();
						}

						gui.listen("mousedown", function()
						{
							window.location.reload();
						})
					}

				});
				player();
			});
		}

	}, console.error );

	tick( true ); // turn on ticking; tick handlers will be called
});

// helpers
function degrees2radians(degrees)
{
	return degrees * (Math.PI/180);
}

function radians2degrees(radians)
{
	return radians * (180/Math.PI);
}
