const { program } = require("commander");
const fs = require("fs");

program
  .option("-i, --input <path>", "path to data.json")
  .option("-o, --output <path>", "path to output file")
  .option("-d, --display", "display results in console");

program.parse(process.argv);

const options = program.opts();
const input = options.input;
const output = options.output;
const display = options.display;

if (!input) {
  console.error("Please, specify input file");
  return;
}

if (!fs.existsSync(input)) {
  console.error("Cannot find input file");
  return;
}

if (!output && !display) {
  return;
}

const data = JSON.parse(
  fs.readFileSync(input, {
    encoding: "utf-8",
    flag: "r",
  })
);

const filteredTheLowestData = data.reduce((accumulator, currentElement) => {
  return accumulator.value < currentElement.value
    ? accumulator
    : currentElement;
});

const result = `${filteredTheLowestData.txt}: ${filteredTheLowestData.value}`;

if (display && output) {
  console.log(result);
  fs.writeFileSync(output, result, {
    encoding: "utf-8",
    flag: "w",
    flush: true,
  });
} else if (display && !output) {
  console.log(result);
} else if (!display && output) {
  fs.writeFileSync(output, result, {
    encoding: "utf-8",
    flag: "w",
    flush: true,
  });
}