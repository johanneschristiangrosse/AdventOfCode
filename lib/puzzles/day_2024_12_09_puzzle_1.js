export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_09_puzzle_1.txt').then(x => x.text())
  const blockList = input.split('').map(number => Number(number))
  const memoryString = ''
  const memory = []
  for (let blockListIndex = 0; blockListIndex < blockList.length; blockListIndex++) {
    memory.push(...new Array(blockList[blockListIndex]).fill(blockListIndex % 2 === 0 ? ((blockListIndex / 2)) : '.'))
    // memoryString += (blockListIndex % 2 === 0 ? String(blockListIndex / 2) : '.').repeat(blockList[blockListIndex])
  }
  // memory = memoryString.split('').map(character => character === '.' ? character : Number(character))
  console.log(memory)
  for (let memoryIndex = 0; memoryIndex < memory.length; memoryIndex++) {
    if (memory[memoryIndex] === undefined) {
      break
    }
    if (memory[memoryIndex] === '.') {
      let value = '.'
      while (value === '.') {
        value = memory.pop()
      }
      memory[memoryIndex] = value
    }
  }
  console.log(memory)
  console.log(memory.map((value, index) => value * index))

  return memory.map((value, index) => value * index).reduce((a, b) => a + b, 0)
}