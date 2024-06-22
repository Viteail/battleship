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

export const showShips = (boardElement, gameboard) => {
  for (let row = 0; row < gameboard.board.length; row++) {
    for (let col = 0; col < gameboard.board.length; col++) {
      if (gameboard.board[row][col] === "s")
        Array.from(boardElement.children)[Number("" + row + col)].classList.add(
          "bg-slate-700 border-4 border-slate-500",
        );
    }
  }
};
