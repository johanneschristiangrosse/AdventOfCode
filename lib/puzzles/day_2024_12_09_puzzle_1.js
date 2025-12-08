export function execute(input) {
  const blockList = input.split('').map(number => Number(number))
  const memory = []
  for (let blockListIndex = 0; blockListIndex < blockList.length; blockListIndex++) {
    memory.push(...new Array(blockList[blockListIndex]).fill(blockListIndex % 2 === 0 ? ((blockListIndex / 2)) : '.'))
  }
  let lastMemoryIndex = memory.length - 1
  const newMemory = []
  for (let memoryIndex = 0; memoryIndex < memory.length; memoryIndex++) {
    if (memoryIndex > lastMemoryIndex) {
      break
    }
    if (memory[memoryIndex] === '.') {
      let value = '.'
      while (value === '.') {
        if (memoryIndex > lastMemoryIndex) {
          
          break
        }
        value = memory[lastMemoryIndex]
        lastMemoryIndex--
      }
      if (memoryIndex > lastMemoryIndex) {
        break
      }
      newMemory[memoryIndex] = value
    } else {
      newMemory[memoryIndex] = memory[memoryIndex]
    }
  }

  return newMemory.map((value, index) => value === '.' ? 0 : value * index).reduce((a, b) => a + b, 0)
}