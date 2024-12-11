// problem https://adventofcode.com/2024/day/4

const fs = require('fs');
const readline = require('readline');

const TARGET_WORD = 'MAS';

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

  for (let i = 1; i < letterGrid.length - 1; i++) {
    for (let j = 1; j < letterGrid[0].length - 1; j++) {
      if (letterGrid[i][j] !== TARGET_WORD[1]) {
        continue;
      }


      if (findFowardDownDiagonal(i - 1, j - 1, letterGrid) && (findFowardUpDiagonal(i + 1, j - 1, letterGrid) || findBackwardDownDiagonal(i - 1, j + 1, letterGrid))) {
        foundWords++;
        continue;
      }

      if (findFowardUpDiagonal(i + 1, j - 1, letterGrid) && (findFowardDownDiagonal(i - 1, j - 1, letterGrid) || findBackwardUpDiagonal(i + 1, j + 1, letterGrid))) {
        foundWords++;
        continue;
      }

      if (findBackwardUpDiagonal(i + 1, j + 1, letterGrid) && (findBackwardDownDiagonal(i - 1, j + 1, letterGrid) || findFowardDownDiagonal(i - 1, j - 1, letterGrid))) {
        foundWords++;
        continue;
      }

      if (findBackwardDownDiagonal(i - 1, j + 1, letterGrid) && (findBackwardUpDiagonal(i + 1, j + 1, letterGrid) || findFowardDownDiagonal(i - 1, j - 1, letterGrid))) {
        foundWords++;
        continue;
      }

    }
  }

  console.log(foundWords);
}


const findFowardUpDiagonal = (indexX, indexY, grid) => {
  if (indexX + 1 < TARGET_WORD.length || indexY + TARGET_WORD.length > grid[0].length) {
    return false;
  }

  if (grid[indexX][indexY] !== TARGET_WORD[0]) {
    return false;
  }

  if (grid[indexX - 1][indexY + 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX - 2][indexY + 2] !== TARGET_WORD[2]) {
    return false;
  }

  return true;
};

const findFowardDownDiagonal = (indexX, indexY, grid) => {
  if (indexX + TARGET_WORD.length > grid.length || indexY + TARGET_WORD.length > grid[0].length) {
    return false;
  }

  if (grid[indexX][indexY] !== TARGET_WORD[0]) {
    return false;
  }

  if (grid[indexX + 1][indexY + 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX + 2][indexY + 2] !== TARGET_WORD[2]) {
    return false;
  }

  return true;
};

const findBackwardUpDiagonal = (indexX, indexY, grid) => {
  if (indexX + 1 < TARGET_WORD.length || indexY + 1 < TARGET_WORD.length) {
    return false;
  }

  if (grid[indexX][indexY] !== TARGET_WORD[0]) {
    return false;
  }

  if (grid[indexX - 1][indexY - 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX - 2][indexY - 2] !== TARGET_WORD[2]) {
    return false;
  }

  return true;
};

const findBackwardDownDiagonal = (indexX, indexY, grid) => {
  if (indexX + TARGET_WORD.length > grid.length || indexY + 1 < TARGET_WORD.length) {
    return false;
  }

  if (grid[indexX][indexY] !== TARGET_WORD[0]) {
    return false;
  }

  if (grid[indexX + 1][indexY - 1] !== TARGET_WORD[1]) {
    return false;
  }

  if (grid[indexX + 2][indexY - 2] !== TARGET_WORD[2]) {
    return false;
  }

  return true;
};


main();
