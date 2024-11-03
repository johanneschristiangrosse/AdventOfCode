import { day_2015_12_07_puzzle_1 } from "./day_2015_12_07_puzzle_1.js";

export function day_2015_12_07_puzzle_2() {
  const value1 = day_2015_12_07_puzzle_1();
  const wires = { b: { value: value1 } }
  return day_2015_12_07_puzzle_1(wires);
}
