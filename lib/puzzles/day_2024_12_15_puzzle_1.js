export function execute(input) {
  const [ map, steps ] = input
    .split('\n\n')
    .map((value, index) => index === 0
      ? value.split('\n').map(row => row.split(''))
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
    } else if (map[nextField.y][nextField.x] === 'O') {
      const lastBox = { x: nextField.x, y: nextField.y }

      while (true) {
        lastBox.x = lastBox.x + (step.isXAxis ? step.direction : 0)
        lastBox.y = lastBox.y + (step.isXAxis ? 0 : step.direction)

        if(map[lastBox.y][lastBox.x] !== 'O') break
      }

      if (map[lastBox.y][lastBox.x] === '.') {
        map[robot.y][robot.x] = '.'
        robot.x = nextField.x
        robot.y = nextField.y
        map[nextField.y][nextField.x] = '@'
        map[lastBox.y][lastBox.x] = 'O'
      }
    }
  }
  
  console.log(map.map(x => x.join('')).join('\n'))
  
  let result = 0
  map.forEach((row, y) => row.forEach((cell, x) => result += (cell === 'O' ? (100 * y + x) : 0)))
  return result
}