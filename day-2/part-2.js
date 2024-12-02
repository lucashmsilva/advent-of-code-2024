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

    let problematicLevels = isReportUnsafe(levels);
    if (!problematicLevels) {
      safeReports++;
      continue;
    }

    const [problemLevel1, problemLevel2] = problematicLevels;

    problematicLevels = isReportUnsafe(levels.filter((_, i) => i !== problemLevel1));
    if (!problematicLevels) {
      safeReports++;
      continue;
    }

    problematicLevels = isReportUnsafe(levels.filter((_, i) => i !== problemLevel2));
    if (!problematicLevels) {
      safeReports++;
      continue;
    }

    // TODO: optimize this to avoid trying to remove all levels. maybe removing i - 2 and i + 1, additionally, suffices
    for (let i = 0; i < levels.length; i++) {
      if (i === problemLevel1 || i === problemLevel2) {
        continue;
      }

      problematicLevels = isReportUnsafe(levels.filter((_, j) => j !== i));
      if (!problematicLevels) {
        safeReports++;
        break;
      }
    }
  }

  console.log(safeReports);
}

const isReportUnsafe = (levels) => {
  const firstDiff = levels[1] - levels[0];
  if (!(Math.abs(firstDiff) >= 1) || !(Math.abs(firstDiff) <= 3)) {
    return [0, 1];
  }

  for (let i = 2; i < levels.length; i++) {
    const level1 = levels[i - 1];
    const level2 = levels[i];
    const currentDiff = level2 - level1;

    if (!(Math.abs(currentDiff) >= 1) || !(Math.abs(currentDiff) <= 3)) {
      return [i - 1, i];
    }

    if (firstDiff < 0 && currentDiff > 0) {
      return [i - 1, i];
    }

    if (firstDiff > 0 && currentDiff < 0) {
      return [i - 1, i];
    }
  }

  return false;
}

main();