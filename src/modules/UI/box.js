import {
  convertCoordsToIndex,
  getShip,
  getShipElm,
  isOutOfBoard,
} from "../utils";

export const generateBoxes = () => {
  let boxes = "";

  for (let i = 0; i < 100; i++) {
    boxes += `<div class='border border-sky-100'></div>`;
  }

  return boxes;
};

export const addBoxesHoverClass = (boardElm) => {
  for (let i = 0; i < boardElm.children.length; i++) {
    boardElm.children[i].classList.add("cursor-pointer", "hover:bg-slate-100");
  }
};

export const setBoxColor = (coords, boardElm, gameboard) => {
  const box = gameboard.board[coords.row][coords.col];
  const boxElm = boardElm.children[convertCoordsToIndex(coords)];

  boxElm.classList.remove("hover:bg-slate-100", "cursor-pointer");

  if (box === "x") {
    const ship = getShip(coords, gameboard.ships);
    const shipElm = getShipElm(boardElm, ship);

    if (shipElm) {
      const startPosition = ship.position[0];

      const index =
        coords.row === startPosition.row
          ? coords.col - startPosition.col
          : coords.row - startPosition.row;

      const shipChildElm = shipElm.children[index];

      shipChildElm.classList.add("bg-red-400");
    } else boxElm.classList.add("bg-red-400");
  } else boxElm.classList.add("bg-sky-200");
};

export const updateMultipleBoxes = (coords, boardElm, gameboard) => {
  for (let i = 0; i < coords.length; i++) {
    if (!isOutOfBoard(coords[i])) setBoxColor(coords[i], boardElm, gameboard);
  }
};
