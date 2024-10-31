import { input } from "./inputs/day_2015_12_05_issue_1.js";

export function day_2015_12_05_issue_2() {
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
