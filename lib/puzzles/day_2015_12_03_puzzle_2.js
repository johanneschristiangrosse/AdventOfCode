import { input } from './inputs/day_2015_12_03_puzzle_1.js'

export function execute() {
  const directions = input.split('')
  const map = []
  map[0] = []
  map[0][0] = true
  let counter = 1
  const santaCoordinate = { X: 0, Y: 0 }
  const roboSantaCoordinate = { X: 0, Y: 0 }

  for (let directionIndex = 0; directionIndex < directions.length; directionIndex++) {
    const coordinate = directionIndex % 2 === 0 ? santaCoordinate : roboSantaCoordinate

    switch (directions[directionIndex]) {
    case '^':
      coordinate.X++
      break
    case 'v':
      coordinate.X--
      break
    case '>':
      coordinate.Y++
      break
    case '<':
      coordinate.Y--
      break
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
