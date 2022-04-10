function lightningStrike()
{
	let radius = 200;
	let sq = new Squid(vec((Math.random()  * (screen.x - radius) + radius), Math.random() * screen.y));

	sq.radius = radius;
	sq.hit_shape = sq.radius;

	let ticker = 0;
	let radiusDecrementSpeed = 4;
	sq.listen("tick", function()
	{
		screenWrap(sq);

		if(ticker % radiusDecrementSpeed === 0)
		{
			sq.radius -= 1;
		}
		if(sq.radius <= 0)
		{
			sq.destroy();
			lightningStrike();
		}

		sq.hit_shape = sq.radius;
		ticker += 1;
	});

	sq.listen("collide", function(collider, self)
	{
		if(collider.name === "Player")
		{
			console.log("smuck")
			sq.destroy();
			lightningStrike();
			changeBackground();
			radiusDecrementSpeed -= 0.01;
		}
	});

	sq.listen("draw_0", function()
	{
		ctx.beginPath();
		ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
		ctx.arc(sq.position.x, sq.position.y, sq.radius, 0, degrees2radians(360));
		ctx.fill();
		ctx.closePath();
	});

	return sq;
}
