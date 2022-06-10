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
 clearScreens()
  goToHomeScreen()

  //Use section below to test functions whilst developing
  
  
}

//Clear Screens - this function makes all screen divs disappear so that we can turn on the screen we want
function clearScreens(){  
for(i=0; i<screensDiv.length ; i++){
  console.log(screensDiv[i]);
  screensDiv[i].setAttribute("style", "display:none");
}}

//Show other screens functions - - - -
function goToHomeScreen(){
  homeScreen.setAttribute("style", "display:block");
}
function goToQuestionScreen(){
  questionScreen.setAttribute("style", "display:block");
}
function goToResultScreen(){
  resultScreen.setAttribute("style", "display:block");
}
function goToHighScoreScreen(){
  highScoreScreen.setAttribute("style", "display:block");
}
function goToHighsettingsScreen(){
  settingsScreen.setAttribute("style", "display:block");
}
//End show other screens functions - - - -



init()