export function execute(input) {
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

  const start = { x: guard.x, y: guard.y, direction: { x: guard.direction.x, y: guard.direction.y } }

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
      }
    }
  }

  let count = 0
  map.forEach((row, y) => {
    row.forEach((field, x) => {
      if (field === 'X' && (start.x !== x || start.y !== y)) {
        const newMap = []
        for (let y = 0; y < yCount; y++) {
          newMap[y] = []
          for (let x = 0; x < xCount; x++) {
            newMap[y][x] = { fromLeft: false, fromRight: false, fromTop: false, fromBottom: false }
          }
        }
        
        newMap[y][x] = 'O'
        
        const newGuard = { x: start.x, y: start.y, direction: { x: start.direction.x, y: start.direction.y } }
        while (true) {
          const nextX = newGuard.x + newGuard.direction.x
          const nextY = newGuard.y + newGuard.direction.y
      
          if (nextX > xCount - 1) break
          if (nextX < 0) break
          if (nextY > yCount - 1) break
          if (nextY < 0) break
      
          if (map[nextY][nextX] === '#' || newMap[nextY][nextX] === 'O') {
            if (newGuard.direction.y === 0) {
              newGuard.direction.y = newGuard.direction.x
              newGuard.direction.x = 0
            } else {
              newGuard.direction.x = -newGuard.direction.y
              newGuard.direction.y = 0
            }
          } else {
            if (newGuard.direction.x === 1 && newMap[nextY][nextX].fromLeft === true
              || newGuard.direction.x === -1 && newMap[nextY][nextX].fromRight === true
              || newGuard.direction.y === 1 && newMap[nextY][nextX].fromTop === true
              || newGuard.direction.y === -1 && newMap[nextY][nextX].fromBottom === true) {
              count++
              break
            }

            if (newGuard.direction.x === 1) newMap[nextY][nextX].fromLeft = true
            if (newGuard.direction.x === -1) newMap[nextY][nextX].fromRight = true
            if (newGuard.direction.y === 1) newMap[nextY][nextX].fromTop = true
            if (newGuard.direction.y === -1) newMap[nextY][nextX].fromBottom = true

            newGuard.x = nextX
            newGuard.y = nextY
          }
        }
      }
    })
  })
  
  return count
}
