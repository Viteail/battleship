export const generateBoxes = () => {
  let boxes = "";

  for (let i = 0; i < 100; i++) {
    boxes += `<div class='border border-black cursor-pointer hover:bg-gray-200'></div>`;
  }

  return boxes;
};

export const setBoxColor = (box, board) => {
  box.classList.remove("bg-slate-700");
  board === "x"
    ? box.classList.add("bg-red-500")
    : box.classList.add("bg-sky-300");
};
