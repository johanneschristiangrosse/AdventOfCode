import { Run } from './day_2025_12_04_puzzle_1.js'

export function execute(input) {
  input = input.split('\n').map(row => row.split(''))

  let sum = 0
  let result = 1

  while(result > 0){
    result = Run(input)
    sum += result
  }

  return sum
}