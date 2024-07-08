import "./styles.css";
import { createPageLayout } from "./modules/UI/pageLayout";
import { Player } from "./modules/player";
import { createMenu } from "./modules/UI/menu";
import { appendNewGameEvent } from "./modules/append";

export const startGame = () => {
  const shipPlacement = new Player();

  createMenu();
  appendNewGameEvent(shipPlacement);
};

createPageLayout();
startGame();
