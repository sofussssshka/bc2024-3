const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
program
    .option('-i, --input <file>', 'шлях до файлу для читання (json)')
    .option('-o, --output <file>', 'шлях до файлу для запису результату')
    .option('-d, --display', 'вивести результат у консоль')
    .parse(process.argv);
const options = program.opts();
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}
if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}
