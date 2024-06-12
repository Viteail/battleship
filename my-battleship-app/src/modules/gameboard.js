import { Ship } from "./ship";
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
        this.board[coords.col][coords.row + i] = "s";

        ship.position.push({ col: coords.col, row: coords.row + i });
      } else {
        this.board[coords.col + i][coords.row] = "s";

        ship.position.push({ col: coords.col + i, row: coords.row });
      }
    }
  }

  isValidPlace(ship, coords) {
    const nearCoords = [];

    for (let i = 0; i < ship.length; i++) {
      if (coords.vertical) {
        if (this.board[coords.col][coords.row + i] !== ".") return false;
        if (i === 0)
          nearCoords.push(
            { col: coords.col - 1, row: coords.row + i - 1 },
            { col: coords.col, row: coords.row + i - 1 },
            { col: coords.col + 1, row: coords.row + i - 1 },
          );

        nearCoords.push(
          { col: coords.col - 1, row: coords.row + i },
          { col: coords.col + 1, row: coords.row + i },
        );

        if (i === ship.length - 1)
          nearCoords.push(
            { col: coords.col - 1, row: coords.row + i + 1 },
            { col: coords.col, row: coords.row + i + 1 },
            { col: coords.col + 1, row: coords.row + i + 1 },
          );
      } else {
        if (this.board[coords.col + i][coords.row] !== ".") return false;
        if (i === 0)
          nearCoords.push(
            { col: coords.col + i - 1, row: coords.row - 1 },
            { col: coords.col + i - 1, row: coords.row },
            { col: coords.col + i - 1, row: coords.row + 1 },
          );

        nearCoords.push(
          { col: coords.col + i, row: coords.row - 1 },
          { col: coords.col + i, row: coords.row + 1 },
        );

        if (i === ship.length - 1)
          nearCoords.push(
            { col: coords.col + i + 1, row: coords.row - 1 },
            { col: coords.col + i + 1, row: coords.row },
            { col: coords.col + i + 1, row: coords.row + 1 },
          );
      }
    }

    for (let i = 0; i < nearCoords.length; i++) {
      if (
        nearCoords[i].col >= 0 &&
        nearCoords[i].col <= 9 &&
        nearCoords[i].row >= 0 &&
        nearCoords[i].row <= 9
      )
        if (this.board[nearCoords[i].col][nearCoords[i].row] === "s")
          return false;
    }
    return true;
  }

  receiveAttack(coords) {
    for (let i = 0; i < this.ships.length; i++) {
      for (let j = 0; j < this.ships[i].position.length; j++) {
        if (
          this.ships[i].position[j].col === coords.col &&
          this.ships[i].position[j].row === coords.row
        ) {
          this.board[coords.col][coords.row] = "x";
          this.ships[i].hit();

          if (this.ships[i].isSunk()) this.ships.splice(i, 1);
          return;
        }
      }
    }
    this.board[coords.col][coords.row] = "o";
  }

  areAllShipsSunk() {
    return this.ships.length === 0 ? true : false;
  }

  hasBeenShot(coords) {
    return this.board[coords.col][coords.row] !== "." ? true : false;
  }
}
