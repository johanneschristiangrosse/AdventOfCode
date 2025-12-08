export function execute(input) {
  input = input.split('\n').map(row => row.split(''))
  return Run(input)
}

export function Run(input) {
  let sum = 0
  input.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (input[rowIndex][columnIndex] !== '@' && input[rowIndex][columnIndex] !== 'x') {
        return
      }

      const count = [
        { y: rowIndex - 1, x: columnIndex - 1 },
        { y: rowIndex - 1, x: columnIndex },
        { y: rowIndex - 1, x: columnIndex + 1 },
        { y: rowIndex, x: columnIndex - 1 },
        // { y: rowIndex, x: columnIndex },
        { y: rowIndex, x: columnIndex + 1 },
        { y: rowIndex + 1, x: columnIndex - 1 },
        { y: rowIndex + 1, x: columnIndex },
        { y: rowIndex + 1, x: columnIndex + 1 },
      ]
        .map(a => a.y >= 0 && a.y < input.length && a.x >= 0 && a.x < row.length && (input[a.y][a.x] === '@' || input[a.y][a.x] === 'x'))
        .filter(a => a)
        .reduce((a, b) => a + b, 0)

      if(count < 4) {
        input[rowIndex][columnIndex] = 'x'
        sum++
      }
    })
  })

  input.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (input[rowIndex][columnIndex] === 'x') {
        input[rowIndex][columnIndex] = '.'
      }
    })
  })
  return sum
}
