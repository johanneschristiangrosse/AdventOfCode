import { input } from "./inputs/day_2015_12_01_issue_1.js";

export function day_2015_12_01_issue_1() {
  let counter = 0

  input.split("").forEach(character => {
    counter += character === '(' ? 1 : -1
  });
  return counter
}
