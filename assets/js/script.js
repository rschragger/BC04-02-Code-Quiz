//Create variables ---------------------------------------------------------
//var IDs
//defaults

var defaultVals = {
  qtyOfQuestions: 11,
  timeForQuiz: 5,
  timeDeducted: 20,
  subjectNames: ["Unit - 1: Web Essentials", "Unit - 2: Markup Languages", "Unit - 3: JavaScript"],
  subjectSelect: [1, 2],
  hsResults: [{ 'name': 'No scores yet', 'score': 0 }]//, { 'name': 'John', 'score': 10 }],
}

//Get JSON object for Q and As
const qAndA = JSON.parse(localStorage.getItem("jsonQandA"));
//Establish what the tags are in this data
const qTags = ['course', 'qID', 'questionNo', 'questionText', 'aAnswer', 'bAnswer', 'cAnswer', 'dAnswer', 'correctAnswer'];
var thisQList = [];
var thisQ = [];
var answerResult = "";
var thisScore = 0;
var quizCounter = 0;
var quizCounterFail = false;
var quizCounterArray = [];
// var hsList = [{}];
// var hsList = [];

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
//goto buttons (and the timer display)
{
  var homeBtn = document.querySelector("#home-btn");
  homeBtn.addEventListener("click", function () {
    event.preventDefault();
    goToHomeScreen();
  });
  var highScoresBtn = document.querySelector("#high-score-btn");
  highScoresBtn.addEventListener("click", function () {
    event.preventDefault();
    // console.log("home button pushed");
    goToHighScoreScreen();
  });
  var settingsBtn = document.querySelector("#settings-btn");
  settingsBtn.addEventListener("click", function () {
    event.preventDefault();
    goToSettingsScreen()
  });

  var timerDisplay = document.getElementById("timer");
}

//Answer buttons - A,B,C,D - causes function isAnswerCorrect()
{
  var answerBtnA = document.querySelector('#aAnswer');
  answerBtnA.addEventListener("click", function () {
    event.preventDefault();
    isAnswerCorrect("A");
  });
  var answerBtnB = document.querySelector('#bAnswer');
  answerBtnB.addEventListener("click", function () {
    event.preventDefault();
    isAnswerCorrect("B");
  });
  var answerBtnC = document.querySelector('#cAnswer');
  answerBtnC.addEventListener("click", function () {
    event.preventDefault();
    isAnswerCorrect("C");
  });
  var answerBtnD = document.querySelector('#dAnswer');
  answerBtnD.addEventListener("click", function () {
    event.preventDefault();
    isAnswerCorrect("D");
  });
}
function isAnswerCorrect(ansText) {
  var corrAnswer = thisQ['correctAnswer'].toUpperCase();
  var givenAnswer = ansText.toUpperCase()
  var corrBtnName = '#' + corrAnswer.toLowerCase() + 'Answer';
  var wrongBtnName = '#' + givenAnswer.toLowerCase() + 'Answer';
  document.querySelector([corrBtnName]).style = ("background-color:green");
  quizCounterArray.push(quizCounter);

  if (corrAnswer == givenAnswer) {
    //Correct answer
    window.answerResult = "Correct";
    window.thisScore++;//add to score
    setTimeout(pauseNextQuestion, 300);
  } else {
    //Wrong answer
    document.querySelector([wrongBtnName]).style = ("background-color:red");
    window.answerResult = "Wrong, correct answer is " + thisQ['correctAnswer'].toUpperCase();
    quizCounter = quizCounter - timeForDeductGb;
    setTimeout(pauseNextQuestion, 1000);
  }

  // nextQuestion()
  // next Question is now handled through a timeout so that users can get an idea if they were wrong or right
  //Correct answers are quick and they will see a quick flash of green, wrong answers are paused a little longer
}

//Other buttons
var startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", function () {
  event.preventDefault();
  startQuiz();
});

var submitSettingsBtn = document.querySelector("#submit-settings-btn");
submitSettingsBtn.addEventListener("click", function () {
  // console.log("Y");
  event.preventDefault();
  saveSettings()
  goToHomeScreen()


});

var submitHScoresBtn = document.querySelector("#hs-submit-btn");
submitHScoresBtn.addEventListener("click", function () {
  // console.log("Y");
  event.preventDefault();
  addScoreToStorage();
  goToHighScoreScreen();
});

