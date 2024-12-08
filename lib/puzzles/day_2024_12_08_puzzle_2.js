export async function execute() {
  const input = await fetch('/lib/puzzles/inputs/day_2024_12_08_puzzle_1.txt').then(x => x.text())
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
        resultMap[antenna1.row][antenna1.column] = '#'
        resultMap[antenna2.row][antenna2.column] = '#'
        setAdditionalAntenna(antenna1, antenna2, rowCount, columnCount, resultMap, true, true)
      }
    }
  })
  return resultMap
    .map(row => row.filter(character => character === '#').length)
    .reduce((a, b) => a + b, 0)
}

function setAdditionalAntenna(antenna1, antenna2, rowCount, columnCount, resultMap, setBack, setForward) {
  const divRow = antenna2.row - antenna1.row
  const divColumn = antenna2.column - antenna1.column

  if (setBack) {
    const additionalAntenna1 = {
      row: antenna1.row - divRow,
      column: antenna1.column - divColumn,
    }
    if (isInRange(additionalAntenna1, rowCount, columnCount)) {
      resultMap[additionalAntenna1.row][additionalAntenna1.column] = '#'
      setAdditionalAntenna(additionalAntenna1, antenna1, rowCount, columnCount, resultMap, true, false)
    }
  }

  if (setForward) {
    const additionalAntenna2 = {
      row: antenna2.row + divRow,
      column: antenna2.column + divColumn,
    }
    if (isInRange(additionalAntenna2, rowCount, columnCount)) {
      resultMap[additionalAntenna2.row][additionalAntenna2.column] = '#'
      setAdditionalAntenna(antenna2, additionalAntenna2, rowCount, columnCount, resultMap, false, true)
    }
  }
}

function isInRange(antenna, rowCount, columnCount) {
  return antenna.row >= 0 && antenna.row < rowCount && antenna.column >= 0 && antenna.column < columnCount
}