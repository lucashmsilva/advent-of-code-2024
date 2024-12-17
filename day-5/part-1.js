// problem https://adventofcode.com/2024/day/5

const fs = require('fs');
const readline = require('readline');

const RULES = new Map();

const main = async () => {
  const rulesInputStream = fs.createReadStream('./input.txt');
  let result = 0;
  let bytesRead = 0;

  const pagetRules = readline.createInterface({
    input: rulesInputStream,
    crlfDelay: Infinity
  });

  for await (const rule of pagetRules) {
    bytesRead += rule.length + 1;
    if (!rule.includes('|')) {
      break;
    }

    const [pageBefore, pageAfter] = rule.split('|');

    const afterRules = RULES.get(pageBefore) || [];
    RULES.set(pageBefore, [...afterRules, pageAfter]);
  }
  rulesInputStream.close();

  const updatesInputStream = fs.createReadStream('./input.txt', { start: bytesRead });
  const updates = readline.createInterface({
    input: updatesInputStream,
    crlfDelay: Infinity
  });

  for await (const update of updates) {
    const pageList = update.split(',');

    if (updateIsValid(pageList)) {
      result += Number(pageList[Math.floor(pageList.length / 2)]);
    }
  }
  updatesInputStream.close();

  console.log(result);
}

const updateIsValid = (update) => {
  for (let i = 1; i < update.length; i++) {
    const page = update[i];
    const mustBeBeforeList = RULES.get(page);

    if (!mustBeBeforeList) {
      continue;
    }

    const pagesBefore = update.slice(0, i);
    if (pagesBefore.find(p => mustBeBeforeList.find(rule => rule === p))) {
      return false;
    }
  }

  return true;
}

main();
