import { displayShips } from "./UI/shipDisplay";
import { resetBoard, handleStartBattle, handleBoardClick } from "./events";

export const appendRandomEvent = (shipPlacement) => {
  const randomBtn = document.querySelector("#random");

  randomBtn.addEventListener("click", () => {
    resetBoard(shipPlacement);
    shipPlacement.gameboard.randomShipPlacement();
    displayShips(shipPlacement);
  });
};

export const appendResetEvent = (shipPlacement) => {
  const resetBtn = document.querySelector("#reset");

  resetBtn.addEventListener("click", () => resetBoard(shipPlacement));
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
