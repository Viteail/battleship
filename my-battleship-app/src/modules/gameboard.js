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
    const isOutOfBoard = ({ col, row }) =>
      col < 0 || col > 9 || row < 0 || row > 9;

    const nearCoords = [];

    for (let i = 0; i < ship.length; i++) {
      let currentCol = coords.vertical ? coords.col : coords.col + i;
      let currentRow = coords.vertical ? coords.row + i : coords.row;

      if (isOutOfBoard({ col: currentCol, row: currentRow })) return false;
      if (this.board[currentCol][currentRow] !== ".") return false;

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
        isOutOfBoard({ col, row }) || this.board[col][row] !== "s",
    );
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
    return this.board[coords.col][coords.row] === "o" ||
      this.board[coords.col][coords.row] === "x"
      ? true
      : false;
  }
}
