import { generateBoxes } from "./box";

export const createShipPlacementBoard = (content) => {
  content.innerHTML = `
    <div class='flex gap-20'>
      <div class='flex flex-col gap-10'>
        <div>
          <div id='ship-placement-board' class='grid grid-cols-10 w-[480px] h-[480px] border border-black'>${generateBoxes()}</div>
        </div>
        <div class='flex gap-20'>
          <div class='flex justify-center w-full'><button id='random' class='text-2xl select-none'>Random</button></div>
          <div class='flex justify-center w-full'><button id='reset' class='text-2xl select-none'>Reset</button></div>
        </div>
      </div>

      <div class='flex flex-col gap-10'>
        <div class='flex flex-col gap-5 h-full'>
          <!-- 4l container -->
        <div class='flex gap-2'>
          <div id="l4" class='draggable-ship flex cursor-pointer' draggable="true">
            <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
            <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
            <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
            <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
          </div>
            <div id="l4-count" class='flex items-center'>1x</div>
          </div>
          <!-- 3l container -->
          <div class='flex gap-2'>
            <div id="l3" class='draggable-ship flex cursor-pointer' draggable="true">
              <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
              <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
              <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
            </div>
            <div id='l3-count' class='flex items-center'>2x</div>
          </div>
          <!-- 2l container -->
          <div class='flex gap-2'>
            <div id="l2" class='draggable-ship flex cursor-pointer' draggable="true">
              <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
              <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
            </div>
            <div id='l2-count' class='flex items-center'>3x</div>
          </div>
          <!-- 1l container -->
          <div class='flex gap-2'>
            <div id="l1" class='draggable-ship flex cursor-pointer' draggable="true">
              <div class='w-12 h-12 bg-slate-700 border-4 border-slate-500'></div>
            </div>
            <div id='l1-count' class='flex items-center'>4x</div>
          </div>
        </div>

        <div><button id='start' class='text-2xl select-none'>To Battle</button></div>
      </div>
    </div>
`;
};
