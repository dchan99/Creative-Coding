var sequenceBackground
var sequenceSpaceship

var bulletImg

var singleBullet
var singleBulletImg
var collision = true
var fired = false

var asteroidImg
var minionImg
var bossImg

var ricochet
var explosion

var bulletPatterns = {}

var enemiesDefeated

function preload() {
  // backgroundImg = loadImage('/assets/background-black.png')
  // sequenceBackground = loadAnimation(
  //   'assets/animatedSpace/space (1).png','assets/animatedSpace/space (2).png','assets/animatedSpace/space (3).png','assets/animatedSpace/space (4).png',
  //   'assets/animatedSpace/space (5).png','assets/animatedSpace/space (6).png','assets/animatedSpace/space (7).png','assets/animatedSpace/space (8).png',
  //   'assets/animatedSpace/space (9).png','assets/animatedSpace/space (10).png','assets/animatedSpace/space (11).png','assets/animatedSpace/space (12).png',
  //   'assets/animatedSpace/space (13).png','assets/animatedSpace/space (14).png','assets/animatedSpace/space (15).png','assets/animatedSpace/space (16).png',
  //   'assets/animatedSpace/space (17).png','assets/animatedSpace/space (18).png','assets/animatedSpace/space (19).png','assets/animatedSpace/space (20).png',
  //   'assets/animatedSpace/space (21).png','assets/animatedSpace/space (22).png','assets/animatedSpace/space (23).png','assets/animatedSpace/space (24).png',
  //   'assets/animatedSpace/space (25).png','assets/animatedSpace/space (26).png','assets/animatedSpace/space (27).png','assets/animatedSpace/space (28).png',
  //   'assets/animatedSpace/space (29).png','assets/animatedSpace/space (30).png','assets/animatedSpace/space (31).png','assets/animatedSpace/space (32).png',
  //   'assets/animatedSpace/space (33).png','assets/animatedSpace/space (34).png','assets/animatedSpace/space (35).png','assets/animatedSpace/space (36).png',
  //   'assets/animatedSpace/space (37).png','assets/animatedSpace/space (38).png','assets/animatedSpace/space (39).png','assets/animatedSpace/space (40).png',
  //   'assets/animatedSpace/space (41).png','assets/animatedSpace/space (42).png','assets/animatedSpace/space (43).png'
  // )
  sequenceBackground = loadAnimation(
    'assets/animatedSpace/space (1).png','assets/animatedSpace/space (5).png','assets/animatedSpace/space (9).png',
    'assets/animatedSpace/space (13).png','assets/animatedSpace/space (17).png','assets/animatedSpace/space (21).png',
    'assets/animatedSpace/space (25).png','assets/animatedSpace/space (29).png','assets/animatedSpace/space (33).png',
    'assets/animatedSpace/space (37).png','assets/animatedSpace/space (41).png',
  )
  // sequenceBackground.frameDelay = 30

  // spaceshipImg = loadImage('/assets/spacepixels-0.1.0/pixel_ship_blue.png')
  sequenceSpaceship = loadAnimation('assets/animatedSpaceship/spaceship.png','assets/animatedSpaceship/spaceship (1).png','assets/animatedSpaceship/spaceship (2).png',
    'assets/animatedSpaceship/spaceship (3).png','assets/animatedSpaceship/spaceship (4).png','assets/animatedSpaceship/spaceship (5).png')

  bulletImg = loadImage('/assets/bullet/pixel_laser_small_red.png')
  singleBulletImg = loadImage('/assets/bullet/pixel_laser_small_blue.png')

  asteroidImg = loadImage('/assets/enemy/asteroid_grey.png')
  minionImg = loadImage('/assets/enemy/pixel_ship_red_small_2.png')
  bossImg = loadImage('/assets/enemy/pixel_station_red.png')

  ricochet = loadSound("assets/ricochet.wav")
  explosion = loadSound("assets/explosion.wav")
}

