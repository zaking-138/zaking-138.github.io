console.log("It Worked!")

let score = 0;

let scorePlaceholder = document.querySelector("#score-placeholder");
let submitButton = document.querySelector("#submit");
let a1Message = document.querySelector("#a1-result");
let a2Message = document.querySelector("#a2-result")
let a3Message = document.querySelector("#a3-result")
let a4Message = document.querySelector("#a4-result");
let a5Message = document.querySelector("#a5-result");
let banner = document.querySelector("#banner");


let correctImage = "img/right.png"
let incorrectImage = "img/wrong.png"

let images = document.querySelectorAll(".image")
for(let image of images){
    image.style.display = "none";
}

banner.style.display = "none";

submitButton.addEventListener("click", function () {
    countSubmits();
    score = 0;
    let answer1 = document.querySelector("#a1").value;
    if (answer1 === "#") {
        a1Message.textContent = "Nice Job!";
        a1Message.style.color = "green";
        document.querySelector("#a1-image").src = correctImage;
        score += 20;
    } else {
        a1Message.textContent = "Wrong!";
        a1Message.style.color = "red";
        document.querySelector("#a1-image").src = incorrectImage;
    }

    let answer2 = document.querySelector("#a2").value;
    if (answer2 === "8") {
        a2Message.textContent = "Nice Job!";
        a2Message.style.color = "green";
        document.querySelector("#a2-image").src = correctImage;
        score += 20;
    } else {
        a2Message.textContent = "Wrong!";
        a2Message.style.color = "red";
        document.querySelector("#a2-image").src = incorrectImage;
    }

    let answer3 = document.querySelector("input[name=q3-answers]:checked").value;
    if (answer3 === "C++") {
        a3Message.textContent = "Nice Job!"
        a3Message.style.color = "green";
        document.querySelector("#a3-image").src = correctImage;
        score += 20;
    } else {
        a3Message.textContent = "Wrong!";
        a3Message.style.color = "red";
        document.querySelector("#a3-image").src = incorrectImage;
    }

    let answer5 = document.querySelector("input[name=q5-answers]:checked").value;
    if (answer5 === "const" || answer5 === "let") {
        a5Message.textContent = "Nice Job!"
        a5Message.style.color = "green";
        document.querySelector("#a5-image").src = correctImage;
        score += 20;
    } else {
        a5Message.textContent = "Wrong!";
        a5Message.style.color = "red";
        document.querySelector("#a5-image").src = incorrectImage;
    }

    let answer4 = document.querySelector("#q4").value;
    if (answer4 === "awful") {
        a4Message.textContent = "Nice Job!"
        a4Message.style.color = "green";
        document.querySelector("#a4-image").src = correctImage;
        score += 20;
    } else {
        a4Message.textContent = "Wrong!";
        a4Message.style.color = "red";
         document.querySelector("#a4-image").src = incorrectImage;
    }

    scorePlaceholder.textContent = "Score: " + score + "/100";

    if (score > 80) {
        banner.style.display = "block";
    }
});

function countSubmits() {
    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
        localStorage.clickcount = 1;
    }
    document.querySelector("#attempts-number").innerHTML = localStorage.clickcount;
}