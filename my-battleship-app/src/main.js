import "./styles.css";
import { createPageLayout } from "./modules/UI/pageLayout";
import { Player } from "./modules/player";
import { handleNewGameClick } from "./modules/events";
import { createMenu } from "./modules/UI/menu";

const startGame = () => {
  const shipPlacement = new Player();

  createPageLayout();
  createMenu();

  const newGameBtn = document.querySelector("#new-game");

  newGameBtn.addEventListener("click", () => handleNewGameClick(shipPlacement));
};

startGame();
