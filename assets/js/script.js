//Create variables ---------------------------------------------------------
//var IDs
var screens = document.getElementById("screens");
var screensDiv = document.querySelectorAll("#screens div");
var homeScreen = document.getElementById("home-screen");
var questionScreen = document.getElementById("question-screen");
var resultScreen = document.getElementById("result-screen");
var highScoreScreen = document.getElementById("high-score-screen");
var settingsScreen = document.getElementById("settings-screen");

// var Buttons
var highScoresBtn = document.querySelector("high-score-btn");
var settingsBtn = document.querySelector("settings-btn");
var startBtn = document.querySelector("start-btn");


// Functions ---------------------------------------------------------
function init() {
  // screensDiv.setAttribute("style", "display:none");
clearScreens()
  // homeScreen.setAttribute("style", "display:block");
  goToHomeScreen()
  // console.log("home block");
}

//Clear Screens - this function makes all screen divs disappear so that we can turn on the screen we want
function clearScreens(){  
for(i=0; i<screensDiv.length ; i++){
  console.log(screensDiv[i]);
  screensDiv[i].setAttribute("style", "display:none");
}}

//Show other screens
function goToHomeScreen(){
  homeScreen.setAttribute("style", "display:block");
}
function goToQuestionScreen(){
  questionScreen.setAttribute("style", "display:block");
}
function goToresultScreen(){
  resultScreen.setAttribute("style", "display:block");
}
function goTohighScoreScreen(){
  highScoreScreen.setAttribute("style", "display:block");
}
function goTohighsettingsScreen(){
  settingsScreen.setAttribute("style", "display:block");
}



init()