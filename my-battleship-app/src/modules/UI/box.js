export const generateBoxes = () => {
  let boxes = "";

  for (let i = 0; i < 100; i++) {
    boxes += `<div class='border border-blue-200 border cursor-pointer hover:bg-sky-100'></div>`;
  }

  return boxes;
};

export const setBoxColor = (box, board) => {
  box.classList.remove("bg-slate-700");
  board === "x"
    ? box.classList.add("bg-red-500")
    : box.classList.add("bg-sky-300");

  box.classList.remove("hover:bg-sky-100");
};
