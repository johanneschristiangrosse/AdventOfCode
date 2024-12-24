export async function execute(blinkCount = 25) {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_11_puzzle_1.txt').then(x => x.text())
  const stones = input.split(' ').map(value => Number(value))
  let sum = 0
  for (let stoneIndex = 0; stoneIndex < stones.length; stoneIndex++) {
    sum += run(stones[stoneIndex], 1, blinkCount)
  }
  return sum
}

function run(value, blinkCount, blinkMax) {
  if (value === 0) {
    return blinkCount <= blinkMax ? run(1, blinkCount + 1, blinkMax) : 1
  } else {
    let y = value
    let halfLength = 0
    while (y >= 100) {
      y = y / 100
      halfLength++
    }
    const isEven = y >= 10
    halfLength += isEven ? 1 : 0.5
      
    if (isEven) {
      const factor = Math.pow(10, halfLength)
      const rest = value % factor
      return blinkCount <= blinkMax
        ? run(rest, blinkCount + 1, blinkMax) + run((value - rest) / factor, blinkCount + 1, blinkMax)
        : 1
    } else {
      return blinkCount <= blinkMax ? run(value * 2024, blinkCount + 1, blinkMax) : 1
    }
  }
}
