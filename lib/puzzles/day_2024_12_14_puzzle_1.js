export async function execute(input) {
  const steps = 100
  const wide = 101
  const tall = 103
  const center = { x: Math.trunc(wide / 2), y: Math.trunc(tall / 2) }
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
    .map(robot => {
      return {
        x: (robot.position.x + (robot.velocity.x * steps)) % wide,
        y: (robot.position.y + (robot.velocity.y * steps)) % tall,
      }
    })
    .filter(robot => robot.x !== center.x && robot.y !== center.y)
  
  const xxx = new Array(tall)
  for (let index = 0; index < xxx.length; index++) {
    xxx[index] = new Array(wide).fill(0)
  }
  for (let index = 0; index < robots.length; index++) {
    const robot = robots[index]
    xxx[robot.y][robot.x] = xxx[robot.y][robot.x] + 1
  }
    
  return robots
    .map(robot => {
      return [
        robot.x < center.x && robot.y < center.y ? 1 : 0,
        robot.x > center.x && robot.y < center.y ? 1 : 0,
        robot.x < center.x && robot.y > center.y ? 1 : 0,
        robot.x > center.x && robot.y > center.y ? 1 : 0,
      ]
    })
    .reduce((a, b) => { return [ a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3] ] }, [ 0, 0, 0, 0 ])
    .reduce((a, b) => a * b, 1)
}
