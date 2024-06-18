import { setBoxColor } from "./UI/box";
import { convertIndexToCoords } from "./utils";
import { createShipPlacementBoard } from "./UI/shipPlacementBoard";

export const handleBoardClick = (args) => {
  const { e, board, computer, player, playerBoard } = args;
  if (e.target === board) return;

  const boxes = Array.from(board.children);
  const boxIndex = boxes.indexOf(e.target);

  const coords = convertIndexToCoords(boxIndex);

  if (!computer.gameboard.hasBeenShot(coords)) {
    computer.gameboard.receiveAttack(coords);

    setBoxColor(
      boxes[boxIndex],
      computer.gameboard.board[coords.row][coords.col],
    );

    if (computer.gameboard.board[coords.row][coords.col] === "x") return;

    computer.attackRandomSpot(player.gameboard, playerBoard);
  }
};

export const handleNewGameClick = () => {
  const content = document.querySelector("#content");
  content.innerHTML = `${createShipPlacementBoard()}`;
};
