var clearScoresBtn = document.querySelector(".clear-score");
var scoreList = document.querySelector(".scores-ol");

// function to retrieve data from local storage and put it on the page
var showScores = function () {
    var userScore = JSON.parse(localStorage.getItem("userScoreArray")) || [];
    userScore.sort((a, b) => {
        return b.score - a.score;});
        for (var i=0; i < userScore.length; i++) {
            var retrievedScore = document.createElement("li");
            retrievedScore.textContent = userScore[i].name + ": " + userScore[i].score;
            retrievedScore.classList.add("scores-li");
            scoreList.appendChild(retrievedScore);
        }
    };

// event listener for clearing score button
 clearScoresBtn.addEventListener("click", function(){
    scoreList.innerHTML = "";
    localStorage.clear();
});

// call function to load scores on screen
showScores();