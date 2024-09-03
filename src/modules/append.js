import {
  handleResetBoard,
  handleStartBattle,
  handleBoardClick,
  handleRandomPlacement,
  handleFlipDirection,
  handlePlayAgainClick,
  handleNewGameClick,
  handleMenuClick,
  handleResumeClick,
} from "./events";

export const appendRandomEvent = (shipPlacement) => {
  const randomBtn = document.querySelector("#random");
  const shipPlacementElm = document.querySelector("#ship-placement-board");

  randomBtn.addEventListener("click", () =>
    handleRandomPlacement(shipPlacement, shipPlacementElm),
  );
};

export const appendResetEvent = (shipPlacement) => {
  const resetBtn = document.querySelector("#reset");

  resetBtn.addEventListener("click", () => handleResetBoard(shipPlacement));
};

export const appendStartEvent = (shipPlacement) => {
  const startBtn = document.querySelector("#start");

  startBtn.addEventListener("click", () => handleStartBattle(shipPlacement));
};

export const appendComputerBoardEvent = (
  computerBoard,
  computer,
  playerBoard,
  player,
) => {
  computerBoard.addEventListener("click", (e) => {
    handleBoardClick({
      e: e,
      computerBoard: computerBoard,
      computer: computer,
      player: player,
      playerBoard: playerBoard,
    });
  });
};

export const appendFlipEvent = (shipElm, ship, shipPlacement, count) => {
  shipElm.addEventListener("click", () =>
    handleFlipDirection(shipElm, ship, shipPlacement, count),
  );
};

export const appendPlayAgainEvent = () => {
  const playAgainBtn = document.querySelector("#play-again");

  playAgainBtn.addEventListener("click", handlePlayAgainClick);
};

export const appendNewGameEvent = (shipPlacement) => {
  const newGameBtn = document.querySelector("#new-game");

  newGameBtn.addEventListener("click", () => handleNewGameClick(shipPlacement));
};

export const appendResumeEvent = () => {
  const resumeBtn = document.querySelector("#resume");

  resumeBtn.addEventListener("click", handleResumeClick);
};

export const appendMenuEvent = () => {
  const menuBtn = document.querySelector("#menu-btn");

  menuBtn.addEventListener("click", handleMenuClick);
};
