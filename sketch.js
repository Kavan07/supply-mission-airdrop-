var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
	landpointIMG = loadImage("landpoint.png")
	landpoint2IMG = loadImage("landpoint2.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	var packagebody_options = {
		restitution : 1.0
	}

	

	landpoint1 = createSprite(300, 600, 200, 100);
	landpoint1.addImage(landpointIMG);

	landpoint2 = createSprite(570, 600, 200, 100);
	landpoint2.addImage(landpoint2IMG);

	
	
	

	groundSprite=createSprite(width/2, height-2, width,10);
	groundSprite.shapeColor=color(255);

	cover = createSprite(420, 510, 600, 150);
	cover.shapeColor=color(0);

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution : 1.0, isStatic : true});
	World.add(world, packageBody);

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 695, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	 state = "start"

	Engine.run(engine);
  
}


function draw() {
  background(0);
  fill("red")
  rectMode(CENTER);
  Engine.update(engine);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  if (state === "start") {
     text("drop the package by pressing down arrow", 300, 350);
  }

  if (state === "done") {
	text("!!package supplied successfully!!", 300, 350);
	text("!!Now get out of here using right and left arrow keys!!", 300, 370);

	if(keyCode === RIGHT_ARROW) {
      helicopterSprite.velocityX = 10;
	}

	if(keyCode === LEFT_ARROW) {
		helicopterSprite.velocityX = -10;
	  }

	if((helicopterSprite.x > 405)||(helicopterSprite.x < 395)) {
	  state = "celebrate";
	  }
 }

 if (state === "celebrate") {
    text("you have done well", 300, 350);
 }

  drawSprites();
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	Matter.Body.setStatic(packageBody,false);
	state = "done"
  }
}



