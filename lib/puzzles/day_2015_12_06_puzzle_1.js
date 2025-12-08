export async function execute(input) {
  const lights = []

  for (let index = 0; index < 1_000_000; index++) {
    lights[index] = false
  }

  for (const value of input.split('\n')) {
    const command =
      [ ...value.matchAll(/^((?:turn on)|(?:turn off)|(?:toggle)) (\d+),(\d+) through (\d+),(\d+)$/g) ]
        .map(matches => {
          return {
            name: matches[1],
            from: {
              row: Number(matches[2]),
              column: Number(matches[3]),
            },
            to: {
              row: Number(matches[4]),
              column: Number(matches[5]),
            },
          }
        })[0]

    for (let row = command.from.row; row <= command.to.row; row++) {
      for (let column = command.from.column; column <= command.to.column; column++) {
        const index = row * 1000 + column
        switch (command.name) {
        case 'turn on':
          lights[index] = true
          break
        case 'turn off':
          lights[index] = false
          break
        case 'toggle':
          lights[index] = lights[index] ? false : true
          break
        }
      }
    }
  }

  return lights.reduce((result, currentLight) => result + (currentLight ? 1 : 0), 0)
}
