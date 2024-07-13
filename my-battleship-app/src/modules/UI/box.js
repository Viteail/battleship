import { convertCoordsToIndex, isOutOfBoard } from "../utils";

export const generateBoxes = () => {
  let boxes = "";

  for (let i = 0; i < 100; i++) {
    boxes += `<div class='outline outline-1 outline-slate-300 cursor-pointer hover:bg-sky-100'></div>`;
  }

  return boxes;
};

export const setBoxColor = (boxElm, box) => {
  boxElm.classList.remove("bg-slate-700");
  boxElm.classList.add(box === "x" ? "bg-red-500" : "bg-sky-300");

  boxElm.classList.remove("hover:bg-sky-100");
};

export const updateMultipleBoxes = (coords, boxes, board) => {
  for (let i = 0; i < coords.length; i++) {
    if (!isOutOfBoard(coords[i]))
      setBoxColor(
        boxes[convertCoordsToIndex(coords[i])],
        board[coords[i].row][coords[i].col],
      );
  }
};
