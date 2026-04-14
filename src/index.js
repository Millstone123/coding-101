// Calculator application — Coding 101 Exercise
// BUG: The divide function returns NaN for certain inputs

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; } // FIXME: no zero check

const args = process.argv.slice(2);
const [op, a, b] = args;

const ops = { add, subtract, multiply, divide };

if (!ops[op]) {
  console.log('Usage: node src/index.js <add|subtract|multiply|divide> <a> <b>');
  process.exit(1);
}

console.log(`${op}(${a}, ${b}) = ${ops[op](Number(a), Number(b))}`);
