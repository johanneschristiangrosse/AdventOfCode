import { input } from "./inputs/day_2015_12_08_puzzle_1.js";

export function day_2015_12_08_puzzle_1() {
  const inputWithoutWhitespacesInMemory = input
    .replaceAll(/^"/g, '')
    .replaceAll(/"$/g, '')
    .replaceAll(/"\n"/g, '\n')
    .replaceAll(/\\\\/g, 'a')
    .replaceAll(/\\"/g, 'a')
    .replaceAll(/\\x.{2}/g, 'a')
  return input.length - inputWithoutWhitespacesInMemory.length
}
