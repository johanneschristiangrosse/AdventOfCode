export function execute(input) {
  const map = input.split('\n').map(x => x.split('').map(y => { return { value: y, group: null } }))
  const groups = []
  
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex]
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cell = row[columnIndex]
      const cellLeft = columnIndex > 0 ? map[rowIndex][columnIndex - 1] : null
      const cellTop = rowIndex > 0 ? map[rowIndex - 1][columnIndex] : null
      const cellRight = columnIndex < (row.length - 1) ? map[rowIndex][columnIndex + 1] : null
      const cellBottom = rowIndex < (map.length - 1) ? map[rowIndex + 1][columnIndex] : null

      cell.fences = [ cellLeft, cellTop, cellRight, cellBottom ]
        .filter(x => x?.value !== cell.value)
        .length
      
      if (cell.value === cellLeft?.value) {
        cell.group = cellLeft.group
      }

      if (cell.value === cellTop?.value) {
        if (cell.group === null) {
          cell.group = cellTop.group
        } else if (cell.group !== cellTop.group) {
          const groupToDelete = cellTop.group
          groupToDelete.forEach(c => c.group = cell.group)
          cell.group.push(...groupToDelete)
          groups.splice(groups.indexOf(groupToDelete), 1)
        }
      }

      if (cell.group === null) {
        cell.group = []
        groups.push(cell.group)
      }
      
      cell.group.push(cell)
    }
  }

  return groups
    .map(group => group.length * group
      .reduce((sum, value) => sum + value.fences, 0))
    .reduce((sum, value) => sum + value, 0)
}
