export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2025_12_06_puzzle_1.txt')
    .then(response => response.text())
    .then(text => text
      .replaceAll(/[ ]+/g, ' ')
      .split('\n')
      .map(row => row.trim().split(' ')))
  const operators = input.pop()
  const numbers = input.map(row => row.map(number => Number(number)))
  let sum = 0

  operators.forEach((operator, columnIndex) => {
    let result = numbers[0][columnIndex]

    for (let rowIndex = 1; rowIndex < numbers.length; rowIndex++) {
      switch (operator) {
      case '+':
        result += numbers[rowIndex][columnIndex]
        break
      case '*':
        result *= numbers[rowIndex][columnIndex]
        break
      }
    }

    sum +=result
  })

  return sum
}
