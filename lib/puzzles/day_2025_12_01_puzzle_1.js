export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2025_12_01_puzzle_1.txt')
    .then(response => response.text())
    .then(text => text
      .split('\n')
      .map(row => (row[0] === 'R' ? 1 : -1) * Number(row.substring(1))))
  let position = 50
  let counter = 0

  for (const row of input) {
    position = (position + row) % 100
    
    if (position === 0) {
      counter++
    } else if (position < 0) {
      position = 100 + position
    }
  }
  
  return counter
}
