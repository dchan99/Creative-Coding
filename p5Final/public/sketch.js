// var explode_sprite_sheet
// var explode_sprite


// function preload() {
//   // Load the explode sprite sheet using frame width, height and number of frames
//   explode_sprite_sheet = loadSpriteSheet('assets/explode_example.png', 171, 158, 11)

//   // Exploding star animation
//   explode_animation = loadAnimation(explode_sprite_sheet)
// }

// function setup() {
//   createCanvas(1000, 1000)

//   // Create the exploding star sprite and add it's animation
//   explode_sprite = createSprite(width / 2, 100, 171, 158)
//   explode_sprite.addAnimation('explode', explode_animation)
// }

// function draw() {
//   clear()
//   background(0)

//   drawSprites()
// }

var spaceships
var spaceshipImg

var bullets
var bulletImg

var ricochet
var explosion

function preload() {
  spaceshipImg = loadImage('/assets/spacepixels-0.1.0/pixel_ship_blue.png')
  bulletImg = loadImage('/assets/spacepixels-0.1.0/pixel_laser_small_red.png')
  ricochet = loadSound("assets/ricochet.wav")
  explosion = loadSound("assets/explosion.wav")
}
function setup() {
  createCanvas(1000, 1000)

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
  
  bullets.bounce(bullets,bounceCallback)
  bullets.collide(spaceship,death)
  // setBounce()
  // if (mouseIsPressed) {
  //   if (spaceship.rotation == 360) {spaceship.rotation = 0}
  //   spaceship.rotation += 2
  //   console.log(spaceship.rotation)
  // }

  // for (var i = 0; i < allSprites.length; i++) {
  //   if (allSprites[i].position.y > height || allSprites[i].position.y < 0) {
  //     allSprites[i].velocity.y *= -1
  //     allSprites[i].mirrorY(-allSprites[i].mirrorY())
  //   }
  //   if (allSprites[i].position.x > width || allSprites[i].position.x < 0) {
  //     allSprites[i].velocity.x *= -1
  //     allSprites[i].mirrorX(-allSprites[i].mirrorX())
  //   }
  // }

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
  // fill(255)
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
  // bullet = createSprite(mouseX, mouseY)
  bullet = createSprite(random(0,width), random(0,height))
  // bullet = createSprite(700, 500)
  bullet.addImage(bulletImg)

  bullet.setCollider('circle', 0, 0, 5)
  var direction = random(0,360)
  // var direction = 90
  bullet.setSpeed(random(5,10), direction)
  // bullet.rotation = direction+90
  bullet.rotateToDirection = true
  // bullet.rotation +=90
  bullet.life = 500;

  bullets.add(bullet)
}