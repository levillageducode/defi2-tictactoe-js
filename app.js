const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const announce = document.querySelector(".announce");

let currentPlayer = "x";

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin() {
  // Some: On va exécuter une fonction sur chaque élément de mon tableau de combinaisons
  // jusqu'à rencontrer un combo gagnant et là ça retourne true
  // sinon il va jusqu'à la fin, et il retourne false si le
  // dernier n'est pas bon
  return winCombos.some((combo) => {
    // Every, ça va exécuter une fonction sur chaque élément de ma combinaison
    // actuelle et va venir vérifier que la cellule correspondant à chaque index
    // de ma combinaison ait à le même signe que notre joueur
    return combo.every((index) => cells[index].textContent === currentPlayer);
  });
}

function checkDraw() {
  return [...cells].every((cell) => cell.textContent !== "");
}

function switchPlayer() {
  if (currentPlayer === "x") {
    currentPlayer = "o";
  } else if (currentPlayer === "o") {
    currentPlayer = "x";
  }
}

function handleClick(event) {
  const cell = event.target;

  if (!cell.classList.contains("cell") || cell.textContent !== "") return;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    announce.textContent = currentPlayer + " a gagné!";
    board.removeEventListener("click", handleClick);
  } else if (checkDraw()) {
    announce.textContent = "Match nul.";
    board.removeEventListener("click", handleClick);
  } else {
    switchPlayer();
  }
}
board.addEventListener("click", handleClick);
