import {
  handleResetBoard,
  handleStartBattle,
  handleBoardClick,
  handleRandomPlacement,
  handleFlipDirection,
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
      board: computerBoard,
      computer: computer,
      player: player,
      playerBoard: playerBoard,
    });
  });
};

export const appendFlipEvent = (shipElm, ship, shipPlacement, count) => {
  shipElm.addEventListener("click", (e) =>
    handleFlipDirection(e.target.parentElement, ship, shipPlacement, count),
  );
};
