const questions = [
    { question: "What is the capital of France?", choices: ["Paris", "London", "Rome", "Berlin"], correct: 0 },
    { question: "What is 2 + 2?", choices: ["3", "4", "5", "6"], correct: 1 },
    { question: "Who is the MVP of the 2023-2024 NBA regular season?", choices: ["Nikola Jokić", "Shai Gilgeous-Alexander", "Joel Embiid", "Giannis Antetokounmpo"], correct: 0 },
    { question: "Which club won the UEFA Champions League in 2023?", choices: ["Manchester City FC", "Real Madrid", "FC Bayren Munich", "Basi"], correct: 1 },
    { question: "Who scored the most points in the NBA history?", choices: ["Leborn James", "Micheal Jordan", "Kevin Durant", "Kobe Byrant"], correct: 0 },
    { question: "Which country won the 2022 World Cup Champion?", choices: ["Netherlands", "France", "Argentina", "Croatia"], correct: 2 },
    { question: "Which Bundesliga team won the championship  with an unbeaten record this year?", choices: ["FC Bayren Munich", "Bayer 04 Leverkusen", "Borussia Dortmund", "FC Schalke 04"], correct: 1 },
    { question: "Which team is the English Premier League champion for the 2023-2024 season?", choices: ["Manchester City FC", "Chelsea FC", "Arsenal FC", "Tottenham Hotspur FC"], correct: 0 }
];

let currentQuestion = 0;
let score = 0;
let timer;

function startQuiz() {
    document.getElementById('name-form').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion();
    startTimer();
}



function showQuestion() {
    const questionObj = questions[currentQuestion];
    document.getElementById('questionID').textContent = `Question ${currentQuestion + 1}`;
    document.getElementById('question').textContent = questionObj.question;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    questionObj.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => checkAnswer(index);
        choicesContainer.appendChild(button);
    });
}

function nextQuestion() {
    currentQuestion += 1;
    showQuestion();
    document.getElementById('content').style.display= 'block';
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-button').style.display = 'none';
    startTimer();
}

function startTimer() {
    let time = 15;
    document.getElementById('timer').textContent = `Time to answer: ${time} seconds`;
    timer = setInterval(() => {
        time--;
        document.getElementById('timer').textContent = `Time to answer: ${time} seconds`;
        if (time <= 0) {
            clearInterval(timer);
            checkAnswer(-1);  // Time's up, no correct answer
        }
    }, 1000);
}

function checkAnswer(index) {
    clearInterval(timer);
    document.getElementById('content').style.display= 'none';
    if (index === questions[currentQuestion].correct) {
        score++;
        document.getElementById('feedback').textContent = 'Your answer is correct!';
    } else {
        document.getElementById('feedback').textContent = 'Your answer is incorrect!';
    }
    if (currentQuestion+1 < questions.length) {
        document.getElementById('next-button').style.display = 'block';
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score').textContent = `${score}`;
    document.getElementById('total').textContent = `${questions.length}`;
}
