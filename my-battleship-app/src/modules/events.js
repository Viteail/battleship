import { setBoxColor } from "./UI/box";
import { convertIndexToCoords } from "./utils";
import { createShipPlacementBoard } from "./UI/shipPlacementBoard";
import { appendDragEvents } from "./dragging";
import { appendDropEvents, dropShip, redropShip } from "./dropping";
import { displayShip, removeShip } from "./UI/shipDisplay";
import {
  appendResetEvent,
  appendStartEvent,
  appendRandomEvent,
  appendComputerBoardEvent,
} from "./append";
import { createBattleLayout } from "./UI/battleLayout";
import { Player } from "./player";

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

export const handleNewGameClick = (shipPlacement) => {
  const content = document.querySelector("#content");
  createShipPlacementBoard(content);

  appendDropEvents(shipPlacement);
  appendDragEvents();

  appendResetEvent(shipPlacement);
  appendRandomEvent(shipPlacement);
  appendStartEvent(shipPlacement);
};

export const allowDrop = (e) => {
  e.preventDefault();
};

export const drag = (e) => {
  e.dataTransfer.setData("id", e.target.id);
};

export const drop = (e, shipPlacement) => {
  e.preventDefault();

  const data = e.dataTransfer.getData("id");

  const shipPlacementElm = document.querySelector("#ship-placement-board");

  if (data === "" || e.target.parentElement !== shipPlacementElm) return;

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

    displayShip(boxElm, ship, count, shipPlacement);
  } else shipPlacement.gameboard.placeShip(ship, coords);
};

export const resetBoard = (shipPlacement) => {
  const shipPlacementElm = document.querySelector("#ship-placement-board");
  const boxes = Array.from(shipPlacementElm.children);

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].firstElementChild) {
      const shipLength = boxes[i].firstElementChild.children.length;
      const countElm = document.querySelector(`#l${shipLength}-count`);

      countElm.textContent = `${shipPlacement.gameboard.ships.filter((ship) => ship.length === shipLength).length}x`;

      removeShip(boxes[i], boxes[i].firstElementChild);
    }
  }

  shipPlacement.gameboard.reset();
};

export const handleStartBattle = (shipPlacement) => {
  if (!shipPlacement.gameboard.ships.every((ship) => ship.position.length > 0))
    return;

  const content = document.querySelector("#content");
  createBattleLayout(content);

  const player = new Player();
  const computer = new Player();

  player.gameboard.board = [...shipPlacement.gameboard.board];
  player.gameboard.ships = [...shipPlacement.gameboard.ships];

  computer.gameboard.randomShipPlacement();

  const playerBoard = document.querySelector("#player-board");
  const computerBoard = document.querySelector("#pc-board");

  appendComputerBoardEvent(computerBoard, computer, playerBoard, player);
};
