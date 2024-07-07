import { setBoxColor, updateMultipleBoxes } from "./UI/box";
import { updateCurrentPlayerTurn } from "./UI/playerTurn";
import { createWinnerLayout } from "./UI/winnerLayout";
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

  attackRandomSpot(enemy, boardElement) {
    if (this.firstHit) return this.attackNearSpot(enemy, boardElement);
    const enemyBoard = enemy.gameboard;
    const randomNumber = getRandomNumber(100);

    const boxes = Array.from(boardElement.children);
    const box = Array.from(boardElement.children)[randomNumber];

    const coords = convertIndexToCoords(randomNumber);

    if (enemyBoard.hasBeenShot(coords)) {
      return this.attackRandomSpot(enemy, boardElement);
    }

    enemyBoard.receiveAttack(coords);

    setBoxColor(box, enemyBoard.board[coords.row][coords.col]);

    if (enemyBoard.board[coords.row][coords.col] === "x")
      this.processHit(coords, enemy, boxes, boardElement);
    else {
      this.turn = false;
      updateCurrentPlayerTurn(enemy.name);
    }
  }

  attackNearSpot(enemy, boardElement) {
    if (this.lastHit) return this.attackRow(enemy, boardElement);
    const enemyBoard = enemy.gameboard;

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
    )
      this.processHit(nearCoords[randomNumber], enemy, boxes, boardElement);
    else {
      this.turn = false;
      updateCurrentPlayerTurn(enemy.name);
    }
  }

  attackRow(enemy, boardElement) {
    const enemyBoard = enemy.gameboard;

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
    )
      this.processHit(coords[randomNumber], enemy, boxes, boardElement);
    else {
      this.turn = false;
      updateCurrentPlayerTurn(enemy.name);
    }
  }

  processHit(coords, enemy, boxes, boardElement) {
    const enemyBoard = enemy.gameboard;
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

      if (enemyBoard.areAllShipsSunk()) {
        createWinnerLayout(this.name);

        return;
      }

      this.firstHit = false;
      this.lastHit = false;
    } else {
      if (this.firstHit) this.lastHit = { ...coords };
      else this.firstHit = { ...coords };
    }

    setTimeout(() => {
      this.attackRandomSpot(enemy, boardElement);
    }, 400);
  }
}
