export function execute(input) {
  const [ map, steps ] = input
    .split('\n\n')
    .map((value, index) => index === 0
      ? value
        .split('\n')
        .map(row => row
          .split('')
          .map(char => { return { '@': '@.', '#': '##', '.': '..', 'O': '[]' }[char] })
          .join('')
          .split(''))
      : value.split('\n').join('').split('').map(step => {
        return {
          isXAxis: [ '<', '>' ].includes(step),
          direction: [ '>', 'v' ].includes(step) ? 1 : -1,
        }
      }))

  let robot = {}
  map.forEach((row, y) => row.forEach((cell, x) => { if (cell === '@') robot = { x, y } }))
  
  for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
    
    const step = steps[stepIndex]
    const nextField = {
      x: robot.x + (step.isXAxis ? step.direction : 0),
      y: robot.y + (step.isXAxis ? 0 : step.direction),
    }
    if (map[nextField.y][nextField.x] === '.') {
      map[robot.y][robot.x] = '.'
      robot.x = nextField.x
      robot.y = nextField.y
      map[nextField.y][nextField.x] = '@'
    } else if ([ '[', ']' ].includes(map[nextField.y][nextField.x])) {
      const lastBox = { x: nextField.x, y: nextField.y }
      if (step.isXAxis) {
        while (true) {
          lastBox.x += step.direction * 2
          if(![ '[', ']' ].includes(map[lastBox.y][lastBox.x])) break
        }
  
        if (map[lastBox.y][lastBox.x] === '.') {
          map[robot.y][robot.x] = '.'
          robot.x = nextField.x
          robot.y = nextField.y
          map[nextField.y][nextField.x] = '@'
          while ((lastBox.x - robot.x) !== 0) {
            map[lastBox.y][lastBox.x] = step.direction === 1 ? ']' : '['
            map[lastBox.y][lastBox.x - step.direction] = step.direction === 1 ? '[' : ']'
            lastBox.x = lastBox.x - step.direction * 2
          }
        }
      } else {
        const offset = map[lastBox.y][lastBox.x] === '[' ? 0 : 1
        const steck = [ [ { x: lastBox.x - offset, y: lastBox.y } ] ]
        let canMove = true
        
        while (true) {
          if (steck[steck.length - 1].length === 0) break

          steck.push([])
          steck[steck.length - 2].forEach(item => {
            const next = { x: item.x, y: item.y + step.direction }
            if ([ map[next.y][next.x], map[next.y][next.x + 1] ].includes('#')) {
              canMove = false
            } else if (map[next.y][next.x] === '[') {
              steck[steck.length - 1].push({ x: next.x, y: next.y })
            } else {
              if (map[next.y][next.x] === ']') {
                steck[steck.length - 1].push({ x: next.x - 1, y: next.y })
              }
              
              if (map[next.y][next.x + 1] === '[') {
                steck[steck.length - 1].push({ x: next.x + 1, y: next.y })
              }
            }
          })

          if (!canMove) break
        }

        if (canMove) {
          for (let index = steck.length - 1; index >= 0; index--) {
            steck[index].forEach(item => {
              map[item.y + step.direction][item.x] = '['
              map[item.y + step.direction][item.x + 1] = ']'
              map[item.y][item.x] = '.'
              map[item.y][item.x + 1] = '.'
            })
          }

          map[robot.y][robot.x] = '.'
          robot.x = nextField.x
          robot.y = nextField.y
          map[nextField.y][nextField.x] = '@'
        }
      }
    }
  }
  
  console.log(map.map(x => x.join('')).join('\n'))
  
  let result = 0
  map.forEach((row, y) => row.forEach((cell, x) => result += (cell === '[' ? (100 * y + x) : 0)))
  return result
}