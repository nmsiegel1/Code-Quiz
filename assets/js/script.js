var timeLeft = 100;
var timerEl = document.querySelector("#timer");
var startButtonEl = document.querySelector(".start-button");
var nextButton = document.getElementById("next-btn");
var submitButtonEl = document.getElementById("submit-btn");
var scoreButton = document.getElementById("score-btn");
var mainEl = document.querySelector(".questions");
var listEl = document.querySelector(".answers");
var quizContentEl = document.getElementById("quiz-content");
var quizCompleteEl = document.getElementById("your-score");
var questionEl = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-btns");
var messageEl = document.getElementById("message");
var shuffledQuestions, currentQuestionIndex;
var questionsObj = [
    {
        question: "Which of the following functions is a valid type of function that JavaScript supports?",
        answers: [
            {text: "named functions", correct: false},
            {text: "anonymous functions", correct: false},
            {text: "both named and anonymous functions", correct: true},
            {text: "none of the above", correct: false}
        ],
     },
    {
        question: "The condition in an if/else statement is enclosed within ____?",
        answers: [
            {text: "curly brackets", correct: true},
            {text: "quotes", correct: false},
            {text: "parenthesis", correct: false},
            {text: "straight brackets", correct: false}
        ],
    },
    {
        question: "Arrays in JavaScript can be used to store____?",
        answers: [
            {text: "numbers and strings", correct: false},
            {text: "other arrays", correct: false},
            {text: "booleans", correct: false},
            {text: "all of the above", correct: true}
        ],
    },
    {
        question: "Which of the following statements is true about JavaScript?",
        answers: [
            {text: "It is a scripting lanquage used to make websites interactive", correct: true},
            {text: "It is an advanced version of Java for Desktop and Mobile application development", correct: false},
            {text: "It is a markup langage of Java to develop webpages", correct: false},
            {text: "All of the above",  correct: false}
        ],
    },
    {
        question: "In JavaScript, multi-line comments are marked with _____",
        answers: [
            {text: "/* and */", correct: true},
            {text: "<!—and -->", correct: false},
            {text: "## and ##", correct: false},
            {text: "// and //", correct: false}
        ],
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
function startGame() {
    var mainTitle = document.querySelector(".main-title");
    mainTitle.remove();
    var mainSubtitle = document.querySelector(".main-subtitle");
    mainSubtitle.remove();
    var instructions = document.querySelector(".instructions");
    instructions.remove();
    startButtonEl.remove();
    quizContentEl.classList.remove("hide");
    shuffledQuestions = questionsObj.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    setNextQuestion();
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add('btn');

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
        answerButtonEl.appendChild(button);
    })
};

function resetState () {
    nextButton.classList.add('hide');
    messageEl.classList.add("hide");
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild
        (answerButtonEl.firstChild)
    }
};

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    var answerCorrect = selectedButton.dataset.true;
    setStatusClass(document.body, correct);
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    answerButtonEl.onclick = function () {
        if (selectedButton.classList.contains("correct")){
            messageEl.textContent = "Correct!";
        }else{
            messageEl.innerText = "Sorry, that's not right!";
            timeLeft = timeLeft -20;
        }
    };


    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
        messageEl.classList.remove("hide");
    } else {
        scoreButton.classList.remove("hide");
        messageEl.classList.remove("hide");
        // submitScore(timeLeft);
    }
};


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
        
    } else {
        element.classList.add("wrong");
    }
};

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function submitScore() {
    var highScore = timeLeft
    quizContentEl.classList.add("hide");
    quizCompleteEl.classList.remove("hide");
    var headingEl = document.querySelector(".quiz-complete");
    headingEl.textContent = "All done!";
    var scoreEl = document.getElementById("final-score");
    scoreEl.textContent = "Your score is " + timeLeft;
    var submitEl = document.getElementById("user-name");
   
    if (scoreEl.value !== null) {
        var userScoreArray = JSON.parse(window.localStorage.getItem("userScoreArray")) || [];
        submitButtonEl.addEventListener("click", function (event) {
        event.preventDefault();
        var userNameEl = submitEl.text;
        console.log(submitEl);
        var userScore = {
                score: highScore,
                name: userNameEl
        };
            // set new submission to local storage
        userScoreArray.push(userScore);
        localStorage.setItem("userScoreArray", JSON.stringify(userScoreArray));
        window.open("./highscores.html", "_self");
})
    }
};

// score button event listener
scoreButton.addEventListener("click", submitScore);

// next question event listener 
nextButton.addEventListener("click", () =>{
    currentQuestionIndex++;
    setNextQuestion();
});



// start quiz event listener
startButtonEl.addEventListener("click", function() {
    countDown();
    startGame();
    setNextQuestion();
});