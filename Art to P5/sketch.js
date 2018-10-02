function setup() {
  createCanvas(500,500)
  background(0,100,100)
  noLoop();
}

function draw() {
  var rectWidth = width/12
  var targetWidth = 2
  var widthStep = (rectWidth-targetWidth)/16
  for (var row = 0; row < 12; ++row) {
    rectWidth = width/12
    var posX = 0
    var middle = false
    for (var col = 0; col < 31; ++ col) {
      if (row % 2 == 0) {
        if (col % 2 == 0) {
          fill(255)
        } else {
          fill(0)
        }
      } else {
        if (col % 2 == 0) {
          fill(0)
        } else {
          fill(255)
        }
      }
      rect(posX,row*(height/12),rectWidth,(height/12))
      posX += rectWidth
      console.log(rectWidth)
      if (rectWidth <= targetWidth) {
        middle = true
      }
      if (middle) {
        rectWidth += widthStep
      } else {
        rectWidth -= widthStep
      }
    }
  }
}