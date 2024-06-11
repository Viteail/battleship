export const handleBoardClick = (e, board, computer) => {
  const elements = Array.from(board.children);
  const elementIndex = elements.indexOf(e.target);

  const coords = {
    col: isNaN(Number(("" + elementIndex)[1]))
      ? elementIndex
      : Number(("" + elementIndex)[1]),
    row: isNaN(Number(("" + elementIndex)[1]))
      ? 0
      : Number(("" + elementIndex)[0]),
  };

  computer.gameboard.receiveAttack(coords);
  if (computer.gameboard.board[coords.col][coords.row] === "x")
    elements[elementIndex].classList.add("bg-red-400");
  else elements[elementIndex].classList.add("bg-sky-400");
  console.log(coords.col, coords.row);
  console.log(computer.gameboard.board[coords.col][coords.row]);
};
