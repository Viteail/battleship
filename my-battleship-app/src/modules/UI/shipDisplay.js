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
      <div id='l${ship.length}-${count}-${i}' class='w-10 h-10 border border-sky-200 bg-blue-50'></div>
    `;
  }

  const boxElm = boxes[boxIndex];
  const verticalClass = vertical ? "flex-col" : "";

  boxElm.classList.remove("hover:bg-slate-100");

  boxElm.innerHTML = `
    <div id='l${ship.length}-${count}' class='absolute flex ${verticalClass} mt-[-1px] ml-[-1px] outline outline-2 outline-blue-600 z-10'>
      ${parts}
    </div> 
  `;
};

export const displayShips = (player, boardElm) => {
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

export const displayDestroyedShip = (boardElm, ship) => {
  const vertical =
    ship.position.length > 1 && ship.position[0].row !== ship.position[1].row
      ? true
      : false;

  let parts = "";

  for (let i = 0; i < ship.length; i++) {
    parts += '<div class="w-10 h-10 border border-sky-200 bg-red-600"></div>';
  }

  const boxElm = boardElm.children[convertCoordsToIndex(ship.position[0])];
  const verticalClass = vertical ? "flex-col" : "";

  boxElm.innerHTML = `
  <div class='absolute flex ${verticalClass} mt-[-1px] ml-[-1px] outline outline-2 outline-red-800 z-10'>
    ${parts}
  </div>  
`;
};
