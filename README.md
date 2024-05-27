# WEB-Assignment
Due time: 2024.6.1
Finished: 2024.5.26

## Overview
The project is a web-based quiz application. The application asks users a series of questions, collects their answers, and provides feedback on the correctness of their answers. The quiz application was designed using **HTML**, **CSS**, **JavaScript**, and **Node.js** and utilises **Socket.IO** for real-time communication between the client and server.

## Configuration:

Run the following commands in the "WEB-Quiz-Application" directory.
```console
npm init -y 
npm install
npm install express socket.io
npm start
```
And then you can run the program under at https://localhost:3000.

### Clearing Leaderboard:
If the website operator want to clear the leaderboard, he or she can go to edit **quiz.js** file, find the part of the checkAnswer function definition where the last line of code is commented out. Uncomment this line, and after doing the whole quiz once, re-comment it and run the website again. This line emits a **delete records** event to the server to set the leaderboard as a empty list.