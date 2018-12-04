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

var spaceship
var spaceshipImg
function preload() {
  spaceshipImg = loadImage('/assets/spacepixels-0.1.0/pixel_ship_blue.png')
}
function setup() {
  createCanvas(1000, 1000)
  spaceship = createSprite(width/2, height/2)
  spaceship.addImage(spaceshipImg)

  spaceship.position.x = 500
  spaceship.position.y = 500
  spaceship.velocity.x = 1
  spaceship.velocity.y = 0
}
function draw() {
  background(0)
  

  if (mouseIsPressed) {
    if (spaceship.rotation == 360) {spaceship.rotation = 0}
    spaceship.rotation += 2
    console.log(spaceship.rotation)
  }

  for (var i = 0; i < allSprites.length; i++) {
    if (allSprites[i].position.y > height || allSprites[i].position.y < 0) {
      allSprites[i].velocity.y *= -1
      allSprites[i].mirrorY(-1)
    }
    if (allSprites[i].position.x > width || allSprites[i].position.x < 0) {
      allSprites[i].velocity.x *= -1
      allSprites[i].mirrorX(-1)
    }
  }
  drawSprites()
}