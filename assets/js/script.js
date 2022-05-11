var timeLeft = 100;
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector(".start-button");
var mainEl = document.querySelector(".questions");
var listEl = document.querySelector(".answers");
var questionEl = document.getElementById("quiz-content");
var questionsObj = [
    {
        question1: "Which of the following functions is a valid type of function that JavaScript supports?",
        answers: [
            "named functions",
            "anonymous functions",
            "both named and anonymous functions",
            "none of the above"
        ],
        correct: "both named and anonymous functions"
    },
    {
        quesiton2: "The condition in an if/else statement is enclosed within ____?",
        answers: [
            "curly brackets",
            "quotes",
            "parenthesis",
            "straight brackets"
        ],
        correct: "curly brackets"
    },
    {
        question3: "Arrays in JavaScript can be used to store____?",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        correct: "all of the above"
    },
    {
        question4: "Which of the following statements is true about JavaScript?",
        answers: [
            "It is a scripting lanquage used to make websites interactive",
            "It is an advanced version of Java for Desktop and Mobile application development",
            "It is a markup langage of Java to develop webpages",
            "All of the above"
        ],
        correct: "It is a scripting language used to make websites interactive"
    },
    {
        question5: "In JavaScript, multi-line comments are marked with _____",
        answers: [
            "/* and */",
            "<!—and -->",
            "## and ##",
            "// and //"
        ],
        correct: "/* and */"
    },
]

// begin functions
// timer function
function countDown() {
    // variable for the start time
    var timeInterval = setInterval(function() {
        if (timeLeft > 0){
            timerEl.textContent = "Timer: " + timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent ="Timer: " + "";
            clearInterval(timeInterval);
        }
    }, 1000);
};

// quiz function
function startQuiz() {
    var mainTitle = document.querySelector(".main-title");
    mainTitle.remove();
    var mainSubtitle = document.querySelector(".main-subtitle");
    mainSubtitle.remove();
    var instructions = document.querySelector(".instructions");
    instructions.remove();
    startButtonEl.remove();
    questionEl.classList.remove("hide");



};

function quizQuestions() {
for(var i=0; i < questionsObj.length; i++) {
    questionEl = questionArr[i]
    }
};





// start quiz event listener
startButtonEl.addEventListener("click", function() {
    console.log("click");
    countDown();
    startQuiz();
});