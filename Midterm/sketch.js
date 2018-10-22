//Creative Coding Midterm by David Chan

var state = 0;
var userChoice = false;
var wPressed = false;
var aPressed = false;
var sPressed = false;
var dPressed = false;
var posX;
var posY;
var speed = 10;
var circleSize = 50;
var aVal;
var fadeOut;
var done;
var aValIn;
var fadeIn;
var doneIn;

var wakeUp;
var overslept;
var intersection;
var classroom;
var acedQuiz;
var failedQuiz;
var shoppingDistrict;
var beforePurchase;
var afterPurchase;
var arcade;
var arcadeGame;
var winGame;
var loseGame;
var theEnd;

function preload() {
  wakeUp = loadImage("assets/wakeUp.png")
  overslept = loadImage("assets/overslept.png")
  intersection = loadImage("assets/intersection.png")
  classroom = loadImage("assets/classroom.png")
  acedQuiz = loadImage("assets/acedQuiz.png")
  failedQuiz = loadImage("assets/failedQuiz.png")
  shoppingDistrict = loadImage("assets/shoppingDistrict.png")
  beforePurchase = loadImage("assets/beforePurchase.png")
  afterPurchase = loadImage("assets/afterPurchase.png")
  arcade = loadImage("assets/arcade.png")
  arcadeGame = loadImage("assets/arcadeGame.png")
  winGame = loadImage("assets/winGame.png")
  loseGame = loadImage("assets/loseGame.png")
  theEnd = loadImage("assets/theEnd.png")
}

function setup() {
  createCanvas(1000,1000)
  background(0)
}

function draw() {
  switch(state) {
    case 0 :
      wakeUpScene()
      break;
    case 1 :
      intersectionScene()
      break;
    case 2 :
      classroomScene()
      break;
    case 3 :
      intersectionScene2()
      break;
    case 4 :
      arcadeScene()
      break;
    case 5 :
      gameScene()
      break;
    case 6 :
      intersectionScene2()
      break;
    case 7 :
      shoppingScene()
      break;
    case 8 :
      bankScene()
      break;
    case 9 :
      intersectionScene2()
      break;
    case 10 :
      endingScene()
      break;
    default:
      break;
  }
}

var aVal = 250;
var fadeOut = true;
var done = false;
function wakeUpScene() {
  background(0)
  if (userChoice == false) {
    image(wakeUp,0,0,1000,1000)
    textSize(32)
    fill(0)
    text("Snooze alarm for 15 minutes?", 130, 450)
    drawChoice(250,450)
  }
  posX = 400;
  posY = 50;
  if (userChoice == "yes") {
    if (yesButton && noButton) {
      yesButton.remove()
      noButton.remove()
      yesButton = null
      noButton = null
    }
    if (aVal == 0) {
      fadeOut = false
    }
    if (!fadeOut && aVal == 250) {
      done = true
    }
    if (fadeOut) {
      tint(255,aVal)
      image(wakeUp,0,0,1000,1000)
      aVal -= 5
    }
    if (!fadeOut) {
      tint(255,aVal)
      image(overslept,0,0,1000,1000)
      textSize(64)
      fill(255,0,0)
      text("You overslept!", 130, 470)
      text("Get to class!!!", 130, 550)
      drawContinue(240,580)
    }
    if (!fadeOut && !done) {
      aVal += 25
    }
  }
  if (userChoice == "no") {
    if (yesButton && noButton) {
      yesButton.remove()
      noButton.remove()
      yesButton = null
      noButton = null
    }
    userChoice = false
    resetValues()
    state = 1
  }
}


