import { input } from "./inputs/day_2015_12_02_issue_1.js";

export function day_2015_12_02_issue_1() {
  const presents = input.split("\n")
  let totalSurface = 0

  presents.forEach(present => {
    const dimensions = present.split('x')
    const surfaces = [
      dimensions[0] * dimensions[1],
      dimensions[1] * dimensions[2],
      dimensions[2] * dimensions[0],
    ]
    const smallestSurface = Math.min(...surfaces)
    totalSurface += 2 * (surfaces[0] + surfaces[1] + surfaces[2]) + smallestSurface
  });

  return totalSurface
}
