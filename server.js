const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const questions = [
    { question: "Who is the MVP of the 2023-2024 NBA regular season?", choices: ["Nikola Jokić", "Shai Gilgeous-Alexander", "Joel Embiid", "Giannis Antetokounmpo"], correct: 0 },
    { question: "Which club won the UEFA Champions League in 2023?", choices: ["Manchester City FC", "Real Madrid", "FC Bayren Munich", "FC Barcelona"], correct: 0 },
    { question: "Who scored the most points in the NBA history?", choices: ["Leborn James", "Micheal Jordan", "Kevin Durant", "Kobe Byrant"], correct: 0 },
    { question: "Which country won the 2022 World Cup Champion?", choices: ["Netherlands", "France", "Argentina", "Croatia"], correct: 2 },
    { question: "Which Bundesliga team won the Bundesliga championship  with an unbeaten record this year?", choices: ["FC Bayren Munich", "Bayer 04 Leverkusen", "Borussia Dortmund", "FC Schalke 04"], correct: 1 },
    { question: "The unbeaten record set by Bayer 04 Leverkusen was broken after how many wins?", choices: ["49", "50", "51", "52"], correct: 2 },
    { question: "Which team is the English Premier League champion for the 2023-2024 season?", choices: ["Manchester City FC", "Chelsea FC", "Arsenal FC", "Tottenham Hotspur FC"], correct: 0 },
    { question: "Who is the all-time top scorer in Manchester United history?", choices: ["Wayne Rooney", "Bobby Charlton", "Denis Law", "Ryan Giggs"], correct: 0 },
    { question: "Who is the all-time top scorer in Tottenham Hotspur history?", choices: ["Jimmy Greaves", "Bobby Smith", "Cliff Jones", "Harry Kane"], correct: 3 },
    { question: "Who is the all-time top scorer in UEFA Champions League history?", choices: ["Lionel Messi", "Robert Lewandowski", "Cristiano Ronaldo", "Karim Benzema"], correct: 2 }
];

app.use(express.static('public'));

io.on('connection', (socket) => {

    socket.emit('load questions', questions);
    // sent questions to the quiz page

    // receive the answer from the quiz page
    socket.on('submit answer', (answer) => {
        const currentQuestion = answer.questionIndex;
        const index = answer.answer;
        // check the answer and sent the result back to the quiz page
        if (index === questions[currentQuestion].correct) {
            socket.emit('answer result', true);
        } else {
            socket.emit('answer result', false);
        }
    });

});


server.listen(8080, () => {
    console.log('Listening on 8080');
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});