function intersectionScene() {
  background(0)
  image(intersection,0,0,1000,1000)
  var edge = JSON.stringify([158,158,158,255])
  if (wPressed && posY > circleSize) {
    if (JSON.stringify(get(posX,posY-speed)) !== edge) {
      posY -= speed
    }
    if (posY == 50 && (posX >= 340 && posX <= 640)) {
      wPressed = false
      alert("Your bed is NOT waiting for you. You need to get to school first!")
    }
  }
  if (aPressed && posX > circleSize) {
    if (JSON.stringify(get(posX-speed,posY)) !== edge) {
      posX -= speed
    }
    if (posX == 50 && (posY >= 340 && posY <= 640)) {
      aPressed = false
      alert("This way is to the arcade. You need to get to school first!")
    }
  }
  if (sPressed && posY < height-circleSize-circleSize/2) {
    if (JSON.stringify(get(posX,posY+speed)) !== edge) {
      posY += speed;
    }
    if (posY == 930 && (posX >= 340 && posX <= 640)) {
      school = true
      resetValues()
      state += 1
    }
  }
  if (dPressed && posX < height-circleSize-circleSize/2) {
    if (JSON.stringify(get(posX+speed,posY)) !== edge) {
      posX += speed;
    }
    if (posX == 930 && (posY >= 330 && posY <= 640)) {
      dPressed = false
      alert("This way is to the shopping district. You need to get to school first!")
    }
  }
  fill(0)
  ellipse(posX,posY,circleSize,circleSize);
}


function intersectionScene2() {
  background(0)
  tint(255,255)
  image(intersection,0,0,1000,1000)
  var edge = JSON.stringify([158,158,158,255])
  if (wPressed && posY > circleSize) {
    if (JSON.stringify(get(posX,posY-speed)) !== edge) {
      posY -= speed
    }
    if (posY == 50 && (posX >= 340 && posX <= 640)) {
      resetValues()
      state = 10
    }
  }
  if (aPressed && posX > circleSize) {
    if (JSON.stringify(get(posX-speed,posY)) !== edge) {
      posX -= speed
    }
    if (posX == 50 && (posY >= 340 && posY <= 640)) {
      resetValues()
      state = 4
    }
  }
  if (sPressed && posY < height-circleSize-circleSize/2) {
    if (JSON.stringify(get(posX,posY+speed)) !== edge) {
      posY += speed;
    }
  }
  if (sPressed) {
    if (posY == 930 && (posX >= 340 && posX <= 640)) {
      sPressed = false
      alert("You already went to school. Why would you go again??")
    }
  }
  if (dPressed && posX < height-circleSize-circleSize/2) {
    if (JSON.stringify(get(posX+speed,posY)) !== edge) {
      posX += speed;
    }
    if (posX == 930 && (posY >= 330 && posY <= 640)) {
      resetValues()
      state = 7
    }
  }
  fill(0)
  ellipse(posX,posY,circleSize,circleSize);
}


function classroomScene() {
  background(0)
  if (userChoice == false) {
    if (!fadeIn && aValIn == 250) {
      doneIn = true
    }
    if (!fadeIn) {
      tint(255,aValIn)
      image(classroom,0,0,1000,1000)
      textSize(64)
      fill(255,0,0)
    }
    if (!fadeIn && !doneIn) {
      aValIn += 5
    }
    fill(0)
    textSize(32)
    text("You're feeling tired.", 180, 400)
    text("Sleep in class?", 180, 450)
    drawChoice(200,450)
  }
  posX = 600;
  posY = 950;
  if (userChoice == "yes") {
    if (yesButton && noButton) {
      yesButton.remove()
      noButton.remove()
      yesButton = null
      noButton = null
    }
    if (aVal == 0) {
      fadeOut = false
    }
    if (!fadeOut && aVal == 250) {
      done = true
    }
    if (fadeOut) {
      tint(255,aVal)
      image(classroom,0,0,1000,1000)
      aVal -= 5
    }
    if (!fadeOut) {
      tint(255,aVal)
      image(failedQuiz,0,0,1000,1000)
      textSize(50)
      fill(255,0,0)
      rotate(-45)
      text("You didn't understand the test.", -500, 400)
      text("You failed :(", -500, 500)
      rotate(45)
      drawContinue(500,800)
    }
    if (!fadeOut && !done) {
      aVal += 25
    }
  }
  if (userChoice == "no") {
    if (yesButton && noButton) {
      yesButton.remove()
      noButton.remove()
      yesButton = null
      noButton = null
    }
    if (aVal == 0) {
      fadeOut = false
    }
    if (!fadeOut && aVal == 250) {
      done = true
    }
    if (fadeOut) {
      tint(255,aVal)
      image(classroom,0,0,1000,1000)
      aVal -= 5
    }
    if (!fadeOut) {
      tint(255,aVal)
      image(acedQuiz,0,0,1000,1000)
      textSize(50)
      fill(0)
      rotate(-45)
      text("Paying attention paid off.", -500, 400)
      text("You aced the test!", -500, 500)
      rotate(45)
      drawContinue(500,800)
    }
    if (!fadeOut && !done) {
      aVal += 25
    }
  }
}


