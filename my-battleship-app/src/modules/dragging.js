import { drag } from "./events";

export const appendDragEvent = (elm) => {
  elm.draggable = "true";
  elm.classList.add("draggable-ship");

  elm.addEventListener("dragstart", (e) => {
    console.log(elm, e.target);
    //
    // const preview = elm.cloneNode(true);
    // preview.style.width = `${elm.offsetWidth}px`;
    // preview.style.height = `${elm.offsetHeight + 4}px`;
    // preview.style.border = "2px solid blue";
    //
    // document.body.appendChild(preview);
    // e.dataTransfer.setDragImage(preview, 0, 0);
    // if (!elm.classList.contains("draggable-ship")) {
    //   e.preventDefault();
    // }
    drag(e);
  });
};

export const appendDragEvents = () => {
  const draggableShips = document.querySelectorAll(".draggable-ship");
  draggableShips.forEach((draggableShip) => appendDragEvent(draggableShip));
};
