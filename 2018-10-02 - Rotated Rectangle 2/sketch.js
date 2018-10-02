function setup() {
  createCanvas(500,500)
  background(0,100,100)
  noLoop();
  rectMode(CENTER);
}

function draw() {
  for (var i=1; i <= 3; ++i) {
    push()
      translate(i * height/4,width/2)
      rotate(PI/(i*2))
      rect(0,0,20,20)
    pop()
  }
}