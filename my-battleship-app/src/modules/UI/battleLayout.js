import { generateBoxes } from "./box";
import { createCurrentPlayerTurn } from "./playerTurn";

export const createBattleLayout = (content) => {
  content.innerHTML = `
  <div>
    <div class='text-center'>Player's name gameboard</div>
    <div id='player-board' class='grid grid-cols-10 w-[25rem] h-[25rem] outline outline-1 outline-blue-200'>${generateBoxes()}</div>
    <div class='text-center'>Ships alive</div>
  </div>
  ${createCurrentPlayerTurn()}
  <div>
     <div class='text-center'>Computer's gameboard</div>
     <div id='pc-board' class='grid grid-cols-10 w-[25rem] h-[25rem] outline outline-1 outline-blue-200'>${generateBoxes()}</div>
     <div class='text-center'>Ships alive</div>
  </div>
`;
};
