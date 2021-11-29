var highScores = [];
const timerEl = $('#timer');
const btnStartEl = $('#btn-start');
const questionEl = $('.question');
const answersEl = $('.answers');
const responseEl = $('.response');
let questionIndex;
let numberCorrect;

// need to retrieve all high scores from local storage

var timerCounter = function() {
    var timeLeft = 50;

    var timerInterval = setInterval(function() {
        var timeString = "Time left: " + timeLeft;
        $(timerEl).text(timeString);

        if (timeLeft === 0) {
            $(timerEl).text("Out of time, game over!")
            timerStop();
            // insert function to display end page
            return;
        }
        timeLeft--;
    }, 1000);
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
            .addClass('list-items btn-primary mt-1 mb-1')
            .attr('answerIndex', i);
            console.log(answersLi);
        answersEl.append(answersLi);
        }
    }
    else {
        // stop timer and display the end page
        timerStop();
        // insert function to display end page
    }

};

var resetQuestionContent = function() {
    questionEl.empty();
    answersEl.empty();
    responseEl.empty();
};

// event listener for answer selections
answersEl.on('click', '.list-items', function() {
    var answerIndex = $(this).attr("answerIndex");
    var userAnswer = testQuestions[questionIndex].questionsAnswers[answerIndex];

    if(userAnswer.correct) {
        responseEl.text("Correct!");
        numberCorrect++;
        $(this).addClass('btn-success');
        responseEl.addClass('btn-success');
    }
})

// need to store high score in local storage
