export async function execute(blinkCount = 25) {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_11_puzzle_1.txt').then(x => x.text())
  let stones = input.split(' ').map(value => Number(value))
  let newStones = []
  
  for (let blinkIndex = 0; blinkIndex < blinkCount; blinkIndex++) {
    for (let stoneIndex = 0; stoneIndex < stones.length; stoneIndex++) {
      const value = stones[stoneIndex]
      if (value === 0) {
        newStones.push(1)
      } else {
        const digits = String(value).split('')
        
        if (digits.length % 2 === 0) {
          newStones.push(
            Number(String(value).substring(0, digits.length / 2)),
            Number(String(value).substring(digits.length / 2, digits.length)))
        } else {
          newStones.push(value * 2024)
        }
      }
    }
    stones = newStones
    newStones = []
  }
  
  return stones.length
}