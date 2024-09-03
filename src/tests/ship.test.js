import { describe, test, expect } from "vitest";
import { Ship } from "../modules/ship";

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
