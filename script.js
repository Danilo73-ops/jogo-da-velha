let currentPlayer = "X"; // Jogador atual
let board = ["", "", "", "", "", "", "", "", ""]; // Tabuleiro inicial vazio
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
  [0, 4, 8], [2, 4, 6]             // Diagonais
];

const cells = document.querySelectorAll(".cell");
const messageElement = document.querySelector(".message");

// Adicionar evento de clique para cada célula
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

// Função chamada quando o jogador clica em uma célula
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (board[index] === "") {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
      messageElement.textContent = `Jogador ${currentPlayer} venceu!`;
      endGame();
    } else if (board.every(cell => cell !== "")) {
      messageElement.textContent = "Empate!";
      endGame();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alterna jogador
      messageElement.textContent = `Vez do jogador ${currentPlayer}`;
    }
  }
}

// Verificar se há um vencedor
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// Finalizar o jogo
function endGame() {
  cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
}

// Reiniciar o jogo
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.addEventListener("click", handleCellClick);
  });
  messageElement.textContent = "Vez do jogador X";
}
