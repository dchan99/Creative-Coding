var unparsedData
var parsedData = {}
var parsedArrayData
var initialDataLoaded = false
var joobleTriggered = false
var allDataLoaded = false
var geocoded = {}

function setup() {
  usBackground = loadImage('us_cropped.jpg',function(usBackground) {
    createCanvas(3*usBackground.width,3*usBackground.height)
    image(usBackground,0,0,3*usBackground.width,3*usBackground.height)
  })
  
  //noLoop()
  joobleCall()
  setTimeout(formatData,15000)
}

function formatData() {
  parsedArrayData = Object.keys(parsedData).map(function(key) {
    return [key, parsedData[key]];
  })

  var maxI = Math.ceil(parsedArrayData.length/100)
  for (var i = 0; i < maxI; ++i) {
    var mapQuestUrl = "http://www.mapquestapi.com/geocoding/v1/batch?key=hfoar9zB0Askf1kPrrzXQKbRKOipZAsA"
    var portion = parsedArrayData.slice(i*100,(i+1)*100)
    for (city of portion) {
      var location = city[0].replace(', ',',')
      location = location.replace(' ','%20')
      mapQuestUrl += "&location=" + location
    }
    //console.log(mapQuestUrl)
    loadJSON(mapQuestUrl,function geocodedCallBack(geocodedData) {
      var geocodedResults = geocodedData.results
      for (g in geocodedResults) {
        if (!(geocodedResults[g].providedLocation.location in geocoded)) {
          geocoded[geocodedResults[g].providedLocation.location] = [geocodedResults[g].locations[0].latLng.lat,geocodedResults[g].locations[0].latLng.lng]
        }
      }
      // console.log('geocoded',geocoded)
    })
  }
}

function draw() {
  if (millis() >= 20000) {
    for (city in parsedData) {
      var xPos = map(geocoded[city][1],-130,-60,0,width)
      var yPos = map(geocoded[city][0],50,25,0,height)
      noFill()
      // ellipse(xPos,yPos,1,1)
      fill(127,217,239,20)
      ellipse(xPos,yPos,parsedData[city],parsedData[city])
    }
  }
}


function joobleCallback2(joobleData) {
  initialDataLoaded = true

  unparsedData = joobleData
  for(job of unparsedData.jobs) {
    if (job.location.replace(', ',',') in parsedData) {
      parsedData[job.location.replace(', ',',')] += 1
    } else {
      parsedData[job.location.replace(', ',',')] = 1
    }
  }
}

function joobleCallback(joobleData) {
  initialDataLoaded = true

  unparsedData = joobleData
  for(job of unparsedData.jobs) {
    if (job.location.replace(', ',',') in parsedData) {
      parsedData[job.location.replace(', ',',')] += 1
    } else {
      parsedData[job.location.replace(', ',',')] = 1
    }
  }
  if (unparsedData.totalCount >= 1000) {
    for (var i = 2; i <= 50; ++i) {
      joobleCall(i)
    }
  } else if (unparsedData.totalCount >= 40){
    var maxPages = Math.floor(unparsedData.totalCount/20)
    for (var i = 2; i <= maxPages; ++i) {
      joobleCall(i)
    }
  }
}

function joobleCall(page=1) {
  initialDataLoaded = false
  joobleTriggered = true

  //Majority of code borrowed from Jooble : Integration Examples
  //https://us.jooble.org/api/about
  
  var url = "https://us.jooble.org/api/";
  var key = "cb211bed-6e2e-4210-8fc1-53fe257aafa8";
  var params = "{keywords: 'python', page: " + page + ", location: 'United States'}"

  //create xmlHttpRequest object
  var http = new XMLHttpRequest();
  //open connection. true - asynchronous, false - synchronous
  http.open("POST", url + key, true);

  //Send the proper header information
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
  //Callback when the state changes
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      if (page == 1) {
        console.log('Response1')
        joobleCallback(JSON.parse(http.responseText));
      } else {
        console.log('Response2')
        joobleCallback2(JSON.parse(http.responseText));
      }
    }
  }
  //Send request to the server
  http.send(params);
}