const playerMove = (mark) => {
  return {
    mark: mark,
    placeMark() {
      return `${this.mark}`;
    }
  }
};

let player1 = playerMove("X");
let player2 = playerMove("O");
let currentPlayer = player1;
let winner = false;
let draw = false;
let container = document.querySelector("#container");
let p = document.querySelector("p");
let resetScreen = document.querySelector("#resetScreen");

const cells = document.querySelectorAll('[data-cell]');
let display = document.getElementById("display");
display.textContent = `It's ${currentPlayer.placeMark()}'s turn`;
for (const cell of cells) {
  if (winner || draw) break;
  cell.addEventListener('click', function(event) {
    if (winner || draw) return;
    if (cell.textContent == '') {
      cell.textContent += currentPlayer.placeMark();
      checkWin();
      checkDraw();
      resetGame();
      switchTurns();
    }
  });
}

function switchTurns() {
  if (winner || draw) return;
  if (currentPlayer == player1) {
    currentPlayer = player2;
    display.textContent = `It's ${currentPlayer.placeMark()}'s turn`;
  } else {
    currentPlayer = player1;
    display.textContent = `It's ${currentPlayer.placeMark()}'s turn`;
  }
}

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
  for (let i = 0; i <= 7; i++) {
    let a = winCombos[i];
    
    if (cells[a[0]].textContent == "" || cells[a[1]].textContent == "" || cells[a[2]].textContent == "") {
      continue;
    } else if (cells[a[0]].textContent == "X" && cells[a[1]].textContent == "X" && cells[a[2]].textContent == "X") {
      winner = true;
      p.textContent += "X wins!";
    } else if (cells[a[0]].textContent == "O" && cells[a[1]].textContent == "O" && cells[a[2]].textContent == "O") {
      winner = true;
      p.textContent += "O wins!";
    } else {
      continue;
    }
  }
}

function checkDraw() {

  if (winner) return;

  if (cells[0].textContent != "" && cells[1].textContent != "" && cells[2].textContent != "" && cells[3].textContent != "" && cells[4].textContent != "" && cells[5].textContent != "" && cells[6].textContent != "" && cells[7].textContent != "" && cells[8].textContent != "") {
    draw = true;
    p.textContent += "It's a draw.";
  }

}

function resetGame() {
  
  if (!winner && !draw) return;

  container.classList.add('hide');
  resetScreen.classList.remove('hide');

  let resetBtn = document.querySelector("#resetBtn");

  resetBtn.addEventListener('click', function(event) {
    for (const cell of cells) {
      cell.textContent = "";
    }
    currentPlayer = player1;
    display.textContent = `It's ${currentPlayer.placeMark()}'s turn`;
    winner = false;
    draw = false;
    resetScreen.classList.add('hide');
    p.textContent = "";
    container.classList.remove('hide');
  });

}