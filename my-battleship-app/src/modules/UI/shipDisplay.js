import { appendDragEvent } from "../dragging";
import { handleFlipDirection } from "../events";

export const appendShip = (boxElm, ship, count, shipPlacement) => {
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
    <div id='l${ship.length}-${count}' class='flex absolute cursor-pointer' draggable=true>
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

export const removeShip = (boxElm, shipElm) => {
  boxElm.removeChild(shipElm);
};
