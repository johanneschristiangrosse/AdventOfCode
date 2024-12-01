import { input } from "./inputs/day_2024_12_01_puzzle_1.js";

export function day_2024_12_01_puzzle_2() {
  const values = input.split('\n')
    .map(row => row.split(/\s+/))

  const list1 = values.map(row => row[0])
  const list2 = values.map(row => row[1])

  return list1
    .map(firstValue => firstValue * list2.filter(secondValue => secondValue == firstValue).length)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
}
