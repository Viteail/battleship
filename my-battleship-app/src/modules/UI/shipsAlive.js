export const createShipsAlive = (player) => `
     <div class='text-center text-lg'>Ships alive <span id='${player}-ships-alive'>10</span></div>`;

export const updateShipsAlive = (player) => {
  const shipsAliveText = document.querySelector(
    `#${player.toLowerCase()}-ships-alive`,
  );
  console.log(shipsAliveText);

  shipsAliveText.textContent = Number(shipsAliveText.textContent) - 1;
};
