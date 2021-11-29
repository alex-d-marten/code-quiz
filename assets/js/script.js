var highScores = [];
const timerEl = $('#timer');
const btnStartEl = $('#btn-start');
const questionEl = $('.question');
const answersEl = $('.answers');
const responseEl = $('.response');
const btnHighScore = $('.btn-score');
const highScorePageEl = $('.high-score-entry');
const playerName = $('input-high-score');
let questionIndex;
let numberCorrect;
let timeLeft = 50;
let timerInterval;

// need to retrieve all high scores from local storage

function timerCounter() {
    timerInterval = setInterval(function timer() {
        $(timerEl).text("Time left: " + timeLeft);
        if (timeLeft === 0) {
            $(timerEl).text("Out of time, game over!")
            timerStop();
            submitHighScore();
            return;
        }
        timeLeft--;
        return timer;
    }(), 1000);
};

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
    timeLeft = 100;
    timerCounter();
    btnStartEl.addClass('d-none');
    displayQuestions();
};

btnStartEl.on('click', startQuiz);

// function to display question and answers on page

var displayQuestions = function() {
    if (questionIndex < testQuestions.length) {
        resetQuestionContent();
        const qText = (testQuestions[questionIndex].questionTextContent);
        questionEl.append(qText).attr("questionIndex", questionIndex);
        console.log(questionEl);
                
    for (i=0; i < testQuestions[questionIndex].questionsAnswers.length; i++) {
        const answersLi = $("<li>")
            .text(testQuestions[questionIndex].questionsAnswers[i].answerText)
            .addClass('list-items btn-primary mt-1 mb-1 rounded')
            .attr('answerIndex', i);
            console.log(answersLi);
        answersEl.append(answersLi);
        }
    }
    else {
        // stop timer and display the end page
        timerStop();
        // insert function to display end page
        submitHighScore();
    }

};

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

// function to display high score page
var submitHighScore = function() {
    responseEl.empty().removeClass('bg-danger bg-success');
    resetQuestionContent();
    highScorePageEl.removeClass('d-none');
    btnHighScore.removeClass('d-none');
};

// event listener to handle high score submission
btnHighScore.on('click', function() {
    let username = playerName.val()
})

// need to store high score in local storage
