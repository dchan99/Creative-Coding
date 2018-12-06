var sequenceBackground

var spaceships
var spaceshipImg

var bullets
var bulletImg

var minionImg
var bossImg

var ricochet
var explosion

var bulletPatterns = {}

var enemiesDefeated

function preload() {
  // backgroundImg = loadImage('/assets/background-black.png')
  sequenceBackground = loadAnimation('assets/bbackground (1).png','assets/bbackground (2).png',
  'assets/bbackground (3).png','assets/bbackground (4).png',
  'assets/bbackground (5).png','assets/bbackground (6).png',
  'assets/bbackground (7).png','assets/bbackground (8).png')
  sequenceBackground.frameDelay = 30

  spaceshipImg = loadImage('/assets/spacepixels-0.1.0/pixel_ship_blue.png')
  bulletImg = loadImage('/assets/spacepixels-0.1.0/pixel_laser_small_red.png')
  
  // minionImg = loadImage('/assets/spacepixels-0.1.0/')
  bossImg = loadImage('/assets/spacepixels-0.1.0/pixel_station_red.png')

  ricochet = loadSound("assets/ricochet.wav")
  explosion = loadSound("assets/explosion.wav")
}

function setup() {
  createCanvas(1000, 1000)

  // var backgroundSprite = createSprite(0,0,width,height);
  // backgroundSprite.addAnimation('background',sequenceBackground);

  spaceships = new Group();

  spaceship = createSprite(width/2,height/2)
  spaceship.addImage(spaceshipImg)
  spaceship.setCollider('circle', 0, 0, 8);
  // spaceship.rotateToDirection = true

  // // spaceship.velocity.x = 1
  // // spaceship.velocity.y = 0
  // spaceship.setSpeed(random(2, 3), random(0, 360));

  // spaceships.add(spaceship)

  bullets = new Group()

  // bullet = createSprite(500, 500)
  // bullet.addImage(bulletImg)

  // bullet.setCollider('rectangle', 0, 0, 10, 30)
  // // var direction = random(0,360)
  // var direction = 90
  // bullet.setSpeed(0, direction)
  // bullet.rotation = direction+90

  // bullets.add(bullet)
}
function draw() {
  background(0)

  animation(sequenceBackground, 0, 0);  
  
  bullets.bounce(bullets,bounceCallback)
  bullets.collide(spaceship,death)

  for (i in bulletPatterns) {
    bulletPatterns[i].bounce(bullets,bounceCallback)
    bulletPatterns[i].collide(spaceship,death)
    if (i == 'spiral') {
      bulletPatterns[i].forEach(bullet => {
        bullet.setSpeed(5, bullet.rotation+1)
      });
    }
  }

  var mappedX = map(mouseX, 0, width, 0, width, true)
  var mappedY = map(mouseY, 0, height, 0, height, true)
  spaceship.velocity.x = (mappedX - spaceship.position.x)
  spaceship.velocity.y = (mappedY - spaceship.position.y)

  allSprites.forEach(sprite => {
    if (sprite.position.y > height || sprite.position.y < 0) {
      sprite.velocity.y *= -1
      // sprite.mirrorY(-sprite.mirrorY())
    }
    if (sprite.position.x > width || sprite.position.x < 0) {
      sprite.velocity.x *= -1
      // sprite.mirrorX(-sprite.mirrorX())
    }
  })
  if (spaceship.velocity.x != 0 && spaceship.velocity.y != 0) {
    var x = spaceship.velocity.x
    var y = spaceship.velocity.y
    var angle = Math.atan2(y, x) * 180 / Math.PI
    spaceship.rotation = angle + 90
  }
  drawSprites()
  ellipse(spaceship.position.x,spaceship.position.y,16,16)
}

// function setBounce() {
//   allSprites.forEach(sprites => {
//     var x = sprites.velocity.x
//     var y = sprites.velocity.y
//     var angle = Math.atan2(y, x) * 180 / Math.PI
//     // console.log(angle)
//     sprites.rotation = angle + 90
//   })
// }

function bounceCallback() {
  ricochet.play()
}

function death() {
  explosion.play()
  noLoop()
}

function mousePressed() {
  // // bullet = createSprite(mouseX, mouseY)
  // bullet = createSprite(random(0,width), random(0,height))
  // // bullet = createSprite(700, 500)
  // bullet.addImage(bulletImg)

  // bullet.setCollider('circle', 0, 0, 5)
  // var direction = random(0,360)
  // // var direction = 90
  // bullet.setSpeed(random(5,10), direction)
  // // bullet.rotation = direction+90
  // bullet.rotateToDirection = true
  // // bullet.rotation +=90
  // bullet.life = 500;

  // bullets.add(bullet)
  generatePattern('threeSpread',8,5,5,500,500)
}

function generatePattern(name,n,speed,life,x,y) {
  var patternName = new Group()

  if (name == 'spiral') {
    var spacer = 360/n
    var direction = 0
    for (var i = 0; i < n; ++i) {
      bullet = createSprite(x,y)
      bullet.addImage(bulletImg)
      bullet.setCollider('circle', 0, 0, 5)
      bullet.setSpeed(speed, direction)
      bullet.rotateToDirection = true
      bullet.life = life*100;
      patternName.add(bullet)
      direction += spacer
    }
  } else if (name == 'threeSpread') {
    var spacer = 30
    var direction = 60
    if (n % 3 == 1) {
      n+=2
    } else if (n % 3 == 2) {
      n+=1
    }
    for (var i = 0; i < n; ++i) {
      bullet = createSprite(x,y)
      bullet.addImage(bulletImg)
      bullet.setCollider('circle', 0, 0, 5)
      bullet.setSpeed(speed, direction)
      bullet.rotateToDirection = true
      bullet.life = life*100;
      patternName.add(bullet)
      direction += spacer
      if (direction > 120) {
        direction = 60;
      }
      if (i % 3 == 2) {
        speed += 1
      }
    }
  }

  bulletPatterns[name] = patternName
}