import { input } from "./inputs/day_2015_12_05_issue_1.js";

export function day_2015_12_05_issue_1() {
  let counter = 0

  input.split('\n').forEach(value => {
    const hasVowels = value.match(/[aeiou].*[aeiou].*[aeiou]/) !== null
    const hasDoubleCharacters = value.match(/(.)\1/) !== null
    const hasNoBadWords = value.match(/(ab)|(cd)|(pq)|(xy)/) === null

    if (hasVowels && hasDoubleCharacters && hasNoBadWords) {
      counter++
    }
  })

  return counter
}
