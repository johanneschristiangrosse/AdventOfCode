export function execute(input) {
  let counter = 0
  const length = 9
  const wide = 101
  const tall = 103
  const map = Array(tall).fill().map(() => Array(wide).fill().map(() => []))
  const robots = input
    .split('\n')
    .map(robot => robot
      .split(' ')
      .map(coordinates => coordinates
        .substring(2)
        .split(',')
        .map(coordinate => parseInt(coordinate)))
      .map(coordinates => { return { x: coordinates[0], y: coordinates[1] } }))
    .map(robot => { return { position: robot[0], velocity: robot[1] } })
    .map(robot => {
      robot.velocity.x = robot.velocity.x < 0 ? (wide + robot.velocity.x) : robot.velocity.x 
      robot.velocity.y = robot.velocity.y < 0 ? (tall + robot.velocity.y) : robot.velocity.y 
      return robot
    })
  
  robots.forEach(robot => map[robot.position.y][robot.position.x].push(robot))
  const indexArray = [ ...Array(length).keys() ]
  
  while (true) {
    for (let index = 0; index < robots.length; index++) {
      const robot = robots[index]

      if (
        robot.position.x < (wide - length + 1) && robot.position.y < (tall - length + 1)
        && indexArray
          .filter(l => map[robot.position.y + l][robot.position.x + l].length > 0)
          .length === length
      ) {
        console.log(map.map((row) => row.map(x => x.length === 0 ? ' ' : '#').join('')).join('\n'))
        return counter
      }
    }

    for (let index = 0; index < robots.length; index++) {
      const robot = robots[index]
      const robotIndex = map[robot.position.y][robot.position.x].indexOf(robot)
      map[robot.position.y][robot.position.x].splice(robotIndex, 1)
      robot.position.x = (robot.position.x + robot.velocity.x) % wide
      robot.position.y = (robot.position.y + robot.velocity.y) % tall
      map[robot.position.y][robot.position.x].push(robot)
    }

    counter++
  }
}
