function lightningStrike()
{
	let radius = 200;
	let sq = new Squid(vec((Math.random()  * (screen.x - radius) + radius), Math.random() * screen.y));

	let popSound = assets["data/plink.ogg"];

	sq.radius = radius;
	sq.hit_shape = sq.radius;

	let ticker = 0;
	let radiusDecrementSpeed = 2;
	sq.listen("tick", function()
	{
		screenWrap(sq);

		if(ticker % 2 === 0)
		{
			sq.radius -= radiusDecrementSpeed;
		}
		if(sq.radius <= 0)
		{
			popSound.play();
			lives -= 1;
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
			popSound.play();
			sq.destroy();
			lightningStrike();
			changeBackground();
			radiusDecrementSpeed += 0.1;
			score += 1;
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
