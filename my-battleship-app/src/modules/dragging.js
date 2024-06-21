import { drag } from "./events";

export const appendDragEvent = (elm) => {
  elm.addEventListener("dragstart", (e) => drag(e));
};

export const appendDragEvents = () => {
  const draggableShips = document.querySelectorAll(".draggable-ship");
  draggableShips.forEach((draggableShip) => appendDragEvent(draggableShip));
};
