function lightningStrike()
{
	let sq = new Squid(vec(Math.random() * screen.x, 0));

	sq.hit_shape = vec(10, screen.y);

	let myTick = Math.random() * 500;
	sq.opacity = 0;

	sq.listen("tick", function()
	{
		myTick += 1;

		sq.opacity = 1 / myTick;

		if(myTick > 500)
		{
			myTick = 0;
		}
	})

	sq.regen = function()
	{
		sq.position.x = Math.random() * screen.x;
		myTick = Math.random() * 500;
		sq.opacity = 0;
	}

	sq.listen("draw_0", function()
	{
		ctx.beginPath();
		ctx.fillStyle = `rgba(255, 255, 255, ${sq.opacity})`;
		ctx.fillRect(sq.position.x, sq.position.y, 200, screen.y);
		ctx.closePath();
	});

	return sq;
}
