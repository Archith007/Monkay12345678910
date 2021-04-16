
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var size = 0.1            

score = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
 monkey = createSprite(35,365);
 monkey.addAnimation("monkeyRunning",monkey_running);
 monkey.debug = false  
 
  
 ground = createSprite(200,440,400)
 ground2 = createSprite(200,380,400, 1)
 ground2.visible = false

 
 foodGroup = createGroup()
 obstacleGroup = createGroup()
}


function draw() {
 background("white")

 monkey.scale = size
  
if(monkey.isTouching(foodGroup)){
  score = score+10
  size = size + 0.005
  foodGroup.destroyEach()
}

  
 text("score:" + score,350,25)
 
if((keyDown("space"))&&(monkey.isTouching(ground2))){
  monkey.velocityY = -20
}
  
  monkey.velocityY = monkey.velocityY + 1.2
  monkey.collide(ground)
  
  if((frameCount%70 === 0)&&(frameCount>150)){
    obstacles()
  }
  
  if(frameCount%75 === 0){
    bananas()
  }

  
  if(obstacleGroup.isTouching(monkey)){

     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
    
     monkey.velocityY = 0
    
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
    
    foodGroup.destroyEach()
    text("GAMEOVER YOU LOSER", 200,200 )
  } 
  
  drawSprites()
}


function obstacles(){
  
  var obstacle = createSprite(400,375);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -(frameCount/50);
  obstacle.lifetime = 200;
  obstacle.debug = false
  obstacle.setCollider('rectangle',0,0,20,20  )
  obstacleGroup.add(obstacle);
  
}

function bananas(){
  
  var banana = createSprite(400,random(200,350));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;
  banana.lifetime = 85;
  foodGroup.add(banana);
  
}



