import { convertCoordsToIndex } from "../utils";

export const displayShip = (boxIndex, ship, count, boardElm) => {
  const boxes = Array.from(boardElm.children);

  const vertical =
    ship.position.length > 1 && ship.position[0].row !== ship.position[1].row
      ? true
      : false;

  let parts = "";

  for (let i = 0; i < ship.length; i++) {
    parts += `
      <div id='l${ship.length}-${count}-${i}' class='w-[2.47rem] h-[2.47rem]'></div>
    `;
  }

  boxes[boxIndex].innerHTML = `
    <div id='l${ship.length}-${count}' class='absolute flex cursor-pointer outline outline-2 outline-blue-600 bg-blue-100 bg-opacity-50 z-10'>
      ${parts}
    </div> 
  `;

  const shipStartPart = document.querySelector(`#l${ship.length}-${count}`);

  if (vertical) {
    shipStartPart.classList.add("flex-col");
  } else shipStartPart.classList.remove("flex-col");
};

export const displayShips = (player, boardElm) => {
  const boxes = Array.from(boardElm.children);
  const ships = player.gameboard.ships;

  for (let i = 0; i < ships.length; i++) {
    const boxIndex = convertCoordsToIndex(ships[i].position[0]);

    const sameLengthShips = ships.filter(
      (ship) => ship.length === ships[i].length,
    );

    const count = sameLengthShips.length - sameLengthShips.indexOf(ships[i]);

    displayShip(boxIndex, ships[i], count, boardElm);
  }
};

export const removeShip = (boxElm, shipElm) => {
  boxElm.removeChild(shipElm);
};

export const generateParts = (length) => {
  let parts = "";

  for (let i = 0; i < length; i++) {
    parts += `<div id='l${length}-child-${i}' class='w-10 h-10'></div>`;
  }

  return parts;
};
