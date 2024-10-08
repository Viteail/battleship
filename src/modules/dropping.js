import { drop } from "./events";
import {
  convertCoordsToIndex,
  convertIndexToCoords,
  getShip,
  getShipElm,
  locateShipBox,
} from "./utils";
import { displayShip, removeShip } from "./UI/shipDisplay";
import { appendFlipEvent } from "./append";
import { appendDragEvent } from "./dragging";

export const appendDropEvents = (shipPlacement) => {
  const shipPlacementElm = document.querySelector("#ship-placement-board");

  shipPlacementElm.addEventListener("drop", (e) => drop(e, shipPlacement));
};

export const dropShip = (args) => {
  const { boxElm, shipElm, childElm, shipPlacement, countElm } = args;

  const shipPlacementElm = boxElm.parentElement;
  const boxes = Array.from(shipPlacementElm.children);

  const shipLength = shipElm.children.length;
  const ship = shipPlacement.gameboard.ships.find(
    (ship) => ship.length === shipLength && ship.position.length === 0,
  );

  if (!ship) return;

  const coords = convertIndexToCoords(boxes.indexOf(boxElm));
  const childIndex = Array.from(shipElm.children).indexOf(childElm);

  coords.col -= childIndex;

  const shipStartBoxIndex = convertCoordsToIndex(coords);

  if (
    shipPlacement.gameboard.isValidPlace(ship, {
      col: coords.col,
      row: coords.row,
      vertical: false,
      orizontal: true,
    })
  ) {
    shipPlacement.gameboard.placeShip(ship, coords);

    displayShip(
      shipStartBoxIndex,
      ship,
      countElm.textContent[0],
      shipPlacementElm,
    );

    appendDragEvent(getShipElm(shipPlacementElm, ship));
    appendFlipEvent(
      getShipElm(shipPlacementElm, ship),
      ship,
      shipPlacement,
      countElm.textContent[0],
    );

    countElm.textContent = `${countElm.textContent[0] - 1}x`;
  }
};

export const redropShip = (boxElm, shipElm, childElm, shipPlacement) => {
  const shipPlacementElm = document.querySelector("#ship-placement-board");
  const boxes = Array.from(shipPlacementElm.children);

  const initialBox = locateShipBox(boxes, shipElm);
  const initialCoords = convertIndexToCoords(boxes.indexOf(initialBox));

  const count = shipElm.id[shipElm.id.split("").length - 1];

  const ship = getShip(initialCoords, shipPlacement.gameboard.ships);

  const coords = convertIndexToCoords(boxes.indexOf(boxElm));

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

  const childIndex = Array.from(shipElm.children).indexOf(childElm);

  if (directionalCoords.vertical) directionalCoords.row -= childIndex;
  else directionalCoords.col -= childIndex;

  const shipStartBoxIndex = convertCoordsToIndex({
    col: directionalCoords.col,
    row: directionalCoords.row,
  });

  shipPlacement.gameboard.retrieveShip(
    {
      col: initialCoords.col,
      row: initialCoords.row,
      vertical: directionalCoords.vertical,
      orizontal: directionalCoords.orizontal,
    },
    ship,
  );

  if (shipPlacement.gameboard.isValidPlace(ship, directionalCoords)) {
    removeShip(initialBox, shipElm);

    shipPlacement.gameboard.placeShip(ship, directionalCoords);

    displayShip(shipStartBoxIndex, ship, count, shipPlacementElm);

    appendDragEvent(getShipElm(shipPlacementElm, ship));
    appendFlipEvent(
      getShipElm(shipPlacementElm, ship),
      ship,
      shipPlacement,
      count,
    );
  } else {
    shipPlacement.gameboard.placeShip(ship, {
      col: initialCoords.col,
      row: initialCoords.row,
      vertical: directionalCoords.vertical,
      orizontal: directionalCoords.orizontal,
    });
  }
};
