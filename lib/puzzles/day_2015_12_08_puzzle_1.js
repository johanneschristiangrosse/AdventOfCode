export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2015_12_08_puzzle_1.txt').then(x => x.text())
  const inputWithoutWhitespacesInMemory = input
    .replaceAll(/^"/g, '')
    .replaceAll(/"$/g, '')
    .replaceAll(/"\n"/g, '\n')
    .replaceAll(/\\\\/g, 'a')
    .replaceAll(/\\"/g, 'a')
    .replaceAll(/\\x.{2}/g, 'a')
  return input.length - inputWithoutWhitespacesInMemory.length
}
