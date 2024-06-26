let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let Time = 0;
let timer1;

document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    socket.on('load questions', (loadedQuestions) => {
        console.log('Received questions:', loadedQuestions);
        questions = loadedQuestions;
    });
    // receive the questions from the server

});

function startQuiz() {
    document.getElementById('name-form').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    const username = document.getElementById('username').value;
    localStorage.setItem('currentUsername', username);
    showQuestion(); // Display the first question
    startTimer(); // Set the countdown
    totalTime(); // Calculate the total time
}

function showQuestion() {
    const questionObj = questions[currentQuestion];
    document.getElementById('questionID').textContent = `Question ${currentQuestion + 1}`;
    document.getElementById('question').textContent = questionObj.question;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    // Display the choices buttons
    questionObj.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.className = 'choice-button';
        button.onclick = () => checkAnswer(index);
        choicesContainer.appendChild(button);
    });
}

function nextQuestion() {
    currentQuestion += 1;
    showQuestion();
    document.getElementById('content').style.display = 'block';
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-button').style.display = 'none';
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    let time = 20;
    document.getElementById('timer').textContent = `Time to answer: ${time} seconds`;
    timer = setInterval(() => {
        time--;
        document.getElementById('timer').textContent = `Time to answer: ${time} seconds`;
        if (time <= 0) {
            clearInterval(timer);
            checkAnswer(-1);
        }
    }, 1000);
}

function totalTime() {
    timer1 = setInterval(() => {
        Time++;
    }, 1000);
}

function checkAnswer(index) {
    clearInterval(timer);
    
    document.getElementById('content').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    const socket = io();

    // Send the answer to the server
    socket.emit('submit answer', { questionIndex: currentQuestion, answer: index });

    // Receive the result from the server
    socket.on('answer result', (result) => {
        document.getElementById('loading').style.display = 'none';
        if (result) {
            score++;
            document.getElementById('feedback').textContent = 'Your answer is correct!';
        } else {
            document.getElementById('feedback').textContent = 'Your answer is incorrect!';
        }
        if (currentQuestion + 1 < questions.length) {
            document.getElementById('next-button').style.display = 'block';
        } else {
            showResults();
        }
        if (currentQuestion + 1 === questions.length) {
            // if the last question is answered, sent the result to the server
            socket.emit('load leaderboard', { username: localStorage.getItem('currentUsername'), score: score, Time: Time });

            // Receive the updated leaderboard from the server
            socket.on("update leaderboard", (leaderboard) => {
                const leaderboardList = document.getElementById('leaderboard-list');
                leaderboardList.innerHTML = '';

                leaderboard.forEach((entry, index) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${entry.username}</td>
                    <td>${entry.score} points</td>
                    <td>${entry.Time || 0} seconds</td>
                `;
                    leaderboardList.appendChild(tr);
                });

                document.getElementById('leaderboard').style.display = 'block';
            });

            // socket.emit('delete records');// Delete the records in the leaderboard
        }
    });
}

function showResults() {
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('score').textContent = `${score}`;
    document.getElementById('total').textContent = `${questions.length}`;
    document.getElementById('totalTime').textContent = `${Time}`;
}
