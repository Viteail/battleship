import { generateBoxes } from "./box";

export const createBattleLayout = (content) => {
  content.innerHTML = `
  <div>
    <div class='text-center'>Player's name gameboard</div>
    <div id='player-board' class='grid grid-cols-10 w-[25rem] h-[25rem] border border-black'>${generateBoxes()}</div>
    <div class='text-center'>Ships alive</div>
  </div>
  <div class='text-center p-10 text-3xl'>Player's Move!</div>
  <div>
     <div class='text-center'>Computer's gameboard</div>
     <div id='pc-board' class='grid grid-cols-10 w-[25rem] h-[25rem] border border-black'>${generateBoxes()}</div>
     <div class='text-center'>Ships alive</div>
  </div>
`;
};
