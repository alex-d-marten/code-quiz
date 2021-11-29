// declare jQeury constants
const navHighScore = $('#high-score');
const timerEl = $('#timer');
const btnStartEl = $('#btn-start');
const questionEl = $('.question');
const answersEl = $('.answers');
const responseEl = $('.response');
const btnHighScore = $('.btn-score');
const highScoreEntryEl = $('.high-score-entry');
const playerName = $('.input-high-score');
const tryAgainEl = $('.try-again');
const scoresEl = $('.scores');
const scoreTitleEl = $('.score-title');

// declare variables
let questionIndex;
let numberCorrect;
let timeLeft = 50;
let highScores = [];
let timerInterval;

// retrieve local storage and assign variable if values present
function retrieveStoredScores() {
    var localStorageScores = JSON.parse(localStorage.getItem("highScores")); 
    if(localStorageScores !== null) {
        highScores = localStorageScores;
    }   
};

// function for timer counter
function timerCounter() {
    timerInterval = setInterval(function timer() {
        $(timerEl).text("Time left: " + timeLeft);
        if (timeLeft === 0) {
            $(timerEl).text("Out of time, game over!")
            timerStop();
            submitHighScorePage();
            return;
        }
        timeLeft--;
        return timer;
    }(), 1000);
};

// function to stop timer
var timerStop = function() {
    timeLeft = 0;
    if(timerInterval) {
        clearInterval(timerInterval);
    };
};

// start button clicked function
var startQuiz = function() {
    questionIndex = 0;
    numberCorrect = 0;
    timeLeft = 50;
    timerCounter();
    btnStartEl.addClass('d-none');
    displayQuestions();
};

// start quiz on button click
btnStartEl.on('click', startQuiz);

// function to display question and answers on page
var displayQuestions = function() {
    if (questionIndex < testQuestions.length) {
        resetQuestionContent();
        const qText = (testQuestions[questionIndex].questionTextContent);
        questionEl.append(qText).attr("questionIndex", questionIndex).addClass('p-3');
                
    for (i=0; i < testQuestions[questionIndex].questionsAnswers.length; i++) {
        const answersLi = $("<li>")
            .text(testQuestions[questionIndex].questionsAnswers[i].answerText)
            .addClass('list-items btn-primary mt-1 mb-1 rounded p-3')
            .attr('answerIndex', i);
        answersEl.append(answersLi);
        }
    }
    else {
        timerStop();
        submitHighScorePage();
    }

};

// reset content function
var resetQuestionContent = function() {
    questionEl.empty();
    answersEl.empty();
};

// event listener for answer selections
answersEl.on('click', '.list-items', function() {
    var answerIndex = $(this).attr("answerIndex");
    var userAnswer = testQuestions[questionIndex].questionsAnswers[answerIndex];
    responseEl.removeClass("d-none bg-success bg-danger");

    if(userAnswer.correct) {
        responseEl.text("Correct!");
        numberCorrect++;
        responseEl.addClass('bg-success text-light');
        questionIndex++;
        displayQuestions();
    }
    else {
        responseEl.addClass('bg-danger text-light');
        responseEl.text("Incorrect! 10 seconds lost.");
        timeLeft -= 10;
        questionIndex++;
        displayQuestions();
    }
});

// function to display submit high score page
var submitHighScorePage = function() {
    responseEl.empty().removeClass('bg-danger bg-success');
    responseEl.text("You have finished the quiz with a score of " + numberCorrect + " out of 5");
    resetQuestionContent();
    highScoreEntryEl.removeClass('d-none');
    btnHighScore.removeClass('d-none');
};

// event listener to handle high score submission
btnHighScore.on('click', function() {
    let username = playerName.val();
    highScores.push({
        playerName: username,
        playerScore: numberCorrect,
    });
    // send to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    highScorePage();
})

// high score nav bar click
navHighScore.on('click', function() {
    timerStop();
    highScorePage();
});

// function to display high scores
var highScorePage = function() {
    // remove existing content
    responseEl.empty();
    scoreTitleEl.empty();
    scoresEl.empty();
    tryAgainEl.empty();
    // hide unneccessary HTML
    highScoreEntryEl.addClass('d-none');
    btnHighScore.addClass('d-none');
    btnStartEl.addClass('d-none');

    // build quiz retry button
    const h4 = $('<h4>');
    h4.text("Click this box to try the quiz again!").addClass('rounded retry p-3');
    tryAgainEl.append(h4);

    // build high score title
    const scoreTitle = $('<h4>');
    scoreTitle
        .addClass('text-light rounded p-2 score-title')
        .text("High Scores");
    
    scoreTitleEl.append(scoreTitle);

    // loop through local storage and build high score list
    for (i=0; i < highScores.length; i++) {
        const scoreList = $('<li>');
        scoreList
            .addClass('text-light mt-2 mb-2 rounded p-3 score-list-items')
            .text("Name: " + highScores[i].playerName + " ---  Score: " + highScores[i].playerScore);
        scoresEl.append(scoreList);
    };
};

// event listener to refresh page
tryAgainEl.on('click', function() {
    window.location.reload();
});
retrieveStoredScores();