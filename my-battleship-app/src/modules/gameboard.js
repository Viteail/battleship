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
      if (coords.vertical === true) {
        this.board[coords.col + i][coords.row] = "s";

        ship.position.push({ col: coords.col + i, row: coords.row });
      } else {
        this.board[coords.col][coords.row + i] = "s";

        ship.position.push({ col: coords.col, row: coords.row + i });
      }
    }
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
