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
    const violations = findRuleViolationPageIndexes(pageList);

    if (violations.length === 0) {
      continue;
    }

    const fixedUpdate = fixUpdateOrder(pageList, violations);
    result += Number(fixedUpdate[Math.floor(fixedUpdate.length / 2)]);
  }
  updatesInputStream.close();

  console.log(result);
}

const findRuleViolationPageIndexes = (update) => {
  const violations = [];
  for (let i = 1; i < update.length; i++) {
    const page = update[i];
    const mustBeBeforeList = RULES.get(page);

    if (!mustBeBeforeList) {
      continue;
    }

    const pagesBefore = update.slice(0, i);
    const pageThatViolatesRule = pagesBefore.findIndex(p => mustBeBeforeList.find(rule => rule === p));
    if (pageThatViolatesRule !== -1) {
      violations.push([i, pageThatViolatesRule])
    }
  }

  return violations;
}

const fixUpdateOrder = (update, violationList) => {
  if (violationList.length === 0) {
    return update;
  }

  for (let i = 0; i < violationList.length; i++) {
    const [violationIdx1, violationIdx2] = violationList[i];
    let newUpdate = Array.from(update);
    let tmp = update[violationIdx1];

    newUpdate[violationIdx1] = update[violationIdx2];
    newUpdate[violationIdx2] = tmp;

    return fixUpdateOrder(newUpdate, findRuleViolationPageIndexes(newUpdate));
  }
}

main();