//Checkboxes
//Will want to change to an array we can select from
{
  var areaList = []; //this will be the global var of areas to choose questions from
  var checkQ0 = document.querySelector("#question-type1"); //checkQ1.checked
  var checkQ1 = document.querySelector("#question-type2");
  var checkQ2 = document.querySelector("#question-type3");
  var checkQ3 = document.querySelector("#question-type4");
  var checkQ4 = document.querySelector("#question-type5");
}
//checkQ0.labels[0].textContent
//eval('checkQ'+'1').labels[0].textContent

//Make the areas for questions to be
//Set localStorage to checkboxes 
function setAreasLocaltoCheckbox() {
  var getCheckedList = [];
  var qtyChecks = document.querySelectorAll('#settings-checkbox input').length;
  for (i = 0; i < qtyChecks; i++) {
    var isChecked = eval('checkQ' + i).checked;
    if (isChecked == true) {
      getCheckedList.push(eval('checkQ' + i).labels[0].textContent);
    }
  }
  //check for no entries and prevent
  if (getCheckedList.length < 1) {
    alert('There needs to be at least one area checked, we will apply the first item.');
    checkQ0.checked = true;
    localStorage.setItem("questionAreas", checkQ0.labels[0].textContent);
  } else {
    localStorage.setItem("questionAreas", getCheckedList);
  }
}

//Set checkboxes to localStorage
function setAreasCheckboxtoLocal() {
  var getCheckedList = localStorage.getItem("questionAreas");
  if (!getCheckedList) {
    // getCheckedList = defaultVals.subjectNames;
    localStorage.setItem("questionAreas", defaultVals.subjectNames);
    getCheckedList = localStorage.getItem("questionAreas");
  }
  var qtyChecks = document.querySelectorAll('#settings-checkbox input').length;
  for (i = 0; i < qtyChecks; i++) {

    var cbText = eval('checkQ' + i).labels[0].textContent;
    var storeExists = getCheckedList.includes(cbText)
    if (storeExists == true) {
      eval('checkQ' + i).checked = true;
    } else {
      eval('checkQ' + i).checked = false;

    }
  }
  return window.areaList = getCheckedList;
}


//var spans in HTML text
{
  var timeForQuizSpan = document.getElementById("time-for-quiz");
  var timeDeductedSpan = document.getElementById("time-deducted");
  var qtyOfQuestionsSpan = document.getElementById("qty-of-questions");
}

//var Form Items
//Settings
{
  var qtyOfQuestionsSetting = document.querySelector("#question-qty");
  var qtyQuestions = 10;
  // qtyOfQuestionsSpan.textContent = localStorage.getItem("qtyOfQuestions");

  var quizTimeSetting = document.querySelector("#quiz-time");
  // timeForQuizSpan.textContent = localStorage.getItem("timeForQuiz") + " minutes";
  // var timeForQuizGb = quizTimeSetting.value * 1000 * 60; //in milliseconds

  var deductedTimeSetting = document.querySelector("#deducted-time");
  // var timeForDeductGb = deductedTimeSetting.value * 1000; //in milliseconds
}

// Functions ---------------------------------------------------------
function init() {
  //  Go to settings to recall client's setting first
  goToSettingsScreen();

  //Start from this point
  goToHomeScreen();

  //Use section below to test functions whilst developing
  // startQuiz();
  // goToSettingsScreen();
  // setAreasLocaltoCheckbox();
  // goToHighScoreScreen()
}

//Clear Screens
//        this function makes all screen divs disappear so that we can turn on the screen we want
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
}

