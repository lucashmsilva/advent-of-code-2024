// problem https://adventofcode.com/2024/day/1

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');
  let leftList = [];
  let rightList = [];
  let totalIdDistance = 0;
  
  const locationLists = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  for await (const locationIds of locationLists) {
    const [leftId, rightId] = locationIds.split('   ');
    leftList.push(leftId);
    rightList.push(rightId);
  }

  leftList.sort((a,b) => a - b);
  rightList.sort((a,b) => a - b);

  for (let i = 0; i < leftList.length; i++) {
    const leftId = leftList[i];
    const rightId = rightList[i];

    const distance = Math.abs(leftId-rightId);
    totalIdDistance += distance;
  }

  console.log(totalIdDistance);
}

main();