import { convertCoordsToIndex } from "../utils";

export const displayShip = (boxElm, ship, count) => {
  const vertical =
    ship.position.length > 1 && ship.position[0].row !== ship.position[1].row
      ? true
      : false;

  console.log(ship, vertical);

  let parts = "";

  for (let i = 0; i < ship.length; i++)
    parts += `<div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>`;

  boxElm.innerHTML = `
    <div id='l${ship.length}-${count}' class='flex absolute cursor-pointer' draggable=true>
      ${parts}
    </div>
`;

  const shipElm = document.querySelector(`#l${ship.length}-${count}`);
  if (vertical) shipElm.classList.add("flex-col");
  else shipElm.classList.remove("flex-col");
};

export const displayShips = (player, boardElm) => {
  const boxes = Array.from(boardElm.children);
  const ships = player.gameboard.ships;

  for (let i = 0; i < ships.length; i++) {
    const boxElm = boxes[convertCoordsToIndex(ships[i].position[0])];

    const sameLengthShips = ships.filter(
      (ship) => ship.length === ships[i].length,
    );

    const count = sameLengthShips.length - sameLengthShips.indexOf(ships[i]);

    displayShip(boxElm, ships[i], count);
  }
};

export const removeShip = (boxElm, shipElm) => {
  boxElm.removeChild(shipElm);
};

export const generateParts = (length) => {
  let parts = "";

  for (let i = 0; i < length; i++) {
    parts += `<div id='l${length}-child-${i}' class='w-11 h-11'></div>`;
  }

  return parts;
};
