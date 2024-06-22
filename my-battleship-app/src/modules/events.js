import { setBoxColor } from "./UI/box";
import { convertIndexToCoords } from "./utils";
import { createShipPlacementBoard } from "./UI/shipPlacementBoard";
import { appendDragEvents } from "./dragging";
import { appendDropEvents, dropShip, redropShip } from "./dropping";

export const handleBoardClick = (args) => {
  const { e, board, computer, player, playerBoard } = args;
  if (e.target === board) return;

  const boxes = Array.from(board.children);
  const boxIndex = boxes.indexOf(e.target);

  const coords = convertIndexToCoords(boxIndex);

  if (!computer.gameboard.hasBeenShot(coords)) {
    computer.gameboard.receiveAttack(coords);

    setBoxColor(
      boxes[boxIndex],
      computer.gameboard.board[coords.row][coords.col],
    );

    if (computer.gameboard.board[coords.row][coords.col] === "x") return;

    computer.attackRandomSpot(player.gameboard, playerBoard);
  }
};

export const handleNewGameClick = () => {
  const content = document.querySelector("#content");
  content.innerHTML = `${createShipPlacementBoard()}`;
  appendDropEvents();
  appendDragEvents();
};

export const allowDrop = (e) => {
  e.preventDefault();
};

export const drag = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
};

export const drop = (e, shipPlacement) => {
  e.preventDefault();

  if (e.target.parentElement.children.length !== 100) return;

  const data = e.dataTransfer.getData("text/plain");
  const elm = document.querySelector(`#${data}`);

  const countElm = document.querySelector(`#${data}-count`);

  if (countElm) dropShip(e.target, elm, shipPlacement, countElm);
  else redropShip(e.target, elm, shipPlacement);
};
