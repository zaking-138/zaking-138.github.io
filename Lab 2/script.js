let correctNumber = Math.floor(Math.random() *99) + 1;

let guessInput = document.querySelector(".guessInput");
let guessButton = document.querySelector(".guessButton");
let outputMessage = document.querySelector(".output");
let pastGuesses = document.querySelector(".pastGuesses");
let numberGuesses = 0;
let numberWins = 0;

guessButton.addEventListener("click", function () {
    numberGuesses+=1

    if (+guessInput.value == correctNumber) {
        pastGuesses.textContent += guessInput.value + " ";
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
        pastGuesses.textContent += guessInput.value + " ";
        outputMessage.style.color = "blue"
        outputMessage.textContent = "Guess was too low!"
    }
    else if (+guessInput.value > correctNumber){
        pastGuesses.textContent += guessInput.value + " ";
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
