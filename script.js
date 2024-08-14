const btns = document.querySelectorAll(".choice-button");
const closeBtn = document.querySelector("#close-btn");
const rulesBtn = document.querySelector("#rules-btn");
const playBtn = document.querySelector("#play-btn");


const choiceScreen = document.querySelector(".choice-screen");
const resultScreen = document.querySelector(".result-screen");
const mainScreen = document.querySelector("main");
const rulesModal = document.querySelector(".rules-modal");
const endScreen = document.querySelector(".end-screen");

const humanImg = document.querySelector(".human-choice-image");
const computerImg = document.querySelector(".computer-choice-image");
const resultText = document.querySelector(".result-text");
const winnerText = document.querySelector(".winner");

const highlightEffect = document.querySelector(".highlight-zone");


const hScore = document.querySelector("#player-score");
const cScore = document.querySelector("#computer-score");

resultScreen.remove();
rulesModal.remove();
endScreen.remove();

rulesBtn.addEventListener("click", (e) => {
    document.body.appendChild(rulesModal);
});

closeBtn.addEventListener("click", (e) => {
    rulesModal.remove();
});

playBtn.addEventListener("click", (e) => {
    resultScreen.remove();
    mainScreen.appendChild(choiceScreen);
});


let humanScore = 0;
let computerScore = 0;
hScore.innerText = humanScore;
cScore.innerText = computerScore;

const choices = ["paper", "rock", "scissors"];
const capitalize = s => (s[0].toUpperCase() + s.slice(1));

function getComputerChoice() {
    let choice = Math.floor(Math.random()*3);
    return choices[choice];
}

function showChoice(imgElement, choice) {
    imgElement.parentElement.classList.remove("choice-" + imgElement.getAttribute("alt"));
    imgElement.setAttribute("src", "./images/icon-" + choices[choice] + ".svg");
    imgElement.setAttribute("alt", choices[choice]);
    imgElement.parentElement.classList.add("choice-" + imgElement.getAttribute("alt"));
}



function endGame(isHumanWin) {
    resultScreen.remove();
    mainScreen.appendChild(endScreen);
    winnerText.innerText = isHumanWin ? "You won" : "You lost";
}

function handleWin() {
    resultText.innerText = "You win";
    humanScore++;
    hScore.innerText = humanScore;
    if (humanScore == 5) {
        endGame(true);
    }
}

function handleTie() {
    resultText.innerText = "Tie";
}

function handleLoss() {
    resultText.innerText = "You lose";
    computerScore++;
    cScore.innerText = computerScore;
    if (computerScore == 5) {
        endGame(false);
    }
}



// Algorithm for RPS, it's a cycle, so if it's the
// precending element, one eats the other, if it's
// equal, it's a tie.
function playRound(humanChoice, computerChoice) {
    let computerChoiceIndex = choices.indexOf(computerChoice);
    let humanChoiceIndex = choices.indexOf(humanChoice);
    showChoice(humanImg, humanChoiceIndex);
    showChoice(computerImg, computerChoiceIndex);
    if ((humanChoiceIndex + 1) % 3 == computerChoiceIndex) {
        handleWin();
    } else if (humanChoiceIndex == computerChoiceIndex) {
        handleTie();
    } else {
        handleLoss();
    }
}

btns.forEach((button) => button.addEventListener("click", (e) => {
    let humanChoice;
    switch (button.getAttribute("id")) {
        case "rock-btn":
            humanChoice = 1;
            break;
        case "paper-btn":
            humanChoice = 0;
            break;
        case "scissors-btn":
            humanChoice = 2;
            break;
        default:
            humanChoice = 3;
    };
    console.log(humanChoice);
    choiceScreen.remove();
    mainScreen.appendChild(resultScreen);
    playRound(choices[humanChoice], getComputerChoice());
}));