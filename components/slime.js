let move_left = newInputType("move_left", ["a", "h", "arrowLeft"]);
let move_right = newInputType("move_right", ["d", "l", "arrowRight"]);
let move_down = newInputType("move_down", ["s", "j", "arrowDown"]);
let move_up = newInputType("move_up", ["w", "k", "arrowUp"]);

let hasNotMovedYet = true;

let Player = null;

function player()
{
	let player_img = assets["data/slime1.png"];
	let player_collide_sound = assets["data/plink.ogg"];

	let sq = new Squid(vec(100, 100), player_img);

	sq.hit_shape = player_img.make_radius();
	sq.name = "Player";

	sq.listen("tick", function()
	{
		handleMovement(sq);
		screenWrap(sq);
	});

	sq.listen("collide");

	let movementTutorial = new Thing();

	movementTutorial.listen( "draw_4", ( mouse_x, mouse_y ) => {
		if( hasNotMovedYet ) {
			draw_text( "WASD to move", screen.x * 0.5, screen.y * 0.5 - 15, titleFont, "center", 1 );
		} else  {
			movementTutorial.destroy();
		}
	});

	setTimeout(function()
	{
		movementTutorial.destroy();
	}, 3000);

	Player = sq;
}

function handleMovement(sq)
{

	if(move_left.pressed)
	{
		sq.velocity.x -= 1;
		hasNotMovedYet = false;
	}

	if(move_right.pressed)
	{
		sq.velocity.x += 1;
		hasNotMovedYet = false;
	}

	if(move_up.pressed)
	{
		sq.velocity.y -= 1;
		hasNotMovedYet = false;
	}

	if(move_down.pressed)
	{
		sq.velocity.y += 1;
		hasNotMovedYet = false;
	}

	sq.velocity.x *= 0.95;
	sq.velocity.y *= 0.95;
}

function screenWrap(sq)
{
	let sqWidth = (sq.image?.w || sq.radius) * sq.scale;
	let sqHeight = (sq.image?.h || sq.radius)  * sq.scale;


	if(sq.position.x + sqWidth / 2 < 0)
	{
		sq.position.x = screen.x;
	}

	if(sq.position.x > screen.x + sqWidth / 2)
	{
		sq.position.x = -sqWidth / 2;
	}

	if(sq.position.y + sqHeight / 2 < 0)
	{
		sq.position.y = screen.y;
	}

	if(sq.position.y > screen.y + sqHeight / 2)
	{
		sq.position.y = -sqHeight / 2;
	}

}

function changeBackground()
{
	canvas.style.backgroundColor = `rgb(${Math.random()*50}, ${Math.random()*50}, ${Math.random()*50})`;
	//redrawLightning();
}
