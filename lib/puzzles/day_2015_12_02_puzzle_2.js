export function execute(input) {
  const presents = input.split('\n')
  let totalLength = 0

  presents.forEach(present => {
    const dimensions = present.split('x').sort((a, b) => a - b).map(value => Number(value))
    totalLength += 2 * (dimensions[0] + dimensions[1]) + dimensions[0] * dimensions[1] * dimensions[2]
  })

  return totalLength
}
