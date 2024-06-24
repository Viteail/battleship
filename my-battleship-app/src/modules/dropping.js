import { drop, allowDrop } from "./events";
import { convertIndexToCoords, getShip, locateShipBox } from "./utils";
import { displayShip, removeShip } from "./UI/shipDisplay";

export const appendDropEvents = (shipPlacement) => {
  const shipPlacementElm = document.querySelector("#ship-placement-board");

  shipPlacementElm.addEventListener("drop", (e) => drop(e, shipPlacement));
  shipPlacementElm.addEventListener("dragover", (e) => allowDrop(e));
};

export const dropShip = (box, shipElm, shipPlacement, countElm) => {
  const shipPlacementElm = box.parentElement;
  const boxes = Array.from(shipPlacementElm.children);

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
    displayShip(box, ship, countElm.textContent[0], shipPlacement);

    countElm.textContent = `${countElm.textContent[0] - 1}x`;
  }

  console.log(shipPlacement.gameboard.board);
};

export const redropShip = (box, shipElm, shipPlacement) => {
  const shipPlacementElm = box.parentElement;
  const boxes = Array.from(shipPlacementElm.children);

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

    displayShip(box, ship, count, shipPlacement);

    console.log(shipPlacement.gameboard.board);
  } else
    shipPlacement.gameboard.placeShip(ship, {
      col: initialCoords.col,
      row: initialCoords.row,
      vertical: directionalCoords.vertical,
      orizontal: directionalCoords.orizontal,
    });
};
