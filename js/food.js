

class Food{
    constructor(){
        this.fs1=0;
        this.lastFed;
        this.image=loadImage("Images/Milk.png");
    }  

updateFoodStock(fs1){
    this.fs1=fs1;
}
getFoodStock(){
    return this.fs1;
}
  
display(){

    image (this.image,720,220,70,70);

    var x=50;
    var y=100;
    if(this.fs1!=0){
        for(var i=0;i<this.fs1;i++){
            if(i%10==0){
                x=50;
                y=y+50
            }
            image (this.image, x,y,50,50);
            x=x+30;
        }
    }
}

}