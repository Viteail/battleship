import "./styles.css";
import { createPageLayout } from "./modules/layout";
import { Player } from "./modules/player";

createPageLayout();

const player = new Player();
const computer = new Player();
