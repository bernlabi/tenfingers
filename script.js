'use strict';

// **** DOM Elements ********************
const number1 = document.getElementById('number1');
const number2 = document.getElementById('number2');
const answerInput = document.getElementById('answer');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');

const lastScore = localStorage.getItem('finalScore');
const lastAttempts = localStorage.getItem('totalAttempts');
const operatorDisplay = document.getElementById('operator');

let problem = 0;
let num1 = 0;
let num2 = 0;
let score = 0;
let attempts = 0;
answerInput.value = '';
let num1Digit2 = 0;
let num2Digit2 = 0;
let operation = 0;

// **** Event Listeners *******************************************************************
startBtn.addEventListener('click', () => {
  startGame();
  answerInput.focus();
});

answerInput.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

// **** Functions *************************************************************************

function generateRandomNumber(range) {
  return Math.floor(Math.random() * range); // range defines the numbers limit to be used
}

// ** Addition Module ***********
const additions = (() => {
  const add = (a, b) => {
    let result = 0;
    result = a + b;
    return result;
  };

  return {
    add,
  };
})();

// ** Game Logic *******************
function startGame() {
  answerInput.value = '';

  operatorDisplay.textContent = '+';
  num1 = generateRandomNumber(10);
  num2 = generateRandomNumber(10);
  operation = additions.add(num1, num2);
  if (operation > 10) {
    while (operation > 10) {
      num1 = generateRandomNumber(10);
      num2 = generateRandomNumber(10);
      operation = additions.add(num1, num2);
    }
  }

  number1.textContent = num1;
  number2.textContent = num2;
}

// ** Generate Problem Type ***********
function generateProblem() {
  problem = Math.floor(Math.random() * 3 + 1);
  return problem;
}

// ** Check Answer *******************
function checkAnswer() {
  if (answerInput.value != '' || answerInput.value != null) {
    if (
      answerInput.value ==
      additions.add(
        parseInt(number1.textContent),
        parseInt(number2.textContent)
      )
    ) {
      feedback.textContent = 'Correct!';
      feedback.style.color = 'green';
      incrementScore();
      incrementAttempts();
      updateScore();
      startGame();
    } else {
      feedback.textContent = 'Incorrect. Try again!';
      feedback.style.color = 'red';
      incrementAttempts();
      updateScore();
      answerInput.value = '';
    }
  }
}

// ** Update Score Display ***********
function updateScore() {
  scoreDisplay.textContent = `Score: ${score} out of  ${attempts} attempt(s) `;
}

// ** Increment Score ***************
function incrementScore() {
  score++;
}

// ** Increment Attempts ************
function incrementAttempts() {
  attempts++;
  if (attempts === 10) {
    updateScore();
    localStorage.setItem('finalScore', score);
    localStorage.setItem('totalAttempts', attempts);
    alert(`   Game Over!  Great effort Archie!

      Your final score is ${score} out of ${attempts}.`);
    resetGame();
  }
}

// ** Reset Game ********************
function resetGame() {
  score = 0;
  attempts = 0;
  updateScore();
  location.reload();
}

updateScore();
