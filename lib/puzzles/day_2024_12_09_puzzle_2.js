export function execute(input) {
  const blockList = input.split('').map(number => Number(number))
  const blockObjectList = []
  
  let startIndex = 0
  for (let blockListIndex = 0; blockListIndex < blockList.length; blockListIndex++) {
    blockObjectList.push({
      startIndex: startIndex,
      value: blockListIndex % 2 === 0 ? blockListIndex / 2 : '.',
      length: blockList[blockListIndex],
    })
    startIndex += blockList[blockListIndex]
  }

  for (let blockListEndIndex = blockObjectList.length - (blockObjectList.length % 2 === 0 ? 2 : 1); blockListEndIndex > 0; blockListEndIndex -= 2) {
    for (let blockListStartIndex = 1; blockListStartIndex < blockListEndIndex; blockListStartIndex += 2) {
      if (blockObjectList[blockListStartIndex].length >= blockObjectList[blockListEndIndex].length) {
        blockObjectList[blockListEndIndex].startIndex = blockObjectList[blockListStartIndex].startIndex

        blockObjectList[blockListStartIndex].startIndex += blockObjectList[blockListEndIndex].length
        blockObjectList[blockListStartIndex].length -= blockObjectList[blockListEndIndex].length

        blockObjectList[blockListEndIndex - 1].length += blockObjectList[blockListEndIndex].length
        break
      }
    }
  }

  return blockObjectList.map(x => x.value === '.' ? 0 : calc(x)).reduce((a, b) => a + b, 0)
}

function calc(x) {
  let result = 0
  for (let index = 0; index < x.length; index++) {
    result += (x.startIndex + index) * x.value
  }
  return result
}