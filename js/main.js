console.log('Main loaded');
// Variabelen
let playerCredits = 5;
let computerCredits = 5;
let gameOver = false;
// Elementen selecteren uit de HTML
const computerCreditsElement = document.querySelector('.computer-credits');
const playerCreditsElement = document.querySelector('.player-credits');
const computerDiceOneElement = document.querySelector('.computer-dice-one');
const computerDiceTwoElement = document.querySelector('.computer-dice-two');
const playerDiceOneElement = document.querySelector('.player-dice-one');
const playerDiceTwoElement = document.querySelector('.player-dice-two');
const messageBox = document.querySelector('.message-box');
const diceButton = document.querySelector('.dice-button');
const higherButton = document.querySelector('.higher-button');
const lowerButton = document.querySelector('.lower-button');
const goButton = document.querySelector('.go-button');

const diceArray = [
  "&#9856;", 
  "&#9857;", 
  "&#9858;", 
  "&#9859;", 
  "&#9860;", 
  "&#9861;"  
];
// Variabelen voor dobbelstenen
let computerDiceOne = 0;
let computerDiceTwo = 0;
let playerDiceOne = 0;
let playerDiceTwo = 0;
let computerTurn = true;
let higher = false;
// Knoppen initialiseren
diceButton.disabled = true;
higherButton.disabled = true;
lowerButton.disabled = true;
goButton.disabled = false;
// Credits weergeven op de pagina
computerCreditsElement.textContent = computerCredits;
playerCreditsElement.textContent = playerCredits;
// Event listener voor "Go" knop
goButton.addEventListener('click', function () {
  if (gameOver) {
    playerCredits = 5;
    computerCredits = 5;
    computerCreditsElement.textContent = computerCredits;
    playerCreditsElement.textContent = playerCredits;
    gameOver = false;
  }
  messageBox.textContent = 'Het spel is gestart. De computer mag eerst gooien';
  goButton.disabled = true;
  diceButton.disabled = false;
});
// Event listener voor "Gooi" knop
diceButton.addEventListener('click', function () {
  if (computerTurn) {
    computerDiceOne = getRandomInt(6) + 1;
    computerDiceTwo = getRandomInt(6) + 1;

    computerDiceOneElement.innerHTML = diceArray[computerDiceOne - 1];
    computerDiceTwoElement.innerHTML = diceArray[computerDiceTwo - 1];
    messageBox.textContent = 'De computer heeft gegooid. Ga jij hoger of lager gooien';

    higherButton.disabled = false;
    lowerButton.disabled = false;
    diceButton.disabled = true;
  } else {
        // Gooien van de dobbelstenen voor de speler
        
    playerDiceOne = getRandomInt(6) + 1;
    playerDiceTwo = getRandomInt(6) + 1;
    playerDiceOneElement.innerHTML = diceArray[playerDiceOne - 1];
    playerDiceTwoElement.innerHTML = diceArray[playerDiceTwo - 1];
        // Vergelijken van de dobbelstenen resultaten en bijwerken van credits en berichten
    if ((higher && (computerDiceOne + computerDiceTwo) < (playerDiceOne + playerDiceTwo)) || (!higher && (computerDiceOne + computerDiceTwo) > (playerDiceOne + playerDiceTwo))) {
      messageBox.textContent = 'Je hebt gewonnen! Klik op "GO" om door te gaan.';
      playerCredits += 2;
      computerCredits -= 1;
    } else if ((higher && (computerDiceOne + computerDiceTwo) > (playerDiceOne + playerDiceTwo)) || (!higher && (computerDiceOne + computerDiceTwo) < (playerDiceOne + playerDiceTwo))) {
      messageBox.textContent = 'Je hebt verloren! Klik op "GO" om door te gaan.';
      playerCredits -= 2;
      computerCredits += 1;
    } else {
      messageBox.textContent = 'Het is gelijkspel. Klik op "GO" om door te gaan.';
    }
    // Credits bijwerken op de pagina
    computerCreditsElement.textContent = computerCredits;
    playerCreditsElement.textContent = playerCredits;
    // Knoppen uitschakelen en inschakelen voor de volgende ronde
    higherButton.disabled = true;
    lowerButton.disabled = true;
    diceButton.disabled = true;
    goButton.disabled = false;
    computerTurn = true;
    // Controleren op speloverwinning of -verlies
    if (computerCredits <= 0) {
      messageBox.textContent = 'De credits van de computer zijn op. Jij bent de winnaar!';
      gameOver = true;
    }
    if (playerCredits <= 0) {
      messageBox.textContent = 'Jouw credits zijn op. De computer is de winnaar!';
      gameOver = true;
    }
  }
});
// Event listener voor "Hoger" knop
higherButton.addEventListener('click', function () {
  messageBox.textContent = 'Je hebt gekozen voor hoger, probeer hoger te gooien dan de computer.';
  higherButton.disabled = true;
  lowerButton.disabled = true;
  diceButton.disabled = false;
  computerTurn = false;
  higher = true;
});
// Event listener voor "Lager" knop
lowerButton.addEventListener('click', function () {
  messageBox.textContent = 'Jehebt gekozen voor lager, probeer lager te gooien dan de computer.';
  higherButton.disabled = true;
  lowerButton.disabled = true;
  diceButton.disabled = false;
  computerTurn = false;
  higher = false;
});
// functie om willekeurig getal te genereren tussen 0 en max
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