//Show other screens functions - - - -
{
  function goToHomeScreen() {
    clearScreens()
    homeScreen.setAttribute("style", "display:block");
    homeBtn.setAttribute("style", "display:none");
    settingsBtn.setAttribute("style", "display:block");
    highScoresBtn.setAttribute("style", "display:block");

  }
  function goToQuestionScreen() {
    clearScreens()
    questionScreen.setAttribute("style", "display:flex");
    homeBtn.setAttribute("style", "display:none");
    settingsBtn.setAttribute("style", "display:none");
    highScoresBtn.setAttribute("style", "display:none");

  }

  function goToResultScreen() {
    clearScreens()
    // clearInterval(quizSeconds);
    resultScreen.setAttribute("style", "display:flex");
    //set buttons
    homeBtn.setAttribute("style", "display:block");
    settingsBtn.setAttribute("style", "display:block");
    highScoresBtn.setAttribute("style", "display:block");
    timerDisplay.style = ("display:none");

    //make table
    //Below will fix the times
    quizCounterFail = true;
    var lastQTime = quizCounterArray.slice(-1);
    if (lastQTime == '') {
      document.getElementById('timeTaken').textContent = "N/A";
    }
    else if (quizCounter > 0) {
      document.getElementById('timeTaken').textContent = secondsToMMSS(timeForQuizGb - lastQTime);
      // quizCounter = timeForQuizGb + 5;
    } else {
      document.getElementById('timeTaken').textContent = secondsToMMSS(timeForQuizGb);
    } //just in case {  Math.max(quizCounter,0)  }

    //Note qNo is -1 because a question not answered shall be considered not attempted
    document.getElementById('totalQNo').textContent = thisQList.length;
    document.getElementById('qNo').textContent = qNo - 1;
    document.getElementById('timeAssigned').textContent = secondsToMMSS(timeForQuizGb);
    // document.getElementById('timeAssigned').textContent = minutesToMMSS(localStorage.getItem("timeForQuiz"));
    document.getElementById('thisScore').textContent = thisScore;

    quizCounterArray = [];//reset
  }

  function goToHighScoreScreen() {
    clearScreens()
    highScoreScreen.setAttribute("style", "display:flex");
    //set buttons
    homeBtn.setAttribute("style", "display:block");
    settingsBtn.setAttribute("style", "display:block");
    highScoresBtn.setAttribute("style", "display:none");

    getHScoresFromStorage()
  }

  function goToSettingsScreen() {
    clearScreens()
    settingsScreen.setAttribute("style", "display:block");
    //set buttons
    homeBtn.setAttribute("style", "display:block");
    settingsBtn.setAttribute("style", "display:none");
    highScoresBtn.setAttribute("style", "display:block");

  }
}//End show other screens functions - - - -


function InitSettings() {
  //Set qty of questions
  if (localStorage.getItem("qtyOfQuestions") == null) {
    //set default
    localStorage.setItem("qtyOfQuestions", defaultVals.qtyOfQuestions);
  }
  qtyOfQuestionsSetting.value = localStorage.getItem("qtyOfQuestions");

  //Set time for quiz
  if (localStorage.getItem("timeForQuiz") == null) {
    //set default
    localStorage.setItem("timeForQuiz", defaultVals.timeForQuiz);
  }
  quizTimeSetting.value = localStorage.getItem("timeForQuiz");

  //Set  deducted time for mistake
  if (localStorage.getItem("timeDeducted") == null) {
    //set default
    localStorage.setItem("timeDeducted", defaultVals.timeDeducted);
  }
  deductedTimeSetting.value = localStorage.getItem("timeDeducted");

  //Question Areas - Use saved Checkbox preferences
  setAreasCheckboxtoLocal()
  // setAreasLocaltoCheckbox()
  saveSettings()
}


function saveSettings() {
  qtyOfQuestionsSpan.textContent = localStorage.getItem("qtyOfQuestions");

  {//Set qty of Questions
    localStorage.setItem("qtyOfQuestions", qtyOfQuestionsSetting.value)
    //Also apply to span on home page
    qtyOfQuestionsSpan.textContent = localStorage.getItem("qtyOfQuestions");
  }

  {//Set time for quiz
    localStorage.setItem("timeForQuiz", quizTimeSetting.value)
    //Also apply to span on home page
    timeForQuizSpan.textContent = localStorage.getItem("timeForQuiz") + " minutes";
  }

  {  //Set  deducted time for mistakes
    localStorage.setItem("timeDeducted", deductedTimeSetting.value);
    //Also apply to span on home page
    timeDeductedSpan.textContent = localStorage.getItem("timeDeducted") + String.fromCharCode(160) + "seconds"; //non breaking space
  }
  {//Set Area Checkboxes
    setAreasLocaltoCheckbox();
    //setAreasCheckboxtoLocal();
  }

  {//Set global variables
    window.qtyQuestions = localStorage.getItem("qtyOfQuestions");
    //Convert time values into milliseconds as global variables
    window.timeForQuizGb = localStorage.getItem("timeForQuiz") * 60; //in minutes
    window.timeForDeductGb = localStorage.getItem("timeDeducted"); //in seconds
  }

} //end saveSettings()

//Use Settings to get a randomised question list
function getQuestions() {
  //globals are qtyQuestions, 
  var qCount = localStorage.getItem("qtyOfQuestions"); //get global setting
  var origQList = qAndA;
  var qAreas = localStorage.getItem("questionAreas");
  var areasQlist = [];
  var finalQList = [];

  //Pick the questions avaiable from Areas checked
  origQList.forEach(pickQs);
  function pickQs(item) {
    //getCheckedList.includes(cbText)
    if (qAreas.includes(item.course)) {
      areasQlist.push(item);
    }
  }

  //Pick a random set of questions
  for (q = 0; q < qCount; q++) {
    var randNo = Math.floor(Math.random() * (areasQlist.length));
    finalQList.push(areasQlist[randNo]);
  }
  window.thisQList = finalQList;
}

