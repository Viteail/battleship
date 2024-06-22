import { Player } from "./player";
import { drop, allowDrop } from "./events";
import { convertIndexToCoords, getShip, locateShipBox } from "./utils";
import { appendShip, removeShip } from "./UI/shipDisplay";

export const appendDropEvents = () => {
  const shipPlacement = new Player();

  const shipPlacementBoard = document.querySelector("#ship-placement-board");

  shipPlacementBoard.addEventListener("drop", (e) => drop(e, shipPlacement));
  shipPlacementBoard.addEventListener("dragover", (e) => allowDrop(e));
};

export const dropShip = (box, shipElm, shipPlacement, countElm) => {
  const shipPlacementBoard = box.parentElement;
  const boxes = Array.from(shipPlacementBoard.children);

  const shipLength = shipElm.children.length;
  const ship = shipPlacement.gameboard.ships.find(
    (ship) => ship.length === shipLength && ship.position.length === 0,
  );

  if (!ship) return;

  const coords = convertIndexToCoords(boxes.indexOf(box));

  if (
    shipPlacement.gameboard.isValidPlace(ship, {
      col: coords.col,
      row: coords.row,
      vertical: false,
      orizontal: true,
    })
  ) {
    shipPlacement.gameboard.placeShip(ship, coords);
    appendShip(box, ship, countElm.textContent[0]);

    countElm.textContent = `${countElm.textContent[0] - 1}x`;
  }

  console.log(shipPlacement.gameboard.board);
};

export const redropShip = (box, shipElm, shipPlacement) => {
  const shipPlacementBoard = box.parentElement;
  const boxes = Array.from(shipPlacementBoard.children);

  const initialBox = locateShipBox(boxes, shipElm);
  const initialCoords = convertIndexToCoords(boxes.indexOf(initialBox));

  const count = shipElm.id[shipElm.id.split("").length - 1];

  const ship = getShip(initialCoords, shipPlacement.gameboard.ships);

  const coords = convertIndexToCoords(boxes.indexOf(box));

  const directionalCoords = {
    col: coords.col,
    row: coords.row,
    vertical:
      ship.position.length === 1 ||
      ship.position[0].row !== ship.position[1].row
        ? true
        : false,
    orizontal:
      ship.position.length > 1 && ship.position[0].col !== ship.position[1].col
        ? true
        : false,
  };

  shipPlacement.gameboard.retrieveShip(initialCoords, ship);

  if (shipPlacement.gameboard.isValidPlace(ship, directionalCoords)) {
    removeShip(initialBox, shipElm);

    shipPlacement.gameboard.placeShip(ship, coords);

    appendShip(box, ship, count);

    console.log(shipPlacement.gameboard.board);
  } else shipPlacement.gameboard.placeShip(ship, initialCoords);
};
