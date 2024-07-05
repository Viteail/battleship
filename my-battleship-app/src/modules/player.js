import { setBoxColor, updateMultipleBoxes } from "./UI/box";
import { Gameboard } from "./gameboard";

import {
  getRandomNumber,
  convertIndexToCoords,
  getShip,
  isOutOfBoard,
  getAroundCoords,
} from "./utils";

export class Player {
  constructor() {
    this.turn = true;
    this.gameboard = new Gameboard();
    this.name;
    this.firstHit = false;
    this.lastHit = false;
  }

  attackRandomSpot(enemyBoard, boardElement) {
    if (this.firstHit) return this.attackNearSpot(enemyBoard, boardElement);
    const randomNumber = getRandomNumber(100);

    const boxes = Array.from(boardElement.children);
    const box = Array.from(boardElement.children)[randomNumber];

    const coords = convertIndexToCoords(randomNumber);

    if (enemyBoard.hasBeenShot(coords)) {
      return this.attackRandomSpot(enemyBoard, boardElement);
    }

    enemyBoard.receiveAttack(coords);

    setBoxColor(box, enemyBoard.board[coords.row][coords.col]);

    if (enemyBoard.board[coords.row][coords.col] === "x") {
      const ship = getShip(coords, enemyBoard.ships);

      if (ship.isSunk()) {
        updateMultipleBoxes(
          getAroundCoords(
            {
              col: ship.position[0].col,
              row: ship.position[0].row,
              vertical:
                ship.length > 1 && ship.position[0].row !== ship.position[1].row
                  ? true
                  : false,
            },
            ship,
          ),
          boxes,
          enemyBoard.board,
        );

        this.firstHit = false;
      } else this.firstHit = { col: coords.col, row: coords.row };

      setTimeout(() => {
        this.attackRandomSpot(enemyBoard, boardElement);
      }, 400);
    }
  }

  attackNearSpot(enemyBoard, boardElement) {
    if (this.lastHit) return this.attackRow(enemyBoard, boardElement);
    const coords = { col: this.firstHit.col, row: this.firstHit.row };

    let nearCoords = [
      { col: coords.col, row: coords.row - 1 },
      { col: coords.col, row: coords.row + 1 },
      { col: coords.col - 1, row: coords.row },
      { col: coords.col + 1, row: coords.row },
    ];

    let newCoords = [];

    for (let i = 0; i < nearCoords.length; i++) {
      if (
        !isOutOfBoard(nearCoords[i]) &&
        !enemyBoard.hasBeenShot(nearCoords[i])
      )
        newCoords.push(nearCoords[i]);
    }

    nearCoords = [...newCoords];

    let randomNumber = getRandomNumber(nearCoords.length);

    enemyBoard.receiveAttack(nearCoords[randomNumber]);

    const boxes = Array.from(boardElement.children);

    setBoxColor(
      boxes[
        Number("" + nearCoords[randomNumber].row + nearCoords[randomNumber].col)
      ],
      enemyBoard.board[nearCoords[randomNumber].row][
        nearCoords[randomNumber].col
      ],
    );

    if (
      enemyBoard.board[nearCoords[randomNumber].row][
        nearCoords[randomNumber].col
      ] === "x"
    ) {
      const ship = getShip(nearCoords[randomNumber], enemyBoard.ships);
      if (ship.isSunk()) {
        updateMultipleBoxes(
          getAroundCoords(
            {
              col: ship.position[0].col,
              row: ship.position[0].row,
              vertical:
                ship.length > 1 && ship.position[0].row !== ship.position[1].row
                  ? true
                  : false,
            },
            ship,
          ),
          boxes,
          enemyBoard.board,
        );

        this.firstHit = false;
      } else
        this.lastHit = {
          col: nearCoords[randomNumber].col,
          row: nearCoords[randomNumber].row,
        };
      setTimeout(() => {
        this.attackRandomSpot(enemyBoard, boardElement);
      }, 400);
    }
  }

  attackRow(enemyBoard, boardElement) {
    console.log("er");
    let coords = [
      {
        col:
          this.firstHit.col === this.lastHit.col
            ? this.firstHit.col
            : this.firstHit.col > this.lastHit.col
              ? this.firstHit.col + 1
              : this.firstHit.col - 1,
        row:
          this.firstHit.row === this.lastHit.row
            ? this.firstHit.row
            : this.firstHit.row > this.lastHit.row
              ? this.firstHit.row + 1
              : this.firstHit.row - 1,
      },
      {
        col:
          this.firstHit.col === this.lastHit.col
            ? this.firstHit.col
            : this.firstHit.col > this.lastHit.col
              ? this.lastHit.col - 1
              : this.lastHit.col + 1,
        row:
          this.firstHit.row === this.lastHit.row
            ? this.firstHit.row
            : this.firstHit.row > this.lastHit.row
              ? this.lastHit.row - 1
              : this.lastHit.row + 1,
      },
    ];

    let newCoords = [];

    for (let i = 0; i < coords.length; i++) {
      if (!isOutOfBoard(coords[i]) && !enemyBoard.hasBeenShot(coords[i]))
        newCoords.push(coords[i]);
    }

    coords = [...newCoords];

    const randomNumber = getRandomNumber(coords.length);

    enemyBoard.receiveAttack(coords[randomNumber]);

    const boxes = Array.from(boardElement.children);

    setBoxColor(
      boxes[Number("" + coords[randomNumber].row + coords[randomNumber].col)],
      enemyBoard.board[coords[randomNumber].row][coords[randomNumber].col],
    );

    if (
      enemyBoard.board[coords[randomNumber].row][coords[randomNumber].col] ===
      "x"
    ) {
      let ship = getShip(coords[randomNumber], enemyBoard.ships);

      if (ship.isSunk()) {
        updateMultipleBoxes(
          getAroundCoords(
            {
              col: ship.position[0].col,
              row: ship.position[0].row,
              vertical:
                ship.length > 1 && ship.position[0].row !== ship.position[1].row
                  ? true
                  : false,
            },
            ship,
          ),
          boxes,
          enemyBoard.board,
        );

        this.lastHit = false;
        this.firstHit = false;
      } else
        this.lastHit = {
          col: coords[randomNumber].col,
          row: coords[randomNumber].row,
        };

      setTimeout(() => {
        this.attackRandomSpot(enemyBoard, boardElement);
      }, 400);
    }
  }
}
