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

      cell.fences = {
        left: cellLeft?.value !== cell.value,
        top: cellTop?.value !== cell.value,
        right: cellRight?.value !== cell.value,
        bottom: cellBottom?.value !== cell.value,
      }
      
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
          cell.group.fenceCount += groupToDelete.fenceCount
          groups.splice(groups.indexOf(groupToDelete), 1)
        }
      }

      if (cell.group === null) {
        cell.group = []
        cell.group.fenceCount = 0
        groups.push(cell.group)
      }
      
      cell.group.push(cell)

      if (cell.fences.left && (cell.value !== cellTop?.value || !cellTop?.fences.left))
        cell.group.fenceCount++
      if (cell.fences.right && (cell.value !== cellTop?.value || !cellTop?.fences.right))
        cell.group.fenceCount++
      if (cell.fences.top && (cell.value !== cellLeft?.value || !cellLeft?.fences.top))
        cell.group.fenceCount++
      if (cell.fences.bottom && (cell.value !== cellLeft?.value || !cellLeft?.fences.bottom))
        cell.group.fenceCount++
    }
  }

  return groups
    .map(group => group.length * group.fenceCount)
    .reduce((sum, value) => sum + value, 0)
}
