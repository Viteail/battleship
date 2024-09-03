const createHeader = () =>
  `<div class='flex p-10 bg-slate-300'>
        <!-- header -->
    <div class='flex'>
      <button id='menu-btn' class='flex items-center'>Menu</button>
    </div>
      <div class='flex-1 text-center text-6xl font-semibold'>Battleship</div>
   </div>`;

const createContent = () =>
  ` <div id='content' class='flex items-center justify-center gap-[100px] flex-1'>
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
