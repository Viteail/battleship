export const setBoxColor = (box, board) => {
  board === "x"
    ? box.classList.add("bg-red-500")
    : box.classList.add("bg-sky-300");
};
