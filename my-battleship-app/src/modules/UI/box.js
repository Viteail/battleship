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
          "bg-slate-700",
        );
    }
  }
};
