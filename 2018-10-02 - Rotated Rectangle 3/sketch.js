function setup() {
  createCanvas(500,500)
  background(0,100,100)
  //noLoop();
  rectMode(CENTER);
}

function draw() {
  background(0,100,100)
  for (var i=1; i <= 3; ++i) {
    push()
      translate(i * height/4,width/2)
      var deltaX = mouseX-(i * height/4);
      var deltaY = mouseY-(width/2);
      var angle = atan2(deltaY,deltaX);
      rotate(angle)
      rect(0,0,20,20)
    pop()
  }
}