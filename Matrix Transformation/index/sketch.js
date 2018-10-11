//David Chan and Connie Zhou

var rotationAngle = 0.1;

function setup() {
  createCanvas(1000, 1000);
  frameRate(20);

}

//Both worked on draw and setup
function draw() {
  background(0);
  translate(width/2, height/2);
  rotate(rotationAngle);
  for (var x = 0; x < 500; x++){

    rotate(0.1);
    drawShape(x*2,x,random(10,50),random(0,4));

  }

}

//Connie did draw shape
function drawShape(xpos,ypos,radius,num_sides){
  fill(random(255),random(255),random(255),random(255));
  strokeWeight(2);
  stroke(random(255),random(255),random(255));
  polygon(xpos,ypos,radius,num_sides+3);


}

//David worked on polygon function
function polygon(x, y, radius, num_sides) {
  var angle = TWO_PI / num_sides;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var xpos = x + cos(a) * radius;
    var ypos = y + sin(a) * radius;
    vertex(xpos, ypos);
  }
  endShape(CLOSE);
}