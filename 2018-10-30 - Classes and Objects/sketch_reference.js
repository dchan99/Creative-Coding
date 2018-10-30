var myBall;
var myBall2;

function setup() {
  createCanvas(500,500);
  //noLoop();
  var myColor = color(255,100,10);
  myBall = new Ball(250,100,2,3,30,myColor);
  myBall2 = new Ball(50,300,3,1,50,myColor);
  myBall3 = new Ball(100,400,1,4,10,myColor);
}

function draw() {
  background(200);
  myBall.displayBall();
  myBall2.displayBall();
  myBall3.displayBall();
  myBall.animate();
  myBall2.animate();
  myBall3.animate();
}

function Ball(xVal,yVal,Vx,Vy,size,thisColor) {
  this.x = xVal;
  this.y = yVal;
  this.Vx = Vx;
  this.Vy = Vy;
  this.size = size;
  this.color = thisColor;

  this.displayBall = function () {
    fill(this.color);
    ellipse(this.x,this.y,this.size,this.size);
  }

  this.animate = function () {
    this.x += this.Vx;
    this.y += this.Vy;
    if (this.x <= 0 || this.x >= width) {
      this.Vx *= -1;
    }
    if (this.y <= 0 || this.y >= height) {
      this.Vy *= -1;
    }
  }
};