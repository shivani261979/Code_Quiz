var curStep = 1;

const maxTimeAllowed = 20;
var remainingSeconds = maxTimeAllowed; 

var timeClock;

var correctAnswer = [4,3,3,1,3];

var yourScore = 0;

function startQuiz(){

    document.getElementsByClassName("steps")[0].style.display = "block";
    document.getElementById("currentPosition").innerHTML = "Question " + (curStep) + " of 5"

}

$('document').ready(function(){
    startQuiz();
    startTimer();
    setupRadios();
});




function nextQuestion(){

    var answer = getSelection();
    console.log("getSelection() returned " + answer);

    if(answer == 0 ){
        showError("Please make a selection first.");
        return;
    } else {
        
    }
        
    goToNextQuestion();
}

function skipQuestion(){

    goToNextQuestion();
}

function goToNextQuestion(){

    document.getElementsByClassName("steps")[curStep-1].style.display = "none";
    curStep++;
    document.getElementsByClassName("steps")[curStep-1].style.display = "block";
    document.getElementById("currentPosition").innerHTML = "Question " + (curStep) + " of 5"

    if(curStep == 6){
        showFinalReportCard()
        return;
    } else if( curStep == 5)
        document.getElementById("nextButton").innerText = "Get Results";

    startTimer();
    resetMessageArea();
    resetNextButton();
}

function showFinalReportCard(){

    resetMessageArea();
    document.getElementsByClassName("messageBar")[0].style.display = "none";
    document.getElementsByClassName("bottomToolbar")[0].style.display = "none";
    document.getElementById("currentPosition").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("yourScore").innerHTML = "You've scored " + (yourScore*20) + "%";
}


function getSelection() {

    var groupName = "step-" + curStep;

    var radios = document.getElementsByName("step-" + curStep);

    console.log("getSelection for radio groupName " + groupName + ", found total " + radios.length + " radio buttons.")

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            // get value, set checked flag or do whatever you need to
            // value = radios[i].value;    
            return i+1;   
        }
    }

    return 0;
}


function setupRadios(){

    for(var x=0; x < 6; x++){

        var rad = document.getElementsByName("step-" + x);

        console.log("---------- setupRadios for step-" + x + " -------- ");

        for (var i = 0; i < rad.length; i++) {
            console.log("setupRadios pos - " + i);

            rad[i].addEventListener('change', function() {
                checkAnswer(this.value);
            });
        }
    }
}


function checkAnswer(usersChoice){

    console.log("User selected - " + usersChoice );

    if(correctAnswer[curStep-1] == usersChoice){
        showInfo("Correct Answer.");
        yourScore++;
    } else {
        var correctAns = getValueOfRadioOnPos( correctAnswer[curStep-1] );
        showError("Incorrect Answer. Correct Answer is '" + correctAns + "'");
    }

    disableAnswerSelection();
}

function getValueOfRadioOnPos(pos){

    var curQuestion = document.getElementsByClassName("steps")[curStep-1];

    var selector = 'label[for=option-' + pos + ']';
    var label = curQuestion.querySelector(selector);
    return label.innerHTML;
}

function disableAnswerSelection(){

    var groupName = "step-" + curStep;
    var radios = document.getElementsByName(groupName);

    console.log("disableAnswerSelection will disable Radios with name - " + groupName + " total count - " + radios.length);

    for (var i = 0; i < radios.length;  i++){
        radios[i].disabled = true;
        console.log("disabling pos: " + i);
    }
    stopTimer();
}

// **********    Timer related Methods   *************

function startTimer(){
    remainingSeconds = maxTimeAllowed;

    clearInterval(timeClock);
    timeClock = setInterval(function(){
        remainingSeconds--;
        updateTimer();
        if(remainingSeconds <= 0)
            makeSkipTheOnlyOption();
    }, 1000);
}

function updateTimer(){
    document.getElementById("timer").innerHTML = remainingSeconds + " seconds remaining";
}

function stopTimer(){

    clearInterval(timeClock);
}

function makeSkipTheOnlyOption(){

    clearInterval(timeClock);
    disableAnswerSelection();
    disableNextButton();
    showError("Timeout, Skip Question now.");
}


// *********    Methods to show informational messages   ********

function showError(msg){

    resetMessageArea();
    document.getElementsByClassName("error")[0].innerHTML = msg;
}

function showInfo(msg){

    resetMessageArea();
    document.getElementsByClassName("info")[0].innerHTML = msg;
}

function resetMessageArea(){

    document.getElementsByClassName("info")[0].innerHTML = "";
    document.getElementsByClassName("error")[0].innerHTML = "";
}


function disableNextButton(){
    // document.getElementById("nextButton").setAttribute("disabled", "disabled");
    document.getElementById("nextButton").style.visibility = "hidden";
}

function resetNextButton(){
    // document.getElementById("nextButton").removeAttribute("disabled");
    document.getElementById("nextButton").style.visibility = "visible";
}