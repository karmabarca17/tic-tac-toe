let gridItems = document.getElementsByClassName("box");
const btn = document.getElementById("reset")
let currentPlayer = "x"
let gear = document.querySelector(".gear")
let spinner = document.querySelector(".gear .fa-palette")
let menu = document.querySelector(".bullets")
let line = document.querySelector("#line");
let instruction = document.getElementById("instruction"); // Gets the turn message element

gear.addEventListener("click", () => {
  spinner.classList.toggle("fa-spin")
  gear.classList.toggle("active")
  menu.classList.toggle("active")
})

let gameOver = false
let boardArray = [
  "", "", "",
  "", "", "",
  "", "", ""
]

let bullets = document.querySelectorAll(".bullets ul li");

Array.from(bullets).forEach((li) => {
  li.style.backgroundColor = li.dataset.color;
  li.addEventListener("click", () => {
    document.body.style.backgroundColor = li.dataset.color;
    Array.from(gridItems).forEach(item => {
      item.style.borderColor = li.dataset.color;
    });
  })
})

for (const item of gridItems) {
  item.addEventListener("click", function() {
    if (gameOver) {
      return
    }
    
    let value = item.getAttribute("value");
    let index = value - 1
    
    // Check if box is already filled
    if (boardArray[index] == "x" || boardArray[index] == "o") {
      return
    }

    // Fill the value visually - FIXED QUOTES
    let boxContent = document.querySelector(`.box[value="${value}"]`)
    boxContent.textContent = currentPlayer;

    // Update board array
    boardArray[index] = currentPlayer
    console.log(boardArray)

    // Check for win BEFORE switching players
    checkWin()

    // Switch players only if game is not over
    if (!gameOver) {
      currentPlayer = currentPlayer == "x" ? "o" : "x"
      // Update turn instruction
      updateTurnMessage();
    }
  })
}

// Function to check winner
function checkWin() {
  if (
    //rows
    (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2] && (boardArray[0] === "x" || boardArray[0] === "o")) ||
    (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5] && (boardArray[3] === "x" || boardArray[3] === "o")) ||
    (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8] && (boardArray[6] === "x" || boardArray[6] === "o")) ||
    //columns
    (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6] && (boardArray[0] === "x" || boardArray[0] === "o")) ||
    (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7] && (boardArray[1] === "x" || boardArray[1] === "o")) ||
    (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8] && (boardArray[2] === "x" || boardArray[2] === "o")) ||
    //diagonals
    (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8] && (boardArray[0] === "x" || boardArray[0] === "o")) ||
    (boardArray[6] == boardArray[4] && boardArray[4] == boardArray[2] && (boardArray[6] === "x" || boardArray[6] === "o"))
  ) {
    document.getElementById("reset").style.display = "block"

    // FIXED: Winner is the current player (not switched yet)
    gameOver = true
    document.getElementById("header").textContent = `${currentPlayer.toUpperCase()} won!`

    // Reset line width first
    line.style.width = "0%";

    if (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2] && (boardArray[0] === "x" || boardArray[0] === "o")) {
      line.style.top = "2rem"
      line.style.left = "0"
      line.style.right = "auto"
      line.style.transform = "none"
      setTimeout(() => line.style.width = "90%", 10);

    } else if (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5] && (boardArray[3] === "x" || boardArray[3] === "o")) {
      line.style.top = "50%"
      line.style.left = "0"
      line.style.right = "auto"
      line.style.transform = "translateY(-50%)"
      setTimeout(() => line.style.width = "90%", 10);

    } else if (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8] && (boardArray[6] === "x" || boardArray[6] === "o")) {
      line.style.top = "90%"
      line.style.left = "0"
      line.style.right = "auto"
      line.style.transform = "translateY(-50%)"
      setTimeout(() => line.style.width = "90%", 10);

    } else if (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6] && (boardArray[0] === "x" || boardArray[0] === "o")) {
      line.style.top = "48%"
      line.style.left = "-16%"
      line.style.right = "auto"
      line.style.transform = "translateY(-50%) rotate(90deg)";
      setTimeout(() => line.style.width = "63%", 10);

    } else if (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7] && (boardArray[1] === "x" || boardArray[1] === "o")) {
      line.style.top = "48%"
      line.style.right = "73px"
      line.style.left = "auto"
      line.style.transform = "translateY(-50%) rotate(90deg)";
      setTimeout(() => line.style.width = "63%", 10);

    } else if (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8] && (boardArray[2] === "x" || boardArray[2] === "o")) {
      line.style.top = "48%"
      line.style.right = "-60px"
      line.style.left = "auto"
      line.style.transform = "translateY(-50%) rotate(90deg)";
      setTimeout(() => line.style.width = "63%", 10);

    } else if (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8] && (boardArray[0] === "x" || boardArray[0] === "o")) {
      line.style.top = "48%"
      line.style.right = "5%"
      line.style.left = "auto"
      line.style.transform = "translateY(-50%) rotate(34deg)";
      setTimeout(() => line.style.width = "90%", 10);

    } else if (boardArray[6] == boardArray[4] && boardArray[4] == boardArray[2] && (boardArray[6] === "x" || boardArray[6] === "o")) {
      line.style.top = "50%"
      line.style.right = "8%"
      line.style.left = "auto"
      line.style.transform = "translateY(-50%) rotate(-34deg)";
      setTimeout(() => line.style.width = "89%", 10);
    }

  } else if (!boardArray.includes("")) {
    document.getElementById("reset").style.display = "block"
    gameOver = true
    document.getElementById("header").textContent = "Draw!"
  }
}

// Helper function to update turn message
function updateTurnMessage() {
  if (instruction) {
    instruction.textContent = `${currentPlayer} turn`;
  }
}

// Reset button event listener
document.getElementById("reset").addEventListener("click", () => {
  currentPlayer = "x"
  line.style.width = "0%";
  gameOver = false
  document.getElementById("header").textContent = "X-o"
  Array.from(gridItems).forEach(element => {
    element.textContent = "";
  });
  document.getElementById("reset").style.display = "none"
  boardArray = [
    "", "", "",
    "", "", "",
    "", "", ""
  ]
  // Reset turn instruction
  updateTurnMessage();
});