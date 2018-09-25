function setup() {
  createCanvas(600,500)
  background(0,200,200,100)
}

function draw() {

}

function mouseMoved(){
  if (mouseX == 500) {
    console.log("Invisible Line")
    stroke(0);
    line(500,0,500,500)
  } else if (mouseX > width/2) {
    noStroke();
    console.log("Quadrant 1")
    fill('#00ff00') // green
    rect(width/2,0,width/2,height)
  } else if (mouseX < width/2 && mouseY < height/2) {
    noStroke();
    console.log("Quadrant 2") 
    fill('#ffa500') // orange
    rect(0,0,width/2,height/3)
  } else if (mouseX < width/2 && mouseY > height/2) {
    noStroke();
    console.log("Quadrant 3")
    fill('#0000ff') //blue
    rect(0,height/3,width/2,2*(height/3))
  }
};