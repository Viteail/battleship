export const convertIndexToCoords = (index) => ({
  col: ("" + index).length === 1 ? index : Number(("" + index)[1]),
  row: ("" + index).length === 1 ? 0 : Number(("" + index)[0]),
});

export const getRandomNumber = (max) => Math.floor(Math.random() * max);

export const getShip = (coords, ships) => {
  for (let i = 0; i < ships.length; i++) {
    for (let j = 0; j < ships[i].position.length; j++) {
      if (
        ships[i].position[j].col === coords.col &&
        ships[i].position[j].row === coords.row
      )
        return ships[i];
    }
  }
};

export const isOutOfBoard = ({ col, row }) =>
  col < 0 || col > 9 || row < 0 || row > 9;

export const locateShipBox = (boxes, shipElm) => {
  for (let i = 0; i < boxes.length; i++)
    if (boxes[i].firstElementChild === shipElm) return boxes[i];
};
