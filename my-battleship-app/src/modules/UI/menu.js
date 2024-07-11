export const createMenu = () =>
  `
<div id='modal-menu' class='fixed w-full h-full top-0 left-0 flex justify-center items-center z-20 bg-slate-300 bg-opacity-0'>
  <div id='menu' class='flex flex-col items-center gap-10'>
    <div>
      <button id='new-game' class='text-3xl'>New Game</button>
    </div>
    <div>
      <button id='resume' class='text-2xl'>Resume</button>
    </div>
  </div>
</div>
`;

export const styleMenu = () => {
  const modal = document.querySelector("#modal-menu");
  const menu = document.querySelector("#menu");

  modal.classList.remove("bg-opacity-0");
  modal.classList.add("bg-opacity-80");

  menu.classList.add(
    "bg-white",
    "w-[400px]",
    "h-[350px]",
    "justify-center",
    "rounded-lg",
  );
};
