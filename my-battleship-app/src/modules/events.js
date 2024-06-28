import { setBoxColor } from "./UI/box";
import { convertIndexToCoords, getShipElm } from "./utils";
import { createShipPlacementBoard } from "./UI/shipPlacementBoard";
import { appendDragEvents } from "./dragging";
import { appendDropEvents, dropShip, redropShip } from "./dropping";
import { displayShip, displayShips, removeShip } from "./UI/shipDisplay";
import {
  appendResetEvent,
  appendStartEvent,
  appendRandomEvent,
  appendComputerBoardEvent,
  appendFlipEvent,
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
  const { clientX, clientY } = e;
  const elementAtPoint = document.elementFromPoint(clientX, clientY);

  e.dataTransfer.setData("id", e.target.id);
  e.dataTransfer.setData("child", elementAtPoint.id);
};

export const drop = (e, shipPlacement) => {
  e.preventDefault();

  const data = e.dataTransfer.getData("id");
  const child = e.dataTransfer.getData("child");

  if (data === "") return;

  const shipElm = document.querySelector(`#${data}`);
  const childElm = document.querySelector(`#${child}`);

  if (!shipElm.classList.contains("draggable-ship")) return;
  const shipPlacementElm = document.querySelector("#ship-placement-board");

  let boxElm = e.target;

  while (boxElm.parentElement !== shipPlacementElm) {
    boxElm = boxElm.parentElement;
  }

  const countElm = document.querySelector(`#${data}-count`);

  if (countElm)
    dropShip({ boxElm, shipElm, childElm, shipPlacement, countElm });
  else redropShip(boxElm, shipElm, shipPlacement);
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
  const shipPlacementElm = boxElm.parentElement;

  shipPlacement.gameboard.retrieveShip(coords, ship);

  if (shipPlacement.gameboard.isValidPlace(ship, newCoords)) {
    removeShip(boxElm, shipElm);

    shipPlacement.gameboard.placeShip(ship, newCoords);

    displayShip(boxElm, ship, count);
    appendFlipEvent(
      getShipElm(shipPlacementElm, ship),
      ship,
      shipPlacement,
      count,
    );
  } else shipPlacement.gameboard.placeShip(ship, coords);
};

export const handleResetBoard = (shipPlacement) => {
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

export const handleRandomPlacement = (shipPlacement, shipPlacementElm) => {
  handleResetBoard(shipPlacement);

  shipPlacement.gameboard.randomShipPlacement();
  displayShips(shipPlacement, shipPlacementElm);

  const ships = shipPlacement.gameboard.ships;

  for (let i = 0; i < ships.length; i++) {
    const shipElm = getShipElm(
      shipPlacementElm,
      shipPlacement.gameboard.ships[i],
    );

    const count = shipElm.id[shipElm.id.length - 1];

    const countElm = document.querySelector(`#l${count}-count`);
    countElm.textContent = "0x";

    appendFlipEvent(shipElm, ships[i], shipPlacement, count);
  }
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

  displayShips(player, playerBoard);

  appendComputerBoardEvent(computerBoard, computer, playerBoard, player);
};
