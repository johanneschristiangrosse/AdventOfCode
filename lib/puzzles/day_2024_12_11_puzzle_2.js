export function execute(input) {
  const blinkCount = 75
  const stonesList = input.split(' ').map(value => Number(value))
  let stones = {}
  for (let stoneIndex = 0; stoneIndex < stonesList.length; stoneIndex++) {
    if (stones[stonesList[stoneIndex]]) {
      stones[stonesList[stoneIndex]]++
    } else {
      stones[stonesList[stoneIndex]] = 1
    }
  }
  
  let newStones = {}
  
  for (let blinkIndex = 0; blinkIndex < blinkCount; blinkIndex++) {
    const stonesKeys = Object.keys(stones)
    for (let stoneIndex = 0; stoneIndex < Object.keys(stones).length; stoneIndex++) {
      const value = Number(stonesKeys[stoneIndex])
      if (value === 0) {
        newStones[1] = (newStones[1] ?? 0) + stones[value]
      } else {
        const digits = String(value).split('')
          
        if (digits.length % 2 === 0) {
          const newValue1 = Number(String(value).substring(0, digits.length / 2))
          const newValue2 =  Number(String(value).substring(digits.length / 2, digits.length))
          newStones[newValue1] = (newStones[newValue1] ?? 0) + stones[value]
          newStones[newValue2] = (newStones[newValue2] ?? 0) + stones[value]
        } else {
          const newValue = value * 2024
          newStones[newValue] = (newStones[newValue] ?? 0) + stones[value]
        }
      }
    }
    stones = newStones
    newStones = {}
  }
  return Object.keys(stones).map(key => stones[key]).reduce((a, b) => a + b, 0)
}