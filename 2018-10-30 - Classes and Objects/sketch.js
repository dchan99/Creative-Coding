var r1;
var r2;
var r3;
var r4;

function setup() {
  createCanvas(500,500)

  var c1 = color(255,0,0)
  r1 = new SpinRect(100,100,1,2,1,10,c1)

  var c2 = color(0,255,0)
  r2 = new SpinRect(400,100,3,4,2,20,c2)

  var c3 = color(0,0,255)
  r3 = new SpinRect(100,400,5,6,3,30,c3)

  var c4 = color(random(0,255),random(0,255),random(0,255))
  r4 = new SpinRect(400,400,7,8,4,40,c4)

  angleMode(DEGREES)
  rectMode(CENTER)
  colorMode(RGB, 255)
}

function draw() {
  background(0)

  r1.move()
  r2.move()
  r3.move()
  r4.move()
}

function SpinRect(x,y,Vx,Vy,spinRate,side,thisColor) {
  this.x = x
  this.y = y
  this.Vx = Vx
  this.Vy = Vy
  this.side = side
  this.thisColor = thisColor
  this.angle = 0

  this.move = function() {
    if (this.angle < 360) {
      this.angle += spinRate
    } else {
      this.angle = 0
    }

    this.x += this.Vx;
    this.y += this.Vy;
    if (this.x <= 0 || this.x >= width) {
      this.Vx *= -1;
      this.thisColor = color(random(0,255),random(0,255),random(0,255))
    }
    if (this.y <= 0 || this.y >= height) {
      this.Vy *= -1;
      this.thisColor = color(random(0,255),random(0,255),random(0,255))
    }

    push()
    translate(this.x,this.y)
    rotate(this.angle)
    fill(this.thisColor)
    rect(0,0,this.side,this.side)
    pop()
  }
};