//Create variables ---------------------------------------------------------
//var IDs
var screens = document.getElementById("screens");
var screensDiv = document.querySelectorAll("#screens div");
var homeScreen = document.getElementById("home-screen");
var questionScreen = document.getElementById("question-screen");
var resultScreen = document.getElementById("result-screen");
var highScoreScreen = document.getElementById("high-score-screen");
var settingsScreen = document.getElementById("settings-screen");
var homeScreen = document.getElementById("home-screen");

// var Buttons
var highScoresBtn = document.querySelector("high-score-btn");
var settingsBtn = document.querySelector("settings-btn");
var startBtn = document.querySelector("start-btn");


// Functions ---------------------------------------------------------
function init() {
  // screensDiv.setAttribute("style", "display:none");
clearScreens()
  homeScreen.setAttribute("style", "display:block");
  console.log("home block");
}

function clearScreens(){
  
for(i=0; i<screensDiv.length ; i++){
  console.log(screensDiv[i]);
  screensDiv[i].setAttribute("style", "display:none");
}
}


init()