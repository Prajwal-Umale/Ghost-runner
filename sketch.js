var tower,towerImage;
var gameState="play";
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var spookySound;

function preload(){
    towerImage=loadImage("tower.png");
    ghostImage=loadImage("ghost-standing.png");
    climberImage=loadImage("climber.png");
    doorImage=loadImage("door.png");

    spookySound=loadSound("spooky.wav");
}

function setup(){
    createCanvas(600,600);

    spookySound.loop();

    tower=createSprite(300,300);
    tower.addImage(towerImage);
    tower.velocityY=1;

    ghost=createSprite(200,200,50,50);
    ghost.addImage(ghostImage);
    ghost.scale=0.3;

    doorGroup=new Group();
    climberGroup=new Group();
    invisibleBlockGroup=new Group();
}

function draw(){
    background(0);

    if(gameState==="play"){
        if(tower.y>400){
            tower.y=300;
        }
         
       if(keyDown("space")){
           ghost.velocityY=-10;
       }
       ghost.velocityY=ghost.velocityY+0.8;
       if(keyDown("left_arrow")){
           ghost.x=ghost.x-3;
       }
       if(keyDown("righht_arrow")){
           ghost.x=ghost.x+3;
       }

       spawnDoors();

       if(climberGroup.isTouching(ghost)){
           ghost.velocityY=0;
       }

       if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
           ghost.destroy();
           gameState="end"
       }
       
       drawSprites();

    }
    
    if(gameState==="end"){
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over",230,250);
    }
}

function spawnDoors(){
   if(frameCount%240===0){
       door=createSprite(200,-50);
       door.addImage(doorImage);
       door.velocityY=1;
       door.x=Math.round(random(120,400));
       door.lifetime=800;
       doorGroup.add(door);

       door.depth=ghost.depth
       ghost.depth=ghost.depth+1;

       climber=createSprite(200,10);
       climber.addImage(climberImage);
       climber.velocityY=-1;
       climber.x=door.x;
       climber.lifetime=800;
       climberGroup.add(climber);

       invisibleBlock=createSprite(200,15);
       invisibleBlock.velocityY=1;
       invisibleBlock.x=door.x;
       invisibleBlock.lifetime=800;
       invisibleBlockGroup.add(invisibleBlock);


       
   }
}
