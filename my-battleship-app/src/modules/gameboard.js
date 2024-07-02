import { Ship } from "./ship";
import {
  getShip,
  isOutOfBoard,
  getRandomNumber,
  getAroundCoords,
} from "./utils";
// . = water
// x = hit
// o = miss
// s = ship
export class Gameboard {
  constructor() {
    this.board = [
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];
    this.ships = [
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
      new Ship(2),
      new Ship(2),
      new Ship(1),
      new Ship(1),
      new Ship(1),
      new Ship(1),
    ];
  }

  placeShip(ship, coords) {
    for (let i = 0; i < ship.length; i++) {
      if (coords.vertical) {
        this.board[coords.row + i][coords.col] = "s";

        ship.position.push({ col: coords.col, row: coords.row + i });
      } else {
        this.board[coords.row][coords.col + i] = "s";

        ship.position.push({ col: coords.col + i, row: coords.row });
      }
    }
  }

  isValidPlace(ship, coords) {
    for (let i = 0; i < ship.length; i++) {
      let currentCol = coords.vertical ? coords.col : coords.col + i;
      let currentRow = coords.vertical ? coords.row + i : coords.row;

      if (isOutOfBoard({ col: currentCol, row: currentRow })) return false;
      if (this.board[currentRow][currentCol] !== ".") return false;
    }

    const aroundCoords = getAroundCoords(coords, ship);

    return aroundCoords.every(
      ({ col, row }) =>
        isOutOfBoard({ col, row }) || this.board[row][col] !== "s",
    );
  }

  receiveAttack(coords) {
    if (this.board[coords.row][coords.col] === "s") {
      const ship = getShip(coords, this.ships);

      this.board[coords.row][coords.col] = "x";
      ship.hit();

      if (ship.isSunk()) {
        const vertical =
          ship.length > 1 && ship.position[0].row !== ship.position[1].row
            ? true
            : false;

        const aroundCoords = getAroundCoords(
          {
            col: ship.position[0].col,
            row: ship.position[0].row,
            vertical: vertical,
          },
          ship,
        );

        for (let i = 0; i < aroundCoords.length; i++)
          if (!isOutOfBoard(aroundCoords[i])) {
            this.board[aroundCoords[i].row][aroundCoords[i].col] = "o";
          }
      }
      return;
    }

    this.board[coords.row][coords.col] = "o";
  }

  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  hasBeenShot(coords) {
    return this.board[coords.row][coords.col] === "o" ||
      this.board[coords.row][coords.col] === "x"
      ? true
      : false;
  }

  retrieveShip(coords, ship) {
    for (let i = 0; i < ship.length; i++) {
      if (coords.vertical) this.board[coords.row + i][coords.col] = ".";
      else this.board[coords.row][coords.col + i] = ".";
    }
    ship.position = [];
  }

  reset() {
    this.ships.forEach((ship) => (ship.position = []));

    for (let row = 0; row < this.board.length; row++)
      for (let col = 0; col < this.board.length; col++)
        this.board[row][col] = ".";
  }

  randomShipPlacement() {
    for (let i = 0; i < this.ships.length; i++) {
      const coords = {
        col: getRandomNumber(10),
        row: getRandomNumber(10),
        vertical: getRandomNumber(2) ? true : false,
      };

      while (!this.isValidPlace(this.ships[i], coords)) {
        coords.col = getRandomNumber(10);
        coords.row = getRandomNumber(10);
        coords.vertical = getRandomNumber(2) ? true : false;
      }

      this.placeShip(this.ships[i], coords);
    }
  }
}
