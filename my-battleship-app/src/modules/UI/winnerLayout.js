import { appendPlayAgainEvent } from "../append";

export const createWinnerLayout = (player) => {
  const body = document.body;

  body.innerHTML += `
    <div id='modal' class='fixed w-full h-full top-0 left-0 flex justify-center items-center z-20 bg-slate-300 bg-opacity-50'>
      <div id='modal-content' class='flex justify-center items-center flex-col bg-white min-w-[600px] min-h-[300px] gap-10 rounded-lg'>
        <div class='text-3xl'>${player} Won!</div>
        <div><button id='play-again' class='text-xl'>Play again</button></div>
      </div>
    </div>
`;

  appendPlayAgainEvent();
};

export const removeWinnerLayout = () => {
  const modal = document.querySelector("#modal");

  modal.parentElement.removeChild(modal);
};
