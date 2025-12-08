export async function execute(input) {
  const blankLineIndex = input.indexOf('\n\n')
  const ranges = input
    .substring(0, blankLineIndex)
    .split('\n')
    .map(row => {
      const seperatorIndex = row.indexOf('-')
      return { start: Number(row.substring(0, seperatorIndex)), end: Number(row.substring(seperatorIndex + 1)) }
    })
  const ids = input.substring(blankLineIndex + 2).split('\n').map(id => Number(id))
  let count = 0

  ids.forEach(id => {
    for (const range of ranges) {
      if(id >= range.start && id <= range.end) {
        count++
        return
      }
    }
  })

  return count
}
