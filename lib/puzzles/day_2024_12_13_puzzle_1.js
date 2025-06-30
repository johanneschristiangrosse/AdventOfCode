export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_13_puzzle_1.txt').then(x => x.text())
  const arcades = input
    .split('\n\n')
    .map(arcade => arcade
      .split('\n')
      .map(c => c
        .substring(c[0] === 'B' ? 10 : 7)
        .split(', ')
        .map(x => parseInt(x.substring(2))))
      .map(c => {
        return {
          x: c[0],
          y: c[1],
          angle: Math.atan(c[1] / c[0]) * (180 / Math.PI),
          length: Math.sqrt(c[0] * c[0] + c[1] * c[1]),
        }
      }))
    .map(arcade => {
      return {
        a: arcade[0],
        b: arcade[1],
        prize: arcade[2],
      }
    })
    .map(arcade => {
      const alpha = arcade.prize.angle - arcade.a.angle
      const beta = arcade.b.angle - arcade.prize.angle
      const gamma = 180 - alpha - beta
      const c = arcade.prize.length
      const a = c * Math.sin(alpha / (180 / Math.PI)) / Math.sin(gamma / (180 / Math.PI))
      const b = c * Math.sin(beta / (180 / Math.PI)) / Math.sin(gamma / (180 / Math.PI))
      arcade.triangle = { a, b, c, alpha, beta, gamma }

      arcade.a.count = Math.round(b / arcade.a.length)
      arcade.b.count = Math.round(a / arcade.b.length)

      const lengthX = arcade.a.count * arcade.a.x + arcade.b.count * arcade.b.x
      const lengthY = arcade.a.count * arcade.a.y + arcade.b.count * arcade.b.y
      const isValid = lengthX === arcade.prize.x && lengthY === arcade.prize.y

      if (isValid && (arcade.a.count > 100 || arcade.b.count > 100)) {
        console.log(isValid, arcade.a.count, arcade.b.count)
      }

      return isValid ? (arcade.a.count * 3 + arcade.b.count) : 0
    })
  // console.log(arcades.map(x => { return [ Math.round(x.a.count), Math.round(x.b.count) ] }))
  return arcades.reduce((a, b) => a + b, 0)
}
