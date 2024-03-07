"use strict";

window.addEventListener("load", start);

function start() {
  console.log("Game started");
  makeBoardClickable();
  displayBoard();
}

let currentPlayer = 1; // You are Player 1, and you start the game

let model = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

function displayBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      cell.textContent = model[row][col] === 1 ? 'X' : model[row][col] === 2 ? 'O' : '';
    }
  }
}

function writeToCell(row, col, player) {
  model[row][col] = player;
}

function player2() {
  let bestScore = -Infinity;
  let move;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      // If cell is empty
      if (model[row][col] === 0) {
        model[row][col] = 2; // Try move
        let score = minimax(model, 0, false);
        model[row][col] = 0; // Undo move
        if (score > bestScore) {
          bestScore = score;
          move = {row, col};
        }
      }
    }
  }
  if (move) {
    writeToCell(move.row, move.col, 2);
  }
}


function selectCell(row, col) {
  // Prevent selecting a cell that's already taken
  if (model[row][col] !== 0) {
    console.log("Cell is already taken.");
    return;
  }

  // Player 1 makes a move
  writeToCell(row, col, currentPlayer);
  displayBoard();

  // Check if the game has been won or drawn
  let winner = checkWinner();
  if (winner !== 0) {
    alert(`Player ${winner} wins!`);
    return; // Game is over, disable further actions or reset the game here
  } else if (isBoardFull()) {
    alert("It's a draw!");
    return; // Game is over, disable further actions or reset the game here
  }

  // After Player 1's move, it's the computer's turn
  if (currentPlayer === 1) {
    player2(); // Computer makes its move as Player 2
    displayBoard();

    // Check again if the game has been won or drawn after the computer's move
    winner = checkWinner();
    if (winner !== 0) {
      alert(`Player ${winner} wins!`);
      return; // Game is over, disable further actions or reset the game here
    } else if (isBoardFull()) {
      alert("It's a draw!");
      return; // Game is over, disable further actions or reset the game here
    }
  }
}

function makeBoardClickable() {
  document.querySelector("#board").addEventListener("click", boardClicked);
}

function boardClicked(event) {
  const cell = event.target;
  if (!cell.dataset.row) return; // Ignore clicks that are not on cells

  const row = parseInt(cell.dataset.row, 10);
  const col = parseInt(cell.dataset.col, 10);
  selectCell(row, col);
}

function isBoardFull() {
  return model.every(row => row.every(cell => cell !== 0));
}

function minimax(board, depth, isMaximizing) {
  let score = checkWinner();

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (isBoardFull()) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === 0) {
          board[row][col] = 2; // AI makes a move
          bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
          board[row][col] = 0; // Undo the move
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === 0) {
          board[row][col] = 1; // Player makes a move
          bestScore = Math.min(bestScore, minimax(board, depth + 1, true));
          board[row][col] = 0; // Undo the move
        }
      }
    }
    return bestScore;
  }
}



function checkWinner() {
  for (let i = 0; i < 3; i++) {
      if (model[i][0] === model[i][1] && model[i][1] === model[i][2]) {
          if (model[i][0] === 2) return +10; // AI wins
          else if (model[i][0] === 1) return -10; // Player wins
      }
      if (model[0][i] === model[1][i] && model[1][i] === model[2][i]) {
          if (model[0][i] === 2) return +10; // AI wins
          else if (model[0][i] === 1) return -10; // Player wins
      }
  }
  if (model[0][0] === model[1][1] && model[1][1] === model[2][2]) {
      if (model[0][0] === 2) return +10;
      else if (model[0][0] === 1) return -10;
  }
  if (model[0][2] === model[1][1] && model[1][1] === model[2][0]) {
      if (model[0][2] === 2) return +10;
      else if (model[0][2] === 1) return -10;
  }
  return 0; // No winner
}

  
  
