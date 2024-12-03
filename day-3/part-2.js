// problem https://adventofcode.com/2024/day/3

const fs = require('fs');

const main = () => {
  const program = fs.readFileSync('./input.txt', 'utf-8');
  const mulRegex = /do\(\)|don't\(\)|mul\([0-9]{1,3},[0-9]{1,3}\)/gm;
  let computeEnabled = true;

  const mulInstructions = program.match(mulRegex);
  const result = mulInstructions.reduce((result, instruction) => {
    if (['do()', 'don\'t()'].includes(instruction)) {
      computeEnabled = instruction === 'don\'t()' ? false : true;
      return result;
    }

    if (computeEnabled) {
      return result + instruction.match(/[0-9]{1,3},[0-9]{1,3}/g)[0].split(',').map(Number).reduce((mult, op) => mult * op, 1);
    }

    return result;
  }, 0);

  console.log(result);
}

main();
