import "./styles.css";
import { createPageLayout } from "./modules/UI/layout";
import { Player } from "./modules/player";
import { handleBoardClick } from "./modules/events";
import { showShips } from "./modules/UI/box";

const startGame = () => {
  const player = new Player();
  const computer = new Player();

  computer.gameboard.placeShip(computer.gameboard.ships[0], {
    col: 0,
    row: 0,
    vertical: true,
    orizontal: false,
  });

  computer.gameboard.placeShip(computer.gameboard.ships[1], {
    col: 2,
    row: 0,
    vertical: false,
    orizontal: true,
  });

  player.gameboard.placeShip(player.gameboard.ships[0], {
    col: 0,
    row: 0,
    vertical: true,
    orizontal: false,
  });

  player.gameboard.placeShip(player.gameboard.ships[1], {
    col: 2,
    row: 1,
    vertical: false,
    orizontal: true,
  });

  player.gameboard.placeShip(player.gameboard.ships[2], {
    col: 6,
    row: 0,
    vertical: false,
    orizontal: true,
  });

  player.gameboard.placeShip(player.gameboard.ships[3], {
    col: 2,
    row: 3,
    vertical: true,
    orizontal: false,
  });

  player.gameboard.placeShip(player.gameboard.ships[4], {
    col: 9,
    row: 2,
    vertical: true,
    orizontal: false,
  });

  player.gameboard.placeShip(player.gameboard.ships[5], {
    col: 2,
    row: 7,
    vertical: false,
    orizontal: true,
  });

  player.gameboard.placeShip(player.gameboard.ships[6], {
    col: 5,
    row: 3,
    vertical: true,
    orizontal: false,
  });

  player.gameboard.placeShip(player.gameboard.ships[7], {
    col: 7,
    row: 2,
    vertical: true,
    orizontal: false,
  });

  player.gameboard.placeShip(player.gameboard.ships[8], {
    col: 7,
    row: 4,
    vertical: true,
    orizontal: false,
  });

  player.gameboard.placeShip(player.gameboard.ships[9], {
    col: 6,
    row: 6,
    vertical: true,
    orizontal: false,
  });

  createPageLayout();

  const playerBoard = document.querySelector(".player-board");
  const enemyBoard = document.querySelector(".pc-board");

  showShips(playerBoard, player.gameboard);

  enemyBoard.addEventListener("click", (e) =>
    handleBoardClick({
      e: e,
      board: enemyBoard,
      computer: computer,
      player: player,
      playerBoard: playerBoard,
    }),
  );

  console.log(player.gameboard.board);
};

startGame();
