'use strict';

// Tar fram ett slumpmässigt nummer mellan 1-20
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

// Query selectors
const numberQuery = document.querySelector('.number');
const scoreQuery = document.querySelector('.score');
const highscoreQuery = document.querySelector('.highscore');
const bodyQuery = document.querySelector('body');
const guessQuery = document.querySelector('.guess');

// On load the browser gets the highscore from local storage
window.onload = function () {
  highscore = localStorage.getItem('Highscore');
  highscoreQuery.textContent = highscore;
};

let displayResultMessage = (message) => {
  document.querySelector('.message').textContent = message
}

// lyssnar efter ett klick på "Check"-knappen
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(guessQuery.value);

  // Om det inte finns någon input, alltså om det är 0
  if (!guess) {
    displayResultMessage('No number!');
    // om du gissar på rätt nummer
  } else if (guess === secretNumber) {
    displayResultMessage('You are correct!');
    score++;
    scoreQuery.textContent = score;
    bodyQuery.style.backgroundColor = '#60b347';
    numberQuery.style.width = '30rem';
    numberQuery.textContent = secretNumber;

    // Om din nuvarande score är högre än den tidigare highscore så sätts din som den nya
    if (score > highscore) {
      highscore = score;
      // sätter den nya highscore som local storage
      localStorage.setItem('Highscore', highscore);
      highscoreQuery.textContent = highscore;
    }

    // Om numret du gissar på är fel
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayResultMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      scoreQuery.textContent = score;
    } else {
      displayResultMessage('You lost the game!');
    }
  }
  
});

// Resets color to the start colors after you win
const resetAppColors = () => {
  bodyQuery.style.backgroundColor = '#222';
  numberQuery.style.width = '15rem';
};

// Gör i ordning spelet för att spela igen, återställer inte highscore
const playAgain = () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  numberQuery.textContent = '?';
  scoreQuery.textContent = score;
  guessQuery.value = '';
  displayResultMessage('Start guessing...');
  resetAppColors();
};

// Återställer hela spelet inklusive highscore
const resetGame = () => {
  localStorage.clear();
  numberQuery.textContent = '?';
  highscoreQuery.textContent = 0;
  scoreQuery.textContent = 20;
  guessQuery.value = '';
  displayResultMessage('Start guessing...');
  resetAppColors();
};

// Lyssnar efter ett klick på "Again"-knappen
document.querySelector('.again').addEventListener('click', e => playAgain());

// Om du vill återställa hela spelet från början och sätta highscore till 0
document.querySelector('.reset').addEventListener('click', e => resetGame());
