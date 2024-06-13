import { setBoxColor } from "./UI/box";

export const handleBoardClick = (e, board, computer) => {
  if (e.target === board) return;

  const boxes = Array.from(board.children);
  const boxIndex = boxes.indexOf(e.target);

  const coords = {
    col: isNaN(Number(("" + boxIndex)[1]))
      ? boxIndex
      : Number(("" + boxIndex)[1]),
    row: isNaN(Number(("" + boxIndex)[1])) ? 0 : Number(("" + boxIndex)[0]),
  };

  if (!computer.gameboard.hasBeenShot(coords)) {
    computer.gameboard.receiveAttack(coords);

    setBoxColor(
      boxes[boxIndex],
      computer.gameboard.board[coords.col][coords.row],
    );
  }
};
