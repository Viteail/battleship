import { generateBoxes } from "./box";
import { generateParts } from "./shipDisplay";

export const createShipPlacementBoard = (content) => {
  content.innerHTML = `
    <div class='flex gap-20'>
      <div class='flex flex-col gap-10'>
        <div>
          <div id='ship-placement-board' class='grid grid-cols-10 w-[440px] h-[440px] border border-blue-400'>${generateBoxes()}</div>
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
          <div id="l4" class='draggable-ship flex cursor-pointer border-2 border-blue-600 bg-blue-100' draggable="true">
              ${generateParts(4)}
          </div>
            <div id="l4-count" class='flex items-center'>1x</div>
          </div>
          <!-- 3l container -->
          <div class='flex gap-2'>
            <div id="l3" class='draggable-ship flex cursor-pointer border-2 border-blue-600 bg-blue-100' draggable="true">
              ${generateParts(3)}
            </div>
            <div id='l3-count' class='flex items-center'>2x</div>
          </div>
          <!-- 2l container -->
          <div class='flex gap-2'>
            <div id="l2" class='draggable-ship flex cursor-pointer border-2 border-blue-600 bg-blue-100' draggable="true">
              ${generateParts(2)}
            </div>
            <div id='l2-count' class='flex items-center'>3x</div>
          </div>
          <!-- 1l container -->
          <div class='flex gap-2'>
            <div id="l1" class='draggable-ship flex cursor-pointer border-2 border-blue-600 bg-blue-100' draggable="true">
              ${generateParts(1)}
            </div>
            <div id='l1-count' class='flex items-center'>4x</div>
          </div>
        </div>

        <div><button id='start' class='text-2xl select-none'>To Battle</button></div>
      </div>
    </div>
`;
};
