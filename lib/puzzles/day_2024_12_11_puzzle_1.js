export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_11_puzzle_1.txt').then(x => x.text())
  let stones = input.split(' ').map(value => Number(value))
  let newStones = []
  
  for (var blinkIndex = 0; blinkIndex < 1; blinkIndex++) {
    for (var stoneIndex = 0; stoneIndex < stones.length; stoneIndex++) {
      const value = stones[stoneIndex]
      if (value === 0) {
        newStones.push(1)
      } else {
        const digits = String(value).split('')
        
        if (digits.length % 2 === 0) {
          newStone.push(
            Number(String(value).substring(0, digits.length / 2 - 1)),
            Number(String(value).substring(digits.length, digits.length - 1)))
        } else {
          newStone.push(value * 2024)
        }
      }
    }
  }
  
  return newStones.length
}