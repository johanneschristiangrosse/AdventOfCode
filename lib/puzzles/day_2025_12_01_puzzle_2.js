export async function execute(input) {
  input = input
    .split('\n')
    .map(row => (row[0] === 'R' ? 1 : -1) * Number(row.substring(1)))
  let position = 50
  let counter = 0

  for (const row of input) {
    const oldPosition = position
    position = position + row
    counter = counter
      + Math.floor((position >= 0 ? 1 : -1) * position / 100)
      + ((row < 0 && position <= 0 && oldPosition !== 0) ? 1 : 0)
    position = position % 100

    if (position < 0) {
      position = 100 + position
    }
  }
  
  return counter
}
