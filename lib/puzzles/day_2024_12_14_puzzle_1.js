export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_14_puzzle_1.txt').then(x => x.text())
  const steps = 100
  const wide = 101
  const tall = 103
  // const steps = 100
  // const wide = 11
  // const tall = 7
  // const steps = 2
  // const wide = 11
  // const tall = 7
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
      if (robot.velocity.x <= -wide) console.log('robot.velocity.x', robot.velocity.x)
      if (robot.velocity.y <= -tall) console.log('robot.velocity.y', robot.velocity.y)
      if (robot.position.x >= wide) console.log('robot.position.x', robot.velocity.x)
      if (robot.position.y >= tall) console.log('robot.position.y', robot.velocity.y)
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
  console.log(xxx
    .map((row, indexY) => row
      .map(x => x === 0 ? '.' : x)
      .map((v, indexX) => (indexY === center.y || indexX === center.x) ? ' ' : v)
      .join(''))
    .join('\n'))
    
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
