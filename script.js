const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const xWinsText = document.getElementById('xWins');
const oWinsText = document.getElementById('oWins');

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;
let xWins = 0;
let oWins = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Vez do "${currentPlayer}"`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');

    if (options[cellIndex] !== '' || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    statusText.textContent = `Vez do "${currentPlayer}"`;
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            winningCells = condition;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `"${currentPlayer}" ganhou!!`;
        highlightWinningCells(winningCells);
        updateWins();
        running = false;
    } else if (!options.includes('')) {
        statusText.textContent = 'Empate!';
        running = false;
    } else {
        changePlayer();
    }
}

function highlightWinningCells(cells) {
    cells.forEach(index => {
        document.querySelector(`.cell[data-index='${index}']`).classList.add('winning-cell');
    });
}

function updateWins() {
    if (currentPlayer === 'X') {
        xWins++;
        xWinsText.textContent = `Vitórias de X: ${xWins}`;
    } else {
        oWins++;
        oWinsText.textContent = `Vitórias de O: ${oWins}`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `Vez do "${currentPlayer}"`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    running = true;
}