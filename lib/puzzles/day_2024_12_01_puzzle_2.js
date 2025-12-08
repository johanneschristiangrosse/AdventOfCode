export async function execute(input) {
  const values = input.split('\n')
    .map(row => row.split(/\s+/))

  const list1 = values.map(row => row[0])
  const list2 = values.map(row => row[1])

  return list1
    .map(firstValue => firstValue * list2.filter(secondValue => secondValue == firstValue).length)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
}
