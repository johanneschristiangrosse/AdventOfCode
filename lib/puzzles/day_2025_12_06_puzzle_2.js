export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2025_12_06_puzzle_1.txt')
    .then(response => response.text()).then(text => text.split('\n'))
  const operators = input.pop()
  const numbers = input
  let sum = 0

  let numbers2 = []
  for (let columnIndex = operators.length - 1; columnIndex >= 0; columnIndex--) {
    let number = 0
    let exponent = 0

    for (let rowIndex = numbers.length - 1; rowIndex >= 0; rowIndex--) {
      if (numbers[rowIndex][columnIndex] === ' ') {
        continue
      }

      number += Number(numbers[rowIndex][columnIndex]) * Math.pow(10, exponent)
      exponent++
    }

    numbers2.push(number)
    
    if (operators[columnIndex] !== ' ') {
      let result = numbers2[0]

      for (let index = 1; index < numbers2.length; index++) {
        switch (operators[columnIndex]) {
        case '+':
          result += numbers2[index]
          break
        case '*':
          result *= numbers2[index]
          break
        }
      }

      sum += result
      numbers2 = []
      columnIndex--
      exponent = 0
    }
  }

  return sum
}
