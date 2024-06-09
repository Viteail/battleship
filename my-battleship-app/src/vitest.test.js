import { Ship, Gameboard } from "./main";
import { describe, test, expect } from "vitest";

describe("ship", () => {
  test("is sunk", () => {
    let ship = new Ship(1);

    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });

  test("is hit", () => {
    let ship = new Ship(2);

    ship.hit();

    expect(ship.hits).toBe(1);
  });
});

describe("ship in gameboard", () => {
  test("is in correct position", () => {
    let gameboard = new Gameboard();
    let ship = gameboard.ships[8];

    gameboard.placeShip(ship, { col: 0, row: 0, vert: true, oriz: false });

    expect(ship.position).toEqual([{ col: 0, row: 0 }]);
  });

  test("is occupying right spots according to its length", () => {
    let gameboard = new Gameboard();
    let ship = gameboard.ships[0];

    gameboard.placeShip(ship, {
      col: 0,
      row: 0,
      vertical: true,
      orizontal: false,
    });

    const isShipInSpots = () => {
      let spots = [
        { col: 0, row: 0 },
        { col: 1, row: 0 },
        { col: 2, row: 0 },
        { col: 3, row: 0 },
      ];

      for (let i = 0; i < spots.length; i++) {
        if (gameboard.board[spots[i].col][spots[i].row] !== "s") return false;
      }
      return true;
    };

    expect(isShipInSpots()).toBe(true);
  });

  test("hit a empty spot", () => {
    let gameboard = new Gameboard();
    let ship = gameboard.ships[8];

    gameboard.placeShip(ship, {
      col: 0,
      row: 0,
      vertical: true,
      orizontal: false,
    });
    gameboard.receiveAttack({ col: 1, row: 0 });
    expect(gameboard.board[1][0]).toBe("o");
  });

  test("hit ship", () => {
    let gameboard = new Gameboard();
    let ship = gameboard.ships[0];

    gameboard.placeShip(ship, {
      col: 0,
      row: 0,
      vertical: true,
      orizontal: false,
    });
    gameboard.receiveAttack({ col: 1, row: 0 });
    expect(gameboard.board[1][0]).toBe("x");
  });

  test("all ships are sunk", () => {
    let gameboard = new Gameboard();
    gameboard.ships = gameboard.ships.slice(0, 1);
    let ship = gameboard.ships[0];

    gameboard.placeShip(ship, {
      col: 0,
      row: 0,
      vertical: true,
      orizontal: false,
    });

    gameboard.receiveAttack({ col: 0, row: 0 });
    gameboard.receiveAttack({ col: 1, row: 0 });
    gameboard.receiveAttack({ col: 2, row: 0 });
    gameboard.receiveAttack({ col: 3, row: 0 });

    expect(gameboard.areAllShipsSunk()).toBe(true);
  });
});
