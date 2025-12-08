export function execute(input) {
  const map = input.split('\n').map(row => row.split('').map(number => Number(number)))

  let result = 0

  map.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value === 0) {
        result += getPath(map, 0, rowIndex, columnIndex).length
      }
    })
  })

  return result
}

function getPath(map, lastValue, lastRowIndex, lastColumnIndex) {
  if (lastValue === 9) {
    return [ `${lastRowIndex},${lastColumnIndex}` ]
  }

  const result = []
  const value = lastValue + 1

  if (lastRowIndex + 1 < map.length && map[lastRowIndex + 1][lastColumnIndex] === value) {
    result.push(...getPath(map, value, lastRowIndex + 1, lastColumnIndex))
  }
  if (lastRowIndex - 1 >= 0 && map[lastRowIndex - 1][lastColumnIndex] === value) {
    result.push(...getPath(map, value, lastRowIndex - 1, lastColumnIndex))
  }
  if (lastColumnIndex + 1 < map[0].length && map[lastRowIndex][lastColumnIndex + 1] === value) {
    result.push(...getPath(map, value, lastRowIndex, lastColumnIndex + 1))
  }
  if (lastColumnIndex - 1 >= 0 && map[lastRowIndex][lastColumnIndex - 1] === value) {
    result.push(...getPath(map, value, lastRowIndex, lastColumnIndex - 1))
  }

  return result
}