import { execute as execute_puzzle_1 } from "./day_2015_12_07_puzzle_1.js";

export function execute() {
  const value1 = execute_puzzle_1();
  const wires = { b: { value: value1 } }
  return execute_puzzle_1(wires);
}
