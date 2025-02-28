let gridSize = 4; // Taille de la grille par défaut (Facile)
let solution = [];

function setDifficulty(size) {
  gridSize = size;
  generateGrid();
}

function generateGrid() {
  document.getElementById("message").textContent = "";
  let grid = document.getElementById("grid");
  grid.innerHTML = "";

  // Appliquer la classe de taille
  grid.className = "";
  grid.classList.add(`grid-${gridSize}x${gridSize}`);

  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  solution = generateSudoku(gridSize);
  let cells = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let cell = document.createElement("input");
      cell.type = "text";
      cell.classList.add("cell");

      if (Math.random() < 0.5) {
        // 50% des cases sont fixées
        cell.value = solution[i][j];
        cell.disabled = true;
        cell.classList.add("fixed");
      } else {
        cell.value = "";
        cell.oninput = () => validateInput(cell);
      }

      cells.push(cell);
      grid.appendChild(cell);
    }
  }
}

function generateSudoku(size) {
  let numbers = [...Array(size).keys()].map((i) => i + 1);
  let baseGrid = Array.from({ length: size }, (_, i) =>
    numbers.slice(i).concat(numbers.slice(0, i))
  );

  // Mélange des lignes et colonnes
  for (let i = 0; i < size; i++) {
    let swap = Math.floor(Math.random() * size);
    [baseGrid[i], baseGrid[swap]] = [baseGrid[swap], baseGrid[i]];
  }

  return baseGrid;
}

function validateInput(cell) {
  let val = cell.value;
  let validNumbers = [...Array(gridSize).keys()].map((i) => (i + 1).toString());
  if (!validNumbers.includes(val)) {
    cell.value = "";
  }
}

function checkSolution() {
  let cells = document.querySelectorAll(".cell");
  let userGrid = [];

  for (let i = 0; i < gridSize; i++) {
    userGrid.push([]);
    for (let j = 0; j < gridSize; j++) {
      let val = cells[i * gridSize + j].value;
      userGrid[i].push(val ? parseInt(val) : 0);
    }
  }

  if (isSudokuValid(userGrid)) {
    document.getElementById("message").textContent =
      "✅ Félicitations, la grille est correcte !";
  } else {
    document.getElementById("message").textContent =
      "❌ Erreur, vérifiez votre grille !";
  }
}

function isSudokuValid(grid) {
  for (let i = 0; i < gridSize; i++) {
    let rowCheck = new Set();
    let colCheck = new Set();

    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === 0 || grid[j][i] === 0) return false;
      if (rowCheck.has(grid[i][j]) || colCheck.has(grid[j][i])) return false;

      rowCheck.add(grid[i][j]);
      colCheck.add(grid[j][i]);
    }
  }
  return true;
}

window.onload = generateGrid;
