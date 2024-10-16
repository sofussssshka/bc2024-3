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
const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));
let minAsset = null;
let minValue = Infinity;
data.forEach(asset => {
    const value = asset.value !== undefined ? asset.value : Infinity;
    const name = asset.txt || 'Unknown';
    if (value < minValue) {
        minValue = value;
        minAsset = name;
    }
});
const output = `${minAsset}:${minValue}`;
if (options.output) {
    fs.writeFileSync(options.output, output);
}
if (options.display) {
    console.log(output);
}