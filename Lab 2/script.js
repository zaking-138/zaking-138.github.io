let correctNumber;

let guessInput = document.querySelector(".guessInput");
let guessButton = document.querySelector(".guessButton");
let outputMessage = document.querySelector(".output");
let pastGuesses = document.querySelector(".pastGuesses");
let numberGuesses = 0;
let numberWins = 0;

function initializeGame (){
    correctNumber = Math.floor(Math.random() *99) + 1;
    console.log("Random Number: " + correctNumber);
    
    document.querySelector(".playButton").style.display = "none";
    guessInput.focus();
}

function appendGuess(userGuess){
    numberGuesses++;
    pastGuesses.textContent += userGuess.value + " ";
}

guessButton.addEventListener("click", function () {

    if (+guessInput.value == correctNumber) {
        appendGuess(guessInput);
        // guessInput.style.backgroundColor = "lightgreen";
        outputMessage.style.color = "green"
        if (numberGuesses < 7){
            outputMessage.textContent = "Correct! You Won in under 7 guesses!"
        }else{
            outputMessage.textContent = "Correct! You Win!"
        }
        
        // window.location.reload();
        //"You guessed " + guessInput.value;
    }else if (+guessInput.value < correctNumber) {
        appendGuess(guessInput);
        outputMessage.style.color = "blue"
        outputMessage.textContent = "Guess was too low!"
    }
    else if (+guessInput.value > correctNumber){
        appendGuess(guessInput);
        outputMessage.style.color = "red"
        outputMessage.textContent = "Guess was too high!"
    }else {
        outputMessage.style.color = "orange"
        outputMessage.textContent = "Error: Invalid Input"
    }
});




// function turnGreen(){
//     guessInput.style.backgroundColor = "lightgreen";
// }
