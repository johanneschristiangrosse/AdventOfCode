import { execute as execute_puzzle_1 } from './day_2015_12_07_puzzle_1.js'

export async function execute(input) {
  const value1 = await execute_puzzle_1(input)
  const wires = { b: { value: value1 } }
  return await execute_puzzle_1(input, wires)
}
