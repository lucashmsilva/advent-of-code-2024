// problem https://adventofcode.com/2024/day/2

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');
  let safeReports = 0;
  
  const reports = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  for await (const report of reports) {
    const levels = report.split(' ');
    let reportIsSafe = true;

    const firstDiff = levels[1] - levels[0];
    if (!(Math.abs(firstDiff) >= 1) || !(Math.abs(firstDiff) <= 3)) {
      continue;
    }

    for (let i = 2; i < levels.length; i++) {
      const level1 = levels[i - 1];
      const level2 = levels[i];
      const currentDiff = level2 - level1;

      if (!(Math.abs(currentDiff) >= 1) || !(Math.abs(currentDiff) <= 3)) {
        reportIsSafe = false;
        break;
      }

      if (firstDiff < 0 && currentDiff > 0) {
        reportIsSafe = false;
        break;
      }

      if (firstDiff > 0 && currentDiff < 0) {
        reportIsSafe = false;
        break;
      }
    }

    if (reportIsSafe) {
      safeReports++;
      reportIsSafe = true;
    }
  }

  console.log(safeReports);
}

main();