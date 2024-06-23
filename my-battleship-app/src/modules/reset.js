import { resetBoard } from "./events";

export const appendResetEvent = (shipPlacement) => {
  const resetBtn = document.querySelector("#reset");

  resetBtn.addEventListener("click", () => resetBoard(shipPlacement));
};
