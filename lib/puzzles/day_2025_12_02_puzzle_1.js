export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2025_12_02_puzzle_1.txt')
    .then(response => response.text())
    .then(text => text
      .split(',')
      .map(row => {
        const seperatorIndex = row.indexOf('-')
        return { start: Number(row.substring(0, seperatorIndex)), end: Number(row.substring(seperatorIndex + 1)) }
      }),
    )
  let sum = 0
  input.forEach(row => {
    for (let value = row.start; value <= row.end; value++) {
      const text = value.toString()
      
      if (text.length % 2 == 1){
        continue
      }

      const first = text.substring(0, text.length / 2)
      const second = text.substring(text.length / 2)
      if (first === second)
        sum += value
    }
  })
  return sum
}
