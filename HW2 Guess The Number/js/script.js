document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
document.querySelector("#wins").style.display = "none";
document.querySelector("#losses").style.display = "none";

let randomNumber;
const totalAttempts = 7;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);

   attempts = 0;

   //hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#attemptsLeft").textContent = "";
    
    document.querySelector("#guessBtn").style.display = "inline";
    document.querySelector("#attemptsLeft").textContent = "Attempts Left: " + (7 - attempts);

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = "";

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    document.querySelector("#guesses").textContent = "";

}

function checkGuess(){
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player Guess: " + guess);

    if (guess < 1 || guess > 99){
        
        feedback.textContent = "Enter a number between 1 & 99!";
        feedback.style.backgroundColor = "rgba(255, 0, 0, 0.888)";
        return;
    }
    attempts++
    updateAttempts();
    console.log("Attempts: " + attempts);
    feedback.style. backgroundColor = "rgba(255, 98, 0, 0.888)";
    if (guess == randomNumber) {
        feedback.textContent = "You got it! Congrats!";
        feedback.style.backgroundColor = "rgba(0, 138, 11, 0.888)";
        // feedback.style.fontsize = "1em"
        gameOver(true);
    }else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == totalAttempts){
            feedback.textContent = "You lose. :( The number was " + randomNumber + ".";
            feedback.style.backgroundColor = "rgba(255, 0, 0, 0.888)"
            // feedback.style.fontsize = "1em"
            gameOver(false);
        }else if (guess > randomNumber){
            feedback.textContent = "Guess was too high!";
            // feedback.style.fontsize = "medium"
        }else{
            feedback.textContent = "Guess was too low!"
            // feedback.style.fontsize = "medium"
        }
    }
}

function gameOver(didWin){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    let prevWins = document.querySelector("#wins");
    let prevLosses = document.querySelector("#losses");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";

    if(didWin){
        wins++;
        prevWins.style.display = "inline";
        prevWins.textContent = "Wins: " + wins;
    }else{
        losses++;
        prevLosses.style.display = "inline";
        prevLosses.textContent = "Losses: " + losses;
    }
}

function updateAttempts(){
    let attemptsLeft = document.querySelector("#attemptsLeft");
    attemptsLeft.textContent = "Attempts Left: " + (totalAttempts - attempts);
}