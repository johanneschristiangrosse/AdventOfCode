export async function execute(input) {
  return input
    .match(/mul\((\d{1,3}),(\d{1,3})\)/g)
    .map(string => {
      const result = string.match(/mul\((\d{1,3}),(\d{1,3})\)/)
      return result[1] * result[2]
    })
    .reduce((a, b) => a + b, 0)
}

