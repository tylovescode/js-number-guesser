/*
Game Function
- Player must guess a number between max and min
- Player gets a certain number of guesses
- Notify player of guesses remaining
- Notify player of correct or incorrect answer
- Let player choose to play again
*/

//Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;
//Play again event listener
//USES EVENT DELEGATION
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//Guess button listener
guessBtn.addEventListener('click', function() {
  //guessInput is a string, must convert to number
  let guess = parseInt(guessInput.value);
  //Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  //Check to see if correct answer
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, you win!`);
  } else {
    //Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //Game over LOST
      gameOver(
        false,
        `Game over, you lost. The correct number was ${winningNum}`
      );
    } else if (guess > winningNum) {
      //Game continues, answer wrong
      //Change border color
      guessInput.style.borderColor = 'red';
      //Clear Input
      guessInput.value = '';
      //Tell user answer is wrong
      setMessage(
        `${guess} is too high, you have ${guessesLeft} guesses left`,
        'red'
      );
    } else if (guess < winningNum) {
      //Game continues, answer wrong
      //Change border color
      guessInput.style.borderColor = 'red';
      //Clear Input
      guessInput.value = '';
      //Tell user answer is wrong
      setMessage(
        `${guess} is too low, you have ${guessesLeft} guesses left`,
        'red'
      );
    }
  }
});
//Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  //Disable input
  guessInput.disabled = true;
  //Change border to green
  guessInput.style.borderColor = color;
  //Set text color
  message.style.color = color;
  //Set message
  setMessage(msg);

  //PLAY AGAIN
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
//Get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
