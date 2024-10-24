const boxes = document.querySelectorAll(".box");
const msgContainer = document.querySelector(".msg-container");
const winnerText = document.querySelector(".winner-text");
const newGameBtn = document.querySelector(".new-btn");
const player1Score = document.getElementById("pl1");
const player2Score = document.getElementById("pl2");
const aiToggle = document.getElementById("ai-toggle");
const player1Icon = document.querySelector(".player1-emoji i");
const player2Icon = document.querySelector(".player2-emoji i");

let currentPlayer = "X";
let gameActive = true;
let aiEnabled = false;
let board = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

aiToggle.addEventListener("change", () => {
  aiEnabled = aiToggle.checked;
  if (aiEnabled) {
    player2Icon.className = "fa-solid fa-robot fa-2xl";
  } else {
    player2Icon.className = "fa-solid fa-face-smile-wink fa-2xl";
  }
  resetGame();
});

function checkWinner() {
  let winner = null;

  winningCombinations.forEach((combination) => {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      boxes[a].classList.add(
        "winner",
        winner === "X" ? "winner-animation-x" : "winner-animation-o"
      );
      boxes[b].classList.add(
        "winner",
        winner === "X" ? "winner-animation-x" : "winner-animation-o"
      );
      boxes[c].classList.add(
        "winner",
        winner === "X" ? "winner-animation-x" : "winner-animation-o"
      );
    }
  });

  if (winner) {
    msgContainer.classList.remove("hide");
    winnerText.textContent = `${winner === "X" ? "Player" : "AI"} Wins!`;
    if (winner === "X") {
      player1Score.textContent = parseInt(player1Score.textContent) + 1;
    } else {
      player2Score.textContent = parseInt(player2Score.textContent) + 1;
      player2Icon.classList.add("clever-emoji");
    }
    gameActive = false;
  } else if (!board.includes("")) {
    msgContainer.classList.remove("hide");
    winnerText.textContent = "It's a Draw!";
    gameActive = false;
  }
}

function handleBoxClick(e) {
  const boxIndex = Array.from(boxes).indexOf(e.target);
  if (board[boxIndex] !== "" || !gameActive) {
    return;
  }
  board[boxIndex] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (aiEnabled && currentPlayer === "O" && gameActive) {
    aiMove();
  }
}

function aiMove() {
  const bestMove = getBestMove();
  board[bestMove] = "O";
  boxes[bestMove].textContent = "O";
  checkWinner();
  currentPlayer = "X";
}

function getBestMove() {
  let bestScore = -Infinity;
  let move = null;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, depth, isMaximizing) {
  let scores = {
    O: 1,
    X: -1,
    tie: 0,
  };

  let result = checkWinnerForMinimax();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinnerForMinimax() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (!board.includes("")) {
    return "tie";
  }
  return null;
}

function resetGame() {
  board.fill("");
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("winner", "winner-animation-x", "winner-animation-o");
  });
  currentPlayer = "X";
  gameActive = true;
  msgContainer.classList.add("hide");
  player2Icon.classList.remove("clever-emoji");
}

boxes.forEach((box) => box.addEventListener("click", handleBoxClick));

newGameBtn.addEventListener("click", resetGame);
