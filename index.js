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

function solveSudokuHelper(board) {
    const gridSize = 9;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;

                        if (solveSudokuHelper(board)) {
                            return [...board];
                        }

                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }

    return [...board];
}

function isValidSudoku(board) {
    const gridSize = 9;

    for (let i = 0; i < gridSize; i++) {
        const rowSet = new Set();
        const colSet = new Set();

        for (let j = 0; j < gridSize; j++) {
            const rowValue = board[i][j];
            const colValue = board[j][i];

            if(rowValue == '') continue;
            if(colValue == '') continue;

            if (rowSet.has(rowValue)) {
                return false;
            }
            rowSet.add(rowValue);

            if (colSet.has(colValue)) {
                return false;
            }
            colSet.add(colValue);
        }
    }

    for (let startRow = 0; startRow < gridSize; startRow += 3) {
        for (let startCol = 0; startCol < gridSize; startCol += 3) {
            const subgridSet = new Set();

            for (let i = startRow; i < startRow + 3; i++) {
                for (let j = startCol; j < startCol + 3; j++) {
                    const subgridValue = board[i][j];
                    if(subgridValue == '') continue;

                    if (subgridSet.has(subgridValue)) {
                        return false;
                    }
                    subgridSet.add(subgridValue);
                }
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

    if (isValidSudoku(board) && solveSudokuHelper(board)) {
        setBoardState(board.flat());
    } else {
        alert('No solution exists.');
    }
}

function clear() {
    location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    createSudokuBoard();
});
