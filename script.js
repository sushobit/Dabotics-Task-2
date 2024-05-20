const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const resultTextElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Who is the President of the USA?',
        answers: [
            { text: 'Joe Biden', correct: true },
            { text: 'Donald Trump', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Jupiter', correct: true },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for water?',
        answers: [
            { text: 'H2O', correct: true },
            { text: 'O2', correct: false }
        ]
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Charles Dickens', correct: false }
        ]
    },
    {
        question: 'What is the square root of 64?',
        answers: [
            { text: '8', correct: true },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'What is the capital of Japan?',
        answers: [
            { text: 'Tokyo', correct: true },
            { text: 'Kyoto', correct: false }
        ]
    },
    {
        question: 'What is the smallest prime number?',
        answers: [
            { text: '2', correct: true },
            { text: '1', correct: false }
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: [
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Vincent van Gogh', correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
    startButton.classList.add('hide');
    resultContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainerElement.classList.remove('slide-in');
    void questionContainerElement.offsetWidth; // Trigger reflow to restart animation
    questionContainerElement.classList.add('slide-in');
    
    document.getElementById('question').innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.classList.add('fade-in');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    resultContainerElement.classList.add('fade-in');
    if (score >= 7) {
        resultTextElement.innerHTML = `<img src="https://media.giphy.com/media/l0HlQKRlb9DxT1r20/giphy.gif" alt="Winner"> <br> You win! Your score is ${score}.`;
    } else {
        resultTextElement.innerHTML = `<img src="https://media.giphy.com/media/3ohs4BSacFKI7A717y/giphy.gif" alt="Loser"> <br> You lose! Your score is ${score}.`;
    }
    restartButton.classList.remove('hide');
}
