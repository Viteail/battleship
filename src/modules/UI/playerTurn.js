export const createCurrentPlayerTurn = () =>
  `<div id='player-turn' class='text-center min-w-[400px] p-10 text-3xl'>Player's Turn!</div>`;

export const updateCurrentPlayerTurn = (player) => {
  const playerTurn = document.querySelector("#player-turn");
  playerTurn.textContent = `${player}'s Turn!`;
};
