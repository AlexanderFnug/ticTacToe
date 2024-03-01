"use strict";

window.addEventListener("load", start);

// ******* CONTROLLER ***********

function start() {
  console.log("JS kørrrreee");
  makeBoardClickable();
  displayBoard()
}

let counter =0;
function selectCell(row, col) {
counter ++

  writeToCell(row, col, (counter%2+1));
  displayBoard()

  const winner = checkWinner();
  if (winner !== 0) {
    alert(`Player ${winner} wins!`);
    // Optionally, you could also stop the game or display a message to the players here.
  }
}

function makeBoardClickable() {
  document.querySelector("#board").addEventListener("click", boardClicked);
}

function boardClicked(event) {
  console.log("board clicked");
  const cell = event.target;
  const row = cell.dataset.row;
  const col = cell.dataset.col;
  console.log(`Clicked on row: ${row} col: ${col}`);
  selectCell(row, col);
 
}

// ********** MODEL ***********

const model = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function displayBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const value = readFromCell(row, col);
      const cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );

     
      switch(value) {
        case 0: cell.textContent = " "; break;
        case 1: cell.textContent = "X"; break;
        case 2: cell.textContent = "O"; break;
      }
    }
  }
}

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

function checkWinner() {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (model[i][0] === model[i][1] && model[i][1] === model[i][2] && model[i][0] !== 0) {
        return model[i][0];
      }
      if (model[0][i] === model[1][i] && model[1][i] === model[2][i] && model[0][i] !== 0) {
        return model[0][i];
      }
    }
  
    // Check diagonals
    if (model[0][0] === model[1][1] && model[1][1] === model[2][2] && model[0][0] !== 0) {
      return model[0][0];
    }
    if (model[0][2] === model[1][1] && model[1][1] === model[2][0] && model[0][2] !== 0) {
      return model[0][2];
    }
  
    // No winner yet
    return 0;
  }
  
  
