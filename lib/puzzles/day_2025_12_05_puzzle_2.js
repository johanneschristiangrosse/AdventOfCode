export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2025_12_05_puzzle_1.txt').then(response => response.text())
  const blankLineIndex = input.indexOf('\n\n')
  const ranges = input
    .substring(0, blankLineIndex)
    .split('\n')
    .map(row => {
      const seperatorIndex = row.indexOf('-')
      return { start: Number(row.substring(0, seperatorIndex)), end: Number(row.substring(seperatorIndex + 1)) }
    })
    .sort((a, b) => a.start - b.start)
  let count = 0
  let last = 0

  for (const range of ranges) {
    if (range.end > last) {
      count += range.end - Math.max(range.start - 1, last)
      last = range.end
    }
  }

  return count
}
