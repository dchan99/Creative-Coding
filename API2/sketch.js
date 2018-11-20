var userInput
var userInputButton
var inputText
var temperature
var currentCity

function setup() {
  createCanvas(1000,1000)
  background(0)

  userInput = createInput()
  userInput.position(500,82)
  userInput.input(changeText)

  inputButton = createButton('Get Weather!')
  inputButton.position(700,82)
  inputButton.mousePressed(apiCall)
}

function keyPressed() {
  if (keyCode === ENTER) {
    apiCall()
  }
}

function draw() {
  background(0)

  fill(255)
  textSize(32)
  textAlign(LEFT);
  text("Please enter a city name:",100,100)

  if (userInput.value()) {
    textAlign(CENTER);
    text(inputText,width/2,900)

    if (temperature && userInput.value() == currentCity) {
      textSize(128)
      text(temperature + '° F',width/2,500)

      textSize(32)
      text("in " + currentCity, width/2,600)
    }
  }
}

function changeText() {
  inputText = this.value()
}

function apiCallback(resp) {
  temperature = round((9/5) * ((resp.main.temp) - 273.15) + 32,2)
}

function apiCall() {
  if (userInput.value()) {
    currentCity = userInput.value()
    var weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?'
    var openWeatherKey = '4b51ea8f9df853197e28b845d40db73a'
    var weatherUrl = weatherEndpoint + 'q=' + currentCity + '&APPID=' + openWeatherKey

    loadJSON(weatherUrl,apiCallback)
  } else {
    alert("Please type in a city!")
  }
}