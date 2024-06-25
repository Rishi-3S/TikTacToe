document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = Array.from(document.getElementsByClassName('cell'));
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    const startGameButton = document.getElementById('startGame');
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');
    const modePvPButton = document.getElementById('modePvP');
    const modePvAIButton = document.getElementById('modePvAI');
    const playerNamesDiv = document.getElementById('playerNames');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;
    let isAI = false;
    let player1Name = '';
    let player2Name = '';

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

    modePvPButton.addEventListener('click', () => {
        playerNamesDiv.style.display = 'block';
        player2NameInput.style.display = 'inline-block';
    });

    modePvAIButton.addEventListener('click', () => {
        playerNamesDiv.style.display = 'block';
        player2NameInput.style.display = 'none';
        isAI = true;
    });

    startGameButton.addEventListener('click', () => {
        player1Name = player1NameInput.value || 'Player 1';
        player2Name = isAI ? 'AI' : (player2NameInput.value || 'Player 2');

        if (player1Name && (isAI || player2Name)) {
            gameActive = true;
            restartGame();
            board.style.display = 'grid';
            restartButton.style.display = 'inline-block';
        } else {
            alert('Please enter player names');
        }
    });

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    function handleCellClick(event) {
        const cell = event.target;
        const index = cells.indexOf(cell);

        if (boardState[index] !== '' || !gameActive) {
            return;
        }

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            message.textContent = `It's a draw!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (isAI && currentPlayer === 'O') {
                makeAIMove();
            } else {
                message.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}'s turn`;
            }
        }
    }

    function makeAIMove() {
        let availableCells = boardState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
        let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        boardState[randomCell] = 'O';
        cells[randomCell].textContent = 'O';

        if (checkWin()) {
            message.textContent = `AI wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            message.textContent = `It's a draw!`;
            gameActive = false;
        } else {
            currentPlayer = 'X';
            message.textContent = `${player1Name}'s turn`;
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return boardState.every(cell => cell !== '');
    }

    function restartGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        cells.forEach(cell => (cell.textContent = ''));
        message.textContent = `${player1Name}'s turn`;
    }
});
