var droplets = []
var waterDrop
var collision
var reverb

var timeStart

function preload() {
  waterDrop = loadSound("assets/plop_drip.wav")
  collision = loadSound("assets/collision.wav")
  reverb = loadSound("assets/reverb.wav")
}

function dropletRing(x,y,max,waterDrop,collision,reverb,amp,fromCollision) {
  this.x = x
  this.y = y
  this.speed = 1
  this.radius = 0
  this.max = max
  this.intersect = false
  this.waterDrop = waterDrop
  this.collision = collision
  this.reverb = reverb
  this.fromCollision = fromCollision
  this.amp = amp
  this.played = false

  this.waterDrop.setVolume(this.amp)
  this.reverb.setVolume(this.amp/10)

  this.expand = function() {
    this.radius += 1
  }

  this.display = function() {
    if (this.radius == 0) {
      if (!this.fromCollision) {
        this.waterDrop.play()
      } else {
        this.collision.play()
      }
    } else {
      if (!this.played) {
        this.reverb.play()
        this.played = true
      }
    }

    if (this.intersect) {
      stroke(255,255,255,100)
    } else {
      stroke(255)
    }
    noFill()
    ellipse(this.x,this.y,this.radius*2,this.radius*2)
  }

  this.checkCollision = function(drop) {
    if ((dist(this.x,this.y,drop.x,drop.y) < (this.radius + drop.radius))
        && !this.intersect && !drop.intersect
        && dist(this.x,this.y,drop.x,drop.y) > this.radius) {
      this.intersect = true
      drop.intersect = true

      var amp = (this.amp+drop.amp)/2
      var max = (this.max+drop.max)/2
      var intersection = this.intersectPoint(this.x,this.y,this.radius,drop.x,drop.y,drop.radius)
      droplets.push(new dropletRing(intersection[0],intersection[2],max,waterDrop,collision,reverb,amp,true))
    }
  }

  this.stopAll = function() {
    this.waterDrop.stop()
    this.reverb.stop()
  }

  this.intersectPoint = function(x0,y0,r0,x1,y1,r1) {
    //code influenced and borrowed from
    //http://paulbourke.net/geometry/circlesphere/ and
    //https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
    var a, dx, dy, d, h, rx, ry;
    var x2, y2;

    dx = x1 - x0;
    dy = y1 - y0;

    d = dist(x0,y0,x1,y1);

    a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

    x2 = x0 + (dx * a/d);
    y2 = y0 + (dy * a/d);

    h = Math.sqrt((r0*r0) - (a*a));

    rx = -dy * (h/d);
    ry = dx * (h/d);

    var x_a = x2 + rx;
    var x_b = x2 - rx;
    var y_a = y2 + ry;
    var y_b = y2 - ry;

    return [x_a, x_b, y_a, y_b];
  }
};

function setup() {
  createCanvas(1000,1000)
  background(255)
  frameRate(60)
  alert("Press and hold mouse longer to create droplets that expand larger.")
}

function draw() {
  background(0)
  if (frameCount % 30 == 0) {
    var randMax = random(100,200)
    var calcAmp = ((randMax-100)/200)
    droplets.push(new dropletRing(random(100,900),random(100,900),randMax,waterDrop,collision,reverb,calcAmp,false))
  }
  for (var base = 0; base < droplets.length; ++base) {
    for (var comparison = base + 1; comparison < droplets.length; ++comparison) {
      if (base < comparison) {
        droplets[base].checkCollision(droplets[comparison])
      }
    }
    if (droplets[base].radius <= droplets[base].max) {
      droplets[base].display()
      droplets[base].expand()
    }
  }
  for (var index = droplets.length - 1; index >= 0; --index) {
    if (droplets[index].radius >= droplets[index].max) {
      droplets.splice(index, 1)
    }
  }
}

function mousePressed() {
  timeStart = millis()
}

function mouseReleased() {
  var timeEnd = round((millis() - timeStart)/1000,0) + 1

  let amp
  let max
  if (timeEnd >= 5) {
    amp = 1
    max = 200
  } else {
    amp = (timeEnd / 10) + 0.5
    max = 100+(20*timeEnd)
  }

  droplets.push(new dropletRing(mouseX,mouseY,max,waterDrop,collision,reverb,amp,false))
}
