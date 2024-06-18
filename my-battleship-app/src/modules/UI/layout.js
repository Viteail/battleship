const createHeader = () =>
  `<div class='flex p-10 bg-blue-300'>
        <!-- header -->
        <div class='flex items-center'>Menu</div>
        <div class='flex-1 text-center text-6xl'>Battleship</div>
   </div>`;

const createContent = () =>
  ` <div id='content' class='flex items-center justify-around flex-1'>
       <!-- content  -->
    </div>`;

export const createPageLayout = () => {
  const body = document.body;

  body.innerHTML = `
    <div class='flex flex-col h-full'>
      ${createHeader()}
      ${createContent()}
    </div>
  `;
};
