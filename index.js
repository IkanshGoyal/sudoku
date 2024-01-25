function createSudokuBoard() {
    const boardContainer = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.dataset.row = i;
            input.dataset.col = j;
            boardContainer.appendChild(input);
        }
        boardContainer.appendChild(document.createElement('br'));
    }
}

function getBoardState() {
    const boardState = [];
    const inputs = document.querySelectorAll('#board input');
    inputs.forEach(input => {
        const value = input.value.trim() || '0';
        boardState.push(parseInt(value));
    });
    return boardState;
}

function setBoardState(boardState) {
    const inputs = document.querySelectorAll('#board input');
    inputs.forEach((input, index) => {
        const value = boardState[index] === 0 ? '' : boardState[index];
        input.value = value;
    });
}

function isSafe(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function solveSudokuUtil(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;

                        if (solveSudokuUtil(board)) {
                            return true;
                        }

                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solve() {
    const boardState = getBoardState();
    const board = [];
    
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(boardState[i * 9 + j]);
        }
        board.push(row);
    }

    if (solveSudokuUtil(board)) {
        setBoardState(board.flat());
    } else {
        console.log('No solution exists.');
    }
}

function clear() {
    location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    createSudokuBoard();
});