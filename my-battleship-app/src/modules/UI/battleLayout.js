import { generateBoxes } from "./box";
import { createCurrentPlayerTurn } from "./playerTurn";
import { createShipsAlive } from "./shipsAlive";

export const createBattleLayout = (content) => {
  content.innerHTML = `
  <div class='flex flex-col gap-5'>
    <div class='text-center text-2xl'>Player's gameboard</div>
    <div id='player-board' class='grid grid-cols-10 w-[25rem] h-[25rem] outline outline-1 outline-slate-400'>${generateBoxes()}</div>
    ${createShipsAlive("player")}
  </div>
  ${createCurrentPlayerTurn()}
  <div class='flex flex-col gap-5'>
     <div class='text-center text-2xl'>Computer's gameboard</div>
     <div id='pc-board' class='grid grid-cols-10 w-[25rem] h-[25rem] outline outline-1 outline-slate-400'>${generateBoxes()}</div>
    ${createShipsAlive("computer")}
  </div>
`;
};
