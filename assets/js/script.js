//Create variables ---------------------------------------------------------
//var IDs
//Screens
var screens = document.getElementById("screens");
var screensDiv = document.querySelectorAll("#screens div");
var homeScreen = document.getElementById("home-screen");
var questionScreen = document.getElementById("question-screen");
var resultScreen = document.getElementById("result-screen");
var highScoreScreen = document.getElementById("high-score-screen");
var settingsScreen = document.getElementById("settings-screen");

//spans
var timeForQuizSpan = document.getElementById("time-for-quiz");
var timeDeductedSpan = document.getElementById("time-deducted");

// var Buttons
var highScoresBtn = document.querySelector("high-score-btn");
var settingsBtn = document.querySelector("settings-btn");
var startBtn = document.querySelector("start-btn");


// Functions ---------------------------------------------------------
function init() {
  //  clearScreens() ;
  goToHomeScreen();

  //Use section below to test functions whilst developing
  goToSettingsScreen();


}

//Clear Screens - this function makes all screen divs disappear so that we can turn on the screen we want
function clearScreens() {
  for (i = 0; i < screensDiv.length; i++) {
    //We need to check that only "screen" IDs are hidden
    var checkScreen = String(screensDiv[i].id);
    // console.log(checkScreen)
    if (checkScreen.slice(- 6) == "screen") {
      screensDiv[i].setAttribute("style", "display:none")
    };
  }
} //This is (should be) referenced in all goTo functions

//Show other screens functions - - - -
function goToHomeScreen() {
  clearScreens()
  homeScreen.setAttribute("style", "display:block");
}
function goToQuestionScreen() {
  clearScreens()
  questionScreen.setAttribute("style", "display:block");
}
function goToResultScreen() {
  clearScreens()
  resultScreen.setAttribute("style", "display:block");
}
function goToHighScoreScreen() {
  clearScreens()
  highScoreScreen.setAttribute("style", "display:block");
}
function goToSettingsScreen() {
  clearScreens()
  settingsScreen.setAttribute("style", "display:block");
}
//End show other screens functions - - - -



init()