function setup() {
  createCanvas(1000, 1000)

  // var backgroundSprite = createSprite(0,0,width,height)
  // backgroundSprite.addAnimation('background',sequenceBackground)
  // backgroundSprite.addAnimation('assets/animatedSpace/space (1).png','assets/animatedSpace/space (5).png','assets/animatedSpace/space (9).png',
  //   'assets/animatedSpace/space (13).png','assets/animatedSpace/space (17).png','assets/animatedSpace/space (21).png',
  //   'assets/animatedSpace/space (25).png','assets/animatedSpace/space (29).png','assets/animatedSpace/space (33).png',
  //   'assets/animatedSpace/space (37).png','assets/animatedSpace/space (41).png')

  // spaceships = new Group();

  spaceship = createSprite(width/2,height/2)
  // spaceship.addAnimation('assets/animatedSpaceship/spaceship.png','assets/animatedSpaceship/spaceship (1).png','assets/animatedSpaceship/spaceship (2).png',
  //   'assets/animatedSpaceship/spaceship (3).png','assets/animatedSpaceship/spaceship (4).png','assets/animatedSpaceship/spaceship (5).png')
  spaceship.addAnimation('spaceshipAnimation',sequenceSpaceship)
  spaceship.setCollider('circle', 0, 0, 8);

  // spaceship.rotateToDirection = true
  // // spaceship.velocity.x = 1
  // // spaceship.velocity.y = 0
  // spaceship.setSpeed(random(2, 3), random(0, 360));

  // spaceships.add(spaceship)

  bullets = new Group()
}

function draw() {
  background(0)

  animation(sequenceBackground, 0, 0);  
  
  bullets.bounce(bullets,bounceCallback)
  bullets.collide(spaceship,death)
  bullets.forEach(bullet => {
    if (bullet.position.y > height || bullet.position.y < 0) {
      bullet.velocity.y *= -1
      // bullet.mirrorY(-bullet.mirrorY())
    }
    if (bullet.position.x > width || bullet.position.x < 0) {
      bullet.velocity.x *= -1
      // bullet.mirrorX(-bullet.mirrorX())
    }
  })

  if (singleBullet) {
    if (singleBullet.position.y > height || singleBullet.position.y < 0 || singleBullet.position.x > width || singleBullet.position.x < 0) {
      singleBullet.velocity.y = 0
      singleBullet.velocity.x = 0
    }
    if (singleBullet.position.y > height) {
      singleBullet.position.y -= 5
    }
    if (singleBullet.position.y < 0) {
      singleBullet.position.y += 5
    }
    if (singleBullet.position.x > width) {
      singleBullet.position.x -= 5
    }
    if (singleBullet.position.x < 0) {
      singleBullet.position.x += 5
    }

    if (!singleBullet.collide(spaceship)) {
      collision = false
    }
    if (collision == false && singleBullet.collide(spaceship) && singleBullet.velocity.x == 0) {
      singleBullet.remove()
      fired = false
    }
  }

  for (i in bulletPatterns) {
    bulletPatterns[i].bounce(bullets,bounceCallback)
    bulletPatterns[i].collide(spaceship,death)
    if (i == 'spiral') {
      bulletPatterns[i].forEach(bullet => {
        bullet.setSpeed(5, bullet.rotation+1)
        if (bullet.position.y >= height || bullet.position.y <= 0) {
          bullet.remove()
        }
        if (bullet.position.x >= width || bullet.position.x <= 0) {
          bullet.remove()
        }
      });
    }
  }

  var mappedX = map(mouseX, 0, width, 0, width, true)
  var mappedY = map(mouseY, 0, height, 0, height, true)
  spaceship.velocity.x = (mappedX - spaceship.position.x) * 0.5
  spaceship.velocity.y = (mappedY - spaceship.position.y) * 0.5

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

function generateBullet() {
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

function mousePressed() {
  if (!fired) {
    singleBullet = createSprite(spaceship.position.x, spaceship.position.y)
    singleBullet.addImage(singleBulletImg)

    singleBullet.setCollider('circle', 0, 0, 5)
    singleBullet.rotateToDirection = true

    singleBullet.setSpeed(5, spaceship.rotation-90)

    fired = true;
  }

  // generatePattern('shotgun',8,5,5,500,500)
}

function generatePattern(name,n,speed,life,x,y) {
  var patternName = new Group()

  if (name == 'spiral' || name == 'spread') {
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
  } else if (name == 'shotgun') {
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