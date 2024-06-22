import { Ship } from "./ship";
import { getShip, isOutOfBoard } from "./utils";
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
    const nearCoords = [];

    for (let i = 0; i < ship.length; i++) {
      let currentCol = coords.vertical ? coords.col : coords.col + i;
      let currentRow = coords.vertical ? coords.row + i : coords.row;

      if (isOutOfBoard({ col: currentCol, row: currentRow })) return false;
      if (this.board[currentRow][currentCol] !== ".") return false;

      if (coords.vertical) {
        if (i === 0)
          nearCoords.push(
            { col: currentCol - 1, row: currentRow - 1 },
            { col: currentCol, row: currentRow - 1 },
            { col: currentCol + 1, row: currentRow - 1 },
          );

        nearCoords.push(
          { col: currentCol - 1, row: currentRow },
          { col: currentCol + 1, row: currentRow },
        );

        if (i === ship.length - 1)
          nearCoords.push(
            { col: currentCol - 1, row: currentRow + 1 },
            { col: currentCol, row: currentRow + 1 },
            { col: currentCol + 1, row: currentRow + 1 },
          );
      } else {
        if (i === 0)
          nearCoords.push(
            { col: currentCol - 1, row: currentRow - 1 },
            { col: currentCol - 1, row: currentRow },
            { col: currentCol - 1, row: currentRow + 1 },
          );

        nearCoords.push(
          { col: currentCol, row: currentRow - 1 },
          { col: currentCol, row: currentRow + 1 },
        );

        if (i === ship.length - 1)
          nearCoords.push(
            { col: currentCol + 1, row: currentRow - 1 },
            { col: currentCol + 1, row: currentRow },
            { col: currentCol + 1, row: currentRow + 1 },
          );
      }
    }

    return nearCoords.every(
      ({ col, row }) =>
        isOutOfBoard({ col, row }) || this.board[row][col] !== "s",
    );
  }

  receiveAttack(coords) {
    if (this.board[coords.row][coords.col] === "s") {
      const ship = getShip(coords, this.ships);

      this.board[coords.row][coords.col] = "x";
      ship.hit();

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
}
