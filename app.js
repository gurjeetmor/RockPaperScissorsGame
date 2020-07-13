let userScore = 0;
let computerScore = 0;
const uChoice = "user".fontsize(3).sub();
const cChoice = "computer".fontsize(3).sub();
let userScoreSpan = document.getElementById("user-score");
let computerScoreSpan = document.getElementById("computer-score");
let scoreBoardDiv = document.querySelector(".score-board");
let resultDiv = document.querySelector(".result > p");
let actionDiv = document.getElementById("action");
let rockDiv = document.getElementById("rock");
let paperDiv = document.getElementById("paper");
let scissorsDiv = document.getElementById("scissors");
let userBoardDiv = document.querySelector('.user-board');
let computerBoardDiv = document.querySelector('.computer-board');

let options = document.querySelector('.options');
let computerBoard = document.querySelector('.computer-board > img');
let userSelectionName = document.createElement('p');
userSelectionName.classList.add("name", "result-label"); 
let computerSelectionName = document.createElement('p');
computerSelectionName.classList.add("name", "result-label"); 
let userSelection = document.createElement('img');
let computerSelection = document.createElement('img');
let vsTextDiv = document.querySelector(".vs-text");


function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const randomChoice = Math.floor(Math.random() * 3);
    return options[randomChoice];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function win(userChoice, computerChoice) {
    userScore++;
    userScoreSpan.innerHTML = userScore;
    computerScoreSpan.innerHTML = computerScore;

    //Update user board with chosen option image
    userSelection.src = 'img/' + userChoice + '.png';
    userSelection.classList.add("option", "win", "result-option");
    userSelectionName.innerHTML = `${capitalizeFirstLetter(userChoice)}`;
    userBoardDiv.appendChild(userSelectionName);
    userBoardDiv.replaceChild(userSelection, options);
    
    //Update computer board: first clear the board then update with computer chosen option image
    computerBoard.remove();
    computerSelection.src = 'img/' + computerChoice + '.png';   
    computerSelection.classList.add("option", "lose", "result-option");
    computerSelectionName.innerHTML = `${capitalizeFirstLetter(computerChoice)}`;
    computerBoardDiv.appendChild(computerSelection);
    computerBoardDiv.appendChild(computerSelectionName);

    //Update result 
    resultDiv.innerHTML = `${capitalizeFirstLetter(userChoice)}${uChoice} beats ${capitalizeFirstLetter(computerChoice)}${cChoice}`;

    //Update V/S text with win message
    vsTextDiv.innerHTML = "Win";

    //Add action button to reset the board
    actionDiv.innerHTML = "<button>Reset Board </button>";
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScoreSpan.innerHTML = userScore;
    computerScoreSpan.innerHTML = computerScore;

    //Update user board with chosen option image
    userSelection.src = 'img/' + userChoice + '.png';
    userSelection.classList.add("option", "lose", "result-option");
    userSelectionName.innerHTML = `${capitalizeFirstLetter(userChoice)}`;
    userBoardDiv.appendChild(userSelectionName);
    userBoardDiv.replaceChild(userSelection, options);

    //Update computer board: first clear the board then update with computer chosen option image
    computerBoard.remove();
    computerSelection.src = 'img/' + computerChoice + '.png';
    computerSelection.classList.add("option", "win", "result-option");
    computerSelectionName.innerHTML = `${capitalizeFirstLetter(computerChoice)}`;
    computerBoardDiv.appendChild(computerSelection);
    computerBoardDiv.appendChild(computerSelectionName);

    //Update result 
    resultDiv.innerHTML = `${capitalizeFirstLetter(userChoice)}${uChoice} loses ${capitalizeFirstLetter(computerChoice)}${cChoice}`;

    //Update V/S text with win message
    vsTextDiv.innerHTML = "Lose";

    //Add action button to reset the board
    actionDiv.innerHTML = "<button>Reset Board </button>";
}

function draw(userChoice, computerChoice) {
    //Update user board with chosen option image
    userSelection.src = 'img/' + userChoice + '.png';
    userSelection.classList.add("option", "draw", "result-option");
    userSelectionName.innerHTML = `${capitalizeFirstLetter(userChoice)}`;
    userBoardDiv.appendChild(userSelectionName);
    userBoardDiv.replaceChild(userSelection, options);

    //Update computer board: first clear the board then update with computer chosen option image
    computerBoard.remove();
    computerSelection.src = 'img/' + computerChoice + '.png';
    computerSelection.classList.add("option", "draw", "result-option");
    computerSelectionName.innerHTML = `${capitalizeFirstLetter(computerChoice)}`;
    computerBoardDiv.appendChild(computerSelection);
    computerBoardDiv.appendChild(computerSelectionName);

    //Update result 
    resultDiv.innerHTML = `${capitalizeFirstLetter(userChoice)}${uChoice} equals ${capitalizeFirstLetter(computerChoice)}${cChoice}`;

    //Update V/S text with win message
    vsTextDiv.innerHTML = "Draw";

    //Add action button to reset the board
    actionDiv.innerHTML = "<button>Reset Board </button>";
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rockscissors":
        case "paperrock":
        case "scissorspaper":
            win(userChoice, computerChoice);
            break;
        case "rockpaper":
        case "paperscissors":
        case "scissorsrock":
            lose(userChoice, computerChoice);
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            draw(userChoice, computerChoice);
            break;
    }
}

function resetBoard() {
    //Reset user board
    userSelection.classList.remove("win", "lose", "draw");
    userBoardDiv.replaceChild(options, userSelection);
    userBoardDiv.removeChild(userSelectionName);

    //Reset computer board
    computerSelection.classList.remove("win", "lose", "draw");
    computerSelection.remove();
    computerBoardDiv.removeChild(computerSelectionName);
    computerBoardDiv.appendChild(computerBoard);

    //Reset V/S text
    vsTextDiv.innerHTML = "VS";

    //Reset result 
    resultDiv.innerHTML = "Choose either Rock, Paper or Scissors";

    //Reset action button
    actionDiv.innerHTML = "<div></div>";
    
}

function main() {
    rockDiv.addEventListener('click', () => game("rock"))

    paperDiv.addEventListener('click', () => game("paper"))

    scissorsDiv.addEventListener('click', () => game("scissors"))

    actionDiv.addEventListener('click', () => resetBoard())
}

main();