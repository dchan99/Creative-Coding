function setup() {
  createCanvas(500,500)
  background(0,100,100)
  noLoop();
  rectMode(CENTER);
}

function draw() {
  push()
    translate(height/4,width/2)
    rotate(PI/2)
    rect(0,0,20,20)
  pop()


  push()
    translate(2*height/4,width/2)
    rotate(PI/4)
    rect(0,0,20,20)
  pop()


  push()
    translate(3*height/4,width/2)
    rotate(PI/6)
    rect(0,0,20,20)
  pop()
}