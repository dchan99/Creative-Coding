var collegeData
var dataArray = []
var maxTotal = -Infinity
var minTotal = Infinity
var maxP75th = -Infinity
var minP75th = Infinity

function preload() {
  collegeData = loadJSON("collegeMajorsAllAges.json")
}

function setup() {
  createCanvas(2000,1600)
  background(200)
  noLoop()
  for (var major in collegeData) {
    if (collegeData[major].Total < minTotal) {
      minTotal = collegeData[major].Total
    }
    if (collegeData[major].Total > maxTotal) {
      maxTotal = collegeData[major].Total
    }
    if (collegeData[major].P75th < minP75th) {
      minP75th = collegeData[major].P75th
    }
    if (collegeData[major].P75th > maxP75th) {
      maxP75th = collegeData[major].P75th
    }
    dataArray.push([collegeData[major].Total,collegeData[major].P75th,collegeData[major].Major])
  }
  dataArray.sort(function(a, b){return b[0] - a[0]})
}

function draw() {
  //var textPos = 0
  for (var i=0;i < dataArray.length; ++i) {
    var radius = map(dataArray[i][0],minTotal,maxTotal,0,500)

    var colorRange = map(dataArray[i][1],minP75th,maxP75th,0,255)
    var lerpRange = map(dataArray[i][1],minP75th,maxP75th,0,1)
    var lerpedColor = lerpColor(color(0,0,0),color(0,255,255), lerpRange);

    strokeWeight(1)

    fill(lerpedColor)
    stroke(220)
    ellipse(width/2,height/2,2*radius,2*radius)

    var textPos = map(i,0,dataArray.length,0+10,height-10)
    textSize(10)
    stroke(255)
    var textString = dataArray[i][2] + '; $' + dataArray[i][1] + '; ' + dataArray[i][0] + ' students'
    if (i%2) {
      line(width/2,height/2-radius,width/2+505,textPos)

      stroke(lerpedColor)
      textAlign(LEFT,CENTER)
      text(textString,width/2+510,textPos)
    } else {
      line(width/2,height/2-radius,width/2-505,textPos)

      stroke(lerpedColor)
      textAlign(RIGHT,CENTER)
      text(textString,width/2-510,textPos)
    }
    
  }
}