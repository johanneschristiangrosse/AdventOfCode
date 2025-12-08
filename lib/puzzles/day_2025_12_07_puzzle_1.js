export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2025_12_07_puzzle_1.txt')
    .then(response => response.text())
    .then(text => text.split('\n').map(row => row.split((''))))
  const startColumnIndex = input[0].indexOf('S')
  input[1][startColumnIndex] = '|'
  
  for (let rowIndex = 1; rowIndex < (input.length - 1); rowIndex += 2) {
    input[rowIndex].forEach((character, columnIndex) => {
      if (character === '|'){
        if (input[rowIndex + 1][columnIndex] === '^'){
          input[rowIndex + 1][columnIndex] = '#'
          input[rowIndex + 2][Math.min(columnIndex + 1, input[rowIndex + 2].length - 1)] = '|'
          input[rowIndex + 2][Math.max(columnIndex - 1, 0)] = '|'
        } else {
          input[rowIndex + 2][columnIndex] = '|'
        }
      }
    })
  }

  return input.map(row => row.filter(character => character === '#').length).reduce((a, b) => a + b, 0)
}
