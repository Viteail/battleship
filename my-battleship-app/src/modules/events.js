import { setBoxColor } from "./UI/box";
import { convertIndexToCoords } from "./utils";
import { createShipPlacementBoard } from "./UI/shipPlacementBoard";
import { appendDragEvents } from "./dragging";
import { appendDropEvents, dropShip, redropShip } from "./dropping";
import { appendShip, removeShip } from "./UI/shipDisplay";

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

export const handleFlipDirection = (shipElm, ship, shipPlacement, count) => {
  const coords = {
    col: ship.position[0].col,
    row: ship.position[0].row,
    vertical:
      ship.position.length === 1 ||
      ship.position[0].row !== ship.position[1].row
        ? true
        : false,
    orizontal:
      ship.position.length > 1 && ship.position[0].col !== ship.position[1].col
        ? true
        : false,
  };

  const newCoords = {
    col: coords.col,
    row: coords.row,
    vertical: coords.vertical ? false : true,
    orizontal: coords.orizontal ? false : true,
  };

  const boxElm = shipElm.parentElement;

  shipPlacement.gameboard.retrieveShip(coords, ship);

  if (shipPlacement.gameboard.isValidPlace(ship, newCoords)) {
    removeShip(boxElm, shipElm);

    shipPlacement.gameboard.placeShip(ship, newCoords);

    appendShip(boxElm, ship, count, shipPlacement);
  } else shipPlacement.gameboard.placeShip(ship, coords);
  console.log(shipPlacement.board);
};
