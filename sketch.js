var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaGroup, bananaimg, bananaScore = 0
var obstacleGroup, obstacleimg
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaimg = loadImage("banana.png")
obstacleimg = loadImage("stone.png")
overimg = loadAnimation("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("Gameover", overimg)
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  bananaGroup = new Group ()
  obstacleGroup = new Group ()
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  createBanana()
  createObstacle()
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(bananaGroup.isTouching(player))
    {
    bananaGroup.destroyEach()
  bananaScore = bananaScore + 2
  player.scale += 0.1
    }

    if(obstacleGroup.isTouching(player))
    {
    gameState = END
    }
    

  } 
  else if(gameState === END)
  {
  backgr.velocityX = 0
  player.scale = 1  
  player.x = 400
  player.y = 200
  player.changeAnimation("Gameover", overimg)

  obstacleGroup.destroyEach()
  bananaGroup.destroyEach()
  }

  drawSprites();
}

function createBanana()
{
if (frameCount % 80 === 0)
{
var banana = createSprite(600,250, 400, 10)
banana.y = random(120,200)
banana.addImage("bananaimg", bananaimg)
banana.scale = 0.05
banana.velocityX = -4

banana.lifetime = 300
player.depth = banana.depth + 1
bananaGroup.add(banana)
}
}

function createObstacle()
{
if(frameCount % 80 === 0)
{
var obstacles = createSprite(600,250,400,10)
obstacles.y = random(250,300)
obstacles.addImage("obstacleimg", obstacleimg)
obstacles.scale = 0.1
obstacles.velocityX = -5

obstacles.lifetime = 160
player.depth = obstacles.depth + 1
obstacleGroup.add(obstacles)
}
}
