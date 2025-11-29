let gridItems = document.getElementsByClassName("box");
const  btn = document.getElementById("reset")
let currentPlayer = "x"
let gear = document.querySelector(".gear")
let spinner = document.querySelector(".gear .fa-palette")
let menu = document.querySelector(".bullets")
let line = document.querySelector("#line");


gear.addEventListener("click",()=>{
  spinner.classList.toggle("fa-spin")
  gear.classList.toggle("active")

  menu.classList.toggle("active")
})
let gameOver = false
let boardArray = [
  "" , "" , "",
  "" , "" , "",
  "" , "" , ""
]   // ← You never use this array → useless

let bullets = document.querySelectorAll(".bullets ul li");

Array.from(bullets).forEach((li)=>
  {
  li.style.backgroundColor = li.dataset.color;
  li.addEventListener("click",()=> {
    document.body.style.backgroundColor = li.dataset.color;
    Array.from(gridItems).forEach(item => {
        item.style.borderColor = li.dataset.color;
      });
  })
  }

)


for ( const item of gridItems)
{
item.addEventListener("click" , function(){
  if(gameOver){
    return 
  }
  //it blocking the player to change the box  content after chosing
  let value = item.getAttribute("value");
   let index = value - 1  
  if (boardArray[index] == "x" || boardArray[index] == "o")
    {
      return

  }

  ///filling the value visually
  let boxContent = document.querySelector(`.box[value="${value}"]`)
   //                                           
   // Wrong quotes + wrong syntax → SyntaxError or returns null

   boxContent.textContent = currentPlayer;  
  
 boardArray [index]=  currentPlayer
 console.log(boardArray)
 
 // to make the function winner work after any click 
 chekWin()
 
 if(currentPlayer == "x"){
    currentPlayer = "o"
  }else{
    currentPlayer = "x"
  }
  })
}
const  change = document.getElementById("btn");
let isChanged = false ; 



// function check winner  over evaluate board
function chekWin(){
  if(
    //rows
    (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2] && (boardArray[0] ==="x" || boardArray[0] === "o")) ||
    (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5] && (boardArray[3] ==="x" || boardArray[3] === "o"))||
    (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8] && (boardArray[6] ==="x" || boardArray[6] === "o"))||
    //columns
    (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6] && (boardArray[0] ==="x" || boardArray[0] === "o")) ||
   (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7] && (boardArray[1] ==="x" || boardArray[1] === "o"))||
   (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8] && (boardArray[2] ==="x" || boardArray[2] === "o"))||
   //diagonale
   (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8] && (boardArray[0] ==="x" || boardArray[0] === "o")) ||
   (boardArray[6] == boardArray[4] && boardArray[4] == boardArray[2] && (boardArray[6] ==="x" || boardArray[6] === "o"))) 
   {
     document.getElementById("reset").style.display = "block"
     
     var winner = currentPlayer == "x"? "o" : "x"  // Fixed: winner is opposite of current player
  gameOver = true
 
  document.getElementById("header").textContent = `the ${winner} won!`
  
  // Reset line width first
  line.style.width = "0%";
  
  if(boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2] && (boardArray[0] ==="x" || boardArray[0] === "o")) {
    console.log("Winning line: Row 1 - Positions [0, 1, 2]:", boardArray[0], boardArray[1], boardArray[2]);
    line.style.top = "2rem"
    line.style.left = "0"
    line.style.right = "auto"
    line.style.transform = "none"
    setTimeout(() => line.style.width = "90%", 10);
    
  } else if(boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5] && (boardArray[3] ==="x" || boardArray[3] === "o")) {
    line.style.top = "50%"
    line.style.left = "0"
    line.style.right = "auto"
    line.style.transform = "translateY(-50%)"
    setTimeout(() => line.style.width = "90%", 10);
    console.log("Winning line: Row 2 - Positions [3, 4, 5]:", boardArray[3], boardArray[4], boardArray[5]);
    
  } else if(boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8] && (boardArray[6] ==="x" || boardArray[6] === "o")) {
    console.log("Winning line: Row 3 - Positions [6, 7, 8]:", boardArray[6], boardArray[7], boardArray[8]);
    line.style.top = "90%"
    line.style.left = "0"
    line.style.right = "auto"
    line.style.transform = "translateY(-50%)"
    setTimeout(() => line.style.width = "90%", 10);
    
  } else if(boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6] && (boardArray[0] ==="x" || boardArray[0] === "o")) {
    line.style.top = "48%"
    line.style.left = "-16%"
    line.style.right = "auto"
    line.style.transform = "translateY(-50%) rotate(90deg)";
    setTimeout(() => line.style.width = "63%", 10);
    console.log("Winning line: Column 1 - Positions [0, 3, 6]:", boardArray[0], boardArray[3], boardArray[6]);
    
  } else if(boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7] && (boardArray[1] ==="x" || boardArray[1] === "o")) {
    console.log("Winning line: Column 2 - Positions [1, 4, 7]:", boardArray[1], boardArray[4], boardArray[7]);
    line.style.top = "48%"
    line.style.right = "73px"
    line.style.left = "auto"
    line.style.transform = "translateY(-50%) rotate(90deg)";
    setTimeout(() => line.style.width = "63%", 10);
 
  } else if(boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8] && (boardArray[2] ==="x" || boardArray[2] === "o")) {
    console.log("Winning line: Column 3 - Positions [2, 5, 8]:", boardArray[2], boardArray[5], boardArray[8]);
    line.style.top = "48%"
    line.style.right = "-60px"
    line.style.left = "auto"
    line.style.transform = "translateY(-50%) rotate(90deg)";
    setTimeout(() => line.style.width = "63%", 10);
  
  } else if(boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8] && (boardArray[0] ==="x" || boardArray[0] === "o")) {
    console.log("Winning line: Diagonal 1 - Positions [0, 4, 8]:", boardArray[0], boardArray[4], boardArray[8]);
    line.style.top = "48%"
    line.style.right = "5%"
    line.style.left = "auto"
    line.style.transform = "translateY(-50%) rotate(34deg)";
    setTimeout(() => line.style.width = "90%", 10);

  } else if(boardArray[6] == boardArray[4] && boardArray[4] == boardArray[2] && (boardArray[6] ==="x" || boardArray[6] === "o")) {
    console.log("Winning line: Diagonal 2 - Positions [6, 4, 2]:", boardArray[6], boardArray[4], boardArray[2]);
    line.style.top = "50%"
    line.style.right = "8%"
    line.style.left = "auto"
    line.style.transform = "translateY(-50%) rotate(-34deg)";
    setTimeout(() => line.style.width = "89%", 10);
  }
  
}else if(!boardArray.includes("")){ 
   document.getElementById("reset").style.display = "block"
  gameOver = true
  document.getElementById("header").textContent = "draw"
}
}
// this event it making the reset  action by ahmed 

// Add the event listener
document.getElementById("reset").addEventListener("click", () => {
   currentPlayer = "x"
   line.style.width = "0%";
  console.log(gridItems);
  gameOver = false
  document.getElementById("header").textContent = "TIC TAK TOE"
  Array.from(gridItems).forEach(element => {
    element.textContent = "";
  });
  document.getElementById("reset").style.display = "none"
  boardArray = [
  "" , "" , "",
  "" , "" , "",
  "" , "" , ""
]
});
