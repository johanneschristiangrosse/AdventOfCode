import { input } from "./inputs/day_2015_12_01_puzzle_1.js";

export function day_2015_12_01_puzzle_2() {
  const characters = input.split("")
  let counter = 0
  let isNotInBasement = false
  let position = 0

  while (position != -1) {
    position += characters[counter] === '(' ? 1 : -1
    counter++
  }

  return counter
}
