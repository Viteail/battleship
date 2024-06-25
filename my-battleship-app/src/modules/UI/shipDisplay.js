import { appendDragEvent } from "../dragging";
import { handleFlipDirection } from "../events";
import { convertCoordsToIndex } from "../utils";

export const displayShip = (boxElm, ship, count, shipPlacement) => {
  const directions = {
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

  let parts = "";

  for (let i = 0; i < ship.length; i++)
    parts += `<div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>`;

  boxElm.innerHTML = `
    <div id='l${ship.length}-${count}' class='draggable-ship flex absolute cursor-pointer' draggable=true>
      ${parts}
    </div>
`;

  const shipElm = document.querySelector(`#l${ship.length}-${count}`);
  if (directions.vertical) shipElm.classList.add("flex-col");
  else shipElm.classList.remove("flex-col");

  appendDragEvent(shipElm);
  shipElm.addEventListener("click", (e) =>
    handleFlipDirection(e.target.parentElement, ship, shipPlacement, count),
  );
};

export const displayShips = (shipPlacement) => {
  const shipPlacementElm = document.querySelector("#ship-placement-board");
  const boxes = Array.from(shipPlacementElm.children);
  const ships = shipPlacement.gameboard.ships;

  for (let i = 0; i < ships.length; i++) {
    const boxElm = boxes[convertCoordsToIndex(ships[i].position[0])];

    const sameLengthShips = ships.filter(
      (ship) => ship.length === ships[i].length,
    );

    const count = sameLengthShips.length - sameLengthShips.indexOf(ships[i]);

    const countElm = document.querySelector(`#l${count}-count`);
    countElm.textContent = "0x";

    displayShip(boxElm, ships[i], count, shipPlacement);
  }
};

export const removeShip = (boxElm, shipElm) => {
  boxElm.removeChild(shipElm);
};
