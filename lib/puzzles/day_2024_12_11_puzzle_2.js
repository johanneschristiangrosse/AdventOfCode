import { execute as day_2024_12_11_puzzle_1 } from './day_2024_12_11_puzzle_1.js'

export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_11_puzzle_1.txt').then(x => x.text())
  const stones = input.split(' ').map(value => Number(value))
  
  return run(stones, 1, 40)
}

function run(stones, blinkCount, blinkMax) {
  let sum = 0
  for (let stoneIndex = 0; stoneIndex < stones.length; stoneIndex++) {
    if (blinkCount === 1) {
      console.log(stoneIndex)
    }
    const value = stones[stoneIndex]
    if (value === 0) {
      sum += blinkCount <= blinkMax ? run([ 1 ], blinkCount + 1, blinkMax) : 1
    } else {
      const digits = String(value).split('')
      
      if (digits.length % 2 === 0) {
        const factor = Math.pow(10, (digits.length / 2))
        const rest = value % factor
        sum += blinkCount <= blinkMax ? run([
          rest,
          (value - rest) / factor,
        ], blinkCount + 1, blinkMax) : 1
      } else {
        sum += blinkCount <= blinkMax ? run([ value * 2024 ], blinkCount + 1, blinkMax) : 1
      }
    }
  }
  return sum
}
