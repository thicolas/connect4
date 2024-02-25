const ROWS = 6;
const COLS = 7;
let currentPlayer = 1; // Player 1: Red, Player 2: Yellow
let board = [];
let p1 = prompt("Who's Player 1?");
let p2 = prompt("Who's Player 2?");

// Game Board
function createBoard() {
  const boardElement = document.getElementById('board');
  for (let row = 0; row < ROWS; row++) {
    board[row] = Array(COLS).fill(0);
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    for (let col = 0; col < COLS; col++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.setAttribute('data-row', row);
      cellElement.setAttribute('data-col', col);
      cellElement.addEventListener('click', () => dropPiece(col));
      rowElement.appendChild(cellElement);
    }
    boardElement.appendChild(rowElement);
  }
}


// Drop a piece into the column
function dropPiece(col) {
  let emptyRow = -1;
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === 0) {
      emptyRow = row;
      break;
    }
  }

  if (emptyRow === -1) {
    return;
  }

  board[emptyRow][col] = currentPlayer;
  renderBoard();

  // Animate dropping of the piece
  const cellElement = document.querySelector(`.cell[data-row="${emptyRow}"][data-col="${col}"]`);
  const pieceElement = document.createElement('div');
  pieceElement.classList.add('piece');
  pieceElement.style.backgroundColor = currentPlayer === 1 ? 'red' : 'yellow';
  cellElement.appendChild(pieceElement);

   // Append the piece to the board, but hidden initially
   cellElement.appendChild(pieceElement);


   // Trigger animation after a short delay to allow the piece to be appended
   setTimeout(() => {
     pieceElement.style.transform = 'translateY(0)';
     pieceElement.style.opacity = '1';
   }, 30);
  
  // Check for win
  
  if (checkWin(emptyRow, col)) {
    setTimeout(() => {
      if(currentPlayer == 1){
        alert(p1+` wins!`);
      }
      else if(currentPlayer == 2){
        alert(p2+` wins!`);
      }
      resetGame();
    }, 1000); // Delay the win alert for 1 second to allow the piece to fall
  } else {
    // Switch to the next player's turn
    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }
}


function renderBoard() {
  setTimeout(() => { // Delay the rendering by 3 seconds
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      const row = parseInt(cell.getAttribute('data-row'));
      const col = parseInt(cell.getAttribute('data-col'));
      if (board[row][col] === 0) {
        cell.style.backgroundColor = 'white';
      } else if (board[row][col] === 1) {
        cell.style.backgroundColor = 'red';
      } else {
        cell.style.backgroundColor = 'yellow';
      }
    });
  }, 3000); // 3000 milliseconds = 3 seconds
}

let x = 0;
let y = 0;
function checkWin(row, col) {
  const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
  for (const [dx, dy] of directions) {
    let count = 1;
    for (const sign of [-1, 1]) {
      let r = row + sign * dx;
      let c = col + sign * dy;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += sign * dx;
        c += sign * dy;
      }
    }
    if (count >= 4) {
      // Update scores
      if (currentPlayer === 1) {
        x++;
        document.getElementById("score").innerHTML =p1+" wins: " + x + "    " + p2+" wins: " + y;
      } else if (currentPlayer === 2) {
        y++;
        document.getElementById("score").innerHTML =p1+" wins: " + x + "    " + p2+" wins: " + y;
      }
      return true;
    }
  }
  return false;
}

function resetGame() {
  board = [];
  currentPlayer = 1;
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';
  createBoard();
}


createBoard();
