export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_04_puzzle_1.txt').then(x => x.text())
  const rows = input.split('\n').map(string => string.split(''))
  const word = 'XMAS'
  const rowCount = rows.length
  const columnCount = rows[0].length
  let count = 0

  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      if (rows[row][column] === 'X') {
        count += matchWord(rows, word, row, column, 0, 1)
        count += matchWord(rows, word, row, column, 1, 1)
        count += matchWord(rows, word, row, column, -1, 1)
        count += matchWord(rows, word, row, column, 0, -1)
        count += matchWord(rows, word, row, column, 1, -1)
        count += matchWord(rows, word, row, column, -1, -1)
        count += matchWord(rows, word, row, column, 1, 0)
        count += matchWord(rows, word, row, column, -1, 0)
      }
    }
  }

  return count
}

function matchWord(rows, word, row, column, rowDirection, columnDirection) {
  const offset = word.length - 1
  const rowCount = rows.length
  const columnCount = rows[0].length
  
  if ((row + offset * rowDirection) > (rowCount - 1)) return 0
  if ((row + offset * rowDirection) < 0) return 0
  if ((column + offset * columnDirection) > (columnCount - 1)) return 0
  if ((column + offset * columnDirection) < 0) return 0
  
  return word.split('').reduce((string, _, index) =>
    string + rows[row + index * rowDirection][column + index * columnDirection], '') === word ? 1 : 0
}