function setoutQuestion(thisQ) {
  for (let q = 0; q < qTags.length; q++) {
    // document.getElementById(obj[q]).innerHTML = obj[q].value();
    var thisElement = qTags[q];
    if (document.getElementById([thisElement]) != null) {

      //first reset styles (green and red buttons)
      document.getElementById([thisElement]).style = "";
      //then add text
      document.getElementById([thisElement]).innerText = thisQ[thisElement];
    }
  }
}

function startQuiz() {
  goToQuestionScreen();
  window.thisScore = 0;
  window.qNo = 0;
  //location.reload; //reset screen

  //Use Settings to get the required questions, time and deductions
  getQuestions()

  //start of timer ------
  quizCounter = timeForQuizGb;
  quizCounterFail = false;
  var quizSeconds = setInterval(quizTimer, 1000);

  function quizTimer() {
    quizCounter--
    if (quizCounterFail == true) {
      clearInterval(quizSeconds);
      //We will already be in result screen
    }
    else if (quizCounter <= 0) {
      timerDisplay.style = ("display:none");
      clearInterval(quizSeconds);
      goToResultScreen()
    } else {
      displayTimer(quizCounter)
    }
  }
  //End of timer ------

  //Go to first question
  nextQuestion()
}

function secondsToMMSS(timeInSeconds) {
  min = Math.floor(timeInSeconds / 60);
  sec = (timeInSeconds - (60 * min)).toString().padStart(2, "0");
  return min + ":" + sec;
}

function minutesToMMSS(timeInMinutes) {
  return secondsToMMSS((timeInMinutes * 60));
}

function pauseNextQuestion() {
  nextQuestion()
}

function nextQuestion() {
  window.qNo++;

  // Setup question in HTML 
  // window.thisQ = qAndA[120]; //********* */
  window.thisQ = thisQList[qNo - 1];
  if (qNo < (thisQList.length + 1)) {
    setoutQuestion(thisQ)
    displayTimer();
  }
  else {
    goToResultScreen()
  }

}

function addScoreToStorage() {
  if (localStorage.getItem("hsResults") == null) {
    // localStorage.setItem("hsResults", JSON.stringify(defaultVals.hsResults));
    localStorage.setItem("hsResults", JSON.stringify([]));
  }

  var hsName = document.getElementById('hs-name').value;
  // var hsScore = window.thisScore ;
  var hsList = JSON.parse(localStorage.getItem("hsResults"));
  // hsList1 = JSON.parse(hsList1);
  console.log(hsList);
  hsList.push({ 'name': hsName, 'score': window.thisScore });
  // hsList1.push({'name':'xxx','score':'11'});
  console.log(hsList);
  localStorage.setItem("hsResults", JSON.stringify(hsList));

  document.getElementById('hs-name').value = "";
  getHScoresFromStorage()
}

function getHScoresFromStorage() {
  // localStorage.setItem("hsResults", push)
  var hsList = JSON.parse(localStorage.getItem("hsResults"));

  //if no scores yet, fail gracefully
  if (hsList == null) {
    return
  }

  //Sort by score descending
  hsList.sort((a, b) => {
    return b.score - a.score;
  });

  //delete the table body for replacement
  var tBody = document.getElementById('hsCells');
  tBody.textContent = "";
  // tBody.innerHTML = "";

  // var newTag = document.createElement(tagName);
  // newTag.textContent = "new Text"
  // document.hsCells.appendChild(tag);

  // repeat for table rows
  for (trNo = 0; trNo < hsList.length; trNo++) {
    var thisRow = hsList[trNo];
    var trTag = document.createElement('tr');
    var trID = 'tr' + trNo;
    tBody.appendChild(trTag);
    trTag.id = trID;
    //repeat for table cells
    for (tdNo = 0; tdNo < Object.values(thisRow).length; tdNo++) {
      var tdTag = document.createElement('td');
      tdTag.textContent = Object.values(thisRow)[tdNo];
      trTag.appendChild(tdTag);
    } //end repeat td

  } //end repeat tr
}

function displayTimer(secsLeft) {
  var td = window.timerDisplay;
  // var qs = window.quizSeconds;
  td.style = ("display:flex");
  td.textContent = secsLeft;

  // timerDisplay.style=("display:flex");
  // timerDisplay.textContent = quizSeconds.value ;
}


InitSettings()
init()