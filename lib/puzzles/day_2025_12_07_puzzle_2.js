export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2025_12_07_puzzle_1.txt')
    .then(response => response.text())
    .then(text => text.split('\n').map(row => row.split('').map(character => { return { character, counter: 0 } })))
  const startColumnIndex = input[0].map(cell => cell.character).indexOf('S')
  input[1][startColumnIndex].character = '|'
  input[1][startColumnIndex].counter = 1

  for (let rowIndex = 1; rowIndex < (input.length - 1); rowIndex += 2) {
    input[rowIndex].forEach((cell, columnIndex) => {
      if (cell.character === '|'){
        if (input[rowIndex + 1][columnIndex].character === '^'){
          input[rowIndex + 2][Math.min(columnIndex + 1, input[rowIndex + 2].length - 1)].character = '|'
          input[rowIndex + 2][Math.min(columnIndex + 1, input[rowIndex + 2].length - 1)].counter += cell.counter
          input[rowIndex + 2][Math.max(columnIndex - 1, 0)].character = '|'
          input[rowIndex + 2][Math.max(columnIndex - 1, 0)].counter += cell.counter
        } else {
          input[rowIndex + 2][columnIndex].character = '|'
          input[rowIndex + 2][columnIndex].counter += cell.counter
        }
      }
    })
  }

  return input[input.length - 1].map(cell => cell.counter).reduce((a, b) => a + b, 0)
}
