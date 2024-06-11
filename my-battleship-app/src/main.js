import "./styles.css";
import { createPageLayout } from "./modules/layout";
import { Player } from "./modules/player";
import { handleBoardClick } from "./modules/events";

const startGame = () => {
  const player = new Player();
  const computer = new Player();

  computer.gameboard.placeShip(computer.gameboard.ships[0], {
    col: 0,
    row: 0,
    vertical: true,
    orizontal: false,
  });

  createPageLayout();

  const enemyBoard = document.querySelector(".pc-board");
  enemyBoard.addEventListener("click", (e) =>
    handleBoardClick(e, enemyBoard, computer),
  );
};

startGame();
