var dog,sadDog,happyDog;
var fs;
var x=100;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database=firebase.database();
  //console.log(database);

  foodStockref=database.ref('foodStock');
  foodStockref.on("value",readFoodStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedbtn=createButton("Feed milk to  Dog");
  feedbtn.position(500,500);
  feedbtn.mousePressed(feedDog);

  addfoodbtn=createButton("Add more milk bottle");
  addfoodbtn.position(700,500);
  addfoodbtn.mousePressed(addFood);

 


 
  foodObj=new Food();
}

function draw() {
  background(46,139,87);

 foodObj.display();


 fedTime=database.ref('fedTiming');
 fedTime.on("value",function(data){
   lastFed=data.val();
 })
console.log(lastFed);
 fill(255,255,254);
 textSize(15);
 if(lastFed>=12){
   text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  drawSprites();
}


function feedDog(){
  //var t= hour();
  //console.log(t)
  dog.addImage(happyDog);


  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else {
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  //updating the database that count is decreased
  database.ref('/').update({
    foodStock:foodObj.getFoodStock(),
    fedTiming: hour()
  })
 
}

function addFood(){
  fs++;
  database.ref('/').update({
    foodStock:fs
  })

}

function readFoodStock(data){
  fs=data.val();
  foodObj.updateFoodStock(fs);
}

function updateCount(x){
  database.ref('food').set({'food': x});
}

//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock
