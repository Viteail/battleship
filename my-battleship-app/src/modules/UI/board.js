export const createPlayerBoard = () =>
  `<div>
     <div class='text-center'>Player's name gameboard</div>
     <div id='player-board' class='grid grid-cols-10 w-[480px] h-[480px] border border-black'>${generateBoxes()}</div>
     <div class='text-center'>Ships alive</div>
   </div>`;

export const createComputerBoard = () =>
  `<div>
     <div class='text-center'>Computer's gameboard</div>
     <div id='pc-board' class='grid grid-cols-10 w-[480px] h-[480px] border border-black'>${generateBoxes()}</div>
     <div class='text-center'>Ships alive</div>
   </div>`;
