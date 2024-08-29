import { setBoxColor, updateMultipleBoxes } from "./UI/box";
import { updateCurrentPlayerTurn } from "./UI/playerTurn";
import { displayDestroyedShip } from "./UI/shipDisplay";
import { updateShipsAlive } from "./UI/shipsAlive";
import { createWinnerLayout } from "./UI/winnerLayout";
import { Gameboard } from "./gameboard";

import {
  getRandomNumber,
  convertIndexToCoords,
  getShip,
  isOutOfBoard,
  getAroundCoords,
  convertCoordsToIndex,
} from "./utils";

export class Player {
  constructor() {
    this.turn = true;
    this.gameboard = new Gameboard();
    this.name;
    this.hits = [];
  }

  attackRandomSpot(enemy, enemyBoardElm) {
    if (this.hits.length) return this.attackNearSpot(enemy, enemyBoardElm);
    const enemyBoard = enemy.gameboard;
    const randomNumber = getRandomNumber(100);

    const coords = convertIndexToCoords(randomNumber);

    if (enemyBoard.hasBeenShot(coords)) {
      return this.attackRandomSpot(enemy, enemyBoardElm);
    }

    enemyBoard.receiveAttack(coords);

    setBoxColor(coords, enemyBoardElm, enemyBoard);

    if (enemyBoard.board[coords.row][coords.col] === "x")
      this.processHit(coords, enemy, enemyBoardElm);
    else {
      this.turn = false;
      updateCurrentPlayerTurn(enemy.name);
    }
  }

  attackNearSpot(enemy, enemyBoardElm) {
    if (this.hits.length > 1) return this.attackRow(enemy, enemyBoardElm);
    const enemyBoard = enemy.gameboard;

    const firstCoords = this.hits[0];

    const coords = { col: firstCoords.col, row: firstCoords.row };

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

    const boxes = Array.from(enemyBoardElm.children);

    setBoxColor(nearCoords[randomNumber], enemyBoardElm, enemyBoard);

    if (
      enemyBoard.board[nearCoords[randomNumber].row][
        nearCoords[randomNumber].col
      ] === "x"
    )
      this.processHit(nearCoords[randomNumber], enemy, enemyBoardElm);
    else {
      this.turn = false;
      updateCurrentPlayerTurn(enemy.name);
    }
  }

  attackRow(enemy, enemyBoardElm) {
    const enemyBoard = enemy.gameboard;

    const firstCoords = this.hits[0];
    const lastCoords = this.hits[this.hits.length - 1];

    let coords = [
      {
        col:
          firstCoords.col === lastCoords.col
            ? firstCoords.col
            : firstCoords.col > lastCoords.col
              ? firstCoords.col + 1
              : firstCoords.col - 1,
        row:
          firstCoords.row === lastCoords.row
            ? firstCoords.row
            : firstCoords.row > lastCoords.row
              ? firstCoords.row + 1
              : firstCoords.row - 1,
      },
      {
        col:
          firstCoords.col === lastCoords.col
            ? firstCoords.col
            : firstCoords.col > lastCoords.col
              ? lastCoords.col - 1
              : lastCoords.col + 1,
        row:
          firstCoords.row === lastCoords.row
            ? firstCoords.row
            : firstCoords.row > lastCoords.row
              ? lastCoords.row - 1
              : lastCoords.row + 1,
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

    setBoxColor(coords[randomNumber], enemyBoardElm, enemyBoard);

    if (
      enemyBoard.board[coords[randomNumber].row][coords[randomNumber].col] ===
      "x"
    )
      this.processHit(coords[randomNumber], enemy, enemyBoardElm);
    else {
      this.turn = false;
      updateCurrentPlayerTurn(enemy.name);
    }
  }

  processHit(coords, enemy, enemyBoardElm) {
    const enemyBoard = enemy.gameboard;
    const ship = getShip(coords, enemyBoard.ships);

    if (ship.isSunk()) {
      displayDestroyedShip(enemyBoardElm, ship);

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
        enemyBoardElm,
        enemyBoard,
      );

      updateShipsAlive(enemy.name);

      if (enemyBoard.areAllShipsSunk()) {
        createWinnerLayout(this.name);

        return;
      }

      this.hits = [];
    } else {
      this.hits.push(coords);

      this.hits.sort(
        (a, b) => convertCoordsToIndex(a) - convertCoordsToIndex(b),
      );
    }

    setTimeout(() => {
      this.attackRandomSpot(enemy, enemyBoardElm);
    }, 400);
  }
}
