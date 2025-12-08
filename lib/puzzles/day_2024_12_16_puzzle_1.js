export async function execute(input) {
  const map = input.split('\n').map(row => row.split('').map(x => { return { character: x, path: null } }))
  const start = { x: 1, y: map.length - 2 }
  const directions = [
    { index: 0, x: 0, y: -1 },
    { index: 1, x: -1, y: 0 },
    { index: 2, x: 0, y: 1 },
    { index: 3, x: 1, y: 0 },
  ]
  const paths = [ { lastField: { x: start.x, y: start.y, direction: directions[3] }, amount: 0 } ]
  map[start.y][start.x].path = paths[0]
  
  let changed = true
  while (changed) {
    changed = false
    const pathsLength = paths.length
    const pathsToRemove = []
    for (let pathIndex = 0; pathIndex < pathsLength; pathIndex++) {
      const path = paths[pathIndex]
    
      if (map[path.lastField.y][path.lastField.x].character === 'E')
        continue

      pathsToRemove.push(path)
      directions.forEach(direction => {
        const y = path.lastField.y + direction.y
        const x = path.lastField.x + direction.x
        if (map[y][x].character === '#')
          return
        
        const rotation = direction.index === path.lastField.direction.index
          ? 0
          : ((direction.index % 2) === (path.lastField.direction.index % 2))
            ? 2
            : 1
        const newPath ={
          lastField: { x, y, direction },
          amount: path.amount + 1 + rotation * 1000,
        }

        if (map[y][x].path === null || map[y][x].path.amount > newPath.amount) {
          changed = true
          map[y][x].path = newPath
          paths.push(newPath)
        }
      })
    }

    for (const path of pathsToRemove) {
      paths.splice(paths.indexOf(path), 1)
    }
  }

  return Math.min(...paths.map(path => path.amount))
}