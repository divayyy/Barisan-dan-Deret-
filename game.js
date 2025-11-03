const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const backHomeButton = document.getElementById('back-home');
const startScreen = document.getElementById('start-screen');
const bgMusic = document.getElementById('bg-music');

let currentQuestionIndex = 0;

const questions = [
    {
        question: "Suku pertama barisan aritmetika adalah 3, beda 2. Berapa suku ke-5?",
        answers: [
            { text: "11", correct: true },
            { text: "10", correct: false },
            { text: "12", correct: false },
            { text: "9", correct: false }
        ]
    },
    {
        question: "Suku pertama barisan geometri adalah 2, rasio 3. Berapa suku ke-4?",
        answers: [
            { text: "54", correct: true },
            { text: "48", correct: false },
            { text: "36", correct: false },
            { text: "24", correct: false }
        ]
    },
    {
        question: "Jumlah 5 suku pertama barisan aritmetika dengan a=1, b=2?",
        answers: [
            { text: "25", correct: true },
            { text: "20", correct: false },
            { text: "15", correct: false },
            { text: "30", correct: false }
        ]
    },
    {
        question: "Deret geometri a=3, r=2, jumlah 3 suku pertama?",
        answers: [
            { text: "21", correct: true },
            { text: "24", correct: false },
            { text: "18", correct: false },
            { text: "20", correct: false }
        ]
    },
    {
        question: "Suku ke-7 barisan aritmetika a=4, b=5?",
        answers: [
            { text: "34", correct: true },
            { text: "32", correct: false },
            { text: "36", correct: false },
            { text: "30", correct: false }
        ]
    },
    {
        question: "Suku ke-3 barisan geometri a=5, r=2?",
        answers: [
            { text: "20", correct: true },
            { text: "10", correct: false },
            { text: "15", correct: false },
            { text: "25", correct: false }
        ]
    },
    {
        question: "Jumlah 4 suku pertama barisan aritmetika a=2, b=3?",
        answers: [
            { text: "26", correct: true },
            { text: "20", correct: false },
            { text: "18", correct: false },
            { text: "24", correct: false }
        ]
    },
    {
        question: "Deret geometri a=1, r=3, jumlah 4 suku pertama?",
        answers: [
            { text: "40", correct: true },
            { text: "39", correct: false },
            { text: "27", correct: false },
            { text: "36", correct: false }
        ]
    },
    {
        question: "Suku ke-10 barisan aritmetika a=2, b=4?",
        answers: [
            { text: "38", correct: true },
            { text: "36", correct: false },
            { text: "40", correct: false },
            { text: "34", correct: false }
        ]
    },
    {
        question: "Suku ke-5 barisan geometri a=2, r=2?",
        answers: [
            { text: "32", correct: true },
            { text: "16", correct: false },
            { text: "24", correct: false },
            { text: "64", correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
backHomeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

function startGame() {
    startScreen.classList.add('hide');
    questionContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    setNextQuestion();
    bgMusic.play();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex >= questions.length) {
        questionElement.innerText = "Selamat! Anda telah menyelesaikan semua soal.";
        nextButton.classList.add('hide');
        return;
    }
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(button, correct) {
    setStatusClass(button, correct);
    Array.from(answerButtonsElement.children).forEach(btn => btn.disabled = true);
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
        element.innerText += " ✅ Benar";
    } else {
        element.classList.add('wrong');
        element.innerText += " ❌ Salah";
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
