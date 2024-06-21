import { appendDragEvent } from "../dragging";

export const appendShip = (boxElm, ship, count) => {
  let parts = "";

  for (let i = 0; i < ship.length; i++)
    parts += `<div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>`;
  console.log(boxElm);

  boxElm.innerHTML = `
    <div id='l${ship.length}-${count}' class='flex absolute cursor-pointer' draggable=true>
      ${parts}
    </div>
`;

  const shipElm = document.querySelector(`#l${ship.length}-${count}`);
  appendDragEvent(shipElm);
};
