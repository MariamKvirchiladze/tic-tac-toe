`use strict`;
const startPage = document.querySelector(`#start-page`);
const gamePage = document.querySelector(`#game-page`);
const winnerPage = document.querySelector(`#winner`);
const restartMenu = document.querySelector(`#reset-menu`);
const chooseX = document.querySelector(`#choose-x`);
const chooseO = document.querySelector(`#choose-o`);
const darkX = document.querySelector(`#dark-x`);
const darkO = document.querySelector(`#dark-o`);
const silverX = document.querySelector(`#silver-x`);
const silverO = document.querySelector(`#silver-o`);
const buttonCPU = document.querySelector(`#button-CPU`);
const buttonPL = document.querySelector(`#button-PL`);
const restartBTN = document.querySelector(`#restart-btn`);
const noBtn = document.querySelector(`#no-btn`);
const yesBtn = document.querySelector(`#yes-btn`);
const nextRound = document.querySelector(`#next-btn`);
const quit = document.querySelector(`#quit-btn`);
let cell = document.querySelectorAll(`.cell`);
let p1 = 1;
let p2 = 2;
let vsCPU = false;
let cputurn = false;
let vsHuman = false;
let endgame = false;
let tie = false;
let winner = "";
let pickedX;
let scorex = 0;
let scoreo = 0;
let scoret = 0;

//game logic
//win logic
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

let xturn = true;
let checkedboxes = ["", "", "", "", "", "", "", "", ""];
//display x/o on click
function playgame() {
  
  cell.forEach((element) => {
    element.addEventListener(`click`, function play() {
      let i = element.id;
      if (endgame) {
        return;
      }
      if (!endgame && checkedboxes[i] === "") {
        if (xturn) {
          element.classList.add(`addx`);
          xturn = false;
          checkedboxes[i] = "x";
          document.querySelector(`#turn-x`).style.display = `none`;
          document.querySelector(`#turn-o`).style.display = `block`;
        } else {
          element.classList.add(`addo`);
          xturn = true;
          checkedboxes[i] = "o";
          document.querySelector(`#turn-x`).style.display = `block`;
          document.querySelector(`#turn-o`).style.display = `none`;
        }
      }
      winChecker();
      displayWinner();
      updateScores();

      if (!pickedX && vsCPU && !endgame && xturn) {
        // simulate computer's move
        let emptyCells = [];
        for (let j = 0; j < checkedboxes.length; j++) {
          if (checkedboxes[j] === "") {
            emptyCells.push(j);
          }
        }
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let computerMove = emptyCells[randomIndex];
        document.getElementById(computerMove).click();
      }
      if (pickedX && vsCPU && !endgame && !xturn) {
        // simulate computer's move
        let emptyCells = [];
        for (let j = 0; j < checkedboxes.length; j++) {
          if (checkedboxes[j] === "") {
            emptyCells.push(j);
          }
        }
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let computerMove = emptyCells[randomIndex];
        document.getElementById(computerMove).click();
      }
    });
  });
  if (vsCPU && !pickedX) {
    let emptyCells = [];
    for (let j = 0; j < checkedboxes.length; j++) {
      if (checkedboxes[j] === "") {
        emptyCells.push(j);
      }
    }
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let computerMove = emptyCells[randomIndex];
    document.getElementById(computerMove).click();
  }
}

function winChecker() {
  for (let combo of winCombos) {
    if (
      checkedboxes[combo[0]] !== "" &&
      checkedboxes[combo[0]] == checkedboxes[combo[1]] &&
      checkedboxes[combo[1]] == checkedboxes[combo[2]]
    ) {
      endgame = true;
      winner = checkedboxes[combo[0]];
      return;
    }
    if (checkedboxes.every((box) => box !== "")) {
      endgame = true;
      tie = true;
    }
  }
}

