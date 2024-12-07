export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_06_puzzle_1.txt').then(x => x.text())
  const map = input.split('\n').map(row => row.split(''))
  const yCount = map.length
  const xCount = map[0].length
  const guard = { x: 0, y: 0, direction: { x: 0, y: 0 } }
  
  map.forEach((row, y) => {
    row.forEach((field, x) => {
      if ([ '^', '>', 'v', '<' ].includes(field)) {
        guard.x = x
        guard.y = y
        guard.direction.x = field === '>' ? 1 : field === '<' ? -1 : 0
        guard.direction.y = field === 'v' ? 1 : field === '^' ? -1 : 0
        map[y][x] = 'X'
      }
    })
  })

  let count = 1
  while (true) {
    const nextX = guard.x + guard.direction.x
    const nextY = guard.y + guard.direction.y

    if (nextX > xCount - 1) break
    if (nextX < 0) break
    if (nextY > yCount - 1) break
    if (nextY < 0) break

    if (map[nextY][nextX] === '#') {
      if (guard.direction.y === 0) {
        guard.direction.y = guard.direction.x
        guard.direction.x = 0
      } else {
        guard.direction.x = -guard.direction.y
        guard.direction.y = 0
      }
    } else {
      guard.x = nextX
      guard.y = nextY

      if (map[nextY][nextX] === '.') {
        map[nextY][nextX] = 'X'
        count++
      }
    }
  }
  
  return count
}
