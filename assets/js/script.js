var highScores = [];
var timerEl = $('#timer');

var timerCounter = function() {
    var timeLeft = 5;

    var timerInterval = setInterval(function() {
        if (timeLeft >= 0) {
            var timeString = "Time left: " + timeLeft;
            $(timerEl).text(timeString);
            timeLeft--;
        }
        else {
            // Update to have an End game function called here transitioning to the end game page to save name and score to local storage
            $(timerEl).text("Out of time, game over!")
            clearInterval(timerInterval);
        }

    }, 1000);
};

timerCounter();

// need to retrieve all high scores from local storage


// need to store high score in local storage




// var startQuiz = function() {
//     // When the start button is pressed display the first question and answerres
//     // Start the timer in the top right
// }