function updateScores() {
  if (pickPlayerX) {
    if (endgame && !tie) {
      if (winner == "o") {
        document.querySelector(`#PL2-scores`).textContent = scoreo;
      } else if (winner == "x") {
        document.querySelector(`#PL1-scores`).textContent = scorex;
      }
    } else if (endgame && tie) {
      document.querySelector(`#ties-score`).textContent = scoret;
    }
  } else if (pickPlayerO) {
    if (endgame && !tie) {
      if (winner == "o") {
        document.querySelector(`#PL1-scores`).textContent = scoreo;
      } else if (winner == "x") {
        document.querySelector(`#PL2-scores`).textContent = scorex;
      }
    } else if (endgame && tie) {
      document.querySelector(`#ties-score`).textContent = scoret;
    }
  }
}
function displayWinner() {
  if (endgame && !tie) {
    document.querySelector(`#winner`).style.display = `flex`;
    if (winner == "o") {
      document.querySelector(`#icon`).src = `./assets/icon-o.svg`;
      document.querySelector(`#round`).style.color = `var(--button-2)`;
      scoreo++;
    } else if (winner == "x") {
      document.querySelector(`#icon`).src = `./assets/icon-x.svg`;
      document.querySelector(`#round`).style.color = `var(--button-1)`;
      scorex++;
    }
  } else if (endgame && tie) {
    document.querySelector(`#winner`).style.display = `flex`;
    document.querySelector(`#round`).style.color = `var(--button-3)`;
    document.querySelector(`#round`).textContent = `ROUND TIED`;
    scoret++;
  }
}

// pick players mark
function pickPlayerX() {
  pickedX = true;
  chooseX.classList.add(`active`);
  chooseO.classList.remove(`active`);
  darkX.style.display = `block`;
  silverX.style.display = `none`;
  darkO.style.display = `none`;
  silverO.style.display = `block`;
}
function pickPlayerO() {
  pickedX = false;
  chooseO.classList.add(`active`);
  chooseX.classList.remove(`active`);
  darkX.style.display = `none`;
  silverX.style.display = `block`;
  darkO.style.display = `block`;
  silverO.style.display = `none`;
  p1 = 2;
  p2 = 1;
}

//set score menus for cpu or multiplayer mode
function scoreMenuVsHuman() {
  document.querySelector(`#PL1-label`).textContent = "X" + "(P1)";
  document.querySelector(`#PL2-label`).textContent = "O" + "(P2)";
}

function scoreMenuVsCpu() {
  if (chooseX.classList.contains(`active`)) {
    document.querySelector(`#PL1-label`).textContent = "X" + "(YOU)";
    document.querySelector(`#PL2-label`).textContent = "O" + "(CPU)";
  } else {
    document.querySelector(`#PL1-label`).textContent = "X" + "(CPU)";
    document.querySelector(`#PL2-label`).textContent = "O" + "(YOU)";
  }
}

//add functions on start-page buttons to choose play mode.
buttonCPU.onclick = () => {
  xturn = true;
  startPage.style.display = `none`;
  gamePage.style.display = `block`;
  scoreMenuVsCpu();
  vsCPU = true;
  cell.forEach((element) => {
    let i = element.id;
    checkedboxes[i] = "";
    element.classList.remove(`addx`);
    element.classList.remove(`addo`);
  });
  playgame();
};
buttonPL.onclick = () => {
  xturn = true;
  startPage.style.display = `none`;
  gamePage.style.display = `block`;
  scoreMenuVsHuman();
  vsCPU = false;
  vsHuman = true;
  cell.forEach((element) => {
    let i = element.id;
    checkedboxes[i] = "";
    element.classList.remove(`addx`);
    element.classList.remove(`addo`);
  });
  playgame();
};

//add restart funqtions on restart button
restartBTN.onclick = () => {
  restartMenu.style.display = `block`;
};
noBtn.onclick = () => {
  restartMenu.style.display = `none`;
};
function reset() {
  xturn = true;
  endgame = false;
  tie = false;
  winner = "";
  scorex = 0;
  scoreo = 0;
  scoret = 0;
  document.querySelector(`#PL1-scores`).textContent = scorex;
  document.querySelector(`#PL2-scores`).textContent = scoreo;
  document.querySelector(`#ties-score`).textContent = scoret;
  document.querySelector(`#winner`).style.display = `none`;
  restartMenu.style.display = `none`;
  gamePage.style.display = `none`;
  startPage.style.display = `flex`;
}
yesBtn.addEventListener(`click`, reset);
quit.addEventListener(`click`, reset);
nextRound.addEventListener(`click`, () => {
  xturn = true;
  endgame = false;
  tie = false;
  winner = "";
  document.querySelector(`#winner`).style.display = `none`;
  cell.forEach((element) => {
    let i = element.id;
    checkedboxes[i] = "";
    element.classList.remove(`addx`);
    element.classList.remove(`addo`);
  });
  playgame();
});
