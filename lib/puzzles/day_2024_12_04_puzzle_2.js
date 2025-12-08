export async function execute(input) {
  const rows = input.split('\n').map(string => string.split(''))
  const word = 'MAS'
  const rowCount = rows.length
  const columnCount = rows[0].length
  let count = 0

  for (let row = 1; row < rowCount - 1; row++) {
    for (let column = 1; column < columnCount - 1; column++) {
      if (rows[row][column] === 'A') {
        count += matchWord(rows, word, row, column, 1, 1)
        count += matchWord(rows, word, row, column, 1, -1)
        count += matchWord(rows, word, row, column, -1, 1)
        count += matchWord(rows, word, row, column, -1, -1)
      }
    }
  }

  return count
}

function matchWord(rows, word, row, column, firstDirection, secondDirection) {
  const match1 =
    rows[row - firstDirection][column + firstDirection]
    + rows[row][column]
    + rows[row + firstDirection][column - firstDirection]
  
  const match2 =
    rows[row + secondDirection][column + secondDirection]
    + rows[row][column]
    + rows[row - secondDirection][column - secondDirection]
  
  return match1 === word && match2 === word ? 1 : 0
}
