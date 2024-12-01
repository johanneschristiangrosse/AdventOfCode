import { input } from './inputs/day_2015_12_01_puzzle_1.js'

export function execute() {
  let counter = 0

  input.split('').forEach(character => {
    counter += character === '(' ? 1 : -1
  })
  return counter
}
