import { displayShips } from "./UI/shipDisplay";
import { resetBoard } from "./events";

export const appendRandomEvent = (shipPlacement) => {
  const randomBtn = document.querySelector("#random");

  randomBtn.addEventListener("click", () => {
    resetBoard(shipPlacement);
    shipPlacement.gameboard.randomShipPlacement();
    displayShips(shipPlacement);
  });
};
