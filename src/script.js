let currentPlayer;
let moves;
let gameOver;
let firstPlayer;
let secondPlayer;
let playerTurn = document.getElementById("player-turn");

function startGame() {
    firstPlayer = document.getElementById("first-player").value;
    secondPlayer = document.getElementById("second-player").value;
    let alertMessageFirst = document.getElementById("alert-message-first");
    let alertMessageSecond = document.getElementById("alert-message-second");
    let boardContainer = document.querySelector(".board-container");
    let newGameButton = document.getElementById("new-game-button");
    let gameResult = document.getElementById("game-result");
    let startButton = document.getElementById("btn-start");
    startButton.classList.add("d-none");

    if (!firstPlayer || !secondPlayer) {
        alertMessageFirst.classList.remove("d-none");
        return;
    } else if (firstPlayer === secondPlayer) {
        alertMessageSecond.classList.remove("d-none");
        return;
    } else {
        alertMessageFirst.classList.add("d-none");
        alertMessageSecond.classList.add("d-none");

    }

    currentPlayer = "X";
    moves = 0;
    gameOver = false;

    gameResult.classList.add("d-none");
    newGameButton.classList.add("d-none");

    let cells = document.querySelectorAll(".button");
    cells.forEach(cell => cell.textContent = "");

    playerTurn.textContent = `${firstPlayer}'s Turn`;
    document.querySelector(".game-container").appendChild(playerTurn);
    playerTurn.classList.remove("d-none");

    boardContainer.classList.remove("d-none");
    cells.forEach(cell => cell.addEventListener("click", handleMove));
}

const TOTAL_CELLS = 9;

function handleMove(event) {
    if (gameOver) {
        return;
    }

    let cell = event.target;
    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        ++moves;
        if (checkWinner()) {
            showResult(`${currentPlayer === "X" ? firstPlayer : secondPlayer} Wins!`);
        } else if (moves === TOTAL_CELLS) {
            showResult("It's a Tie!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerTurn.textContent = `${currentPlayer === "X" ? firstPlayer : secondPlayer}'s Turn`;
        }
    }
}

function checkWinner() {
    let cells = document.querySelectorAll(".button");
    let winLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal lines
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical lines
        [0, 4, 8], [2, 4, 6] // diagonal lines
    ];
    for (let line of winLines) {
        let [a, b, c] = line;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return true;
        }
    }
    return false;
}

function showResult(message) {
    let gameResult = document.getElementById("game-result");
    gameResult.textContent = message;
    gameResult.classList.remove("d-none");
    let newGameButton = document.getElementById("new-game-button");
    playerTurn.classList.add("d-none");
    newGameButton.classList.remove("d-none");
}