function arcadeScene() {
  background(0)
  if (userChoice == false) {
    if (!fadeIn && aValIn == 250) {
      doneIn = true
    }
    if (!fadeIn) {
      tint(255,aValIn)
      image(arcade,0,0,1000,1000)
      textSize(64)
      fill(255,0,0)
    }
    if (!fadeIn && !doneIn) {
      aValIn += 5
    }
    fill(255)
    textSize(45)
    text("Class is over!", 350, 900)
    text("Relax and play some games!", 220, 950)
    drawContinue(400,750)
  }
}



function gameScene() {
  background(0)
  if (userChoice == false) {
    if (!fadeIn && aValIn == 250) {
      doneIn = true
    }
    if (!fadeIn) {
      tint(255,aValIn)
      image(arcadeGame,0,0,1000,1000)
      textSize(64)
      fill(255,0,0)
    }
    if (!fadeIn && !doneIn) {
      aValIn += 5
    }
    fill(255)
    textSize(45)
    text("Continue to play?", 600, 650)
    drawChoice(660,650)
  }
  posX = 50;
  posY = 600;
  if (userChoice == "yes") {
    if (yesButton && noButton) {
      yesButton.remove()
      noButton.remove()
      yesButton = null
      noButton = null
    }
    if (aVal == 0) {
      fadeOut = false
    }
    if (!fadeOut && aVal == 250) {
      done = true
    }
    if (fadeOut) {
      tint(255,aVal)
      image(arcadeGame,0,0,1000,1000)
      aVal -= 5
    }
    if (!fadeOut) {
      tint(255,aVal)
      image(winGame,0,0,1000,1000)
      textSize(50)
      fill(255,0,0)
      drawContinue(700,800)
    }
    if (!fadeOut && !done) {
      aVal += 25
    }
  }
  if (userChoice == "no") {
    if (yesButton && noButton) {
      yesButton.remove()
      noButton.remove()
      yesButton = null
      noButton = null
    }
    if (aVal == 0) {
      fadeOut = false
    }
    if (!fadeOut && aVal == 250) {
      done = true
    }
    if (fadeOut) {
      tint(255,aVal)
      image(arcadeGame,0,0,1000,1000)
      aVal -= 5
    }
    if (!fadeOut) {
      tint(255,aVal)
      image(loseGame,0,0,1000,1000)
      fill(0)
      drawContinue(700,800)
    }
    if (!fadeOut && !done) {
      aVal += 25
    }
  }
}



function shoppingScene() {
  background(0)
  if (userChoice == false) {
    if (!fadeIn && aValIn == 250) {
      doneIn = true
    }
    if (!fadeIn) {
      tint(255,aValIn)
      image(shoppingDistrict,0,0,1000,1000)
      textSize(64)
      fill(255,0,0)
    }
    if (!fadeIn && !doneIn) {
      aValIn += 5
    }
    fill(255)
    textSize(45)
    text("Class is over!", 230, 880)
    text("Time to go shopping!", 220, 950)
    drawContinue(520,790)
  }
}


