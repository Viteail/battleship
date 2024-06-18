export const createMenu = () => {
  const content = document.querySelector("#content");

  content.innerHTML = `
<div id='menu' class='flex flex-col items-center gap-10'>
    <div>
      <button id='new-game' class='text-3xl'>New Game</button>
    </div>
    <div>
      <button id='resume' class='text-2xl'>Resume</button>
    </div>
</div>
`;
};
