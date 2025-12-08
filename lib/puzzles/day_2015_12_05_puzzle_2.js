export async function execute(input) {
  let counter = 0

  input.split('\n').forEach(value => {
    const hasDoublePair = value.match(/(.{2}).*\1/) !== null
    const hasFramingPair = value.match(/(.).\1/) !== null

    if (hasDoublePair && hasFramingPair) {
      counter++
    }
  })

  return counter
}
