//Create variables ---------------------------------------------------------
//var IDs
//defaults

var defaultVals = {
  qtyOfQuestions: 11,
  timeForQuiz: 5,
  timeDeducted: 20,
  subjectNames: ["Unit - 1: Web Essentials", "Unit - 2: Markup Languages", "Unit - 3: JAVA Script"],
  subjectSelect: [1, 2],

}

//Screens
{
  var screens = document.getElementById("screens");
  var screensDiv = document.querySelectorAll("#screens div");
  var homeScreen = document.getElementById("home-screen");
  var questionScreen = document.getElementById("question-screen");
  var resultScreen = document.getElementById("result-screen");
  var highScoreScreen = document.getElementById("high-score-screen");
  var settingsScreen = document.getElementById("settings-screen");
}



// var Buttons
//goto buttons
{
  var homeBtn = document.querySelector("#home-btn");
  homeBtn.addEventListener("click", function () {
    goToHomeScreen();
  });
  var highScoresBtn = document.querySelector("#high-score-btn");
  highScoresBtn.addEventListener("click", function () {
    console.log("home button pushed");
    goToHighScoreScreen();
  });
  var settingsBtn = document.querySelector("#settings-btn");
  settingsBtn.addEventListener("click", function () {
    goToSettingsScreen()
  });
}

//Other buttons
var startBtn = document.querySelector("#start-btn");

var submitSettingsBtn = document.querySelector("#submit-settings-btn");
submitSettingsBtn.addEventListener("click", function () {
  console.log("Y");
  saveSettings()
});

//Checkboxes
//Will want to change to an array we can select from
{ var checkQ1 = document.querySelector("#question-type1");
var checkQ2 = document.querySelector("#question-type1");
var checkQ3 = document.querySelector("#question-type1");
}

//spans
{ var timeForQuizSpan = document.getElementById("time-for-quiz");
var timeDeductedSpan = document.getElementById("time-deducted");
var qtyOfQuestionsSpan = document.getElementById("qty-of-questions");
}

//Form Items
//Settings
var qtyOfQuestionsSetting = document.querySelector("#question-qty");
qtyOfQuestionsSpan.textContent = localStorage.getItem("qtyOfQuestions");

var quizTimeSetting = document.querySelector("#quiz-time");
var timeForQuizMS = quizTimeSetting.value * 1000 * 60; //in milliseconds
// var quizTimeForm = document.querySelector("#quiz-time");
timeForQuizSpan.textContent = localStorage.getItem("timeForQuiz") + " minutes";

var deductedTimeSetting = document.querySelector("#deducted-time");
var timeForDeductMS = deductedTimeSetting.value * 1000; //in milliseconds


// Functions ---------------------------------------------------------
function init() {
  //  clearScreens() ;
  goToHomeScreen();

  //Use section below to test functions whilst developing
  goToSettingsScreen();


}

//Clear Screens - this function makes all screen divs disappear so that we can turn on the screen we want
{
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
    homeBtn.setAttribute("style", "display:none");
    settingsBtn.setAttribute("style", "display:block");
    highScoresBtn.setAttribute("style", "display:block");

  }
  function goToQuestionScreen() {
    clearScreens()
    questionScreen.setAttribute("style", "display:block");
    homeBtn.setAttribute("style", "display:none");
    settingsBtn.setAttribute("style", "display:none");
    highScoresBtn.setAttribute("style", "display:none");

  }
  function goToResultScreen() {
    clearScreens()
    resultScreen.setAttribute("style", "display:block");
    //set buttons
    homeBtn.setAttribute("style", "display:block");
    settingsBtn.setAttribute("style", "display:block");
    highScoresBtn.setAttribute("style", "display:block");
  }
  function goToHighScoreScreen() {
    clearScreens()
    highScoreScreen.setAttribute("style", "display:block");
    //set buttons
    homeBtn.setAttribute("style", "display:block");
    settingsBtn.setAttribute("style", "display:block");
    highScoresBtn.setAttribute("style", "display:none");
  }
  function goToSettingsScreen() {
    clearScreens()
    settingsScreen.setAttribute("style", "display:block");
    //set buttons
    homeBtn.setAttribute("style", "display:block");
    settingsBtn.setAttribute("style", "display:none");
    highScoresBtn.setAttribute("style", "display:block");

  }
  //End show other screens functions - - - -
}

function InitSettings() {
  //Set qty of questions
  if (localStorage.getItem("qtyOfQuestions") == null ) {
    //set default
    localStorage.setItem("qtyOfQuestions", defaultVals.qtyOfQuestions);
  }
  qtyOfQuestionsSetting.value = localStorage.getItem("qtyOfQuestions") ;

    //Set time for quiz
    if (localStorage.getItem("timeForQuiz") == null ) {
      //set default
      localStorage.setItem("timeForQuiz", defaultVals.timeForQuiz);
    }
    quizTimeSetting.value = localStorage.getItem("timeForQuiz") ;

  //Set  deducted time for mistake
  if (localStorage.getItem("timeDeducted") == null) {
    //set default
    localStorage.setItem("timeDeducted", defaultVals.timeDeducted);
  } 
  deductedTimeSetting.value = localStorage.getItem("timeDeducted");

  saveSettings()
}


function saveSettings() {
  qtyOfQuestionsSpan.textContent = localStorage.getItem("qtyOfQuestions");

  //Set qty of Questions
  localStorage.setItem("qtyOfQuestions", qtyOfQuestionsSetting.value)
  //Also apply to span on home page
  qtyOfQuestionsSpan.textContent = localStorage.getItem("qtyOfQuestions") ;

   //Set time for quiz
   localStorage.setItem("timeForQuiz", quizTimeSetting.value)
   //Also apply to span on home page
   timeForQuizSpan.textContent = localStorage.getItem("timeForQuiz") + " minutes";

  //Set  deducted time for mistakes
  localStorage.setItem("timeDeducted", deductedTimeSetting.value);
  //Also apply to span on home page
  timeDeductedSpan.textContent = localStorage.getItem("timeDeducted") + " seconds";
}




init()

InitSettings()