const questions = [
    { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: "4" },
    { question: "What is the capital of France?", answers: ["Paris", "London", "Rome"], correct: "Paris" },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter"], correct: "Mars" }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => checkAnswer(answer, currentQuestion.correct);
        answerButtons.appendChild(button);
    });

    startTimer();
}

function resetState() {
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";
    clearInterval(timer);
    timeLeft = 10;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selected, correct) {
    if (selected === correct) score++;
    nextQuestion();
}

function nextQuestion() {
    clearInterval(timer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.innerText = `Quiz Over! Your Score: ${score}/${questions.length}`;
    answerButtons.innerHTML = "";
    nextButton.innerText = "Restart";
    nextButton.style.display = "block";
    nextButton.onclick = startQuiz;
}

startQuiz();
