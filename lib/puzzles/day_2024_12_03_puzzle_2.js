export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_03_puzzle_1.txt').then(x => x.text())

  let active = true
  let sum = 0
  const commands = input.match(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g)
  
  commands.forEach(command => {
    if (command === 'don\'t()') {
      active = false
    } else if (command === 'do()') {
      active = true
    } else if (active) {
      const result = command.match(/mul\((\d{1,3}),(\d{1,3})\)/)
      sum += result[1] * result[2]
    }
  })

  return sum
}

