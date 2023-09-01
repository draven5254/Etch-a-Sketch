"Use strict";

// html container
const container = document.querySelector(".container");
const gridContainer = document.querySelector(".grid-container");
const resetButton = document.getElementById("resetButton");
const deleteButton = document.getElementById("deleteButton");
const btnPopUp = document.querySelector(".btn");
const colorPick = document.getElementById("colorPicker");

const gridItems = [];

//  new grid generate
function createGrid(size) {
  gridContainer.innerHTML = ""; // Clear existing grid

  // Calculate the column and row sizes to fit the container
  const columnSize = `calc(100% / ${size})`;
  const rowSize = `calc(100% / ${size})`;

  // Set the column and row sizes using grid-template-columns and grid-template-rows
  gridContainer.style.gridTemplateColumns = `repeat(${size}, ${columnSize})`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, ${rowSize})`;

  for (let i = 0; i < size * size; i++) {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridContainer.appendChild(gridItem);
  }
}

resetButton.addEventListener("click", () => {
  const newSize = prompt("Enter the number of squares per side:");
  if (newSize !== null && newSize !== "") {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0 && size <= 100) {
      createGrid(size);
    } else {
      alert("Please enter a valid number.");
    }
  }
});

createGrid(); // Initial grid

// generate grid and append in div container
function addElem() {
  const gridItem = document.createElement("div");
  gridItem.className = "grid-item";
  gridItems.push(gridItem);
  gridContainer.appendChild(gridItem);
}

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    addElem();
  }
}

// change color when your mouse passes over them, leaving a (pixelated) trail
colorPick.addEventListener("input", (event) => {
  const selectedColor = event.target.value;
  // Store the selected color for later use
  currentColor = selectedColor;
});

let isDrawing = false;
let currentColor = "black"; // Default color

// Detect mouse movement and update grid item colors
gridContainer.addEventListener("mousedown", () => {
  isDrawing = true;
});

gridContainer.addEventListener("mouseup", () => {
  isDrawing = false;
});

gridContainer.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    const target = event.target;
    if (target.classList.contains("grid-item")) {
      target.style.backgroundColor = currentColor;
    }
  }
});

deleteButton.addEventListener("click", () => {
  gridContainer.innerHTML = "";
});
