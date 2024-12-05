// problem https://adventofcode.com/2024/day/4

const fs = require('fs');
const readline = require('readline');

const TARGET_WORD = 'XMAS';

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');
  const letterGrid = [];
  let foundWords = 0;

  const wordSearch = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  for await (const line of wordSearch) {
    const lineLetters = line.split('');
    letterGrid.push(lineLetters);

    // console.log(JSON.stringify(lineLetters));
  }

  for (let i = 0; i < letterGrid.length; i++) {
    for (let j = 0; j < letterGrid[0].length; j++) {
      if (letterGrid[i][j] !== TARGET_WORD[0]) {
        continue;
      }

      if (findFowardHorizontal(i, j, letterGrid)) {
        foundWords++;
      }
      if (findFowardVertical(i, j, letterGrid)) {
        foundWords++;
      }
      if (findFowardUpDiagonal(i, j, letterGrid)) {
        foundWords++;
      }
      if (findFowardDownDiagonal(i, j, letterGrid)) {
        foundWords++;
      }
      if (findBackwardHorizontal(i, j, letterGrid)) {
        foundWords++;
      }
      if (findBackwardVertical(i, j, letterGrid)) {
        foundWords++;
      }
      if (findBackwardUpDiagonal(i, j, letterGrid)) {
        foundWords++;
      }
      if (findBackwardDownDiagonal(i, j, letterGrid)) {
        foundWords++;
      }
    }
  }

  console.log(foundWords);
}


const findFowardHorizontal = (indexX, indexY, grid) => {
  if (indexY + TARGET_WORD.length > grid[0].length) {
    return false;
  }

  if (grid[indexX][indexY + 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX][indexY + 2] !== TARGET_WORD[2]) {
    return false;
  }

  if (grid[indexX][indexY + 3] !== TARGET_WORD[3]) {
    return false;
  }

  return true;
};

const findFowardVertical = (indexX, indexY, grid) => {
  if (indexX + TARGET_WORD.length > grid.length) {
    return false;
  }

  if (grid[indexX + 1][indexY] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX + 2][indexY] !== TARGET_WORD[2]) {
    return false;
  }

  if (grid[indexX + 3][indexY] !== TARGET_WORD[3]) {
    return false;
  }

  return true;
};

const findFowardUpDiagonal = (indexX, indexY, grid) => {
  if (indexX + 1 < TARGET_WORD.length || indexY + TARGET_WORD.length > grid[0].length) {
    return false;
  }

  if (grid[indexX - 1][indexY + 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX - 2][indexY + 2] !== TARGET_WORD[2]) {
    return false;
  }

  if (grid[indexX - 3][indexY + 3] !== TARGET_WORD[3]) {
    return false;
  }

  return true;
};

const findFowardDownDiagonal = (indexX, indexY, grid) => {
  if (indexX + TARGET_WORD.length > grid.length || indexY + TARGET_WORD.length > grid[0].length) {
    return false;
  }

  if (grid[indexX + 1][indexY + 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX + 2][indexY + 2] !== TARGET_WORD[2]) {
    return false;
  }

  if (grid[indexX + 3][indexY + 3] !== TARGET_WORD[3]) {
    return false;
  }

  return true;
};

const findBackwardHorizontal = (indexX, indexY, grid) => {
  if (indexY + 1 < TARGET_WORD.length) {
    return false;
  }

  if (grid[indexX][indexY - 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX][indexY - 2] !== TARGET_WORD[2]) {
    return false;
  }

  if (grid[indexX][indexY - 3] !== TARGET_WORD[3]) {
    return false;
  }

  return true;
};

const findBackwardVertical = (indexX, indexY, grid) => {
  if (indexX + 1 < TARGET_WORD.length) {
    return false;
  }

  if (grid[indexX - 1][indexY] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX - 2][indexY] !== TARGET_WORD[2]) {
    return false;
  }

  if (grid[indexX - 3][indexY] !== TARGET_WORD[3]) {
    return false;
  }

  return true;
};

const findBackwardUpDiagonal = (indexX, indexY, grid) => {
  if (indexX + 1 < TARGET_WORD.length || indexY + 1 < TARGET_WORD.length) {
    return false;
  }

  if (grid[indexX - 1][indexY - 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX - 2][indexY - 2] !== TARGET_WORD[2]) {
    return false;
  }

  if (grid[indexX - 3][indexY - 3] !== TARGET_WORD[3]) {
    return false;
  }

  return true;
};

const findBackwardDownDiagonal = (indexX, indexY, grid) => {
  if (indexX + TARGET_WORD.length > grid.length || indexY + 1 < TARGET_WORD.length) {
    return false;
  }

  if (grid[indexX + 1][indexY - 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX + 2][indexY - 2] !== TARGET_WORD[2]) {
    return false;
  }

  if (grid[indexX + 3][indexY - 3] !== TARGET_WORD[3]) {
    return false;
  }

  return true;
};


main();
