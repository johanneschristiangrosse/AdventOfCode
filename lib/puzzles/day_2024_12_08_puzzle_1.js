export async function execute(input) {
  const characters = [ ...new Set(input.replace('\n', '')) ]
    .filter(character => character.match(/^[A-Za-z0-9]$/))
    .sort()
  const map = input.split('\n').map(row => row.split(''))
  const rowCount = map.length
  const columnCount = map[0].length
  const resultMap = Array.from(Array(rowCount), () => new Array(columnCount).fill(null))
  const antennaGroups = {}
  characters.forEach(character => antennaGroups[character] = [])
  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      if (map[row][column] !== '.') {
        antennaGroups[map[row][column]].push({
          row: row,
          column: column,
        })
      }
    }
  }
  characters.forEach(character => {
    const antennaGroup = antennaGroups[character]

    for (let antennaIndex1 = 0; antennaIndex1 < antennaGroup.length - 1; antennaIndex1++) {
      for (let antennaIndex2 = antennaIndex1 + 1; antennaIndex2 < antennaGroup.length; antennaIndex2++) {
        const antenna1 = antennaGroup[antennaIndex1]
        const antenna2 = antennaGroup[antennaIndex2]
        const divRow = antenna2.row - antenna1.row
        const divColumn = antenna2.column - antenna1.column

        const additionalAntenna1Row = antenna1.row - divRow
        const additionalAntenna1Column = antenna1.column - divColumn
        const additionalAntenna2Row = antenna2.row + divRow
        const additionalAntenna2Column = antenna2.column + divColumn

        if (isInRange(additionalAntenna1Row, additionalAntenna1Column, rowCount, columnCount)) {
          resultMap[additionalAntenna1Row][additionalAntenna1Column] = '#'
        }
        if (isInRange(additionalAntenna2Row, additionalAntenna2Column, rowCount, columnCount)) {
          resultMap[additionalAntenna2Row][additionalAntenna2Column] = '#'
        }
      }
    }
  })
  return resultMap
    .map(row => row.filter(character => character === '#').length)
    .reduce((a, b) => a + b, 0)
}

function isInRange(row, column, rowCount, columnCount) {
  return row >= 0 && row < rowCount && column >= 0 && column < columnCount
}