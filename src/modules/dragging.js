const allowDrop = (e) => {
  e.preventDefault();
};

const dragEnter = (e) => {
  const dataTypes = e.dataTransfer.types;

  if (dataTypes[1] === "parent-id") e.target.classList.add("bg-slate-300");
};

const dragLeave = (e) => {
  e.target.classList.remove("bg-slate-300");
};

export const appendDragEvent = (elm) => {
  const shipPlacementElm = document.querySelector("#ship-placement-board");

  elm.draggable = true;
  elm.classList.add("draggable-ship");

  elm.addEventListener("dragstart", (e) => {
    const { clientX, clientY } = e;
    const elementAtPoint = document.elementFromPoint(clientX, clientY);

    e.dataTransfer.setData("parent-id", e.target.id);
    e.dataTransfer.setData("child-id", elementAtPoint.id);

    shipPlacementElm.addEventListener("dragenter", (e) => dragEnter(e));
    shipPlacementElm.addEventListener("dragleave", (e) => dragLeave(e));
  });
};

export const appendDragEvents = () => {
  const shipPlacementElm = document.querySelector("#ship-placement-board");

  shipPlacementElm.addEventListener("dragover", (e) => allowDrop(e));
  shipPlacementElm.addEventListener("dragenter", (e) => dragEnter(e));
  shipPlacementElm.addEventListener("dragleave", (e) => dragLeave(e));

  const draggableShips = document.querySelectorAll(".draggable-ship");
  draggableShips.forEach((draggableShip) => appendDragEvent(draggableShip));
};
