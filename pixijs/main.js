
const Math2 = {};

Math2.random = function(from, to) {
	return Math.random()*(to-from) + from;
}

Math2.map = function(val, inputMin, inputMax, outputMin, outputMax) {
	return ((outputMax - outputMin) * ((val - inputMin)/(inputMax - inputMin))) + outputMin;
}

Math2.randomPlusMinus = function(chance) {
	chance = chance ? chance : 0.5;
	return (Math.random() > chance) ? -1 : 1;
}

Math2.randomInt = function(from, to) {
	to += 1;
	return Math.floor(Math.random()*(to-from) + from);
}

Math2.randomBool = function(chance) {
	chance = chance ? chance : 0.5;
	return (Math.random() < chance) ? true : false;
}

/// Main
const $ = document.querySelector.bind(document);

document.addEventListener('DOMContentLoaded', (_) => {
  onReady()
})

let width = 640;
let height = 360;

let wabbitTexture;
let pirateTexture;

let bunnys = [];
let gravity = 0.5//1.5 ;

let maxX = width;
let minX = 0;
let maxY = height;
let minY = 0;

let startBunnyCount = 2;
let isAdding = false;
let count = 0;
let elapsed = 0.0;
let container;
let app;

let amount = 100;

function onReady()
{
	
	// renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor:0xFFFFFF});
  app = new PIXI.Application({ width, height });
  renderer = app.renderer

	stage = app.stage

	app.view.style["transform"] = "translatez(0)";
	//alert(amount)
	document.body.appendChild(app.view);
	app.view.style.position = "absolute";
	stats = new Stats();
	
	
	document.body.appendChild( stats.domElement );
	stats.domElement.style.position = "absolute";
	stats.domElement.style.bottom = "0px";

	//Texture.from
	wabbitTexture = PIXI.Texture.from("./bunnys.png")

	counter = document.createElement("div");
	counter.className = "counter";
	document.body.appendChild( counter);
	
	count = startBunnyCount;
	counter.innerHTML = count + " BUNNIES";
	
	container = new PIXI.ParticleContainer(200000, [false, true, false, false, false]);
	stage.addChild(container);
	//var filter = new PIXI.filters.ColorMatrixFilter();

	bunny1 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(2, 47, 26, 37));
	bunny2 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(2, 86, 26, 37));
	bunny3 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(2, 125, 26, 37));
	bunny4 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(2, 164, 26, 37));
	bunny5 = new PIXI.Texture(wabbitTexture.baseTexture, new PIXI.Rectangle(2, 2, 26, 37));

	bunnyTextures = [bunny1, bunny2, bunny3, bunny4, bunny5];
	bunnyType = 2;
	currentTexture = bunnyTextures[bunnyType];

	for (var i = 0; i < startBunnyCount; i++) 
	{
		var bunny = new PIXI.Sprite(currentTexture);
		bunny.speedX = Math.random() * 10;
		bunny.speedY = (Math.random() * 10) - 5;
		
		bunny.anchor.x = 0.5;
		bunny.anchor.y = 1;


		bunnys.push(bunny);

	//	bunny.filters = [filter];	
	//	bunny.position.x = Math.random() * 800;
	//	bunny.position.y = Math.random() * 600;
			

		container.addChild(bunny);
	}
	
	
	app.view.addEventListener('mousedown', function(){
		isAdding = true;
	});
	
	app.view.addEventListener('mouseup', function(){
		bunnyType++
		bunnyType %= 5;
		currentTexture = bunnyTextures[bunnyType];

		isAdding = false;
	})

	
  app.ticker.add((delta) => {
    elapsed += delta;
    update(delta)
  });

}

function update(delta)
{
  console.log(">>>")
	stats.begin();
	if(isAdding)
	{
		// add 10 at a time :)
		
		if(count < 200000)
		{

			for (var i = 0; i < amount; i++) 
			{
				var bunny = new PIXI.Sprite(currentTexture);
				bunny.speedX = Math.random() * 10;
				bunny.speedY = (Math.random() * 10) - 5;
				bunny.anchor.y = 1;
				//bunny.alpha = 0.3 + Math.random() * 0.7;
				bunnys.push(bunny);
				bunny.scale.set(0.5 + Math.random()*0.5);

				bunny.rotation = (Math.random()-0.5)
			
				//bunny.rotation = Math.random() - 0.5;
				var random = Math2.randomInt(0, container.children.length-2);
				container.addChild(bunny)//, random);
				
				count++;
			}
		}
	
		
		counter.innerHTML = count + " BUNNIES";
	}
	
	for (var i = 0; i < bunnys.length; i++) 
	{
		var bunny = bunnys[i];
		//bunny.rotation += 0.1
	
		bunny.position.x += bunny.speedX;
		bunny.position.y += bunny.speedY;
		bunny.speedY += gravity;
		
		if (bunny.position.x > maxX)
		{
			bunny.speedX *= -1;
			bunny.position.x = maxX;
		}
		else if (bunny.position.x < minX)
		{
			bunny.speedX *= -1;
			bunny.position.x = minX;
		}
		
		if (bunny.position.y > maxY)
		{
			bunny.speedY *= -0.85;
			bunny.position.y = maxY;
			bunny.spin = (Math.random()-0.5) * 0.2
			if (Math.random() > 0.5)
			{
				bunny.speedY -= Math.random() * 6;
			}
		} 
		else if (bunny.position.y < minY)
		{
			bunny.speedY = 0;
			bunny.position.y = minY;
		}
		
	}
	
	renderer.render(stage);
	stats.end();
}