function bankScene() {
  background(0)
  if (userChoice == false) {
    if (!fadeIn && aValIn == 250) {
      doneIn = true
    }
    if (!fadeIn) {
      tint(255,aValIn)
      image(beforePurchase,0,0,1000,1000)
      textSize(64)
      fill(255,0,0)
    }
    if (!fadeIn && !doneIn) {
      aValIn += 5
    }
    fill(255)
    textSize(32)
    text("Here's your bank account", 320, 600)
    text("Purchase clothes and games?", 300, 650)
    drawChoice(400,650)
  }
  posX = 950;
  posY = 400;
  if (userChoice == "yes") {
    if (yesButton && noButton) {
      yesButton.remove()
      noButton.remove()
      yesButton = null
      noButton = null
    }
    if (aVal == 0) {
      fadeOut = false
    }
    if (!fadeOut && aVal == 250) {
      done = true
    }
    if (fadeOut) {
      tint(255,aVal)
      image(beforePurchase,0,0,1000,1000)
      aVal -= 5
    }
    if (!fadeOut) {
      tint(255,aVal)
      image(afterPurchase,0,0,1000,1000)
      fill(255)
      textSize(32)
      text("Your bank account is crying.",300,800)
      drawContinue(600,800)
    }
    if (!fadeOut && !done) {
      aVal += 25
    }
  }
  if (userChoice == "no") {
    if (yesButton && noButton) {
      yesButton.remove()
      noButton.remove()
      yesButton = null
      noButton = null
    }
    if (aVal == 0) {
      fadeOut = false
    }
    if (!fadeOut && aVal == 250) {
      done = true
      // userChoice = 'no'
    }
    if (fadeOut) {
      tint(255,aVal)
      image(beforePurchase,0,0,1000,1000)
      aVal -= 5
    }
    if (!fadeOut) {
      tint(255,aVal)
      image(beforePurchase,0,0,1000,1000)
      fill(255)
      textSize(32)
      text("Your bank account thanks you.",300,800)
      drawContinue(600,800)
    }
    if (!fadeOut && !done) {
      aVal += 25
    }
  }
}


function endingScene() {
  background(0)
  if (userChoice == false) {
    if (!fadeIn && aValIn == 250) {
      doneIn = true
    }
    if (!fadeIn) {
      tint(255,aValIn)
      image(theEnd,0,0,1000,1000)
      textSize(64)
      fill(255,0,0)
    }
    if (!fadeIn && !doneIn) {
      aValIn += 5
    }
    textSize(32)
    fill(255)
    text("Thanks for playing! There are a total of 14 scenes!", 50,150)
    text("Did you unlock them all?", 200,200)
    drawRestart(770,800)
  }
}


var yesButton;
var noButton;
function drawChoice(x,y) {
  //This conditional prevents multiple buttons from being drawn
  if (!yesButton && !noButton) {
    yesButton = createButton('Yes');
    yesButton.position(x+10, y+40)
    yesButton.addClass('yesButton')
    yesButton.mousePressed(() => userChoice = 'yes')

    noButton = createButton('No')
    noButton.position(x+100, y+40)
    noButton.addClass('noButton')
    noButton.mousePressed(() => userChoice = 'no')
  }
}

var continueButton;
function drawContinue(x,y) {
  //This conditional prevents multiple buttons from being drawn
  if (!continueButton) {
    continueButton = createButton('Continue');
    continueButton.position(x+10, y+40)
    continueButton.addClass('yesButton')
    continueButton.mousePressed(() => {
      userChoice = false
      continueButton.remove()
      continueButton = null
      resetValues()
      state+=1
    })
  }
}

var restartButton;
function drawRestart(x,y) {
  //This conditional prevents multiple buttons from being drawn
  if (!restartButton) {
    restartButton = createButton('Restart');
    restartButton.position(x+10, y+40)
    restartButton.addClass('yesButton')
    restartButton.mousePressed(() => {
      resetValues()
      state=0
      userChoice = false
      restartButton.remove()
      restartButton = null
    })
  }
}

function keyPressed() {
  if (key == 'w') {
    wPressed = true;
  }
  if (key == 'a') {
    aPressed = true;
  }
  if (key == 's') {
    sPressed = true;
  }
  if (key == 'd') {
    dPressed = true;
  }
}

function keyReleased() {
  if (key == 'w') {
    wPressed = false;
  }
  if (key == 'a') {
    aPressed = false;
  }
  if (key == 's') {
    sPressed = false;
  }
  if (key == 'd') {
    dPressed = false;
  }
}

function resetValues() {
  aVal = 250;
  fadeOut = true;
  done = false;
  aValIn = 0;
  fadeIn = false;
  doneIn = false;
}