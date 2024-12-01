import { input } from "./inputs/day_2015_12_02_puzzle_1.js";

export function execute() {
  const presents = input.split("\n")
  let totalLength = 0

  presents.forEach(present => {
    const dimensions = present.split('x').sort((a, b) => a - b).map(value => Number(value))
    totalLength += 2 * (dimensions[0] + dimensions[1]) + dimensions[0] * dimensions[1] * dimensions[2]
  });

  return totalLength
}
