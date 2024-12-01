// problem https://adventofcode.com/2024/day/1

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');
  let leftList = [];
  let rightIdsMap = new Map();
  let totalIdSimilarity = 0;

  const locationLists = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  for await (const locationIds of locationLists) {
    const [leftId, rightId] = locationIds.split('   ');
    leftList.push(leftId);

    const idFreq = rightIdsMap.get(rightId) || 0;
    rightIdsMap.set(rightId, idFreq + 1);
  }

  for (let i = 0; i < leftList.length; i++) {
    const leftId = leftList[i];
    const idFreq = rightIdsMap.get(leftId) || 0;

    const similarity = leftId * idFreq;
    totalIdSimilarity += similarity;
  }

  console.log(totalIdSimilarity);
}

main();