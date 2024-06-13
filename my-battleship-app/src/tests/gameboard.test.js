import { describe, test, expect } from "vitest";
import { Gameboard } from "../modules/gameboard";

describe("ship in gameboard", () => {
  test("is in correct position", () => {
    let gameboard = new Gameboard();
    let ship = gameboard.ships[8];

    gameboard.placeShip(ship, {
      col: 0,
      row: 0,
      vertical: true,
      orizontal: false,
    });

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
        { col: 0, row: 1 },
        { col: 0, row: 2 },
        { col: 0, row: 3 },
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
    gameboard.receiveAttack({ col: 0, row: 1 });
    expect(gameboard.board[0][1]).toBe("x");
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
    gameboard.receiveAttack({ col: 0, row: 1 });
    gameboard.receiveAttack({ col: 0, row: 2 });
    gameboard.receiveAttack({ col: 0, row: 3 });

    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  describe("spot has been shoot", () => {
    test("hit water", () => {
      let gameboard = new Gameboard();
      gameboard.receiveAttack({ col: 0, row: 0 });

      expect(gameboard.hasBeenShot({ col: 0, row: 0 })).toBe(true);
    });

    test("hit ship", () => {
      let gameboard = new Gameboard();
      let ship = gameboard.ships[0];

      gameboard.placeShip(ship, {
        col: 0,
        row: 0,
        vertical: false,
        orizontal: true,
      });

      expect(gameboard.hasBeenShot({ col: 0, row: 0 })).toBe(false);
    });
  });

  describe("is valid place for ship", () => {
    test("can place where is water and no ships around", () => {
      let gameboard = new Gameboard();
      let ship = gameboard.ships[0];

      let coords = {
        col: 0,
        row: 0,
        vertical: false,
        orizontal: true,
      };

      expect(gameboard.isValidPlace(ship, coords)).toBe(true);
    });

    test("can't place where is another ship", () => {
      let gameboard = new Gameboard();
      let firstShip = gameboard.ships[0];

      gameboard.placeShip(firstShip, {
        col: 0,
        row: 0,
        vertical: false,
        orizontal: true,
      });

      let secondShip = gameboard.ships[1];

      let coords = {
        col: 0,
        row: 0,
        vertical: true,
        orizontal: false,
      };

      expect(gameboard.isValidPlace(secondShip, coords)).toBe(false);
    });

    test("can't place where near is another ship", () => {
      let gameboard = new Gameboard();
      let firstShip = gameboard.ships[0];

      gameboard.placeShip(firstShip, {
        col: 0,
        row: 0,
        vertical: false,
        orizontal: true,
      });

      let secondShip = gameboard.ships[1];

      let coords = {
        col: 0,
        row: 1,
        vertical: false,
        orizontal: true,
      };

      expect(gameboard.isValidPlace(secondShip, coords)).toBe(false);
    });
  });
});
