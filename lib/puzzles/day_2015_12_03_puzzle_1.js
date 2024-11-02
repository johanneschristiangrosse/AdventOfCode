import { input } from "./inputs/day_2015_12_03_puzzle_1.js";

export function day_2015_12_03_puzzle_1() {
  const directions = input.split("")
  const map = []
  map[0] = []
  map[0][0] = true
  let counter = 1
  const coordinate = { X: 0, Y: 0 }

  for (let directionIndex = 0; directionIndex < directions.length; directionIndex++) {
    switch (directions[directionIndex]) {
      case '^':
        coordinate.X++
        break;
      case 'v':
        coordinate.X--
        break;
      case '>':
        coordinate.Y++
        break;
      case '<':
        coordinate.Y--
        break;
    }

    if (!map[coordinate.X]) {
      map[coordinate.X] = []
    }

    if (!map[coordinate.X][coordinate.Y]) {
      counter++
      map[coordinate.X][coordinate.Y] = true
    }
  }

  return counter
}
