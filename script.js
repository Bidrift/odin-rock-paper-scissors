const choices = ["paper", "rock", "scissors"];
const capitalize = s => (s[0].toUpperCase() + s.slice(1));

function getComputerChoice() {
    let choice = Math.floor(Math.random()*3);
    return choices[choice];
}

function getHumainChoice() {
    let choice
    while (true) {
        choice = prompt(`Enter your choice:\n1 - ${choices[0]}\n2 - ${choices[1]}\n3 - ${choices[2]}\nEx: rock`);   
        if (choices.indexOf(choice.toLowerCase()) != -1) {
            break;
        }
    }
    return choice.toLowerCase();
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        let computerChoiceIndex = choices.indexOf(computerChoice);
        let humanChoiceIndex = choices.indexOf(humanChoice);
        if ((humanChoiceIndex + 1) % 3 == computerChoiceIndex) {
            console.log(`You win! ${capitalize(humanChoice)} beats ${computerChoice}.`);
            humanScore++;
        } else if (humanChoiceIndex == computerChoiceIndex) {
            console.log(`It's a tie, you both chose ${humanChoice}.`);
        } else {
            console.log(`You lose! ${capitalize(computerChoice)} beats ${humanChoice}.`);
            computerScore++;
        }
    }

    console.log(`Results: Player ${humanScore} - ${computerScore} Computer`)
}
//playGame();