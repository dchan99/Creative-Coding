var userInput
var userInputButton
var inputText
var p
var colors = ['white','silver','gray','black','red','maroon','yellow','olive','lime','green','aqua','teal','blue','navy','fuchsia','purple']

function setup() {
  createCanvas(1000,500)
  background(0)

  userInput = createInput()
  userInput.position(500,82)
  userInput.input(changeText)

  inputButton = createButton('Submit Text')
  inputButton.position(700,82)
  inputButton.mousePressed(drawText)

  fill(255)
  textSize(32)
  textAlign(LEFT);
  text("What is your favorite color?",100,100)

  p = createP()
  p.position(width/5,300)
  p.style('font-size','32px')
  p.style('color','white')
}

function draw() {
  background(0)

  if (inputText) {
    fill(255)

    text('This is a p5 text: ' + inputText,width/5,200)

    if (colors.includes(inputText.toLocaleLowerCase())) {
      p.style('color',inputText)
    } else {
      p.style('color','white')
    }

    if (!isNaN(inputText)) {
      p.style('font-size',inputText+'px')
      p.style('font-weight',inputText*20)
    } else {
      p.style('font-size','32px')
      p.style('font-weight',400)
    }

    p.html('This is a dom paragraph: '+ inputText)
  } else {
    p.html('')
  }
}

function changeText() {
  inputText = this.value()
}

function drawText() {
  inputText = userInput.value()
  userInput.value("")
}