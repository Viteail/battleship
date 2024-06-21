import { Player } from "./player";
import { drop, allowDrop } from "./events";
import { convertIndexToCoords } from "./utils";
import { appendShip } from "./UI/shipDisplay";

export const appendDropEvents = () => {
  const shipPlacement = new Player();

  const shipPlacementBoard = document.querySelector("#ship-placement-board");
  const boxes = Array.from(shipPlacementBoard.children);

  boxes.forEach((box) => {
    box.addEventListener("drop", (e) => drop(e, shipPlacement));
    box.addEventListener("dragover", (e) => allowDrop(e));
  });
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
  console.log(coords);

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
  console.log(shipElm);
};
