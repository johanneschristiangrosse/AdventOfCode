export function execute(input) {
  const values = input.split('\n')
    .map(row => row.split(/\s+/))

  const list1 = values.map(row => row[0]).sort((first, second) => first - second)
  const list2 = values.map(row => row[1]).sort((first, second) => first - second)

  return list1
    .map((value, index) => Math.max(value, list2[index]) - Math.min(value, list2[index]))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
}
