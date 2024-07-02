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
        if (gameboard.board[spots[i].row][spots[i].col] !== "s") return false;
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
    expect(gameboard.board[0][1]).toBe("o");
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
    gameboard.receiveAttack({ col: 0, row: 1 });
    gameboard.receiveAttack({ col: 0, row: 2 });
    gameboard.receiveAttack({ col: 0, row: 3 });

    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  describe("if sunk, around boxes to be 0", () => {
    test("ship l4, orizontal", () => {
      let gameboard = new Gameboard();
      let ship = gameboard.ships[0];

      gameboard.placeShip(ship, {
        col: 1,
        row: 0,
        vertical: false,
        orizontal: true,
      });

      gameboard.receiveAttack({ col: 1, row: 0 });
      gameboard.receiveAttack({ col: 2, row: 0 });
      gameboard.receiveAttack({ col: 3, row: 0 });
      gameboard.receiveAttack({ col: 4, row: 0 });

      let spots = [
        { col: 0, row: 0 },
        { col: 0, row: 1 },
        { col: 1, row: 1 },
        { col: 2, row: 1 },
        { col: 3, row: 1 },
        { col: 4, row: 1 },
        { col: 5, row: 1 },
        { col: 5, row: 0 },
      ];

      expect(
        spots.every((spot) => gameboard.board[spot.row][spot.col] === "o"),
      ).toBe(true);
    });

    test("ship l2, vertical", () => {
      let gameboard = new Gameboard();
      let ship = gameboard.ships[1];

      gameboard.placeShip(ship, {
        col: 2,
        row: 3,
        vertical: true,
        orizontal: false,
      });

      gameboard.receiveAttack({ col: 2, row: 3 });
      gameboard.receiveAttack({ col: 2, row: 4 });
      gameboard.receiveAttack({ col: 2, row: 5 });

      let spots = [
        { col: 2, row: 2 },
        { col: 1, row: 2 },
        { col: 1, row: 3 },
        { col: 1, row: 4 },
        { col: 1, row: 5 },
        { col: 1, row: 6 },
        { col: 2, row: 6 },
        { col: 3, row: 2 },
        { col: 3, row: 3 },
        { col: 3, row: 4 },
        { col: 3, row: 5 },
        { col: 3, row: 6 },
      ];

      expect(
        spots.every((spot) => gameboard.board[spot.row][spot.col] === "o"),
      ).toBe(true);
    });
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

    test("can't place out of the board", () => {
      let gameboard = new Gameboard();
      let ship = gameboard.ships[0];

      expect(
        gameboard.isValidPlace(ship, {
          col: 8,
          row: 0,
          vertical: false,
          orizontal: true,
        }),
      ).toBe(false);
    });

    test("can't place near ships #2", () => {
      let gameboard = new Gameboard();

      let firstShip = gameboard.ships[0];
      let secondShip = gameboard.ships[8];

      gameboard.placeShip(secondShip, {
        col: 9,
        row: 0,
        vertical: true,
        orizontal: false,
      });

      expect(
        gameboard.isValidPlace(firstShip, {
          col: 6,
          row: 0,
          vertical: false,
          orizontal: true,
        }),
      ).toBe(false);
    });

    test("can't place on ship", () => {
      let gameboard = new Gameboard();

      let firstShip = gameboard.ships[0];
      let secondShip = gameboard.ships[8];

      gameboard.placeShip(firstShip, {
        col: 3,
        row: 0,
        vertical: false,
        orizontal: true,
      });

      expect(
        gameboard.isValidPlace(secondShip, {
          col: 3,
          row: 0,
          vertical: true,
          orizontal: false,
        }),
      ).toBe(false);
    });
  });

  describe("retrieve ship", () => {
    test("retrive 4 length ship on orizontal", () => {
      let gameboard = new Gameboard();

      let ship = gameboard.ships[0];

      let coords = {
        col: 0,
        row: 0,
        vertical: false,
        orizontal: true,
      };

      let spots = [
        { col: 0, row: 0 },
        { col: 1, row: 0 },
        { col: 2, row: 0 },
        { col: 3, row: 0 },
      ];

      gameboard.placeShip(ship, coords);

      gameboard.retrieveShip(coords, ship);

      expect(spots.every((c) => gameboard.board[c.row][c.col] === ".")).toBe(
        true,
      );
    });

    test("retrieve 4 length ship on vertical", () => {
      let gameboard = new Gameboard();

      let ship = gameboard.ships[0];

      let coords = {
        col: 0,
        row: 0,
        vertical: true,
        orizontal: false,
      };

      let spots = [
        { col: 0, row: 0 },
        { col: 0, row: 1 },
        { col: 0, row: 2 },
        { col: 0, row: 3 },
      ];

      gameboard.placeShip(ship, coords);

      gameboard.retrieveShip(coords, ship);

      expect(spots.every((c) => gameboard.board[c.row][c.col] === ".")).toBe(
        true,
      );
    });

    test("retrieve 1 length ship", () => {
      let gameboard = new Gameboard();

      let ship = gameboard.ships[8];

      let coords = {
        col: 0,
        row: 0,
        vertical: true,
        orizontal: false,
      };

      gameboard.placeShip(ship, coords);

      gameboard.retrieveShip(coords, ship);

      expect(gameboard.board[0][0] === ".").toBe(true);
    });

    test("retrieve 3 length ship and place to a new position", () => {
      let gameboard = new Gameboard();

      let ship = gameboard.ships[1];

      let coords = {
        col: 0,
        row: 0,
        vertical: true,
        orizontal: false,
      };

      gameboard.placeShip(ship, coords);

      gameboard.retrieveShip(coords, ship);

      let newCoords = {
        col: 1,
        row: 0,
        vertical: true,
        orizontal: false,
      };

      let spots = [
        { col: 1, row: 0 },
        { col: 1, row: 1 },
        { col: 1, row: 2 },
      ];

      gameboard.placeShip(ship, newCoords);

      expect(
        ship.position.every(
          (c, i) => c.row === spots[i].row && c.col === spots[i].col,
        ),
      ).toBe(true);
    });
  });

  describe("gameboard reset", () => {
    test("with 1 ship", () => {
      let gameboard = new Gameboard();

      let ship = gameboard.ships[8];

      gameboard.placeShip(ship, {
        col: 6,
        row: 0,
        vertical: true,
        orizontal: false,
      });

      gameboard.reset();

      expect(gameboard.ships.every((s) => s.position.length === 0)).toBe(true);
    });

    test("with 2 ships", () => {
      let gameboard = new Gameboard();

      let firstShip = gameboard.ships[0];
      let secondShip = gameboard.ships[1];

      gameboard.placeShip(firstShip, {
        col: 0,
        row: 0,
        vertical: false,
        orizontal: true,
      });
      gameboard.placeShip(secondShip, {
        col: 0,
        row: 2,
        vertical: true,
        orizontal: false,
      });

      gameboard.reset();

      expect(gameboard.ships.every((ship) => ship.position.length === 0)).toBe(
        true,
      );
    });

    test("board should be empty", () => {
      let gameboard = new Gameboard();

      let firstShip = gameboard.ships[0];
      let secondShip = gameboard.ships[1];

      gameboard.placeShip(firstShip, {
        col: 0,
        row: 0,
        vertical: false,
        orizontal: true,
      });
      gameboard.placeShip(secondShip, {
        col: 0,
        row: 2,
        vertical: true,
        orizontal: false,
      });

      gameboard.reset();

      expect(
        gameboard.board.every((row) => row.every((col) => col === ".")),
      ).toBe(true);
    });
  });
});
