const generateBoxes = () => {
  let boxes = "";

  for (let i = 0; i < 100; i++) {
    boxes += `<div class='box border border-black cursor-pointer hover:scale-110'></div>`;
  }

  return boxes;
};

export const createPageLayout = () => {
  const body = document.body;

  body.innerHTML = `
    <div class='flex flex-col h-full'>
      <div class='flex p-10 bg-blue-300'>
        <!-- header -->
        <div class='flex items-center'>Menu</div>
        <div class='flex-1 text-center text-6xl'>Battleship</div>
      </div>
      <div class='flex items-center justify-around flex-1 bg-gray-100'>
       <!-- content  -->
        <div>
          <div class='text-center'>Player's name gameboard</div>
          <div class='player-board grid grid-cols-10 w-[480px] h-[480px] border border-black'>${generateBoxes()}</div>
          <div class='text-center'>Ships alive</div>
        </div>
        <div class='text-center p-10 text-3xl'>Player's Move!</div>
        <div>
          <div class='text-center'>Computer's gameboard</div>
          <div class='pc-board grid grid-cols-10 w-[480px] h-[480px] border border-black'>${generateBoxes()}</div>
          <div class='text-center'>Ships alive</div>
        </div>
      </div>
    </div>
  `;
};
